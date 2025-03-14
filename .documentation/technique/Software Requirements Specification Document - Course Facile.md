# Software Requirements Specification Document - Course Facile

*Date de dernière mise à jour: 14/03/2025*

## System Design
- Application web pour la gestion collaborative des courses.
- Permet la création et le partage de listes de courses.
- Suivi des dates de péremption et gestion des stocks.
- Notifications personnalisées pour les achats récurrents et les péremptions.
- Interface moderne et intuitive pour une navigation fluide.
- Support du mode sombre pour une meilleure expérience utilisateur.

## Architecture Pattern
- **Frontend** : Application à page unique (SPA) utilisant React et Next.js.
- **Backend** : Architecture serverless avec Prisma comme client principal de base de données et Supabase pour des fonctionnalités complémentaires.
- Séparation claire entre les couches client (UI), service (logique métier) et données (Prisma/Supabase).
- Utilisation de composants serveur pour les opérations de base de données.

## State Management
- État local de l'interface utilisateur géré avec React state/hooks.
- Gestion de l'état global via Context API ou Redux si nécessaire.
- Synchronisation avec l'état du serveur via les composants serveur, API routes et Supabase Realtime.
- Persistance locale des préférences utilisateur dans localStorage.

## Data Flow
- **Input** : L'utilisateur crée ou modifie des listes de courses.
- **Processing** : Les données sont traitées par la couche service et persistées via Prisma.
- **Output** : Les listes et notifications sont affichées à l'utilisateur.
- **Sharing** : Les listes peuvent être partagées avec d'autres utilisateurs.
- **Notifications** : Alertes envoyées pour les produits proches de la péremption.
- **Filtrage** : Traitement des données pour le filtrage et le tri des listes et produits.
- **Realtime** : Synchronisation en temps réel via Supabase Realtime pour les listes partagées.

## Technical Stack
- **Frontend** : React, Next.js, Tailwind CSS, Shadcn UI, Lucide Icons, Sonner Toast, Framer Motion.
- **Backend** : Prisma (client principal de base de données), Supabase (fonctionnalités complémentaires), Next.js API Routes.
- **Authentication** : Clerk Auth avec clerkMiddleware pour la protection des routes.
- **Payment** (prévu) : Stripe pour les paiements.

## Authentication Process
- Authentification gérée via Clerk Auth avec clerkMiddleware.
- Protection des routes /app comme point de départ dans le middleware.
- Intégration sécurisée avec des sessions gérées par jeton.
- Synchronisation des événements webhook de Clerk avec la base de données via Prisma.
- Utilisation de l'ID de la table User pour référencer l'utilisateur (et non le clerkId).

## Route Design
- **/dashboard** : Vue d'ensemble des listes de courses et notifications.
- **/lists** : Affichage et gestion de toutes les listes de courses.
- **/lists/[id]** : Détail d'une liste spécifique avec ses produits.
- **/products/[id]** : Détail d'un produit avec ses instances et dates de péremption.
- **/manage-expirations** : Gestion des dates de péremption et des stocks.
- **/settings** : Options de configuration utilisateur et application.
- Routes protégées par clerkMiddleware pour l'authentification.

## API Design
- **Endpoints de Liste** : Opérations CRUD pour les listes de courses.
- **Endpoints de Produit** : Gestion des produits et des péremptions.
- **Endpoints d'Authentification** : Gestion des sessions utilisateur via Clerk.
- Structure de requête/réponse basée sur JSON avec gestion appropriée des erreurs.
- Opérations principales de base de données effectuées via Prisma.
- Fonctionnalités temps réel et stockage de fichiers via Supabase.

## Database Design ERD
- **Table Utilisateurs** :  
  - ID utilisateur (référence primaire, ne pas utiliser clerkId), nom, email, tokens d'authentification.
- **Table Listes de Courses** :  
  - ID liste, ID utilisateur (clé étrangère), nom de la liste, produits associés, date de création, date de mise à jour.
- **Table Produits** :  
  - ID produit, nom, catégorie, date de péremption, quantité, prix, ID liste (clé étrangère).
- **Table Partages** :  
  - ID partage, ID liste (clé étrangère), ID utilisateur partagé, statut de partage.
- **Table Notifications** :  
  - ID notification, ID utilisateur (clé étrangère), type de notification, date d'envoi, message.
- **Table Réductions** (optionnelle) :  
  - ID réduction, ID produit (clé étrangère), pourcentage de réduction, date de début, date de fin.

## Service Layer Structure
```
src/
└── services/
    ├── user.service.ts
    ├── list.service.ts
    ├── product.service.ts
    ├── notification.service.ts
    ├── sharing.service.ts
    └── storage.service.ts
```

## Composants Réutilisables
- **SearchAndFilterBar** : Barre de recherche avec options de tri.
- **TabFilters** : Filtres par onglets avec compteurs.
- **AdvancedFilters** : Filtres avancés avec options multiples.
- **BaseCard** : Composant de base pour les cartes.
- **ShoppingListCard** : Carte pour afficher une liste de courses.
- **ProductCard** : Carte pour afficher un produit.
- **Modal** : Composant de modale réutilisable.
- **Toast** : Notifications toast pour le feedback utilisateur.

## Hooks Personnalisés
- **useFilters** : Hook pour gérer les filtres, la recherche et le tri.
- **useAdvancedFilters** : Hook pour gérer les filtres avancés.
- **useTheme** : Hook pour gérer le thème de l'application (clair/sombre).
- **useLocalStorage** : Hook pour la persistance des données dans le localStorage.
- **useRealtime** : Hook pour la gestion des abonnements temps réel via Supabase.

## Sécurité et Bonnes Pratiques
- Ne jamais exposer le client Prisma côté client.
- Utiliser des composants serveur ou des routes API pour les opérations de base de données.
- Implémenter une validation appropriée des données avant les opérations Prisma.
- Utiliser le middleware de Prisma pour la journalisation d'audit si nécessaire.
- Implémenter une gestion appropriée des erreurs pour les opérations de base de données.
- Utiliser Supabase uniquement pour les fonctionnalités complémentaires (stockage, temps réel).

## Utilisation de Supabase
- **Stockage de fichiers** : Utilisation du bucket storage de Supabase pour les images de produits et les pièces jointes.
- **Fonctionnalités temps réel** : Utilisation de Supabase Realtime pour la synchronisation en temps réel des listes partagées.
- **Recherche avancée** : Utilisation des capacités de recherche full-text de Supabase pour des recherches complexes.
- **Intégration** : Accès à Supabase via sa propre couche de service, séparée des opérations Prisma.

## État d'Implémentation Actuel
- **Implémenté** :
  - Structure de base de l'application
  - Routes principales (/dashboard, /lists, /lists/[id], /products/[id], /manage-expirations, /settings)
  - Composants réutilisables (SearchAndFilterBar, TabFilters, AdvancedFilters, etc.)
  - Hooks personnalisés (useFilters, useAdvancedFilters, useTheme)
  - Gestion du thème (clair/sombre)
  - Interface responsive
  
- **En cours de développement** :
  - Optimisation des composants et hooks
  - Amélioration de l'expérience utilisateur
  - Documentation technique des composants
  
- **À implémenter** :
  - Intégration avec Prisma comme client principal de base de données
  - Intégration avec Supabase pour les fonctionnalités complémentaires
  - Authentification avec Clerk utilisant clerkMiddleware
  - Structure de services pour les opérations de base de données
  - Validation des données et gestion des erreurs
  - Fonctionnalités de partage et de collaboration