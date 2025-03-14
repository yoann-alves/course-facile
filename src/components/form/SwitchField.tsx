import React from 'react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { LucideIcon } from 'lucide-react';

export interface SwitchFieldProps {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  description?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  icon?: LucideIcon;
  labelPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Composant réutilisable pour les champs d'interrupteur
 */
export const SwitchField = ({
  id,
  label,
  checked,
  onCheckedChange,
  description,
  disabled = false,
  required = false,
  className,
  labelClassName,
  descriptionClassName,
  icon: Icon,
  labelPosition = 'right',
  size = 'md',
}: SwitchFieldProps) => {
  // Classes pour les tailles
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={cn('flex items-start', className)}>
      {labelPosition === 'left' && (
        <div className="mr-3 flex-1">
          <Label
            htmlFor={id}
            className={cn(
              'flex items-center text-foreground',
              sizeClasses[size],
              labelClassName
            )}
          >
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </Label>
          
          {description && (
            <p className={cn(
              'mt-1 text-muted-foreground',
              size === 'sm' ? 'text-xs' : 'text-sm',
              descriptionClassName
            )}>
              {description}
            </p>
          )}
        </div>
      )}
      
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        aria-required={required}
      />
      
      {labelPosition === 'right' && (
        <div className="ml-3 flex-1">
          <Label
            htmlFor={id}
            className={cn(
              'flex items-center text-foreground',
              sizeClasses[size],
              labelClassName
            )}
          >
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </Label>
          
          {description && (
            <p className={cn(
              'mt-1 text-muted-foreground',
              size === 'sm' ? 'text-xs' : 'text-sm',
              descriptionClassName
            )}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SwitchField; 