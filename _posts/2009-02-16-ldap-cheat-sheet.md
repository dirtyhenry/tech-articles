---
layout: post
title: LDAP Cheat Sheet
categories: [devops, ldap]
---

_Lightweight Directory Access Protocol_ est un protocole de gestion d'annuaires.
Il permet l'enregistrement d'entrées sous forme arborescente. Les entrées sont
associées à des attributs.

## Eléments de nommage

Le nommage s'inspire du nommage DNS :

- _dc_ : domain component (nom de domaine)
- _ou_ : organizational unit (unité)
- _cn_ : common name
- _ui_ : unique identifier

Le chemin absolu d'une entrée s'appelle le _dn_ (distinguished name). Il est
constitué de son nom de feuille (le _rdn_, relative distinguished name), suivi
du dn de son père.

## Standards

- Port non sécurisé ou sécurisé via TLS : 389
- Port sécurisé via SSL (ldaps) : 636
- Protocole asynchrone avec atomicité des actions mais pas de gestion de
  transactions
- Version de protocole la plus courante : 3
