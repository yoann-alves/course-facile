import React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  centered?: boolean;
  as?: React.ElementType;
}

/**
 * Composant réutilisable pour créer un conteneur avec une largeur maximale et un padding
 */
export const Container = ({
  children,
  className,
  size = 'lg',
  padding = 'md',
  centered = true,
  as: Component = 'div',
}: ContainerProps) => {
  // Classes pour les tailles
  const sizeClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    full: 'max-w-full',
  };

  // Classes pour le padding
  const paddingClasses = {
    none: 'px-0',
    sm: 'px-4',
    md: 'px-6',
    lg: 'px-8',
  };

  return (
    <Component
      className={cn(
        sizeClasses[size],
        paddingClasses[padding],
        centered && 'mx-auto',
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Container; 