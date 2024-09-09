---
layout: post
id: 6C6B8E25-B308-4C60-9CD9-9E9A39C4F3F6
title: A Same Website for Desktop and Mobile
author: Mick F
excerpt: >-
  An experiment to build a scaffold for a responsive website that works well on
  both desktop and mobile.
category: Web Publishing
tags:
  - CSS
revisions:
  "2010-08-07": First version of the post
  "2013-09-06": Deprecation notive
  "2021-07-21": Remove obsolete mentions of 'what's next'
---

Internet is turning mobile. So what should I do then? Make a desktop version and
a mobile version of my website? Not really. CSS at the rescue.

## Fluid Grids

The first thing to do is to use [_fluid grids_][3], which means using only
relative sizes in your CSS, instead of absolute ones. You can setup sizes
relative to the default browser font size, to the parent HTML blocks, etc.

With this kind of relative sizing, when the user changes the size of the
browser, all the elements keep the same proportions.

## Media Queries

But what if a screen size gets to this critical point where keeping the same
aspect and proportion is not relevant anymore? Then, you should use [_media
queries_][4].

Here again, this is a CSS technique that you can use to reorganize the layout of
your webpage upon certain conditions. For instance, if the width of the browser
is below a certain size, you can give up a column layout and switch to a
single-column layout where blocks are placed one upon another.

## Fluid Images

Of course, this is not enough and new issues are going to rise when you're going
to put images, or YouTube embeds inside your pages.

[Some stuff][5] can help (the CSS `max-width` attribute for instance), but it's
not universally supported yet.

## What about iOS?

What's interesting me most here is not Internet Explorer-compatibility though,
but making websites that look good on iOS devices, the iPhone and the iPad. I've
tried to give these techniques a try and here it is:

{% asset grid.png alt="A grid layout" %}

This is a 10-column layout of 82px each, separated by 20px gutters. With 2
outside gutters of 12px each, we get a grid defined by a default width of
1024px.

To setup my CSS correctly, some math are required:

{% asset grid-math.png alt="Some grid math" %}

Then I had all I needed to build the [CSS][1] for [this demo page][2].

This demo page renders as follow on the iPhone, portrait and landscape:

{% asset grid-portrait.jpg alt="Grid page rendering on an iPhone with portrait orientation" %}

{% asset grid-landscape.jpg alt="Grid page rendering on an iPhone with landscape orientation" %}

[1]: ../../assets/grid.css
[2]: ../../assets/grid-demo/
[3]: https://alistapart.com/article/fluidgrids/
[4]: https://alistapart.com/article/responsive-web-design/
[5]: https://unstoppablerobotninja.com/entry/fluid-images/
