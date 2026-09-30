# Portfolio de Xavier Martineau

Portfolio personnel consacré à la création multimédia : développement web, design 2D, animation 3D, illustration et expériences interactives.

## Informations principales

- **Type de projet :** portfolio personnel multipage.
- **Auteur :** Xavier Martineau.
- **Objectif :** présenter des projets web, 2D, 3D et interactifs dans une expérience visuelle claire, sombre, lumineuse, harmonieuse et animée.
- **Organisation :** une page d'accueil, une page de projets filtrable, des pages de détail, une page À propos et une page Contact.
- **Navigation :** structure multipage avec paramètres d'URL pour ouvrir un projet précis.
- **Données :** les informations communes des projets sont regroupées dans des fichiers de données JavaScript/JSON.
- **Hébergement prévu :** Netlify.
- **Langues prévues :** français et anglais.

## Choix technologiques actuels

### Données

Les données sont organisées dans des fichiers JSON ou des objets JavaScript partagés. Cette approche reste légère, lisible et adaptée à un projet suivi avec GitHub.

### Animations

Le projet utilise principalement des animations CSS natives pour les effets légers : transitions, chargement, halos, révélations au défilement et effets de survol.

GSAP a été retenu pour les animations plus complexes, notamment les interactions liées au mouvement de la souris, lorsque ce niveau de contrôle est nécessaire.

### Structure de navigation

Le portfolio utilise une architecture multipage avec des fichiers HTML séparés. Les paramètres d'URL permettent notamment d'afficher le détail d'un projet sélectionné.

### Hébergement

Netlify est l'hébergement prévu pour publier le portfolio avec une adresse accessible et une mise en ligne simple.

## Animations prévues et intégrées

### Page d'atterrissage

- Barre de progression animée au chargement.
- Fondu du point lumineux associé à l'état « En ligne ».
- Orbes colorés animés en arrière-plan.
- Lignes reliant les éléments lumineux.
- Lumière qui suit le curseur de la souris.

### Page d'accueil

- Point animé à côté du statut de disponibilité.
- Indicateur de défilement avec flèche animée.
- Révélation des cartes lors de leur apparition dans la fenêtre.
- Effets de survol sur les cartes et les boutons.
- Grille et halos d'arrière-plan animés de manière subtile.

### Menu de navigation

- Mise en évidence du lien actif.
- Effets de survol sur les liens.
- Transition glissante du sélecteur de langue FR/EN.
- Animation du bouton hamburger sur les écrans mobiles.

### Page Projets

- Filtres par catégorie : tous, animation 3D, illustration 2D et site web.
- Effets de survol sur les cartes de projets.
- Animation du texte et du flou des cartes.
- Transitions adaptées au responsive.

### Page de détail d'un projet

- Bouton d'agrandissement du visuel.
- Affichage d'une image secondaire lorsque le projet en possède une.
- Indication de défilement vers le contenu.
- Navigation entre les projets.

### Page À propos et page Contact

- Révélation progressive des contenus.
- Animations discrètes des cartes et des éléments décoratifs.
- Barres et indicateurs visuels pour les informations de parcours et de compétences.

## Projets présentés

Les projets actuellement référencés dans les données du portfolio sont :

| Projet              | Catégorie | Année     | Technologies principales                      |
| ------------------- | --------- | --------- | --------------------------------------------- |
| Animation & 3D      | 3D        | 2025      | 3D, animation, MAYA, rendu                    |
| La Maison           | Site web  | 2024      | Web, UX/UI, design, responsive                |
| Stitch              | 2D        | 2025      | Vectoriel, illustration, couleur, composition |
| Logo-bouclier       | 2D        | 2026      | Vectoriel, illustration, couleur, composition |
| Noël vectoriel      | 2D        | 2024      | Vectoriel, illustration, couleur, composition |
| Atelier chromatique | Site web  | 2025-2026 | Web, UX/UI, design, responsive                |

## Fonctionnalités du portfolio

- Splash screen d'introduction avec logo et progression.
- Page d'accueil avec hero, statistiques et projets en vedette.
- Catalogue de projets filtrable par catégorie.
- Pages de détail chargées selon le projet choisi.
- Navigation entre les projets.
- Traduction française/anglaise avec mémorisation de la langue.
- Menu responsive pour tablette et mobile.
- Sélecteur de langue accessible avec l'état actif annoncé.
- Support de `prefers-reduced-motion` pour limiter les animations lorsque l'utilisateur le demande.
- Métadonnées SEO de base et données Open Graph dans les pages principales.

## Avancement déjà réalisé

- Design du portfolio créé à partir d'un prototype Figma.
- Splash screen restructuré et corrigé.
- Logo, titre et sous-titre ajustés.
- Polices locales intégrées : Inter, Space Grotesk, Syne et Speedy.
- Hero et projets vedettes améliorés.
- Cartes de projets enrichies avec catégories, technologies, images, couleurs et effets de survol.
- Système de données partagé pour les cartes et les pages détaillées.
- Indicateur de défilement ajouté à l'accueil.
- Navigation active harmonisée entre les pages.
- Responsive et accessibilité améliorés sur les contrôles principaux.
- Animations FR/EN et animations de fond ajoutées au portfolio.

## Ouvrir le projet

Le projet est un site statique. Aucun serveur ou système de compilation n'est nécessaire pour consulter les pages principales.

1. Ouvrir `index.html` pour afficher le splash screen.
2. Utiliser le bouton d'entrée pour accéder à l'accueil.
3. Pour consulter directement une page, ouvrir par exemple `html/projets.html`.
4. Pour tester correctement les paramètres d'URL et les médias locaux, utiliser de préférence un serveur local ou l'aperçu intégré de VS Code.

## Structure du projet

```text
index.html                 Splash screen et point d'entrée
assets/                    Polices, images et SVG
css/                       Styles globaux, composants et responsive
data/                      Données JSON du projet
documentation/             Journal, planification et maquettes
html/                      Pages du portfolio
js/                        Traduction, navigation, splash et projets
processus_creation/        Ressources liées au processus de création
```

## Documentation

- [Journal du projet](documentation/JOURNAL.md)
- [Planification et choix techniques](documentation/PLANIFICATION.md)

## Notes

- L'adresse de contact publique est `Xavier.g.martineau@gmail.com`.
- Les dépendances et outils envisagés doivent rester cohérents avec l'implémentation réellement utilisée dans le projet.
