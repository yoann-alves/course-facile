'use client';

import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ResetButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg' | 'icon';
  tooltipText?: string;
}

/**
 * Composant réutilisable pour réinitialiser les filtres
 */
export default function ResetButton({
  onClick,
  className,
  disabled = false,
  size = 'icon',
  tooltipText = 'Réinitialiser'
}: ResetButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size={size}
            onClick={onClick}
            disabled={disabled}
            className={cn("h-10 w-10", className)}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 