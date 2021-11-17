---
layout: post
id: 6DE45545-CDE9-451F-B421-A1CD36888ED1
title: A CSS Polaroid Effect With Flexbox
author: Mick F
excerpt: >-
  Revisiting how to show images as if they were polaroids, in CSS, with
  technologies from 2021.
category: Journaling
tags:
  - CSS
  - Sass
  - Compass
  - Jekyll
revisions:
  "2010-09-14": Original post using Compass to author SASS.
  "2021-02-17": Updated with contemporary techniques.
---

Back in 2010, after reading [Zurb's Polaroids with CSS3 blog post][2], I told
myself it could be a really cool effect to present Dead Rooster's MP3
selections[^1] so I adapted the code and made it work with (at the time) very
hot'n'sexy _fluid grids_.

Flash forward to 2021.

I'm migrating Dead Rooster to modern tools. Let's revisit this effect to
re-enable it.

## Jekyll is a decent Sass/SCSS authoring tool

The original version of this post mentioned [**Compass**][3] as a good Sass
authoring framework. It is no longer actively maintainted and nowadays, I rarely
author any CSS outside of a Jekyll project or CSS-in-JS tools such as
[styled-components][4] or [Emotion][5].

We will use [Jekyll's Sass/SCSS support][6] today.

## The Polaroid Effect

<ul class="polaroids">
{% for item in site.data.playlist %}
  <li class="polaroid" href="{{ item.link | default: "#" }}" title="{{ item.artist }}">
    <img src="https://picsum.photos/seed/{{ item.artist }}/200" alt="A random squared photo to illustrate the Polaroid effect."/>
  </li>
{% endfor %}
</ul>

## How it works

I created 2 codepens to compare the code from 2010 to the code of 2021:

- [Polaroid Effects 2010](https://codepen.io/dirtyhenry/pen/BaQPoRL)
- [Polaroid Effects 2021](https://codepen.io/dirtyhenry/pen/vYyaNWE)

## What changed since 2010?

The old code used a lot of fixed sizes and maths, with a variable for the number
of columns at compile time that became a constant at runtime. To mimic this
behavior, we could have used a [**CSS Grid Layout**][8] since, on Dead Rooster,
each post using this effect featured a 3 ⨉ 3 grid of images. But on smaller
screens, the code made the images become too small so I decided [**CSS Flexbox
Layout**][7] led to better results in terms of responsiveness.

**Vendor prefixes** are for the most part useless nowadays. I removed all their
occurrences from the original code and the code behaves as expected on Safari,
Chrome and Firefox on macOS, and on Safari Mobile on iOS.

Finally, SCSS now has a fun `random` native method that can bring more
unpredictability — which is the fun part of this effect — than the Fibonacci
suite multiples that were used in the original code. The random value is only
random at compile-time though, so we still need multiple classes using
`:nth-child` to avoid all polaroids to all be tilted at the same angle.

You can see the effect live on Dead Rooster [here][9], [here][10] or [here][11].

Rock on. 🤘

[^1]:
    [Dead Rooster](https://deadrooster.org) is my blog, written in French, where
    I write about pop culture since 2005.

[1]: https://deadrooster.org/compile-mp3-du-net-01/
[2]: https://legacy-zurb.netlify.app/playground/css3-polaroids
[3]: https://github.com/Compass/compass/
[4]: https://styled-components.com/
[5]: https://emotion.sh/docs/introduction
[6]: https://jekyllrb.com/docs/assets/#sassscss
[7]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[8]: https://css-tricks.com/snippets/css/complete-guide-grid/
[9]: https://deadrooster.org/compile-mp3-du-net-01/
[10]: https://deadrooster.org/compile-mp3-du-net-05/
[11]: https://deadrooster.org/compile-mp3-du-net-08/

[fluidgrid]: {% post_url 2010-08-07-same-site-for-desktop-and-mobile %}
