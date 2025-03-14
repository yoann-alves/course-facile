'use client';

import React, { useState, useContext, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { ToastContext } from '@/components/ui/toast';
import ShoppingListCard from '@/components/cards/ShoppingListCard';
import SearchAndFilterBar from '@/components/filters/SearchAndFilterBar';
import TabFilters, { FilterTab } from '@/components/filters/TabFilters';
import { useShoppingLists } from '@/contexts/ShoppingListContext';
import { FilterType } from '@/types';

export default function ListsPage() {
  const router = useRouter();
  const { showToast } = useContext(ToastContext);
  const { lists, deleteList } = useShoppingLists();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Configuration des onglets
  const tabs: FilterTab[] = useMemo(() => [
    {
      id: 'all',
      label: 'Toutes',
      count: lists.length
    },
    {
      id: 'active',
      label: 'En cours',
      count: lists.filter(list => !list.completed).length
    },
    {
      id: 'completed',
      label: 'Terminées',
      count: lists.filter(list => list.completed).length
    }
  ], [lists]);

  // Filtrer les listes
  const filteredLists = useMemo(() => {
    return lists.filter((list) => {
      // Vérifier si la liste correspond au filtre actif
      const matchesStatus =
        activeFilter === 'all' ||
        (activeFilter === 'active' && !list.completed) ||
        (activeFilter === 'completed' && list.completed);

      // Vérifier si la liste correspond au terme de recherche
      const matchesSearch =
        searchTerm === '' ||
        list.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        list.items.some((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchesStatus && matchesSearch;
    });
  }, [lists, activeFilter, searchTerm]);

  // Trier les listes
  const sortedLists = useMemo(() => {
    return [...filteredLists].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [filteredLists, sortOrder]);

  // Suppression d'une liste
  const handleDeleteList = useCallback(async (listId: string) => {
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
  }, [deleteList, showToast]);

  // Inverser l'ordre de tri
  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Mes listes de courses</h1>
            <Button onClick={() => router.push('/lists/new')}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle liste
            </Button>
          </div>

          <div className="space-y-4">
            {/* Filtres par onglets */}
            <TabFilters 
              tabs={tabs}
              activeTab={activeFilter}
              onTabChange={(tabId) => setActiveFilter(tabId as FilterType)}
            />

            {/* Barre de recherche et tri */}
            <SearchAndFilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortOrder={sortOrder}
              onSortToggle={toggleSortOrder}
              sortLabel={{
                asc: 'Plus anciennes',
                desc: 'Plus récentes'
              }}
              searchPlaceholder="Rechercher une liste ou un produit..."
            />

            {/* Liste des listes de courses */}
            <div>
              {sortedLists.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500 mb-4">
                    {searchTerm
                      ? "Aucune liste ne correspond à votre recherche"
                      : activeFilter !== 'all'
                      ? `Aucune liste ${activeFilter === 'completed' ? 'terminée' : 'en cours'}`
                      : "Vous n'avez pas encore créé de liste"}
                  </p>
                  <Button onClick={() => router.push('/lists/new')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Créer une liste
                  </Button>
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
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 