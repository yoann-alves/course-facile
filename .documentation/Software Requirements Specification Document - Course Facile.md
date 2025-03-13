# Software Requirements Specification Document - Course Facile

## System Design
- Application web pour la gestion collaborative des courses.
- Permet la création et le partage de listes de courses.
- Suivi des dates de péremption et gestion des stocks.
- Notifications personnalisées pour les achats récurrents et les péremptions.
- Interface moderne et intuitive pour une navigation fluide.

## Architecture Pattern
- **Frontend** : Application à page unique (SPA) utilisant React et Next.js.
- **Backend** : Architecture serverless/microservices hébergée sur Vercel.
- Séparation claire entre les couches client (UI) et serveur (API).

## State Management
- État local de l'interface utilisateur géré avec React state/hooks.
- Gestion de l'état global via Context API ou Redux si nécessaire.
- Synchronisation avec l'état du serveur depuis Supabase.

## Data Flow
- **Input** : L'utilisateur crée ou modifie des listes de courses.
- **Processing** : Les données sont traitées pour le suivi des péremptions et des stocks.
- **Output** : Les listes et notifications sont affichées à l'utilisateur.
- **Sharing** : Les listes peuvent être partagées avec d'autres utilisateurs.
- **Notifications** : Alertes envoyées pour les produits proches de la péremption.

## Technical Stack
- **Frontend** : React, Next.js, Tailwind CSS, Shadcn UI, Lucide Icons, Sonner Toast.
- **Backend** : Prisma, Supabase, Vercel.
- **Authentication & Payment** : Clerk Auth pour l'authentification, Stripe pour les paiements.

## Authentication Process
- Authentification gérée via Clerk Auth.
- Intégration sécurisée avec des sessions gérées par jeton.
- Gestion des rôles pour le partage et la gestion des listes.

## Route Design
- **/dashboard** : Vue d'ensemble des listes de courses et notifications.
- **/create-list** : Interface pour créer une nouvelle liste de courses.
- **/manage-expirations** : Gestion des dates de péremption et des stocks.
- **/settings** : Options de configuration utilisateur et application.
- Routes supplémentaires pour l'authentification et le partage de listes.

## API Design
- **Endpoints de Liste** : Opérations CRUD pour les listes de courses.
- **Endpoints de Produit** : Gestion des produits et des péremptions.
- **Endpoints d'Authentification** : Gestion des sessions utilisateur.
- Structure de requête/réponse basée sur JSON avec gestion appropriée des erreurs.

## Database Design ERD
- **Table Utilisateurs** :  
  - ID utilisateur, nom, email, tokens d'authentification.
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
``