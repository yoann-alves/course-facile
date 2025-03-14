# Bonnes Pratiques - Course Facile

*Date de création: 14/03/2025*

Ce document présente les bonnes pratiques à suivre pour le développement et la maintenance du projet Course Facile. Il couvre l'organisation du code, les principes de développement, les optimisations, la sécurité et les technologies spécifiques utilisées dans le projet.

## Table des matières

1. [Structure du projet](#1-structure-du-projet)
2. [Principes de développement](#2-principes-de-développement)
3. [Composants React](#3-composants-react)
4. [Gestion d'état](#4-gestion-détat)
5. [Optimisation des performances](#5-optimisation-des-performances)
6. [Sécurité](#6-sécurité)
7. [Base de données et Prisma](#7-base-de-données-et-prisma)
8. [Authentification avec Clerk](#8-authentification-avec-clerk)
9. [Paiements avec Stripe](#9-paiements-avec-stripe)
10. [Tests](#10-tests)
11. [Déploiement](#11-déploiement)
12. [Documentation](#12-documentation)

## 1. Structure du projet

### Organisation des dossiers

Suivre cette structure de dossiers pour maintenir une organisation claire et cohérente :

```
src/
├── app/                  # Routes de l'application (pages)
│   ├── layout.tsx
│   ├── page.tsx
│   └── [route]/
│       ├── page.tsx
│       ├── layout.tsx
│       └── _components/  # Composants spécifiques à la route
├── components/           # Composants réutilisables
│   ├── ui/               # Composants UI de base (shadcn)
│   ├── filters/          # Composants de filtrage
│   ├── forms/            # Composants de formulaires
│   └── layout/           # Composants de mise en page
├── hooks/                # Hooks personnalisés
├── lib/                  # Utilitaires et fonctions d'aide
│   ├── utils.ts          # Fonctions utilitaires générales
│   ├── prisma.ts         # Client Prisma
│   ├── stripe.ts         # Configuration Stripe
│   └── constants.ts      # Constantes de l'application
├── contexts/             # Contextes React
├── types/                # Types TypeScript
├── services/             # Services (API, base de données)
│   ├── user.service.ts
│   ├── list.service.ts
│   └── product.service.ts
├── data/                 # Données statiques (pour le prototypage)
└── styles/               # Styles globaux
```

### Conventions de nommage

- **Fichiers** : Utiliser PascalCase pour les composants React (ex: `ShoppingList.tsx`) et camelCase pour les autres fichiers (ex: `utils.ts`).
- **Dossiers** : Utiliser kebab-case pour les dossiers (ex: `shopping-lists/`).
- **Composants** : Nommer les composants de manière descriptive et éviter les abréviations.
- **Hooks** : Préfixer les hooks personnalisés par `use` (ex: `useFilters.ts`).
- **Types** : Suffixer les interfaces par leur catégorie (ex: `ProductProps`, `UserService`).

## 2. Principes de développement

### DRY (Don't Repeat Yourself)

- Extraire les logiques répétitives dans des fonctions utilitaires ou des hooks.
- Créer des composants réutilisables pour les éléments d'interface communs.
- Centraliser les constantes et les configurations dans des fichiers dédiés.

#### Exemple de bonne pratique :

```typescript
// lib/constants.ts
export const PRODUCT_CATEGORIES = [
  { id: 'dairy', label: 'Produits laitiers' },
  { id: 'fruits', label: 'Fruits et légumes' },
  // ...
];

// Utilisation dans plusieurs composants
import { PRODUCT_CATEGORIES } from '@/lib/constants';
```

### SOLID

- **Single Responsibility** : Chaque composant ou fonction ne doit avoir qu'une seule responsabilité.
- **Open/Closed** : Les entités doivent être ouvertes à l'extension mais fermées à la modification.
- **Liskov Substitution** : Les sous-types doivent être substituables à leurs types de base.
- **Interface Segregation** : Préférer plusieurs interfaces spécifiques à une interface générale.
- **Dependency Inversion** : Dépendre des abstractions, pas des implémentations concrètes.

### Gestion des erreurs

- Implémenter une gestion d'erreurs cohérente dans toute l'application.
- Utiliser des composants d'erreur réutilisables pour afficher les messages d'erreur.
- Journaliser les erreurs côté serveur pour le débogage.

```typescript
// Exemple de gestion d'erreur
try {
  const result = await fetchData();
  return result;
} catch (error) {
  console.error('Erreur lors de la récupération des données:', error);
  throw new Error('Impossible de récupérer les données. Veuillez réessayer plus tard.');
}
```

## 3. Composants React

### Composants clients vs serveur

- Utiliser la directive `'use client'` uniquement pour les composants nécessitant des fonctionnalités côté client.
- Privilégier les composants serveur pour améliorer les performances et le SEO.
- Séparer clairement la logique client de la logique serveur.

```typescript
// Composant client
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Compteur: {count}
    </button>
  );
}

// Composant serveur (pas besoin de 'use client')
export function StaticContent({ data }) {
  return <div>{data.content}</div>;
}
```

### Utilisation de shadcn/ui

- Utiliser les composants shadcn/ui pour maintenir une cohérence visuelle.
- Personnaliser les composants via le système de variantes plutôt que de créer des composants entièrement nouveaux.
- Suivre la documentation officielle pour l'installation et l'utilisation des composants.

```typescript
// Exemple d'utilisation de shadcn/ui avec variantes
import { Button } from "@/components/ui/button";

export function ActionButton({ primary, ...props }) {
  return (
    <Button 
      variant={primary ? "default" : "outline"} 
      {...props} 
    />
  );
}
```

### Props et PropTypes

- Définir clairement les types de props avec TypeScript.
- Utiliser des valeurs par défaut pour les props optionnelles.
- Documenter les props complexes avec des commentaires.

```typescript
interface CardProps {
  /** Titre de la carte */
  title: string;
  /** Description optionnelle */
  description?: string;
  /** Fonction appelée lors du clic */
  onClick?: () => void;
  /** Variante de style */
  variant?: 'default' | 'outline' | 'ghost';
}

export function Card({
  title,
  description = '',
  onClick,
  variant = 'default'
}: CardProps) {
  // ...
}
```

## 4. Gestion d'état

### Hooks React

- Utiliser les hooks React (`useState`, `useEffect`, `useContext`, etc.) de manière appropriée.
- Créer des hooks personnalisés pour encapsuler la logique réutilisable.
- Éviter les effets de bord inutiles dans les hooks.

### Contextes React

- Utiliser les contextes pour partager l'état global entre les composants.
- Séparer les contextes par domaine fonctionnel (ex: `ThemeContext`, `AuthContext`).
- Optimiser les contextes pour éviter les re-rendus inutiles.

```typescript
// contexts/ThemeContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### Persistance locale

- Utiliser le localStorage pour persister les préférences utilisateur.
- Créer des utilitaires pour gérer la persistance de manière cohérente.
- Gérer les cas où le localStorage n'est pas disponible.

```typescript
// lib/storage.ts
export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Erreur lors de la récupération de ${key}:`, error);
    return defaultValue;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Erreur lors de l'enregistrement de ${key}:`, error);
  }
}
```

## 5. Optimisation des performances

### Mémorisation

- Utiliser `useMemo` et `useCallback` pour éviter les calculs et les créations de fonctions inutiles.
- Appliquer la mémorisation de manière sélective, uniquement lorsque c'est nécessaire.
- Utiliser des clés de dépendance appropriées pour les hooks de mémorisation.

```typescript
// Exemple d'utilisation de useMemo
const filteredItems = useMemo(() => {
  return items.filter(item => item.name.includes(searchTerm));
}, [items, searchTerm]);
```

### Chargement différé

- Utiliser `React.lazy` et `Suspense` pour charger les composants à la demande.
- Implémenter le chargement progressif des images et des ressources lourdes.
- Utiliser des placeholders et des états de chargement pour améliorer l'expérience utilisateur.

```typescript
// Exemple de chargement différé
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Optimisation des requêtes

- Implémenter le debounce pour les recherches et les filtres.
- Utiliser la pagination pour les listes longues.
- Mettre en cache les résultats des requêtes fréquentes.

```typescript
// Exemple de debounce pour la recherche
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}
```

## 6. Sécurité

### Validation des données

- Valider toutes les entrées utilisateur, côté client et côté serveur.
- Utiliser des bibliothèques comme Zod ou Yup pour la validation des schémas.
- Implémenter des messages d'erreur clairs pour les validations échouées.

```typescript
// Exemple de validation avec Zod
import { z } from 'zod';

const ProductSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  price: z.number().min(0, "Le prix doit être positif"),
  category: z.string().min(1, "La catégorie est requise"),
});

type Product = z.infer<typeof ProductSchema>;

function validateProduct(data: unknown): Product {
  return ProductSchema.parse(data);
}
```

### Protection contre les attaques courantes

- Implémenter des protections contre les attaques XSS, CSRF, et injection SQL.
- Utiliser des en-têtes de sécurité appropriés.
- Suivre les meilleures pratiques de sécurité de Next.js.

### Gestion des secrets

- Ne jamais exposer les secrets dans le code client.
- Utiliser les variables d'environnement pour les secrets.
- Séparer les configurations de développement et de production.

```typescript
// Exemple d'utilisation des variables d'environnement
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
STRIPE_SECRET_KEY=sk_test_...

// lib/config.ts
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  // Accessible uniquement côté serveur
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
};
```

## 7. Base de données et Prisma

### Configuration de Prisma

- Utiliser Prisma comme ORM principal pour toutes les opérations de base de données.
- Définir clairement le schéma Prisma avec des relations appropriées.
- Utiliser les migrations Prisma pour gérer les changements de schéma.

```typescript
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  clerkId   String   @unique
  email     String   @unique
  name      String?
  lists     List[]
  products  Product[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model List {
  id        String   @id @default(cuid())
  title     String
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  items     Item[]
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Opérations de base de données

- Créer des services dédiés pour les opérations de base de données.
- Utiliser les transactions Prisma pour les opérations atomiques.
- Implémenter une gestion d'erreurs appropriée pour les opérations de base de données.

```typescript
// services/list.service.ts
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function createList(data: Prisma.ListCreateInput) {
  try {
    return await prisma.list.create({
      data,
      include: {
        items: true,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la création de la liste:', error);
    throw new Error('Impossible de créer la liste. Veuillez réessayer plus tard.');
  }
}

export async function getListsByUserId(userId: string) {
  try {
    return await prisma.list.findMany({
      where: { userId },
      include: {
        items: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des listes:', error);
    throw new Error('Impossible de récupérer les listes. Veuillez réessayer plus tard.');
  }
}
```

### Optimisation des requêtes Prisma

- Utiliser `select` et `include` pour récupérer uniquement les données nécessaires.
- Implémenter la pagination pour les requêtes retournant de nombreux résultats.
- Utiliser des index pour optimiser les requêtes fréquentes.

```typescript
// Exemple de pagination avec Prisma
export async function getProductsWithPagination(
  page: number = 1,
  pageSize: number = 10,
  filters: any = {}
) {
  const skip = (page - 1) * pageSize;
  
  try {
    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where: filters,
        skip,
        take: pageSize,
        orderBy: {
          updatedAt: 'desc',
        },
      }),
      prisma.product.count({
        where: filters,
      }),
    ]);
    
    return {
      products,
      pagination: {
        total,
        pageSize,
        currentPage: page,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw new Error('Impossible de récupérer les produits. Veuillez réessayer plus tard.');
  }
}
```

## 8. Authentification avec Clerk

### Configuration de Clerk

- Configurer Clerk selon les meilleures pratiques de la documentation officielle.
- Synchroniser les utilisateurs Clerk avec la base de données Prisma.
- Utiliser les webhooks Clerk pour maintenir la synchronisation.

```typescript
// lib/auth.ts
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

export async function getCurrentUser() {
  const { userId } = auth();
  
  if (!userId) {
    return null;
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    
    return user;
  } catch (error) {
    console.error('Erreur lors de la récupération de l'utilisateur:', error);
    return null;
  }
}
```

### Protection des routes

- Utiliser les middlewares Clerk pour protéger les routes.
- Implémenter des vérifications d'autorisation pour les opérations sensibles.
- Gérer les redirections pour les utilisateurs non authentifiés.

```typescript
// middleware.ts
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/api/webhooks/clerk',
    '/api/webhooks/stripe',
  ],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

## 9. Paiements avec Stripe

### Configuration de Stripe

- Configurer Stripe selon les meilleures pratiques de la documentation officielle.
- Utiliser l'API Stripe côté serveur pour les opérations de paiement.
- Implémenter des webhooks Stripe pour gérer les événements de paiement.

```typescript
// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Course Facile',
    version: '0.1.0',
  },
});
```

### Gestion des paiements

- Créer des services dédiés pour les opérations de paiement.
- Implémenter une gestion d'erreurs appropriée pour les opérations de paiement.
- Synchroniser les paiements avec la base de données.

```typescript
// services/payment.service.ts
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function createCheckoutSession(userId: string, priceId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing?canceled=true`,
      metadata: {
        userId,
      },
    });
    
    return { url: session.url };
  } catch (error) {
    console.error('Erreur lors de la création de la session de paiement:', error);
    throw new Error('Impossible de créer la session de paiement. Veuillez réessayer plus tard.');
  }
}
```

## 10. Tests

### Tests unitaires

- Écrire des tests unitaires pour les fonctions et les hooks.
- Utiliser Jest et React Testing Library pour les tests.
- Viser une couverture de code élevée pour les fonctionnalités critiques.

```typescript
// hooks/useFilters.test.ts
import { renderHook, act } from '@testing-library/react';
import { useFilters } from './useFilters';

describe('useFilters', () => {
  const mockItems = [
    { id: '1', name: 'Item 1', category: 'A' },
    { id: '2', name: 'Item 2', category: 'B' },
  ];
  
  it('should filter items based on search term', () => {
    const { result } = renderHook(() => useFilters(mockItems, {
      initialFilters: {},
      searchFields: ['name'],
    }));
    
    act(() => {
      result.current.setSearchTerm('Item 1');
    });
    
    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].id).toBe('1');
  });
  
  // Plus de tests...
});
```

### Tests d'intégration

- Écrire des tests d'intégration pour les composants complexes.
- Tester les interactions entre les composants.
- Simuler les appels API et les événements utilisateur.

### Tests end-to-end

- Utiliser Cypress ou Playwright pour les tests end-to-end.
- Tester les flux utilisateur complets.
- Automatiser les tests dans le pipeline CI/CD.

## 11. Déploiement

### Environnements

- Configurer des environnements distincts pour le développement, le staging et la production.
- Utiliser des variables d'environnement spécifiques à chaque environnement.
- Implémenter des vérifications de santé pour chaque environnement.

### CI/CD

- Configurer un pipeline CI/CD pour automatiser les tests et le déploiement.
- Utiliser GitHub Actions ou un service similaire.
- Implémenter des vérifications de qualité du code (linting, tests, etc.).

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
      - run: npm test
```

### Monitoring

- Implémenter un système de monitoring pour surveiller les performances et les erreurs.
- Utiliser des services comme Sentry pour le suivi des erreurs.
- Configurer des alertes pour les problèmes critiques.

## 12. Documentation

### Documentation du code

- Documenter les fonctions, les hooks et les composants avec des commentaires JSDoc.
- Expliquer les décisions de conception importantes.
- Maintenir la documentation à jour lors des modifications.

```typescript
/**
 * Hook personnalisé pour gérer les filtres, la recherche et le tri.
 * @param items - Les éléments à filtrer et trier
 * @param options - Options de configuration du hook
 * @returns Un objet contenant les éléments filtrés et triés, ainsi que des fonctions pour manipuler les filtres
 */
export function useFilters<T, F extends Record<string, unknown>>(
  items: T[],
  options: UseFiltersOptions<T, F>
) {
  // Implémentation...
}
```

### Documentation utilisateur

- Maintenir un guide utilisateur à jour dans le répertoire `.documentation/`.
- Inclure des captures d'écran et des exemples d'utilisation.
- Documenter les nouvelles fonctionnalités au fur et à mesure de leur développement.

### Documentation technique

- Maintenir une documentation technique détaillée dans le répertoire `.documentation/`.
- Documenter l'architecture, les flux de données et les décisions techniques.
- Mettre à jour la documentation lors des changements importants.

---

Ce document est un guide vivant qui évoluera avec le projet. Il est important de le maintenir à jour et de s'y référer régulièrement pour assurer la cohérence et la qualité du code. 