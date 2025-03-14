import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export interface FilterOption {
  id: string;
  label: string;
  options?: string[];
  type: 'select' | 'checkbox' | 'radio' | 'date' | 'range';
  selected?: string | string[] | boolean | [number, number] | Date;
}

export interface SearchAndFilterBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
  filters?: FilterOption[];
  onFilterChange?: (filters: FilterOption[]) => void;
  showFilterButton?: boolean;
  showClearButton?: boolean;
  debounceTime?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  inputClassName?: string;
}

export const SearchAndFilterBar = ({
  placeholder = 'Rechercher...',
  onSearch,
  onChange,
  value = '',
  className,
  filters = [],
  onFilterChange,
  showFilterButton = true,
  showClearButton = true,
  debounceTime = 300,
  size = 'md',
  variant = 'outline',
  inputClassName,
}: SearchAndFilterBarProps) => {
  const [searchValue, setSearchValue] = useState(value);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>(filters);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
    
    if (onSearch && debounceTime > 0) {
      if (timer) clearTimeout(timer);
      const newTimer = setTimeout(() => {
        onSearch(newValue);
      }, debounceTime);
      setTimer(newTimer);
    } else if (onSearch) {
      onSearch(newValue);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    if (onChange) onChange('');
    if (onSearch) onSearch('');
  };

  const handleFilterChange = (updatedFilters: FilterOption[]) => {
    setActiveFilters(updatedFilters);
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
    setIsFilterOpen(false);
  };

  const getActiveFilterCount = () => {
    return activeFilters.filter(filter => {
      if (Array.isArray(filter.selected)) {
        return filter.selected.length > 0;
      }
      return filter.selected !== undefined && filter.selected !== false && filter.selected !== '';
    }).length;
  };

  const activeFilterCount = getActiveFilterCount();

  const sizeClasses = {
    sm: 'h-8 text-xs',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base',
  };

  // Convertir la taille pour le bouton shadcn
  const buttonSize = size === 'md' ? 'default' : size;

  return (
    <div className={cn('flex items-center w-full gap-2', className)}>
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className={cn('text-muted-foreground', {
            'h-3.5 w-3.5': size === 'sm',
            'h-4 w-4': size === 'md',
            'h-5 w-5': size === 'lg',
          })} />
        </div>
        
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
          className={cn(
            sizeClasses[size],
            'pl-10 pr-10',
            inputClassName
          )}
        />
        
        {showClearButton && searchValue && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={handleClear}
          >
            <X className={cn('text-muted-foreground hover:text-foreground', {
              'h-3.5 w-3.5': size === 'sm',
              'h-4 w-4': size === 'md',
              'h-5 w-5': size === 'lg',
            })} />
          </button>
        )}
      </div>

      {showFilterButton && filters.length > 0 && (
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant={variant} 
              size={buttonSize} 
              className={cn('gap-1', {
                'bg-primary text-primary-foreground': activeFilterCount > 0 && variant !== 'ghost',
              })}
            >
              <Filter className={cn({
                'h-3.5 w-3.5': size === 'sm',
                'h-4 w-4': size === 'md',
                'h-5 w-5': size === 'lg',
              })} />
              {activeFilterCount > 0 && (
                <span className="ml-1">{activeFilterCount}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <h4 className="font-medium">Filtres</h4>
              
              <div className="space-y-2">
                {activeFilters.map((filter) => (
                  <div key={filter.id} className="flex flex-col gap-1">
                    <label className="text-sm font-medium">{filter.label}</label>
                    
                    {filter.type === 'select' && filter.options && (
                      <select
                        className="w-full p-2 border rounded-md"
                        value={filter.selected as string || ''}
                        onChange={(e) => {
                          const updatedFilters = activeFilters.map(f => 
                            f.id === filter.id ? { ...f, selected: e.target.value } : f
                          );
                          handleFilterChange(updatedFilters);
                        }}
                      >
                        <option value="">Tous</option>
                        {filter.options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    )}
                    
                    {filter.type === 'checkbox' && filter.options && (
                      <div className="space-y-1">
                        {filter.options.map(option => (
                          <div key={option} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`${filter.id}-${option}`}
                              checked={Array.isArray(filter.selected) && (filter.selected as string[]).includes(option)}
                              onChange={(e) => {
                                const currentSelected = Array.isArray(filter.selected) ? (filter.selected as string[]) : [];
                                const newSelected = e.target.checked
                                  ? [...currentSelected, option]
                                  : currentSelected.filter(item => item !== option);
                                
                                const updatedFilters = activeFilters.map(f => 
                                  f.id === filter.id ? { ...f, selected: newSelected } : f
                                );
                                handleFilterChange(updatedFilters);
                              }}
                              className="mr-2"
                            />
                            <label htmlFor={`${filter.id}-${option}`} className="text-sm">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const resetFilters = activeFilters.map(filter => {
                      if (filter.type === 'checkbox') {
                        return { ...filter, selected: [] as string[] };
                      }
                      return { ...filter, selected: '' };
                    });
                    handleFilterChange(resetFilters);
                  }}
                >
                  Réinitialiser
                </Button>
                <Button
                  size="sm"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Appliquer
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default SearchAndFilterBar; 