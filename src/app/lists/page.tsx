'use client';

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { Plus, Search, Trash2, Edit, CheckSquare, ListChecks, Clock, CheckCircle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { shoppingLists } from '@/data/shopping-lists';
import { ToastContext } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

type SortOption = 'date' | 'name' | 'items';
type FilterOption = 'all' | 'active' | 'completed';
type TabOption = 'all' | 'active' | 'completed' | 'recent';

export default function ListsPage() {
  const { showToast } = useContext(ToastContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [activeTab, setActiveTab] = useState<TabOption>('all');

  // Configuration des onglets
  const tabs = [
    { id: 'all', label: 'Toutes les listes', icon: ListChecks },
    { id: 'active', label: 'En cours', icon: Clock },
    { id: 'completed', label: 'Terminées', icon: CheckCircle },
    { id: 'recent', label: 'Récentes', icon: Clock }
  ] as const;

  // Filtrage des listes
  const filteredLists = shoppingLists.filter(list => {
    const matchesSearch = list.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'completed' ? list.completed : 
       activeTab === 'active' ? !list.completed :
       activeTab === 'recent' ? new Date(list.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) : true);
    return matchesSearch && matchesTab;
  });

  // Tri des listes
  const sortedLists = [...filteredLists].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'items':
        return b.items.length - a.items.length;
      case 'date':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // Suppression d'une liste
  const handleDeleteList = async (listId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette liste ?')) {
      showToast('Suppression de la liste...', 'loading');
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        showToast('Liste supprimée avec succès', 'success');
      } catch (error) {
        showToast('Erreur lors de la suppression', 'error');
      }
    }
  };

  // Marquer une liste comme terminée
  const handleToggleComplete = async (listId: string) => {
    showToast('Mise à jour de la liste...', 'loading');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('Liste mise à jour avec succès', 'success');
    } catch (error) {
      showToast('Erreur lors de la mise à jour', 'error');
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Mes listes de courses</h1>
          <Link href="/create-list">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle liste
            </Button>
          </Link>
        </div>

        {/* Onglets */}
        <div className="border-b">
          <div className="flex space-x-8">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center space-x-2 pb-4 text-sm font-medium transition-colors hover:text-gray-900',
                    activeTab === tab.id
                      ? 'border-b-2 border-green-500 text-green-600'
                      : 'text-gray-500'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.id !== 'all' && (
                    <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                      {filteredLists.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Barre de recherche */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une liste..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Tri */}
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="date">Date de création</option>
                  <option value="name">Nom</option>
                  <option value="items">Nombre d&apos;articles</option>
                </select>
              </div>
            </div>

            {/* Liste des courses */}
            <div className="space-y-4">
              {sortedLists.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Aucune liste ne correspond à vos critères
                </div>
              ) : (
                sortedLists.map(list => (
                  <div
                    key={list.id}
                    className={`p-4 border rounded-lg ${
                      list.completed ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {list.title}
                        </h3>
                        <div className="mt-1 text-sm text-gray-500">
                          {list.items.length} articles • Créée le {new Date(list.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleComplete(list.id)}
                        >
                          <CheckSquare className={`w-4 h-4 ${
                            list.completed ? 'text-green-500' : 'text-gray-400'
                          }`} />
                        </Button>
                        <Link href={`/lists/${list.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4 text-blue-500" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteList(list.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
} 