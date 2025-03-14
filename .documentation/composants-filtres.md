# Documentation des Composants de Filtres

Cette documentation explique comment utiliser les composants de filtres et de recherche réutilisables dans l'application Course Facile.

## Table des matières

1. [Composants disponibles](#composants-disponibles)
2. [SearchAndFilterBar](#searchandfilterbar)
3. [TabFilters](#tabfilters)
4. [AdvancedFilters](#advancedfilters)
5. [Hooks personnalisés](#hooks-personnalisés)
6. [Exemples d'utilisation](#exemples-dutilisation)

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
}
```

### Props

| Prop | Type | Description | Défaut |
|------|------|-------------|--------|
| tabs | FilterTab[] | Liste des onglets à afficher | - |
| activeTab | string | ID de l'onglet actif | - |
| onTabChange | (tabId: string) => void | Fonction appelée lors du changement d'onglet | - |
| className | string | Classes CSS supplémentaires | '' |

### Exemple d'utilisation

```tsx
const tabs = [
  { id: 'all', label: 'Tous', count: 10 },
  { id: 'active', label: 'Actifs', count: 5 },
  { id: 'completed', label: 'Terminés', count: 5 }
];

<TabFilters
  tabs={tabs}
  activeTab={activeFilter}
  onTabChange={(tabId) => setActiveFilter(tabId)}
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

### Exemple d'utilisation

```tsx
const filterGroups = [
  {
    id: 'categories',
    label: 'Catégories',
    options: [
      { id: 'cat1', label: 'Catégorie 1', checked: false },
      { id: 'cat2', label: 'Catégorie 2', checked: true }
    ]
  },
  {
    id: 'status',
    label: 'Statut',
    options: [
      { id: 'active', label: 'Actif', checked: false },
      { id: 'inactive', label: 'Inactif', checked: false }
    ]
  }
];

<AdvancedFilters
  filterGroups={filterGroups}
  onFilterChange={handleFilterChange}
  onResetFilters={resetFilters}
  activeFiltersCount={3}
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

| Option | Type | Description | Défaut |
|--------|------|-------------|--------|
| initialFilters | F | Filtres initiaux | {} |
| initialSortOrder | 'asc' \| 'desc' | Ordre de tri initial | 'desc' |
| initialSortField | keyof T | Champ de tri initial | undefined |
| filterFn | (item: T, filters: F, searchTerm: string) => boolean | Fonction de filtre personnalisée | undefined |
| searchFields | Array<keyof T> | Champs sur lesquels effectuer la recherche | [] |
| persistKey | string | Clé pour persister les filtres dans localStorage | undefined |

#### Valeurs retournées

| Valeur | Type | Description |
|--------|------|-------------|
| filters | F | Filtres actuels |
| searchTerm | string | Terme de recherche actuel |
| sortOrder | 'asc' \| 'desc' | Ordre de tri actuel |
| sortField | keyof T \| undefined | Champ de tri actuel |
| filteredItems | T[] | Éléments filtrés (sans tri) |
| sortedItems | T[] | Éléments filtrés et triés |
| setSearchTerm | (value: string) => void | Fonction pour définir le terme de recherche |
| updateFilter | <K extends keyof F>(key: K, value: F[K]) => void | Fonction pour mettre à jour un filtre |
| resetFilters | () => void | Fonction pour réinitialiser les filtres |
| toggleSortOrder | () => void | Fonction pour inverser l'ordre de tri |
| changeSortField | (field: keyof T) => void | Fonction pour changer le champ de tri |

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
  toggleSortOrder
} = useFilters<Item, Filters>(items, {
  initialFilters: { category: '' },
  initialSortOrder: 'desc',
  initialSortField: 'createdAt',
  searchFields: ['name'],
  persistKey: 'my-filters'
});
```

### useAdvancedFilters

Ce hook gère les filtres avancés avec des groupes d'options.

#### Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| initialFilterGroups | FilterGroup[] | Groupes de filtres initiaux |
| persistKey | string \| undefined | Clé pour persister les filtres dans localStorage |

#### Valeurs retournées

| Valeur | Type | Description |
|--------|------|-------------|
| filterGroups | FilterGroup[] | Groupes de filtres actuels |
| activeFiltersCount | number | Nombre de filtres actifs |
| handleFilterChange | (groupId: string, optionId: string, checked: boolean) => void | Fonction pour changer l'état d'un filtre |
| resetFilters | () => void | Fonction pour réinitialiser les filtres |
| applyFilters | <T>(items: T[], filterFn: (item: T, filterGroups: FilterGroup[]) => boolean) => T[] | Fonction pour appliquer les filtres à une liste d'éléments |

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
  applyFilters
} = useAdvancedFilters({
  initialFilterGroups,
  persistKey: 'advanced-filters'
});

// Fonction pour filtrer les éléments
const filterItems = (item, groups) => {
  // Logique de filtrage personnalisée
  return true;
};

// Appliquer les filtres
const filteredItems = applyFilters(items, filterItems);
```

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
  applyFilters
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
  />
</div>
``` 