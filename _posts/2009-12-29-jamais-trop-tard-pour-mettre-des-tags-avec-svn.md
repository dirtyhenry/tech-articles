---
layout: post
title: Jamais trop tard pour mettre des tags avec SVN
tags:
  - Dépannage
  - Multi-plateformes
  - Subversion / SVN
---

Quand on livre une application logicielle, l'usage veut que l'on _tague_ le code
source qui lui correspond dans son système de gestion de version. Oui mais
voilà, des fois, on n'a pas le temps alors on ne le fait pas. Qu'à cela ne
tienne, il n'est jamais trop tard pour bien faire et voici la méthode que j'ai
utilisée pour taguer a posteriori, sur mon dépôt de source {{Subversion}}, des
versions livrées il y a plusieurs semaines.

## Prérequis

Cette opération ne fonctionne que si les hypothèses suivantes sont vérifiées :

- le code packagé a été commité sur le système de gestion de version;
- les dates de livraison des logiciels sont connues, au moins de façon
  approximative.

## 1ère étape : identifier les numéros de révision

Pour identifier les numéros de révision, il faut utiliser la commande suivante :

```
svn log <chemin-du-source-à-examiner>
```

Le résultat de cette commande permet d'identifier les numéros de révision et les
dates associées de tous les commit réalisés sur le source examiné. A partir des
dates de livraison, on sait alors à quel numéro de révision la livraison
correspond.

## 2ème étape : taguer les révisions identifiées

Pour cela, utiliser la commande suivante :

```
svn copy -r <num-revision> <chemin-source> <chemin-cible>
```

Pour rappel aux utilisateurs de SVN, la convention veut que :

- le chemin source soit le répertoire `trunk` ou un sous-répertoire du
  répertoire `branches`
- le chemin cible soit un sous-répertoire du répertoire `tags`
