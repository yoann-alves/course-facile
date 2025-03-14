'use client';

import React, { useContext, memo } from 'react';
import { ShoppingCart, Trash2, Share2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToastContext } from '@/components/ui/toast';
import { useFormatDate } from '@/hooks/useFormatDate';
import { useModals } from '@/hooks/useModals';
import BaseCard, { BaseCardAction } from './BaseCard';
import { Package } from 'lucide-react';

interface ShoppingListCardProps {
  id: string;
  title: string;
  itemCount: number;
  completedCount: number;
  createdAt: string;
  onDelete: (id: string) => void;
}

/**
 * Carte pour afficher une liste de courses
 * Utilise le composant BaseCard pour la structure de base
 */
const ShoppingListCard = memo(function ShoppingListCard({ 
  id, 
  title, 
  itemCount, 
  completedCount = 0,
  createdAt, 
  onDelete 
}: ShoppingListCardProps) {
  const progress = itemCount > 0 ? (completedCount / itemCount) * 100 : 0;
  const [shareEmail, setShareEmail] = React.useState('');
  const { showToast } = useContext(ToastContext);
  const dateFormatter = useFormatDate();
  
  // Utiliser useModals pour gérer les modales
  const { isOpen, openModal, closeModal } = useModals();

  const handleShare = () => {
    // Afficher un toast de chargement pendant le "partage"
    showToast('Partage en cours...', 'loading');
    
    // Simuler un délai de traitement
    setTimeout(() => {
      showToast(`Liste "${title}" partagée avec ${shareEmail}`, 'success');
      setShareEmail('');
      closeModal('share');
      // Dans une vraie application, nous enverrions une invitation de partage ici
    }, 1000);
  };

  const handleDelete = () => {
    // Afficher un toast de chargement pendant la "suppression"
    showToast('Suppression en cours...', 'loading');
    
    // Simuler un délai de traitement
    setTimeout(() => {
      onDelete(id);
      showToast(`Liste "${title}" supprimée avec succès`, 'success');
      closeModal('delete');
    }, 1000);
  };

  // Définir les actions pour la carte
  const cardActions: BaseCardAction[] = [
    {
      label: 'Partager',
      icon: <Share2 className="h-4 w-4 text-green-500 dark:text-green-400" />,
      onClick: () => openModal('share')
    },
    {
      label: 'Supprimer',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: () => openModal('delete'),
      variant: 'destructive'
    }
  ];

  // Contenu de la carte
  const cardContent = (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {itemCount} {itemCount > 1 ? 'articles' : 'article'}
        </span>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {completedCount} / {itemCount} complétés
      </div>
    </div>
  );

  return (
    <>
      <BaseCard
        title={title}
        description={`Créée le ${dateFormatter.format(createdAt)}`}
        icon={<ShoppingCart className="h-5 w-5 text-green-600 dark:text-green-400" />}
        content={cardContent}
        actions={cardActions}
        href={`/lists/${id}`}
        progressPercent={progress}
      />

      {/* Dialog de partage */}
      <Dialog open={isOpen('share')} onOpenChange={(open) => open ? openModal('share') : closeModal('share')}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Partager la liste</DialogTitle>
            <DialogDescription>
              Entrez l&apos;adresse e-mail de la personne avec qui vous souhaitez partager &quot;{title}&quot;.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@email.com"
                className="col-span-3"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => closeModal('share')}>
              Annuler
            </Button>
            <Button 
              type="button" 
              onClick={handleShare}
              disabled={!shareEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shareEmail)}
            >
              Partager
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmation de suppression */}
      <Dialog open={isOpen('delete')} onOpenChange={(open) => open ? openModal('delete') : closeModal('delete')}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer la liste &quot;{title}&quot; ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => closeModal('delete')}>
              Annuler
            </Button>
            <Button type="button" className="bg-red-500 hover:bg-red-600 text-white" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
});

export default ShoppingListCard; 