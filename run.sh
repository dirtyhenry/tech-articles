#!/bin/sh

/usr/local/bin/lessc _less/bootstragram.less css/bootstragram.css
/usr/local/bin/lessc _less/bootstragram-print.less css/bootstragram-print.css
jekyll serve --watch

