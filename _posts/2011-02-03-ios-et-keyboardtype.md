---
published: false
title: iOS et keyboardType
author:
  display_name: Mick
  login: mick
  email: dirtyhenry@gmail.com
  url: ''
author_login: mick
author_email: dirtyhenry@gmail.com
wordpress_id: 49
date: '2011-02-03 11:01:32 +0100'
categories: []
tags: []
comments: []
---
Comme j'ai cherché une page qui ressemblerait à celle-ci et que je ne l'ai pas trouvée, voici ma compilation "à quoi ressemble tel type de clavier d'iOS selon la valeur de UIKeyboardType ?".

Bien sûr, ce travail est très limité :
- je montre seulement les touches accessibles via la vue principale du clavier
- je montre seulement la version iPhone en orientation portrait
- je montre seulement les types de clavier non deprecated sur le SDK 4.2

Mais quand même, ça peut être utile.

(s'il existe une page similaire faisant davantage référence, n'hésitez pas à en faire part dans les commentaires)


{{{UIKeyboardTypeDefault}}}

<quote>Use the default keyboard for the current input method. Available in iOS 2.0 and later.</quote>

<img25>


{{{UIKeyboardTypeASCIICapable}}}


<quote>Use a keyboard that displays standard ASCII characters.
Available in iOS 2.0 and later.</quote>

<img26>


{{{UIKeyboardTypeNumbersAndPunctuation}}}


<quote>Use the numbers and punctuation keyboard.
Available in iOS 2.0 and later.</quote>

<img27>


{{{UIKeyboardTypeURL}}}


<quote>Use a keyboard optimized for URL entry. This type features “.”, “/”, and “.com” prominently.
Available in iOS 2.0 and later.</quote>

<img28>


{{{UIKeyboardTypeNumberPad}}}


<quote>Use a numeric keypad designed for PIN entry. This type features the numbers 0 through 9 prominently. This keyboard type does not support auto-capitalization.
Available in iOS 2.0 and later.</quote>

<img29>


{{{UIKeyboardTypePhonePad}}}


<quote>Use a keypad designed for entering telephone numbers. This type features the numbers 0 through 9 and the “*” and “#” characters prominently. This keyboard type does not support auto-capitalization.
Available in iOS 2.0 and later.</quote>

<img30>


{{{UIKeyboardTypeNamePhonePad}}}


<quote>Use a keypad designed for entering a person’s name or phone number. This keyboard type does not support auto-capitalization.
Available in iOS 2.0 and later.</quote>

<img31>


{{{UIKeyboardTypeEmailAddress}}}


<quote>Use a keyboard optimized for specifying email addresses. This type features the “@”, “.” and space characters prominently.
Available in iOS 2.0 and later.</quote>

<img32>


{{{UIKeyboardTypeDecimalPad}}}


<quote>Use a keyboard with numbers and a decimal point.
Available in iOS 4.1 and later.</quote>

<img33>
