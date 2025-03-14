import React, { useState, useEffect } from 'react';
import { Search, ArrowUpDown, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SearchAndFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortToggle: () => void;
  sortLabel?: {
    asc: string;
    desc: string;
  };
  searchPlaceholder?: string;
  className?: string;
  debounceMs?: number;
  onResetSearch?: () => void;
  showResetButton?: boolean;
  sortField?: string;
  onSortFieldChange?: (field: string) => void;
  sortFields?: Array<{
    id: string;
    label: string;
  }>;
  filterStats?: {
    filteredItemCount: number;
    totalItemCount: number;
    filterReductionPercent: number;
  };
}

/**
 * Composant réutilisable pour la recherche et le tri
 */
export default function SearchAndFilterBar({
  searchTerm,
  onSearchChange,
  sortOrder,
  onSortToggle,
  sortLabel = {
    asc: 'Croissant',
    desc: 'Décroissant'
  },
  searchPlaceholder = 'Rechercher...',
  className,
  debounceMs = 300,
  onResetSearch,
  showResetButton = true,
  sortField,
  onSortFieldChange,
  sortFields,
  filterStats
}: SearchAndFilterBarProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  
  // Effet pour le debounce de la recherche
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        onSearchChange(localSearchTerm);
      }
    }, debounceMs);
    
    return () => {
      clearTimeout(handler);
    };
  }, [localSearchTerm, searchTerm, onSearchChange, debounceMs]);
  
  // Mettre à jour le terme de recherche local lorsque le terme de recherche externe change
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);
  
  // Gérer la réinitialisation de la recherche
  const handleResetSearch = () => {
    setLocalSearchTerm('');
    if (onResetSearch) {
      onResetSearch();
    } else {
      onSearchChange('');
    }
  };

  return (
    <div className={cn("flex flex-col sm:flex-row gap-2", className)}>
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          className="pl-9 pr-10"
        />
        {showResetButton && localSearchTerm && (
          <button
            type="button"
            onClick={handleResetSearch}
            className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <div className="flex gap-2">
        {sortFields && sortField && onSortFieldChange && (
          <select
            value={sortField}
            onChange={(e) => onSortFieldChange(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {sortFields.map((field) => (
              <option key={field.id} value={field.id}>
                {field.label}
              </option>
            ))}
          </select>
        )}
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onSortToggle}
                className="h-10 w-10"
              >
                <ArrowUpDown className={cn(
                  "h-4 w-4 transition-transform",
                  sortOrder === 'asc' ? "rotate-0" : "rotate-180"
                )} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{sortOrder === 'asc' ? sortLabel.asc : sortLabel.desc}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {showResetButton && searchTerm && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleResetSearch}
                  className="h-10 w-10"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Réinitialiser la recherche</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      {filterStats && (
        <div className="text-xs text-gray-500 mt-1 sm:mt-0 sm:ml-2 flex items-center">
          {filterStats.filteredItemCount} sur {filterStats.totalItemCount} éléments
          {filterStats.filterReductionPercent > 0 && (
            <span className="ml-1">
              (-{filterStats.filterReductionPercent}%)
            </span>
          )}
        </div>
      )}
    </div>
  );
} 