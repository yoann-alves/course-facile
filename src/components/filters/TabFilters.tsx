import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface FilterTab {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
  tooltip?: string;
  disabled?: boolean;
}

interface TabFiltersProps {
  tabs: FilterTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  variant?: 'default' | 'pills' | 'underline' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  showCounts?: boolean;
  showBadges?: boolean;
  animate?: boolean;
}

/**
 * Composant réutilisable pour les filtres par onglets
 */
export default function TabFilters({
  tabs,
  activeTab,
  onTabChange,
  className,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  showCounts = true,
  showBadges = false,
  animate = true
}: TabFiltersProps) {
  // Styles de base pour les onglets
  const getTabStyles = (isActive: boolean, isDisabled: boolean) => {
    const baseStyles = "flex items-center justify-center transition-all duration-200";
    const sizeStyles = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-1.5 text-sm",
      lg: "px-4 py-2 text-base"
    };
    
    // Styles spécifiques à chaque variante
    const variantStyles = {
      default: cn(
        "border-b-2",
        isActive 
          ? "border-primary text-primary font-medium" 
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
        isDisabled && "opacity-50 cursor-not-allowed hover:text-gray-500 hover:border-transparent"
      ),
      pills: cn(
        "rounded-full",
        isActive 
          ? "bg-primary text-primary-foreground font-medium" 
          : "bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100",
        isDisabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-gray-500"
      ),
      underline: cn(
        "border-b-2",
        isActive 
          ? "border-primary text-gray-900 font-medium" 
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200",
        isDisabled && "opacity-50 cursor-not-allowed hover:text-gray-500 hover:border-transparent"
      ),
      minimal: cn(
        isActive 
          ? "text-gray-900 font-medium" 
          : "text-gray-500 hover:text-gray-700",
        isDisabled && "opacity-50 cursor-not-allowed hover:text-gray-500"
      )
    };
    
    return cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant]
    );
  };
  
  // Styles pour le conteneur des onglets
  const containerStyles = cn(
    "flex",
    variant === 'pills' ? "gap-2" : "border-b",
    fullWidth ? "w-full" : "w-auto",
    className
  );
  
  return (
    <div className={containerStyles}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isDisabled = tab.disabled || false;
        
        return (
          <TooltipProvider key={tab.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => !isDisabled && onTabChange(tab.id)}
                  className={cn(
                    getTabStyles(isActive, isDisabled),
                    fullWidth && "flex-1"
                  )}
                  disabled={isDisabled}
                >
                  {tab.icon && (
                    <span className="mr-2">{tab.icon}</span>
                  )}
                  <span>{tab.label}</span>
                  
                  {showCounts && tab.count !== undefined && (
                    showBadges ? (
                      <Badge 
                        variant={isActive ? "default" : "secondary"} 
                        className="ml-2"
                      >
                        {tab.count}
                      </Badge>
                    ) : (
                      <span className="ml-1 text-gray-400 text-xs">
                        ({tab.count})
                      </span>
                    )
                  )}
                  
                  {animate && isActive && variant !== 'pills' && (
                    <motion.div
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-0.5 bg-primary",
                        variant === 'underline' ? "h-0.5" : "h-[2px]"
                      )}
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              </TooltipTrigger>
              {tab.tooltip && (
                <TooltipContent>
                  <p>{tab.tooltip}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
} 