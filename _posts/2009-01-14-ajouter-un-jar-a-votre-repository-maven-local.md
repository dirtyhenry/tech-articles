---
layout: post
title: Ajouter un JAR à votre repository Maven local
---

## La commande

```
mvn install:install-file -Dfile=<path-to-file> -DgroupId=<group-id> -DartifactId=<artifact-id> -Dversion=<version> -Dpackaging=<packaging>
```

## Pourquoi ?

Tous les JAR ne sont pas disponibles sur les repositories Maven par défaut. Et
c'est bien normal : certaines ne sont pas publiques ! Néanmoins, si un JAR est
nécessaire pour compiler votre projet, il est nécessaire d'insérer ce JAR dans
votre repository local. Inutile de le faire à la main, cette commande le fait
pour vous.

[Source](https://maven.apache.org/guides/mini/guide-3rd-party-jars-local.html)
