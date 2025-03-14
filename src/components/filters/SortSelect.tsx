'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SortField {
  id: string;
  label: string;
}

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SortField[];
  className?: string;
  disabled?: boolean;
}

/**
 * Composant réutilisable pour la sélection du champ de tri
 */
export default function SortSelect({
  value,
  onChange,
  options,
  className,
  disabled = false
}: SortSelectProps) {
  if (options.length === 0) {
    return null;
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={cn(
        "h-10 rounded-md border border-input bg-background px-3 py-2 text-sm",
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
} 