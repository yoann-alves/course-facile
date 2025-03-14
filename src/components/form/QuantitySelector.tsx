import React from 'react';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  allowDirectInput?: boolean;
  label?: string;
  labelPosition?: 'top' | 'left' | 'right';
  onBlur?: () => void;
}

/**
 * Composant réutilisable pour sélectionner des quantités
 */
export default function QuantitySelector({
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  className,
  size = 'md',
  disabled = false,
  allowDirectInput = true,
  label,
  labelPosition = 'top',
  onBlur,
}: QuantitySelectorProps) {
  // Fonction pour incrémenter la valeur
  const increment = () => {
    if (value + step <= max) {
      onChange(value + step);
    }
  };

  // Fonction pour décrémenter la valeur
  const decrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };

  // Fonction pour gérer le changement direct de valeur
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      if (newValue >= min && newValue <= max) {
        onChange(newValue);
      } else if (newValue < min) {
        onChange(min);
      } else if (newValue > max) {
        onChange(max);
      }
    }
  };

  // Classes pour les tailles
  const sizeClasses = {
    sm: {
      container: 'h-8',
      button: 'h-8 w-8',
      input: 'h-8 w-10 text-sm',
    },
    md: {
      container: 'h-10',
      button: 'h-10 w-10',
      input: 'h-10 w-12 text-base',
    },
    lg: {
      container: 'h-12',
      button: 'h-12 w-12',
      input: 'h-12 w-16 text-lg',
    },
  };

  // Rendu du sélecteur
  const selector = (
    <div
      className={cn(
        'inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700',
        sizeClasses[size].container,
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          'rounded-l-md border-r border-gray-300 dark:border-gray-700',
          sizeClasses[size].button
        )}
        onClick={decrement}
        disabled={disabled || value <= min}
      >
        <Minus className="h-4 w-4" />
        <span className="sr-only">Diminuer</span>
      </Button>

      {allowDirectInput ? (
        <Input
          type="number"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(
            'border-0 text-center focus-visible:ring-0',
            sizeClasses[size].input
          )}
          onBlur={onBlur}
        />
      ) : (
        <div
          className={cn(
            'flex items-center justify-center',
            sizeClasses[size].input
          )}
        >
          <span className="font-medium">{value}</span>
        </div>
      )}

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          'rounded-r-md border-l border-gray-300 dark:border-gray-700',
          sizeClasses[size].button
        )}
        onClick={increment}
        disabled={disabled || value >= max}
      >
        <Plus className="h-4 w-4" />
        <span className="sr-only">Augmenter</span>
      </Button>
    </div>
  );

  // Rendu avec label
  if (label) {
    if (labelPosition === 'left') {
      return (
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          {selector}
        </div>
      );
    } else if (labelPosition === 'right') {
      return (
        <div className="flex items-center gap-2">
          {selector}
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          {selector}
        </div>
      );
    }
  }

  // Rendu sans label
  return selector;
} 