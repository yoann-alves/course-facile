'use client';

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, X, Search, Copy } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { categories, frequentProducts, commonUnits, shoppingLists } from '@/data/shopping-lists';
import { ToastContext } from '@/components/ui/toast';

interface ProductItem {
  name: string;
  quantity: number;
  unit: string;
  category: string;
}

export default function CreateListPage() {
  const { showToast } = useContext(ToastContext);
  
  // État du formulaire
  const [title, setTitle] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState<ProductItem[]>([]);
  
  // État des suggestions
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{ name: string; unit: string; category: string }>>([]);

  // Gestion des suggestions de produits
  React.useEffect(() => {
    if (productName.length >= 2) {
      const allProducts = Object.entries(frequentProducts).flatMap(([category, products]) =>
        products.map(product => ({ ...product, category }))
      );
      
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(productName.toLowerCase())
      );
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [productName]);

  // Sélection d'un produit suggéré
  const handleProductSelect = (product: { name: string; unit: string; category: string }) => {
    setProductName(product.name);
    setUnit(product.unit);
    setCategory(product.category);
    setShowSuggestions(false);
    showToast(`${product.name} sélectionné`, 'info');
  };

  // Ajout d'un produit à la liste
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (productName && quantity && unit && category) {
      const toastId = Date.now();
      showToast('Ajout du produit...', 'loading');
      
      try {
        // Simulation d'un délai réseau plus long
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProducts([...products, {
          name: productName,
          quantity: Number(quantity),
          unit,
          category
        }]);
        
        // Réinitialisation du formulaire
        setProductName('');
        setQuantity('1');
        setUnit('');
        setCategory('');
        
        showToast('Produit ajouté à la liste', 'success');
      } catch (error) {
        showToast('Erreur lors de l&apos;ajout du produit', 'error');
      }
    }
  };

  // Suppression d'un produit
  const handleRemoveProduct = async (index: number) => {
    const productToRemove = products[index];
    const toastId = Date.now();
    showToast('Suppression en cours...', 'loading');
    
    try {
      // Simulation d'un délai réseau plus long
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProducts(products.filter((_, i) => i !== index));
      showToast(`${productToRemove.name} supprimé de la liste`, 'success');
    } catch (error) {
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  // Duplication d'une liste existante
  const handleDuplicateList = async (listId: string) => {
    const list = shoppingLists.find(l => l.id === listId);
    if (list) {
      const toastId = Date.now();
      showToast('Duplication de la liste...', 'loading');
      
      try {
        // Simulation d'un délai réseau plus long
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setTitle(`Copie de ${list.title}`);
        setProducts(list.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          category: item.category
        })));
        
        showToast('Liste dupliquée avec succès', 'success');
      } catch (error) {
        showToast('Erreur lors de la duplication', 'error');
      }
    }
  };

  // Création de la liste
  const handleCreateList = async () => {
    if (products.length === 0 || !title) return;
    
    const toastId = Date.now();
    showToast('Création de la liste...', 'loading');
    
    try {
      // Simulation d'un délai réseau plus long
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showToast('Liste créée avec succès', 'success');
      // Redirection simulée
      setTimeout(() => {
        window.location.href = '/lists';
      }, 500);
    } catch (error) {
      showToast('Erreur lors de la création', 'error');
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <Link href="/lists" className="mr-4">
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
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Titre de la liste
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Ex: Courses hebdomadaires"
                      required
                    />
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Ajouter des produits</h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
                            Produit
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="product"
                              value={productName}
                              onChange={(e) => setProductName(e.target.value)}
                              className="w-full px-3 py-2 pl-9 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                              placeholder="Ex: Lait"
                              required
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                          {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                              {suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                                  onClick={() => handleProductSelect(suggestion)}
                                >
                                  <span>{suggestion.name}</span>
                                  <span className="text-sm text-gray-500">{suggestion.category}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                              Quantité
                            </label>
                            <input
                              type="number"
                              id="quantity"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              min="1"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                              Unité
                            </label>
                            <select
                              id="unit"
                              value={unit}
                              onChange={(e) => setUnit(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                              required
                            >
                              <option value="">Choisir</option>
                              {commonUnits.map(unit => (
                                <option key={unit} value={unit}>{unit}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                          Catégorie
                        </label>
                        <select
                          id="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        >
                          <option value="">Sélectionner une catégorie</option>
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit">
                          <Plus className="w-4 h-4 mr-2" />
                          Ajouter à la liste
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Liste des produits ajoutés */}
                  {products.length > 0 && (
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Produits dans la liste ({products.length})
                      </h3>
                      <div className="space-y-2">
                        {products.map((product, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div>
                              <span className="font-medium">{product.name}</span>
                              <span className="text-sm text-gray-500 ml-2">
                                {product.quantity} {product.unit}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-600 mr-4">{product.category}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveProduct(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4 flex justify-end space-x-4">
                    <Link href="/lists">
                      <Button type="button" variant="outline">
                        Annuler
                      </Button>
                    </Link>
                    <Button
                      type="button"
                      disabled={products.length === 0 || !title}
                      onClick={handleCreateList}
                    >
                      Créer la liste
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Suggestions par catégorie */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Produits fréquents</h3>
                <div className="space-y-4">
                  {Object.entries(frequentProducts).map(([category, products]) => (
                    <div key={category}>
                      <h4 className="text-sm font-medium text-gray-600 mb-2">{category}</h4>
                      <div className="space-y-1">
                        {products.slice(0, 3).map((product, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleProductSelect({ ...product, category })}
                            className="w-full text-left p-2 hover:bg-green-50 rounded-md text-sm flex items-center justify-between group"
                          >
                            <span className="flex items-center">
                              <Plus className="w-4 h-4 mr-2 text-green-600" />
                              {product.name}
                            </span>
                            <span className="text-gray-400 text-xs">{product.unit}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Listes existantes à dupliquer */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Dupliquer une liste</h3>
                <div className="space-y-2">
                  {shoppingLists.map(list => (
                    <button
                      key={list.id}
                      type="button"
                      onClick={() => handleDuplicateList(list.id)}
                      className="w-full text-left p-2 hover:bg-green-50 rounded-md text-sm flex items-center justify-between group"
                    >
                      <span className="flex items-center">
                        <Copy className="w-4 h-4 mr-2 text-green-600" />
                        {list.title}
                      </span>
                      <span className="text-gray-400 text-xs">{list.items.length} articles</span>
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