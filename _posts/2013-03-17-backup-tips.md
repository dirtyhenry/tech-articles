---
layout: post
title: 7 tips to create a safe and consistent backup strategy as a Mac user
alert:
  level: info
  content: |
    This post is an updated version of an original post published in September 2011.
tags: [oped]
---

I've recently found myself in a very uncomfortable situation: my backup external
hard drive (HDD) failed! I've suddenly realized my hot tea-cup was really close
to my MacBook Pro. I drank my tea, put my laptop in a safe and started thinking
about my backup strategy. Was it safe enough? I did a bit of research on the
Internet and here are the results: 7 tips to create a safe and consistent backup
strategy as a Mac user.

## 1. Start backing up with Time Machine

Time Machine is just great and is way more than just a backup of your data.
Introduced in the Leopard version of Mac OS X, Time Machine is a great way to 1)
back up your Mac on an external HDD and 2) keep an history of your file system.
It is fast to set up, convenient to use, smart when dealing with storage space.
If you're a Mac user and don't use Time Machine, just start using it right now.
Get an external HDD with a little bigger storage than your computer's and go
ahead (for instance, I have a 320 Go HDD on my laptop and use a 500 Go HDD for
Time Machine).

## 2. And back up in the cloud as well

If you're a nomad user, you want to have your main Time Machine HDD with you all
the time. What happens if your bag gets stolen? A Time Machine backup is not
enough. You want another backup that you're gonna keep away from your laptop
most of the time, and that you'll never carry away with both your computer and
your primary Time Machine HDD.

A few years ago, I gave different options a try:

- switching between 2 Time Machine HDD: that was not a good solution. It was
  less convenient (switching and manually tell Time Machine you want to switch)
  and i ended up having two Time Machine partially comprehensive backups rather
  than one consistent as-comprehensive-as-can-be backup
- copying my TimeMachine backup to another hard drive every week or so: it
  wasn't super convenient. Based on [Daring Fireball's advices][1], I used
  [SuperDuper!][2] to do that, but the problem is that its incremental backups
  algorithm couldn't keep up with HDD the same size (a simple 2-pass algorithm:
  remove what's gone then add what's new would have solved this problem but the
  SuperDuper support people said it wasn't their top priority)

Now, I'm using [Backblaze][8]'s cloud backup solution to keep a remote backup of
my HDD. Of course, this solution has some major drawbacks:

- it's using a lot of your upload bandwidth
- the initial backup can take several months
- you need to hope Backblaze will still be around when your HDD fails
- it doesn't keep an history of your files

But it also has big advantages:

- both upfront cost and long run cost are probably cheaper than investing in an
  external HDD
- it's safer cause it's never at the same location than your primary HDD

## 3. Create a Media Center HDD!

With my laptop, I have a recurring problem: a lack of space in the internal HDD.
To solve this permanently, I now try to keep my media files apart: music, photos
and movies are on a dedicated external HDD. This strategy has many good points:
you have a lot of space on your internal HDD (which is very convenient when you
use your computer in a professional context), you have a mediacenter HDD you can
bring to your friends' houses or that you can plug in a TV set, you can use it
with a mediacenter server... It's very useful.

One disadvantage of this strategy is when your iTunes library is on this
external HDD and you want to synchronize your iOS devices when your mediacenter
HDD is not around. This requires a lot of manual work (sorting files you want to
have in a minimized iTunes library and files you want to have in the extensive
iTunes library). iOS 5 might help with this very soon.

## 4. And back up this Media Center HDD!

Now, what if this HDD fails? That's right, here comes Backblaze again. That's
your 3rd backup so far. You may think that's a lot but if something bad happens,
you'll be glad for the little extra-money you'll have spent on those external
HDD.

## 5. Forget CD and DVD

CD and DVD backups belong to ancient times. You don't want to do that anymore.
They're fragile, require a lot of work to keep track of what file's on which
disk. Imagine you backup these files you cherish on DVD. If your primary files
get corrupted for some reason, how will you remember where you stored it? How
can you be sure the DVD hasn't quietly been damaged and became unreadable? Of
course, HDD fail too but when they fail, they're not quiet. They let you know
they died. HDD are a bit over-dramatic but you should be grateful they are.

## 6. Think of what you're backing up

I know storage is cheap. I know people can turn sentimental. But do you really
need to backup this animated GIF image that you thought was funny back in 2003?
Delete it. Don't feel sad of the lack of backup. Keep on your HDD only the
things that deserve to be backed up.

## 7. And one last tiny USB key backup for the road

On the opposite, some files are VERY important and you really don't want to lose
them or you want them with you all the time. Just get a USB key and [build a
safe encrypted backup][4] of files that really matter: password files, bank
accounts files, critical professional documents...

Now I think you can feel safe about your data.

## Additional links:

- [a backup strategy (in french) by MacGeneration.com][9]
- [this alarming post][5] is another proof that backing up is very important.
- [Marco Ament's comments][6] are also very valuable.

[1]: https://daringfireball.net/2010/03/ode_to_diskwarrior_superduper_dropbox
[2]: https://www.shirt-pocket.com/SuperDuper/SuperDuperDescription.html
[4]:
  https://www.theinstructional.com/guides/encrypt-an-external-disk-or-usb-stick-with-a-password
[5]:
  https://web.archive.org/web/20130104061728/http://www.emptyage.com/post/28679875595/yes-i-was-hacked-hard
[6]: https://marco.org/2012/08/04/mat-hacked
[8]: https://www.backblaze.com/
[9]: https://www.macgeneration.com/unes/voir/130252/un-guide-de-la-sauvegarde
