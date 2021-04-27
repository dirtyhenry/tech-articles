---
layout: post
id: 38702050-8341-446E-A358-059928D9A264
title: Converting .flac files to .mp3
author: Mick F
excerpt: >-
  How I managed to convert `.flac` files to `.mp3` files on Mac OS X.
category: Journaling
tags:
  - Bash
---

A solution to convert `.flac` files to `.mp3` files from the command line:

- install `lame` and `flac`;
- move the `.flac` files into one directory;
- from that directory, run the following bash script:

```bash
for file in *.flac;
  do $(flac -cd "$file" | lame -h - "${file%.flac}.mp3");
done
```

On Mac OS X, the most convenient options to install `lame` and `flac` are:

- compiling from source to install [lame][1];
- the [Flac tools package][2] to install `flac`.

[1]: https://lame.sourceforge.io/
[2]: https://sourceforge.net/projects/flac/files/flac-darwin/
