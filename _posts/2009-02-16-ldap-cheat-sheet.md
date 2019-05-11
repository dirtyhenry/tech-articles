---
layout: default
title: LDAP Cheat Sheet
---

*Lightweight Directory Access Protocol* est un protocole de gestion d'annuaires.
Il permet l'enregistrement d'entrées sous forme arborescente. Les entrées sont associées à des attributs.

## Eléments de nommage

Le nommage s'inspire du nommage DNS :
* *dc* : domain component (nom de domaine)
* *ou* : organizational unit (unité)
* *cn* : common name
* *ui* : unique identifier

Le chemin absolu d'une entrée s'appelle le *dn* (distinguished name). Il est constitué de son nom de feuille (le *rdn*, relative distinguished name), suivi du dn de son père.

## Standards

- Port non sécurisé ou sécurisé via TLS : 389
- Port sécurisé via SSL (ldaps) : 636
- Protocole asynchrone avec atomicité des actions mais pas de gestion de transactions
- Version de protocole la plus courante : 3
