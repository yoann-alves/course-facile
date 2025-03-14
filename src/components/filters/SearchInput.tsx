'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
  onReset?: () => void;
  showResetButton?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
}

/**
 * Composant réutilisable pour la recherche avec debounce intégré
 */
export default function SearchInput({
  value,
  onChange,
  placeholder = 'Rechercher...',
  className,
  debounceMs = 300,
  onReset,
  showResetButton = true,
  autoFocus = false,
  disabled = false
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  
  // Effet pour le debounce de la recherche
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, debounceMs);
    
    return () => {
      clearTimeout(handler);
    };
  }, [localValue, value, onChange, debounceMs]);
  
  // Mettre à jour la valeur locale lorsque la valeur externe change
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  
  // Gérer la réinitialisation de la recherche
  const handleReset = () => {
    setLocalValue('');
    if (onReset) {
      onReset();
    } else {
      onChange('');
    }
  };

  return (
    <div className={cn("relative flex-1", className)}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="pl-9 pr-10"
        autoFocus={autoFocus}
        disabled={disabled}
      />
      {showResetButton && localValue && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleReset}
                className="absolute right-1 top-1 h-8 w-8 p-0"
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Effacer la recherche</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
} 