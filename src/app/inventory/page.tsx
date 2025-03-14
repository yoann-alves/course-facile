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
import TabFilters from '@/components/filters/TabFilters';
import { useFilters } from '@/hooks/useFilters';

export default function InventoryPage() {
  // États pour la recherche et le tri
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

  // Définir les statuts d'expiration
  const expirationStatuses = [
    { id: 'all', label: 'Tous' },
    { id: 'expired', label: 'Périmés' },
    { id: 'expiring-soon', label: 'Bientôt périmés' },
    { id: 'valid', label: 'Valides' }
  ];

  // État pour le filtre d'expiration actif
  const [activeExpirationFilter, setActiveExpirationFilter] = useState('all');

  // Utiliser le hook de filtres
  const {
    searchTerm,
    sortOrder,
    sortField,
    filteredItems,
    filterStats,
    setSearchTerm,
    toggleSortOrder,
    changeSortField
  } = useFilters(productInstances, {
    initialFilters: {},
    initialSortOrder: 'asc',
    initialSortField: 'expirationDate',
    searchFields: ['productId'],
    persistKey: 'inventory-filters',
    filterFn: (item, filters, searchTerm) => {
      // Filtrer par statut d'expiration
      if (activeExpirationFilter === 'expired' && !isExpired(item.expirationDate)) return false;
      if (activeExpirationFilter === 'expiring-soon' && (isExpired(item.expirationDate) || daysUntilExpiration(item.expirationDate) > 7)) return false;
      if (activeExpirationFilter === 'valid' && (isExpired(item.expirationDate) || daysUntilExpiration(item.expirationDate) <= 7)) return false;
      
      // Filtrer par terme de recherche
      if (searchTerm) {
        const product = getProductDetails(item.productId);
        if (!product || !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
      }
      
      return true;
    }
  });

  // Calculer les compteurs pour les onglets
  const tabCounts = useMemo(() => {
    return {
      all: productInstances.length,
      expired: productInstances.filter(pi => isExpired(pi.expirationDate)).length,
      'expiring-soon': productInstances.filter(pi => !isExpired(pi.expirationDate) && daysUntilExpiration(pi.expirationDate) <= 7).length,
      valid: productInstances.filter(pi => !isExpired(pi.expirationDate) && daysUntilExpiration(pi.expirationDate) > 7).length
    };
  }, [productInstances]);

  // Fonction pour obtenir la classe de couleur en fonction de l'état d'expiration
  const getExpirationColorClass = useCallback((expirationDate: string) => {
    if (isExpired(expirationDate)) {
      return 'text-red-600 dark:text-red-400';
    }
    
    const days = daysUntilExpiration(expirationDate);
    if (days <= 7) {
      return 'text-amber-600 dark:text-amber-400';
    }
    
    return 'text-green-600 dark:text-green-400';
  }, []);

  // Fonction pour obtenir le texte d'expiration
  const getExpirationText = useCallback((expirationDate: string) => {
    if (isExpired(expirationDate)) {
      return 'Périmé';
    }
    
    const days = daysUntilExpiration(expirationDate);
    if (days <= 7) {
      return `Expire dans ${days} jour${days > 1 ? 's' : ''}`;
    }
    
    return 'Valide';
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Inventaire</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gérez vos produits et suivez les dates de péremption
            </p>
          </div>
          <Button 
            onClick={() => setShowAddProductForm(true)}
            className="mt-4 md:mt-0"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un produit
          </Button>
        </div>

        <div className="mb-6">
          <TabFilters
            tabs={[
              { id: 'all', label: 'Tous', count: tabCounts.all },
              { id: 'expired', label: 'Périmés', count: tabCounts.expired },
              { id: 'expiring-soon', label: 'Bientôt périmés', count: tabCounts['expiring-soon'] },
              { id: 'valid', label: 'Valides', count: tabCounts.valid }
            ]}
            activeTab={activeExpirationFilter}
            onTabChange={setActiveExpirationFilter}
            variant="pills"
            showBadges
          />
        </div>

        <div className="mb-6">
          <SearchAndFilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortOrder={sortOrder}
            onSortToggle={toggleSortOrder}
            sortField={sortField as string}
            onSortFieldChange={changeSortField as (field: string) => void}
            sortFields={[
              { id: 'expirationDate', label: 'Date d\'expiration' },
              { id: 'purchaseDate', label: 'Date d\'achat' }
            ]}
            searchPlaceholder="Rechercher un produit..."
            filterStats={filterStats}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((instance) => {
            const product = getProductDetails(instance.productId);
            if (!product) return null;
            
            return (
              <Card key={instance.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link href={`/products/${product.id}`} className="text-lg font-medium hover:underline">
                          {product.name}
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Modifier</DropdownMenuItem>
                          <DropdownMenuItem>Supprimer</DropdownMenuItem>
                          <DropdownMenuItem>Marquer comme utilisé</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <Package className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>{instance.quantity} {instance.unit}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Calendar className={cn("mr-2 h-4 w-4", getExpirationColorClass(instance.expirationDate))} />
                        <span className={getExpirationColorClass(instance.expirationDate)}>
                          {getExpirationText(instance.expirationDate)} - {dateFormatter.format(new Date(instance.expirationDate))}
                        </span>
                      </div>
                      
                      {instance.location && (
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span>{instance.location}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center text-sm">
                        <RefreshCw className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>Acheté le {dateFormatter.format(new Date(instance.purchaseDate))}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Aucun produit trouvé</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 