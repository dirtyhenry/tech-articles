---
published: false
title: Ignorer des fichiers d'un projet XCode dans SVN
author:
  display_name: Mick
  login: mick
  email: dirtyhenry@gmail.com
  url: ''
author_login: mick
author_email: dirtyhenry@gmail.com
wordpress_id: 41
date: '2010-10-27 19:15:53 +0200'
categories:
- Catégorie du produit
- Systèmes d'exploitation
- Produits
- Tag blog
tags:
- Dépannage
- Mac OS X
- Subversion / SVN
- Objective-C
- Conseil
comments: []
---
Ces fichiers/dossiers n'ont a priori rien à faire sur un SVN, et il est confortable de demander à son client, svnX par exemple, de ne plus les afficher à tout bout de champ.

Voilà, étape par étape, la procédure à effectuer, dans un Terminal.

- configurer un éditeur de texte (mon préféré étant emacs) : <cadre>export SVN_EDITOR=emacs</cadre>
- aller à la racine de votre projet XCode, et entrer : <cadre>svn propedit svn:ignore .</cadre>
- là, votre éditeur s'ouvre : tapez simplement "build" puis quittez votre éditeur
- aller dans votre dossier <Projet>.xcodeproj : des fichiers de configuration personnels se trouvent ici et ne doivent pas être ajoutés au SVN <cadre>cd Projet.xcodeproj</cadre>
- entrer à nouveau : <cadre>svn propedit svn:ignore .</cadre>
- puis quand votre éditeur s'ouvre, tapez une séquence de type "mick.*" pour chaque utilisateur présent dans le répertoire
- commiter ces modifications de propriété sur le SVN : svnX ne vous embêtera plus avec eux.
