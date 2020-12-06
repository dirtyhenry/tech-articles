---
layout: post
title: How to Add a JAR to a Local Maven Repository?
categories: [java, maven]
---

## The command

```shell
mvn install:install-file \
  -Dfile=<path-to-file> \
  -DgroupId=<group-id> \
  -DartifactId=<artifact-id> \
  -Dversion=<version> \
  -Dpackaging=<packaging>
```

## Why we need it

Not every JAR is available on Maven repositories by default. That makes sense
since not every JAR is made to be public. However, if a JAR is required to
compile your project, it might be necessary to add this JAR to your local
repository.

More details can be found on this [Guide to installing 3rd party JARs][1].

[1]: https://maven.apache.org/guides/mini/guide-3rd-party-jars-local.html
