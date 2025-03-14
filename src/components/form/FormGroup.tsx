import React from 'react';
import { cn } from '@/lib/utils';

export interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  layout?: 'vertical' | 'horizontal' | 'grid';
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
}

/**
 * Composant réutilisable pour regrouper des champs de formulaire
 */
export const FormGroup = ({
  children,
  className,
  title,
  description,
  layout = 'vertical',
  columns = 1,
  gap = 'md',
  titleClassName,
  descriptionClassName,
  contentClassName,
}: FormGroupProps) => {
  // Classes pour les dispositions
  const layoutClasses = {
    vertical: 'flex flex-col',
    horizontal: 'sm:flex sm:flex-row sm:items-start',
    grid: 'grid',
  };

  // Classes pour les colonnes (uniquement pour la disposition en grille)
  const columnsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
  };

  // Classes pour les espaces
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div
      className={cn(
        'mb-6',
        className
      )}
    >
      {(title || description) && (
        <div className={cn(
          'mb-4',
          layout === 'horizontal' && 'sm:w-1/3 sm:pr-4'
        )}>
          {title && (
            <h3 className={cn('text-base font-medium mb-1', titleClassName)}>
              {title}
            </h3>
          )}
          {description && (
            <p className={cn('text-sm text-muted-foreground', descriptionClassName)}>
              {description}
            </p>
          )}
        </div>
      )}

      <div
        className={cn(
          layout === 'grid' && [layoutClasses.grid, columnsClasses[columns]],
          layout !== 'grid' && layoutClasses[layout],
          gapClasses[gap],
          layout === 'horizontal' && (title || description) && 'sm:w-2/3',
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default FormGroup; 