import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Icon, { IconSize } from '@/components/ui/icon';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'secondary' | 'outline' | 'link' | 'ghost';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'secondary' | 'outline' | 'link' | 'ghost';
  };
  children?: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card' | 'minimal';
}

/**
 * Composant réutilisable pour afficher des états vides
 */
export default function EmptyState({
  title,
  description,
  icon: IconComponent,
  action,
  secondaryAction,
  children,
  className,
  size = 'md',
  variant = 'default',
}: EmptyStateProps) {
  // Classes pour la taille
  const sizeClasses = {
    sm: 'py-6 px-4',
    md: 'py-10 px-6',
    lg: 'py-16 px-8',
  };

  // Classes pour les variantes
  const variantClasses = {
    default: 'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg',
    card: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm',
    minimal: '',
  };

  // Classes pour l'icône
  const iconSizeClasses: Record<string, IconSize> = {
    sm: 'lg',
    md: 'xl',
    lg: 'xl',
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {IconComponent && (
        <div className="mb-4">
          <Icon 
            icon={IconComponent} 
            size={iconSizeClasses[size]} 
            variant="primary" 
            withBackground 
          />
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      {description && (
        <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
      {children && <div className="mt-4">{children}</div>}
      {(action || secondaryAction) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {action && (
            <Button
              onClick={action.onClick}
              variant={action.variant || 'default'}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant={secondaryAction.variant || 'outline'}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
} 