'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Plus, Package, RefreshCw, Calendar, MapPin, MoreVertical } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { products, productInstances, isExpired, daysUntilExpiration, getProductDetails, ProductInstance } from '@/data/products';
import { cn } from '@/lib/utils';
import { useFormatDate } from '@/hooks/useFormatDate';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchAndFilterBar from '@/components/filters/SearchAndFilterBar';
import AdvancedFilters, { FilterGroup } from '@/components/filters/AdvancedFilters';
import { useAdvancedFilters } from '@/hooks/useAdvancedFilters';

export default function InventoryPage() {
  // États pour la recherche et le tri
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  
  // Utiliser le hook de formatage des dates
  const dateFormatter = useFormatDate();

  // Récupérer toutes les catégories uniques
  const allCategories = useMemo(() => 
    Array.from(new Set(products.map(p => p.category))),
    []
  );
  
  // Récupérer tous les emplacements uniques
  const allLocations = useMemo(() => 
    Array.from(new Set(productInstances
      .filter(pi => pi.location)
      .map(pi => pi.location as string)
    )),
    []
  );

  // Configurer les filtres avancés
  const initialFilterGroups: FilterGroup[] = useMemo(() => [
    {
      id: 'categories',
      label: 'Catégories',
      options: allCategories.map(category => ({
        id: category,
        label: category,
        checked: false
      }))
    },
    {
      id: 'locations',
      label: 'Emplacements',
      options: allLocations.map(location => ({
        id: location,
        label: location,
        checked: false
      }))
    },
    {
      id: 'status',
      label: 'Statut',
      options: [
        { id: 'expired', label: 'Périmés', checked: false },
        { id: 'expiringSoon', label: 'Périmant bientôt', checked: false }
      ]
    }
  ], [allCategories, allLocations]);

  // Utiliser le hook de filtres avancés
  const {
    filterGroups,
    activeFiltersCount,
    handleFilterChange,
    resetFilters,
  } = useAdvancedFilters({
    initialFilterGroups,
    persistKey: 'inventory-filters'
  });

  // Fonction pour filtrer les produits en fonction des filtres avancés
  const filterProductsByAdvancedFilters = useCallback((instance: ProductInstance, groups: FilterGroup[]) => {
    const product = getProductDetails(instance);
    if (!product) return false;

    // Vérifier les filtres de catégorie
    const categoryGroup = groups.find(g => g.id === 'categories');
    const selectedCategories = categoryGroup?.options.filter(o => o.checked).map(o => o.id);
    if (selectedCategories && selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }

    // Vérifier les filtres d'emplacement
    const locationGroup = groups.find(g => g.id === 'locations');
    const selectedLocations = locationGroup?.options.filter(o => o.checked).map(o => o.id);
    if (selectedLocations && selectedLocations.length > 0 && !selectedLocations.includes(instance.location || '')) {
      return false;
    }

    // Vérifier les filtres de statut
    const statusGroup = groups.find(g => g.id === 'status');
    const showExpired = statusGroup?.options.find(o => o.id === 'expired')?.checked;
    const showExpiringSoon = statusGroup?.options.find(o => o.id === 'expiringSoon')?.checked;

    if (showExpired && !isExpired(instance)) {
      return false;
    }

    if (showExpiringSoon && (!instance.expirationDate || daysUntilExpiration(instance) > 7 || isExpired(instance))) {
      return false;
    }

    return true;
  }, []);

  // Filtrer les instances de produits
  const filteredInstances = useMemo(() => {
    // Filtrer manuellement les instances en fonction des filtres avancés et de la recherche
    return productInstances.filter(instance => {
      // Vérifier si l'instance passe les filtres avancés
      if (!filterProductsByAdvancedFilters(instance, filterGroups)) {
        return false;
      }
      
      // Vérifier le filtre de recherche
      const product = getProductDetails(instance);
      if (!product) return false;
      
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [filterGroups, filterProductsByAdvancedFilters, searchTerm]);

  // Trier les instances par date d'expiration
  const sortedInstances = useMemo(() => {
    return [...filteredInstances].sort((a, b) => {
      // Si un produit n'a pas de date d'expiration, le mettre à la fin
      if (!a.expirationDate) return 1;
      if (!b.expirationDate) return -1;
      
      const dateA = new Date(a.expirationDate).getTime();
      const dateB = new Date(b.expirationDate).getTime();
      
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [filteredInstances, sortOrder]);

  // Fonction pour inverser l'ordre de tri
  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Gestion des Stocks</h1>
            <Button onClick={() => setShowAddProductForm(!showAddProductForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un produit
            </Button>
          </div>

          {/* Formulaire d'ajout de produit */}
          {showAddProductForm && (
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau produit</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nom du produit
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        placeholder="Ex: Lait, Papier toilette..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Catégorie
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md">
                        <option value="">Sélectionner une catégorie</option>
                        {allCategories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                        <option value="new">+ Nouvelle catégorie</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Quantité
                      </label>
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Unité
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        placeholder="Ex: kg, L, pièces..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Emplacement
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md">
                        <option value="">Sélectionner un emplacement</option>
                        {allLocations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                        <option value="new">+ Nouvel emplacement</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date d&apos;expiration (optionnelle)
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowAddProductForm(false)}>
                      Annuler
                    </Button>
                    <Button type="submit">
                      Ajouter
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Filtres et recherche */}
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-1">
              <SearchAndFilterBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                sortOrder={sortOrder}
                onSortToggle={toggleSortOrder}
                sortLabel={{
                  asc: 'Date d\'expiration croissante',
                  desc: 'Date d\'expiration décroissante'
                }}
                searchPlaceholder="Rechercher un produit..."
              />
            </div>
            <AdvancedFilters
              filterGroups={filterGroups}
              onFilterChange={handleFilterChange}
              onResetFilters={resetFilters}
              activeFiltersCount={activeFiltersCount}
            />
          </div>

          {/* Liste des produits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedInstances.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500 mb-4">
                  Aucun produit ne correspond à vos critères de recherche
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              sortedInstances.map(instance => {
                const product = getProductDetails(instance);
                if (!product) return null;
                
                const isProductExpired = isExpired(instance);
                const daysUntilExpiry = instance.expirationDate ? daysUntilExpiration(instance) : null;
                const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry <= 7 && daysUntilExpiry > 0;
                
                return (
                  <Link href={`/products/${instance.id}`} key={instance.id}>
                    <Card className={cn(
                      "hover:shadow-md transition-all duration-200 cursor-pointer border-l-4",
                      isProductExpired ? "border-l-red-500" : 
                      isExpiringSoon ? "border-l-yellow-500" : 
                      "border-l-green-500"
                    )}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">{product.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {instance.quantity} {instance.unit}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Modifier</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-sm">
                            <Package className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{product.category}</span>
                          </div>
                          
                          {instance.location && (
                            <div className="flex items-center text-sm">
                              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                              <span>{instance.location}</span>
                            </div>
                          )}
                          
                          {instance.expirationDate && (
                            <div className={cn(
                              "flex items-center text-sm",
                              isProductExpired ? "text-red-600 dark:text-red-400" : 
                              isExpiringSoon ? "text-yellow-600 dark:text-yellow-400" : 
                              ""
                            )}>
                              <Calendar className={cn(
                                "w-4 h-4 mr-2",
                                isProductExpired ? "text-red-600 dark:text-red-400" : 
                                isExpiringSoon ? "text-yellow-600 dark:text-yellow-400" : 
                                "text-gray-400"
                              )} />
                              <span>
                                {isProductExpired ? (
                                  <span className="font-medium">Périmé depuis le {dateFormatter.format(instance.expirationDate)}</span>
                                ) : isExpiringSoon ? (
                                  <span className="font-medium">Expire {daysUntilExpiry === 1 ? 'demain' : `dans ${daysUntilExpiry} jours`}</span>
                                ) : (
                                  <span>Expire le {dateFormatter.format(instance.expirationDate)}</span>
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 