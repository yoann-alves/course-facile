'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { expirationItems, isExpiringSoon, isExpired } from '@/data/expiration-items';
import { Bell, AlertTriangle, Info } from 'lucide-react';
import { Notification, NotificationContextType } from '@/types';
import { generateId } from '@/lib/utils';

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  // État pour les notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // État pour le nombre de notifications non lues
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
  
  // Fonction pour marquer une notification comme lue
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  // Fonction pour marquer toutes les notifications comme lues
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  // Fonction pour supprimer une notification
  const deleteNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };
  
  // Générer les notifications et calculer le nombre de notifications non lues
  useEffect(() => {
    // Filtrer les produits qui expirent bientôt ou sont expirés
    const expiringSoonItems = expirationItems.filter(item => isExpiringSoon(item));
    const expiredItems = expirationItems.filter(item => isExpired(item));
    
    // Déterminer le niveau d'alerte pour les péremptions
    const hasExpiredItems = expiredItems.length > 0;
    const hasExpiringSoonItems = expiringSoonItems.length > 0;
    
    // Créer un tableau de notifications
    const newNotifications: Notification[] = [];
    
    // Ajouter la notification pour les produits périmés si nécessaire
    if (hasExpiredItems) {
      newNotifications.push({
        id: generateId('notification'),
        title: 'Attention : Produits périmés',
        message: `${expiredItems.length} produit${expiredItems.length > 1 ? 's' : ''} périmé${expiredItems.length > 1 ? 's' : ''}`,
        icon: AlertTriangle,
        bgClass: 'bg-red-50',
        borderClass: 'border-red-200',
        iconBgClass: 'bg-red-100',
        iconColorClass: 'text-red-600',
        textColorClass: 'text-red-600',
        actionColorClass: 'text-red-600',
        href: '/inventory',
        date: new Date().toISOString(),
        read: false
      });
    }
    
    // Ajouter la notification pour les produits qui arrivent à expiration si nécessaire
    if (hasExpiringSoonItems) {
      newNotifications.push({
        id: generateId('notification'),
        title: 'Alerte : Bientôt périmés',
        message: `${expiringSoonItems.length} produit${expiringSoonItems.length > 1 ? 's' : ''} arrive${expiringSoonItems.length > 1 ? 'nt' : ''} à expiration`,
        icon: Bell,
        bgClass: 'bg-amber-50',
        borderClass: 'border-amber-200',
        iconBgClass: 'bg-amber-100',
        iconColorClass: 'text-amber-600',
        textColorClass: 'text-amber-600',
        actionColorClass: 'text-amber-600',
        href: '/inventory',
        date: new Date().toISOString(),
        read: false
      });
    }
    
    // Exemple de notification informative (pour démonstration)
    newNotifications.push({
      id: generateId('notification'),
      title: 'Information',
      message: 'Bienvenue dans votre centre de notifications',
      icon: Info,
      bgClass: 'bg-green-50',
      borderClass: 'border-green-200',
      iconBgClass: 'bg-green-100',
      iconColorClass: 'text-green-600',
      textColorClass: 'text-green-600',
      actionColorClass: 'text-green-600',
      href: '#',
      date: new Date(Date.now() - 86400000).toISOString(), // 1 jour avant
      read: false
    });
    
    // Trier les notifications par date (les plus récentes en premier)
    newNotifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Mettre à jour l'état des notifications
    setNotifications(newNotifications);
    
    // Mettre à jour le nombre de notifications non lues
    setNotificationCount(newNotifications.filter(notification => !notification.read).length);
  }, []);
  
  // Mettre à jour le nombre de notifications non lues lorsque les notifications changent
  useEffect(() => {
    setNotificationCount(notifications.filter(notification => !notification.read).length);
  }, [notifications]);
  
  return (
    <NotificationContext.Provider value={{ 
      notificationCount, 
      showBadges, 
      toggleShowBadges, 
      notifications, 
      markAsRead, 
      markAllAsRead, 
      deleteNotification 
    }}>
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