'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import SearchInput from './SearchInput';
import SortButton from './SortButton';
import FilterStats from './FilterStats';
import ResetButton from './ResetButton';
import SortSelect from './SortSelect';

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
  sortFields = [],
  filterStats
}: SearchAndFilterBarProps) {
  const handleReset = () => {
    if (onResetSearch) {
      onResetSearch();
    } else {
      onSearchChange('');
    }
  };

  return (
    <div className={cn("flex flex-col sm:flex-row gap-2", className)}>
      <SearchInput
        value={searchTerm}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        debounceMs={debounceMs}
        onReset={onResetSearch}
        showResetButton={false} // Nous gérons le bouton de réinitialisation séparément
      />
      
      <div className="flex gap-2">
        {sortFields.length > 0 && sortField && onSortFieldChange && (
          <SortSelect
            value={sortField}
            onChange={onSortFieldChange}
            options={sortFields}
          />
        )}
        
        <SortButton
          sortOrder={sortOrder}
          onSortToggle={onSortToggle}
          label={sortLabel}
        />
        
        {showResetButton && searchTerm && (
          <ResetButton
            onClick={handleReset}
            tooltipText="Réinitialiser la recherche"
          />
        )}
      </div>
      
      {filterStats && (
        <FilterStats
          filteredItemCount={filterStats.filteredItemCount}
          totalItemCount={filterStats.totalItemCount}
          filterReductionPercent={filterStats.filterReductionPercent}
          className="mt-1 sm:mt-0 sm:ml-2"
        />
      )}
    </div>
  );
} 