---
layout: post
title: Top 5 des outils du développeur indépendant
categories: [oped, bookmark]
---

Réaliser des produits logiciels le plus efficacement possible en tant
qu'indépendant ne peut se faire sans quelques outils permettant de gérer son
effort. Voici mon top 5 des outils que j'utilise en tant qu'indépendant !

## 1. Things

Things est un logiciel de gestion de tâches, très simple mais très performant,
qui repose sur la méthodologie [_GTD_][gtd] (_Getting Things Done_). Auparavant,
j'utilisais le logiciel gratuit iGTD, mais son développeur, Bartek, a ensuite
cessé de maintenir le logiciel pour rejoindre l'équipe de... Things.

{% asset things-screenshot.png %}

Sommairement, le GTD repose sur les principes suivants :

- Se libérer sur le champ des idées qui nous arrivent en tête ou des actions qui
  doivent être réalisées
- Identifier les items de sa todo liste par projet (par exemple : est-ce que ça
  concerne le développement de tel logiciel ou l'organisation des vacances) et
  par contexte (doit être faite au téléphone ? nécessite un accès internet ?)
- Parcourir régulièrement sa todo liste pour actualiser les priorités et les
  échéances de ses tâches.

Things permet de faire ça très efficacement, surtout lorsqu'on utilise aussi la
version mobile de l'application, disponible sur iOS, et qui se synchronise via
wifi avec la version bureau de l'application.

[Things by Cultured Code][things]

(En outre, pour ne rien gâcher, Cultured Code, l'éditeur du soft, a [quelques
idées assez innovantes en matière de dashboarding][things-dashboard])

## 2. TimeBoxed

TimeBoxed est une application extrêmement simple : c'est un minuteur pour Mac OS
X, idéal pour le time boxing, c'est-à-dire définir un intervalle de temps pour
travailler sur une tâche donnée.

{% asset timeboxed-screenshot.png %}

Associé à GTD, le time boxing est une excellente technique pour combattre les
tendances à la procrastination, dont plusieurs articles de blog font l'apologie,
parmi lesquels :

- [15 Time Boxing Strategies to Get Things Done](http://litemind.com/time-boxing/);
- [Le timeboxing, c'est super mais…](http://www.qualitystreet.fr/2007/11/14/le-timeboxing-cest-super-mais/);
- [La puissance du time boxing](http://luc-jeanniard.blogspot.com/2009/12/la-puissance-du-time-boxing.html).

Malgré son prix un peu élevé, TimeBoxed est un outil vraiment utile et qui aide
à maîtriser son temps.

[TimeBoxed][timeboxed]

## 3. Klok

Klok est une application de time tracking, qui aide à tracer ses activités de la
semaine et, si besoin, à en faire le reporting.

{% asset klok-screenshot.png %}

Bien que son usage soit particulièrement utile dans les grosses sociétés où des
relevés d'activité sont régulièrement demandés aux collaborateurs, c'est aussi
un outil essentiel pour le travailleur indépendant (voire l'étudiant) afin
d'analyser l'utilisation faite de son temps de travail.

En outre, pour ne rien gâcher, Klok, qui repose sur Abode Air, a un graphisme
très réussi et propose une version gratuite.

[Klok][klok]

## 4. Bugzilla

Un outil de bug tracking est également totalement indispensable. Plusieurs
concurrents open source offrent les mêmes services que Bugzilla, notamment
Mantis, et j'ai d'ailleurs choisi ce logiciel de manière un peu triviale : je
tenais juste une occasion de l'essayer.

{% asset bugzilla-screenshot.png %}

Le bug tracking est indispensable à n'importe quelle activité de développement
d'un produit, qu'il soit logiciel ou autre, même lorsque cette activité est
réalisée en solo. C'est un outil complémentaire aux outils de management de
tâches (comme Things) en ce qu'il permet de gérer un cycle de vie de ses items
(nouveau, assigné, en cours, fermé, validé), ainsi que (et surtout !) leur
historisation.

[Bugzilla][bugzilla]

## 5. SVN

Un outil de gestion de version post-CVS, de type SVN ou GIT, est indispensable
et rarement utilisé de manière optimale. Même si l'usage de ces logiciels est
courant, il est important de rappeler leur utilité et leurs règles de bon usage.

Le tagging est une activité essentielle qui permet de pouvoir gérer proprement
les retours en arrière, souvent nécessaires dans une activité de développement
logiciel. Grâce à SVN, les multiples répertoires "sources", "sources2",
"sources-temp", "sources-old" n'ont plus de raison d'être sur des postes de
développement : l'outil gère tous ces besoins d'historisation du code à notre
place.

Là encore, l'usage de systèmes de gestion de version, même dans une pratique en
solo me semble indispensable. Des commits fréquents, basés sur la réalisation de
tâches unitaires (par exemple, un item de Bugzilla), permet d'avoir un suivi du
code source très clair et la quasi assurance que chaque révision est
fonctionnelle. En outre, le respect de ces bonnes pratiques participent aussi à
optimiser son temps de travail.

[svnX][svnx] (un client SVN sous Mac OS X)

## Remarques

Les outils recensés dans cette page sont donc des outils de :

- task management
- time boxing
- time tracking
- bug tracking
- revision control

Quelques suites logicielles existent permettant de gérer tous ces points (de
type Atlassian). Je n'en parle pas ici pour deux raisons :

- malgré leur qualité apparente, je n'ai jamais eu l'occasion de tester ces
  logiciels, la plupart du temps payants;
- en tant qu'utilisateur unique, je préfère maximiser le nombre d'applications
  qui tournent sur un poste client, permettant plus facilement un travail
  nomade.

[bugzilla]: https://www.bugzilla.org
[gtd]: http://fr.wikipedia.org/wiki/Getting_Things_Done
[klok]: http://www.getklok.com/
[svnx]: http://code.google.com/p/svnx/
[things-dashboard]: http://culturedcode.com/status/
[things]: http://culturedcode.com/things/
[timeboxed]: http://www.macmation.com/TimeBoxed
