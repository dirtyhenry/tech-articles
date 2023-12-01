---
layout: post
title: Using Subversion with Mac OS X
excerpt: >-
  Configure a SVN repository on a Mac: create, edit config files. A cheat sheet
  for svnadmin and svnserve.
category: Journaling
tags:
  - svn
---

**💡 Update:** You should probably use Git rather than Subversion nowadays.

To create a repository:

```bash
svnadmin create ~/Documents/MySVN
```

- Edit the `conf/` files:
  - into `svnserve.conf`, remove comments before:
    - `anon-access = read`,
    - `auth-access = write`
    - and `password-db = passwd`
  - add a user/password into `passwd`
- To run your SVN server, run:

```bash
svnserve -d -r ~/Documents/MySVN
```
