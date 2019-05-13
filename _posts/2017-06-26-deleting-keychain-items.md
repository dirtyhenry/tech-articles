---
layout: default
title: How to log and delete keychain items from your iOS app
category: blog
---

Firebase, among other iOS libraries can install items in a device keychain and
it can become pretty painful to test authentication without having to reinitialize
the simulator, and it gets even more complicated on a real device.

Here is a little piece of code that will output what are the items your app
can access in the keychain, and will either output them, delete them or both.

This should be enabled for debug/development purposes only, you probably don't
want to use this code in a production environment.
{: .alert .alert-warning}

<script src="https://gist.github.com/dirtyhenry/46a87f9a3717532085974edcfa114051.js">
</script>
