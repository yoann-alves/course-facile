import { useContext } from 'react';
import { ShoppingListContext } from '@/contexts/ShoppingListContext';
import { ShoppingList, ShoppingListContextType, FilterType } from '@/types';

// Hook principal pour accéder au contexte de liste de courses
export function useShoppingList(): ShoppingListContextType {
  const context = useContext(ShoppingListContext);
  
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  
  return context;
}

// Hook pour les opérations sur les listes
export function useShoppingListOperations() {
  const { addList, updateList, deleteList } = useShoppingList();
  
  return {
    addList,
    updateList,
    deleteList,
  };
}

// Hook pour récupérer une liste spécifique
export function useShoppingListById(id: string) {
  const { getList } = useShoppingList();
  
  return getList(id);
}

// Hook pour filtrer les listes
export function useFilteredShoppingLists(filter?: FilterType) {
  const { lists } = useShoppingList();
  
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
}

// Hook pour les statistiques des listes
export function useShoppingListStats() {
  const { lists } = useShoppingList();
  
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
} 