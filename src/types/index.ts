import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

// Types pour la navigation
export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

// Types pour les thèmes
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Types pour les notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  icon: ReactNode | LucideIcon;
  bgClass: string;
  borderClass: string;
  iconBgClass: string;
  iconColorClass: string;
  textColorClass: string;
  actionColorClass: string;
  href: string;
  date: string;
  read?: boolean;
}

export interface NotificationContextType {
  notificationCount: number;
  showBadges: boolean;
  toggleShowBadges: () => void;
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
}

// Types pour les listes de courses
export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  checked: boolean;
  price?: number;
}

export interface ShoppingList {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  items: ShoppingListItem[];
  completed: boolean;
}

export interface ShoppingListContextType {
  lists: ShoppingList[];
  addList: (list: Omit<ShoppingList, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateList: (list: ShoppingList) => void;
  deleteList: (id: string) => void;
  getList: (id: string) => ShoppingList | undefined;
}

// Types pour les produits
export interface ProductNutritionalInfo {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  defaultUnit: string;
  description?: string;
  imageUrl?: string;
  nutritionalInfo?: ProductNutritionalInfo;
  averagePrice?: number;
}

export interface ProductInstance {
  id: string;
  productId: string;
  quantity: number;
  unit: string;
  purchaseDate: string;
  expirationDate: string;
  location?: string;
  opened?: boolean;
  notes?: string;
}

// Types pour les toasts
export type ToastType = 'success' | 'error' | 'info' | 'loading';

export interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

// Types pour les filtres
export type FilterType = 'all' | 'active' | 'completed' | 'recent';
export type SortType = 'date' | 'name' | 'count';
export type CategoryFilterType = string | null;
export type LocationFilterType = string | null;
export type ExpirationFilterType = 'all' | 'expired' | 'expiring-soon' | 'valid'; 