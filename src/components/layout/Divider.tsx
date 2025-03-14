import React from 'react';
import { cn } from '@/lib/utils';

export interface DividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'dashed' | 'dotted';
  size?: 'thin' | 'medium' | 'thick';
  color?: 'default' | 'primary' | 'muted';
  label?: React.ReactNode;
  labelPosition?: 'left' | 'center' | 'right';
  spacing?: 'sm' | 'md' | 'lg';
}

/**
 * Composant réutilisable pour créer un séparateur horizontal ou vertical
 */
export const Divider = ({
  className,
  orientation = 'horizontal',
  variant = 'default',
  size = 'thin',
  color = 'default',
  label,
  labelPosition = 'center',
  spacing = 'md',
}: DividerProps) => {
  // Classes pour l'orientation
  const orientationClasses = {
    horizontal: 'w-full',
    vertical: 'h-full',
  };

  // Classes pour les variantes
  const variantClasses = {
    default: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  // Classes pour les tailles
  const sizeClasses = {
    thin: orientation === 'horizontal' ? 'border-t' : 'border-l',
    medium: orientation === 'horizontal' ? 'border-t-2' : 'border-l-2',
    thick: orientation === 'horizontal' ? 'border-t-4' : 'border-l-4',
  };

  // Classes pour les couleurs
  const colorClasses = {
    default: 'border-border',
    primary: 'border-primary',
    muted: 'border-muted',
  };

  // Classes pour l'espacement
  const spacingClasses = {
    sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
    md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
  };

  // Si pas de label, retourner un simple séparateur
  if (!label) {
    return (
      <div
        className={cn(
          orientationClasses[orientation],
          variantClasses[variant],
          sizeClasses[size],
          colorClasses[color],
          spacingClasses[spacing],
          className
        )}
      />
    );
  }

  // Avec label, retourner un séparateur avec texte
  return (
    <div className={cn('flex items-center', spacingClasses[spacing], className)}>
      {labelPosition === 'left' && (
        <div className="mr-3 whitespace-nowrap">{label}</div>
      )}
      
      <div
        className={cn(
          'flex-grow',
          variantClasses[variant],
          sizeClasses[size],
          colorClasses[color]
        )}
      />
      
      {labelPosition === 'center' && (
        <div className="mx-3 whitespace-nowrap">{label}</div>
      )}
      
      {(labelPosition === 'center' || labelPosition === 'right') && (
        <div
          className={cn(
            'flex-grow',
            variantClasses[variant],
            sizeClasses[size],
            colorClasses[color]
          )}
        />
      )}
      
      {labelPosition === 'right' && (
        <div className="ml-3 whitespace-nowrap">{label}</div>
      )}
    </div>
  );
};

export default Divider; 