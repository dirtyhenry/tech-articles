---
layout: post
id: D1EA1F5C-9AD6-4C3B-AD0D-ECB05C4651BF
title: Notes From Swift Heroes Digital 2021
author: Mick F
excerpt: >-
  Among the talks I recommend the most: digging down into Core Text, the future
  of asynchronous development in Swift with `async/await` and how Core Data is
  still relevant when using SwiftUI.
category: Conference Notes
tags:
  - iOS
  - Swift
  - SwiftUI
---

[Swift Heroes][5] went digital because of the Covid pandemic restricting public
gatherings. I am not the best at socializing during conferences and watching
online talks from my comfy chair is a format that I somewhat shamefully enjoyed.
Here are my notes from the talks I have watched.

Talks with 🌟 are the talks I recommend the most.

## Let’s Make That Label With Core Text - [Marcin Krzyżanowski][7] 🌟

Marcin is working on his [Swift Studio][8] project, a Swift IDE for which he had
to dig down deep into the Core Text framework. I enjoyed this talk following [my
own errands on text layout customization][i2] and I intend to use the content of
his talk to address another use case: how to balance the lengths of broken lines
of text, to avoid a situation where the last line can be much shorter than its
siblings.

## Future of Swift: A Sneak Peek at `async/await` - [Vincent Pradeilles][11] 🌟

Vincent presented the [`async/await` proposal][12] that will be part of Swift
5.5. On the way, he explained how to install the development snapshots of Swift
in Xcode, insisted that `async/await` would not be competing with Combine and
mentioned exciting [upcoming features for Swift concurrency][18].

## Using Core Data in a Modern SwiftUI Application - [Donny Wals][15] 🌟

Until 2017, I was using Core Data on a daily basis. But since, I have not used
it at all. I had the feeling it was becoming a dying technology but this talk
convinced me it was still very relevant since Donny makes the case it integrates
really well with SwiftUI since `NSManagedObject` conforms to `ObservableObject`.
Donny wrote a book about it, [_Practical Core Data_][16] that digs further on
the topic.

## Evolving Existing Projects With SwiftUI - [Peter Steinberger][1]

This felt like a natural follow-up to Peter's talk at [FrenchKit 2019][i1] about
[shipping a Catalyst app][2]. He offered feedback on integrating small doses of
SwiftUI in a large codebase with a long history that is a mix of Objective-C and
Swift.

Here is what I'll take away from the talk:

- SwiftUI is unstable and change dramatically at each version;
- Previews can time out being _de facto_ unreliable;
- `GeometryReader` should be used as high in the hierarchy as possible;
- There are straightforward workarounds to SwiftUI limitations — via custom view
  modifiers for instance — but they should be considered as hacks with the risks
  it implies in terms of maintenance;
- Mentioned projects were:
  - [SwiftUI-Introspect][3]: helps to introspect underlying UIKit components
    from SwiftUI;
  - [SwiftUIX][4]: a project that attempts to fill the gaps that SwiftUI suffers
    from when compared to UIKit or AppKit.

## Combining SwiftUI and UIKit: AppClips and Widgets - [Anna Zharkova][6]

Widgets and AppClips are additions to iOS that come with significant
restrictions compared to what you can achieve in an app. Anna presented
workarounds against the lack of dynamism that she met while developing widgets
and app clips using bike ride maps as an example.

My main takeaway is that, since neither the keychain or local authentication can
be used in these app-derivatives, then if any of the data you would like to
present require authentication, you are out of luck.

## Creating Machine Learning Models With Create ML - Moritz Philip Recke, Tiago Gomes Pereira & Giovanni Monaco

This talk was presenting how to create machine learning models with convenience
using [IBM's Cloud Annotations tool][9] to create training and testing data
sets, and feeding these into the macOS [Create ML][10] app. It did sound
accessible and I intend to give it a try one day.

## Mocka: A Mock Server for Developers by Developers - Fabrizio Brancati & Firas Safa

[Mocka][13] is an open-source server to mock backend API responses to test
backend edge cases with convenience. The project is promising and I will keep an
eye on it but it is still a young product with many missing features so I am not
sure I will start using it today.

## How to Think Like a SwiftUI View Modifier - [Josh Holtz][14]

Josh presented some view modifiers he programmed and the struggles and pitfalls
he met on the way. A good time saver for people starting learning SwiftUI.

## Full Stack Swift Development - [Kilo Loco][17]

Kilo is a developer advocate for AWS and gave a fair overview of technologies to
use Swift on the backend, even though he obviously highlighted AWS Amplify. It
felt like investing on AWS technologies could result in a lock-in so I was not
convinced I would invest in this direction for hobby projects.

[i1]: {% post_url 2019-10-10-frenchkit-2019 %}

[i2]: {% post_url 2021-02-04-line-height-with-uikit %}

[1]: https://steipete.me/
[2]: https://youtu.be/Xo3zGlyxXcI
[3]: https://github.com/siteline/SwiftUI-Introspect
[4]: https://swiftuix.com/
[5]: https://swiftheroes.com/2021/
[6]: https://twitter.com/anioutkajarkova
[7]: https://twitter.com/krzyzanowskim
[8]: https://swiftstudio.app/
[9]: https://cloud.annotations.ai/
[10]: https://developer.apple.com/machine-learning/create-ml/
[11]: https://twitter.com/v_pradeilles
[12]:
  https://github.com/apple/swift-evolution/blob/main/proposals/0296-async-await.md
[13]: https://github.com/wise-emotions/mocka
[14]: https://twitter.com/joshdholtz
[15]: https://twitter.com/donnywals
[16]: https://gumroad.com/l/practical-core-data
[17]: https://twitter.com/kilo_loco
[18]: https://forums.swift.org/t/swift-concurrency-roadmap/41611
