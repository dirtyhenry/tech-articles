---
layout: default
title: Conversion de fichiers .flac en .mp3
---

Voici un très bon [tutorial](http://www.linuxtutorialblog.com/post/solution-converting-flac-to-mp3) indiquant comment convertir des fichiers `.flac` en fichiers `.mp3`.

En gros, il faut avoir, en ligne de commande, les outils `lame` et `flac` et lancer dans le répertoire qui contient les fichiers `.flac` le script bash suivant :

```
for file in *.flac; do $(flac -cd "$file" | lame -h - "${file%.flac}.mp3"); done
```

Pour Mac OS X, les options les plus simples pour obtenir `lame` et `flac` sont :
* la compilation des sources pour lame : [http://lame.sourceforge.net/](http://lame.sourceforge.net/)
* le package Flac tools for OS X pour flac : [http://sourceforge.net/projects/flac/files/flac-darwin/](http://sourceforge.net/projects/flac/files/flac-darwin/)
