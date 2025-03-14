'use client';

import React, { useState, useContext } from 'react';
import { Plus, Search, SortAsc, SortDesc, ListChecks, Clock, CheckCircle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ToastContext } from '@/components/ui/toast';
import { cn } from '@/lib/utils';
import ShoppingListCard from '@/components/ShoppingListCard';
import Link from 'next/link';
import { useShoppingList } from '@/hooks/useShoppingList';

type TabOption = 'all' | 'active' | 'completed';

export default function ListsPage() {
  const { showToast } = useContext(ToastContext);
  const { lists, deleteList } = useShoppingList();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [activeTab, setActiveTab] = useState<TabOption>('all');

  // Configuration des onglets
  const tabs = [
    { id: 'all', label: 'Toutes', icon: ListChecks },
    { id: 'active', label: 'En cours', icon: Clock },
    { id: 'completed', label: 'Terminées', icon: CheckCircle },
  ];

  // Filtrage des listes
  const filteredLists = lists.filter(list => {
    const matchesSearch = list.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      list.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'completed' ? list.completed : 
      !list.completed);
    return matchesSearch && matchesTab;
  });

  // Tri des listes
  const sortedLists = [...filteredLists].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Suppression d'une liste
  const handleDeleteList = async (listId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette liste ?')) {
      showToast('Suppression de la liste...', 'loading');
      
      try {
        // Simulation d'un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Utiliser la fonction deleteList du contexte
        deleteList(listId);
        
        showToast('Liste supprimée avec succès', 'success');
      } catch {
        showToast('Erreur lors de la suppression', 'error');
      }
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Mes listes de courses</h1>
            <Link href="/create-list">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle liste
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="p-6">
              {/* Onglets */}
              <div className="flex border-b mb-6">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={cn(
                      "flex items-center px-4 py-2 border-b-2 font-medium text-sm",
                      activeTab === tab.id
                        ? "border-green-500 text-green-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    )}
                    onClick={() => setActiveTab(tab.id as TabOption)}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Filtres et tri */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Recherche */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Rechercher une liste ou un produit..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Tri */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="flex items-center"
                  >
                    {sortOrder === 'asc' ? (
                      <>
                        <SortAsc className="mr-2 h-4 w-4" /> Plus anciennes
                      </>
                    ) : (
                      <>
                        <SortDesc className="mr-2 h-4 w-4" /> Plus récentes
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Liste des listes de courses */}
              <div>
                {sortedLists.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-4">
                      {searchTerm
                        ? "Aucune liste ne correspond à votre recherche"
                        : activeTab !== 'all'
                        ? `Aucune liste ${activeTab === 'completed' ? 'terminée' : 'en cours'}`
                        : "Vous n'avez pas encore créé de liste"}
                    </p>
                    <Link href="/create-list">
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Créer une liste
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedLists.map((list) => (
                      <ShoppingListCard
                        key={list.id}
                        id={list.id}
                        title={list.title}
                        itemCount={list.items.length}
                        completedCount={list.items.filter(item => item.checked).length}
                        createdAt={list.createdAt}
                        onDelete={handleDeleteList}
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
} 