import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Heading1 - Titre principal (h1)
 */
export function Heading1({ children, className, as: Component = 'h1' }: TypographyProps) {
  return (
    <Component className={cn(
      'scroll-m-20 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50',
      className
    )}>
      {children}
    </Component>
  );
}

/**
 * Heading2 - Titre secondaire (h2)
 */
export function Heading2({ children, className, as: Component = 'h2' }: TypographyProps) {
  return (
    <Component className={cn(
      'scroll-m-20 text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-50',
      className
    )}>
      {children}
    </Component>
  );
}

/**
 * Heading3 - Titre tertiaire (h3)
 */
export function Heading3({ children, className, as: Component = 'h3' }: TypographyProps) {
  return (
    <Component className={cn(
      'scroll-m-20 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50',
      className
    )}>
      {children}
    </Component>
  );
}

/**
 * Heading4 - Titre quaternaire (h4)
 */
export function Heading4({ children, className, as: Component = 'h4' }: TypographyProps) {
  return (
    <Component className={cn(
      'scroll-m-20 text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-50',
      className
    )}>
      {children}
    </Component>
  );
}

/**
 * Paragraph - Paragraphe standard (p)
 */
export function Paragraph({ children, className, as: Component = 'p' }: TypographyProps) {
  return (
    <Component className={cn(
      'leading-7 text-gray-700 dark:text-gray-300',
      className
    )}>
      {children}
    </Component>
  );
}

/**
 * SmallText - Texte de petite taille (small)
 */
export function SmallText({ children, className, as: Component = 'small' }: TypographyProps) {
  return (
    <Component className={cn(
      'text-sm text-gray-500 dark:text-gray-400',
      className
    )}>
      {children}
    </Component>
  );
}

/**
 * Muted - Texte atténué (p)
 */
export function Muted({ children, className, as: Component = 'p' }: TypographyProps) {
  return (
    <Component className={cn(
      'text-sm text-gray-500 dark:text-gray-400',
      className
    )}>
      {children}
    </Component>
  );
}

/**
 * Highlight - Texte mis en évidence (span)
 */
export function Highlight({ children, className, as: Component = 'span' }: TypographyProps) {
  return (
    <Component className={cn(
      'font-medium text-gray-900 dark:text-gray-50',
      className
    )}>
      {children}
    </Component>
  );
}

/**
 * Quote - Citation (blockquote)
 */
export function Quote({ children, className, as: Component = 'blockquote' }: TypographyProps) {
  return (
    <Component className={cn(
      'mt-6 border-l-2 border-gray-300 pl-6 italic text-gray-800 dark:border-gray-600 dark:text-gray-200',
      className
    )}>
      {children}
    </Component>
  );
}

/**
 * Code - Code inline (code)
 */
export function Code({ children, className, as: Component = 'code' }: TypographyProps) {
  return (
    <Component className={cn(
      'relative rounded bg-gray-100 px-[0.3rem] py-[0.2rem] font-mono text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-200',
      className
    )}>
      {children}
    </Component>
  );
}

/**
 * List - Liste non ordonnée (ul)
 */
export function List({ children, className, as: Component = 'ul' }: TypographyProps) {
  return (
    <Component className={cn(
      'my-6 ml-6 list-disc [&>li]:mt-2',
      className
    )}>
      {children}
    </Component>
  );
}

/**
 * ListItem - Élément de liste (li)
 */
export function ListItem({ children, className, as: Component = 'li' }: TypographyProps) {
  return (
    <Component className={cn(
      'text-gray-700 dark:text-gray-300',
      className
    )}>
      {children}
    </Component>
  );
} 