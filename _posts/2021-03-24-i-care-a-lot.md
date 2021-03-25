---
layout: post
id: 7ACE8216-F326-4C96-96D5-DE1C3A01DDB4
title: I Care (And Code) a Lot
author: Mick F
excerpt: >-
  A fun CSS experiment to reproduce a 90s inspired still from the trailer of the
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

The font looks like Futura Condensed ExtraBold Italic. On macOS or iOS, since
the italic version is not installed by default, it renders as a [_fake
italic_][3].

If your system does not include any version of Futura, the CSS effect might look
nothing like the still. Sorry about that.

## Animating the Colors Combination

The thing I liked was the matching between the colors of (a) the text and (b)
its stroke.

At first, I was assuming it was opacity that was creating this nice combination
but it is more complicated than that. After translating **RGB** (Red Green Blue)
values of the color into **HSL** (Hue Saturation Lightness)[^1], things became
clearer: the color of the text was `hsl(49, 64%, 18%)` while the color of the
stroke was `hsl(59, 96%, 68%)`.

This change of color model makes animating the hue of this effect very easy:
adding a complete 360 degrees rotation hue filter on our component, while
keeping the `+10` difference in hue and constant saturation and lightness
values, leads to a good-looking animation.

```css
@keyframes hue-full-rotation {
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

[^1]:
    In case you are not familiar with HSL, Paul Hebert put together this nice
    [post][5], including [this classic exercise][6] comparing how easy it is to
    find a random color both in RGB and HSL.

[1]: https://www.themoviedb.org/movie/601666-i-care-a-lot
[2]: https://youtu.be/D40uHmTSPew
[3]: https://www.marksimonson.com/notebook/view/FakevsTrueItalics
[4]: https://codepen.io/dirtyhenry/pen/zYoybEB
[5]: https://cloudfour.com/thinks/hsl-a-color-format-for-humans/
[6]:
  https://cloudfour.com/thinks/hsl-a-color-format-for-humans/#putting-it-to-the-test
