# Composants de Filtrage - Documentation Technique

*Date de dernière mise à jour: 14/03/2025*

## Table des matières

1. [Introduction](#introduction)
2. [Composants disponibles](#composants-disponibles)
3. [SearchAndFilterBar](#searchandfilterbar)
4. [TabFilters](#tabfilters)
5. [AdvancedFilters](#advancedfilters)
6. [Hooks personnalisés](#hooks-personnalisés)
   - [useFilters](#usefilters)
   - [useAdvancedFilters](#useadvancedfilters)
7. [Optimisations](#optimisations)
8. [Exemples d'utilisation](#exemples-dutilisation)
9. [Prochaines étapes](#prochaines-étapes)

## Introduction

Cette documentation technique présente les composants de filtrage et de recherche réutilisables dans l'application Course Facile. Ces composants ont été conçus pour être flexibles, performants et faciles à utiliser dans différentes parties de l'application.

## Composants disponibles

L'application dispose de trois composants principaux pour gérer les filtres et la recherche :

- **SearchAndFilterBar** : Barre de recherche avec option de tri
- **TabFilters** : Filtres par onglets avec compteurs
- **AdvancedFilters** : Filtres avancés avec options multiples

Et deux hooks personnalisés :

- **useFilters** : Hook général pour gérer les filtres, la recherche et le tri
- **useAdvancedFilters** : Hook spécifique pour gérer les filtres avancés

## SearchAndFilterBar

Ce composant fournit une barre de recherche et un bouton de tri.

### Props

| Prop | Type | Description | Défaut |
|------|------|-------------|--------|
| searchTerm | string | Terme de recherche actuel | - |
| onSearchChange | (value: string) => void | Fonction appelée lors du changement de recherche | - |
| sortOrder | 'asc' \| 'desc' | Ordre de tri actuel | - |
| onSortToggle | () => void | Fonction appelée lors du changement d'ordre de tri | - |
| sortLabel | { asc: string, desc: string } | Libellés pour les options de tri | { asc: 'Plus anciennes', desc: 'Plus récentes' } |
| searchPlaceholder | string | Texte d'aide pour la recherche | 'Rechercher...' |
| className | string | Classes CSS supplémentaires | '' |
| debounceMs | number | Délai de debounce en millisecondes | 300 |
| onResetSearch | () => void | Fonction appelée lors de la réinitialisation de la recherche | - |
| showResetButton | boolean | Afficher le bouton de réinitialisation | false |
| sortField | string | Champ de tri actuel | - |
| onSortFieldChange | (field: string) => void | Fonction appelée lors du changement de champ de tri | - |
| sortFields | Array<{ id: string; label: string; }> | Liste des champs de tri disponibles | - |
| filterStats | { filteredItemCount: number; totalItemCount: number; filterReductionPercent: number; } | Statistiques de filtrage | - |

### Exemple d'utilisation

```tsx
<SearchAndFilterBar
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  sortOrder={sortOrder}
  onSortToggle={toggleSortOrder}
  sortLabel={{
    asc: 'Date croissante',
    desc: 'Date décroissante'
  }}
  searchPlaceholder="Rechercher un élément..."
  debounceMs={300}
  showResetButton={true}
  onResetSearch={resetSearch}
  filterStats={filterStats}
/>
```

## TabFilters

Ce composant affiche des onglets pour filtrer les données avec des compteurs optionnels.

### Types

```tsx
export interface FilterTab {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
  tooltip?: string;
  disabled?: boolean;
}
```

### Props

| Prop | Type | Description | Défaut |
|------|------|-------------|--------|
| tabs | FilterTab[] | Liste des onglets à afficher | - |
| activeTab | string | ID de l'onglet actif | - |
| onTabChange | (tabId: string) => void | Fonction appelée lors du changement d'onglet | - |
| className | string | Classes CSS supplémentaires | '' |
| variant | 'default' \| 'pills' \| 'underline' \| 'minimal' | Variante de style | 'default' |
| size | 'sm' \| 'md' \| 'lg' | Taille des onglets | 'md' |
| fullWidth | boolean | Occuper toute la largeur disponible | false |
| showCounts | boolean | Afficher les compteurs | true |
| showBadges | boolean | Afficher les compteurs sous forme de badges | false |
| animate | boolean | Activer les animations | true |

### Exemple d'utilisation

```tsx
const tabs = [
  { id: 'all', label: 'Tous', count: 10, icon: <IconAll /> },
  { id: 'active', label: 'Actifs', count: 5, icon: <IconActive /> },
  { id: 'completed', label: 'Terminés', count: 5, icon: <IconCompleted /> }
];

<TabFilters
  tabs={tabs}
  activeTab={activeFilter}
  onTabChange={(tabId) => setActiveFilter(tabId)}
  variant="pills"
  size="md"
  animate={true}
/>
```

## AdvancedFilters

Ce composant affiche un popover avec des options de filtres avancés.

### Types

```tsx
export interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
  count?: number;
  disabled?: boolean;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}
```

### Props

| Prop | Type | Description | Défaut |
|------|------|-------------|--------|
| filterGroups | FilterGroup[] | Groupes de filtres à afficher | - |
| onFilterChange | (groupId: string, optionId: string, checked: boolean) => void | Fonction appelée lors du changement d'un filtre | - |
| onResetFilters | () => void | Fonction appelée lors de la réinitialisation des filtres | - |
| className | string | Classes CSS supplémentaires | '' |
| activeFiltersCount | number | Nombre de filtres actifs | 0 |
| onApplyFilters | () => void | Fonction appelée lors de l'application des filtres | - |
| onUndoFilterChange | () => void | Fonction appelée pour annuler une modification | - |
| onRedoFilterChange | () => void | Fonction appelée pour rétablir une modification | - |
| onCancelChanges | () => void | Fonction appelée pour annuler toutes les modifications | - |
| canUndo | boolean | Indique si l'annulation est possible | false |
| canRedo | boolean | Indique si le rétablissement est possible | false |
| isDirty | boolean | Indique si des modifications non appliquées existent | false |
| filterStats | { totalGroups: number; totalOptions: number; activeFiltersCount: number; groupStats: { groupId: string; groupLabel: string; totalOptions: number; activeOptions: number; allActive: boolean; noneActive: boolean; }[]; } | Statistiques détaillées des filtres | - |

### Exemple d'utilisation

```tsx
const filterGroups = [
  {
    id: 'categories',
    label: 'Catégories',
    options: [
      { id: 'cat1', label: 'Catégorie 1', checked: false, count: 10 },
      { id: 'cat2', label: 'Catégorie 2', checked: true, count: 5 }
    ]
  },
  {
    id: 'status',
    label: 'Statut',
    options: [
      { id: 'active', label: 'Actif', checked: false, count: 8 },
      { id: 'inactive', label: 'Inactif', checked: false, count: 7 }
    ]
  }
];

<AdvancedFilters
  filterGroups={filterGroups}
  onFilterChange={handleFilterChange}
  onResetFilters={resetFilters}
  activeFiltersCount={3}
  onApplyFilters={applyFilters}
  onUndoFilterChange={undoFilterChange}
  onRedoFilterChange={redoFilterChange}
  onCancelChanges={cancelChanges}
  canUndo={canUndo}
  canRedo={canRedo}
  isDirty={isDirty}
  filterStats={filterStats}
/>
```

## Hooks personnalisés

### useFilters

Ce hook gère les filtres, la recherche et le tri pour une liste d'éléments.

#### Paramètres

| Paramètre | Type | Description | Défaut |
|-----------|------|-------------|--------|
| items | T[] | Liste d'éléments à filtrer | - |
| options | UseFiltersOptions<T, F> | Options de configuration | {} |

#### Options

```typescript
interface UseFiltersOptions<T, F extends Record<string, unknown>> {
  initialFilters?: F;
  initialSortOrder?: 'asc' | 'desc';
  initialSortField?: keyof T;
  filterFn?: (item: T, filters: F, searchTerm: string) => boolean;
  searchFields?: Array<keyof T>;
  persistKey?: string;
  debounceMs?: number;
  defaultComparator?: <K extends keyof T>(a: T[K], b: T[K], order: 'asc' | 'desc') => number;
}
```

#### Valeurs retournées

```typescript
return {
  filters,
  searchTerm,
  sortOrder,
  sortField,
  filteredItems,
  sortedItems,
  setSearchTerm,
  updateFilter,
  resetFilters,
  toggleSortOrder,
  changeSortField,
  undoFilterChange,
  redoFilterChange,
  canUndo,
  canRedo,
  filterStats
};
```

#### Exemple d'utilisation

```tsx
interface Item {
  id: string;
  name: string;
  category: string;
  createdAt: string;
}

interface Filters {
  category: string;
}

const items: Item[] = [...];

const {
  filters,
  searchTerm,
  sortOrder,
  sortedItems,
  setSearchTerm,
  updateFilter,
  resetFilters,
  toggleSortOrder,
  filterStats,
  undoFilterChange,
  redoFilterChange,
  canUndo,
  canRedo
} = useFilters<Item, Filters>(items, {
  initialFilters: { category: '' },
  initialSortOrder: 'desc',
  initialSortField: 'createdAt',
  searchFields: ['name'],
  persistKey: 'my-filters',
  debounceMs: 300
});
```

### useAdvancedFilters

Ce hook gère les filtres avancés avec des groupes d'options.

#### Paramètres

```typescript
interface UseAdvancedFiltersProps {
  initialFilterGroups: FilterGroup[];
  persistKey?: string;
  debounceMs?: number;
  onFilterChange?: (filterGroups: FilterGroup[]) => void;
}
```

#### Valeurs retournées

```typescript
return {
  filterGroups,
  activeFiltersCount,
  handleFilterChange,
  resetFilters,
  applyFiltersToItems,
  applyFilters,
  undoFilterChange,
  redoFilterChange,
  cancelChanges,
  canUndo,
  canRedo,
  isDirty,
  filterStats
};
```

#### Exemple d'utilisation

```tsx
const initialFilterGroups = [
  {
    id: 'categories',
    label: 'Catégories',
    options: [
      { id: 'cat1', label: 'Catégorie 1', checked: false },
      { id: 'cat2', label: 'Catégorie 2', checked: false }
    ]
  }
];

const {
  filterGroups,
  activeFiltersCount,
  handleFilterChange,
  resetFilters,
  applyFilters,
  undoFilterChange,
  redoFilterChange,
  cancelChanges,
  canUndo,
  canRedo,
  isDirty,
  filterStats
} = useAdvancedFilters({
  initialFilterGroups,
  persistKey: 'advanced-filters',
  debounceMs: 300,
  onFilterChange: (groups) => console.log('Filters changed:', groups)
});

// Fonction pour filtrer les éléments
const filterItems = (item, groups) => {
  // Logique de filtrage personnalisée
  return true;
};

// Appliquer les filtres
const filteredItems = applyFilters(items, filterItems);
```

## Optimisations

Les composants et hooks de filtrage ont été optimisés pour offrir de meilleures performances et une meilleure expérience utilisateur :

### Optimisations du Hook `useFilters`

- **Debounce de la recherche** : Ajout d'un délai configurable pour éviter les requêtes trop fréquentes lors de la saisie.
- **Historique des filtres** : Implémentation d'un système d'historique permettant d'annuler (undo) et de rétablir (redo) les modifications de filtres.
- **Statistiques de filtrage** : Calcul et exposition de statistiques sur les filtres actifs et leur impact sur les données.
- **Comparateur personnalisé** : Possibilité de fournir une fonction de comparaison personnalisée pour le tri.
- **Persistance améliorée** : Utilisation des fonctions utilitaires pour une meilleure gestion de la persistance dans le localStorage.
- **Mémorisation optimisée** : Utilisation plus efficace de `useMemo` pour éviter les recalculs inutiles.
- **Typage plus strict** : Contrainte de type `Record<string, unknown>` pour éviter les erreurs de type et améliorer l'autocomplétion.
- **Gestion des filtres vides** : Meilleure détection des filtres vides ou non définis pour éviter les filtres inutiles.

### Optimisations du Hook `useAdvancedFilters`

- **Historique des filtres** : Système d'historique pour annuler et rétablir les modifications.
- **État "dirty"** : Suivi des modifications non appliquées pour permettre l'annulation des changements.
- **Statistiques détaillées** : Calcul de statistiques par groupe de filtres.
- **Notification des changements** : Possibilité de notifier les composants parents des changements de filtres.
- **Application explicite des filtres** : Séparation entre la modification et l'application des filtres.

### Améliorations du Composant `SearchAndFilterBar`

- **Debounce intégré** : Gestion du debounce directement dans le composant.
- **Bouton de réinitialisation** : Ajout d'un bouton pour effacer rapidement la recherche.
- **Sélection du champ de tri** : Possibilité de choisir le champ sur lequel trier.
- **Affichage des statistiques** : Visualisation du nombre d'éléments filtrés.
- **Tooltips** : Ajout d'infobulles pour améliorer l'expérience utilisateur.
- **Icônes améliorées** : Utilisation d'icônes plus intuitives et cohérentes.

### Améliorations du Composant `TabFilters`

- **Variantes de style** : Ajout de plusieurs variantes de style (default, pills, underline, minimal).
- **Tailles configurables** : Possibilité de choisir entre différentes tailles (sm, md, lg).
- **Animations** : Ajout d'animations fluides avec Framer Motion.
- **Tooltips** : Support des infobulles pour chaque onglet.
- **Badges** : Option pour afficher les compteurs sous forme de badges.
- **Icônes** : Support des icônes pour chaque onglet.
- **État désactivé** : Possibilité de désactiver certains onglets.

### Améliorations du Composant `AdvancedFilters`

- **Boutons d'annulation et de rétablissement** : Ajout de boutons pour annuler et rétablir les modifications.
- **Statistiques détaillées** : Affichage des statistiques par groupe de filtres.
- **Boutons d'application et d'annulation** : Séparation entre la modification et l'application des filtres.
- **Tooltips** : Ajout d'infobulles pour améliorer l'expérience utilisateur.
- **Compteurs par option** : Possibilité d'afficher le nombre d'éléments pour chaque option.
- **Options désactivées** : Support des options désactivées.

## Exemples d'utilisation

### Exemple 1 : Page de listes de courses

```tsx
// Dans src/app/lists/page.tsx
const [searchTerm, setSearchTerm] = useState('');
const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
const [activeFilter, setActiveFilter] = useState<FilterType>('all');

// Configuration des onglets
const tabs: FilterTab[] = useMemo(() => [
  {
    id: 'all',
    label: 'Toutes',
    count: lists.length
  },
  {
    id: 'active',
    label: 'En cours',
    count: lists.filter(list => !list.completed).length
  },
  {
    id: 'completed',
    label: 'Terminées',
    count: lists.filter(list => list.completed).length
  }
], [lists]);

// Filtrer et trier les listes
const filteredLists = useMemo(() => {
  // Logique de filtrage
}, [lists, activeFilter, searchTerm]);

const sortedLists = useMemo(() => {
  // Logique de tri
}, [filteredLists, sortOrder]);

// Dans le JSX
<TabFilters 
  tabs={tabs}
  activeTab={activeFilter}
  onTabChange={(tabId) => setActiveFilter(tabId as FilterType)}
/>

<SearchAndFilterBar
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  sortOrder={sortOrder}
  onSortToggle={toggleSortOrder}
  sortLabel={{
    asc: 'Plus anciennes',
    desc: 'Plus récentes'
  }}
  searchPlaceholder="Rechercher une liste ou un produit..."
/>
```

### Exemple 2 : Page d'inventaire avec filtres avancés

```tsx
// Dans src/app/inventory/page.tsx
const [searchTerm, setSearchTerm] = useState('');
const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

// Configurer les filtres avancés
const initialFilterGroups: FilterGroup[] = useMemo(() => [
  {
    id: 'categories',
    label: 'Catégories',
    options: allCategories.map(category => ({
      id: category,
      label: category,
      checked: false
    }))
  },
  {
    id: 'status',
    label: 'Statut',
    options: [
      { id: 'expired', label: 'Périmés', checked: false },
      { id: 'expiringSoon', label: 'Périmant bientôt', checked: false }
    ]
  }
], [allCategories]);

// Utiliser le hook de filtres avancés
const {
  filterGroups,
  activeFiltersCount,
  handleFilterChange,
  resetFilters,
  applyFilters,
  undoFilterChange,
  redoFilterChange,
  canUndo,
  canRedo
} = useAdvancedFilters({
  initialFilterGroups,
  persistKey: 'inventory-filters'
});

// Dans le JSX
<div className="flex flex-col md:flex-row gap-4 items-start">
  <div className="flex-1">
    <SearchAndFilterBar
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      sortOrder={sortOrder}
      onSortToggle={toggleSortOrder}
      sortLabel={{
        asc: 'Date d\'expiration croissante',
        desc: 'Date d\'expiration décroissante'
      }}
      searchPlaceholder="Rechercher un produit..."
    />
  </div>
  <AdvancedFilters
    filterGroups={filterGroups}
    onFilterChange={handleFilterChange}
    onResetFilters={resetFilters}
    activeFiltersCount={activeFiltersCount}
    onUndoFilterChange={undoFilterChange}
    onRedoFilterChange={redoFilterChange}
    canUndo={canUndo}
    canRedo={canRedo}
  />
</div>
```

### Exemple 3 : Utilisation complète avec statistiques

```tsx
// Utilisation du hook useFilters avec toutes les fonctionnalités
const {
  filters,
  searchTerm,
  sortOrder,
  sortedItems,
  setSearchTerm,
  updateFilter,
  resetFilters,
  toggleSortOrder,
  filterStats,
  undoFilterChange,
  redoFilterChange,
  canUndo,
  canRedo
} = useFilters<Product, ProductFilters>(
  products,
  {
    initialFilters: { category: null, status: 'all' },
    initialSortOrder: 'desc',
    initialSortField: 'createdAt',
    searchFields: ['name', 'description'],
    persistKey: 'product-filters',
    debounceMs: 300
  }
);

// Affichage des statistiques de filtrage
<div className="text-sm text-muted-foreground">
  {filterStats.filteredItemCount} sur {filterStats.totalItemCount} produits affichés
  ({filterStats.filterReductionPercent}% filtrés)
</div>
```

## Prochaines étapes

Voici quelques pistes d'amélioration pour les futures versions :

1. **Filtres contextuels** : Ajouter des filtres qui s'adaptent au contexte de l'application.
2. **Filtres sauvegardés** : Permettre aux utilisateurs de sauvegarder leurs configurations de filtres préférées.
3. **Filtres combinés** : Améliorer la gestion des filtres combinés (ET/OU) pour des recherches plus précises.
4. **Filtres par plage** : Ajouter des filtres par plage pour les dates, les prix, etc.
5. **Filtres géographiques** : Intégrer des filtres basés sur la localisation.
6. **Recherche avancée** : Ajouter une syntaxe de recherche avancée avec des opérateurs booléens.
7. **Filtres par tags** : Ajouter des filtres basés sur des tags ou des étiquettes.
8. **Filtres par notation** : Ajouter des filtres basés sur les notations ou les avis.
9. **Filtres par disponibilité** : Ajouter des filtres basés sur la disponibilité des produits.
10. **Filtres par prix** : Ajouter des filtres basés sur les fourchettes de prix. 