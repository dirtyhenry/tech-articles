---
layout: post
id: 07A4CFB0-3F26-4593-A418-0732FB7FC316
title: Decoding Dates from JSON APIs in Swift the Right Way
author: Mick F
excerpt: >-
  In my experience, the default strategies to decode and encode dates of JSON
  API with Swift never matched my needs. Here is why and how I fix it.
category: Journaling
tags:
  - iOS
  - Swift
  - JSON
  - JavaScript
revisions:
  "2021-01-18": Initial version
---

This blog post will present why I'm frustrated with the current state of
`JSONDecoder` and `JSONEncoder`[^3], how I think dates should be formatted in a
JSON API, and the code I write to handle JSON date decoding and encoding in my
applications.

## The Problem with `Codable`'s JSON Support

Swift has 1st-party support for JavaScript script execution. Let's create a
simple JSON payload including a date field in Swift:

```swift
let javaScriptContext = JSContext()!
let jsonPayload = javaScriptContext.evaluateScript("""
const payload = { message: '👋', creationDate: new Date() };
JSON.stringify(payload)
""")
// => {"message":"👋","creationDate":"2021-03-28T13:10:35.656Z"}
```

Now let's decode this JSON string with Swift:

```swift
struct PayloadStruct: Codable {
    let message: String
    let creationDate: Date
}

do {
    _ = try jsonPayload?.toString()?.data(using: .utf8).map {
        try JSONDecoder().decode(PayloadStruct.self, from: $0)
    }
} catch let DecodingError.typeMismatch(type, context) {
    dump(type)
    dump(context) // creationDate: Expected to decode Double but found a string/data instead.
}
```

This code throws a `DecodingError.typeMismatch` error with the following
description: `Expected to decode Double but found a string/data instead.`

This is because, by default, a `Date` type is expected to be a `Double`
specifying the number of seconds since 00:00:00 UTC on 1 January 2001. But the
date in our JSON string is formatted as ISO 8601.

Let's use `JSONDecoder`'s built-in `.iso8601` configuration of
`DateDecodingStrategy`.

```swift
do {
    let jsonDecoder = JSONDecoder()
    jsonDecoder.dateDecodingStrategy = .iso8601

    _ = try jsonPayload?.toString()?.data(using: .utf8).map {
        try jsonDecoder.decode(PayloadStruct.self, from: $0)
    }
} catch let DecodingError.dataCorrupted(context) {
    dump(context)
}
```

Another error? This time, the code throws a `DecodingError.dataCorrupted` error
with the following description: `Expected date string to be ISO8601-formatted`.
What is going on? 🤔

## There is no date in JSON, but there is in JS

True, [JSON][1] does not specify a format for dates. And if projects such as
[JSON API][3] do [recommend][4] using ISO 8601, because the [W3C][5] also thinks
that this format makes the most sense, they are not clear about what exact
flavor of ISO 8601 should be used.

But let's remember that JSON stands for _JavaScript Object Notation_ and that
[JavaScript does specify how to format its date type in JSON][2].

If you want to refer to March 23rd 2012, at 6:25:43PM UTC timezone, at
millisecond 511, then, whatever your own timezone, you should use:

```
2012-04-23T18:25:43.511Z
```

Why?[^1]

- It is readable for humans;
- It sorts correctly;
- It includes fractional seconds, which can help re-establish chronology.

In Swift, this format is achieved by using a `ISO8601DateFormatter` — beware,
not a `DateFormatter` — set up with the formatting options
`.withInternetDateTime` (which is the default), and `.withFractionalSeconds`.

## A Swift class and convenient extensions to manage dates in JSON API

As of today, here are the options for the enum
[`JSONDecoder.DateDecodingStrategy`][7] that `JSONDecoder` can use:

1. `deferredToDate`: the default using a `TimeInterval` (ie an alias to
   `Double`) that is not human-readable;
2. `iso8601`: this option is using ISO 8601 without fractional seconds, which is
   against the usage and JavaScript's spec;
3. `formatted(DateFormatter)`: never use this since you might — for instance —
   break for users with a 12-hour AM/PM time formatting, which is a lesson I
   learned the hard way[^2];
4. `custom((Decoder) -> Date)`: 🎉 this is the option we want and here is the
   version I suggest 👇.

```swift
class JavaScriptISO8601DateFormatter {
    static let fractionalSecondsFormatter: ISO8601DateFormatter = {
        let res = ISO8601DateFormatter()
        // The default format options is .withInternetDateTime.
        // We need to add .withFractionalSeconds to parse dates with milliseconds.
        res.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return res
    }()

    static let defaultFormatter = ISO8601DateFormatter()

    static func decodedDate(_ decoder: Decoder) throws -> Date {
        let container = try decoder.singleValueContainer()
        let dateAsString = try container.decode(String.self)

        for formatter in [fractionalSecondsFormatter, defaultFormatter] {
            if let res = formatter.date(from: dateAsString) {
                return res
            }
        }

        throw DecodingError.dataCorrupted(DecodingError.Context(
            codingPath: decoder.codingPath,
            debugDescription: "Expected date string to be JavaScript-ISO8601-formatted."
        ))
    }

    static func encodeDate(date: Date, encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        try container.encode(fractionalSecondsFormatter.string(from: date))
    }

    private init() {}
}

extension JSONDecoder.DateDecodingStrategy {
    static func javaScriptISO8601() -> JSONDecoder.DateDecodingStrategy {
        .custom(JavaScriptISO8601DateFormatter.decodedDate)
    }
}

extension JSONDecoder {
    static func javaScriptISO8601() -> JSONDecoder {
        let res = JSONDecoder()
        res.dateDecodingStrategy = .javaScriptISO8601()
        return res
    }
}

extension JSONEncoder.DateEncodingStrategy {
    static func javaScriptISO8601() -> JSONEncoder.DateEncodingStrategy {
        .custom(JavaScriptISO8601DateFormatter.encodeDate)
    }
}

extension JSONEncoder {
    static func javaScriptISO8601() -> JSONEncoder {
        let res = JSONEncoder()
        res.dateEncodingStrategy = .javaScriptISO8601()
        return res
    }
}
```

## Usage

```swift
let payload = try jsonPayload?.toString()?.data(using: .utf8).map {
    try JSONDecoder.javaScriptISO8601().decode(PayloadStruct.self, from: $0)
}

let reencodedJSONPayload = (try? JSONEncoder.javaScriptISO8601().encode(payload)).flatMap {
    String(data: $0, encoding: .utf8)
}
```

A playground with the code from this post is available [here][10].

[^1]:
    Please refer to [this StackOverflow thread][6] for a more elaborate
    conversation about this issue.

[^2]: And knowing that [I am not the only one][8] does make me feel better.
[^3]:
    The good news being that the community is [currently collecting
    feedbacks][9] to iterate over Swift's serialization features.

[1]: https://www.json.org/
[2]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON
[3]: https://jsonapi.org/
[4]: https://jsonapi.org/recommendations/#date-and-time-fields
[5]: https://www.w3.org/TR/NOTE-datetime
[6]:
  https://stackoverflow.com/questions/10286204/what-is-the-right-json-date-format
[7]:
  https://developer.apple.com/documentation/foundation/jsondecoder/datedecodingstrategy
[8]:
  https://github.com/Ranchero-Software/NetNewsWire/commit/afbe25a26c291dc5d006dfda2eb4650bcaa9f9f7
[9]: https://forums.swift.org/t/serialization-in-swift/46641
[10]: https://github.com/dirtyhenry/xcode-playgrounds
