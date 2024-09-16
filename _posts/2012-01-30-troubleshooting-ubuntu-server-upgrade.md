---
layout: post
title: Troubleshooting upgrading Ubuntu Server from Maverick to Natty
javascript: tooltip.js
category: Journaling
tags:
  - devops
---

This last weekend, I attempted to upgrade my [Dedibox][1] running Ubuntu Server
from Maverick Meerkat (10.10) to Natty Narwhal (11.04). Initially, the
installation seemed successful: no error messages, a quick and straightforward
process. Then came the required reboot.

Once the server restarted, nothing worked, including `ping`, `ssh`, and all
hosted websites.

It took me a couple of hours to fix the server and get everything running again.
Here is what I did.

I first found [this URL][help-1], which provided the initial steps of the
process, but it didn't work for me just yet:

```sh
sudo mkdir /mnt /md1
sudo mount /dev/md1 /mnt/md1
sudo mount /dev/md0 /mnt/md1/boot
sudo chroot /mnt/md1
update-grub
```

Nevertheless, it helped me identify that grub was indeed the problem. I then
followed [these guidelines][help-2] from Dedibox's rescue mode. A final step was
missing, which I found from studying [this URL][help-3]:

```shell
sudo grub-install
```

Now, everything was back to normal: the server booted correctly, and Natty was
up and running. Thanks David B. for the support!

[help-1]:
  https://web.archive.org/web/20110314143946/http://eyes.neuneuil.com/index.php/2010/01/31/187-dedibox-ne-boote-plus-suite-a-upgrade-kernel
[help-2]: https://help.ubuntu.com/community/Grub2?action=recall&rev=199#ChRoot
[help-3]: https://forum.ubuntu-fr.org/viewtopic.php?id=444506
[1]: https://www.online.net/
