import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { THEME } from '@/lib/constants';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'muted';

interface IconProps {
  icon: LucideIcon;
  size?: IconSize;
  className?: string;
  variant?: IconVariant;
  withBackground?: boolean;
  onClick?: () => void;
  label?: string;
  labelPosition?: 'left' | 'right';
}

/**
 * Composant d'icône réutilisable avec différentes variantes et tailles
 */
export default function Icon({ 
  icon: IconComponent, 
  size = 'md', 
  className,
  variant = 'default',
  withBackground = false,
  onClick,
  label,
  labelPosition = 'right'
}: IconProps) {
  // Classes de taille pour l'icône
  const sizeClasses: Record<IconSize, string> = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8'
  };
  
  // Classes de couleur pour l'icône
  const variantClasses: Record<IconVariant, string> = {
    default: 'text-gray-500 dark:text-gray-400',
    primary: `text-${THEME.PRIMARY}-600 dark:text-${THEME.PRIMARY}-400`,
    secondary: 'text-gray-600 dark:text-gray-300',
    success: `text-${THEME.SUCCESS}-600 dark:text-${THEME.SUCCESS}-400`,
    warning: `text-${THEME.WARNING}-600 dark:text-${THEME.WARNING}-400`,
    danger: `text-${THEME.DANGER}-600 dark:text-${THEME.DANGER}-400`,
    info: `text-${THEME.INFO}-600 dark:text-${THEME.INFO}-400`,
    muted: 'text-gray-400 dark:text-gray-500'
  };
  
  // Classes de fond pour l'icône
  const backgroundClasses: Record<IconVariant, string> = {
    default: 'bg-gray-100 dark:bg-gray-800',
    primary: `bg-${THEME.PRIMARY}-50 dark:bg-${THEME.PRIMARY}-900/30`,
    secondary: 'bg-gray-100 dark:bg-gray-800',
    success: `bg-${THEME.SUCCESS}-50 dark:bg-${THEME.SUCCESS}-900/30`,
    warning: `bg-${THEME.WARNING}-50 dark:bg-${THEME.WARNING}-900/30`,
    danger: `bg-${THEME.DANGER}-50 dark:bg-${THEME.DANGER}-900/30`,
    info: `bg-${THEME.INFO}-50 dark:bg-${THEME.INFO}-900/30`,
    muted: 'bg-gray-50 dark:bg-gray-900'
  };
  
  // Classes pour le conteneur avec fond
  const containerClasses = cn(
    "flex items-center justify-center rounded-full",
    {
      'p-1': size === 'xs' || size === 'sm',
      'p-2': size === 'md',
      'p-3': size === 'lg' || size === 'xl'
    },
    backgroundClasses[variant],
    onClick && 'cursor-pointer hover:opacity-80'
  );
  
  // Classes pour le conteneur avec label
  const labelContainerClasses = cn(
    "flex items-center gap-1.5",
    onClick && 'cursor-pointer'
  );
  
  // Rendu de l'icône avec fond
  if (withBackground) {
    return (
      <div 
        className={cn(containerClasses, className)}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        <IconComponent className={cn(sizeClasses[size], variantClasses[variant])} />
      </div>
    );
  }
  
  // Rendu de l'icône avec label
  if (label) {
    return (
      <div 
        className={cn(labelContainerClasses, className)}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        {labelPosition === 'left' && <span className={variantClasses[variant]}>{label}</span>}
        <IconComponent className={cn(sizeClasses[size], variantClasses[variant])} />
        {labelPosition === 'right' && <span className={variantClasses[variant]}>{label}</span>}
      </div>
    );
  }
  
  // Rendu de l'icône simple
  return (
    <IconComponent 
      className={cn(sizeClasses[size], variantClasses[variant], onClick && 'cursor-pointer hover:opacity-80', className)} 
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    />
  );
} 