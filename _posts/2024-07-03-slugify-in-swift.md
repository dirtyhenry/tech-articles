---
layout: post
id: 623CF42A-1FFD-4BA4-A87D-5DC555ECA08C
title: Slugify in Swift with applyingTransform
author: Mick F
excerpt: >-
  Foundation's `applyingTransform` function can help create slugs in Swift
  without external dependencies. Here's how.
image: cover.webp
category: Open Sourcing
tags:
  - iOS
  - Swift
---

I've recently added a function to my [Blocks][2] library that allows you to
slugify any string.

## What is a slug

A _slug_ is the part of a URL that identifies a specific page on a website in a
readable and concise way. For example, in the URL `www.example.com/about-us`,
the slug is "about-us."

Slugs have various other uses: you can use them to create file names in your
file system, as Git branch names for issues you're working on, and more.

## What we need

**Essentials.** Slugs should only contain `[a-z0-9-]` characters ie no spaces,
tabs, or underscores. Just letters, digits, and hyphens.

**Accents removal.** We want to remove accents from languages that use the Latin
alphabet. This means characters like `è`, `é`, `ê`, `ë`, `ě`, `ẽ`, `ē`, `ė`, and
`ę` should all be transformed to `e`.

**Support for more alphabets.** Strings written in alphabets other than Latin
should be romanized as accurately as possible.

**Basic emoji support.** Emojis should be removed from the slug, **except** when
the string consists solely of emojis.

We aim to achieve this without relying on external dependencies. Just Swift and
Foundation.

## The magic of `applyingTransform`

The `StringProtocol` protocol provides a powerful function called
[`applyingTransform`][1] that performs most of these transformations. By
applying a series of transformations, you can create an effective `slugify`
function. The ones I used include:

- `.toLatin`: Transliterates a string from any script to the Latin script;
- `.stripDiacritics`: Removes diacritics from a string;
- `.stripCombiningMarks`: Removes combining marks from a string;
- `.toUnicodeName`: Converts characters to their Unicode names.

## Examples

Here are some examples of what `.slugify()` does:

- `Hello Luka Dončić` → `hello-luka-doncic`
- `😀 LOL` → `lol`
- `😀` → `grinning-face`
- `🎸` → `guitar`
- `สวัสดีชาวโลก` → `swasdi-chaw-lok` (Thai for "Hello World")

## The code

You can check out [an up-to-date version of slugify on GitHub][3].

Here's the current implementation:

```swift
public extension StringProtocol {
    func slugify() -> String {
        var slug = lowercased()

        slug = slug.applyingTransform(.toLatin, reverse: false) ?? slug
        slug = slug.applyingTransform(.stripDiacritics, reverse: false) ?? slug
        slug = slug.applyingTransform(.stripCombiningMarks, reverse: false) ?? slug
        slug = slug.replacingOccurrences(of: "[^a-z0-9]+", with: "-", options: .regularExpression)
        slug = slug.trimmingCharacters(in: CharacterSet(charactersIn: "-"))

        if !isEmpty, slug.isEmpty {
            if let extendedSelf = applyingTransform(.toUnicodeName, reverse: false)?
                .replacingOccurrences(of: "\\N", with: ""), self != extendedSelf {
                return extendedSelf.slugify()
            }
        }

        return slug
    }
}
```

[1]:
  https://developer.apple.com/documentation/swift/stringprotocol/applyingtransform(_:reverse:)/
[2]: https://github.com/dirtyhenry/swift-blocks
[3]:
  https://github.com/dirtyhenry/swift-blocks/blob/main/Sources/Blocks/Extensions/StringProtocol.swift
