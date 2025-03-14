import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface GridProps {
  children: ReactNode;
  cols?: GridCols;
  colsSm?: GridCols;
  colsMd?: GridCols;
  colsLg?: GridCols;
  colsXl?: GridCols;
  gap?: GridGap;
  rowGap?: GridGap;
  columnGap?: GridGap;
  className?: string;
  as?: React.ElementType;
}

/**
 * Composant réutilisable pour les mises en page en grille
 */
export default function Grid({
  children,
  cols = 1,
  colsSm,
  colsMd,
  colsLg,
  colsXl,
  gap = 'md',
  rowGap,
  columnGap,
  className,
  as: Component = 'div',
}: GridProps) {
  // Classes pour le nombre de colonnes
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10',
    11: 'grid-cols-11',
    12: 'grid-cols-12',
  };

  // Classes pour le nombre de colonnes sur les différentes tailles d'écran
  const colsSmClasses = colsSm
    ? {
        1: 'sm:grid-cols-1',
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-3',
        4: 'sm:grid-cols-4',
        5: 'sm:grid-cols-5',
        6: 'sm:grid-cols-6',
        7: 'sm:grid-cols-7',
        8: 'sm:grid-cols-8',
        9: 'sm:grid-cols-9',
        10: 'sm:grid-cols-10',
        11: 'sm:grid-cols-11',
        12: 'sm:grid-cols-12',
      }
    : {};

  const colsMdClasses = colsMd
    ? {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
        5: 'md:grid-cols-5',
        6: 'md:grid-cols-6',
        7: 'md:grid-cols-7',
        8: 'md:grid-cols-8',
        9: 'md:grid-cols-9',
        10: 'md:grid-cols-10',
        11: 'md:grid-cols-11',
        12: 'md:grid-cols-12',
      }
    : {};

  const colsLgClasses = colsLg
    ? {
        1: 'lg:grid-cols-1',
        2: 'lg:grid-cols-2',
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4',
        5: 'lg:grid-cols-5',
        6: 'lg:grid-cols-6',
        7: 'lg:grid-cols-7',
        8: 'lg:grid-cols-8',
        9: 'lg:grid-cols-9',
        10: 'lg:grid-cols-10',
        11: 'lg:grid-cols-11',
        12: 'lg:grid-cols-12',
      }
    : {};

  const colsXlClasses = colsXl
    ? {
        1: 'xl:grid-cols-1',
        2: 'xl:grid-cols-2',
        3: 'xl:grid-cols-3',
        4: 'xl:grid-cols-4',
        5: 'xl:grid-cols-5',
        6: 'xl:grid-cols-6',
        7: 'xl:grid-cols-7',
        8: 'xl:grid-cols-8',
        9: 'xl:grid-cols-9',
        10: 'xl:grid-cols-10',
        11: 'xl:grid-cols-11',
        12: 'xl:grid-cols-12',
      }
    : {};

  // Classes pour les espaces
  const gapClasses = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const rowGapClasses = rowGap
    ? {
        none: 'row-gap-0',
        xs: 'row-gap-1',
        sm: 'row-gap-2',
        md: 'row-gap-4',
        lg: 'row-gap-6',
        xl: 'row-gap-8',
      }
    : {};

  const columnGapClasses = columnGap
    ? {
        none: 'column-gap-0',
        xs: 'column-gap-1',
        sm: 'column-gap-2',
        md: 'column-gap-4',
        lg: 'column-gap-6',
        xl: 'column-gap-8',
      }
    : {};

  return (
    <Component
      className={cn(
        'grid',
        colsClasses[cols],
        colsSm && colsSmClasses[colsSm],
        colsMd && colsMdClasses[colsMd],
        colsLg && colsLgClasses[colsLg],
        colsXl && colsXlClasses[colsXl],
        !rowGap && !columnGap && gapClasses[gap],
        rowGap && rowGapClasses[rowGap],
        columnGap && columnGapClasses[columnGap],
        className
      )}
    >
      {children}
    </Component>
  );
} 