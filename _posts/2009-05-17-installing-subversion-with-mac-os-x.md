---
layout: default
title: Installing Subversion with Mac OS X
---

First, download the binary package [here](http://www.open.collab.net/downloads/apple/index.html).

When installation completes, binaries should be found at `/opt/subversion/bin/`.

Add it to your `PATH` if it's not already done.

To create your repository: `svnadmin create ~/Documents/MySVN`.

Edit the `conf/` files :
* remove comments before `anon-access = read`, `auth-access = write` and `password-db = passwd` into
`svnserve.conf`
* add a user/password into `passwd`

To run your SVN server, run : `svnserve -d -r ~/Documents/MySVN`
