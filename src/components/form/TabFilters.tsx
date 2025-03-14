import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface TabOption {
  id: string;
  label: string;
  icon?: LucideIcon;
  count?: number;
  disabled?: boolean;
}

export interface TabFiltersProps {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  disabledTabClassName?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'pills' | 'underline' | 'outline';
  showCounts?: boolean;
  showIcons?: boolean;
  iconPosition?: 'left' | 'right' | 'top';
}

export const TabFilters = ({
  options,
  value,
  onChange,
  className,
  tabClassName,
  activeTabClassName,
  disabledTabClassName,
  fullWidth = false,
  size = 'md',
  variant = 'default',
  showCounts = true,
  showIcons = true,
  iconPosition = 'left',
}: TabFiltersProps) => {
  const sizeClasses = {
    sm: 'text-xs py-1 px-2 gap-1',
    md: 'text-sm py-2 px-3 gap-2',
    lg: 'text-base py-3 px-4 gap-2',
  };

  const variantClasses = {
    default: {
      container: 'border-b border-border',
      tab: 'border-b-2 border-transparent hover:border-muted-foreground',
      active: 'border-primary text-primary font-medium',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    pills: {
      container: 'gap-1',
      tab: 'rounded-full bg-transparent hover:bg-muted',
      active: 'bg-primary text-primary-foreground font-medium',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    underline: {
      container: '',
      tab: 'border-b-2 border-transparent hover:border-muted-foreground',
      active: 'border-primary text-primary font-medium',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    outline: {
      container: 'gap-1',
      tab: 'border border-border rounded-md hover:bg-muted',
      active: 'border-primary bg-primary/10 text-primary font-medium',
      disabled: 'opacity-50 cursor-not-allowed',
    },
  };

  const iconSizeClasses = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div
      className={cn(
        'flex overflow-x-auto scrollbar-hide',
        fullWidth ? 'w-full' : '',
        variantClasses[variant].container,
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.id === value;
        const Icon = option.icon;

        return (
          <button
            key={option.id}
            type="button"
            disabled={option.disabled}
            className={cn(
              'flex items-center transition-colors focus:outline-none whitespace-nowrap',
              sizeClasses[size],
              variantClasses[variant].tab,
              isActive && variantClasses[variant].active,
              option.disabled && variantClasses[variant].disabled,
              fullWidth && 'flex-1 justify-center',
              tabClassName,
              isActive && activeTabClassName,
              option.disabled && disabledTabClassName
            )}
            onClick={() => !option.disabled && onChange(option.id)}
          >
            {showIcons && Icon && iconPosition === 'left' && (
              <Icon className={cn(iconSizeClasses[size])} />
            )}
            
            {showIcons && Icon && iconPosition === 'top' && (
              <div className="flex flex-col items-center gap-1">
                <Icon className={cn(iconSizeClasses[size])} />
                <span>{option.label}</span>
              </div>
            )}
            
            {(iconPosition !== 'top' || !showIcons || !Icon) && (
              <span>{option.label}</span>
            )}
            
            {showCounts && option.count !== undefined && (
              <span className={cn(
                'rounded-full bg-muted px-1.5 ml-1 text-muted-foreground',
                isActive && 'bg-primary/20 text-primary',
                {
                  'text-[0.65rem]': size === 'sm',
                  'text-xs': size === 'md',
                  'text-sm': size === 'lg',
                }
              )}>
                {option.count}
              </span>
            )}
            
            {showIcons && Icon && iconPosition === 'right' && (
              <Icon className={cn(iconSizeClasses[size])} />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TabFilters; 