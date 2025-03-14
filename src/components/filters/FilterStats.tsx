'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface FilterStatsProps {
  filteredItemCount: number;
  totalItemCount: number;
  filterReductionPercent?: number;
  className?: string;
  showPercentage?: boolean;
  label?: {
    items: string;
    of: string;
  };
}

/**
 * Composant réutilisable pour afficher les statistiques de filtrage
 */
export default function FilterStats({
  filteredItemCount,
  totalItemCount,
  filterReductionPercent,
  className,
  showPercentage = true,
  label = {
    items: 'éléments',
    of: 'sur'
  }
}: FilterStatsProps) {
  // Calculer le pourcentage de réduction si non fourni
  const reductionPercent = filterReductionPercent !== undefined 
    ? filterReductionPercent 
    : totalItemCount > 0 
      ? Math.round((1 - filteredItemCount / totalItemCount) * 100) 
      : 0;

  return (
    <div className={cn("text-xs text-gray-500 flex items-center", className)}>
      {filteredItemCount} {label.of} {totalItemCount} {label.items}
      {showPercentage && reductionPercent > 0 && (
        <span className="ml-1">
          (-{reductionPercent}%)
        </span>
      )}
    </div>
  );
} 