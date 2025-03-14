import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export interface PageHeaderAction {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
  variant?: 'default' | 'secondary' | 'outline' | 'link' | 'ghost';
  disabled?: boolean;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: PageHeaderAction[];
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  actionsClassName?: string;
  backButton?: {
    href: string;
    label?: string;
  };
  tabs?: ReactNode;
  breadcrumbs?: ReactNode;
  divider?: boolean;
}

/**
 * Composant réutilisable pour les en-têtes de page
 */
export default function PageHeader({
  title,
  description,
  icon,
  actions,
  children,
  className,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  backButton,
  tabs,
  breadcrumbs,
  divider = true,
}: PageHeaderProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {breadcrumbs && <div className="mb-4">{breadcrumbs}</div>}
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          {backButton && (
            <Link href={backButton.href} className="mr-2 -ml-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
              >
                <span aria-hidden="true">←</span>
                {backButton.label || 'Retour'}
              </Button>
            </Link>
          )}
          
          {icon && (
            <Icon 
              icon={icon} 
              size="xl" 
              variant="primary" 
              withBackground 
              className="mt-0.5" 
            />
          )}
          
          <div>
            <h1 className={cn(
              "text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100",
              titleClassName
            )}>
              {title}
            </h1>
            
            {description && (
              <p className={cn(
                "mt-1 text-sm text-gray-500 dark:text-gray-400",
                descriptionClassName
              )}>
                {description}
              </p>
            )}
          </div>
        </div>
        
        {actions && actions.length > 0 && (
          <div className={cn(
            "flex flex-wrap items-center gap-2",
            actionsClassName
          )}>
            {actions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                variant={action.variant || 'default'}
                disabled={action.disabled}
                className="whitespace-nowrap"
              >
                {action.icon && (
                  <Icon 
                    icon={action.icon} 
                    size="sm" 
                    className="mr-1.5" 
                  />
                )}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
      
      {children && <div className="mt-4">{children}</div>}
      
      {tabs && <div className="mt-6">{tabs}</div>}
      
      {divider && (
        <hr className="mt-6 border-gray-200 dark:border-gray-800" />
      )}
    </div>
  );
} 