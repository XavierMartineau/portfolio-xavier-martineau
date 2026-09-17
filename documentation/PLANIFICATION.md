# Choix technologiques

## 1. Gestion des données

### Type

#### Fichier `.json`

### Justification

L'utilisation d'un fichier JSON est plus simple et plus facile à gérer sur GitHub. Il reste léger, lisible et pratique pour organiser des données sans complexifier le projet.

## 2. Animations

### Type

#### GSAP + CSS pur

### Justification

GSAP sera utile pour les animations plus complexes, comme le suivi de la souris. Le CSS pur sera préféré pour les animations plus légères, comme la barre de chargement ou les effets de pourcentage.

## 3. Structure de navigation

### Type

#### Multipage avec paramètres d'URL

### Justification

Un site multipage permet de garder une structure minimaliste et claire, avec des pages distinctes selon les sections. Cela rend aussi la maintenance plus simple, car chaque page est séparée et plus facile à corriger en cas d'erreur.

## 4. Hébergement

### Type

#### Netlify

### Justification

Netlify permet d'avoir un nom de domaine gratuit et plus professionnel qu'un simple nom complet avec GitHub Pages. Il est simple à utiliser et offre une meilleure présentation du site.

---

# Animations

## Page d'atterrissage

### Élément à animer 01

#### Une barre de chargement sur la page d'atterrissage

### Type d'animation

#### Barre de progression qui augmente au chargement

### Déclencheur

#### Chargement de la page

---

### Élément à animer 02

#### Le petit cercle du mot "ONLINE"

### Type d'animation

#### Fondu d'opacité

### Déclencheur

#### Au chargement de la page jusqu'au changement de page

---

### Élément à animer 03

#### Les petits cercles lumineux en arrière-plan

### Type d'animation

#### Translation et rotation de petits cercles colorés en arrière-plan

### Déclencheur

#### Au chargement de la page jusqu'au changement de page

---

### Élément à animer 04

#### Le cercle lumineux qui suit le curseur

### Type d'animation

#### Poursuite du curseur de la souris

### Déclencheur

#### Mouvement du curseur sur la page

---

## Page d'accueil

### Élément à animer 01

#### Le petit cercle sur "Disponible pour de nouveaux projets"

### Type d'animation

#### Fondu d'opacité

### Déclencheur

#### Au chargement de la page jusqu'au changement de page

---

### Élément à animer 02

#### Le texte "scroll"

### Type d'animation

#### Défilement

### Déclencheur

#### Le défilement de la page jusqu'à la suite de la page

---

### Élément à animer 03

#### Les "glass cards"

### Type d'animation

#### Opacité et rotation

### Déclencheur

#### À l'apparition des "glass cards" lors du scroll

---

## Menu de navigation

### Élément à animer 01

#### Les boutons du menu UI

### Type d'animation

#### Le texte devient 0.5x plus grand au survol

### Déclencheur

#### Survol des menus

---

## Page Projets (solo)

### Élément à animer 01

#### Le bouton pour agrandir le projet en plein écran

### Type d'animation

#### La page prend la taille de la page au complet

### Déclencheur

#### Lors du clic

---

## Page Compétences

### Élément à animer 01

#### Les barres de pourcentage pour les compétences

### Type d'animation

#### Apparition d'une barre de pourcentage jusqu'au chiffre ciblé

### Déclencheur

#### Au chargement de la page

---

## Page À propos

### Élément à animer

#### Les petits points de couleur à côté des cartes de parcours

### Type d'animation

#### Opacité en fondu

### Déclencheur

#### Au contact des cartes de parcours

---
