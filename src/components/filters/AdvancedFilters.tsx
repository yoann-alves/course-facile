import React from 'react';
import { Filter, Check, RotateCcw, Undo, Redo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
  count?: number;
  disabled?: boolean;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface AdvancedFiltersProps {
  filterGroups: FilterGroup[];
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  onResetFilters: () => void;
  activeFiltersCount: number;
  onApplyFilters?: () => void;
  onUndoFilterChange?: () => void;
  onRedoFilterChange?: () => void;
  onCancelChanges?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  isDirty?: boolean;
  filterStats?: {
    totalGroups: number;
    totalOptions: number;
    activeFiltersCount: number;
    groupStats: {
      groupId: string;
      groupLabel: string;
      totalOptions: number;
      activeOptions: number;
      allActive: boolean;
      noneActive: boolean;
    }[];
  };
  className?: string;
}

/**
 * Composant réutilisable pour les filtres avancés
 */
export default function AdvancedFilters({
  filterGroups,
  onFilterChange,
  onResetFilters,
  activeFiltersCount,
  onApplyFilters,
  onUndoFilterChange,
  onRedoFilterChange,
  onCancelChanges,
  canUndo = false,
  canRedo = false,
  isDirty = false,
  filterStats,
  className
}: AdvancedFiltersProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("flex items-center gap-2", className)}
        >
          <Filter className="h-4 w-4" />
          <span>Filtres</span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 h-5">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Filtres avancés</h3>
            <div className="flex items-center gap-1">
              {onUndoFilterChange && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        disabled={!canUndo}
                        onClick={onUndoFilterChange}
                      >
                        <Undo className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Annuler</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              {onRedoFilterChange && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        disabled={!canRedo}
                        onClick={onRedoFilterChange}
                      >
                        <Redo className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Rétablir</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={onResetFilters}
                disabled={activeFiltersCount === 0}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {filterStats && (
            <div className="text-xs text-gray-500 mt-1">
              {activeFiltersCount} sur {filterStats.totalOptions} options sélectionnées
            </div>
          )}
        </div>
        
        <Separator />
        
        <div className="max-h-[60vh] overflow-auto">
          {filterGroups.map((group) => (
            <div key={group.id} className="p-4 border-b last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">{group.label}</h4>
                {filterStats && (
                  <span className="text-xs text-gray-500">
                    {filterStats.groupStats.find(g => g.groupId === group.id)?.activeOptions || 0}/{group.options.length}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {group.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${group.id}-${option.id}`}
                      checked={option.checked}
                      disabled={option.disabled}
                      onCheckedChange={(checked) => {
                        onFilterChange(group.id, option.id, checked === true);
                      }}
                    />
                    <label
                      htmlFor={`${group.id}-${option.id}`}
                      className={cn(
                        "text-sm flex-1 cursor-pointer",
                        option.disabled && "text-gray-400 cursor-not-allowed"
                      )}
                    >
                      {option.label}
                      {option.count !== undefined && (
                        <span className="ml-1 text-gray-500">({option.count})</span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {(onApplyFilters || onCancelChanges) && (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 flex justify-end gap-2">
            {onCancelChanges && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onCancelChanges}
                disabled={!isDirty}
              >
                Annuler
              </Button>
            )}
            
            {onApplyFilters && (
              <Button
                variant="default"
                size="sm"
                onClick={onApplyFilters}
                disabled={!isDirty}
              >
                <Check className="h-4 w-4 mr-1" />
                Appliquer
              </Button>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
} 