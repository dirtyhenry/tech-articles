---
layout: post
title: Using Subversion with Mac OS X
categories: [svn]
---

- To create a repository:

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
