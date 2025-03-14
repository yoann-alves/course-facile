# Journal du Projet - Course Facile

*Date de dernière mise à jour: 13/03/2025*

## Historique des Modifications

### 13/03/2025 - Implémentation du mode sombre
- Création d'un `ThemeContext` pour gérer l'état du thème (clair, sombre, système)
- Ajout d'un sélecteur de thème dans les paramètres
- Adaptation de l'interface utilisateur pour le mode sombre
- Persistance des préférences de thème dans `localStorage`
- Synchronisation avec les préférences système lorsque le thème "système" est sélectionné
- Gestion des avertissements liés aux paramètres

### 13/03/2024 - Amélioration du mode sombre
- Adaptation complète de tous les composants UI pour le mode sombre
- Mise à jour des cartes et des éléments de liste pour une meilleure visibilité en mode sombre
- Ajout de classes dark mode aux composants Badge, Button et Toast
- Amélioration des contrastes et des couleurs pour une meilleure accessibilité
- Adaptation des formulaires et des éléments interactifs pour le mode sombre
- Harmonisation des styles entre les différentes pages de l'application

### 13/03/2024 - Correction des problèmes de contraste en mode sombre
- Correction des titres et textes qui n'étaient pas visibles en mode sombre
- Ajout de classes dark:text-gray-100 et dark:text-gray-200 aux titres principaux
- Ajout de classes dark:text-gray-300 et dark:text-gray-400 aux textes secondaires
- Amélioration du contraste des éléments interactifs en mode sombre
- Vérification et correction de tous les composants pour assurer une bonne lisibilité
- Harmonisation des styles de survol avec dark:hover:text-gray-100 pour une meilleure visibilité

### 13/03/2024 - Gestion des avertissements liés aux paramètres
- Analyse des avertissements concernant l'accès direct aux propriétés de `params` dans les composants clients
- Tentative d'utilisation de `React.use()` pour résoudre l'avertissement, mais cette approche génère des erreurs dans les composants clients
- Implémentation d'une solution utilisant le hook `useParams()` de Next.js pour accéder aux paramètres de route dans les composants clients
- Cette approche évite à la fois les avertissements liés à l'accès direct et les erreurs liées à l'utilisation de `React.use()`
- Mise à jour de la documentation pour refléter cette décision technique

### 13/03/2024 - Amélioration du processus de création de liste
- Implémentation d'une modale de création rapide de liste accessible depuis la page "Toutes les listes"
- Ajout de fonctionnalités pour créer une liste à partir de :
  - Recherche de produits dans la base de données
  - Sélection de produits récemment utilisés
  - Duplication d'une liste existante
- Simplification du flux utilisateur pour la création de liste
- Suppression de l'onglet "Créer une liste" devenu redondant
- Amélioration de l'expérience utilisateur avec un processus plus fluide et intuitif

### 13/03/2024 (Mise à jour UX)
- Amélioration majeure de l'expérience utilisateur :
  - Implémentation d'un mode double (visualisation/édition) pour les listes de courses
  - Ajout d'un menu d'actions contextuel pour les cartes de listes
  - Amélioration du retour visuel lors de l'interaction avec les cartes
  - Simplification des interfaces pour une meilleure clarté
- Mise à jour de la documentation du projet

### 13/03/2024 (Mise à jour)
- Amélioration de l'expérience utilisateur :
  - Modification du composant `ShoppingListCard` pour rendre la carte entière cliquable
  - Simplification de l'interface en supprimant les boutons redondants
  - Amélioration de l'accessibilité avec des zones de clic plus grandes

### 13/03/2024
- Correction de bugs et améliorations techniques :
  - Correction des liens dans le composant `ShoppingListCard` qui pointaient vers `/shopping-list/${id}` au lieu de `/lists/${id}`
  - Correction de l'erreur de console concernant les paramètres dans les pages dynamiques en utilisant `React.use()`
  - Implémentation d'une fonction `generateId()` pour créer des IDs aléatoires plus robustes
  - Ajout d'une fonction `formatDate()` pour assurer un formatage cohérent des dates en français
  - Mise à jour de la page de création de liste pour utiliser les IDs aléatoires
- Mise à jour de la documentation du projet

### 13/03/2024
- Implémentation des fonctionnalités de listes et de produits :
  - Création de la page de détail d'une liste (`/lists/[id]`) avec affichage des produits par catégorie
  - Création de la page de détail d'un produit (`/products/[id]`) avec gestion des instances et dates de péremption
  - Ajout de liens entre les pages de listes et de produits
  - Mise à jour de la page de gestion des péremptions avec des liens vers les détails des produits
- Correction d'une erreur d'hydratation dans la page des listes (lists/page.tsx)
  - Spécification explicite de la locale 'fr-FR' pour la méthode toLocaleDateString()
  - Résolution du problème de rendu différent entre le serveur et le client
- Ajout d'un lien vers la route `/lists` dans la sidebar du composant MainLayout.tsx
- Mise à jour de la documentation du projet :
  - Création du document de rétro-ingénierie
  - Création du guide utilisateur
  - Mise à jour du journal du projet

### 13/03/2024 (Initialisation)
- Création du projet avec Next.js
- Configuration de Tailwind CSS
- Mise en place de la structure de base du projet
- Création des composants de layout (MainLayout, Sidebar)
- Implémentation des routes principales
- Ajout de données factices pour le prototypage

## État Actuel du Projet

Le projet est actuellement en phase de prototypage, avec un focus sur le développement frontend. Les principales fonctionnalités sont :

- Navigation entre les différentes sections via la sidebar
- Affichage des listes de courses avec options de filtrage et de tri
- Visualisation détaillée d'une liste de courses avec ses produits
- Gestion des produits avec leurs instances et dates de péremption
- Gestion des dates de péremption avec alertes visuelles
- Interface responsive adaptée aux appareils mobiles et desktop

## Prochaines Étapes

- Amélioration de l'interface utilisateur
- Implémentation des fonctionnalités d'édition des listes et des produits
- Ajout de fonctionnalités de partage de listes
- Implémentation de notifications pour les produits bientôt périmés
- Préparation pour l'intégration avec un backend

## Notes Techniques

- Le projet utilise Next.js et Tailwind CSS
- Les données sont actuellement simulées avec des fichiers JSON statiques
- L'application est en mode développement frontend uniquement (prototypage)
