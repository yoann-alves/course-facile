import React, { useState, useContext, useRef, useEffect, memo } from 'react';
import Link from 'next/link';
import { ShoppingCart, Trash2, Package, MoreVertical, Share2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContext } from '@/components/ui/toast';
import { useFormatDate } from '@/hooks/useFormatDate';
import { useModals } from '@/hooks/useModals';

interface ShoppingListCardProps {
  id: string;
  title: string;
  itemCount: number;
  completedCount: number;
  createdAt: string;
  onDelete: (id: string) => void;
}

const ShoppingListCard = memo(function ShoppingListCard({ 
  id, 
  title, 
  itemCount, 
  completedCount = 0,
  createdAt, 
  onDelete 
}: ShoppingListCardProps) {
  const progress = itemCount > 0 ? (completedCount / itemCount) * 100 : 0;
  const [showActions, setShowActions] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const { showToast } = useContext(ToastContext);
  const dateFormatter = useFormatDate();
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Utiliser useModals pour gérer les modales
  const { isOpen, openModal, closeModal } = useModals();

  // Fermer le menu contextuel lorsque la souris quitte la carte
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowActions(false);
      }
    };

    const handleMouseLeave = () => {
      setShowActions(false);
    };

    if (showActions) {
      document.addEventListener('mousedown', handleClickOutside);
      if (cardRef.current) {
        cardRef.current.addEventListener('mouseleave', handleMouseLeave);
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (cardRef.current) {
        cardRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [showActions]);

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

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative"
      ref={cardRef}
    >
      <Link href={`/lists/${id}`} className="block">
        <Card className="w-full hover:shadow-lg transition-all duration-300 relative overflow-hidden cursor-pointer border-2 border-transparent hover:border-green-200 dark:hover:border-green-800">
          {/* Barre de progression en arrière-plan */}
          <div className="absolute bottom-0 left-0 h-1 bg-gray-100 dark:bg-gray-700 w-full">
            <div 
              className="h-full bg-green-500 dark:bg-green-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-full">
                  <ShoppingCart className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {title}
                  </CardTitle>
                  <CardDescription>
                    Créée le {dateFormatter.format(createdAt)}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
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
          </CardContent>
        </Card>
      </Link>

      {/* Menu d'actions flottant */}
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full w-8 h-8 p-0 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowActions(!showActions);
          }}
        >
          <MoreVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </Button>

        {showActions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <button 
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openModal('share');
                setShowActions(false);
              }}
            >
              <Share2 className="h-4 w-4 mr-2 text-green-500 dark:text-green-400" />
              Partager
            </button>
            <button 
              className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openModal('delete');
                setShowActions(false);
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </button>
          </motion.div>
        )}
      </div>

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
            <Button 
              type="button" 
              variant="default"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleDelete}
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
});

export default ShoppingListCard; 