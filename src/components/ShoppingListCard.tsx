import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Edit, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ShoppingListCardProps {
  id: string;
  title: string;
  itemCount: number;
  createdAt: string;
  onDelete: (id: string) => void;
}

export default function ShoppingListCard({ id, title, itemCount, createdAt, onDelete }: ShoppingListCardProps) {
  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-green-600" />
            <CardTitle>{title}</CardTitle>
          </div>
        </div>
        <CardDescription>
          Créée le {new Date(createdAt).toLocaleDateString('fr-FR')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          {itemCount} {itemCount > 1 ? 'articles' : 'article'}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/shopping-list/${id}`}>
          <Button variant="ghost" size="sm">
            Voir
          </Button>
        </Link>
        <div className="flex gap-2">
          <Link href={`/shopping-list/${id}/edit`}>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Modifier
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Supprimer
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 