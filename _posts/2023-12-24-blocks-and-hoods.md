---
layout: post
id: 1cface0c-09c9-4319-a090-07ebd5e1243d
title: From block party to ’hood party
author: Mick F
excerpt: >-
  In 2023, I consolidated a dependency-free `swift-blocks` package, and I
  started working on a bigger `swift-hoods` package that builds upon my favorite
  dependencies.
category: Journaling
tags:
  - iOS
  - Swift
---

Last year, I wrote about [the joy sparked by side projects][4]. This year, I
wanted to write another small recap of what I have accomplished in 2023. I kept
iterating on my projects but, more importantly, I kept consolidating the
packages that I use to share code between projects: [`swift-blocks`][5] and
[`swift-hoods`][6]. They are open-sourced and I wanted to formally introduce
them to the world. Here we are.

## 🧱 Welcome to my blocks

For the last 2 years, I have been building `swift-blocks`, a **dependency-free**
library of tools and patterns I use repeatedly on all my Swift projects.

It is not my first attempt to build such a library but it is the first time I
feel really satisfied about its usefulness. What was different this time? Two
factors:

1. For one, Swift Package Manager provides a much more convenient way to share
   code between projects than anything else in the past (Cocoapods, static
   libraries, etc.);
2. And then, I had a much better discipline to be consistent about
   using/iterating/adding things to the library over time.

Today, I released version [0.2.0][3] of the library. Here are the release notes.
Help yourself.

- [**🌐 Transport.**][1] Added a tinier version of objcio’s
  [`tiny-networking`](https://github.com/objcio/tiny-networking) for concise
  endpoint description, combining URL requests and response parsing. Introduced
  [`URLRequestHeaderItem`](https://swiftpackageindex.com/dirtyhenry/swift-blocks/0.2.0/documentation/blocks/urlrequestheaderitem)
  struct mimicking Foundation’s `URLQueryItem`.
- [**📅 Calendar.**][2] Improved internal architecture and developer experience
  using _result builders_.
- **🔐 Security.** Introduced support for PKCE and associated helpers.
- **🛟 Error Management.** Introduced
  [`SimpleMessageError`](https://swiftpackageindex.com/dirtyhenry/swift-blocks/0.2.0/documentation/blocks/simplemessageerror)
  for convenient error handling, eliminating the need for forced unwrapping.
  Ideal for scenarios where a full error domain is not necessary.
- **🎨 SwiftUI.** Introduced
  [`TaskStateButton`](https://swiftpackageindex.com/dirtyhenry/swift-blocks/0.2.0/documentation/blocks/taskstatebutton)
  interface components, for representing asynchronous
  [task states](https://swiftpackageindex.com/dirtyhenry/swift-blocks/0.2.0/documentation/blocks/taskstate).
  Supports four states: not started, running, completed (success), or failed.

The [documentation for this package][0] is now hosted on the Swift Package
Index.

## 🏘️ Welcome to my ’hood

In 2023 though, I have been using
[The Composable Architecture](https://github.com/pointfreeco/swift-composable-architecture)
a lot. And I built things that were depending on it. So in addition to
`swift-blocks`, I started building another library, `swift-hoods`[^1], which has
a slightly bigger footprint in a project but is starting to turn out very useful
as well.

Today, it is still in the early stages, but it already provides two useful
items:

- A keychain TCA dependency for easy testing of code that uses keychain items;
- A processor for markdown files that include YAML front-matters.

I will detail how these work in the future.

🎄 Have a happy holiday and happy new year 🥂.

[^1]:
    Hood standing for neighborhood… ie a larger version of a block. Get it?
    Kudos to my lovely wife for helping me find a good name.

[0]: https://swiftpackageindex.com/
[1]:
  https://swiftpackageindex.com/dirtyhenry/swift-blocks/0.2.0/documentation/blocks/networking
[2]:
  https://swiftpackageindex.com/dirtyhenry/swift-blocks/0.2.0/documentation/blocks/calendar
[3]: https://github.com/dirtyhenry/swift-blocks/releases/tag/0.2.0
[4]: https://bootstragram.com/blog/side-projects-2022/
[5]: https://github.com/dirtyhenry/swift-blocks
[6]: https://github.com/dirtyhenry/swift-hoods
