---
published: false
title: Effet Polaroid en CSS et Fluid Grids
author:
  display_name: Mick
  login: mick
  email: dirtyhenry@gmail.com
  url: ''
author_login: mick
author_email: dirtyhenry@gmail.com
wordpress_id: 38
date: '2010-09-13 20:11:51 +0200'
categories: []
tags: []
comments: []
---
A la suite de la lecture de [ce post de blog->http://www.zurb.com/article/305/easily-turn-your-images-into-polaroids-wi], je me suis dit que je tenais là l'occasion de tester le logiciel Compass. La mission ? {{"Adapter cet effet Polaroïd dans une {fluid grid}"}} !

[<img18>->http://www.zurb.com/article/305/easily-turn-your-images-into-polaroids-wi]

{{{Compass et Sass}}}

[{{Compass}}->http://compass-style.org/] est un framework d'écriture de feuilles de style CSS, construit sur les langages Ruby et [Sass->http://sass-lang.com/].

Concrètement, Ruby est nécessaire pour installer et démarrer Compass, tandis que Sass est le langage utilisé pour le développement CSS proprement dit. Sass est une extension de CSS qui fournit plusieurs fonctionnalités intéressantes absentes de CSS3 : 
- les variables
- l'encapsulation des règles
- l'héritage de styles
- les {mixins}, sorte de composition de styles

{{{Définition de grilles de polaroids avec Compass}}}

Avec Compass, le portage du CSS proposé par le post de départ en Sass permet un fonctionnement beaucoup plus souple, grâce à la définition de variables. 

L'exemple de Zurb contien du CSS qui donne beaucoup de tailles fixes : taille de la balise &lt;div&gt; contenante, taille des images, etc.

<img19>

En utilisant les bonnes règles de fluid grids ([cf. cet ancien post qui parle de ce sujet->25]), Compass nous permet de remplacer ces valeurs absolues par des variables de configuration fonctionnelle de notre grille de polaroids.

<img20>

Avec ce code, en changeant les variables $columns et $polaroidwidth du fichier screen.scss, on obtient facilement des grilles à 3, 4 ou 6 colonnes.

<img15>

<img16>

<img17>

{{{Le résultat à l'oeuvre}}}

J'ai utilisé la feuille CSS générée par Compass sur [ce post->http://www.deadrooster.org/Compile-MP3-du-NET-01] du site deadrooster.org. Attention, si vous observez le fichier CSS utilisé, vous aurez toujours des valeurs absolues, mais le fichier CSS en entier a été généré automatiquement par Compass à partir du source Sass avec variables.

Le résultat est convaincant avec Firefox 3.6.9 et vraiment vraiment sympa avec Google Chrome.

Sur iOS, le résultat est moins réussi. Le défaut d'aliasing d'images sur l'iPhone dégrade nettement le rendu de la rotation.

<img21>

{{{Amélioration du code}}}

J'ai partagé le portage Sass dans un nouveau projet Google Code : [MF-CSS->http://code.google.com/p/mfcss/] sous licence GPL. Toute participation pour améliorer l'effet Polaroïd, tant d'un point de vue rendu visuel que d'un point de vue richesse fonctionnelle et confort d'utilisation est la bienvenue.
