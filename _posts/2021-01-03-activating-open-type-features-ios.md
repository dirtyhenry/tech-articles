---
layout: post
title: Activating OpenType Features in iOS
tags: [Swift, iOS, fonts]
category: Journaling
excerpt: >-
  Using OpenType features of fonts on the web is straightforward. Using them on
  iOS require a little bit more work but is totally feasible. Let's see how.
---

[Inter][1] is an awesome typeface. It is free, open-source, and on top of
looking great by default, it provides [many OpenType features][2] that are
really easy to use on a website. The [alternate digits feature][3] is one of
them. Just add the following to a CSS style and you’re done.

```css
font-feature-settings: "ss01";
```

**How can we benefit from the same optional features with UIKit?** This post
will recap my journey to activate the alternate digits feature on an iOS app.

## Adding a custom font and using it

[Adding a custom font to your app][4] is now pretty easy, compared to [the old
days][i1]. From there, the most obvious next step is to run [a piece of
code][c1] that I include in every project that use custom fonts. It simply
prints a list of the font names that are available from your app.

```swift
extension UIFont {
    static func printAllFontNames() {
        print("# All Font Names\n")
        for familyName in UIFont.familyNames {
            print("- \(familyName)")
            for font in UIFont.fontNames(forFamilyName: familyName) {
                print("  - \(font)")
            }
        }
    }
}
```

## Listing features of a font

Activating features with UIKit is described in the [_Activating Font Features_
section of the Text Programming Guide for iOS][5]. The code that is presented
there relies on Objective-C Core Text that you can wrap in modern Swift.

To list the features that are supported by a font, you can use the following
code:

```swift
extension UIFont {
    typealias FontFeatureInfo = [String: Any]

    func listFeatures() {
        guard let fontFeatures = CTFontCopyFeatures(self) as? [FontFeatureInfo] else {
            debugPrint("Could not copy font features.")
            return
        }

        fontFeatures.forEach { fontFeatureInfo in
            print(fontFeatureInfo)
        }
    }
}
```

It is hard to predict how large the output of this command will be and really
depends on the font. For the Inter font, [the output looks pretty intense][c2].
It is not the most pleasant prose to read for humans, but scanning for the
features we want will be pretty straightforward.

In my context, the part I was interested in was the following:

```
["CTFeatureTypeName": Alternative Stylistic Sets, "CTFeatureTypeIdentifier": 35, "CTFeatureTypeSelectors": <__NSArrayM 0x600002179f20>(
{
    CTFeatureSelectorIdentifier = 2;
    CTFeatureSelectorName = "Open digits";
},
```

To activate the _Open digits_ feature, I had to use the **feature type
identifier 35**, with the **feature selector identifier 2**.

## Enabling the font features you want

So far, the code I showed was to get your app in the starting blocks. It helps
you to prepare for the big stage moment: **actually** enabling the font
features.

So I wrapped these 35 and 2 _magic numbers_ into something more meaningful: a
simple struct trying to make sense of Apple's documentation[^1]. It is pretty
basic, aimed to be built on in the future, and I made use of this incredible
[Font Feature Registry][6] resource[^2] to find inspiration for an adequate
naming:

```swift
sprivate enum FeatureTypeSelectorPair {
    typealias PairDescriptor = (Int, Int)

    static let stylisticAlternativesStylisticAltOne: PairDescriptor = (35, 2)

    static func attributeValue(for pairDescriptor: PairDescriptor) -> Any {
        [
            UIFontDescriptor.FeatureKey.featureIdentifier: pairDescriptor.0,
            UIFontDescriptor.FeatureKey.typeIdentifier: pairDescriptor.1,
        ]
    }
}
```

Once there, I was able to instanciate the `UIFont` including the option I wanted
like so:

```swift
func createFontWithOptions(fontName: String, size: CGFloat) -> UIFont {
    let resultFont = UIFontDescriptor(name: fontName, size: size)
        .addingAttributes([
            .featureSettings: [
                FeatureTypeSelectorPair.attributeValue(
                    for: FeatureTypeSelectorPair.stylisticAlternativesStylisticAltOne
                ),
            ],
        ])

    // 0.0 means the size from the descriptor will prevail.
    return UIFont(descriptor: resultFont, size: 0.0)
}
```

## The outcome: an alternative digits style

🎉 Tada! I was done. Here is what it looks like in the end: a label with the
default Inter Bold font appears first, and the label with the Inter Bold with
the alternate digits feature enabled appears last.

{% asset inter-font-with-or-without-options.png alt="A screenshot comparing the string '0123456789' with or without the option" %}

A playground using all this code is available [here][c3].

[1]: https://rsms.me/inter/
[2]: https://rsms.me/inter/#features
[3]: https://rsms.me/inter/#features/ss01
[4]:
  https://developer.apple.com/documentation/uikit/text_display_and_fonts/adding_a_custom_font_to_your_apps
[5]:
  https://developer.apple.com/library/archive/documentation/StringsTextFonts/Conceptual/TextAndWebiPhoneOS/CustomTextProcessing/CustomTextProcessing.html#//apple_ref/doc/uid/TP40009542-CH4-SW6
[6]:
  https://developer.apple.com/fonts/TrueType-Reference-Manual/RM09/AppendixF.html

[i1]: {% post_url 2011-02-23-what-fonts-for-ios %}

[c1]: https://gist.github.com/dirtyhenry/c9fb50745491624fa75768d3149376f6
[c2]: https://gist.github.com/dirtyhenry/875ebeac13882c5dad710f22f17be5c5
[c3]:
  https://github.com/dirtyhenry/xcode-playgrounds/tree/master/activating-opentype-features.playground

[^1]:
    ⚠️ Note:
    [the documentation of `UIFontDescriptor.FeatureKey`](https://developer.apple.com/documentation/uikit/uifontdescriptor/featurekey)
    was one of the most confusing I met. It said (1) that `featureIdentifier`
    was a key for identifying a font feature type such as ligature or character
    shape and (2) `typeIdentifier` was a key for identifying the font feature
    selector. So `featureIdentifier` refers to `CTFeatureTypeIdentifier` while
    `typeIdentifier` refers to `CTFeatureSelectorIdentifier`. Of course, I had
    it switched the wrong way the first time I ran the code. Confusing you said?
    🤯

[^2]:
    I never considered myself an expert in typefaces or fonts design and
    abilities but this resource was so humbling that I definitely decreased the
    perception of my own level in that skill by quite some orders of magnitude
    😂
