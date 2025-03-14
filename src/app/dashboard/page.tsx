'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Copy, 
  ListChecks, 
  Settings,
  Package
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import ShoppingListCard from '@/components/cards/ShoppingListCard';
import QuickActionCard from '@/components/dashboard/QuickActionCard';
import { getCompletedItemCount } from '@/data/shopping-lists';
import { useShoppingLists } from '@/contexts/ShoppingListContext';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { lists, deleteList } = useShoppingLists();
  
  // Gérer la suppression d'une liste
  const handleDeleteList = (id: string) => {
    deleteList(id);
  };
  
  // Définir les raccourcis rapides
  const quickActions = useMemo(() => [
    {
      id: 'new-list',
      title: 'Nouvelle liste',
      description: 'Créer une nouvelle liste de courses',
      icon: Plus,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      href: '/create-list'
    },
    {
      id: 'all-lists',
      title: 'Toutes les listes',
      description: 'Voir toutes vos listes',
      icon: ListChecks,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      href: '/lists'
    },
    {
      id: 'inventory',
      title: 'Stocks',
      description: 'Gérer votre inventaire',
      icon: Package,
      bgColor: 'bg-amber-100',
      iconColor: 'text-amber-600',
      href: '/inventory'
    },
    {
      id: 'duplicate-list',
      title: 'Dupliquer',
      description: 'Copier une liste existante',
      icon: Copy,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      href: '/create-list?tab=duplicate'
    },
    {
      id: 'settings',
      title: 'Paramètres',
      description: 'Configurer l\'application',
      icon: Settings,
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      href: '/settings'
    }
  ], []);

  return (
    <MainLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Tableau de bord</h1>
            <Link href="/create-list">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Créer une liste
              </Button>
            </Link>
          </div>

          {/* Raccourcis rapides */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {quickActions.map((action) => (
              <QuickActionCard
                key={action.id}
                id={action.id}
                title={action.title}
                description={action.description}
                icon={action.icon}
                bgColor={action.bgColor}
                iconColor={action.iconColor}
                href={action.href}
              />
            ))}
          </div>

          {/* Listes de courses */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Mes listes de courses</h2>
            {lists.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Vous n&apos;avez pas encore de liste de courses.</p>
                <Link href="/create-list" className="mt-4 inline-block text-green-600 hover:text-green-700">
                  Créer votre première liste
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lists.map(list => (
                  <ShoppingListCard
                    key={list.id}
                    id={list.id}
                    title={list.title}
                    itemCount={list.items.length}
                    completedCount={getCompletedItemCount(list)}
                    createdAt={list.createdAt}
                    onDelete={handleDeleteList}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 