import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
  homeHref?: string;
  showHomeIcon?: boolean;
  maxItems?: number;
  itemClassName?: string;
  activeItemClassName?: string;
  separatorClassName?: string;
}

/**
 * Composant réutilisable pour afficher un fil d'Ariane (breadcrumbs)
 */
export const Breadcrumbs = ({
  items,
  className,
  separator = <ChevronRight className="h-4 w-4 text-muted-foreground" />,
  homeHref = '/',
  showHomeIcon = true,
  maxItems = 0,
  itemClassName,
  activeItemClassName,
  separatorClassName,
}: BreadcrumbsProps) => {
  // Si maxItems est défini et que le nombre d'éléments dépasse maxItems,
  // on ne garde que le premier élément, le dernier élément et un élément "..."
  let displayedItems = items;
  if (maxItems > 0 && items.length > maxItems) {
    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    const ellipsisItem: BreadcrumbItem = { label: '...' };
    
    displayedItems = [firstItem, ellipsisItem, lastItem];
  }

  return (
    <nav aria-label="Fil d'Ariane" className={cn('flex items-center text-sm', className)}>
      <ol className="flex items-center space-x-2">
        {showHomeIcon && (
          <>
            <li className="flex items-center">
              <Link
                href={homeHref}
                className={cn(
                  'flex items-center text-muted-foreground hover:text-foreground transition-colors',
                  itemClassName
                )}
              >
                <Home className="h-4 w-4" />
                <span className="sr-only">Accueil</span>
              </Link>
            </li>
            <li className={cn('flex items-center', separatorClassName)}>
              {separator}
            </li>
          </>
        )}

        {displayedItems.map((item, index) => {
          const isLast = index === displayedItems.length - 1;
          const Icon = item.icon;

          return (
            <React.Fragment key={index}>
              <li className="flex items-center">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors',
                      itemClassName
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span
                    className={cn(
                      'flex items-center gap-1',
                      isLast ? 'font-medium text-foreground' : 'text-muted-foreground',
                      isLast && activeItemClassName,
                      itemClassName
                    )}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </span>
                )}
              </li>
              
              {!isLast && (
                <li className={cn('flex items-center', separatorClassName)}>
                  {separator}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs; 