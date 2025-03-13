'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { 
  X, 
  Plus, 
  Search, 
  Copy, 
  Star, 
  Clock,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToastContext } from '@/components/ui/toast';
import { shoppingLists, frequentProducts } from '@/data/shopping-lists';
import { generateId, formatDate } from '@/lib/utils';

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateListModal({ isOpen, onClose }: CreateListModalProps) {
  const router = useRouter();
  const { showToast } = useContext(ToastContext);
  
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
  
  // Dupliquer une liste existante
  const handleDuplicateList = (list: typeof shoppingLists[0]) => {
    setTitle(`Copie de ${list.title}`);
    setSelectedProducts(list.items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      category: item.category
    })));
    showToast('Liste dupliquée', 'success');
  };
  
  // Créer la liste
  const handleCreateList = async () => {
    if (!title) {
      showToast('Veuillez donner un titre à votre liste', 'error');
      return;
    }
    
    showToast('Création de la liste...', 'loading');
    
    try {
      // Simulation d'un délai réseau
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Création d'un ID aléatoire pour la liste
      const newListId = generateId('list');
      
      // Création d'IDs aléatoires pour chaque produit
      const productsWithIds = selectedProducts.map(product => ({
        ...product,
        id: generateId('item'),
        checked: false
      }));
      
      console.log('Nouvelle liste créée avec ID:', newListId);
      console.log('Produits avec IDs:', productsWithIds);
      
      showToast('Liste créée avec succès', 'success');
      onClose();
      
      // Redirection vers la nouvelle liste
      setTimeout(() => {
        router.push(`/lists/${newListId}`);
      }, 500);
    } catch {
      showToast('Erreur lors de la création', 'error');
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Créer une nouvelle liste</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Titre de la liste */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Titre de la liste
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              placeholder="Ex: Courses hebdomadaires"
              className="w-full"
            />
          </div>
          
          {/* Onglets */}
          <Tabs defaultValue="search" className="w-full">
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              {searchTerm.length > 1 && (
                <div className="border rounded-md overflow-hidden">
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      Aucun résultat trouvé
                    </div>
                  ) : (
                    <div className="max-h-[200px] overflow-y-auto">
                      {searchResults.map((product, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 border-b last:border-b-0 cursor-pointer"
                          onClick={() => handleAddProduct(product)}
                        >
                          <div>
                            <span className="font-medium">{product.name}</span>
                            <span className="text-sm text-gray-500 ml-2">{product.unit}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-2">{product.category}</span>
                            <div className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-green-50">
                              <Plus className="h-4 w-4 text-green-600" />
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
                      className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleAddProduct(product)}
                    >
                      <div className="truncate">
                        <span className="font-medium text-sm">{product.name}</span>
                      </div>
                      <div className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-green-50">
                        <Plus className="h-3 w-3 text-green-600" />
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
              <div className="border rounded-md overflow-hidden">
                {recentProducts.map((product, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 border-b last:border-b-0 cursor-pointer"
                    onClick={() => handleAddProduct(product)}
                  >
                    <div>
                      <span className="font-medium">{product.name}</span>
                      <span className="text-sm text-gray-500 ml-2">{product.unit}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">{product.category}</span>
                      <div className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-green-50">
                        <Plus className="h-4 w-4 text-green-600" />
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
              <div className="border rounded-md overflow-hidden">
                {shoppingLists.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    Aucune liste existante
                  </div>
                ) : (
                  <div className="max-h-[200px] overflow-y-auto">
                    {shoppingLists.map((list) => (
                      <div 
                        key={list.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 border-b last:border-b-0 cursor-pointer"
                        onClick={() => handleDuplicateList(list)}
                      >
                        <div>
                          <span className="font-medium">{list.title}</span>
                          <div className="text-xs text-gray-500">
                            {list.items.length} articles • Créée le {formatDate(list.createdAt)}
                          </div>
                        </div>
                        <div className="flex items-center px-2 py-1 rounded-md hover:bg-green-50">
                          <Copy className="h-4 w-4 mr-1 text-green-600" />
                          <span className="text-sm text-green-600">Dupliquer</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Produits sélectionnés */}
          {selectedProducts.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-1" />
                Produits sélectionnés ({selectedProducts.length})
              </h3>
              <div className="border rounded-md overflow-hidden">
                <div className="max-h-[200px] overflow-y-auto">
                  {selectedProducts.map((product, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 border-b last:border-b-0"
                    >
                      <div>
                        <span className="font-medium">{product.name}</span>
                        <span className="text-sm text-gray-500 ml-2">{product.quantity} {product.unit}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">{product.category}</span>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleRemoveProduct(index)}
                          className="h-8 w-8 p-0 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleCreateList} disabled={!title}>
            Créer la liste
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 