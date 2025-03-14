'use client';

import React, { useState, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  Plus, 
  Search, 
  Copy, 
  Star, 
  Clock,
  X,
  ShoppingCart
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToastContext } from '@/components/ui/toast';
import { frequentProducts } from '@/data/shopping-lists';
import { generateId } from '@/lib/utils';
import { useShoppingLists } from '@/contexts/ShoppingListContext';

export default function CreateListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useContext(ToastContext);
  const { addList, lists } = useShoppingLists();
  
  // Récupérer l'onglet initial depuis les paramètres d'URL
  const initialTab = searchParams.get('tab') || 'search';
  
  // État du formulaire
  const [title, setTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Array<{
    name: string;
    quantity: number;
    unit: string;
    category: string;
  }>>([]);
  
  // Produits récents (simulés)
  const recentProducts = [
    { name: 'Lait', unit: 'L', category: 'Produits laitiers' },
    { name: 'Pain', unit: 'pièce', category: 'Boulangerie' },
    { name: 'Œufs', unit: 'boîte', category: 'Produits laitiers' },
    { name: 'Yaourt', unit: 'pièces', category: 'Produits laitiers' },
    { name: 'Pommes', unit: 'kg', category: 'Fruits et légumes' }
  ];
  
  // Produits favoris (simulés)
  const favoriteProducts = [
    { name: 'Café', unit: 'paquet', category: 'Épicerie' },
    { name: 'Pâtes', unit: 'paquet', category: 'Épicerie' },
    { name: 'Riz', unit: 'kg', category: 'Épicerie' },
    { name: 'Chocolat', unit: 'tablette', category: 'Épicerie' }
  ];
  
  // Recherche de produits
  const searchResults = searchTerm.length > 1 
    ? Object.entries(frequentProducts)
        .flatMap(([category, products]) => 
          products
            .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(p => ({ ...p, category }))
        )
        .slice(0, 10)
    : [];
  
  // Ajouter un produit à la liste
  const handleAddProduct = (product: { name: string; unit: string; category: string }) => {
    // Vérifier si le produit existe déjà dans la liste
    const existingProductIndex = selectedProducts.findIndex(
      p => p.name.toLowerCase() === product.name.toLowerCase() && p.category === product.category
    );

    if (existingProductIndex !== -1) {
      // Si le produit existe déjà, incrémenter sa quantité
      const updatedProducts = [...selectedProducts];
      updatedProducts[existingProductIndex] = {
        ...updatedProducts[existingProductIndex],
        quantity: updatedProducts[existingProductIndex].quantity + 1
      };
      setSelectedProducts(updatedProducts);
      showToast(`Quantité de ${product.name} augmentée`, 'success');
    } else {
      // Sinon, ajouter le nouveau produit
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
      showToast(`${product.name} ajouté`, 'success');
    }
  };
  
  // Supprimer un produit de la liste
  const handleRemoveProduct = (index: number) => {
    const newProducts = [...selectedProducts];
    newProducts.splice(index, 1);
    setSelectedProducts(newProducts);
  };
  
  // Modifier la quantité d'un produit
  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const newProducts = [...selectedProducts];
    newProducts[index] = { ...newProducts[index], quantity: newQuantity };
    setSelectedProducts(newProducts);
  };
  
  // Dupliquer une liste existante
  const handleDuplicateList = (list: typeof lists[0]) => {
    setTitle(`Copie de ${list.title}`);
    setSelectedProducts(list.items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      category: item.category
    })));
    showToast('Liste dupliquée', 'success');
  };
  
  // Fonction pour créer une nouvelle liste
  const handleCreateList = async () => {
    if (!title.trim()) {
      showToast('Veuillez donner un titre à votre liste', 'error');
      return;
    }
    
    try {
      // Afficher un toast de chargement
      showToast('Création de votre liste...', 'loading');
      
      // Créer les items de la liste
      const items = selectedProducts.map(product => ({
        id: `item-${generateId()}`,
        name: product.name,
        quantity: product.quantity,
        unit: product.unit,
        category: product.category,
        checked: false
      }));
      
      // Ajouter la liste via le contexte
      const newListId = addList({
        title: title.trim(),
        items,
        completed: false
      });
      
      console.log('Nouvelle liste créée:', newListId);
      
      // Afficher un toast de succès
      showToast('Liste créée avec succès !', 'success');
      
      // Rediriger vers la liste créée
      setTimeout(() => {
        router.push(`/lists/${newListId}`);
      }, 1000);
    } catch (error) {
      console.error('Erreur lors de la création de la liste:', error);
      showToast('Une erreur est survenue lors de la création de la liste', 'error');
    }
  };

  // Grouper les produits par catégorie
  const productsByCategory = selectedProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof selectedProducts>);
  
  return (
    <MainLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/dashboard" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour au tableau de bord
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Créer une liste</h1>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Colonne gauche - Recherche et ajout de produits */}
                <div className="lg:col-span-5">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-xl">Ajouter des produits</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Titre de la liste */}
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Titre de la liste
                        </label>
                        <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Ex: Courses hebdomadaires"
                          className="w-full"
                        />
                      </div>
                      
                      {/* Onglets */}
                      <Tabs defaultValue={initialTab} className="w-full">
                        <TabsList className="flex w-full border-b mb-4 bg-transparent p-0 space-x-2">
                          <TabsTrigger 
                            value="search" 
                            className="flex items-center px-4 py-2 border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-500 dark:data-[state=inactive]:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 rounded-none bg-transparent shadow-none"
                          >
                            <Search className="w-4 h-4 mr-2" />
                            Recherche
                          </TabsTrigger>
                          <TabsTrigger 
                            value="recent" 
                            className="flex items-center px-4 py-2 border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-500 dark:data-[state=inactive]:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 rounded-none bg-transparent shadow-none"
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            Récents
                          </TabsTrigger>
                          <TabsTrigger 
                            value="duplicate" 
                            className="flex items-center px-4 py-2 border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-500 dark:data-[state=inactive]:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 rounded-none bg-transparent shadow-none"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Dupliquer
                          </TabsTrigger>
                        </TabsList>
                        
                        {/* Onglet Recherche */}
                        <TabsContent value="search" className="space-y-4">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                            <Input
                              placeholder="Rechercher un produit..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="pl-9"
                            />
                          </div>
                          
                          {searchTerm.length > 1 && (
                            <div className="border dark:border-gray-700 rounded-md overflow-hidden">
                              {searchResults.length === 0 ? (
                                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                  Aucun résultat trouvé
                                </div>
                              ) : (
                                <div className="max-h-[200px] overflow-y-auto">
                                  {searchResults.map((product, index) => (
                                    <div 
                                      key={index}
                                      className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/70 border-b dark:border-gray-700 last:border-b-0 cursor-pointer"
                                      onClick={() => handleAddProduct(product)}
                                    >
                                      <div>
                                        <span className="font-medium">{product.name}</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">{product.unit}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">{product.category}</span>
                                        <div className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-green-50 dark:hover:bg-green-900/30">
                                          <Plus className="h-4 w-4 text-green-600 dark:text-green-400" />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                          
                          {/* Produits favoris */}
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                              <Star className="w-4 h-4 text-amber-400 mr-1" />
                              Favoris
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                              {favoriteProducts.map((product, index) => (
                                <div 
                                  key={index}
                                  className="flex items-center justify-between p-2 border dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer"
                                  onClick={() => handleAddProduct(product)}
                                >
                                  <div className="truncate">
                                    <span className="font-medium text-sm">{product.name}</span>
                                  </div>
                                  <div className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-green-50 dark:hover:bg-green-900/30">
                                    <Plus className="h-3 w-3 text-green-600 dark:text-green-400" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                        
                        {/* Onglet Récents */}
                        <TabsContent value="recent" className="space-y-4">
                          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                            <Clock className="w-4 h-4 text-blue-500 mr-1" />
                            Produits récemment utilisés
                          </h3>
                          <div className="border dark:border-gray-700 rounded-md overflow-hidden">
                            {recentProducts.map((product, index) => (
                              <div 
                                key={index}
                                className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/70 border-b dark:border-gray-700 last:border-b-0 cursor-pointer"
                                onClick={() => handleAddProduct(product)}
                              >
                                <div>
                                  <span className="font-medium">{product.name}</span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">{product.unit}</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">{product.category}</span>
                                  <div className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-green-50 dark:hover:bg-green-900/30">
                                    <Plus className="h-4 w-4 text-green-600 dark:text-green-400" />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        
                        {/* Onglet Dupliquer */}
                        <TabsContent value="duplicate" className="space-y-4">
                          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                            <Copy className="w-4 h-4 text-green-500 mr-1" />
                            Dupliquer une liste existante
                          </h3>
                          <div className="border dark:border-gray-700 rounded-md overflow-hidden">
                            {lists.length === 0 ? (
                              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                Aucune liste existante
                              </div>
                            ) : (
                              <div className="max-h-[200px] overflow-y-auto">
                                {lists.map((list) => (
                                  <div 
                                    key={list.id}
                                    className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/70 border-b dark:border-gray-700 last:border-b-0 cursor-pointer"
                                    onClick={() => handleDuplicateList(list)}
                                  >
                                    <div>
                                      <span className="font-medium">{list.title}</span>
                                      <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {list.items.length} articles • Créée le {new Date(list.createdAt).toLocaleDateString('fr-FR')}
                                      </div>
                                    </div>
                                    <div className="flex items-center px-2 py-1 rounded-md hover:bg-green-50 dark:hover:bg-green-900/30">
                                      <Copy className="h-4 w-4 mr-1 text-green-600 dark:text-green-400" />
                                      <span className="text-sm text-green-600 dark:text-green-400">Dupliquer</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Colonne droite - Aperçu de la liste */}
                <div className="lg:col-span-7">
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-xl flex items-center">
                        <ShoppingCart className="w-5 h-5 mr-2 text-green-600" />
                        {title || "Nouvelle liste"}
                      </CardTitle>
                      <div className="text-sm text-gray-500">
                        {selectedProducts.length} {selectedProducts.length > 1 ? 'articles' : 'article'}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {selectedProducts.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed rounded-lg">
                          <ShoppingCart className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                          <p className="text-gray-500 mb-4">Votre liste est vide</p>
                          <p className="text-sm text-gray-400">
                            Utilisez la colonne de gauche pour ajouter des produits à votre liste
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {/* Produits groupés par catégorie */}
                          {Object.entries(productsByCategory).map(([category, products]) => (
                            <div key={category} className="space-y-2">
                              <h3 className="font-medium text-gray-700 dark:text-gray-300 border-b pb-1">{category}</h3>
                              <div className="space-y-2">
                                {products.map((product, index) => {
                                  const originalIndex = selectedProducts.findIndex(
                                    p => p.name === product.name && p.category === product.category
                                  );
                                  return (
                                    <div 
                                      key={index}
                                      className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800/70 rounded-md"
                                    >
                                      <div className="flex-1">
                                        <span className="font-medium">{product.name}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <div className="flex items-center border dark:border-gray-700 rounded-md">
                                          <Button 
                                            size="sm" 
                                            variant="ghost"
                                            onClick={() => handleUpdateQuantity(originalIndex, product.quantity - 1)}
                                            className="h-8 w-8 p-0"
                                          >
                                            -
                                          </Button>
                                          <span className="w-8 text-center">{product.quantity}</span>
                                          <Button 
                                            size="sm" 
                                            variant="ghost"
                                            onClick={() => handleUpdateQuantity(originalIndex, product.quantity + 1)}
                                            className="h-8 w-8 p-0"
                                          >
                                            +
                                          </Button>
                                        </div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400 w-12">{product.unit}</span>
                                        <Button 
                                          size="sm" 
                                          variant="ghost"
                                          onClick={() => handleRemoveProduct(originalIndex)}
                                          className="h-8 w-8 p-0 rounded-full text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                                        >
                                          <X className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                          
                          {/* Boutons d'action */}
                          <div className="flex justify-end space-x-3 pt-6 border-t">
                            <Button variant="outline" onClick={() => router.push('/dashboard')}>
                              Annuler
                            </Button>
                            <Button 
                              onClick={handleCreateList} 
                              disabled={!title || selectedProducts.length === 0}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Créer la liste
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
} 