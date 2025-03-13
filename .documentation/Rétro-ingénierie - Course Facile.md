# Document de Rétro-ingénierie - Course Facile

*Date de dernière mise à jour: 15/03/2024*

## Structure du Projet

Le projet Course Facile est une application web développée avec Next.js qui permet aux utilisateurs de gérer leurs listes de courses et de suivre les dates de péremption des produits.

### Organisation des Dossiers

- `/src/app` : Contient les routes de l'application (pages)
- `/src/components` : Contient les composants réutilisables
- `/src/data` : Contient les données factices pour le prototypage
- `/src/lib` : Contient les utilitaires et fonctions d'aide

### Routes Principales

- `/dashboard` : Tableau de bord principal
- `/lists` : Affichage de toutes les listes de courses
- `/lists/[id]` : Détails d'une liste de courses spécifique
- `/create-list` : Création d'une nouvelle liste
- `/manage-expirations` : Gestion des dates de péremption
- `/products/[id]` : Détails d'un produit spécifique avec ses instances
- `/settings` : Paramètres de l'application

## Composants Clés

### Composants de Layout

1. **MainLayout.tsx**
   - Composant principal de mise en page
   - Gère l'affichage de la barre latérale (sidebar)
   - Responsive avec un comportement différent sur mobile et desktop
   - Navigation vers les routes principales de l'application

2. **Sidebar.tsx**
   - Composant de barre latérale alternative
   - Peut être réduit/étendu
   - Contient des liens vers toutes les routes principales

### Composants UI

- Utilisation de composants UI basés sur shadcn/ui
- Système de toast pour les notifications
- Cartes pour afficher les listes et les produits
- Barres de progression pour le suivi des listes

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

### Gestion des Produits

- Affichage détaillé d'un produit avec ses informations (catégorie, description, prix, infos nutritionnelles)
- Gestion des instances d'un produit avec leurs dates de péremption
- Ajout de nouvelles instances d'un produit
- Alertes visuelles pour les produits périmés ou bientôt périmés

### Gestion des Dates de Péremption

- Vue d'ensemble des produits avec leurs dates de péremption
- Filtrage des produits par état (périmés, bientôt périmés, autres)
- Liens directs vers les détails des produits
- Utilisation du format de date français (fr-FR) pour l'affichage des dates
- Fonction utilitaire `formatDate()` pour assurer un formatage cohérent des dates
- Nécessité de spécifier explicitement la locale pour éviter les erreurs d'hydratation entre le serveur et le client

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

### ExpirationItem
- id: string
- name: string
- quantity: number
- unit: string
- category: string
- expirationDate: string
- purchaseDate: string

## État du Projet

Le projet est actuellement en mode prototypage, avec une concentration sur le développement frontend. Les données sont simulées à l'aide de JSON statiques, sans connexion à un backend.

## Modifications Récentes

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

## Notes Techniques

- L'application utilise Tailwind CSS pour le styling
- Le projet est en mode développement frontend uniquement (prototypage)
- Les données sont simulées avec des fichiers JSON statiques
- Attention particulière à porter sur la cohérence du formatage des dates entre le serveur et le client pour éviter les erreurs d'hydratation
- Pour les pages dynamiques dans les composants clients, nous utilisons le hook `useParams()` de Next.js pour accéder aux paramètres de route, évitant ainsi les avertissements liés à l'accès direct à `params.id` et les erreurs liées à l'utilisation de `React.use()` dans un contexte client.
- Les IDs des nouvelles entités sont générés de manière aléatoire pour éviter les collisions 