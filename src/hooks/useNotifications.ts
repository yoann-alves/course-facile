import { useContext } from 'react';
import { NotificationContext } from '@/contexts/NotificationContext';
import { Notification, NotificationContextType } from '@/types';

// Hook principal pour accéder au contexte de notification
export function useNotifications(): NotificationContextType {
  const context = useContext(NotificationContext);
  
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  
  return context;
}

// Hook pour les actions sur les notifications
export function useNotificationActions() {
  const { markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  
  return {
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}

// Hook pour le compteur de notifications
export function useNotificationCount() {
  const { notificationCount, showBadges, toggleShowBadges } = useNotifications();
  
  return {
    count: notificationCount,
    showBadges,
    toggleShowBadges,
  };
}

// Hook pour la liste des notifications
export function useNotificationsList() {
  const { notifications } = useNotifications();
  
  const getUnreadNotifications = (): Notification[] => {
    return notifications.filter((notification: Notification) => !notification.read);
  };
  
  const getReadNotifications = (): Notification[] => {
    return notifications.filter((notification: Notification) => notification.read);
  };
  
  const getNotificationsByType = (type: 'error' | 'warning' | 'info' | 'success'): Notification[] => {
    const typeMap = {
      error: (n: Notification) => n.bgClass.includes('red'),
      warning: (n: Notification) => n.bgClass.includes('amber'),
      info: (n: Notification) => n.bgClass.includes('blue'),
      success: (n: Notification) => n.bgClass.includes('green'),
    };
    
    return notifications.filter(typeMap[type]);
  };
  
  return {
    all: notifications,
    unread: getUnreadNotifications(),
    read: getReadNotifications(),
    getByType: getNotificationsByType,
  };
} 