---
layout: post
id: D1EA1F5C-9AD6-4C3B-AD0D-ECB05C4651BF
title: Notes From Swift Heroes Digital 2021
author: Mick F
excerpt: >-
  TODO
category: Conference Notes
tags:
  - Swift
  - SwiftUI
---

[Swift Heroes][5] went digital because of the Covid pandemic restricting public
gathering. I am not the best at socializing during conferences so watching
online talks from my comfy chair is actually a format that I somewhat shamefully
enjoyed. Here are my notes from the talks I have watched.

Talks with 🌟 are the talks I recommend the most.

## Evolving Existing Projects With SwiftUI - [Peter Steinberger][1]

This felt like a natural follow-up to Peter's talk at [FrenchKit 2019][i1] about
[shipping a Catalyst app][2], he offered some feedback on integrating small
doses of SwiftUI in a large codebase with quite a history since it started in
2009 I think and is a mix of Objective-C and Swift.

Here is what I'll take away from the talk:

- SwiftUI is still unstable and change quite dramatically at each version;
- Previews can time out frequently and can be unreliable;
- `GeometryReader` should be used as high in the hierarchy as possible;
- There are straightforward workarounds to SwiftUI limitations — mostly custom
  view modifiers — but they should be considered as hacks with the risks it
  implies in terms of maintenance;
- Some useful projects are:
  - [SwiftUI-Introspect][3]: helps to introspect underlying UIKit components
    from SwiftUI;
  - [SwiftUIX][4]: a project that attempts to fill the gaps that SwiftUI suffers
    from when compared to UIKit or AppKit.

## Combining SwiftUI and UIKit: AppClips and Widgets - [Anna Zharkova][6]

Widgets and AppClips are additions to iOS that come with significant
restrictions compared to what you can achieve in an app. Anna presented some
workarounds againts the lack of dynamism that she met while developing widgets
and app clips using bike ride maps as an example.

My main takeaway is thatn, since neither the keychain or local authentication
can be used in these app-derivatives, then if any of the data you would like to
present require some sort of authentication, they are not the way to go.

## Let’s Make That Label With CoreText - [Marcin Krzyzanowski][7] 🌟

Marcin is working on a [Swift Studio][8] project, a Swift IDE for which he had
to dig quite down into the Core Text framework. I was really intereted in this
talk following [my own errands on text layout customization][i2] and I intend to
use the content of his talk to address another use case: how to balance the
lengths of broken lines of text, to avoid a situation where the line can be
really short compared to its siblings.

## Creating Machine Learning Models With Create ML - Moritz Philip Recke, Tiago Gomes Pereira & Giovanni Monaco

This talks was presenting how to create machine learning models quite easily
using [IBM's Cloud Annotations tool][9] to create training and testing data
sets, and feeding these into the macOS [Create ML][10] app. It did sound quite
accessible and I intend to give it a try real soon.

## To be continued

[i1]: {% post_url 2019-10-10-frenchkit-2019 %}

[i2]: {% post_url 2021-02-04-line-height-with-uikit %}

[1]: https://steipete.me/
[2]: https://youtu.be/Xo3zGlyxXcI
[3]: https://github.com/siteline/SwiftUI-Introspect
[4]: https://swiftuix.com/
[5]: https://swiftheroes.com
[6]: https://twitter.com/anioutkajarkova
[7]: https://twitter.com/krzyzanowskim
[8]: https://swiftstudio.app/
[9]: https://cloud.annotations.ai/
[10]: https://developer.apple.com/machine-learning/create-ml/
