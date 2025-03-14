'use client';

import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SortButtonProps {
  sortOrder: 'asc' | 'desc';
  onSortToggle: () => void;
  label?: {
    asc: string;
    desc: string;
  };
  className?: string;
  size?: 'sm' | 'default' | 'lg' | 'icon';
}

/**
 * Composant réutilisable pour le tri
 */
export default function SortButton({
  sortOrder,
  onSortToggle,
  label = {
    asc: 'Croissant',
    desc: 'Décroissant'
  },
  className,
  size = 'icon'
}: SortButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size={size}
            onClick={onSortToggle}
            className={cn("h-10 w-10", className)}
          >
            <ArrowUpDown className={cn(
              "h-4 w-4 transition-transform",
              sortOrder === 'asc' ? "rotate-0" : "rotate-180"
            )} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{sortOrder === 'asc' ? label.asc : label.desc}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 