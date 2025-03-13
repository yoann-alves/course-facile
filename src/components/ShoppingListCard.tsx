import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Trash2, Package, MoreVertical, Edit, Share2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative"
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
                    <span className="text-sm font-normal text-gray-400">#{id.slice(0, 4)}</span>
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
            <Link href={`/lists/${id}`}>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                <Edit className="h-4 w-4 mr-2 text-blue-500" />
                Voir/Éditer
              </button>
            </Link>
            <button 
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={(e) => {
                e.preventDefault();
                // Fonctionnalité de partage (à implémenter)
              }}
            >
              <Share2 className="h-4 w-4 mr-2 text-green-500" />
              Partager
            </button>
            <button 
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
              onClick={(e) => {
                e.preventDefault();
                onDelete(id);
                setShowActions(false);
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
} 