---
layout: post
id: b2dfab02-229e-49b1-a023-36ae372f21cd
title:
  "Get rid of types you don't control early: a lesson (re)learned, Rolling
  Stones Edition"
author: Mick F
excerpt: >-
  With my special sauce to future-proof your API and boost testability!
category: Journaling
tags:
  - Swift
  - iOS
---

In recent weeks, I've been reminded of a crucial lesson: “Do not use the objects
that are used by an API[^1] outside of the network layer of your application.”

While this might seem like common sense in a technical interview, the real-world
scenario brings its own challenges, especially when dealing with (a) an in-house
designed API[^2], (b) budget constraints, and (c) the task of writing
boilerplate to convert DTO into model objects. It's surprisingly easy to give in
to the temptation.

I'm writing this post to emphasize that the effort is always worth it. To drive
this point home, I'll provide real-life examples to illustrate why.

## Example 1: Future-proofing an API

Let's delve into an API where a payload includes the name of a member of the
Rolling Stones. And just for the heck of it, you decide to write an enum to
represent this value. Because… why not?

Here's the enum to kick things off:

```swift
/// 👅 Members of the Rolling Stones
enum RollingStone: String {
    case mick = "Mick Jagger"
    case keith = "Keith Richards"
    case bill = "Bill Wyman"
    case charlie = "Charlie Watts"
    case brian = "Brian Jones"
}
```

Now, imagine using a DTO as a model:

```swift
struct DTOAsModel: Codable {
    let rollingStone: RollingStone
}

extension RollingStone: Codable {}
```

And this works fine!

```swift
do {
    let member1 = try JSONDecoder().decode(
        DTOAsModel.self,
        from: """
        { "rollingStone": "Mick Jagger" }
        """.data(using: .utf8)!
    )
} catch {
    print(error)
}
```

But what if the backend adds "[Mick Taylor][2]" as a new possible value that
your Swift code has no idea about?

```swift
do {
    let member2 = try JSONDecoder().decode(
        DTOAsModel.self,
        from: """
        { "rollingStone": "Mick Taylor" }
        """.data(using: .utf8)!
    )
} catch {
    print(error)
}
```

Oops, we crash.

There's a quick and dirty way to fix this, and I'll admit, I've been guilty of
doing it. What if we changed `rollingStone`:

```diff
  struct DTOAsModel2: Codable {
-      let rollingStone: RollingStone
+      let rollingStone: String
  }

+ extension DTOAsModel {
+     var typedRollingStone: RollingStone? {
+         RollingStone(rawValue: rollingStone)
+     }
+ }
```

But then things get messy: objects are cluttered, autocompletion becomes hard to
read, initializers are not using the enum type, etc.

So what I believe today is the right way to do things is:

1. Limit yourself to JSON-supported types in your DTO;
1. Create typed model-objects;
1. Add extensions that can convert from DTO objects into model objects in your
   network layer.

```swift
struct DTOAsJustDTO: Codable {
    let rollingStone: String
}

struct ProperModel {
    let rollingStone: RollingStone
}

extension ProperModel {
    init?(dto: DTOAsJustDTO) {
        guard let rollingStone = RollingStone(rawValue: dto.rollingStone) else {
            return nil
        }

        self.rollingStone = rollingStone
    }
}
```

At the cost of a little boilerplate, you have two clean objects that do things
right.

There are many options to support future values of the enum:

- A [failable initializer][1], as in the example,
- A throwing initializer,
- A prop that can be optional,
- Adding an `.unknown` rolling stone in the enum,

It is really up to you and what feels best.

## Example 2: Improving testability of code you don't control

Let's take a look outside of the network layer, with other types of API that you
don't control. The principles are similar.

So now your app receives a push notification every time the Rolling Stones
release an album.

```swift
func showNotification(_ notification: UNNotification) {
    let userInfo = notification.request.content.userInfo

    guard let albumName = userInfo["albumName"] as? String else {
        return
    }

    print(albumName)
}
```

How can you test this? You cannot create instances of `UNNotification`.

Instead, get rid of things out of your control early on. Take control of things.
Like so:

```swift
enum NotificationEvent {
    case newAlbum(String)
}

extension NotificationEvent {
    init?(from notification: UNNotification) {
        guard let albumName = notification.request.content.userInfo["albumName"] as? String else {
            return nil
        }

        self = .newAlbum(albumName)
    }
}

func showNotification(_ notification: NotificationEvent) {
    guard case let NotificationEvent.newAlbum(albumName) = notification else {
        return
    }

    print(albumName)
}
```

With this code, testing `NotificationEvent.init?(from:)` will be challenging.
But testing `showNotification` will be easy-peasy. Mission accomplished.

## More examples to come?

For sure, I will encounter more examples in the future. And I'll continue to
update this post as a reference for my future-self on how I want to code future
similar scenarios.

[^1]: I will call them Data Transfer Objects _aka_ DTO for the rest of this post
[^2]:
    So you sort of control it, right? Well, not really. If an API is designed
    for more than 1 client, it might include extra-details or complexity. So
    while you can think you control it as an organization, your Swift project
    does not.

[1]:
  https://docs.swift.org/swift-book/documentation/the-swift-programming-language/initialization/#Failable-Initializers
[2]: https://en.wikipedia.org/wiki/Mick_Taylor
