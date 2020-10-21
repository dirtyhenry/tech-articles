---
layout: post
title: Using Subversion with Mac OS X
categories: [svn]
---

- To create a repository: `svnadmin create ~/Documents/MySVN`.
- Edit the `conf/` files :
  - remove comments before `anon-access = read`, `auth-access = write` and
    `password-db = passwd` into `svnserve.conf`
  - add a user/password into `passwd`
- To run your SVN server, run : `svnserve -d -r ~/Documents/MySVN`
