# Product Requirements Document (PRD) - Course Facile

*Date de dernière mise à jour: 14/03/2025*

## 1. Elevator Pitch
Course Facile est une application web conçue pour aider les utilisateurs à gérer leurs courses de manière efficace et collaborative. Elle permet de créer des listes de courses, de suivre les dates de péremption des aliments, et d'éviter le gaspillage tout en économisant de l'argent. Grâce à une interface intuitive et moderne, les utilisateurs peuvent facilement partager des listes avec leur famille et recevoir des notifications personnalisées.

## 2. Who is this app for
Cette application s'adresse à toute personne souhaitant optimiser ses courses, qu'il s'agisse de familles, de colocataires ou d'individus cherchant à mieux gérer leur consommation alimentaire. Elle est idéale pour ceux qui veulent gagner du temps, éviter d'oublier des produits, et réduire le gaspillage alimentaire.

## 3. Functional Requirements
- **Création de listes de courses** : Les utilisateurs peuvent créer des listes ponctuelles ou permanentes.
- **Gestion des listes** : Visualisation, filtrage et tri de toutes les listes de courses.
- **Partage de listes** : Possibilité de partager des listes avec d'autres utilisateurs ou de créer des groupes familiaux.
- **Produits récurrents** : Ajout automatique de produits à la liste en fonction des besoins.
- **Gestion des courses** : Saisie manuelle des prix et quantités, calcul automatique du total, bons de réductions.
- **Gestion des péremptions et des stocks** : Ajout de produits avec dates de péremption pour suivre les aliments à la maison.
- **Produits prédéfinis et personnalisés** : Accès à une base de données de produits courants et possibilité de créer des produits personnalisés.
- **Groupes de produits** : Organisation des produits par catégories (ex. : produits laitiers, fruits).
- **Notifications et rappels** : Notifications personnalisables pour les achats récurrents et les péremptions.

## 4. User Stories
- En tant qu'utilisateur, je veux créer une liste de courses pour mes achats hebdomadaires.
- En tant qu'utilisateur, je veux visualiser toutes mes listes de courses et les filtrer par statut (actives, terminées, récentes).
- En tant qu'utilisateur, je veux partager ma liste de courses avec ma famille pour que nous puissions tous ajouter des articles.
- En tant qu'utilisateur, je veux recevoir une notification lorsque mes produits approchent de leur date de péremption.
- En tant qu'utilisateur, je veux ajouter des prix et des quantités pour suivre mes dépenses lors de mes courses.
- En tant qu'utilisateur, je veux créer des groupes de produits pour mieux organiser mes achats.

## 5. User Interface
L'interface de l'application sera moderne et minimaliste, avec une palette de couleurs naturelles, principalement des tons de vert. La navigation sera fluide et intuitive, permettant à tous les utilisateurs, qu'ils soient débutants ou expérimentés, de naviguer facilement dans l'application. Les éléments de l'interface incluront :
- Un tableau de bord pour visualiser les listes de courses et les notifications.
- Une barre latérale (sidebar) pour accéder facilement à toutes les fonctionnalités principales, notamment :
  - Tableau de bord
  - Toutes les listes
  - Gestion des péremptions
  - Paramètres
- Des formulaires simples pour la création et la gestion des listes et des produits.
- Des sections dédiées pour la gestion des péremptions et des stocks.
- Un système de notifications clair et accessible.
- Support du mode sombre pour une meilleure expérience utilisateur.

## 6. État d'Implémentation Actuel
- **Implémenté** :
  - Structure de base de l'application
  - Navigation via la barre latérale (sidebar)
  - Page de visualisation de toutes les listes avec options de filtrage et de tri
  - Interface responsive pour mobile et desktop
  - Mode sombre avec adaptation complète de tous les composants
  - Modale de création rapide de liste avec plusieurs méthodes (recherche, produits récents, duplication)
  - Page de détail d'une liste avec affichage des produits par catégorie
  - Page de détail d'un produit avec gestion des instances et dates de péremption
  - Composants de filtrage avancés (SearchAndFilterBar, TabFilters, AdvancedFilters)
  - Hooks personnalisés pour la gestion des filtres (useFilters, useAdvancedFilters)
  
- **En cours de développement** :
  - Optimisation des composants de filtrage (debounce, historique, statistiques)
  - Amélioration des fonctionnalités d'édition des listes et des produits
  - Optimisation de l'expérience utilisateur globale
  
- **À implémenter** :
  - Partage de listes avec d'autres utilisateurs
  - Système de notifications pour les produits bientôt périmés
  - Intégration avec un backend pour la persistance des données
  - Authentification des utilisateurs
  - Fonctionnalités avancées (suivi des prix, statistiques, etc.)
  - Intégrations externes (services de livraison, assistants vocaux, etc.)
