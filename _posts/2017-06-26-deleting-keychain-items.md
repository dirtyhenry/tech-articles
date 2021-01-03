---
layout: post
title: How to log and delete keychain items from your iOS app
tags: [ios, swift]
---

## How Keychain Items Can Slow Down Debugging

Firebase, among other iOS libraries can install items in a device keychain and
it can become pretty painful to test authentication without having to
reinitialize the simulator, and it gets even more complicated on a real device.

## Some Debugging Code

Here is a little piece of code that will output what are the items your app can
access in the keychain, and will either output them, delete them or both.

⚠️ I want to insist this should be enabled for debug/development purposes only,
you most likely don't want to use this code in a production environment.

[the gist](https://gist.github.com/dirtyhenry/46a87f9a3717532085974edcfa114051)

```swift
func iterateKeychainItems(log: Bool, delete: Bool) {
    let secItemClasses = [
        kSecClassGenericPassword,
        kSecClassInternetPassword,
        kSecClassCertificate,
        kSecClassKey,
        kSecClassIdentity
    ]

    if (log) {
        for secItemClass in secItemClasses {
            let query: [String: Any] = [
                kSecReturnAttributes as String: kCFBooleanTrue,
                kSecMatchLimit as String: kSecMatchLimitAll,
                kSecClass as String: secItemClass
            ]

            var result: AnyObject?
            let status = SecItemCopyMatching(query as CFDictionary, &result)
            if status == noErr {
                print(result as Any)
            }
        }
        print("AppUsageMetadata.iterateKeychainItems ended.")
    }

    if (delete) {
        for secItemClass in secItemClasses {
            let dictionary = [kSecClass as String:secItemClass]
            SecItemDelete(dictionary as CFDictionary)
        }
    }
}
```
