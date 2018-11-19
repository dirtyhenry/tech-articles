![Bootstragram Logo](vendor/assets/images/logo-pixels-1.png)

[![Build Status](https://travis-ci.org/Bootstragram/bootstragram-blog.svg?style=flat-square)](https://travis-ci.org/Bootstragram/bootstragram-blog)

# Bootstragram Blog

This repository contains the sources of Bootstragram's [Jekyll-powered][jekyll]
blog that is available online at [bootstragram.com][bootstragram].

The purpose of this blog is to share some technical adventures, notes and code
relating to iOS, Ruby on Rails, etc. that could help other people as well.

## Please contribute

Although we chose to disable comments, we do not intend to run this blog as a
traditional blog as we'd like to keep the posts up-to-date and relevant. As
such, we encourage readers to send any feedback via [Github][github-issues] or
[Twitter][twitter], where discussion can be engaged in a more relevant way than
with blog comments.

We'll update the posts accordingly, giving credit to any dev out there willing
to help.

This repository only contains the public content of the
[bootstragram.com][bootstragram] website. Any other content found on the website
is private and the license of this repository does not apply to it.

## Development

    make install
    make run

## Deployment

Deployment of this site is made via Travis CI: pushing to the master branch
triggers the build and the deployment. Thanks to oncletom.io for
[this post](https://oncletom.io/2016/travis-ssh-deploy/) about how to achieve this.

## Links

* [jekyll][jekyll]: a blog-aware, static site generator in Ruby
* [bootstrap][bootstrap]: front-end framework for faster and easier web development
* [HTML5 Boilerplate][html5-boilerplate]: front-end template
* [sitemap.xml generator](https://github.com/kinnetica/jekyll-plugins) by kinnetica


[jekyll]: http://jekyllrb.com/ "Transform your text into a monster"
[bootstragram]: http://bootstragram.com "Bootstragram"
[bootstrap]: http://twitter.github.com/bootstrap/ "Bootstrap"
[html5-boilerplate]: http://html5boilerplate.com/ "HTML5 Boilerplate"
[github-issues]: https://github.com/dirtyhenry/bootstragram-blog/issues "Issues on GitHub"
[twitter]: https://twitter.com/dirtyhenry
