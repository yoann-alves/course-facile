'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface BaseCardAction {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  variant?: 'default' | 'destructive';
}

export interface BaseCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  actions?: BaseCardAction[];
  href?: string;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  progressPercent?: number;
  progressColor?: string;
  onClick?: () => void;
  animate?: boolean;
}

/**
 * Composant de carte de base réutilisable
 * Peut être utilisé comme base pour différents types de cartes dans l'application
 */
export default function BaseCard({
  title,
  description,
  icon,
  content,
  footer,
  actions = [],
  href,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  progressPercent,
  progressColor = 'bg-green-500 dark:bg-green-600',
  onClick,
  animate = true
}: BaseCardProps) {
  const [showActions, setShowActions] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Fermer le menu contextuel lorsque la souris quitte la carte ou qu'on clique ailleurs
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowActions(false);
      }
    };

    const handleMouseLeave = () => {
      setShowActions(false);
    };

    if (showActions) {
      document.addEventListener('mousedown', handleClickOutside);
      if (cardRef.current) {
        cardRef.current.addEventListener('mouseleave', handleMouseLeave);
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (cardRef.current) {
        cardRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [showActions]);

  // Wrapper pour le contenu de la carte
  const CardWrapper = ({ children }: { children: ReactNode }) => {
    if (href) {
      return (
        <Link href={href} className="block">
          {children}
        </Link>
      );
    }
    
    if (onClick) {
      return (
        <div onClick={onClick} className="cursor-pointer">
          {children}
        </div>
      );
    }
    
    return <>{children}</>;
  };

  const cardContent = (
    <Card className={cn(
      "w-full hover:shadow-lg transition-all duration-300 relative overflow-hidden border-2 border-transparent hover:border-green-200 dark:hover:border-green-800",
      className
    )}>
      {/* Barre de progression en arrière-plan si progressPercent est défini */}
      {progressPercent !== undefined && (
        <div className="absolute bottom-0 left-0 h-1 bg-gray-100 dark:bg-gray-700 w-full">
          <div 
            className={cn("h-full transition-all duration-500", progressColor)}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      <CardHeader className={headerClassName}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-full">
                {icon}
              </div>
            )}
            <div>
              <CardTitle className="flex items-center gap-2">
                {title}
              </CardTitle>
              {description && (
                <CardDescription>
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      {content && (
        <CardContent className={contentClassName}>
          {content}
        </CardContent>
      )}

      {footer && (
        <CardFooter className={footerClassName}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );

  return (
    <motion.div
      whileHover={animate ? { scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative"
      ref={cardRef}
    >
      <CardWrapper>
        {cardContent}
      </CardWrapper>

      {/* Menu d'actions flottant si des actions sont définies */}
      {actions.length > 0 && (
        <div className="absolute top-2 right-2 z-10">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full w-8 h-8 p-0 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowActions(!showActions);
            }}
          >
            <MoreVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </Button>

          {showActions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {actions.map((action, index) => (
                <button 
                  key={index}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm flex items-center",
                    action.variant === 'destructive' 
                      ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowActions(false);
                    action.onClick();
                  }}
                >
                  <span className="mr-2">{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
} 