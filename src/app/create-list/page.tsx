'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, X } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/data/shopping-lists';

export default function CreateListPage() {
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
          <h1 className="text-2xl font-bold text-gray-900">Créer une nouvelle liste</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Titre de la liste
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Ex: Courses hebdomadaires"
                    />
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Ajouter des produits</h3>
                    
                    <div className="space-y-4">
                      {/* Formulaire d'ajout de produit */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      
                      <div className="flex justify-end">
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Ajouter à la liste
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Liste des produits ajoutés (simulée) */}
                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Produits dans la liste</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                          <span className="font-medium">Lait</span>
                          <span className="text-sm text-gray-500 ml-2">2 L</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 mr-4">Produits laitiers</span>
                          <button className="text-red-500 hover:text-red-700">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                          <span className="font-medium">Pain</span>
                          <span className="text-sm text-gray-500 ml-2">1 pièce</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 mr-4">Boulangerie</span>
                          <button className="text-red-500 hover:text-red-700">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 flex justify-end space-x-4">
                    <Link href="/dashboard">
                      <Button variant="outline">
                        Annuler
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button>
                        Créer la liste
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Produits récents</h3>
                <div className="space-y-2">
                  {["Lait", "Pain", "Œufs", "Yaourt", "Pommes", "Pâtes"].map((product, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-2 hover:bg-green-50 rounded-md text-sm flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2 text-green-600" />
                      {product}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 