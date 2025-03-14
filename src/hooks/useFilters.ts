import { useState, useCallback, useMemo } from 'react';
import { isClient, getFromLocalStorage, setToLocalStorage } from '@/lib/utils';

interface UseFiltersOptions<T, F> {
  initialData: T[];
  initialFilters: F;
  filterFn: (item: T, filters: F) => boolean;
  sortFn?: (a: T, b: T, sortKey: string, sortDirection: 'asc' | 'desc') => number;
  persistKey?: string;
}

export function useFilters<T, F extends Record<string, unknown>>({
  initialData,
  initialFilters,
  filterFn,
  sortFn,
  persistKey
}: UseFiltersOptions<T, F>) {
  // Récupérer les filtres depuis localStorage si persistKey est fourni
  const savedFilters = persistKey && isClient
    ? getFromLocalStorage<F>(persistKey, initialFilters)
    : initialFilters;
  
  const [data] = useState<T[]>(initialData);
  const [filters, setFilters] = useState<F>(savedFilters);
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Mettre à jour un filtre
  const setFilter = useCallback((key: keyof F, value: unknown) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      
      // Persister les filtres si persistKey est fourni
      if (persistKey && isClient) {
        setToLocalStorage(persistKey, newFilters);
      }
      
      return newFilters;
    });
  }, [persistKey]);
  
  // Réinitialiser les filtres
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    
    // Persister les filtres si persistKey est fourni
    if (persistKey && isClient) {
      setToLocalStorage(persistKey, initialFilters);
    }
  }, [initialFilters, persistKey]);
  
  // Mettre à jour le tri
  const setSort = useCallback((key: string) => {
    setSortDirection(prev => {
      // Si la clé est la même, inverser la direction
      if (sortKey === key) {
        return prev === 'asc' ? 'desc' : 'asc';
      }
      
      // Sinon, utiliser la direction ascendante par défaut
      return 'asc';
    });
    
    setSortKey(key);
  }, [sortKey]);
  
  // Filtrer et trier les données
  const filteredData = useMemo(() => {
    // Filtrer les données
    let result = data.filter(item => filterFn(item, filters));
    
    // Trier les données si sortFn est fourni et sortKey n'est pas vide
    if (sortFn && sortKey) {
      result = [...result].sort((a, b) => sortFn(a, b, sortKey, sortDirection));
    }
    
    return result;
  }, [data, filters, filterFn, sortKey, sortDirection, sortFn]);
  
  return {
    filters,
    setFilter,
    resetFilters,
    sortKey,
    sortDirection,
    setSort,
    filteredData
  };
} 