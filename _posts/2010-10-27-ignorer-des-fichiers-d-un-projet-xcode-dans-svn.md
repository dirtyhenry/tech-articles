---
layout: post
title: Ignorer des fichiers d'un projet XCode dans SVN
categories: [svn, ios]
---

À chaque nouveau projet XCode que j'insère dans mon SVN, une tâche est toujours
la même : demander à SVN d'ignorer le répertoire `build`, et mes fichiers de
configuration personnels.

Ces fichiers/dossiers n'ont a priori rien à faire sur un SVN, et il est
confortable de demander à son client, svnX par exemple, de ne plus les afficher
à tout bout de champ.

Voilà, étape par étape, la procédure à effectuer, dans un Terminal.

- configurer un éditeur de texte (mon préféré étant emacs):

```
export SVN_EDITOR=emacs
```

- aller à la racine de votre projet XCode, et entrer :

```
svn propedit svn:ignore .
```

- là, votre éditeur s'ouvre : tapez simplement `build` puis quittez votre
  éditeur
- aller dans votre dossier `<Projet>.xcodeproj` : des fichiers de configuration
  personnels se trouvent ici et ne doivent pas être ajoutés au SVN
  `cd Projet.xcodeproj`
- entrer à nouveau :

```
svn propedit svn:ignore .
```

- puis quand votre éditeur s'ouvre, tapez une séquence de type `mick.*` pour
  chaque utilisateur présent dans le répertoire
- commiter ces modifications de propriété sur le SVN : svnX ne vous embêtera
  plus avec eux.
