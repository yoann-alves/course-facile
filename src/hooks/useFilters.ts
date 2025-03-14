import { useState, useCallback, useMemo, useEffect } from 'react';
import { isClient, setToLocalStorage, getFromLocalStorage } from '@/lib/utils';

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

  // Effet pour le debounce de la recherche
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debounceMs]);

  // Effet pour sauvegarder les filtres si persistKey est fourni
  useEffect(() => {
    if (persistKey && isClient) {
      setToLocalStorage(persistKey, filters);
    }
  }, [filters, persistKey]);

  // Fonction pour mettre à jour un filtre
  const updateFilter = useCallback((key: keyof F, value: F[keyof F]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Fonction pour réinitialiser les filtres
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchTerm('');
  }, [initialFilters]);

  // Fonction pour basculer l'ordre de tri
  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }, []);

  // Fonction pour changer le champ de tri
  const changeSortField = useCallback((field: keyof T) => {
    setSortField(field);
  }, []);

  // Fonction pour filtrer les éléments
  const filterItems = useCallback((itemsToFilter: T[]): T[] => {
    // Filtrer par terme de recherche et filtres
    let filteredItems = itemsToFilter;
    
    if (filterFn) {
      filteredItems = filteredItems.filter(item => filterFn(item, filters, debouncedSearchTerm));
    } else if (debouncedSearchTerm && searchFields.length > 0) {
      // Filtrage par défaut si filterFn n'est pas fourni
      const normalizedSearchTerm = debouncedSearchTerm.toLowerCase();
      filteredItems = filteredItems.filter(item => {
        return searchFields.some(field => {
          const value = item[field];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(normalizedSearchTerm);
        });
      });
    }
    
    // Trier les éléments
    if (sortField) {
      filteredItems = [...filteredItems].sort((a, b) => {
        if (defaultComparator) {
          return defaultComparator(a[sortField], b[sortField], sortOrder);
        }
        
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (aValue === bValue) return 0;
        
        // Tri par défaut
        const comparison = aValue < bValue ? -1 : 1;
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }
    
    return filteredItems;
  }, [filters, debouncedSearchTerm, sortField, sortOrder, filterFn, searchFields, defaultComparator]);

  // Appliquer les filtres aux éléments
  const filteredItems = useMemo(() => {
    return filterItems(items);
  }, [items, filterItems]);

  // Statistiques sur les filtres
  const filterStats = useMemo(() => {
    const totalItemCount = items.length;
    const filteredItemCount = filteredItems.length;
    const filterReductionPercent = totalItemCount > 0
      ? Math.round(((totalItemCount - filteredItemCount) / totalItemCount) * 100)
      : 0;
    
    return {
      totalItemCount,
      filteredItemCount,
      filterReductionPercent
    };
  }, [items.length, filteredItems.length]);

  return {
    // État
    filters,
    searchTerm,
    debouncedSearchTerm,
    sortOrder,
    sortField,
    filteredItems,
    filterStats,
    
    // Actions
    setSearchTerm,
    updateFilter,
    resetFilters,
    toggleSortOrder,
    changeSortField
  };
} 