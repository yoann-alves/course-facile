'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { ShoppingList, shoppingLists as initialShoppingLists } from '@/data/shopping-lists';

interface ShoppingListContextType {
  lists: ShoppingList[];
  addList: (list: Omit<ShoppingList, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateList: (list: ShoppingList) => void;
  deleteList: (id: string) => void;
  getList: (id: string) => ShoppingList | undefined;
}

const ShoppingListContext = createContext<ShoppingListContextType>({
  lists: [],
  addList: () => '',
  updateList: () => {},
  deleteList: () => {},
  getList: () => undefined,
});

export const useShoppingLists = () => useContext(ShoppingListContext);

export function ShoppingListProvider({ children }: { children: React.ReactNode }) {
  // Utiliser localStorage pour persister les listes entre les sessions
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Charger les listes depuis localStorage au démarrage
  useEffect(() => {
    // Vérifier si nous sommes dans un environnement navigateur
    if (typeof window !== 'undefined') {
      const savedLists = localStorage.getItem('shoppingLists');
      if (savedLists) {
        try {
          setLists(JSON.parse(savedLists));
        } catch (error) {
          console.error('Erreur lors du chargement des listes:', error);
          setLists(initialShoppingLists);
        }
      } else {
        setLists(initialShoppingLists);
      }
      setIsInitialized(true);
    }
  }, []);
  
  // Sauvegarder les listes dans localStorage à chaque modification
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('shoppingLists', JSON.stringify(lists));
      console.log('Listes sauvegardées:', lists);
    }
  }, [lists, isInitialized]);
  
  // Ajouter une nouvelle liste
  const addList = (listData: Omit<ShoppingList, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newId = `list-${Date.now()}`;
    const newList: ShoppingList = {
      ...listData,
      id: newId,
      createdAt: now,
      updatedAt: now,
    };
    
    setLists(prevLists => [...prevLists, newList]);
    console.log('Liste ajoutée:', newList);
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
      console.log('Liste mise à jour:', updatedList.id, newLists);
      return newLists;
    });
  };
  
  // Supprimer une liste
  const deleteList = (id: string) => {
    setLists(prevLists => {
      const newLists = prevLists.filter(list => list.id !== id);
      console.log('Liste supprimée:', id, newLists);
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