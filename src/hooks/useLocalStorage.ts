import { useState, useEffect, useCallback } from 'react';
import { isClient, getFromLocalStorage, setToLocalStorage } from '@/lib/utils';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Fonction pour obtenir la valeur initiale du localStorage ou utiliser la valeur par défaut
  const getInitialValue = useCallback(() => {
    if (!isClient) {
      return initialValue;
    }
    
    return getFromLocalStorage<T>(key, initialValue);
  }, [key, initialValue]);
  
  // Initialiser l'état avec la valeur du localStorage ou la valeur par défaut
  const [storedValue, setStoredValue] = useState<T>(getInitialValue);
  
  // Fonction pour mettre à jour la valeur dans le localStorage et l'état
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Permettre à la valeur d'être une fonction pour la même API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Sauvegarder dans l'état
      setStoredValue(valueToStore);
      
      // Sauvegarder dans localStorage
      if (isClient) {
        setToLocalStorage(key, valueToStore);
      }
    } catch (error) {
      console.error(`Erreur lors de la sauvegarde dans localStorage pour la clé "${key}":`, error);
    }
  }, [key, storedValue]);
  
  // Synchroniser l'état avec localStorage quand la clé change
  useEffect(() => {
    setStoredValue(getInitialValue());
  }, [key, getInitialValue]);
  
  // Écouter les changements de localStorage dans d'autres onglets/fenêtres
  useEffect(() => {
    if (!isClient) {
      return;
    }
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue) as T;
          setStoredValue(newValue);
        } catch (error) {
          console.error(`Erreur lors de la lecture de localStorage pour la clé "${key}":`, error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);
  
  return [storedValue, setValue] as const;
} 