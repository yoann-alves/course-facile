import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Icon from '@/components/ui/icon';
import { THEME } from '@/lib/constants';

export type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary';

export interface StatusProps {
  label: string;
  variant?: StatusVariant;
  icon?: LucideIcon;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withDot?: boolean;
  withBackground?: boolean;
  tooltip?: string;
}

/**
 * Composant réutilisable pour afficher des statuts
 */
export default function Status({
  label,
  variant = 'neutral',
  icon,
  size = 'md',
  className,
  withDot = false,
  withBackground = true,
  tooltip,
}: StatusProps) {
  // Classes pour les variantes
  const variantClasses: Record<StatusVariant, { bg: string; text: string; border: string; dot: string }> = {
    success: {
      bg: `bg-${THEME.SUCCESS}-50 dark:bg-${THEME.SUCCESS}-900/20`,
      text: `text-${THEME.SUCCESS}-700 dark:text-${THEME.SUCCESS}-400`,
      border: `border-${THEME.SUCCESS}-200 dark:border-${THEME.SUCCESS}-900/30`,
      dot: `bg-${THEME.SUCCESS}-500`
    },
    warning: {
      bg: `bg-${THEME.WARNING}-50 dark:bg-${THEME.WARNING}-900/20`,
      text: `text-${THEME.WARNING}-700 dark:text-${THEME.WARNING}-400`,
      border: `border-${THEME.WARNING}-200 dark:border-${THEME.WARNING}-900/30`,
      dot: `bg-${THEME.WARNING}-500`
    },
    danger: {
      bg: `bg-${THEME.DANGER}-50 dark:bg-${THEME.DANGER}-900/20`,
      text: `text-${THEME.DANGER}-700 dark:text-${THEME.DANGER}-400`,
      border: `border-${THEME.DANGER}-200 dark:border-${THEME.DANGER}-900/30`,
      dot: `bg-${THEME.DANGER}-500`
    },
    info: {
      bg: `bg-${THEME.INFO}-50 dark:bg-${THEME.INFO}-900/20`,
      text: `text-${THEME.INFO}-700 dark:text-${THEME.INFO}-400`,
      border: `border-${THEME.INFO}-200 dark:border-${THEME.INFO}-900/30`,
      dot: `bg-${THEME.INFO}-500`
    },
    neutral: {
      bg: 'bg-gray-100 dark:bg-gray-800',
      text: 'text-gray-700 dark:text-gray-300',
      border: 'border-gray-200 dark:border-gray-700',
      dot: 'bg-gray-500'
    },
    primary: {
      bg: `bg-${THEME.PRIMARY}-50 dark:bg-${THEME.PRIMARY}-900/20`,
      text: `text-${THEME.PRIMARY}-700 dark:text-${THEME.PRIMARY}-400`,
      border: `border-${THEME.PRIMARY}-200 dark:border-${THEME.PRIMARY}-900/30`,
      dot: `bg-${THEME.PRIMARY}-500`
    }
  };

  // Classes pour les tailles
  const sizeClasses = {
    sm: 'text-xs py-0.5 px-2',
    md: 'text-sm py-1 px-2.5',
    lg: 'text-base py-1.5 px-3',
  };

  // Classes pour le point
  const dotSizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        withBackground && variantClasses[variant].bg,
        variantClasses[variant].text,
        withBackground ? sizeClasses[size] : '',
        !withBackground && 'py-0',
        withBackground && 'border',
        withBackground && variantClasses[variant].border,
        className
      )}
      title={tooltip}
    >
      {withDot && (
        <span
          className={cn(
            'rounded-full',
            dotSizeClasses[size],
            variantClasses[variant].dot
          )}
        />
      )}
      {icon && (
        <Icon
          icon={icon}
          size={size === 'lg' ? 'md' : size === 'md' ? 'sm' : 'xs'}
          variant={variant === 'neutral' ? 'secondary' : variant === 'primary' ? 'primary' : variant}
          className="shrink-0"
        />
      )}
      {label}
    </span>
  );
} 