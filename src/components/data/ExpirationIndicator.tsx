import React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { Status } from '@/components';
import { THEME } from '@/lib/constants';

export interface ExpirationIndicatorProps {
  expiryDate?: Date | string;
  className?: string;
  showIcon?: boolean;
  showDays?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'badge' | 'text' | 'icon';
}

/**
 * Composant réutilisable pour afficher l'état d'expiration d'un produit
 */
export default function ExpirationIndicator({
  expiryDate,
  className,
  showIcon = true,
  showDays = true,
  size = 'md',
  variant = 'badge',
}: ExpirationIndicatorProps) {
  // Si pas de date d'expiration, retourner null
  if (!expiryDate) return null;

  // Convertir la date d'expiration en objet Date si c'est une chaîne
  const expiry = typeof expiryDate === 'string' ? new Date(expiryDate) : expiryDate;
  
  // Calculer le nombre de jours jusqu'à l'expiration
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);
  
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Déterminer l'état d'expiration
  let status: 'expired' | 'critical' | 'warning' | 'good';
  let statusVariant: 'danger' | 'warning' | 'success' | 'info';
  let statusIcon: React.ReactNode;
  let statusText: string;
  
  if (diffDays < 0) {
    status = 'expired';
    statusVariant = 'danger';
    statusIcon = <AlertCircle />;
    statusText = 'Expiré';
  } else if (diffDays === 0) {
    status = 'critical';
    statusVariant = 'danger';
    statusIcon = <AlertCircle />;
    statusText = "Expire aujourd'hui";
  } else if (diffDays <= 3) {
    status = 'warning';
    statusVariant = 'warning';
    statusIcon = <AlertTriangle />;
    statusText = `Expire ${diffDays === 1 ? 'demain' : `dans ${diffDays} jours`}`;
  } else {
    status = 'good';
    statusVariant = 'success';
    statusIcon = <CheckCircle />;
    statusText = `Expire dans ${diffDays} jours`;
  }
  
  // Rendu en fonction de la variante
  if (variant === 'text') {
    return (
      <div 
        className={cn(
          'flex items-center gap-1.5',
          `text-${statusVariant === 'danger' ? THEME.DANGER : statusVariant === 'warning' ? THEME.WARNING : THEME.SUCCESS}-600 dark:text-${statusVariant === 'danger' ? THEME.DANGER : statusVariant === 'warning' ? THEME.WARNING : THEME.SUCCESS}-400`,
          className
        )}
      >
        {showIcon && (
          <span className="h-4 w-4">
            {statusIcon}
          </span>
        )}
        <span>
          {showDays ? statusText : status === 'expired' ? 'Expiré' : status === 'critical' ? "Expire aujourd'hui" : status === 'warning' ? 'Expiration proche' : 'Valide'}
        </span>
      </div>
    );
  }
  
  if (variant === 'icon') {
    return (
      <div 
        className={cn(
          'flex items-center justify-center rounded-full',
          size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10',
          `bg-${statusVariant === 'danger' ? THEME.DANGER : statusVariant === 'warning' ? THEME.WARNING : THEME.SUCCESS}-50 dark:bg-${statusVariant === 'danger' ? THEME.DANGER : statusVariant === 'warning' ? THEME.WARNING : THEME.SUCCESS}-900/20`,
          `text-${statusVariant === 'danger' ? THEME.DANGER : statusVariant === 'warning' ? THEME.WARNING : THEME.SUCCESS}-600 dark:text-${statusVariant === 'danger' ? THEME.DANGER : statusVariant === 'warning' ? THEME.WARNING : THEME.SUCCESS}-400`,
          className
        )}
        title={statusText}
      >
        <span className={cn(
          size === 'sm' ? 'h-3.5 w-3.5' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'
        )}>
          {statusIcon}
        </span>
      </div>
    );
  }
  
  // Par défaut, rendu en badge
  return (
    <Status
      label={showDays ? statusText : status === 'expired' ? 'Expiré' : status === 'critical' ? "Expire aujourd'hui" : status === 'warning' ? 'Expiration proche' : 'Valide'}
      variant={statusVariant}
      icon={showIcon ? (status === 'expired' || status === 'critical' ? AlertCircle : status === 'warning' ? AlertTriangle : CheckCircle) : undefined}
      size={size}
      className={className}
    />
  );
} 