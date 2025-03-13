'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Calendar, Settings, List, Bell } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { notificationCount, showBadges } = useNotifications();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Overlay pour mobile quand le menu est ouvert */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b dark:border-gray-700">
          <h1 className="text-xl font-semibold text-green-700 dark:text-green-500">Course Facile</h1>
          <button 
            className="p-1 rounded-md lg:hidden focus:outline-none focus:ring-2 focus:ring-green-600"
            onClick={toggleSidebar}
          >
            <X className="w-6 h-6 text-green-700 dark:text-green-500" />
          </button>
        </div>
        <nav className="px-4 py-6">
          <ul className="space-y-4">
            <li>
              <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-500">
                <Home className="w-5 h-5 mr-3" />
                Tableau de bord
              </Link>
            </li>
            <li>
              <Link href="/lists" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-500">
                <List className="w-5 h-5 mr-3" />
                Toutes les listes
              </Link>
            </li>
            <li>
              <Link href="/notifications" className="flex items-center justify-between px-4 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-500">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-3" />
                  Notifications
                </div>
                {showBadges && notificationCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">
                    {notificationCount}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link href="/manage-expirations" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-500">
                <Calendar className="w-5 h-5 mr-3" />
                Gérer les péremptions
              </Link>
            </li>
            <li>
              <Link href="/settings" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-500">
                <Settings className="w-5 h-5 mr-3" />
                Paramètres
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Contenu principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between h-16 px-6 border-b dark:border-gray-700 lg:hidden">
          <h1 className="text-xl font-semibold text-green-700 dark:text-green-500">Course Facile</h1>
          <button 
            className="p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            onClick={toggleSidebar}
          >
            <Menu className="w-6 h-6 text-green-700 dark:text-green-500" />
          </button>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 