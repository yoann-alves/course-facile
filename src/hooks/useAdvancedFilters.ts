import { useState, useCallback, useMemo, useEffect } from 'react';
import { FilterGroup } from '@/components/filters/AdvancedFilters';
import { isClient, getFromLocalStorage, setToLocalStorage } from '@/lib/utils';

interface UseAdvancedFiltersProps {
  initialFilterGroups: FilterGroup[];
  persistKey?: string;
  debounceMs?: number;
  onFilterChange?: (filterGroups: FilterGroup[]) => void;
}

export function useAdvancedFilters({
  initialFilterGroups,
  persistKey,
  debounceMs = 0,
  onFilterChange
}: UseAdvancedFiltersProps) {
  // Récupérer les filtres sauvegardés si persistKey est fourni
  const savedFilterGroups = useMemo(() => {
    if (persistKey && isClient) {
      return getFromLocalStorage<FilterGroup[]>(persistKey, initialFilterGroups);
    }
    return initialFilterGroups;
  }, [persistKey, initialFilterGroups]);

  // État pour les groupes de filtres
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>(savedFilterGroups);
  const [filterHistory, setFilterHistory] = useState<FilterGroup[][]>([savedFilterGroups]); // Historique des filtres pour undo/redo
  const [historyIndex, setHistoryIndex] = useState(0);
  const [lastAppliedFilters, setLastAppliedFilters] = useState<FilterGroup[]>(savedFilterGroups);
  const [isDirty, setIsDirty] = useState(false);

  // Effet pour notifier des changements de filtres
  useEffect(() => {
    if (onFilterChange) {
      const handler = setTimeout(() => {
        onFilterChange(filterGroups);
      }, debounceMs);
      
      return () => {
        clearTimeout(handler);
      };
    }
  }, [filterGroups, onFilterChange, debounceMs]);

  // Calculer le nombre total de filtres actifs
  const activeFiltersCount = useMemo(() => {
    return filterGroups.reduce((count, group) => {
      const activeOptions = group.options.filter(option => option.checked);
      return count + activeOptions.length;
    }, 0);
  }, [filterGroups]);

  // Fonction pour changer l'état d'un filtre
  const handleFilterChange = useCallback((groupId: string, optionId: string, checked: boolean) => {
    setFilterGroups(prevGroups => {
      const newGroups = prevGroups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            options: group.options.map(option => {
              if (option.id === optionId) {
                return { ...option, checked };
              }
              return option;
            })
          };
        }
        return group;
      });

      setIsDirty(true);
      
      return newGroups;
    });
  }, []);

  // Fonction pour appliquer les filtres
  const applyFilters = useCallback(() => {
    // Sauvegarder dans localStorage si persistKey est fourni
    if (persistKey && isClient) {
      setToLocalStorage(persistKey, filterGroups);
    }
    
    // Ajouter à l'historique des filtres
    setFilterHistory(history => {
      const newHistory = [...history.slice(0, historyIndex + 1), [...filterGroups]];
      // Limiter la taille de l'historique à 10 entrées
      if (newHistory.length > 10) {
        newHistory.shift();
      }
      setHistoryIndex(newHistory.length - 1);
      return newHistory;
    });
    
    setLastAppliedFilters([...filterGroups]);
    setIsDirty(false);
  }, [filterGroups, persistKey, historyIndex]);

  // Fonction pour réinitialiser tous les filtres
  const resetFilters = useCallback(() => {
    setFilterGroups(initialFilterGroups);
    
    // Supprimer du localStorage si persistKey est fourni
    if (persistKey && isClient) {
      localStorage.removeItem(persistKey);
    }
    
    // Réinitialiser l'historique
    setFilterHistory([initialFilterGroups]);
    setHistoryIndex(0);
    setLastAppliedFilters(initialFilterGroups);
    setIsDirty(false);
  }, [initialFilterGroups, persistKey]);

  // Fonction pour annuler la dernière modification de filtre
  const undoFilterChange = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const previousFilters = filterHistory[newIndex];
      setFilterGroups(previousFilters);
      setLastAppliedFilters(previousFilters);
      setIsDirty(false);
      
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
      setFilterGroups(nextFilters);
      setLastAppliedFilters(nextFilters);
      setIsDirty(false);
      
      if (persistKey && isClient) {
        setToLocalStorage(persistKey, nextFilters);
      }
    }
  }, [filterHistory, historyIndex, persistKey]);

  // Fonction pour annuler les modifications non appliquées
  const cancelChanges = useCallback(() => {
    setFilterGroups(lastAppliedFilters);
    setIsDirty(false);
  }, [lastAppliedFilters]);

  // Fonction pour appliquer les filtres à un tableau d'éléments
  const applyFiltersToItems = useCallback(<T extends Record<string, unknown>>(
    items: T[],
    filterFn: (item: T, filterGroups: FilterGroup[]) => boolean
  ) => {
    return items.filter(item => filterFn(item, filterGroups));
  }, [filterGroups]);

  // Statistiques sur les filtres
  const filterStats = useMemo(() => {
    const groupStats = filterGroups.map(group => {
      const totalOptions = group.options.length;
      const activeOptions = group.options.filter(option => option.checked).length;
      return {
        groupId: group.id,
        groupLabel: group.label,
        totalOptions,
        activeOptions,
        allActive: activeOptions === totalOptions && totalOptions > 0,
        noneActive: activeOptions === 0
      };
    });
    
    return {
      totalGroups: filterGroups.length,
      totalOptions: filterGroups.reduce((sum, group) => sum + group.options.length, 0),
      activeFiltersCount,
      groupStats
    };
  }, [filterGroups, activeFiltersCount]);

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
    canUndo: historyIndex > 0,
    canRedo: historyIndex < filterHistory.length - 1,
    isDirty,
    filterStats
  };
} 