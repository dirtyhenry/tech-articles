---
layout: post
title: Code Reviews, a Checklist
tags: [oped]
---

Reviewing code from fellow developers should be considered a best practice.
While its main goal is to make sure your teammate didn't lose track of what a
good software developer should do, it can also help the reviewer extend his
knowledge of a project and get inspired by other's code.

## 5 Golden Rules

Things to have in mind/check when you review code include these 5 golden rules:

1. The code compiles on the reviewer's environment without warnings and tests
   are not broken.
1. The new code implements the bug fix/feature it was supposed to.
1. The code remains [DRY][2].
1. Things are kept small and simple, with a clear separation of concerns: ["each
   class should do only one thing, and do that one thing well"][3]. If you don't
   get what the new code is doing, something's wrong.
1. The new code is tested.

## How to review code?

My team is using [GitFlow][4] on our own Git servers (i mean "no GitHub", so no
"pull request"). My way to actually review code is the following:

- Checkout the branch to review
- Identify what is the delta between this branch and its base branch (let's say
  `develop`)

  - First, get the base revision tag:

    ```
    git merge-base branch-to-review develop
    ee682bdaf3a578a8de647006b500c87ca72c7ffc
    ```

  - Then, use your diff tool to visualize what changed (i personally use
    [Kaleidoscope][5])

    ```
    git difftool ee682bdaf3a578a8de647006b500c87ca72c7ffc HEAD
    ```

- Give the review developer some feedback, ask questions about what is not clear
- If necessary, fix the code by yourself if changes are fast to implement
  (letting the other know what you're doing) or in pair programming with the
  reviewee if things are heavier
- Merge the code on the base branch
- Deploy on your staging environment to make sure things are ok
- Clean up Git branches behind you

  ```shell
  git branch -d branch-to-review
  git push origin :branch-to-review
  ```

## A note about testing

Reviewing code that doesn't include tests can be disappointing for a reviewer
and adding some tests after an implementation feels like cheating. Here is a
quote from Daniel Eggert - from the excellent [objc.io][1] - that both reviewers
and reviewees should have in mind when reviewing/developing:

> Tests should help us speed up development and make things more fun. `[...]`
> Generally, if you find something difficult to test, that’s a hint that your
> design may be broken and that you should refactor some of it. `[...]` You’ll
> get diminishing returns as you add more tests. First and foremost, add simple
> tests. Branch into more sophisticated territory as you start to feel
> comfortable with it.

## Links

Other resources discuss the subject:

- [All Code Is Bad, So Don't Stress If Yours Sucks][11] (added in May 2014)

## Conclusion

I'll try to add some examples and additions to this page as I process code
reviews in the future. Again, feel free to get in touch to provide some feedback
and as [this page is open source and available on GitHub][6], pull requests are
welcome. I'll review them with a great pleasure.

[1]: http://www.objc.io/issue-1/testing-view-controllers.html
[2]: http://en.wikipedia.org/wiki/Don%27t_repeat_yourself
[3]: http://en.wikipedia.org/wiki/Single_responsibility_principle
[4]: https://github.com/nvie/gitflow
[5]: http://www.kaleidoscopeapp.com/
[6]:
  https://github.com/dirtyhenry/bootstragram-blog/blob/master/_posts/2013-08-01-code-review-checklist.md
[7]: https://github.com/dirtyhenry/bootstragram-blog
[8]: https://twitter.com/dirtyhenry/
[11]:
  http://lifehacker.com/all-code-is-bad-so-dont-stress-if-yours-sucks-1569821801
