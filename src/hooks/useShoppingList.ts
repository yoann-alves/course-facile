import { useMemo } from 'react';
import { useShoppingLists } from '@/contexts/ShoppingListContext';
import { ShoppingList, FilterType } from '@/types';

// Hook pour les opérations sur les listes
export function useShoppingListOperations() {
  const { addList, updateList, deleteList } = useShoppingLists();
  
  return {
    addList,
    updateList,
    deleteList,
  };
}

// Hook pour récupérer une liste spécifique
export function useShoppingListById(id: string) {
  const { getList } = useShoppingLists();
  
  return getList(id);
}

// Hook pour filtrer les listes
export function useFilteredShoppingLists(filter?: FilterType) {
  const { lists } = useShoppingLists();
  
  return useMemo(() => {
    if (!filter || filter === 'all') {
      return lists;
    }
    
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    switch (filter) {
      case 'active':
        return lists.filter(list => !list.completed);
      case 'completed':
        return lists.filter(list => list.completed);
      case 'recent':
        return lists.filter(list => new Date(list.updatedAt) >= oneWeekAgo);
      default:
        return lists;
    }
  }, [lists, filter]);
}

// Hook pour les statistiques des listes
export function useShoppingListStats() {
  const { lists } = useShoppingLists();
  
  return useMemo(() => {
    const totalLists = lists.length;
    const activeLists = lists.filter(list => !list.completed).length;
    const completedLists = lists.filter(list => list.completed).length;
    
    const getCompletionPercentage = (list: ShoppingList): number => {
      if (list.items.length === 0) return 0;
      const checkedItems = list.items.filter(item => item.checked).length;
      return Math.round((checkedItems / list.items.length) * 100);
    };
    
    return {
      totalLists,
      activeLists,
      completedLists,
      getCompletionPercentage,
    };
  }, [lists]);
} 