import React from 'react';
import { cn } from '@/lib/utils';
import { X, LucideIcon } from 'lucide-react';

export type TagVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger' | 'info';

export interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  onRemove?: () => void;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
}

/**
 * Composant réutilisable pour afficher des étiquettes
 */
export const Tag = ({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  onRemove,
  className,
  interactive = false,
  onClick,
  disabled = false,
  title,
}: TagProps) => {
  // Classes pour les variantes
  const variantClasses = {
    default: 'bg-muted text-muted-foreground hover:bg-muted/80',
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/40',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/40',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/40',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/40',
  };

  // Classes pour les tailles
  const sizeClasses = {
    sm: 'text-xs py-0.5 px-2 rounded-md',
    md: 'text-sm py-1 px-2.5 rounded-md',
    lg: 'text-base py-1.5 px-3 rounded-lg',
  };

  // Classes pour les icônes
  const iconSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  };

  // Gérer le clic
  const handleClick = () => {
    if (interactive && onClick && !disabled) {
      onClick();
    }
  };

  return (
    <div
      className={cn(
        'inline-flex items-center font-medium',
        sizeClasses[size],
        variantClasses[variant],
        interactive && !disabled && 'cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={handleClick}
      title={title}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-disabled={disabled}
    >
      {Icon && (
        <Icon className={cn('mr-1.5 flex-shrink-0', iconSizeClasses[size])} />
      )}
      <span>{children}</span>
      {onRemove && !disabled && (
        <button
          type="button"
          className={cn(
            'ml-1.5 rounded-full hover:bg-black/10 flex items-center justify-center',
            size === 'sm' ? 'h-3.5 w-3.5' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'
          )}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label="Supprimer"
        >
          <X className={cn(
            size === 'sm' ? 'h-2.5 w-2.5' : size === 'md' ? 'h-3 w-3' : 'h-3.5 w-3.5'
          )} />
        </button>
      )}
    </div>
  );
};

export default Tag; 