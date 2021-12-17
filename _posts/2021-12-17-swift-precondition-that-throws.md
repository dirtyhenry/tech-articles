---
layout: post
id: 95BAB56E-A9BE-452D-BDBF-83F9DF24F8D1
title: A Swift Recoverable Precondition That Can Throw
author: Mick F
excerpt: >-
  The what and the why of a Swift precondition helper that accepts statements
  that can throw recoverable errors.
category: Journaling
tags:
  - Swift
  - iOS
---

What on Earth is a _recoverable_ precondition? [Isn’t the point of a
precondition to be non-recoverable?][2]

Yes. Sorry I couldn’t think of a better name[^1].

## The Result

```swift
/// Checks a necessary condition for making forward progress.
///
/// The difference with `precondition` is that if an error is _thrown_ when the condition is executed, the error will
/// be _rethrown_ so that it can be recovered. But this recoverability does not apply if the condition executes
/// properly and that its conditions fails.
///
/// In other words, this function is a wrapper around `precondition` so that it can be fed a condition closure that can
/// throw.
func recoverablePrecondition(
    _ condition: @autoclosure () throws -> Bool,
    _ message: @autoclosure () -> String = String(),
    file: StaticString = #file,
    line: UInt = #line
) rethrows {
    if !(try condition()) {
        preconditionFailure(message(), file: file, line: line)
    }
}
```

## What is this?

Let me explain. Here is the code I had:

```swift
precondition(aLittleTenderness())
```

But then, I had to make `aLittleTenderness` able to throw, and `precondition`
was yelling at me about it:

```markdown
Property access can throw, but it is not marked with 'try' and it is executed in
a non-throwing autoclosure
```

Even when I _tried_ a little tenderness[^2]:

```swift
precondition(try aLittleTenderness())
```

The compiler would complain:

```markdown
Property access can throw, but it is executed in a non-throwing autoclosure
```

And this alternative looked terrible:

```swift
precondition((try? aLittleTenderness()) ?? false)
```

So I created a _recoverable precondition_, which means:

- if the code throws, then try to recover from it;
- if the code does not throw, treat it a precondition.

Don’t hate me. [Listen to soul music instead][1].

## Lessons Learned

Look at this signature! It is ripped off [`precondition`’s][3] and it features
some keywords you don’t use everyday. Each on its own could deserve its own
extensive explanation. But wait, other people already wrote about them.

- [`@autoclosure`][4];
- [`rethrows`][5];
- [`#file` and `#line`][6].

[^1]: If you can think of one, let me know.
[^2]:
    Beware, a terrible music joke is hiding in this statement, can you spot it?

[1]:
  https://youtu.be/IQ9n2_5mbig
  "Otis Redding - Try A Little Tenderness - Live
1967 (Reelin' In The Years Archives)"
[2]:
  https://www.swiftbysundell.com/articles/picking-the-right-way-of-failing-in-swift/
  "Picking the right way of failing in Swift, by John Sundell"
[3]:
  https://developer.apple.com/documentation/swift/1540960-precondition
  "precondition(_:_:file:line:) Documentation"
[4]:
  https://www.swiftbysundell.com/articles/using-autoclosure-when-designing-swift-apis/
  "Using @autoclosure when designing Swift APIs, by John Sundell"
[5]:
  https://www.hackingwithswift.com/example-code/language/how-to-use-the-rethrows-keyword
  "How to use the rethrows keyword, by Paul Hudson"
[6]:
  https://docs.swift.org/swift-book/ReferenceManual/Expressions.html#ID390
  "Literal Expression section of the Expressions page of the Swift Reference Manual"
