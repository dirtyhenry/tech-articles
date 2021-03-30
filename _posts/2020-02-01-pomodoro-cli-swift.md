---
layout: post
title: Pomodoro CLI 1.0.0 Released 🎉
tags: [Swift, product]
---

A little more than two years after [I started working on this][3], I am happy to
annouce that [`pomodoro-cli` 1.0.0][4] has been released today. I finally felt
that it had enough features to decide a tag was needed.

## How Can You Install It?

I still need to work on the distribution via Homebrew but the code and
installation steps can be found on [the project website][1] or [its GitHub
repository][2].

## What on Earth Is Pomodoro?

It is a time management technique that was created by Francesco Cirillo. He
wrote [a book][pb] and [a website][pw] about it. To summarize, it's all about
splitting up your work into 25-minutes chunks of time that are each full-focused
on 1 objective. Pretty damn efficient when you can afford to stick to it I must
say.

## Why the Hell Did You Do That?

Sure, whether you're talking CLI apps or whatever apps, there is nothing
revolutionary with this tool. As a matter of fact, There is [a crazy amount of
alternatives on GitHub][ghs].

But!

1. **I made it.**

   This argument might only work for me, but it does count;

1. **It is made in Swift.**

   As of today, it is the only result for [this other GitHub search][ghs2];

1. **It has hooks.**

   You can plug your own scripts when a pomodoro starts and when a pomodoro
   finishes. I used them to include a cool Italian voice making announcements
   and they put my display to sleep when a pomodoro is over. No excuse for not
   taking a break.

1. **It keeps an history.**

   Every pomodoro starts by asking a simple question: what is the intent of the
   current pomodoro. When the pomodoro finishes, the dates and this intent are
   logged in a YAML file so I can track back how I spent my time.

## A simple use case

This blog post was written during 1 Pomodoro. Here is the associated log from
the journal:

```yml
- - startDate: 01/02/2020 21:23:10
  - endDate: 01/02/2020 21:48:10
  - message: Write a blog post about Pomodoro 1.0.0
```

What do you think? How do you like them tomatoes? 🍅

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
[4]: https://github.com/dirtyhenry/pomodoro-cli/releases

[3]: {% post_url 2017-11-04-swift-command-line-pomodoro %}
