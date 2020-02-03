---
layout: post
title: Effet Polaroid en CSS et Fluid Grids
categories: [web]
---

À la suite de la lecture de
[ce post de blog](http://www.zurb.com/article/305/easily-turn-your-images-into-polaroids-wi),
je me suis dit que je tenais là l'occasion de tester le logiciel Compass. La
mission ? **Adapter cet effet Polaroïd dans une _fluid grid_** !

![Preview of Polaroid effects](../../assets/images/polaroid-effect-preview.jpg)

## Compass et Sass

[_Compass_](http://compass-style.org/) est un framework d'écriture de feuilles
de style CSS, construit sur les langages Ruby et [Sass](http://sass-lang.com/).

Concrètement, Ruby est nécessaire pour installer et démarrer Compass, tandis que
Sass est le langage utilisé pour le développement CSS proprement dit. Sass est
une extension de CSS qui fournit plusieurs fonctionnalités intéressantes
absentes de CSS3 :

- les variables
- l'encapsulation des règles
- l'héritage de styles
- les _mixins_, sorte de composition de styles

## Définition de grilles de polaroids avec Compass

Avec Compass, le portage du CSS proposé par le post de départ en Sass permet un
fonctionnement beaucoup plus souple, grâce à la définition de variables.

L'exemple de Zurb contien du CSS qui donne beaucoup de tailles fixes : taille de
la balise `div` contenante, taille des images, etc.

![Tailles en dure chez Zurb](../../assets/images/polaroid-effect-1.png)

En utilisant les bonnes règles de fluid grids ([cf. cet ancien post qui parle de
ce sujet][fluidgrid]), Compass nous permet de remplacer ces valeurs absolues par
des variables de configuration fonctionnelle de notre grille de polaroids.

![Des maths dans le CSS pour l'adaptation](../../assets/images/polaroid-effect-2.png)

Avec ce code, en changeant les variables $columns et $polaroidwidth du fichier
screen.scss, on obtient facilement des grilles à 3, 4 ou 6 colonnes.

![Effet polaroid sur 6 colonnes](../../assets/images/polaroid-effect-3.png)

![Effet polaroid sur 4 colonnes](../../assets/images/polaroid-effect-4.png)

![Effet polaroid sur 3 colonnes](../../assets/images/polaroid-effect-5.png)

## Le résultat à l’œuvre

J'ai utilisé la feuille CSS générée par Compass sur
[ce post](http://www.deadrooster.org/Compile-MP3-du-NET-01) du site
deadrooster.org. Attention, si vous observez le fichier CSS utilisé, vous aurez
toujours des valeurs absolues, mais le fichier CSS en entier a été généré
automatiquement par Compass à partir du source Sass avec variables.

Le résultat est convaincant avec Firefox 3.6.9 et vraiment vraiment sympa avec
Google Chrome.

Sur iOS, le résultat est moins réussi. Le défaut d'aliasing d'images sur
l'iPhone dégrade nettement le rendu de la rotation.

![Rendu de l'effet sur iPhone](../../assets/images/polaroid-effect-6.png)

## Amélioration du code

J'ai partagé le portage Sass dans un nouveau projet Google Code :
[MF-CSS](http://code.google.com/p/mfcss/) sous licence GPL. Toute participation
pour améliorer l'effet Polaroïd, tant d'un point de vue rendu visuel que d'un
point de vue richesse fonctionnelle et confort d'utilisation est la bienvenue.

[fluidgrid]: {% post_url 2010-08-07-same-site-for-desktop-and-mobile %}
