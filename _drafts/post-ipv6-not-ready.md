# IPv6 ready ?

L'infrastructure réseau est-elle **prête pour l'IPv6 ?** La question s'est posée très simplement pour nous à *Bootstragram* au moment de chercher un hébergeur pour nos serveurs. La réponse est simplement **non** !


## IPv6 et Gandi VPS

Ayant l'habitude de travailler avec [Gandi](http://www.gandi.net/) (noms de domaine et un serveur mi-pro / mi-perso), je suis allé voir leur offre. Le serveur de base est à 7,96€ HT / mois[^1] en proposant seulement une IPv6. Rajouter une IPv4 représente 3,53€ HT / mois en plus, soit 44% d'augmentation !

Donc là on se dit, voyons voir ce que donne un serveur IPv6 only, après tout pourquoi pas, on dit depuis des années qu'il faut passer à l'IPv6.

Et nous avons créé un petit serveur IPv6 only pour nos tests.


## IPv6 et la Freebox

Chez moi, je suis chez Free, avec une Freebox V4 (firmware 1.5.20). La configuration par défaut de cette Freebox n'accepte pas l'IPv6, ce qui est un très mauvais démarrage pour nos tests.

Il y a possibilité d'ajouter le support de l'IPv6 en allant dans les réglages, mais ça veut dire qu'on se restreint à un publique de connaisseurs. Et puis surtout, même après activation, on se rend vite compte que ça ne fonctionne pas tout le temps.

Un `ssh@ipv6.de.mon.serveur.io` va tourner dans le vide sans afficher de prompt, alors que le `ssh@ipv4.de.mon.serveur.io` sur ce même serveur (qui a donc 2 IPs) va répondre tout de suite.

Et un peu plus tard `ssh@ipv6.de.mon.serveur.io` va fonctionner…

Ce n'est peut-être pas Free le fautif, c'est peut-être un élément du réseau entre Free et Gandi, mais ce qui est sûr c'est qu'il y a 2 obstacles majeurs. Il faut déjà avoir une démarche volontaire d'activation de l'IPv6 et même dans ce cas ça ne fonctionne pas à tous les coups.


## IPv6 et la mobilité

Notre [application *Statium*](http://www.statium.io/ios-app) est proposée sur mobile. Et pour notre [blog data-lab](http://blog.statium.io/) nous faisons particulièrement attention à ce qu'il soit 100% compatible smartphone.

Donc la 2ème question qui vient à l'esprit : est-ce que le réseau 3G et 4G supporte l'IPv6 ? Là encore c'est plutôt décevant.

Je suis chez Bouygues avec la 4G. En faisant quelques tests pour accéder à mon serveur HTTP en IPv6, et bien ça ne fonctionne tout simplement pas (test effectué avec Safari sur iOS 8).

De nouveau, ce n'est peut-être pas l'infrastructure Bouygues Telecom qui pose problème, c'est peut-être un élément d'interconnexion, mais le résultat est le même : si notre serveur est IPv6 only, on peut s'asseoir sur une bonne partie du traffic mobile.


## IPv6 not ready

En résumé, quand on est éditeur de services, de contenus ou d'applications avec une dépendance à internet (ce qui est une tautologie de nos jours), on ne peut pas se permettre d'exposer son infrastructure en IPv6 (sauf si on a l'envie d'être injoignable par la majorité de ses utilisateurs).

À l'heure du mouvement [French Tech](http://www.lafrenchtech.com/) lancé par le gouvernement, il serait intéressant d'accélérer le support de l'IPv6 chez les opérateurs, sans quoi rien ne pourra se mettre en place.

La [tentative de Corinne Erhel](http://www.nextinpact.com/news/92774-fibre-ipv6-open-data-vote-premieres-mesures-loi-macron.htm) allait dans ce sens, mais elle a été reportée.

Et même si cette loi passe bientôt ; elle oblige les équipementiers à délivrer des terminaux compatibles IPv6 à partir du 1er janvier 2017 ; le temps que le renouvellement se propage chez les utilisateurs finaux et dans les infrastructures réseaux, il faudra compter quelques années avant d'avoir un taux de couverture IPv6 assez intéressant pour que les éditeurs passent le pas.

On y est pas encore !

[^1]: en se basant sur l'achat d'un pack de 2 millions de crédits chez Gandi
