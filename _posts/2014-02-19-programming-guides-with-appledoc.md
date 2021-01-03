---
layout: post
title: How to generate Programming Guides with Appledoc
tags: [ios]
---

[appledoc][appledoc] is a pretty awesome tool. It's a command line tool that
generates a very Apple-like documentation for your Objective-C projects. The
documentation is a little short on details and isn't clear if you can also
create Apple-like Programming Guides or documentation pages decoupled from code.
Well guess what? You can! And with [Markdown][markdown] support, which makes the
whole thing even more awesome.

## How do you do it then?

It's pretty straightforward, you just need to create Markdown files, suffixed
with `-template.md` and add a `--include` instruction in your appledoc call as
in:

```
appledoc ... \
  --include my-first-template.md \
  --include My\ Second-template.md \
  ...
```

Now, visit your index.html and you'll get a new links section at the bottom of
the page called _Programming Guides_!

## Random Notes

- The name of the guide will be the same than the prefix of your file, so feel
  free to add spaces in it to have a pretty programming guide filename. (Maybe,
  there would be some Jekyll-like metadata stuff support to add to support a
  better way to name your programming guide with a spaceless filename)
- Let's all say a big _Thank You_ to Tomaz for this awesome tool. If the doc is
  light, the length of [his](https://github.com/tomaz/appledoc/issues/7)
  [comments](https://github.com/tomaz/appledoc/issues/66) in
  [issues](https://github.com/tomaz/appledoc/issues/74) pages are very detailed
  and gave me the solution for this problem.

[appledoc]: https://github.com/tomaz/appledoc
[markdown]: https://daringfireball.net/projects/markdown/
