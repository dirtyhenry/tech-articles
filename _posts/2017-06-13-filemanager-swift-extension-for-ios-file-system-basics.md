---
layout: post
title: A FileManager Swift extension to manage iOS file systems basics with ease
tags: [ios, swift]
---

I recently spent some time figuring out the best way to find the URL/paths of
the [recommended iOS file system used directories][ios-file-system-basics].

I felt that iOS URL/paths was very confusing:

- `NSSearchPathForDirectoriesInDomains` returns an array of paths
- `FileManager`'s
  `urls(for directory: FileManager.SearchPathDirectory, in domainMask: FileManager.SearchPathDomainMask)`
  returns an array of URL
- `NSHomeDirectory()` returns 1 `String`
- `String` (ie paths) are missing the URL management methods that `NSString` had

So I came up with this little `FileManager`'s extension that could be useful to
many:

    extension FileManager {
        func homeDirectory() -> URL {
            return URL(fileURLWithPath: NSHomeDirectory())
        }

        func homeDirectoryPath() -> String {
            return NSHomeDirectory()
        }

        func tmpDirectory() -> URL {
            return homeDirectory().appendingPathComponent("tmp")
        }

        // ...
    }

[ios-file-system-basics]:
  https://developer.apple.com/library/content/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html#//apple_ref/doc/uid/TP40010672-CH2-SW12
