---
layout: post
title: Supprimer les répertoires SVN
categories: [svn]
---

Petit tuto très pratique trouvé
[ici](http://www.korben.info/supprimer-les-repertoires-svn-sous-linux.html) pour
supprimer récursivement les répertoires `.svn` d'un répertoire :

```
find . -name '.svn' -type d -exec rm -rf {} \;
```

Ça marche pour Lunix, mais aussi pour Mac OS X et Windows si on a Cygwin.

Merci [Korben](http://www.korben.info/) !
