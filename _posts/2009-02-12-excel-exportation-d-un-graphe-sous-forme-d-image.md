---
layout: default
title: "Excel : exportation d’un graphe sous forme d’image"
---

## Comment

C'est facile à faire, à partir de cette macro qui export le fichier, au format
PNG, dans `d:/temp` !

## La macro

```
Sub exportGraphiquePng()
Dim NomGraph As String
Dim Fich As String
NomGraph = ActiveChart.Name
Fich = "d:/temp/"
ActiveChart.Export Filename:=Fich &amp; NomGraph &amp; ".png", FilterName:="PNG"
End Sub
```
