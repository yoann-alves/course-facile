import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export interface FormFieldProps {
  id: string;
  label?: string;
  description?: string;
  error?: string;
  children: ReactNode;
  required?: boolean;
  optional?: boolean;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  icon?: LucideIcon;
  tooltip?: string;
  horizontal?: boolean;
}

/**
 * Composant réutilisable pour les champs de formulaire
 */
export default function FormField({
  id,
  label,
  description,
  error,
  children,
  required = false,
  optional = false,
  className,
  labelClassName,
  descriptionClassName,
  errorClassName,
  icon,
  tooltip,
  horizontal = false,
}: FormFieldProps) {
  return (
    <div className={cn(
      'space-y-2',
      horizontal && 'sm:flex sm:items-start sm:gap-4 sm:space-y-0',
      className
    )}>
      {label && (
        <div className={cn(
          horizontal && 'sm:w-1/3 sm:pt-2',
        )}>
          <Label
            htmlFor={id}
            className={cn(
              'flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300',
              labelClassName
            )}
          >
            {icon && (
              <Icon 
                icon={icon} 
                size="sm" 
                variant="secondary" 
                className="shrink-0" 
              />
            )}
            {label}
            {required && <span className="text-red-500">*</span>}
            {optional && <span className="text-xs text-gray-500 font-normal">(optionnel)</span>}
            {tooltip && (
              <span className="ml-1 cursor-help text-gray-400" title={tooltip}>
                ⓘ
              </span>
            )}
          </Label>
          {description && (
            <p className={cn(
              'mt-1 text-xs text-gray-500 dark:text-gray-400',
              descriptionClassName
            )}>
              {description}
            </p>
          )}
        </div>
      )}
      <div className={cn(
        horizontal && 'sm:flex-1',
      )}>
        {children}
        {error && (
          <p className={cn(
            'mt-1 text-xs text-red-500',
            errorClassName
          )}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
} 