---
layout: post
id: A6578C52-C79B-432E-B61A-4CC3B7F6D491
title: My Definitive Front Matter
excerpt: >-
  After years of making static sites with Jekyll, here is my template for a
  solid front matter for your next static site project.
category: Web Publishing
tags:
  - CommonMark
  - Gatsby
  - Jekyll
  - Markdown
  - NSHipster
  - Publish
  - Static Site Generator
  - YAML
---

With every static site generator, you can write your posts or pages with 
Markdown or CommonMark files in which you can include some structured metadata
called a _Front Matter_.

_Jekyll_ has [it][1]. _Hugo_ has [it][2]. _Gatsby_ has [it][3]. _Publish_ takes
distance from the naming[^1] but definitely has [it][4].

When you start building a website with any of these products — I'm most familiar
with Jekyll by far —, the default scaffolding will prepare sample posts using
front matter keys that it considers as required. From this basic starting point,
users will have the liberty to add any additional keys of their liking. Over
time, after running many Jekyll projects, I came to rely mostly on the following
set:

```yaml
layout: post
id: 61C15587-6353-4F0B-B7EA-5FB936E1B7B2
title: Hey Jude
author: Paul McCartney
excerpt: >-
  *Hey Jude* is a song by the English rock band the Beatles that was released as
  a non-album single in August 1968.
image: hey-jude-single.jpg
category: Past Masters
tags:
  - 1968
  - Julian Lennon
  - Na na na nananana
revisions:
  "2021-01-18": Fixed typos
alert:
  level: info
  content: This is one of the greatest songs ever.
```

I'll detail each field now, having Jekyll in mind, but I'm pretty sure this can
be applied to any static generator.

## Layout

This is pretty basic. With Jekyll, you can include a default layout in the site
configuration but I like to keep it explicit.

## ID

This is optional, but if you intend to change URL over time, it can be useful to
keep consistent feed since an ID is required by both Atom feeds and JSON feeds.

## Title

Titles are important since you don't want to rely on filenames to get your
posts' names from. Some useful links to get capitalization right:

- in English, I like [The Capitalizer][6];
- in French, I couldn't find a good tool but [this page][7] from an academic in
  Quebec has a good overview of the rules to respect.

## Author

This is optional since it will be relevant only if the website has more than 1
contributor. Also, most plugins allow it to be changed to `authors` in case an
article is written by more than 1 person. In case you want to attach rich data
for each author, the [_Author information_][8] section from jekyll-feed's
`README` has good tips.

## Excerpt

This is optional. By default the first paragraph of the post will be used. But
it's good to keep control over what will probably appear on the home page's
reference to your post or social networks. I like _excerpt_ better than
_description_ because it is more specific and explicit.

## Image

This is the cover of your post or page. I was using _cover_ for a while before
realizing _jekyll-feed_ was using _image_ by default so I converted.

## Categories and Tags

As for the author, most plugins and themes will support singular or plural forms
of these tags.

**What is the difference between the two?**

I would say that _categories_ are the paths of the navigation tree for your
website (just like folders and subfolders where you would store your files).
That's what would be used to build a [breadcrumb][9].

_Tags_ on the other hand can be whatever and don't involve any kind of structure
for your data.

To put it another way, categories form a relatively rigid tree, while tags form
a free-form cloud.

## Revisions

This section was ~stolen~ inspired by the front matter of NSHipster's articles (see
the [source][10] for their `XCTestCase` post for instance). When you intend to
keep your content relevant over time, it is very useful to let your users know
you updated your content so the revisions feature, albeit specific, can become super
useful.

## Alerts

If you want to feature informative banners, in case you deprecate content, or
want to include an update to a post, an alert front matter is probably a better
way to go than modifying your content to include extra content (that would
probably be HTML to include an alert styling anyway, which you should avoid as
much as possible).

## No date? No slug?

Unless you intend to post multiple times a day, I would say the date belongs to
the filename only, and I don't see the point of including the date with an
additional time in the front matter since it seems to just add clutter to it.

On a similar note, I like that the slug for the URL is also part of the
filename. I don't see any inconvenience doing so since Git does a pretty good
job at identifying renamings now, and the `id` can help you tracking URL that
changed over time so that they don't get duplicated in feeds.

Any thoughts? [Let me know.][11]

[1]: https://jekyllrb.com/docs/front-matter/
[2]: https://gohugo.io/content-management/front-matter/
[3]:
  https://www.gatsbyjs.com/docs/how-to/routing/adding-markdown-pages/#frontmatter-for-metadata-in-markdown-files
[4]:
  https://github.com/JohnSundell/Publish/blob/master/Documentation/HowTo/custom-markdown-metadata-values.md
[5]: https://en.wikipedia.org/wiki/Book_design#Front_matter
[6]: https://thecapitalizer.com/
[7]: https://www.axl.cefan.ulaval.ca/monde/regles-2TITRES.htm
[8]: https://github.com/jekyll/jekyll-feed#author-information
[9]: https://bulma.io/documentation/components/breadcrumb/
[10]: https://github.com/NSHipster/articles/blob/master/2014-07-21-xctestcase.md
[11]: https://github.com/Bootstragram/bootstragram-blog/issues

[^1]: It seems to come from the [printed book design][5] industry.
