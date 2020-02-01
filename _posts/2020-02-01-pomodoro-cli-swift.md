---
layout: default
title: Pomodoro CLI 1.0.0 Released 🎉
category: blog
---

A little more than two years after work started on this, I'm happy to annouce
that `pomodoro-cli` 1.0.0 has been released today. I finally felt enough
features were here to decide a tag was needed.

## Where is this?

I still need to work on the distribution via Homebrew but the code and
installation steps can be found on [the project website][1] or [GitHub][2].

## What on Earth Is Pomodoro?

It's a time management technique that was created by Francesco Cirillo. He wrote
[a book][pb] and [a website][pw] about it, so I'll just say it's about splitting
up your work into time-boxed focus time on one objective. Pretty damn efficient
when you can affort to stick to it I must say.

## Why the Hell Did You Do That?

Sure, whether you're talking CLI apps or whatever apps, there is nothing
revolutionary with this tool. As a matter of fact, There is [a crazy amount of
alternatives on GitHub][ghs].

**But**:

1. **I made it.**

   That works for me only but it does count;

1. **It is made in Swift.**

   As of today, it is the only result for [this other GitHub search][ghs2];

1. **It has hooks.**

   You can plus your own scripts when a pomodoro starts and when a pomodoro
   finishes. I used them to include a cool Italian voice making the
   announcements and it puts my display to sleep when a pomodoro is over. No
   excuse for taking a break.

1. **It keeps an history.**

Every pomodoro starts by asking a simple question: what is the intent of the
current pomodoro. When the pomodoro finishes, the dates and this intent are
logged in a YAML file so I can track back how I spent my time.

## A simple use case

This blog post was written during 1 Pomodoro. Here is the associated log from
the journal:

```yaml
- - startDate: 01/02/2020 21:23:10
  - endDate: 01/02/2020 21:48:10
  - message: Write a blog post about Pomodoro 1.0.0
```

(OK, I shitted, I added this journal entry after the Pomodoro finished, so yes,
I spent a little more time than 1 Pomodoro working on this post. Sue me!)

[1]: https://dirtyhenry.github.io/pomodoro-cli/ "Jazzy docs for Pomodoro CLI"
[2]:
  https://github.com/dirtyhenry/pomodoro-cli
  "GitHub repository for Pomodoro CLI"
[pb]:
  https://francescocirillo.com/products/the-pomodoro-technique-book-us-edition
  "The Pomodoro Technique Book"
[pw]: https://pomodorotechnique.com/ "The Pomodoro Technique Website"
[ghs]:
  https://github.com/search?q=pomodoro+cli
  "GitHub search results for Pomodoro and CLI"
[ghs2]:
  https://github.com/search?q=pomodoro+cli+language%3ASwift
  "GitHub search results for Pomodoro, CLI AND Swift"
