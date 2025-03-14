# Journal des Erreurs - Course Facile

*Date de création: 14/03/2025*  
*Dernière mise à jour: 14/03/2025*

## Table des matières

1. [Introduction](#introduction)
2. [Comment utiliser ce document](#comment-utiliser-ce-document)
3. [Structure des entrées](#structure-des-entrées)
4. [Erreurs React et Next.js](#erreurs-react-et-nextjs)
5. [Erreurs TypeScript](#erreurs-typescript)
6. [Erreurs de hooks personnalisés](#erreurs-de-hooks-personnalisés)
7. [Erreurs d'API et de backend](#erreurs-dapi-et-de-backend)
8. [Erreurs de build et de déploiement](#erreurs-de-build-et-de-déploiement)
9. [Erreurs d'authentification](#erreurs-dauthentification)
10. [Erreurs diverses](#erreurs-diverses)
11. [Erreurs de développement](#erreurs-de-développement)
12. [Erreurs d'intégration](#erreurs-dintégration)
13. [Erreurs de configuration](#erreurs-de-configuration)

## Introduction

Ce document sert de journal pour documenter les erreurs rencontrées lors du développement de l'application Course Facile. L'objectif est de créer une base de connaissances qui permettra :

- D'éviter de répéter les mêmes erreurs
- D'accélérer la résolution des problèmes similaires à l'avenir
- De partager les solutions entre les membres de l'équipe
- De garder une trace des problèmes résolus et des solutions appliquées

## Comment utiliser ce document

1. **Recherche d'erreurs** : Utilisez la recherche (Ctrl+F) pour trouver rapidement une erreur similaire à celle que vous rencontrez.
2. **Ajout d'une nouvelle erreur** : Suivez la structure définie ci-dessous pour ajouter une nouvelle entrée.
3. **Mise à jour** : Si vous trouvez une meilleure solution à un problème déjà documenté, n'hésitez pas à mettre à jour l'entrée existante.
4. **Catégorisation** : Assurez-vous de placer l'erreur dans la section appropriée pour faciliter la navigation.

## Structure des entrées

Chaque entrée d'erreur doit suivre cette structure :

```
### [Code ou message d'erreur court]

**Date de découverte** : JJ/MM/AAAA

**Contexte** : Brève description du contexte dans lequel l'erreur s'est produite.

**Message d'erreur complet** :
```
Message d'erreur exact
```

**Cause** : Explication de ce qui a causé l'erreur.

**Solution** : Description détaillée de la solution appliquée.

**Code avant** :
```tsx
// Code problématique
```

**Code après** :
```tsx
// Code corrigé
```

**Références** : Liens vers des ressources utiles (documentation, Stack Overflow, etc.)

**Notes additionnelles** : Toute information supplémentaire pertinente.
```

## Erreurs React et Next.js

### Cannot read properties of undefined (reading 'filter')

**Date de découverte** : 14/03/2025

**Contexte** : Page d'inventaire (`/inventory`) utilisant des filtres avancés avec un hook personnalisé `useAdvancedFilters`.

**Message d'erreur complet** :
```
Unhandled Runtime Error

Error: Cannot read properties of undefined (reading 'filter')

src/app/inventory/page.tsx (129:29) @ InventoryPage.useMemo[filteredInstances]


  127 |     
  128 |     // Puis appliquer le filtre de recherche
> 129 |     return advancedFiltered.filter(instance => {
      |                             ^
  130 |       const product = getProductDetails(instance);
  131 |       if (!product) return false;
  132 |       
```

**Cause** : La fonction `applyFilters` du hook `useAdvancedFilters` retournait `undefined` au lieu d'un tableau filtré, ce qui provoquait l'erreur lors de l'appel de la méthode `filter()` sur `undefined`.

**Solution** : Deux approches possibles :

1. **Solution adoptée** : Filtrer manuellement les instances de produits sans utiliser la fonction `applyFilters` problématique.
2. **Alternative** : Ajouter une vérification pour s'assurer que `advancedFiltered` n'est pas `undefined` avant d'appeler `filter()` et fournir un tableau vide comme fallback.

**Code avant** :
```tsx
// Filtrer les instances de produits
const filteredInstances = useMemo(() => {
  // Appliquer d'abord les filtres avancés
  const advancedFiltered = applyFilters(productInstances, filterProductsByAdvancedFilters);
  
  // Puis appliquer le filtre de recherche
  return advancedFiltered.filter(instance => {
    const product = getProductDetails(instance);
    if (!product) return false;
    
    // Filtre de recherche
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
}, [applyFilters, filterProductsByAdvancedFilters, searchTerm]);
```

**Code après** :
```tsx
// Filtrer les instances de produits
const filteredInstances = useMemo(() => {
  // Filtrer manuellement les instances en fonction des filtres avancés et de la recherche
  return productInstances.filter(instance => {
    // Vérifier si l'instance passe les filtres avancés
    if (!filterProductsByAdvancedFilters(instance, filterGroups)) {
      return false;
    }
    
    // Vérifier le filtre de recherche
    const product = getProductDetails(instance);
    if (!product) return false;
    
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
}, [filterGroups, filterProductsByAdvancedFilters, searchTerm]);
```

**Références** : 
- [Documentation React sur useMemo](https://react.dev/reference/react/useMemo)
- [Documentation TypeScript sur la gestion des valeurs potentiellement undefined](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

**Notes additionnelles** : 
- Cette erreur a également révélé des avertissements de linter concernant l'utilisation de `any` et une variable assignée mais non utilisée.
- Nous avons également corrigé ces problèmes en :
  1. Remplaçant `any` par le type `ProductInstance`
  2. Supprimant la variable `applyFilters` non utilisée de la déstructuration
  3. Ajoutant une gestion de cas où `location` pourrait être `undefined` avec `instance.location || ''`

## Erreurs TypeScript

### Type 'X' does not satisfy the constraint 'Record<string, unknown>'

**Date de découverte** : 14/03/2025

**Contexte** : Utilisation d'un hook personnalisé `useAdvancedFilters` avec un type générique.

**Message d'erreur complet** :
```
Type 'ProductInstance' does not satisfy the constraint 'Record<string, unknown>'.
Index signature for type 'string' is missing in type 'ProductInstance'.
```

**Cause** : Le hook `useAdvancedFilters` utilise un type générique `T extends Record<string, unknown>`, mais le type `ProductInstance` ne satisfait pas cette contrainte car il n'a pas de signature d'index pour le type `string`.

**Solution** : Plutôt que d'essayer de faire correspondre le type `ProductInstance` à la contrainte, nous avons opté pour une approche différente en filtrant manuellement les instances sans utiliser la fonction générique du hook.

**Code avant** :
```tsx
const advancedFiltered = applyFiltersToItems<ProductInstance>(productInstances, filterProductsByAdvancedFilters);
```

**Code après** :
```tsx
// Filtrage manuel sans utiliser la fonction générique
return productInstances.filter(instance => {
  if (!filterProductsByAdvancedFilters(instance, filterGroups)) {
    return false;
  }
  // Autres conditions de filtrage...
});
```

**Références** : 
- [Documentation TypeScript sur les contraintes génériques](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
- [Documentation TypeScript sur les signatures d'index](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)

**Notes additionnelles** : 
- Une alternative aurait été de modifier l'interface `ProductInstance` pour qu'elle satisfasse la contrainte `Record<string, unknown>`, mais cela aurait nécessité des modifications plus importantes dans le code.

## Erreurs de hooks personnalisés

*À compléter au fur et à mesure que des erreurs sont rencontrées*

## Erreurs d'API et de backend

*À compléter au fur et à mesure que des erreurs sont rencontrées*

## Erreurs de build et de déploiement

*À compléter au fur et à mesure que des erreurs sont rencontrées*

## Erreurs d'authentification

*À compléter au fur et à mesure que des erreurs sont rencontrées*

## Erreurs diverses

*À compléter au fur et à mesure que des erreurs sont rencontrées*

## Erreurs de développement

### Erreurs TypeScript dans les tests unitaires avec Jest et React Testing Library
**Date**: 14/03/2025
**Contexte**: Mise en place des tests unitaires pour les composants réutilisables avec Jest et React Testing Library.
**Cause**: Les types TypeScript pour les assertions Jest comme `toBeInTheDocument()` et `toHaveClass()` ne sont pas correctement reconnus malgré l'installation de `@types/jest`.
**Solution**: Deux approches possibles :
1. Créer un fichier de déclaration de types personnalisé `src/types/jest-dom.d.ts` avec le contenu suivant :
   ```typescript
   import '@testing-library/jest-dom';
   ```
   Et s'assurer que ce fichier est inclus dans le `tsconfig.json`.

2. Ajouter l'import de `@testing-library/jest-dom` directement dans chaque fichier de test :
   ```typescript
   import '@testing-library/jest-dom';
   ```

La deuxième approche a été choisie pour sa simplicité, mais la première serait préférable pour un projet plus grand afin d'éviter les imports répétitifs.

## Erreurs d'intégration

## Erreurs de configuration

## Erreurs liées aux tests unitaires

### Erreur d'importation de composants dans les tests
**Date**: 14/03/2025
**Contexte**: Lors de la création de tests unitaires pour les composants Grid et Icon
**Cause**: Confusion entre les exportations par défaut et les exportations nommées
**Solution**: Vérifier le type d'exportation dans le fichier source et adapter l'importation en conséquence :
- Pour les exportations par défaut : `import Component from '@/components/path/Component'`
- Pour les exportations nommées : `import { Component } from '@/components/path/Component'`

### Classes CSS incorrectes dans les tests de composants shadcn/ui
**Date**: 15/03/2025
**Contexte**: Tests unitaires pour les composants Button et Typography
**Cause**: Les classes CSS réelles des composants shadcn/ui ne correspondent pas exactement à celles attendues dans les tests
**Solution**: 
1. Inspecter le DOM rendu pour voir les classes réelles appliquées
2. Adapter les assertions pour vérifier les classes qui sont effectivement présentes
3. Se concentrer sur les classes fonctionnelles importantes plutôt que sur toutes les classes

### Erreur avec la prop asChild dans les tests
**Date**: 15/03/2025
**Contexte**: Test du composant Button avec la prop asChild
**Cause**: La prop asChild n'est pas reconnue comme une prop valide dans l'environnement de test
**Solution**: 
1. Vérifier si le composant utilise Radix UI qui gère cette prop
2. Adapter le test pour vérifier le comportement plutôt que l'implémentation spécifique
3. Considérer l'utilisation de mocks pour les composants Radix UI

### Texte fragmenté dans les tests
**Date**: 14/03/2025
**Contexte**: Test du composant CompletionIndicator où le texte est divisé en plusieurs éléments DOM
**Cause**: Le composant rend le texte dans plusieurs éléments DOM distincts
**Solution**: 
1. Utiliser des expressions régulières avec `getByText(/texte/i)` pour une correspondance plus souple
2. Utiliser `getAllByText()` et vérifier la longueur du tableau retourné
## Erreurs de configuration 