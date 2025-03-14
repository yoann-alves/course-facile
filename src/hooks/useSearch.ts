import { useState, useCallback, useMemo, useEffect } from 'react';
import { useDebounce } from './useDebounce';

interface UseSearchOptions<T> {
  data: T[];
  searchKeys: (keyof T)[];
  initialQuery?: string;
  debounceMs?: number;
  minQueryLength?: number;
  caseSensitive?: boolean;
}

export function useSearch<T>({
  data,
  searchKeys,
  initialQuery = '',
  debounceMs = 300,
  minQueryLength = 2,
  caseSensitive = false
}: UseSearchOptions<T>) {
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  
  // Utiliser un debounce pour éviter trop de recherches pendant la frappe
  const debouncedQuery = useDebounce(query, debounceMs);
  
  // Fonction pour mettre à jour la requête de recherche
  const updateQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setIsSearching(true);
  }, []);
  
  // Fonction pour réinitialiser la recherche
  const resetSearch = useCallback(() => {
    setQuery('');
    setIsSearching(false);
  }, []);
  
  // Fonction pour vérifier si un élément correspond à la requête
  const matchesQuery = useCallback((item: T, searchQuery: string): boolean => {
    if (!searchQuery || searchQuery.length < minQueryLength) {
      return true;
    }
    
    const normalizedQuery = caseSensitive ? searchQuery : searchQuery.toLowerCase();
    
    return searchKeys.some(key => {
      const value = item[key];
      if (value === null || value === undefined) {
        return false;
      }
      
      const stringValue = String(value);
      const normalizedValue = caseSensitive ? stringValue : stringValue.toLowerCase();
      
      return normalizedValue.includes(normalizedQuery);
    });
  }, [searchKeys, minQueryLength, caseSensitive]);
  
  // Filtrer les données en fonction de la requête
  const filteredData = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < minQueryLength) {
      return data;
    }
    
    return data.filter(item => matchesQuery(item, debouncedQuery));
  }, [data, debouncedQuery, matchesQuery, minQueryLength]);
  
  // Mettre à jour l'état de recherche lorsque la requête debounced change
  useEffect(() => {
    setIsSearching(false);
  }, [debouncedQuery]);
  
  // Calculer des statistiques sur les résultats
  const searchStats = useMemo(() => {
    const hasResults = filteredData.length > 0;
    const hasQuery = debouncedQuery.length >= minQueryLength;
    const totalResults = filteredData.length;
    const totalItems = data.length;
    
    return {
      hasResults,
      hasQuery,
      totalResults,
      totalItems,
      isFiltered: hasQuery && totalResults !== totalItems
    };
  }, [filteredData, debouncedQuery, minQueryLength, data]);
  
  return {
    query,
    debouncedQuery,
    isSearching,
    filteredData,
    updateQuery,
    resetSearch,
    searchStats
  };
} 