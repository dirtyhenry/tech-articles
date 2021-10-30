---
layout: post
id: 7BCAA9BD-00B0-458E-A745-1D9E7DA51BE7
title: "Calling Swift code from Node JS"
author: Mick F
excerpt: >-
  Swift and JavaScript can interact in many different ways. Let’s explore how we
  could create a dynamic library with Swift code, so that we can call that code
  from Node JS.
category: Journaling
tags:
  - JavaScript
  - Swift
  - TypeScript
---

For the last 4 years, on a daily basis, I write either JavaScript/TypeScript
code (mostly React for the web) or Swift code (mostly for iOS). I sometimes feel
like Megan at the beginning of [_Daddy’s Home 2_][1] when she goes on stage to
reveal that she wants a normal Christmas instead of having to celebrate two
Christmases in two families[^1].

Yes, I sometimes want my 2 co-languages to live under the same roof.

## How can JavaScript & Swift interact

JavaScript and Swift can interact in many different ways. A non-exhaustive list:

- **Running JavaScript from Swift code**. Thanks to [JavaScriptCore][6], this
  option is straightforward. I gave [a talk about it][8] during a Paris
  CocoaHeads session.[^2];
- **Running Swift code from JavaScript inside the browser**. Thanks to the
  [Swift WASM project][9], this option is pretty easy as well. But I couldn’t
  find a good use case for it. And during my POC, a simple Hello World being
  displayed in the browser would weigh almost 40 MB and I didn’t pursue this
  lead.

{% asset wasm-hello-world.png alt="A screenshot of a WASM hello world weighing 38.47 MB" %}

- **👉 Running Swift code from JavaScript in the terminal with Node 👈**. This
  interaction is what this post is about! A use case could be to write a command
  line interface that would use [oclif][7] for user interactions while running
  Swift code under the hood. Sweet. I am sure there are other possible
  Javascript/Swift interactions. If you can think of one, pull requests are
  welcome.

A classic way for 2 languages to run hand-in-hand is to run hand-in-hand-in-hand
with a dynamic library in the middle. Our plan is:

1. Write a greeting function with Swift;
1. Turn this code into a dynamic library;
1. Use this dynamic library with Node.

## Writing a dynamic library in Swift

In real-life, the plan was trickier and there was a lot of back and forth
between all the steps.

We can first create a dynamic library using Swift Package Manager:

```swift
// Package.swift
.library(name: "MyDynamicLibrary", type: .dynamic, targets: ["MyLibrary"])
```

Pretty basic. Let’s move on to a greeting function that will greet what is
passed as an argument.

My oh-so-naive first draft of interfacable code looked like this:

```swift
public func greet(name: String) -> String {
    return "Hello, \(name)!"
}
```

But my successful attempt ended up looking like this:

```swift
@_cdecl("greet")
public func greet(
    cStringName: UnsafePointer<Int8>,
    outputSize: Int16,
    output: UnsafeMutablePointer<Int8>
) -> Bool {
    let name = String(cString: cStringName)
    let cString = "Hello, \(name)!".cString(using: .utf8)!
    for (index, char) in cString.enumerated() {
        if (index >= outputSize) {
            return false
        }
        output.advanced(by: index).pointee = char
    }
    return true
}
```

Lessons learned:

- An interoperable string is called a C String, which translates to a
  `UnsafePointer<Int8>`;
- Returning the output — a pointer — as a result of the function will result in
  an error. Instead, returning a boolean — a value — indicating the success of
  the execution makes more sense. My guess is that the library would release the
  memory as soon as the function had returned, hence preventing Node to read
  something meaningful in memory. Responsibilities should be switched and the
  caller should provide writable memory where the library will copy the greeting
  so that the caller can read it. And thus, for a proper error management and
  prevent dreaded `segmentation fault` errors, the caller needs to mention how
  big the memory allocation is to the library;
- [`nm -gU`][11] is a command line tool that will display the list of external
  symbols of a dynamic library;
- In order for the library to include searchable symbols, we need to use [this
  `@_cdecl` annotation][10] that is private with Swift.

Rough trip. But it was fun.

## Using the dynamic library from Node

Similarly, this is the end result for the Node code.

```node
var ffi = require("ffi-napi");

var myLib = ffi.Library(
  "../MyLibrary/.build/x86_64-apple-macosx/debug/libMyDynamicLibrary.dylib",
  {
    greet: ["bool", ["string", "long", "char *"]],
  }
);

const maxStringLength = 20;
const theStringBuffer = Buffer.alloc(maxStringLength);

const isSuccess = myLib.greet("Mick", maxStringLength, theStringBuffer);
if (isSuccess) {
  // Retrieve and convert the result back to a JavaScript string
  var theString = theStringBuffer.toString("utf-8");
  console.log(`The string: ${theString}`);
  process.exit(0);
} else {
  console.error(`Calling greet failed.`);
  process.exit(1);
}
```

Lesson learned: interoperating with our dynamic library requires a certain kind
of library called a _FFI_, standing for [_Foreign Function Interface_][5]. The
[`ffi`][3] module didn’t work. Not sure why 🤷. [`ffi-napi`][4] did work. Its
documentation is good enough to get inspired by examples for simple use cases.

## Conclusion

```shell
➜  node index.js
The string: --Hello, Mick!--
```

💪🎉 Node provided the argument, but the greeting is done with Swift.

## Epilogue

Please watch [_Daddy’s Home 2_][1].

[^1]: Best movie of the decade. I am dead serious.
[^2]:
    I just realized the talks is not available on YouTube anymore so I will have
    to repost its content online soon.

[1]: https://www.themoviedb.org/movie/419680 "Daddy’s Home 2 on The Movie DB"
[3]: https://www.npmjs.com/package/ffi
[4]: https://www.npmjs.com/package/ffi-napi
[5]: https://en.wikipedia.org/wiki/Foreign_function_interface
[6]: https://developer.apple.com/documentation/javascriptcore
[7]: https://oclif.io
[8]: https://twitter.com/cocoaheadsparis/status/1060620815467769856
[9]: https://swiftwasm.org
[10]: https://forums.swift.org/t/formalizing-cdecl/40677
[11]:
  https://stackoverflow.com/questions/4506121/how-to-print-a-list-of-symbols-exported-from-a-dynamic-library
