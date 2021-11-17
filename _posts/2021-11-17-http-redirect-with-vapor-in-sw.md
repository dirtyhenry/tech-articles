---
layout: post
id: CB416F82-E47F-4FF5-9E94-00C02AFF0A28
title: "Responding with a HTTP redirect with Vapor"
author: Mick F
excerpt: >-
  Different strategies — from old fashioned to recommended nowadays — to respond
  to a HTTP request with a redirection status code.
category: Journaling
tags:
  - Swift
  - Vapor
---

## The part where I realize that my HTTP status code knowledge is rusty

To debug a tricky situation[^1], I used Vapor to respond with `302 Found` to an
HTTP request. Here is the code I ended up with.

```swift
import Vapor

struct FoundWrapper {
    let location: String
}

extension FoundWrapper: ResponseEncodable {
    public func encodeResponse(for request: Request)
        -> EventLoopFuture<Response> {
        var headers = HTTPHeaders()
        headers.add(name: .location, value: location)
        return request.eventLoop.makeSucceededFuture(.init(
            status: .found, headers: headers
        ))
    }
}

func routes(_ app: Application) throws {
    app.get("redirect") { _ in
        FoundWrapper(location: "https://foo.tld/bar")
    }
}
```

This is the response when requesting that route:

```
HTTP/1.1 302 Found
location: https://foo.tld/bar
```

At first, I was surprised that this code was not covered by [the _Redirections_
section of Vapor’s documentation][1]. But then I learned that many browsers
broke how the 302 status code was intended to behave, and that [`303 See Other`
and `307 Temporary Redirect` should now be favored][2].

Anyways, this code is useful to respond with an arbitrary status code, and
arbitrary header values. I’m saving it here. 😉

## The part where I get things right

So in this particular situation, the right option was responding with
`303 See Other`.

Here is the code to do so:

```swift
func routes(_ app: Application) throws {
    app.get("redirect") { req in
        req.redirect(
            to: "https://foo.tld/bar",
            type: .normal // 303 See Other
        )
    }
}
```

This is the response when requesting that route:

```
HTTP/1.1 303 See Other
location: https://foo.tld/bar
```

The `.normal` type being the default, I could have omitted it. But I like to
include defaults in my code when they are not that obvious. It can spare my
future self a click to access the doc to remember what the default status code
is.

[^1]:
    “Getting a good experience when clicking an event link in an e-mail”, see
    details in [this Stack Overflow thread][3].

[1]: https://docs.vapor.codes/4.0/routing/#redirections
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302
[3]: https://stackoverflow.com/q/69631672/455016
