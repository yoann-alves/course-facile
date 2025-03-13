'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Calendar, AlertTriangle, Check, Trash2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { expirationItems, isExpiringSoon, isExpired } from '@/data/expiration-items';
import { categories } from '@/data/shopping-lists';

export default function ManageExpirationsPage() {
  // Trier les produits par date de péremption (les plus proches en premier)
  const sortedItems = [...expirationItems].sort((a, b) => 
    new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <Link href="/dashboard" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Gérer les péremptions</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-600" />
                  Produits en stock
                </h2>

                <div className="space-y-4">
                  {/* Produits expirés */}
                  {sortedItems.filter(item => isExpired(item.expirationDate)).length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-red-600 mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Produits expirés
                      </h3>
                      <div className="space-y-2">
                        {sortedItems
                          .filter(item => isExpired(item.expirationDate))
                          .map(item => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-md">
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-sm text-gray-500 ml-2">
                                  {item.quantity} {item.unit}
                                </span>
                                <div className="text-xs text-red-600 mt-1">
                                  Expiré depuis le {new Date(item.expirationDate).toLocaleDateString('fr-FR')}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Produits qui expirent bientôt */}
                  {sortedItems.filter(item => isExpiringSoon(item.expirationDate)).length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-amber-600 mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Expire bientôt
                      </h3>
                      <div className="space-y-2">
                        {sortedItems
                          .filter(item => isExpiringSoon(item.expirationDate))
                          .map(item => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-amber-50 border border-amber-100 rounded-md">
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-sm text-gray-500 ml-2">
                                  {item.quantity} {item.unit}
                                </span>
                                <div className="text-xs text-amber-600 mt-1">
                                  Expire le {new Date(item.expirationDate).toLocaleDateString('fr-FR')}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" className="text-green-500 hover:text-green-700 hover:bg-green-50">
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Autres produits */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Autres produits</h3>
                    <div className="space-y-2">
                      {sortedItems
                        .filter(item => !isExpiringSoon(item.expirationDate) && !isExpired(item.expirationDate))
                        .map(item => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-md">
                            <div>
                              <span className="font-medium">{item.name}</span>
                              <span className="text-sm text-gray-500 ml-2">
                                {item.quantity} {item.unit}
                              </span>
                              <div className="text-xs text-gray-500 mt-1">
                                Expire le {new Date(item.expirationDate).toLocaleDateString('fr-FR')}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" className="text-green-500 hover:text-green-700 hover:bg-green-50">
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Ajouter un produit</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
                      Produit
                    </label>
                    <input
                      type="text"
                      id="product"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Ex: Lait"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                        Quantité
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="1"
                      />
                    </div>
                    <div>
                      <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                        Unité
                      </label>
                      <input
                        type="text"
                        id="unit"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="L, kg, pièce..."
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Catégorie
                    </label>
                    <select
                      id="category"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="expiration" className="block text-sm font-medium text-gray-700 mb-1">
                      Date de péremption
                    </label>
                    <input
                      type="date"
                      id="expiration"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter le produit
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 