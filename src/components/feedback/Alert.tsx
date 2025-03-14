import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: AlertVariant;
  icon?: React.ReactNode;
  onClose?: () => void;
  className?: string;
  actions?: React.ReactNode;
  bordered?: boolean;
  compact?: boolean;
}

/**
 * Composant réutilisable pour afficher des messages d'alerte
 */
export const Alert = ({
  title,
  children,
  variant = 'info',
  icon,
  onClose,
  className,
  actions,
  bordered = false,
  compact = false,
}: AlertProps) => {
  const variantStyles = {
    info: {
      container: 'bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
      border: 'border-blue-200 dark:border-blue-800',
      icon: <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />,
    },
    success: {
      container: 'bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200',
      border: 'border-green-200 dark:border-green-800',
      icon: <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />,
    },
    warning: {
      container: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200',
      border: 'border-yellow-200 dark:border-yellow-800',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />,
    },
    error: {
      container: 'bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200',
      border: 'border-red-200 dark:border-red-800',
      icon: <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />,
    },
  };

  return (
    <div
      className={cn(
        'rounded-lg p-4',
        variantStyles[variant].container,
        bordered && `border ${variantStyles[variant].border}`,
        className
      )}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {icon || variantStyles[variant].icon}
        </div>
        <div className={cn('ml-3', compact ? 'flex items-center' : '')}>
          {title && (
            <h3 className={cn('text-sm font-medium', compact ? 'mr-2' : 'mb-2')}>
              {title}
            </h3>
          )}
          <div className={cn('text-sm', title && !compact && 'mt-2')}>
            {children}
          </div>
          {actions && (
            <div className={cn('mt-4', compact && 'ml-auto')}>
              {actions}
            </div>
          )}
        </div>
        {onClose && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 hover:bg-opacity-10 hover:bg-black focus:outline-none"
            onClick={onClose}
            aria-label="Fermer"
          >
            <span className="sr-only">Fermer</span>
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert; 