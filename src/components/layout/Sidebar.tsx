'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  Menu,
  List,
  Clock,
  Bell
} from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const navigation: NavigationItem[] = [
  { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Toutes les listes', href: '/lists', icon: List },
  { name: 'Listes en cours', href: '/lists?tab=active', icon: Clock },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Gestion des stocks', href: '/inventory', icon: Package },
  { name: 'Paramètres', href: '/settings', icon: Settings },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { notificationCount, showBadges } = useNotifications();

  return (
    <div className={cn(
      'border-r bg-gray-50/40 transition-all duration-300',
      isCollapsed ? 'w-[60px]' : 'w-[240px]'
    )}>
      <div className="flex h-16 items-center justify-between px-3 border-b">
        {!isCollapsed && (
          <Link href="/dashboard">
            <h1 className="text-xl font-bold text-green-600">Course Facile</h1>
          </Link>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn('ml-auto', !isCollapsed && 'ml-0')}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <nav className="p-3 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          // Pour les liens avec paramètres de requête, vérifier seulement le chemin de base
          const isActive = item.href.includes('?') 
            ? pathname === item.href.split('?')[0] && item.href.includes(pathname + '?')
            : pathname === item.href;
          
          // Vérifier si c'est l'élément de notifications
          const isNotificationItem = item.href === '/notifications';
            
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:hover:text-gray-100',
                isActive && 'bg-green-50 text-green-600'
              )}
            >
              <Icon className="h-5 w-5" />
              {!isCollapsed && (
                <>
                  <span>{item.name}</span>
                  {isNotificationItem && showBadges && notificationCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">
                      {notificationCount}
                    </span>
                  )}
                </>
              )}
              {isCollapsed && isNotificationItem && showBadges && notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 