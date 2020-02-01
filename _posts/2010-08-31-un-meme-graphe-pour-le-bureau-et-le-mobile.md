---
layout: post
title: Un même graphe pour le bureau et le mobile ?
---

L’_information design_ est une tendance majeure du web (cf.
[ici](http://www.fleshmap.com/), [ici](http://nmap.org/favicon/) ou
[ici](http://flowingdata.com/2010/08/24/election-night-in-australia-relived/)).
Bref, il faut s'y mettre et la première étape est le chasse aux outils : quelles
techno va-t-on utiliser ?

Chance pour nous, [flowingdata][flowingdata] a communiqué [son recensement des
outils les plus utiles, tant pour la collecte des données, que pour la
réalisation visuelle ou leur animation][tools].

Ce recensement donne des pistes sur des outils très utiles (dont le bluffant
[processing][processing]) mais il y a un hic majeur : aucun de ces outils permet
une visualisation _contemporaine_ polyvalente pour le bureau et le mobile,
c'est-à-dire quelque chose de joli et si possible interactif ou animé.

Dans ce domaine, le point bloquant le plus important (et celui qui est mal parti
pour être résolu) est le conflit entre Apple et Adobe au sujet de Flash. Safari
pour iOS ne supporte pas Flash alors que c'est Flash qui est ultra
majoritairement utilisé par les sites web proposant l'information design le plus
intéressant. Quelle alternative alors pour proposer du contenu équivalent pour
iOS ? Les applications bien sûr ! Point crucial pour Apple puisqu'il communique
désormais davantage sur les applications disponibles sur iOS que sur les seules
fonctionnalités de ses terminaux.

Le couple HTML5/CSS3, voire SVG ou OpenGL peuvent être des solutions acceptables
pour l'avenir mais en l'état, si l'on veut éviter de créer du contenu différent
pour le bureau et pour iOS, il faut réaliser _from scratch_, ou presque.

Nul doute que les initiatives de développeurs ou de designers dans ce domaine
seront les bienvenues.

Edit: Quand je disais que c'était dans l'air du temps ces histoires :
[https://daringfireball.net/2010/08/judging_flash_battle](https://daringfireball.net/2010/08/judging_flash_battle)

[flowingdata]: http://flowingdata.com/
[processing]: https://processing.org/
[tools]:
  http://flowingdata.com/2008/10/20/40-essential-tools-and-resources-to-visualize-data/
  "40 tools to visualize data"
