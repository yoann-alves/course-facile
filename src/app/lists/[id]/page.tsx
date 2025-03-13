'use client';

import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Edit, 
  Check,
  Clock,
  Save,
  CheckCircle
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { categories as productCategories } from '@/data/shopping-lists';
import { ToastContext } from '@/components/ui/toast';
import { cn, formatDate, generateId } from '@/lib/utils';
import { useShoppingLists } from '@/contexts/ShoppingListContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ShoppingListDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { showToast } = useContext(ToastContext);
  const listId = params.id;
  const { getList, updateList, deleteList } = useShoppingLists();
  
  // État pour les dialogues
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Récupérer la liste depuis le contexte
  const list = getList(listId);
  
  // Rediriger si la liste n'existe pas
  useEffect(() => {
    if (!list) {
      showToast('Liste introuvable', 'error');
      router.push('/dashboard');
    }
  }, [list, router, showToast]);
  
  // État pour le mode d'édition
  const [isEditMode, setIsEditMode] = useState(false);
  
  // État pour les items cochés
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    list?.items.reduce((acc, item) => ({ ...acc, [item.id]: item.checked }), {}) || {}
  );
  
  // État pour les items en mode édition
  const [editableItems, setEditableItems] = useState(
    list?.items ? [...list.items] : []
  );
  
  // Mettre à jour les états lorsque la liste change
  useEffect(() => {
    if (list) {
      setCheckedItems(list.items.reduce((acc, item) => ({ ...acc, [item.id]: item.checked }), {}));
      setEditableItems([...list.items]);
    }
  }, [list]);
  
  // Si la liste n'existe pas, afficher un message de chargement
  if (!list) {
    return (
      <MainLayout>
        <div className="container mx-auto py-6 px-4">
          <div className="text-center py-10">
            <p className="text-gray-500">Chargement de la liste...</p>
          </div>
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
  
  // Gérer le cochage d'un article
  const handleItemCheck = (itemId: string) => {
    const newCheckedItems = { ...checkedItems, [itemId]: !checkedItems[itemId] };
    setCheckedItems(newCheckedItems);
    
    // Mettre à jour la liste dans le contexte
    const updatedItems = list.items.map(item => 
      item.id === itemId ? { ...item, checked: !checkedItems[itemId] } : item
    );
    
    updateList({
      ...list,
      items: updatedItems
    });
  };
  
  // Supprimer un article
  const handleDeleteItem = (itemId: string) => {
    if (isEditMode) {
      setEditableItems(editableItems.filter(item => item.id !== itemId));
    } else {
      showToast('Suppression de l\'article...', 'loading');
      
      setTimeout(() => {
        const updatedItems = list.items.filter(item => item.id !== itemId);
        updateList({
          ...list,
          items: updatedItems
        });
        
        showToast('Article supprimé !', 'success');
      }, 500);
    }
  };
  
  // Ajouter un nouvel article
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nameInput = form.elements.namedItem('itemName') as HTMLInputElement;
    const quantityInput = form.elements.namedItem('itemQuantity') as HTMLInputElement;
    const unitInput = form.elements.namedItem('itemUnit') as HTMLInputElement;
    const categoryInput = form.elements.namedItem('itemCategory') as HTMLSelectElement;
    
    if (!nameInput.value.trim()) {
      showToast('Veuillez entrer un nom d\'article', 'error');
      return;
    }
    
    const newItem = {
      id: `item-${generateId()}`,
      name: nameInput.value.trim(),
      quantity: parseInt(quantityInput.value) || 1,
      unit: unitInput.value.trim() || 'pièce',
      category: categoryInput.value,
      checked: false
    };
    
    if (isEditMode) {
      setEditableItems([...editableItems, newItem]);
    } else {
      showToast('Ajout de l\'article...', 'loading');
      
      setTimeout(() => {
        updateList({
          ...list,
          items: [...list.items, newItem]
        });
        
        setCheckedItems({ ...checkedItems, [newItem.id]: false });
        showToast('Article ajouté !', 'success');
        form.reset();
      }, 500);
    }
  };
  
  // Basculer en mode édition
  const toggleEditMode = () => {
    if (isEditMode) {
      // Sauvegarder les modifications
      showToast('Sauvegarde des modifications...', 'loading');
      
      setTimeout(() => {
        updateList({
          ...list,
          items: editableItems
        });
        
        setCheckedItems(editableItems.reduce((acc, item) => ({ ...acc, [item.id]: item.checked }), {}));
        showToast('Modifications sauvegardées !', 'success');
        setIsEditMode(false);
      }, 500);
    } else {
      setIsEditMode(true);
    }
  };
  
  // Supprimer la liste
  const handleDeleteList = () => {
    setShowDeleteDialog(false);
    showToast('Suppression de la liste...', 'loading');
    
    setTimeout(() => {
      console.log('Suppression de la liste:', listId);
      deleteList(listId);
      showToast('Liste supprimée !', 'success');
      router.push('/dashboard');
    }, 500);
  };
  
  // Marquer la liste comme terminée
  const handleCompleteList = () => {
    showToast('Mise à jour de la liste...', 'loading');
    
    setTimeout(() => {
      updateList({
        ...list,
        completed: !list.completed
      });
      
      showToast(list.completed ? 'Liste marquée comme en cours' : 'Liste marquée comme terminée', 'success');
    }, 500);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="space-y-6">
          {/* En-tête avec navigation et actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.push('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">{list.title}</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCompleteList}
                className={list.completed ? "text-green-500 hover:text-green-700" : ""}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {list.completed ? "Reprendre" : "Terminer"}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleEditMode}
              >
                {isEditMode ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer
              </Button>
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
                            name="itemName"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <div className="flex">
                            <input
                              type="number"
                              min="1"
                              placeholder="Qté"
                              name="itemQuantity"
                              className="w-full px-3 py-2 border border-gray-300 rounded-l-md"
                            />
                            <select
                              name="itemUnit"
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
                            name="itemCategory"
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
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
                    <p className="mb-2">Utilisez le bouton &quot;Modifier&quot; en haut à droite pour ajouter des articles.</p>
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
      </div>
      
      {/* Dialog de confirmation de suppression */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer la liste &quot;{list.title}&quot; ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Annuler
            </Button>
            <Button type="button" variant="secondary" className="bg-red-500 text-white hover:bg-red-600" onClick={handleDeleteList}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
} 