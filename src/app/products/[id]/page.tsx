'use client';

import React, { useState, useContext, use } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Edit, 
  Calendar, 
  AlertTriangle,
  Info,
  MapPin,
  Clock
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  products, 
  getProductInstances, 
  isExpired, 
  daysUntilExpiration 
} from '@/data/products';
import { ToastContext } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { showToast } = useContext(ToastContext);
  const { id: productId } = use(params);
  
  // Trouver le produit correspondant
  const product = products.find(p => p.id === productId);
  
  // Obtenir toutes les instances de ce produit
  const instances = getProductInstances(productId);
  
  // État pour le formulaire d'ajout d'instance
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInstance, setNewInstance] = useState({
    quantity: 1,
    unit: product?.defaultUnit || '',
    location: 'Réfrigérateur',
    expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: ''
  });
  
  // Gérer le cas où le produit n'existe pas
  if (!product) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Produit introuvable</h1>
          <p className="text-gray-600 mb-6">Le produit que vous recherchez n&apos;existe pas ou a été supprimé.</p>
          <Button onClick={() => router.push('/inventory')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l&apos;inventaire
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  // Supprimer une instance
  const handleDeleteInstance = (instanceId: string) => {
    showToast('Instance supprimée', 'success');
    // En mode prototype, nous simulons juste la suppression
  };
  
  // Ajouter une nouvelle instance
  const handleAddInstance = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Instance ajoutée', 'success');
    setShowAddForm(false);
    // En mode prototype, nous simulons juste l'ajout
  };
  
  // Trier les instances par date de péremption
  const sortedInstances = [...instances].sort((a, b) => {
    return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
  });
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push('/inventory')}
              className="mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{product.name}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une instance
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Informations sur le produit */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">Catégorie</h3>
                  <p>{product.category}</p>
                </div>
                
                {product.description && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">Description</h3>
                    <p>{product.description}</p>
                  </div>
                )}
                
                {product.averagePrice && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">Prix moyen</h3>
                    <p>{product.averagePrice.toFixed(2)} €</p>
                  </div>
                )}
                
                {product.nutritionalInfo && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">Informations nutritionnelles</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {product.nutritionalInfo.calories && (
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-300">Calories</p>
                          <p className="font-medium">{product.nutritionalInfo.calories} kcal</p>
                        </div>
                      )}
                      {product.nutritionalInfo.protein && (
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-300">Protéines</p>
                          <p className="font-medium">{product.nutritionalInfo.protein} g</p>
                        </div>
                      )}
                      {product.nutritionalInfo.carbs && (
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-300">Glucides</p>
                          <p className="font-medium">{product.nutritionalInfo.carbs} g</p>
                        </div>
                      )}
                      {product.nutritionalInfo.fat && (
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-300">Lipides</p>
                          <p className="font-medium">{product.nutritionalInfo.fat} g</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Instances du produit */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Instances ({instances.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {showAddForm ? (
                <form onSubmit={handleAddInstance} className="space-y-4 mb-6 p-4 border rounded-lg">
                  <h3 className="font-medium">Ajouter une nouvelle instance</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Quantité
                      </label>
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={newInstance.quantity}
                        onChange={(e) => setNewInstance({...newInstance, quantity: parseFloat(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Unité
                      </label>
                      <input
                        type="text"
                        value={newInstance.unit}
                        onChange={(e) => setNewInstance({...newInstance, unit: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date de péremption
                      </label>
                      <input
                        type="date"
                        value={newInstance.expirationDate}
                        onChange={(e) => setNewInstance({...newInstance, expirationDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Emplacement
                      </label>
                      <select
                        value={newInstance.location}
                        onChange={(e) => setNewInstance({...newInstance, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="Réfrigérateur">Réfrigérateur</option>
                        <option value="Congélateur">Congélateur</option>
                        <option value="Placard cuisine">Placard cuisine</option>
                        <option value="Garde-manger">Garde-manger</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Notes
                      </label>
                      <textarea
                        value={newInstance.notes}
                        onChange={(e) => setNewInstance({...newInstance, notes: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={2}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                    >
                      Annuler
                    </Button>
                    <Button type="submit">
                      Ajouter
                    </Button>
                  </div>
                </form>
              ) : (
                instances.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucune instance de ce produit n&apos;est enregistrée.
                    <div className="mt-4">
                      <Button onClick={() => setShowAddForm(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter une instance
                      </Button>
                    </div>
                  </div>
                )
              )}
              
              {sortedInstances.length > 0 && (
                <div className="space-y-4">
                  {sortedInstances.map(instance => {
                    const expired = isExpired(instance);
                    const daysLeft = daysUntilExpiration(instance);
                    
                    return (
                      <div 
                        key={instance.id} 
                        className={cn(
                          "p-4 border rounded-lg",
                          expired ? "bg-red-50 border-red-200" : 
                          daysLeft <= 3 ? "bg-yellow-50 border-yellow-200" : 
                          "bg-white"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center">
                              {expired ? (
                                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                              ) : daysLeft <= 3 ? (
                                <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                              ) : (
                                <Info className="w-5 h-5 text-blue-500 mr-2" />
                              )}
                              <h3 className="font-medium">
                                {instance.quantity} {instance.unit}
                              </h3>
                            </div>
                            
                            <div className="mt-1 space-y-1 text-sm text-gray-500">
                              <p className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {expired ? (
                                  <span className="text-red-600 font-medium">
                                    Périmé depuis le {new Date(instance.expirationDate).toLocaleDateString('fr-FR')}
                                  </span>
                                ) : (
                                  <span className={daysLeft <= 3 ? "text-yellow-600 font-medium" : ""}>
                                    Expire {daysLeft === 0 ? "aujourd'hui" : `dans ${daysLeft} jours`} ({new Date(instance.expirationDate).toLocaleDateString('fr-FR')})
                                  </span>
                                )}
                              </p>
                              
                              {instance.location && (
                                <p className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {instance.location}
                                </p>
                              )}
                              
                              {instance.purchaseDate && (
                                <p className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  Acheté le {new Date(instance.purchaseDate).toLocaleDateString('fr-FR')}
                                </p>
                              )}
                              
                              {instance.notes && (
                                <p className="italic mt-2">{instance.notes}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => showToast('Fonctionnalité à venir', 'info')}
                            >
                              <Edit className="w-4 h-4 text-blue-500" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteInstance(instance.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
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