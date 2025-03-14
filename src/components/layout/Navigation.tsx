'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useNotificationCount } from '@/hooks/useNotifications';
import { NAVIGATION_ITEMS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NavigationProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  className?: string;
}

export default function Navigation({ isCollapsed, onToggle, isMobile = false, className }: NavigationProps) {
  const pathname = usePathname();
  const { count: notificationCount, showBadges } = useNotificationCount();

  return (
    <div className={cn(
      'border-r bg-white dark:bg-gray-800 transition-all duration-300 h-full',
      isCollapsed ? 'w-[60px]' : 'w-[240px]',
      isMobile && 'fixed inset-y-0 left-0 z-30 shadow-lg transform',
      isMobile && (isCollapsed ? '-translate-x-full' : 'translate-x-0'),
      className
    )}>
      <div className="flex items-center justify-between h-16 px-3 border-b dark:border-gray-700">
        {!isCollapsed && (
          <Link href="/dashboard">
            <h1 className="text-xl font-bold text-green-600 dark:text-green-500">Course Facile</h1>
          </Link>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn('ml-auto', !isCollapsed && 'ml-0')}
          aria-label={isCollapsed ? "Développer le menu" : "Réduire le menu"}
        >
          {isMobile ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>
      <nav className="p-3 space-y-2">
        <TooltipProvider delayDuration={300}>
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            // Pour les liens avec paramètres de requête, vérifier seulement le chemin de base
            const isActive = item.href.includes('?') 
              ? pathname === item.href.split('?')[0] && item.href.includes(pathname + '?')
              : pathname === item.href;
            
            // Vérifier si c'est l'élément de notifications
            const isNotificationItem = item.href === '/notifications';
            
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 relative',
                      isActive && 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-500'
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="truncate">{item.name}</span>
                        {isNotificationItem && showBadges && notificationCount > 0 && (
                          <Badge variant="destructive" className="ml-auto">
                            {notificationCount}
                          </Badge>
                        )}
                      </>
                    )}
                    {isCollapsed && isNotificationItem && showBadges && notificationCount > 0 && (
                      <Badge variant="destructive" className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center p-0">
                        {notificationCount}
                      </Badge>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={cn(isCollapsed ? 'block' : 'hidden')}>
                  <p>{item.name}</p>
                  {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>
    </div>
  );
} 