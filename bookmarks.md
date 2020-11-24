---
layout: default
title: Development Tools Bookmarks
---

{% for bookmark in site.devtools_bookmarks %}

## {{ bookmark.name }}

{{ bookmark.content | markdownify }}

[Link]({{bookmark.target_url}})

{% endfor %}
