import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Icon from '@/components/ui/icon';

export interface SectionProps {
  children: ReactNode;
  title?: string;
  description?: string;
  icon?: LucideIcon;
  actions?: ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  variant?: 'default' | 'card' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  divider?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  id?: string;
}

/**
 * Composant réutilisable pour organiser les sections de page
 */
export default function Section({
  children,
  title,
  description,
  icon,
  actions,
  className,
  contentClassName,
  headerClassName,
  variant = 'default',
  size = 'md',
  divider = false,
  collapsible = false,
  defaultCollapsed = false,
  id,
}: SectionProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  // Classes pour la taille du padding
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  // Classes pour les variantes
  const variantClasses = {
    default: '',
    card: 'bg-white dark:bg-gray-900 rounded-lg shadow-sm',
    outline: 'border border-gray-200 dark:border-gray-800 rounded-lg',
  };

  // Rendu du header de section
  const renderHeader = () => {
    if (!title && !description && !icon && !actions) return null;

    return (
      <div className={cn(
        'flex items-start justify-between gap-4 mb-4',
        headerClassName
      )}>
        <div className="flex items-start gap-3">
          {icon && (
            <Icon 
              icon={icon} 
              size="lg" 
              variant="primary" 
              withBackground 
              className="mt-0.5"
            />
          )}
          <div>
            {title && (
              <h3 className={cn(
                "text-lg font-medium text-gray-900 dark:text-gray-100",
                collapsible && "cursor-pointer flex items-center gap-2"
              )} 
              onClick={collapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
              >
                {title}
                {collapsible && (
                  <span className="text-gray-500">
                    {isCollapsed ? '▼' : '▲'}
                  </span>
                )}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0">
            {actions}
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      id={id}
      className={cn(
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {renderHeader()}
      {divider && (title || description || icon || actions) && (
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
      )}
      {(!collapsible || !isCollapsed) && (
        <div className={cn(contentClassName)}>
          {children}
        </div>
      )}
    </section>
  );
} 