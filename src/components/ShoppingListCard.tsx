import React, { useState, useContext, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Trash2, Package, MoreVertical, Share2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// @ts-expect-error - Le module framer-motion est installé mais les types ne sont pas disponibles
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
// @ts-expect-error - Le module Label est créé mais le linter ne le reconnaît pas encore
import { Label } from "@/components/ui/label";
import { ToastContext } from '@/components/ui/toast';

interface ShoppingListCardProps {
  id: string;
  title: string;
  itemCount: number;
  completedCount: number;
  createdAt: string;
  onDelete: (id: string) => void;
}

export default function ShoppingListCard({ 
  id, 
  title, 
  itemCount, 
  completedCount = 0,
  createdAt, 
  onDelete 
}: ShoppingListCardProps) {
  const progress = itemCount > 0 ? (completedCount / itemCount) * 100 : 0;
  const [showActions, setShowActions] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const { showToast } = useContext(ToastContext);
  const cardRef = useRef<HTMLDivElement>(null);

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
      console.log(`Partage de la liste ${id} avec ${shareEmail}`);
      showToast(`Liste "${title}" partagée avec ${shareEmail}`, 'success');
      setShareEmail('');
      setShowShareDialog(false);
      // Dans une vraie application, nous enverrions une invitation de partage ici
    }, 1000);
  };

  const handleDelete = () => {
    // Afficher un toast de chargement pendant la "suppression"
    showToast('Suppression en cours...', 'loading');
    
    // Simuler un délai de traitement
    setTimeout(() => {
      console.log(`Suppression de la liste ${id}`);
      onDelete(id);
      showToast(`Liste "${title}" supprimée avec succès`, 'success');
      setShowDeleteDialog(false);
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
        <Card className="w-full hover:shadow-lg transition-all duration-300 relative overflow-hidden cursor-pointer border-2 border-transparent hover:border-green-200">
          {/* Barre de progression en arrière-plan */}
          <div className="absolute bottom-0 left-0 h-1 bg-gray-100 w-full">
            <div 
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-full">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {title}
                  </CardTitle>
                  <CardDescription>
                    Créée le {new Date(createdAt).toLocaleDateString('fr-FR')}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {itemCount} {itemCount > 1 ? 'articles' : 'article'}
                </span>
              </div>
              <div className="text-sm text-gray-500">
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
          className="rounded-full w-8 h-8 p-0 bg-white hover:bg-gray-100"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowActions(!showActions);
          }}
        >
          <MoreVertical className="h-4 w-4 text-gray-500" />
        </Button>

        {showActions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 mt-1 w-36 bg-white shadow-lg rounded-md overflow-hidden border border-gray-200"
          >
            <button 
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowShareDialog(true);
                setShowActions(false);
              }}
            >
              <Share2 className="h-4 w-4 mr-2 text-green-500" />
              Partager
            </button>
            <button 
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDeleteDialog(true);
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
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
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
            <Button type="button" variant="outline" onClick={() => setShowShareDialog(false)}>
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
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer la liste &quot;{title}&quot; ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Annuler
            </Button>
            <Button type="button" variant="secondary" className="bg-red-500 text-white hover:bg-red-600" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
} 