---
layout: default
title: Dynamic resizing of a UICollectionViewCell's height
category: blog
---

Your cell includes dynamic text and you need to size it appropriately. I feel
like I did that 1.000.000 times so here it is: my Swift 3 definitive method
for not repeating myself. It works well with iOS 11 and below.

Here are the steps to make it work:

1. Make sure your cell has all the constraints required to be self-dependent to
   define its size
1. Add a dependency to constraint the width of the cell (which should be easy to
   compute, as most of the time you want to find the height of your cell)
1. Get inspired by the following code to create an equivalent method for your cell

<script src="https://gist.github.com/dirtyhenry/1820b9cb07095c42f427e38a912477d4.js">
</script>
