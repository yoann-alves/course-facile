'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ThemeContextType } from '@/types';
import { isClient, getFromLocalStorage, setToLocalStorage } from '@/lib/utils';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Récupérer le thème depuis le localStorage ou utiliser 'system' par défaut
  const [theme, setTheme] = useState<Theme>('system');
  
  // Effet pour charger le thème depuis localStorage au montage du composant
  useEffect(() => {
    if (isClient) {
      const storedTheme = getFromLocalStorage<Theme>('theme', 'system');
      setTheme(storedTheme);
    }
  }, []);
  
  // Effet pour appliquer le thème au document
  useEffect(() => {
    if (!isClient) return;
    
    const root = window.document.documentElement;
    
    // Supprimer les classes de thème existantes
    root.classList.remove('light', 'dark');
    
    // Appliquer le thème
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    // Sauvegarder le thème dans localStorage
    setToLocalStorage('theme', theme);
  }, [theme]);
  
  // Effet pour écouter les changements de préférence système
  useEffect(() => {
    if (!isClient || theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(mediaQuery.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);
  
  const value = {
    theme,
    setTheme,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 