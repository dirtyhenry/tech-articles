---
layout: post
title: Conversion de fichiers .flac en .mp3
categories: [shell]
---

Pour convertir des fichiers `.flac` en `.mp3` en ligne de commande, une solution
simple est d'avoir installé les outils `lame` et `flac` et lancer dans le
répertoire qui contient les fichiers `.flac` le script bash suivant :

```
for file in *.flac; do $(flac -cd "$file" | lame -h - "${file%.flac}.mp3"); done
```

Pour Mac OS X, les options les plus simples pour obtenir `lame` et `flac` sont :

- la compilation des sources pour lame : [http://lame.sourceforge.net/][1]
- le package Flac tools for OS X pour flac :
  [http://sourceforge.net/projects/flac/files/flac-darwin/][2]

[1]: http://lame.sourceforge.net/
[2]: https://sourceforge.net/projects/flac/files/flac-darwin/
