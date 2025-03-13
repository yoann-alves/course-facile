'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, AlertTriangle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import ShoppingListCard from '@/components/ShoppingListCard';
import { Button } from '@/components/ui/button';
import { shoppingLists, getCompletedItemCount } from '@/data/shopping-lists';
import { expirationItems, isExpiringSoon, isExpired } from '@/data/expiration-items';

export default function DashboardPage() {
  // Simuler la suppression d'une liste
  const handleDeleteList = (id: string) => {
    console.log(`Suppression de la liste ${id}`);
    // Dans une vraie application, nous supprimerions la liste ici
  };

  // Filtrer les produits qui expirent bientôt ou sont expirés
  const expiringSoonItems = expirationItems.filter(item => isExpiringSoon(item.expirationDate));
  const expiredItems = expirationItems.filter(item => isExpired(item.expirationDate));

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <Link href="/create-list">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle liste
            </Button>
          </Link>
        </div>

        {/* Notifications de péremption */}
        {(expiringSoonItems.length > 0 || expiredItems.length > 0) && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
              <h2 className="text-lg font-semibold text-amber-700">Alertes de péremption</h2>
            </div>
            <ul className="space-y-2">
              {expiredItems.map(item => (
                <li key={item.id} className="text-red-600 text-sm">
                  {item.name} ({item.quantity} {item.unit}) - <span className="font-semibold">EXPIRÉ</span>
                </li>
              ))}
              {expiringSoonItems.map(item => (
                <li key={item.id} className="text-amber-600 text-sm">
                  {item.name} ({item.quantity} {item.unit}) - Expire le {new Date(item.expirationDate).toLocaleDateString('fr-FR')}
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <Link href="/manage-expirations">
                <Button variant="outline" size="sm">
                  Gérer les péremptions
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Listes de courses */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Mes listes de courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shoppingLists.map(list => (
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
        </div>
      </div>
    </MainLayout>
  );
} 