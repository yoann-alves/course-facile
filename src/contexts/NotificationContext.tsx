'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { expirationItems, isExpiringSoon, isExpired } from '@/data/expiration-items';

type NotificationContextType = {
  notificationCount: number;
  showBadges: boolean;
  toggleShowBadges: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  // État pour le nombre de notifications
  const [notificationCount, setNotificationCount] = useState(0);
  
  // État pour l'affichage des badges (stocké dans localStorage)
  const [showBadges, setShowBadges] = useState(true);
  
  // Charger la préférence d'affichage des badges depuis localStorage au chargement
  useEffect(() => {
    const storedPreference = localStorage.getItem('showNotificationBadges');
    if (storedPreference !== null) {
      setShowBadges(storedPreference === 'true');
    }
  }, []);
  
  // Fonction pour basculer l'affichage des badges
  const toggleShowBadges = () => {
    const newValue = !showBadges;
    setShowBadges(newValue);
    localStorage.setItem('showNotificationBadges', String(newValue));
  };
  
  // Calculer le nombre de notifications
  useEffect(() => {
    // Filtrer les produits qui expirent bientôt ou sont expirés
    const expiringSoonItems = expirationItems.filter(item => isExpiringSoon(item));
    const expiredItems = expirationItems.filter(item => isExpired(item));
    
    // Déterminer le niveau d'alerte pour les péremptions
    const hasExpiredItems = expiredItems.length > 0;
    const hasExpiringSoonItems = expiringSoonItems.length > 0;
    
    // Nombre total de notifications
    const count = (hasExpiredItems ? 1 : 0) + (hasExpiringSoonItems ? 1 : 0) + 1; // +1 pour la notification d'information
    
    setNotificationCount(count);
  }, []);
  
  return (
    <NotificationContext.Provider value={{ notificationCount, showBadges, toggleShowBadges }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
} 