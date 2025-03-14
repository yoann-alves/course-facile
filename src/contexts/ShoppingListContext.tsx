'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { shoppingLists as initialShoppingLists } from '@/data/shopping-lists';
import { ShoppingList, ShoppingListContextType } from '@/types';
import { isClient, getFromLocalStorage, setToLocalStorage, generateId } from '@/lib/utils';

export const ShoppingListContext = createContext<ShoppingListContextType>({
  lists: [],
  addList: () => '',
  updateList: () => {},
  deleteList: () => {},
  getList: () => undefined,
});

// Hook pour utiliser le contexte de liste de courses
export function useShoppingLists() {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingLists doit être utilisé à l\'intérieur d\'un ShoppingListProvider');
  }
  return context;
}

export function ShoppingListProvider({ children }: { children: React.ReactNode }) {
  // Utiliser localStorage pour persister les listes entre les sessions
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Charger les listes depuis localStorage au démarrage
  useEffect(() => {
    if (isClient) {
      const savedLists = getFromLocalStorage<ShoppingList[]>('shoppingLists', initialShoppingLists);
      setLists(savedLists);
      setIsInitialized(true);
    }
  }, []);
  
  // Sauvegarder les listes dans localStorage à chaque modification
  useEffect(() => {
    if (isInitialized && isClient) {
      setToLocalStorage('shoppingLists', lists);
    }
  }, [lists, isInitialized]);
  
  // Ajouter une nouvelle liste
  const addList = (listData: Omit<ShoppingList, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newId = generateId('list');
    const newList: ShoppingList = {
      ...listData,
      id: newId,
      createdAt: now,
      updatedAt: now,
    };
    
    setLists(prevLists => [...prevLists, newList]);
    return newId;
  };
  
  // Mettre à jour une liste existante
  const updateList = (updatedList: ShoppingList) => {
    setLists(prevLists => {
      const newLists = prevLists.map(list => 
        list.id === updatedList.id 
          ? { ...updatedList, updatedAt: new Date().toISOString() } 
          : list
      );
      return newLists;
    });
  };
  
  // Supprimer une liste
  const deleteList = (id: string) => {
    setLists(prevLists => {
      const newLists = prevLists.filter(list => list.id !== id);
      return newLists;
    });
  };
  
  // Récupérer une liste par son ID
  const getList = (id: string) => {
    const list = lists.find(list => list.id === id);
    return list;
  };
  
  return (
    <ShoppingListContext.Provider value={{ lists, addList, updateList, deleteList, getList }}>
      {children}
    </ShoppingListContext.Provider>
  );
} 