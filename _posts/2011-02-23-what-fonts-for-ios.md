---
layout: default
title: "What fonts for iOS?"
category: blog
migrated-from: https://mickaelflochlay.com/spip/What-fonts-for-iOS
---

**Deprecated!** This article is embarrasingly out of date since
[adding a custom font to an app](https://developer.apple.com/documentation/uikit/text_display_and_fonts/adding_a_custom_font_to_your_app)
has been supported since iOS 3.2, and
[webfonts are now widely supported by browsers](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face).
{: .alert .alert-warning}

Fonts are a major element of webdesign. And when you talk about webdesign
nowadays, you can't just skip mobile devices. The problem is that iOS only comes
with a limited numbers of fonts, and there is no way you can install new fonts
on iOS devices. What can you do about that? {: .lead}

## Fonts that are installed on iOS devices

First, you need to know what fonts are available with iOS. We are lucky, people
already did that job and you can find fonts available for iOS at...
[iosfonts.com](http://iosfonts.com) (notice that the iPad comes with more fonts
than iPhone and iPod Touch).

## Google can help

Then, you can use
[Google's Font API service](https://developers.google.com/fonts/). It's easy to
use and Google provide quite a number of cool fonts (the list is
[here](https://fonts.google.com)).

That's what I used to update [my online CV][1]... that could not display Myriad
Pro (the default font) on iOS devices:

This is what I had designed (using the font Myriad Pro):

![Screenshot with Mac's Google Chrome using Myriad Pro](/assets/images/ios-font-designed.png)

This is what was rendered on the iPad:

![Screenshot with iPad where Myriad Pro is replaced by some default fonts](/assets/images/ios-font-rendered.jpg)

And this is what I finally got after replacing Myriad Pro by Google Fonts's
Kreon:

![Screenshot with Google Chrome and iPad after changing the font to the Kreon webfont](/assets/images/ios-font-rendered.jpg)

## CSS3 and Images can help too

Other solutions include:

- [`font-face`](http://www.css3.info/preview/web-fonts-with-font-face/) that
  CSS3 will help to promote;
- using images for design:
  - Either the straightforward use: create your design with Photoshop and export
    them as images;
  - or the more-complicated use: export all the characters you need as image and
    JavaScript your design to use them for custom texts.

[1]: https://mickaelflochlay.com/cv.html
