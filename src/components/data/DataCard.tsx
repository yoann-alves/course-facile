import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Icon from '@/components/ui/icon';
import { THEME } from '@/lib/constants';

export interface DataCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    label?: string;
    isPositive?: boolean;
  };
  footer?: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

/**
 * Composant réutilisable pour afficher des cartes de données
 */
export default function DataCard({
  title,
  value,
  icon,
  description,
  trend,
  footer,
  className,
  onClick,
  variant = 'default',
  size = 'md',
  loading = false,
}: DataCardProps) {
  // Classes pour les variantes
  const variantClasses = {
    default: {
      card: 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800',
      icon: 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400',
      title: 'text-gray-500 dark:text-gray-400',
      value: 'text-gray-900 dark:text-gray-100',
    },
    primary: {
      card: `bg-white dark:bg-gray-900 border-${THEME.PRIMARY}-200 dark:border-${THEME.PRIMARY}-900/30`,
      icon: `bg-${THEME.PRIMARY}-50 dark:bg-${THEME.PRIMARY}-900/30 text-${THEME.PRIMARY}-600 dark:text-${THEME.PRIMARY}-400`,
      title: `text-${THEME.PRIMARY}-600 dark:text-${THEME.PRIMARY}-400`,
      value: 'text-gray-900 dark:text-gray-100',
    },
    success: {
      card: `bg-white dark:bg-gray-900 border-${THEME.SUCCESS}-200 dark:border-${THEME.SUCCESS}-900/30`,
      icon: `bg-${THEME.SUCCESS}-50 dark:bg-${THEME.SUCCESS}-900/30 text-${THEME.SUCCESS}-600 dark:text-${THEME.SUCCESS}-400`,
      title: `text-${THEME.SUCCESS}-600 dark:text-${THEME.SUCCESS}-400`,
      value: 'text-gray-900 dark:text-gray-100',
    },
    warning: {
      card: `bg-white dark:bg-gray-900 border-${THEME.WARNING}-200 dark:border-${THEME.WARNING}-900/30`,
      icon: `bg-${THEME.WARNING}-50 dark:bg-${THEME.WARNING}-900/30 text-${THEME.WARNING}-600 dark:text-${THEME.WARNING}-400`,
      title: `text-${THEME.WARNING}-600 dark:text-${THEME.WARNING}-400`,
      value: 'text-gray-900 dark:text-gray-100',
    },
    danger: {
      card: `bg-white dark:bg-gray-900 border-${THEME.DANGER}-200 dark:border-${THEME.DANGER}-900/30`,
      icon: `bg-${THEME.DANGER}-50 dark:bg-${THEME.DANGER}-900/30 text-${THEME.DANGER}-600 dark:text-${THEME.DANGER}-400`,
      title: `text-${THEME.DANGER}-600 dark:text-${THEME.DANGER}-400`,
      value: 'text-gray-900 dark:text-gray-100',
    },
    info: {
      card: `bg-white dark:bg-gray-900 border-${THEME.INFO}-200 dark:border-${THEME.INFO}-900/30`,
      icon: `bg-${THEME.INFO}-50 dark:bg-${THEME.INFO}-900/30 text-${THEME.INFO}-600 dark:text-${THEME.INFO}-400`,
      title: `text-${THEME.INFO}-600 dark:text-${THEME.INFO}-400`,
      value: 'text-gray-900 dark:text-gray-100',
    },
  };

  // Classes pour les tailles
  const sizeClasses = {
    sm: {
      card: 'p-4',
      icon: 'p-2',
      title: 'text-xs',
      value: 'text-xl',
      description: 'text-xs',
    },
    md: {
      card: 'p-5',
      icon: 'p-2.5',
      title: 'text-sm',
      value: 'text-2xl',
      description: 'text-sm',
    },
    lg: {
      card: 'p-6',
      icon: 'p-3',
      title: 'text-base',
      value: 'text-3xl',
      description: 'text-sm',
    },
  };

  return (
    <div
      className={cn(
        'rounded-lg border shadow-sm',
        variantClasses[variant].card,
        sizeClasses[size].card,
        onClick && 'cursor-pointer hover:shadow-md transition-shadow',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className={cn(
            'font-medium',
            sizeClasses[size].title,
            variantClasses[variant].title
          )}>
            {title}
          </h3>
          <div className={cn(
            'font-semibold mt-1',
            sizeClasses[size].value,
            variantClasses[variant].value
          )}>
            {loading ? (
              <div className="h-7 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            ) : (
              value
            )}
          </div>
        </div>
        {icon && (
          <div className={cn(
            'rounded-full',
            variantClasses[variant].icon,
            sizeClasses[size].icon
          )}>
            <Icon
              icon={icon}
              size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'}
            />
          </div>
        )}
      </div>

      {(description || trend) && (
        <div className="mt-2">
          {description && (
            <p className={cn(
              'text-gray-500 dark:text-gray-400',
              sizeClasses[size].description
            )}>
              {description}
            </p>
          )}
          {trend && (
            <div className="mt-1 flex items-center gap-1">
              <span
                className={cn(
                  'flex items-center gap-0.5 font-medium',
                  trend.isPositive
                    ? `text-${THEME.SUCCESS}-600 dark:text-${THEME.SUCCESS}-400`
                    : `text-${THEME.DANGER}-600 dark:text-${THEME.DANGER}-400`
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              {trend.label && (
                <span className="text-gray-500 dark:text-gray-400 text-xs">
                  {trend.label}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
} 