---
layout: post
title: "A same website for desktop and mobile?"
javascript: tooltip.js
category: blog
alert:
  level: info
  content: |
    Update 2013: This post was first published in my previous website. It is still mostly relevent but needs updates. I'll try to update it soon.
---

Internet is turning mobile. So what should I do then? Make a desktop version and
a mobile version of my website? Not really. CSS at the rescue.

## Fluid Grids

The first thing to do is to use _fluid grids_, which means using only relative
sizes in your CSS, instead of absolute ones. You can setup sizes relative to the
default browser font size, to the parent HTML blocks, etc.

With this kind of relative sizing, when the user changes the size of the
browser, all the elements keep the same proportions.

## Media Queries

But what if a screen size gets to this critical point where keeping the same
aspect and proportion is not relevant anymore? Then, you should use _media
queries_.

Here again, this is a CSS technique that you can use to reorganize the layout of
your webpage upon certain conditions. For instance, if the width of the browser
is below a certain size, you can give up a column layout and switch to a
single-column layout where blocks are placed one upon another.

## Fluid Images

Of course, this is not enough and new issues are going to rise when you're going
to put images, or YouTube embeds inside your pages.

Some stuff can help (the CSS `max-width` attribute for instance), but it's not
universally supported yet.

## What about iOS?

What's interesting me most here is not Internet Explorer-compatibility though,
but making websites that look good on iOS devices, the iPhone and the iPad. I've
tried to give these techniques a try and here it is:

![A grid layout](../../assets/images/grid.png "A grid layout")

This is a 10-column layout of 82px each, separated by 20px gutters. With 2
outside gutters of 12px each, we get a grid defined by a default width of
1024px.

To setup my CSS correctly, some math are required:

![Some grid math](../../assets/images/grid-math.png "Some grid math")

Then I had all I needed to build the [CSS][1] for [this demo page][2].

This demo page renders as follow on the iPhone, portrait and landscape:

![Grid page rendering on an iPhone with portrait orientation][6]

![Grid page rendering on an iPhone with landscape orientation][7]

## Conclusion

I'll soon adapt this website, quickly put together with ZPIP so that it uses
these methods and is adapted, with a nice design, to the iPhone and the iPad.
Stay tuned.

_⚠️ Update_: This is pretty old and needs to be updated but you can visit the
promised update here: <http://mickaelflochlay.com/spip/>

## Useful resources:

- [Fluid Grids][3]
- [Responsive Web Design][4]
- [Fluid Images][5]

[1]: ../../assets/grid.css
[2]: ../../assets/grid-demo.html
[3]: http://www.alistapart.com/articles/fluidgrids/
[4]: http://www.alistapart.com/articles/responsive-web-design/
[5]: http://unstoppablerobotninja.com/entry/fluid-images
[6]:
  ../../assets/images/grid-portrait.jpg
  "Grid page rendering on an iPhone with portrait orientation"
[7]:
  ../../assets/images/grid-landscape.jpg
  "Grid page rendering on an iPhone with landscape orientation"
