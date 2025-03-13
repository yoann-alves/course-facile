'use client';

import React, { useState, useContext, use } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  ShoppingCart, 
  Share2,
  Clock,
  Save,
  X
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { shoppingLists, categories as productCategories } from '@/data/shopping-lists';
import { ToastContext } from '@/components/ui/toast';
import { cn, formatDate, generateId } from '@/lib/utils';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ShoppingListDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { showToast } = useContext(ToastContext);
  const { id: listId } = use(params);
  
  // État pour le mode d'édition
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Trouver la liste correspondante
  const list = shoppingLists.find(list => list.id === listId);
  
  // État pour les items cochés
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    list?.items.reduce((acc, item) => ({ ...acc, [item.id]: item.checked }), {}) || {}
  );
  
  // État pour les items en mode édition
  const [editableItems, setEditableItems] = useState(
    list?.items ? [...list.items] : []
  );
  
  // État pour le nouvel article à ajouter
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    unit: '',
    category: ''
  });
  
  // Gérer le cas où la liste n'existe pas
  if (!list) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Liste introuvable</h1>
          <p className="text-gray-600 mb-6">La liste que vous recherchez n&apos;existe pas ou a été supprimée.</p>
          <Button onClick={() => router.push('/lists')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux listes
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  // Calculer le nombre d'articles cochés
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = list.items.length > 0 ? (checkedCount / list.items.length) * 100 : 0;
  
  // Grouper les articles par catégorie (pour le mode visualisation)
  const itemsByCategory = list.items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof list.items>);
  
  // Grouper les articles par catégorie (pour le mode édition)
  const editableItemsByCategory = editableItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof editableItems>);
  
  // Gérer le changement d'état d'un article (mode visualisation)
  const handleItemCheck = (itemId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
    
    showToast('Article mis à jour', 'success');
  };
  
  // Marquer la liste comme terminée
  const handleCompleteList = () => {
    showToast('Liste marquée comme terminée', 'success');
    // En mode prototype, nous simulons juste l'action
    setTimeout(() => router.push('/lists'), 1500);
  };
  
  // Supprimer un article (mode édition)
  const handleDeleteItem = (itemId: string) => {
    setEditableItems(prev => prev.filter(item => item.id !== itemId));
    showToast('Article supprimé', 'success');
  };
  
  // Ajouter un nouvel article (mode édition)
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.name || !newItem.quantity || !newItem.unit || !newItem.category) {
      showToast('Veuillez remplir tous les champs', 'error');
      return;
    }
    
    const newItemWithId = {
      ...newItem,
      id: generateId('item'),
      checked: false,
      quantity: Number(newItem.quantity)
    };
    
    setEditableItems(prev => [...prev, newItemWithId]);
    setNewItem({
      name: '',
      quantity: 1,
      unit: '',
      category: ''
    });
    
    showToast('Article ajouté', 'success');
  };
  
  // Basculer en mode édition
  const toggleEditMode = () => {
    if (isEditMode) {
      // Si on quitte le mode édition, on simule la sauvegarde
      showToast('Modifications enregistrées', 'success');
    }
    setIsEditMode(!isEditMode);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push('/lists')}
              className="mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">{list.title}</h1>
          </div>
          <div className="flex gap-2">
            {!isEditMode && (
              <>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
                <Button variant="outline" size="sm" onClick={toggleEditMode}>
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
                <Button onClick={handleCompleteList}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Terminer
                </Button>
              </>
            )}
            
            {isEditMode && (
              <>
                <Button variant="outline" size="sm" onClick={toggleEditMode}>
                  <X className="w-4 h-4 mr-2" />
                  Annuler
                </Button>
                <Button onClick={toggleEditMode}>
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer
                </Button>
              </>
            )}
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>{isEditMode ? "Édition" : "Progression"}</CardTitle>
              {!isEditMode && (
                <span className="text-sm text-gray-500">
                  {checkedCount} sur {list.items.length} articles
                </span>
              )}
              {isEditMode && (
                <span className="text-sm text-gray-500">
                  {editableItems.length} articles
                </span>
              )}
            </div>
            {!isEditMode && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                <Clock className="w-4 h-4 inline mr-1" />
                Créée le {formatDate(list.createdAt)}
              </p>
              
              {isEditMode && (
                <div className="flex-1 ml-4">
                  <form onSubmit={handleAddItem} className="flex flex-col space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          placeholder="Nom du produit"
                          value={newItem.name}
                          onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <div className="flex">
                          <input
                            type="number"
                            min="1"
                            placeholder="Qté"
                            value={newItem.quantity}
                            onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-l-md"
                          />
                          <select
                            value={newItem.unit}
                            onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                            className="px-2 py-2 border border-l-0 border-gray-300 rounded-r-md"
                          >
                            <option value="">Unité</option>
                            <option value="pièce">pièce</option>
                            <option value="kg">kg</option>
                            <option value="g">g</option>
                            <option value="L">L</option>
                            <option value="ml">ml</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex">
                        <select
                          value={newItem.category}
                          onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-l-md"
                        >
                          <option value="">Catégorie</option>
                          {productCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                        <Button type="submit" className="rounded-l-none">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              
              {!isEditMode && (
                <Button onClick={() => setIsEditMode(true)} size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier la liste
                </Button>
              )}
            </div>
            
            {/* Mode Visualisation */}
            {!isEditMode && Object.entries(itemsByCategory).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">{category}</h3>
                <div className="space-y-2">
                  {items.map(item => (
                    <div 
                      key={item.id} 
                      className={cn(
                        "flex items-center justify-between p-3 border rounded-lg",
                        checkedItems[item.id] ? "bg-gray-50" : "bg-white"
                      )}
                    >
                      <div className="flex items-center">
                        <button
                          onClick={() => handleItemCheck(item.id)}
                          className={cn(
                            "w-5 h-5 rounded-sm border mr-3 flex items-center justify-center",
                            checkedItems[item.id] 
                              ? "bg-green-500 border-green-500" 
                              : "border-gray-300"
                          )}
                        >
                          {checkedItems[item.id] && <Check className="w-4 h-4 text-white" />}
                        </button>
                        <div className={cn(
                          checkedItems[item.id] && "line-through text-gray-500"
                        )}>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-sm text-gray-500 ml-2">
                            {item.quantity} {item.unit}
                          </span>
                          {item.price && (
                            <span className="text-sm text-gray-500 ml-2">
                              • {item.price.toFixed(2)} €
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Mode Édition */}
            {isEditMode && Object.entries(editableItemsByCategory).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">{category}</h3>
                <div className="space-y-2">
                  {items.map(item => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-3 border rounded-lg bg-white"
                    >
                      <div className="flex items-center">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-sm text-gray-500 ml-2">
                            {item.quantity} {item.unit}
                          </span>
                          {item.price && (
                            <span className="text-sm text-gray-500 ml-2">
                              • {item.price.toFixed(2)} €
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {list.items.length === 0 && !isEditMode && (
              <div className="text-center py-8 text-gray-500">
                Cette liste ne contient aucun article.
                <div className="mt-4">
                  <Button onClick={() => setIsEditMode(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier la liste
                  </Button>
                </div>
              </div>
            )}
            
            {editableItems.length === 0 && isEditMode && (
              <div className="text-center py-8 text-gray-500">
                Cette liste ne contient aucun article.
                <div className="mt-4">
                  <p className="mb-2">Ajoutez des articles à l&apos;aide du formulaire ci-dessus.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
} 