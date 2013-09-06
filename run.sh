#!/bin/sh

/usr/local/bin/lessc _less/bootstragram.less assets/css/bootstragram.css
/usr/local/bin/lessc _less/bootstragram-print.less assets/css/bootstragram-print.css
jekyll serve --watch

