'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, AlertTriangle, Trash2, Search, Package, RefreshCw, Calendar, MapPin, MoreVertical } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { products, productInstances, isExpired, daysUntilExpiration, getProductDetails } from '@/data/products';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function InventoryPage() {
  // États pour la recherche et le filtrage
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [showExpiredOnly, setShowExpiredOnly] = useState(false);
  const [showExpiringSoonOnly, setShowExpiringSoonOnly] = useState(false);
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  // Récupérer toutes les catégories uniques
  const allCategories = Array.from(new Set(products.map(p => p.category)));
  
  // Récupérer tous les emplacements uniques
  const allLocations = Array.from(new Set(productInstances
    .filter(pi => pi.location)
    .map(pi => pi.location as string)
  ));

  // Filtrer les instances de produits
  const filteredInstances = productInstances.filter(instance => {
    const product = getProductDetails(instance);
    if (!product) return false;

    // Filtre de recherche
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Filtre par catégorie
    if (categoryFilter && product.category !== categoryFilter) {
      return false;
    }

    // Filtre par emplacement
    if (locationFilter && instance.location !== locationFilter) {
      return false;
    }

    // Filtre pour les produits périmés
    if (showExpiredOnly && !isExpired(instance)) {
      return false;
    }

    // Filtre pour les produits qui expirent bientôt (dans les 7 jours)
    if (showExpiringSoonOnly && (!instance.expirationDate || daysUntilExpiration(instance) > 7 || isExpired(instance))) {
      return false;
    }

    return true;
  });

  // Trier les instances par date d'expiration (les plus proches en premier)
  const sortedInstances = [...filteredInstances].sort((a, b) => {
    // Si un produit n'a pas de date d'expiration, le mettre à la fin
    if (!a.expirationDate) return 1;
    if (!b.expirationDate) return -1;
    
    return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
  });

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

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
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="">Toutes les catégories</option>
                    {allCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    <option value="">Tous les emplacements</option>
                    {allLocations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant={showExpiredOnly ? "default" : "outline"} 
                    size="sm"
                    onClick={() => {
                      setShowExpiredOnly(!showExpiredOnly);
                      if (!showExpiredOnly) setShowExpiringSoonOnly(false);
                    }}
                    className={showExpiredOnly ? "bg-red-500 hover:bg-red-600" : ""}
                  >
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Périmés
                  </Button>
                  <Button 
                    variant={showExpiringSoonOnly ? "default" : "outline"} 
                    size="sm"
                    onClick={() => {
                      setShowExpiringSoonOnly(!showExpiringSoonOnly);
                      if (!showExpiringSoonOnly) setShowExpiredOnly(false);
                    }}
                    className={showExpiringSoonOnly ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    Bientôt
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des produits */}
          <Card>
            <CardHeader>
              <CardTitle>Inventaire ({sortedInstances.length} produits)</CardTitle>
            </CardHeader>
            <CardContent>
              {sortedInstances.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">Aucun produit trouvé</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Ajoutez des produits à votre inventaire ou modifiez vos filtres.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {sortedInstances.map(instance => {
                    const product = getProductDetails(instance);
                    if (!product) return null;
                    
                    const expired = instance.expirationDate ? isExpired(instance) : false;
                    const daysLeft = instance.expirationDate ? daysUntilExpiration(instance) : null;
                    
                    return (
                      <div 
                        key={instance.id} 
                        className={cn(
                          "relative border rounded-lg overflow-hidden transition-all hover:shadow-md",
                          expired ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" : 
                          daysLeft !== null && daysLeft <= 7 ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800" : 
                          "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        )}
                      >
                        <Link 
                          href={`/products/${product.id}`}
                          className="block p-4"
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">{product.name}</h3>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={(e: React.MouseEvent) => e.preventDefault()}>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Mettre à jour
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-500 focus:text-red-500">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <div className="mt-2 flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400">
                              <span className="flex items-center">
                                <Package className="w-4 h-4 mr-1 flex-shrink-0" />
                                <span className="truncate">{instance.quantity} {instance.unit}</span>
                              </span>
                              {instance.location && (
                                <span className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                                  <span className="truncate">{instance.location}</span>
                                </span>
                              )}
                              {instance.expirationDate && (
                                <span className={cn(
                                  "flex items-center",
                                  expired ? "text-red-500" : 
                                  daysLeft !== null && daysLeft <= 7 ? "text-yellow-500" : ""
                                )}>
                                  <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                                  <span className="truncate">
                                    {expired 
                                      ? `Expiré depuis le ${formatDate(instance.expirationDate)}` 
                                      : `Expire le ${formatDate(instance.expirationDate)}${daysLeft !== null ? ` (${daysLeft} j)` : ''}`
                                    }
                                  </span>
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
} 