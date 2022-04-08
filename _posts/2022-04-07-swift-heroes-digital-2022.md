---
layout: post
id: 6F8384DD-E034-42C5-B858-98D016777A94
title: Notes From Swift Heroes Digital 2022
author: Mick F
excerpt: >-
  TO COMPLETE
category: Conference Notes
tags:
  - iOS
  - Swift
  - SwiftUI
---

Just as [I did last year][i1], here are my notes from the talks from [Swift
Heroes][sh] that I have watched from home.

Talks with 🌟 are the talks I recommend the most.

## A Crash Course of async/await (Swift Concurrency) - [Shai Mishali][1] 🌟

Shai offered a large overview of how concurrency has been managed over time by
Swift, from using [`DispatchGroup`][2]:

```swift
func doSomething() {
  let group = DispatchGroup()

  group.enter()
  doAsync { result in
    defer { group.leave() }
  }

  group.notify(queue: .main) {
    print("Done")
  }
}
```

to the [async/await introduced in Swift 5.5][3], made available to iOS 13.0+ and
macOS 10.15+:

```swift
func doSomething() async throws -> UIImage {
  let result = try await doAsync()
}
```

or

```swift
func doSomething() {
  Task { // or Task.detached
    do {
      let result = try await doAsync()
    } catch {
      // handle error
    }
  }
}
```

The main benefits of this evolution are:

- It brings the performance of async code with the readability of sync code;
- You can use async/await not only with functions but also with _async getters_;
- It deals well with error management and task cancellation;
- You can synchronise many _tasks_ via _tasks groups_;
- Async sequences makes it easy to loop over data fetched asynchronoulsy;
- `@MainActor` helps guaranteeing that code will run on the main thread.

If you want to create your own `async` functions, you can use one of:

- `withCheckedContinuation`
- `withCheckedThrowingContinuation`
- `withUnsafeContinuation`
- `withUnsafeThrowingContinuation`

If you want to create your own _async sequences_, using `AsyncStream` was
recommended.

I will for sure give WWDC’s [_Protect mutable state with Swift actors_][4] a
rewatch.

## TextKit 2 Is About to Make Text Easier - [Marcin Krzyżanowski][5]

Marcin built upon [his talk from last year][i1] to give a live coding demo of
the TextKit 2 framework that was [announced at WWDC 21][6] and helped him make
his life easier while working on his [Swift Studio][7] project that is still
ongoing.

He wrote [`STTextView`][8], as an attempt to code a `NSTextView` replacement
component utilizing TextKit 2.

## MODERN COLLECTION VIEWS BY EXAMPLE - [Gaetano Matonti][9]

I haven't used table or collection views in a while and for sure they changed
quite a bit. Gaetano walks through all recent modifications, showcasing how
Apple has used the framework to build their own iOS apps, such as **App Store**
or **Music**.

Also bookmarked: [_Advances in UI Data Sources_][10] from WWDC’ 19.

## THE EVER INCREASING CONVERGENCE OF NATIVE IOS AND ANDROID MOBILE DEVELOPMENT - [John O'Reilly][11]

Kotlin and Swift grew similar and seem to be ever-converging. John made the case
that, if UI should be coded in the primary language for each platform, [Kotlin
Multiplatform Mobile][12] could be a framework of choice to package the common
engine parts of an app. Definitely worth trying or giving a look.

## Swift Mobile DevOps - [Atanas Chanev][13]

Atanas offered a good reminder that Swift can be used to write scripts in ther
terminal, and an overivew of the features of [Bitrise][14].

## TELL ME QUANDO - IMPLEMENTING FEATURE FLAGS - [Jorge D. Ortiz Fuentes][15]

Great live-coding talk on practical tips to embed feature flags within an iOS
app. Funnily enough, many people asked him about his tooling for live coding. It
is called [lazycoder][16] and it is based on [espanso][17], a text expander that
I have been using quite intensively in the recent past and strongly recommend.

## BUILDING SWIFT PACKAGES IN VSCODE - [Tim Condon][x]

TO COMPLETE. I AM HERE!

## IMPROVING DEVELOPER EXPERIENCE THROUGH TOOLS AND TECHNIQUES - [Krzysztof Zabłocki][x]

Krzysztof is making the case that any opportunity to accelerate a process, or
automate steps, or any architecture decision that can help saving time can be
have a tremendous impact on a team when you do the maths.

Jonathan Lefèvre would love this.

Krzysztof did help the NYTimes to rewrite their iOS app.

https://github.com/krzysztofzablocki/Inject

## Title - [Author][x]

Bluetooth: mouais. Le mec hyper émotif. Quelques idées sur les tests
"impossible" Source d'inspiration pour faire une app de webcam ?

## Title - [Author][x]

Firebase. Mouais. Firebase c'est super pour commencer vite. Mais ça rend trop de
service. C'est un peu un lock-in au final.

## Title - [Author][x]

TO COMPLETE

## UI/UX BASICS FOR IOS DEVELOPERS - [Jane Bondar][x]

[NIX](https://www.nixsolutions.com/services/mobile-development-services/)
Ukraine: i like how emotions could be felt during the conference.

https://lawsofux.com/jakobs-law/

Doherty threshold <- joke

The 44pt rule: out of Apple's documentation.

## OBSCURE SWIFT - NON OBVIOUS ASPECTS OF SWIFT AND MAGIC BEHIND THEM - [Paweł Łopusiński][x] (https://twitter.com/Losiowaty)

TO COMPLETE

SIL : Swift Intermediary Laguage ou truc du genre I'm not fmailiar how Swift
related to C++, C, Objective-C, etc.

## REFACTORING RESWIFT APPLICATIONS IN ORDER TO MAKE THEM MODULAR - [Giovanni Catania][x]

https://www.pointfree.co/collections/composable-architecture

I feel sick of Redux though I'd like to have a change to take a look at
PointFree.

## Title - [Author][x]

TO COMPLETE

## Title - [Author][x]

TO COMPLETE

[i1]: {% post_url 2021-04-16-swift-heroes-digital-2021 %}

[sh]: https://swiftheroes.com/2022/
[1]: https://github.com/freak4pc "GitHub profile of Shai Mishali aka freak4pc"
[2]:
  https://developer.apple.com/documentation/dispatch/dispatchgroup/
  "DispatchGroup reference documentation"
[3]:
  https://github.com/apple/swift-evolution/blob/main/proposals/0296-async-await.md
  "async/await Swift proposal"
[4]:
  https://developer.apple.com/videos/play/wwdc2021/10133/
  "Protect mutable state with Swift actors at WWDC 2021"
[5]: https://twitter.com/krzyzanowskim "Twitter account of Marcin Krzyżanowski"
[6]:
  https://developer.apple.com/videos/play/wwdc2021/10061/
  "Meet TextKit 2 at WWDC 2021"
[7]: https://swiftstudio.app "Swift Studio - Swift IDE for Swift Development"
[8]:
  https://github.com/krzyzanowskim/STTextView
  "STTextView: a NSTextView replacement component utilizing TextKit2."
[9]: https://twitter.com/gaetanomatonti "Twitter account of Gaetano Matonti"
[10]:
  https://developer.apple.com/videos/play/wwdc2019/220/
  "Advances in UI Data Sources at WWDC 2019"
[11]: https://github.com/joreilly "GitHub account of John O’Reilly"
[12]:
  https://kotlinlang.org/docs/multiplatform-mobile-getting-started.html
  "Get started with Kotlin Multiplatform Mobile"
[13]:
  https://blog.bitrise.io/author/atanas-chanev
  "BitRise blog articles authored by Atanas Chanev"
[14]:
  https://www.bitrise.io
  "A Continous Integration/Continuous Delivery for mobile products"
[15]: https://github.com/jdortiz "GitHub profile of Jorge D. Ortiz"
[16]: https://github.com/jdortiz/lazycoder
[17]: https://espanso.org
