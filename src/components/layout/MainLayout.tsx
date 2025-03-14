'use client';

import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from './Navigation';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  // État pour la sidebar mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // État pour la sidebar desktop (collapsible)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Récupérer la préférence de l'utilisateur depuis localStorage
  useEffect(() => {
    const storedPreference = localStorage.getItem('sidebarCollapsed');
    if (storedPreference !== null) {
      setSidebarCollapsed(storedPreference === 'true');
    }
  }, []);
  
  // Fonction pour basculer l'état de la sidebar mobile
  const toggleMobileSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Fonction pour basculer l'état de la sidebar desktop
  const toggleDesktopSidebar = () => {
    const newValue = !sidebarCollapsed;
    setSidebarCollapsed(newValue);
    localStorage.setItem('sidebarCollapsed', String(newValue));
  };
  
  // Fermer la sidebar mobile lors du changement de page
  useEffect(() => {
    const handleRouteChange = () => {
      setSidebarOpen(false);
    };
    
    // Cleanup pour éviter les fuites de mémoire
    return () => {
      handleRouteChange();
    };
  }, []);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Overlay pour mobile quand le menu est ouvert */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar pour desktop (toujours visible, peut être réduite) */}
      <div className="hidden lg:block">
        <Navigation 
          isCollapsed={sidebarCollapsed} 
          onToggle={toggleDesktopSidebar}
        />
      </div>

      {/* Sidebar pour mobile (conditionnellement visible) */}
      <Navigation 
        isCollapsed={!sidebarOpen} 
        onToggle={toggleMobileSidebar}
        isMobile={true}
        // Cette classe est appliquée uniquement sur mobile
        className="lg:hidden"
      />

      {/* Contenu principal */}
      <div className={cn(
        "flex flex-col flex-1 overflow-hidden",
        sidebarCollapsed ? 'lg:ml-[60px]' : 'lg:ml-[240px]'
      )}>
        {/* Header mobile */}
        <header className="flex items-center justify-between h-16 px-6 border-b dark:border-gray-700 lg:hidden">
          <h1 className="text-xl font-semibold text-green-700 dark:text-green-500">Course Facile</h1>
          <Button 
            variant="ghost"
            size="sm"
            onClick={toggleMobileSidebar}
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-6 h-6 text-green-700 dark:text-green-500" />
          </Button>
        </header>
        
        {/* Contenu de la page */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 