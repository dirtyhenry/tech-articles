---
layout: default
title: "Debugging Symbolic Links On iOS"
javascript: tooltip.js
category: blog
---

# Debugging Symbolic Links On iOS

Symbolic links are one of my favorite pragmatic best practice to manage a file system. Last week,
I had a bug to fix in an iOS app. Soon enough, symbolic links became my number one suspect for the
case. My problem was that Organizer has a poor support of symbolic links and it's not very helpful
when you want to check symbolic links targets on a full app file system.

I had to develop some file system inspector code to help me debug the app and this is what I want
to share here. However, as I fixed the bug as well, I'll just issue this statement :

Never use absolute target paths for your symbolic links as your app's file system will move it to
another home directory every time you update your app on the App Store.
{: .alert .alert-warning}

(and now that i think of it, the simple fact that you can use absolute paths and not only paths
relative to your home directory in an iOS app sounds like a sandboxing bug from Apple's SDK to me).

Anyway, I've created the `BSGFileSystemExplorer` class in
[my work-in-progress *BSGUtilities* Pod][bsgutilities], that will help you generate the following
kind of output when you run it inside your app.

Download `BSGFileSystemExplorer` here :

- [`BSGFileSystemExplorer.h`][doth]
- [`BSGFileSystemExplorer.m`][dotm]

Notice the ---&gt; and -x-&gt; arrows which help you determine if items are symbolic links and whether
the file they target still exist or not. Please leave a message if you found this bit of code helpful!

Typical use case would probably to run `[BSGFileSystemExplorer exploreFileSystem];` from your
app's delegate's `application:didFinishLaunchingWithOptions:`.

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
          |- .GlobalPreferences.plist -x-> /Users/user/Library/Application Support/iPhone Simulator/5.1/Library/Preferences/.GlobalPreferences.plist
          |- com.apple.PeoplePicker.plist ---> /Users/user/Library/Application Support/iPhone Simulator/5.1/Library/Preferences/com.apple.PeoplePicker.plist
          |- com.mycompany.myapp.plist
    |- tmp


[bsgutilities]: https://github.com/Bootstragram/BSGUtilities/
[doth]: https://github.com/Bootstragram/BSGUtilities/blob/master/Pod/Classes/FileSystemUtils/BSGFileSystemExplorer.h
[dotm]: https://github.com/Bootstragram/BSGUtilities/blob/master/Pod/Classes/FileSystemUtils/BSGFileSystemExplorer.m
