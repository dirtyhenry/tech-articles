---
layout: default
title: Writing a Swift Pomodoro Timer Command-Line Tool
category: blog
---

I wanted to experiment on writing command line tools with Swift, I wrote a
simple command-line [pomodoro][pomodoro] timer. I had to find answers to quite a
number of questions to achieve this, but Internet is great at finding answers to
things. So here we go.

## How to write a progress bar on the command line?

I had never written a progress bar on the command line before and this
[StackOverflow question][progress-bar-so] was of great help to understand how
they work.

## How to start with Swift command-line tools?

To get started, I recommend [this Swift Talk video][swifttalk] (a little over 17
minutes long). As I had trouble setting up dependencies right (the video is
getting old and Swift changed in the meantime), [this post about the Package
Manager][package-manager] on Swift's website, was also pretty useful to get a
working Xcode project with the [Commander][commander] dependency setup right.

Basically, everything you need to type in the terminal is:

    swift package init --type executable
    # Setting up dependencies in `Package.swift`
    swift package update
    swift package generate-xcodeproj
    swift build
    .build/debug/<name-of-your-target>

## How to output things to the standard output?

Well `print()` is the easy answer by it doesn't manage escaping characters
right. So `FileHandle.standardOutput` was what I was looking for to manage a
proper terminal progress bar.

## What does the results look like?

Try it [here][github].

## What are the next steps?

- Ask for the description of the task before starting the pomodoro;
- Log the pomodoro in a file for archives and time-reporting;
- ✔︎ ~~Notify the user in the notification center or by a sound when the timer
  ends.~~;
- ✔︎ ~~Integrate with other stuff via **Shell** scripts.~~;
- Use the full width of the terminal window instead of a fixed length (which
  should mean
  [reading environment variables](https://stackoverflow.com/questions/36219597/referring-to-environment-variables-in-swift));
- ✔︎ ~~Build for release~~;
- Distribute.

[pomodoro]: https://en.wikipedia.org/wiki/Pomodoro_Technique
[progress-bar-so]:
  https://stackoverflow.com/questions/238073/how-to-add-a-progress-bar-to-a-shell-script
[swifttalk]: https://talk.objc.io/episodes/S01E22-command-line-tools-with-swift
[package-manager]: https://swift.org/package-manager/
[commander]: https://github.com/kylef/Commander
[github]: https://github.com/dirtyhenry/pomodoro-cli/
