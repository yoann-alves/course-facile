import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface TabItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  disabled?: boolean;
  exact?: boolean;
  badge?: React.ReactNode;
}

export interface TabsNavigationProps {
  tabs: TabItem[];
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  disabledTabClassName?: string;
  variant?: 'default' | 'pills' | 'underline' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  showIcons?: boolean;
  iconPosition?: 'left' | 'right' | 'top';
}

export const TabsNavigation = ({
  tabs,
  className,
  tabClassName,
  activeTabClassName,
  disabledTabClassName,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  showIcons = true,
  iconPosition = 'left',
}: TabsNavigationProps) => {
  const pathname = usePathname();

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
    <nav
      className={cn(
        'flex overflow-x-auto scrollbar-hide',
        fullWidth ? 'w-full' : '',
        variantClasses[variant].container,
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.exact 
          ? pathname === tab.href
          : pathname.startsWith(tab.href);
        
        const Icon = tab.icon;
        
        const tabContent = (
          <>
            {showIcons && Icon && iconPosition === 'left' && (
              <Icon className={cn(iconSizeClasses[size])} />
            )}
            
            {showIcons && Icon && iconPosition === 'top' && (
              <div className="flex flex-col items-center gap-1">
                <Icon className={cn(iconSizeClasses[size])} />
                <span>{tab.label}</span>
              </div>
            )}
            
            {(iconPosition !== 'top' || !showIcons || !Icon) && (
              <span>{tab.label}</span>
            )}
            
            {tab.badge && (
              <span className="ml-1.5">{tab.badge}</span>
            )}
            
            {showIcons && Icon && iconPosition === 'right' && (
              <Icon className={cn(iconSizeClasses[size])} />
            )}
          </>
        );

        return (
          <div key={tab.href} className={fullWidth ? 'flex-1' : ''}>
            {tab.disabled ? (
              <span
                className={cn(
                  'flex items-center transition-colors focus:outline-none whitespace-nowrap',
                  sizeClasses[size],
                  variantClasses[variant].tab,
                  variantClasses[variant].disabled,
                  fullWidth && 'flex-1 justify-center',
                  tabClassName,
                  disabledTabClassName
                )}
              >
                {tabContent}
              </span>
            ) : (
              <Link
                href={tab.href}
                className={cn(
                  'flex items-center transition-colors focus:outline-none whitespace-nowrap',
                  sizeClasses[size],
                  variantClasses[variant].tab,
                  isActive && variantClasses[variant].active,
                  fullWidth && 'flex-1 justify-center',
                  tabClassName,
                  isActive && activeTabClassName
                )}
              >
                {tabContent}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default TabsNavigation; 