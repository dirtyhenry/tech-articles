---
layout: post
id: 04893f10-b042-406f-9451-8be93d30592f
title: "Debugging Symbolic Links on iOS"
author: Mick F
excerpt: >-
  Introducing a tool that will visually inspect the state of an iOS app
  filesystem.
category: Journaling
tags:
  - iOS
---

Symbolic links are one of my favorite pragmatic best practice to manage a file
system. Last week, I had a bug to fix in an iOS app. Soon enough, symbolic links
became my number one suspect for the case. My problem was that Organizer has a
poor support of symbolic links and it's not very helpful when you want to check
symbolic links targets on a full app file system.

I had to develop some file system inspector code to help me debug the app and
this is what I want to share here. Before diving into the details, however, I
must emphasize a crucial lesson learned during the bug-fixing process:

⚠️ Avoid Absolute Target Paths for Symbolic Links:

In the intricate dance of app updates on the App Store, relying on absolute
target paths for symbolic links can lead to unexpected consequences. Your app's
file system might waltz into a different home directory with each update,
causing potential chaos. As a precautionary measure, opt for relative paths to
ensure a smoother transition during updates.

Anyway, I've created [a `FileSystemExplorer` tool][1], that will help you
generate the following kind of output when you run it inside your app.

Download `FileSystemExplorer` here:

- [`FileSystemExplorer.h`][doth]
- [`FileSystemExplorer.m`][dotm]

Notice the `--->` and `-x->` arrows which might help you determine if items are
symbolic links and whether the file they target still exist or not. Please leave
a message if you found this bit of code helpful!

Typical use case would probably to run `[FileSystemExplorer exploreFileSystem];`
from your app's delegate's `application:didFinishLaunchingWithOptions:`.

```
|- Documents
|- help.html
   |- Archives
      |- 1321890697466 -x-> 1328706604700
      |- 1321890697467 ---> 1328706604701
      |- 1328697746363
         |- images
            |- screenshot.png
            |- icon.png
      |- 1328706604701
         |- export.xml
         |- html
            |- help.html
            |- index.html
|- MyApp.app
   |- etc
|- Library
   |- Caches
      |- com.mycompany.myapp
         |- Cache.db
   |- Preferences
      |- .GlobalPreferences.plist -x-> /Users/user/.../Library/Preferences/.GlobalPreferences.plist
      |- com.apple.PeoplePicker.plist ---> /Users/user/.../Library/Preferences/com.apple.PeoplePicker.plist
      |- com.mycompany.myapp.plist
|- tmp
```

[1]: https://github.com/dirtyhenry/swift-blocks
[doth]:
  https://github.com/dirtyhenry/swift-blocks/blob/main/Sources/ObjectiveBlocks/public/FileSystemExplorer.h
[dotm]:
  https://github.com/dirtyhenry/swift-blocks/blob/main/Sources/ObjectiveBlocks/FileSystemExplorer.m
