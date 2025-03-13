import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Edit, Trash2, ChevronRight, Package } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
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

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="w-full hover:shadow-lg transition-all duration-300 relative overflow-hidden">
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

        <CardFooter className="flex justify-between items-center">
          <Link href={`/shopping-list/${id}`} className="flex-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between hover:bg-green-50"
            >
              Voir la liste
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <div className="flex gap-2">
            <Link href={`/shopping-list/${id}/edit`}>
              <Button 
                variant="ghost" 
                size="sm"
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={() => onDelete(id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 