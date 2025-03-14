import React from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  className?: string;
  fallbackClassName?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  statusPosition?: 'top-right' | 'bottom-right';
  bordered?: boolean;
  onClick?: () => void;
}

/**
 * Composant réutilisable pour afficher un avatar utilisateur
 */
export const Avatar = ({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  shape = 'circle',
  className,
  fallbackClassName,
  status,
  statusPosition = 'bottom-right',
  bordered = false,
  onClick,
}: AvatarProps) => {
  const [imageError, setImageError] = React.useState(false);

  // Classes pour les tailles
  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
  };

  // Classes pour les formes
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-md',
  };

  // Classes pour les statuts
  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  // Classes pour les positions de statut
  const statusPositionClasses = {
    'top-right': '-top-1 -right-1',
    'bottom-right': '-bottom-1 -right-1',
  };

  // Tailles des indicateurs de statut
  const statusSizeClasses = {
    xs: 'h-2 w-2',
    sm: 'h-2.5 w-2.5',
    md: 'h-3 w-3',
    lg: 'h-3.5 w-3.5',
    xl: 'h-4 w-4',
  };

  // Gérer l'erreur de chargement de l'image
  const handleImageError = () => {
    setImageError(true);
  };

  // Générer les initiales si elles ne sont pas fournies
  const getInitials = () => {
    if (initials) return initials;
    if (!alt || alt === 'Avatar') return '';
    
    return alt
      .split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="relative inline-block">
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          className={cn(
            sizeClasses[size],
            shapeClasses[shape],
            'object-cover',
            bordered && 'border-2 border-background',
            onClick && 'cursor-pointer',
            className
          )}
          onError={handleImageError}
          onClick={onClick}
        />
      ) : (
        <div
          className={cn(
            sizeClasses[size],
            shapeClasses[shape],
            'flex items-center justify-center bg-muted text-muted-foreground',
            bordered && 'border-2 border-background',
            onClick && 'cursor-pointer',
            fallbackClassName || className
          )}
          onClick={onClick}
        >
          {getInitials() || <User className="h-1/2 w-1/2" />}
        </div>
      )}
      
      {status && (
        <span
          className={cn(
            'absolute block rounded-full border-2 border-background',
            statusClasses[status],
            statusPositionClasses[statusPosition],
            statusSizeClasses[size]
          )}
          title={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      )}
    </div>
  );
};

export default Avatar; 