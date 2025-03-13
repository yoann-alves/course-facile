'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, ShoppingCart, Calendar, Settings, List } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Overlay pour mobile quand le menu est ouvert */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-semibold text-green-700">Course Facile</h1>
          <button 
            className="p-1 rounded-md lg:hidden focus:outline-none focus:ring-2 focus:ring-green-600"
            onClick={toggleSidebar}
          >
            <X className="w-6 h-6 text-green-700" />
          </button>
        </div>
        <nav className="px-4 py-6">
          <ul className="space-y-4">
            <li>
              <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-green-50 hover:text-green-700">
                <Home className="w-5 h-5 mr-3" />
                Tableau de bord
              </Link>
            </li>
            <li>
              <Link href="/lists" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-green-50 hover:text-green-700">
                <List className="w-5 h-5 mr-3" />
                Toutes les listes
              </Link>
            </li>
            <li>
              <Link href="/create-list" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-green-50 hover:text-green-700">
                <ShoppingCart className="w-5 h-5 mr-3" />
                Créer une liste
              </Link>
            </li>
            <li>
              <Link href="/manage-expirations" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-green-50 hover:text-green-700">
                <Calendar className="w-5 h-5 mr-3" />
                Gérer les péremptions
              </Link>
            </li>
            <li>
              <Link href="/settings" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-green-50 hover:text-green-700">
                <Settings className="w-5 h-5 mr-3" />
                Paramètres
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Contenu principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between h-16 px-6 border-b lg:hidden">
          <h1 className="text-xl font-semibold text-green-700">Course Facile</h1>
          <button 
            className="p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            onClick={toggleSidebar}
          >
            <Menu className="w-6 h-6 text-green-700" />
          </button>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 