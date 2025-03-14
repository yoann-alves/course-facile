import { LucideIcon, LayoutDashboard, List, Bell, Package, Settings } from 'lucide-react';

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

export const ROUTES = {
  DASHBOARD: '/dashboard',
  LISTS: '/lists',
  LISTS_ACTIVE: '/lists?tab=active',
  NOTIFICATIONS: '/notifications',
  INVENTORY: '/inventory',
  SETTINGS: '/settings',
};

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { 
    name: 'Tableau de bord', 
    href: ROUTES.DASHBOARD, 
    icon: LayoutDashboard,
    description: 'Vue d\'ensemble de vos listes et activités récentes'
  },
  { 
    name: 'Toutes les listes', 
    href: ROUTES.LISTS, 
    icon: List,
    description: 'Gérer toutes vos listes de courses'
  },
  { 
    name: 'Notifications', 
    href: ROUTES.NOTIFICATIONS, 
    icon: Bell,
    description: 'Consulter vos notifications et alertes'
  },
  { 
    name: 'Gestion des stocks', 
    href: ROUTES.INVENTORY, 
    icon: Package,
    description: 'Gérer vos produits et dates de péremption'
  },
  { 
    name: 'Paramètres', 
    href: ROUTES.SETTINGS, 
    icon: Settings,
    description: 'Configurer votre application'
  },
];

// Constantes pour les couleurs et styles
export const THEME = {
  PRIMARY: 'green',
  SECONDARY: 'gray',
  DANGER: 'red',
  WARNING: 'amber',
  INFO: 'blue',
  SUCCESS: 'green',
};

// Constantes pour les délais
export const TIMEOUTS = {
  TOAST: 3000,
  LOADING: 1000,
}; 