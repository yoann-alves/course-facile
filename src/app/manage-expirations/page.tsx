'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, AlertTriangle, Check, Trash2, ExternalLink } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { expirationItems, isExpiringSoon, isExpired } from '@/data/expiration-items';
import { products } from '@/data/products';

export default function ManageExpirationsPage() {
  // Trier les produits par date de péremption (les plus proches en premier)
  const sortedItems = [...expirationItems].sort((a, b) => 
    new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
  );

  // Obtenir l'ID du produit à partir de son nom
  const getProductId = (productName: string): string | undefined => {
    const product = products.find(p => p.name === productName);
    return product?.id;
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Gérer les péremptions</h1>
          </div>

          {/* Produits périmés */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Produits périmés
              </h2>
              <div className="space-y-3">
                {sortedItems.filter(isExpired).length === 0 ? (
                  <p className="text-gray-500">Aucun produit périmé.</p>
                ) : (
                  sortedItems.filter(isExpired).map(item => {
                    const productId = getProductId(item.name);
                    return (
                      <div key={item.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{item.name}</h3>
                              {productId && (
                                <Link href={`/products/${productId}`} className="ml-2 text-blue-500 hover:text-blue-700">
                                  <ExternalLink className="w-4 h-4" />
                                </Link>
                              )}
                            </div>
                            <p className="text-sm text-red-600">
                              Expiré depuis le {new Date(item.expirationDate).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          {/* Produits bientôt périmés */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-yellow-600 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Bientôt périmés
              </h2>
              <div className="space-y-3">
                {sortedItems.filter(item => isExpiringSoon(item) && !isExpired(item)).length === 0 ? (
                  <p className="text-gray-500">Aucun produit bientôt périmé.</p>
                ) : (
                  sortedItems.filter(item => isExpiringSoon(item) && !isExpired(item)).map(item => {
                    const productId = getProductId(item.name);
                    return (
                      <div key={item.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{item.name}</h3>
                              {productId && (
                                <Link href={`/products/${productId}`} className="ml-2 text-blue-500 hover:text-blue-700">
                                  <ExternalLink className="w-4 h-4" />
                                </Link>
                              )}
                            </div>
                            <p className="text-sm text-yellow-600">
                              Expire le {new Date(item.expirationDate).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Check className="w-4 h-4 text-green-500" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          {/* Autres produits */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Autres produits</h2>
              <div className="space-y-3">
                {sortedItems.filter(item => !isExpiringSoon(item) && !isExpired(item)).length === 0 ? (
                  <p className="text-gray-500">Aucun autre produit.</p>
                ) : (
                  sortedItems.filter(item => !isExpiringSoon(item) && !isExpired(item)).map(item => {
                    const productId = getProductId(item.name);
                    return (
                      <div key={item.id} className="p-3 bg-white border rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{item.name}</h3>
                              {productId && (
                                <Link href={`/products/${productId}`} className="ml-2 text-blue-500 hover:text-blue-700">
                                  <ExternalLink className="w-4 h-4" />
                                </Link>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              Expire le {new Date(item.expirationDate).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Check className="w-4 h-4 text-green-500" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          {/* Ajouter un produit */}
          <div className="flex justify-center mt-8">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un produit
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 