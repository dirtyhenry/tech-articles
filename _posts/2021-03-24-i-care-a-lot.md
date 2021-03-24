---
layout: post
id: 7ACE8216-F326-4C96-96D5-DE1C3A01DDB4
title: I Care (And Code) a Lot
author: Mick F
excerpt: >-
  A fun experiment to reproduce a 90s inspired still from the trailer of the
  movie *I Care a Lot*.
category: Fun
tags:
  - CSS
  - Sass
revisions:
  "2021-03-24": Initial version
---

When I watched the [trailer][2] of Netflix’s [_I Care a Lot_][1] — which I
recommend —, a text-effect it used striked some nostalgia from the 90s. It had
this vintage Nike tee-shirt vibe to it, and I immediately challenged myself to
attempt to reproduce it in CSS.

Here is what a still from the trailer looks like:

{% asset i-care-a-lot-trailer-snapshot.png %}

And here is the result of my CSS reproduction (works best on a desktop layout):

<p id="icarealot">
I Care a Lot
</p>

[Play with the code on codepen.io][4].

## About the Font

The font looks like Futura Condensed ExtraBold Italic. On macOS, the italic
version is not installed by default, so it renders as a [_fake italic_][3].

If your system does not include any version of Futura, the CSS effect might look
nothing like the still. If so, sorry about that.

## Animating the Colors Combination

The thing I really liked was the matching between the colors of (a) the text and
(b) its stroke.

At first, I was assuming it was just opacity that was creating this nice
combination but it turns out it was a little more complicated than that. After
translating **RGB** (Red Green Blue) values of the color into **HSL** (Hue
Saturation Lightness), things became clearer: the color of the text was
`hsl(49, 64%, 18%)` while the color of the stroke was `hsl(59, 96%, 68%)`.

This change of color model makes animating the hue of this effect very easy:
adding a complete 360 degrees rotation hue filter on our component, while
keeping the `+10` difference in hue, while keeping constant saturation and
lightness values leads to a really good-looking animation.

```css
@keyframes redred {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
```

Here is the animated version:

<p id="icarealot" class="hue-animated">
I Care a Lot
</p>

[1]: https://www.themoviedb.org/movie/601666-i-care-a-lot
[2]: https://youtu.be/D40uHmTSPew
[3]: https://www.marksimonson.com/notebook/view/FakevsTrueItalics
[4]: https://codepen.io/dirtyhenry/pen/zYoybEB
