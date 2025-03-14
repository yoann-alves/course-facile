# Composants de Filtrage - Documentation Technique

*Date de dernière mise à jour: 14/03/2025*

## Vue d'ensemble

Le système de filtrage de Course Facile a été simplifié pour se concentrer sur les fonctionnalités essentielles. Cette documentation décrit les composants et hooks disponibles pour implémenter le filtrage, la recherche et le tri dans l'application.

## Composants

### TabFilters

Composant pour afficher des filtres sous forme d'onglets.

**Fichier**: `src/components/filters/TabFilters.tsx`

**Props**:
- `tabs`: Tableau d'objets représentant les onglets
- `activeTab`: ID de l'onglet actif
- `onTabChange`: Fonction appelée lors du changement d'onglet
- `className`: Classes CSS additionnelles
- `variant`: Style des onglets ('default', 'pills', 'underline', 'minimal')
- `size`: Taille des onglets ('sm', 'md', 'lg')
- `fullWidth`: Si les onglets doivent prendre toute la largeur disponible
- `showCounts`: Si les compteurs doivent être affichés
- `showBadges`: Si les compteurs doivent être affichés sous forme de badges
- `animate`: Si les animations doivent être activées

**Exemple d'utilisation**:
```tsx
<TabFilters
  tabs={[
    { id: 'all', label: 'Tous', count: 10 },
    { id: 'active', label: 'Actifs', count: 5 },
    { id: 'completed', label: 'Terminés', count: 5 }
  ]}
  activeTab="all"
  onTabChange={(tabId) => setActiveTab(tabId)}
  variant="pills"
  size="md"
/>
```

### SearchAndFilterBar

Composant pour afficher une barre de recherche avec des options de tri.

**Fichier**: `src/components/filters/SearchAndFilterBar.tsx`

**Props**:
- `searchTerm`: Terme de recherche
- `onSearchChange`: Fonction appelée lors du changement du terme de recherche
- `sortOrder`: Ordre de tri ('asc' ou 'desc')
- `onSortToggle`: Fonction appelée lors du changement d'ordre de tri
- `sortLabel`: Libellés pour les ordres de tri
- `searchPlaceholder`: Texte d'invite pour la recherche
- `className`: Classes CSS additionnelles
- `debounceMs`: Délai de debounce pour la recherche
- `onResetSearch`: Fonction appelée lors de la réinitialisation de la recherche
- `showResetButton`: Si le bouton de réinitialisation doit être affiché
- `sortField`: Champ de tri actuel
- `onSortFieldChange`: Fonction appelée lors du changement de champ de tri
- `sortFields`: Champs de tri disponibles
- `filterStats`: Statistiques sur les filtres

**Exemple d'utilisation**:
```tsx
<SearchAndFilterBar
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  sortOrder={sortOrder}
  onSortToggle={toggleSortOrder}
  sortField={sortField}
  onSortFieldChange={changeSortField}
  sortFields={[
    { id: 'name', label: 'Nom' },
    { id: 'date', label: 'Date' }
  ]}
  filterStats={filterStats}
/>
```

### SearchInput

Composant pour afficher un champ de recherche avec debounce.

**Fichier**: `src/components/filters/SearchInput.tsx`

**Props**:
- `value`: Valeur du champ
- `onChange`: Fonction appelée lors du changement de valeur
- `placeholder`: Texte d'invite
- `className`: Classes CSS additionnelles
- `debounceMs`: Délai de debounce
- `onReset`: Fonction appelée lors de la réinitialisation
- `showResetButton`: Si le bouton de réinitialisation doit être affiché

### SortButton

Composant pour afficher un bouton de tri.

**Fichier**: `src/components/filters/SortButton.tsx`

**Props**:
- `sortOrder`: Ordre de tri ('asc' ou 'desc')
- `onSortToggle`: Fonction appelée lors du changement d'ordre de tri
- `label`: Libellés pour les ordres de tri
- `className`: Classes CSS additionnelles

### FilterStats

Composant pour afficher des statistiques sur les filtres.

**Fichier**: `src/components/filters/FilterStats.tsx`

**Props**:
- `filteredItemCount`: Nombre d'éléments filtrés
- `totalItemCount`: Nombre total d'éléments
- `filterReductionPercent`: Pourcentage de réduction
- `className`: Classes CSS additionnelles

## Hooks

### useFilters

Hook pour gérer les filtres, la recherche et le tri.

**Fichier**: `src/hooks/useFilters.ts`

**Paramètres**:
- `items`: Éléments à filtrer
- `options`: Options de configuration
  - `initialFilters`: Filtres initiaux
  - `initialSortOrder`: Ordre de tri initial
  - `initialSortField`: Champ de tri initial
  - `filterFn`: Fonction de filtrage personnalisée
  - `searchFields`: Champs sur lesquels effectuer la recherche
  - `persistKey`: Clé pour persister les filtres dans localStorage
  - `debounceMs`: Délai de debounce pour la recherche
  - `defaultComparator`: Comparateur personnalisé pour le tri

**Retourne**:
- `filters`: État des filtres
- `searchTerm`: Terme de recherche
- `debouncedSearchTerm`: Terme de recherche avec debounce
- `sortOrder`: Ordre de tri
- `sortField`: Champ de tri
- `filteredItems`: Éléments filtrés
- `filterStats`: Statistiques sur les filtres
- `setSearchTerm`: Fonction pour mettre à jour le terme de recherche
- `updateFilter`: Fonction pour mettre à jour un filtre
- `resetFilters`: Fonction pour réinitialiser les filtres
- `toggleSortOrder`: Fonction pour basculer l'ordre de tri
- `changeSortField`: Fonction pour changer le champ de tri

**Exemple d'utilisation**:
```tsx
const {
  filters,
  searchTerm,
  sortOrder,
  sortField,
  filteredItems,
  filterStats,
  setSearchTerm,
  updateFilter,
  resetFilters,
  toggleSortOrder,
  changeSortField
} = useFilters(items, {
  initialFilters: { category: 'all' },
  initialSortOrder: 'desc',
  initialSortField: 'date',
  searchFields: ['name', 'description'],
  persistKey: 'shopping-list-filters'
});
```

### useDebounce

Hook pour ajouter un délai de debounce à une valeur.

**Fichier**: `src/hooks/useDebounce.ts`

**Paramètres**:
- `value`: Valeur à debouncer
- `delay`: Délai en millisecondes

**Retourne**:
- Valeur avec debounce

**Exemple d'utilisation**:
```tsx
const debouncedSearchTerm = useDebounce(searchTerm, 300);
```

## Types

Les types suivants sont définis dans `src/types/index.ts` pour le système de filtrage :

```typescript
// Types pour les filtres simples
export type FilterType = 'all' | 'active' | 'completed' | 'recent';
export type SortType = 'date' | 'name' | 'count';
```

## Bonnes pratiques

1. **Utiliser TabFilters pour les filtres principaux** : Ce composant est idéal pour afficher des filtres sous forme d'onglets, par exemple pour filtrer par statut (tous, actifs, terminés).

2. **Utiliser SearchAndFilterBar pour la recherche et le tri** : Ce composant combine un champ de recherche et des options de tri dans une interface unifiée.

3. **Persister les filtres** : Utiliser l'option `persistKey` du hook `useFilters` pour sauvegarder les filtres dans localStorage et les restaurer lors du rechargement de la page.

4. **Debounce pour la recherche** : Toujours utiliser un délai de debounce pour la recherche afin d'éviter trop de rendus pendant la frappe.

5. **Afficher les statistiques de filtrage** : Utiliser le composant `FilterStats` pour donner un retour visuel à l'utilisateur sur l'effet des filtres appliqués.

## Exemples d'intégration

### Exemple complet avec TabFilters et SearchAndFilterBar

```tsx
import { useState } from 'react';
import TabFilters from '@/components/filters/TabFilters';
import SearchAndFilterBar from '@/components/filters/SearchAndFilterBar';
import { useFilters } from '@/hooks/useFilters';
import { FilterType } from '@/types';

export default function ShoppingListsPage({ lists }) {
  const [activeTab, setActiveTab] = useState<FilterType>('all');

const {
    searchTerm,
    sortOrder,
    sortField,
    filteredItems,
    filterStats,
    setSearchTerm,
    toggleSortOrder,
    changeSortField
  } = useFilters(lists, {
    initialFilters: { status: activeTab },
    initialSortOrder: 'desc',
    initialSortField: 'updatedAt',
    searchFields: ['title'],
    persistKey: 'shopping-lists-filters',
    filterFn: (item, filters, searchTerm) => {
      // Filtrer par statut
      if (filters.status === 'active' && item.completed) return false;
      if (filters.status === 'completed' && !item.completed) return false;
      if (filters.status === 'recent' && new Date(item.updatedAt).getTime() < Date.now() - 7 * 24 * 60 * 60 * 1000) return false;
      
      // Filtrer par terme de recherche
      if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      
      return true;
    }
  });
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as FilterType);
    updateFilter('status', tabId);
  };
  
  return (
    <div>
<TabFilters 
        tabs={[
          { id: 'all', label: 'Toutes', count: lists.length },
          { id: 'active', label: 'En cours', count: lists.filter(list => !list.completed).length },
          { id: 'completed', label: 'Terminées', count: lists.filter(list => list.completed).length },
          { id: 'recent', label: 'Récentes', count: lists.filter(list => new Date(list.updatedAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000).length }
        ]}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        variant="pills"
        showBadges
/>

<SearchAndFilterBar
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  sortOrder={sortOrder}
  onSortToggle={toggleSortOrder}
        sortField={sortField}
        onSortFieldChange={changeSortField}
        sortFields={[
          { id: 'updatedAt', label: 'Date de modification' },
          { id: 'title', label: 'Titre' },
          { id: 'items.length', label: 'Nombre d\'articles' }
        ]}
        filterStats={filterStats}
      />
      
      {/* Afficher les éléments filtrés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredItems.map(list => (
          <ShoppingListCard key={list.id} list={list} />
        ))}
  </div>
</div>
  );
} 