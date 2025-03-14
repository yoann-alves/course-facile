# Rétro-ingénierie - Course Facile

*Date de dernière mise à jour: 14/03/2025*

## Structure du Projet

Le projet Course Facile est une application web développée avec Next.js qui permet aux utilisateurs de gérer leurs listes de courses et de suivre les dates de péremption des produits.

### Organisation des Dossiers

- `/src/app` : Contient les routes de l'application (pages)
- `/src/components` : Contient les composants réutilisables
- `/src/data` : Contient les données factices pour le prototypage
- `/src/lib` : Contient les utilitaires et fonctions d'aide
- `/src/hooks` : Contient les hooks personnalisés
- `/src/contexts` : Contient les contextes React

### Routes Principales

- `/dashboard` : Tableau de bord principal
- `/lists` : Affichage de toutes les listes de courses
- `/lists/[id]` : Détails d'une liste de courses spécifique
- `/create-list` : Création d'une nouvelle liste
- `/inventory` : Gestion des stocks et dates de péremption
- `/products/[id]` : Détails d'un produit spécifique avec ses instances
- `/settings` : Paramètres de l'application

## Composants Clés

### Composants de Layout

1. **MainLayout.tsx**
   - Composant principal de mise en page
   - Gère l'affichage de la barre latérale (sidebar)
   - Responsive avec un comportement différent sur mobile et desktop
   - Navigation vers les routes principales de l'application

2. **Navigation.tsx**
   - Composant de barre latérale
   - Peut être réduit/étendu
   - Contient des liens vers toutes les routes principales

### Composants UI

- Utilisation de composants UI basés sur shadcn/ui
- Système de toast pour les notifications
- Cartes pour afficher les listes et les produits
- Barres de progression pour le suivi des listes

### Composants de Filtres et Recherche

1. **SearchAndFilterBar** (`src/components/filters/SearchAndFilterBar.tsx`)
   - Barre de recherche avec option de tri
   - Permet aux utilisateurs de rechercher des éléments et de changer l'ordre de tri
   - Utilisé dans les pages de listes et d'inventaire

2. **TabFilters** (`src/components/filters/TabFilters.tsx`)
   - Filtres par onglets avec compteurs
   - Permet aux utilisateurs de filtrer les données par catégories principales
   - Affiche le nombre d'éléments dans chaque catégorie
   - Utilisé dans la page de listes pour filtrer par statut (Toutes, En cours, Terminées)

3. **AdvancedFilters** (`src/components/filters/AdvancedFilters.tsx`)
   - Filtres avancés avec options multiples
   - Permet aux utilisateurs d'appliquer des filtres plus complexes
   - Affiche le nombre de filtres actifs
   - Utilisé dans la page d'inventaire pour filtrer par catégories, emplacements et statut

### Hooks personnalisés

1. **useFilters** (`src/hooks/useFilters.ts`)
   - Hook général pour gérer les filtres, la recherche et le tri
   - Fournit des fonctions pour mettre à jour les filtres, réinitialiser les filtres, changer l'ordre de tri, etc.
   - Permet de persister les filtres dans le localStorage

2. **useAdvancedFilters** (`src/hooks/useAdvancedFilters.ts`)
   - Hook spécifique pour gérer les filtres avancés
   - Gère des groupes de filtres avec des options multiples
   - Calcule le nombre de filtres actifs
   - Permet de persister les filtres dans le localStorage

3. **useFormatDate** (`src/hooks/useFormatDate.ts`)
   - Hook pour formater les dates de manière cohérente
   - Utilise la locale française pour l'affichage des dates

4. **useModals** (`src/hooks/useModals.ts`)
   - Hook pour gérer l'état des modales dans l'application
   - Permet d'ouvrir et fermer des modales identifiées par un ID

## Fonctionnalités Découvertes

### Gestion des Listes

- Affichage de toutes les listes avec filtrage (actives, terminées, récentes)
- Visualisation détaillée d'une liste avec ses produits groupés par catégorie
- Mode double pour les listes : visualisation (pour faire les courses) et édition (pour modifier la liste)
- Suivi de la progression d'une liste (nombre d'articles cochés)
- Tri des listes par date, nom ou nombre d'éléments
- Génération d'IDs aléatoires pour les nouvelles listes et leurs articles
- Menu d'actions contextuel pour chaque liste (voir/éditer, partager, supprimer)
- Création rapide de liste via une modale intuitive
- Duplication de listes existantes
- Recherche et ajout rapide de produits lors de la création

### Gestion des Produits et Inventaire

- Affichage détaillé d'un produit avec ses informations (catégorie, description, prix, infos nutritionnelles)
- Gestion des instances d'un produit avec leurs dates de péremption
- Ajout de nouvelles instances d'un produit
- Alertes visuelles pour les produits périmés ou bientôt périmés
- Filtrage avancé des produits par catégorie, emplacement et statut
- Recherche de produits par nom

### Filtrage et Recherche

- Système de filtrage cohérent à travers l'application
- Recherche textuelle dans les listes et les produits
- Filtres par onglets pour les catégories principales
- Filtres avancés pour des critères plus spécifiques
- Tri des résultats par différents critères
- Persistance des filtres dans le localStorage

### Navigation

- Sidebar responsive qui s'adapte aux écrans mobiles et desktop
- Navigation entre les différentes sections de l'application
- Liens entre les pages de listes et de produits
- Structure de liens cohérente (utilisation de `/lists/[id]` pour les détails des listes)

### Thème et Apparence

- Support du mode sombre/clair via un contexte global (ThemeContext)
- Possibilité de choisir entre thème clair, sombre ou système (suivant les préférences du système)
- Persistance du choix de thème dans le localStorage
- Adaptation automatique au changement de préférence système lorsque le thème "système" est sélectionné
- Interface utilisateur adaptée au mode sombre avec des couleurs et contrastes appropriés
- Sélecteur de thème accessible dans les paramètres de l'application

## Utilitaires et Fonctions d'Aide

### Génération d'IDs

- Fonction `generateId()` dans `utils.ts` pour créer des IDs aléatoires
- Utilisation d'un préfixe optionnel (ex: 'list', 'product', 'item')
- Combinaison d'un timestamp et d'une partie aléatoire pour garantir l'unicité
- Utilisée lors de la création de nouvelles listes et de nouveaux articles

### Formatage des Dates

- Fonction `formatDate()` dans `utils.ts` pour formater les dates en français
- Accepte une date sous forme de chaîne ou d'objet Date
- Utilise `toLocaleDateString('fr-FR')` pour assurer un formatage cohérent
- Permet d'éviter les erreurs d'hydratation entre le serveur et le client

## Modèles de Données

### ShoppingList
- id: string
- title: string
- createdAt: string
- updatedAt: string
- items: ShoppingListItem[]
- completed: boolean

### ShoppingListItem
- id: string
- name: string
- quantity: number
- unit: string
- category: string
- checked: boolean
- price?: number

### Product
- id: string
- name: string
- category: string
- defaultUnit: string
- description?: string
- imageUrl?: string
- nutritionalInfo?: object
- averagePrice?: number

### ProductInstance
- id: string
- productId: string
- quantity: number
- unit: string
- purchaseDate: string
- expirationDate: string
- location?: string
- opened?: boolean
- notes?: string

## Dépendances

Les composants de filtres utilisent les composants UI de shadcn/ui :
- Button
- Input
- Checkbox
- Label
- Popover
- Separator

## État du Projet

Le projet est actuellement en mode prototypage, avec une concentration sur le développement frontend. Les données sont simulées à l'aide de JSON statiques, sans connexion à un backend.

## Modifications Récentes

### 10/07/2024 - Ajout des composants de filtres et recherche
- Création de composants réutilisables pour les filtres et la recherche
- Implémentation de hooks personnalisés pour gérer les filtres
- Intégration des composants dans les pages de listes et d'inventaire
- Amélioration de l'expérience utilisateur avec des filtres cohérents
- Documentation complète des composants et hooks

### 15/03/2024 - Amélioration du processus de création de liste
- Implémentation d'une modale de création rapide de liste accessible depuis la page "Toutes les listes"
- Ajout de fonctionnalités pour créer une liste à partir de :
  - Recherche de produits dans la base de données
  - Sélection de produits récemment utilisés
  - Duplication d'une liste existante
- Simplification du flux utilisateur pour la création de liste
- Suppression de l'onglet "Créer une liste" devenu redondant
- Amélioration de l'expérience utilisateur avec un processus plus fluide et intuitif

### 14/03/2024 (Mise à jour UX)
- Amélioration majeure de l'expérience utilisateur :
  - Implémentation d'un mode double (visualisation/édition) pour les listes de courses
  - Ajout d'un menu d'actions contextuel pour les cartes de listes
  - Amélioration du retour visuel lors de l'interaction avec les cartes
  - Simplification des interfaces pour une meilleure clarté

### 14/03/2024 (Mise à jour)
- Amélioration de l'expérience utilisateur :
  - Modification du composant `ShoppingListCard` pour rendre la carte entière cliquable
  - Simplification de l'interface en supprimant les boutons redondants
  - Amélioration de l'accessibilité avec des zones de clic plus grandes

### 14/03/2024
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

## Améliorations futures possibles

1. Ajouter la possibilité de sauvegarder des configurations de filtres personnalisées
2. Implémenter un historique des recherches récentes
3. Ajouter des filtres par plage de dates
4. Améliorer l'accessibilité des composants de filtres
5. Ajouter des animations pour améliorer l'expérience utilisateur
6. Implémenter un système de filtres combinés (ET/OU) pour des recherches plus précises
7. Ajouter un système de suggestions de recherche basé sur les recherches précédentes
8. Créer un composant de visualisation des filtres actifs avec possibilité de les supprimer individuellement
9. Optimiser les performances de filtrage pour les grandes listes de données
10. Ajouter des raccourcis clavier pour les actions de filtrage courantes
11. Implémenter un système de filtres favoris que l'utilisateur peut enregistrer
12. Ajouter des statistiques sur les résultats de filtrage (nombre d'éléments, répartition par catégorie, etc.)
13. Créer un système d'export des données filtrées (CSV, PDF)
14. Améliorer la réactivité des composants de filtres sur les appareils mobiles
15. Ajouter des tests unitaires et d'intégration pour les composants de filtres
16. Implémenter un système de filtres contextuels qui s'adaptent au contenu affiché
17. Ajouter un mode de recherche avancée avec opérateurs booléens (AND, OR, NOT)
18. Créer un composant de filtres par tags pour les éléments avec des étiquettes multiples
19. Implémenter un système de filtres géographiques pour les emplacements (distance, région, etc.)
20. Ajouter des filtres de prix avec des plages personnalisables
21. Créer un système de filtres par notation ou popularité
22. Implémenter un système de filtres par statut de disponibilité (en stock, épuisé, etc.)
23. Ajouter des filtres saisonniers pour les produits (été, hiver, etc.)
24. Créer un système de filtres par fréquence d'achat (régulier, occasionnel, etc.)
25. Implémenter un système de filtres par préférences alimentaires (végétarien, sans gluten, etc.)
26. Ajouter des filtres par marque ou fabricant
27. Créer un système de filtres par promotion ou réduction
28. Implémenter un système de filtres par date d'ajout au système
29. Ajouter des filtres par niveau de priorité ou importance
30. Créer un système de filtres par mode de conservation (réfrigéré, congelé, température ambiante)

## Documentation

Une documentation complète sur l'utilisation de ces composants est disponible dans `.documentation/composants-filtres.md`. 