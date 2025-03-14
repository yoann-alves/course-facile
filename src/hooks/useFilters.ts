import { useState, useCallback, useMemo, useEffect } from 'react';
import { isClient, setToLocalStorage, getFromLocalStorage } from '@/lib/utils';

interface UseFiltersOptions<T, F extends Record<string, unknown>> {
  initialFilters?: F;
  initialSortOrder?: 'asc' | 'desc';
  initialSortField?: keyof T;
  filterFn?: (item: T, filters: F, searchTerm: string) => boolean;
  searchFields?: Array<keyof T>;
  persistKey?: string;
  debounceMs?: number; // Délai de debounce pour la recherche
  defaultComparator?: <K extends keyof T>(a: T[K], b: T[K], order: 'asc' | 'desc') => number; // Comparateur personnalisé
}

/**
 * Hook pour gérer les filtres, la recherche et le tri
 * @param items Les éléments à filtrer
 * @param options Options de configuration
 * @returns Fonctions et état pour gérer les filtres
 */
export function useFilters<T, F extends Record<string, unknown>>(
  items: T[],
  options: UseFiltersOptions<T, F> = {}
) {
  const {
    initialFilters = {} as F,
    initialSortOrder = 'desc',
    initialSortField,
    filterFn,
    searchFields = [],
    persistKey,
    debounceMs = 300,
    defaultComparator
  } = options;

  // Récupérer les filtres sauvegardés si persistKey est fourni
  const savedFilters = useMemo(() => {
    if (persistKey && isClient) {
      return getFromLocalStorage<F>(persistKey, initialFilters);
    }
    return initialFilters;
  }, [persistKey, initialFilters]);

  const [filters, setFilters] = useState<F>(savedFilters);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);
  const [sortField, setSortField] = useState<keyof T | undefined>(initialSortField);
  const [filterHistory, setFilterHistory] = useState<F[]>([savedFilters]); // Historique des filtres pour undo/redo
  const [historyIndex, setHistoryIndex] = useState(0);

  // Effet pour le debounce de la recherche
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debounceMs]);

  // Fonction pour mettre à jour un filtre
  const updateFilter = useCallback(<K extends keyof F>(key: K, value: F[K]) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      
      // Persister les filtres si persistKey est fourni
      if (persistKey && isClient) {
        setToLocalStorage(persistKey, newFilters);
      }
      
      // Ajouter à l'historique des filtres
      setFilterHistory(history => {
        const newHistory = [...history.slice(0, historyIndex + 1), newFilters];
        // Limiter la taille de l'historique à 10 entrées
        if (newHistory.length > 10) {
          newHistory.shift();
        }
        setHistoryIndex(newHistory.length - 1);
        return newHistory;
      });
      
      return newFilters;
    });
  }, [persistKey, historyIndex]);
  
  // Fonction pour réinitialiser les filtres
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchTerm('');
    
    // Persister les filtres si persistKey est fourni
    if (persistKey && isClient) {
      setToLocalStorage(persistKey, initialFilters);
    }
    
    // Réinitialiser l'historique
    setFilterHistory([initialFilters]);
    setHistoryIndex(0);
  }, [initialFilters, persistKey]);
  
  // Fonction pour inverser l'ordre de tri
  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);
  
  // Fonction pour changer le champ de tri
  const changeSortField = useCallback((field: keyof T) => {
    setSortField(field);
  }, []);
  
  // Fonction pour annuler la dernière modification de filtre
  const undoFilterChange = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const previousFilters = filterHistory[newIndex];
      setFilters(previousFilters);
      
      if (persistKey && isClient) {
        setToLocalStorage(persistKey, previousFilters);
      }
    }
  }, [filterHistory, historyIndex, persistKey]);
  
  // Fonction pour rétablir la dernière modification de filtre annulée
  const redoFilterChange = useCallback(() => {
    if (historyIndex < filterHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const nextFilters = filterHistory[newIndex];
      setFilters(nextFilters);
      
      if (persistKey && isClient) {
        setToLocalStorage(persistKey, nextFilters);
      }
    }
  }, [filterHistory, historyIndex, persistKey]);

  // Filtrer les éléments
  const filteredItems = useMemo(() => {
    // Si une fonction de filtre personnalisée est fournie, l'utiliser
    if (filterFn) {
      return items.filter(item => filterFn(item, filters, debouncedSearchTerm));
    }

    // Sinon, utiliser une logique de filtre par défaut
    return items.filter(item => {
      // Vérifier si l'élément correspond aux filtres
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        // Si la valeur du filtre est vide ou null, ne pas filtrer sur ce champ
        if (value === '' || value === null || value === undefined) return true;
        
        // Si la valeur du filtre est un tableau, vérifier si la valeur de l'élément est dans le tableau
        if (Array.isArray(value)) {
          return value.includes(item[key as keyof T]);
        }
        
        // Sinon, vérifier si la valeur de l'élément correspond à la valeur du filtre
        return item[key as keyof T] === value;
      });

      // Si aucun terme de recherche, retourner le résultat des filtres
      if (!debouncedSearchTerm.trim()) return matchesFilters;

      // Vérifier si l'élément correspond au terme de recherche
      const matchesSearch = searchFields.some(field => {
        const fieldValue = item[field];
        if (fieldValue === undefined || fieldValue === null) return false;
        
        return String(fieldValue).toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      });

      return matchesFilters && matchesSearch;
    });
  }, [items, filters, debouncedSearchTerm, filterFn, searchFields]);

  // Trier les éléments filtrés
  const sortedItems = useMemo(() => {
    if (!sortField) return filteredItems;

    return [...filteredItems].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      // Utiliser le comparateur personnalisé s'il est fourni
      if (defaultComparator) {
        return defaultComparator(valueA, valueB, sortOrder);
      }

      // Gérer les cas où les valeurs sont des dates
      if (
        valueA instanceof Date && 
        valueB instanceof Date
      ) {
        return sortOrder === 'asc'
          ? valueA.getTime() - valueB.getTime()
          : valueB.getTime() - valueA.getTime();
      }

      // Gérer les cas où les valeurs sont des chaînes de caractères
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortOrder === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      // Gérer les cas où les valeurs sont des nombres
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      }

      // Gérer les autres cas
      return 0;
    });
  }, [filteredItems, sortField, sortOrder, defaultComparator]);

  // Statistiques sur les filtres
  const filterStats = useMemo(() => {
    const activeFilterCount = Object.values(filters).filter(
      value => value !== null && value !== undefined && value !== '' && 
      !(Array.isArray(value) && value.length === 0)
    ).length;
    
    const hasActiveSearch = debouncedSearchTerm.trim() !== '';
    
    return {
      activeFilterCount,
      hasActiveSearch,
      totalActiveFilters: activeFilterCount + (hasActiveSearch ? 1 : 0),
      filteredItemCount: filteredItems.length,
      totalItemCount: items.length,
      filterReductionPercent: items.length > 0 
        ? Math.round((1 - filteredItems.length / items.length) * 100) 
        : 0
    };
  }, [filters, debouncedSearchTerm, filteredItems.length, items.length]);

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
    canUndo: historyIndex > 0,
    canRedo: historyIndex < filterHistory.length - 1,
    filterStats
  };
} 