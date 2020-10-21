---
layout: post
title:
  "Troubleshooting a Dedibox Upgrade From Maverick to Natty (Ubuntu Server)"
javascript: tooltip.js
categories: [devops]
---

This last week-end, I've tried to upgrade my [Dedibox][1] running Ubuntu Server
from Maverick Meerkat (10.10) to Natty Narwhal (11.04). The install first seemed
to go well: no error messages, pretty easy, fast and straightforward process.
Then came the required reboot.

Once the server was restarted, nothing would work, including `ping`, `ssh` and
of course, all hosted websites.

It took me a couple of hours to fix the server and get everything running again.
Here is what I did.

I first found ~~this URL~~ which gave me the first steps of the process but
actually didn't work. Nevertheless, it helped identifying that grub was indeed
the problem. Then I've applied [these guidelines][help-2] from the Dedibox'
rescue mode. A last step was missing (found from studying [this URL][help-3]),
applying:

```shell
sudo grub-install
```

Now, everything was back to normal : the server booted correctly, Natty was up
and running. Thanks David B. for the support! Feel free to leave a comment if
you want more details.

[help-1]:
  http://eyes.neuneuil.com/index.php/2010/01/31/187-dedibox-ne-boote-plus-suite-a-upgrade-kernel
[help-2]: https://help.ubuntu.com/community/Grub2#ChRoot
[help-3]: http://forum.ubuntu-fr.org/viewtopic.php?id=444506
[1]: https://www.online.net/
