import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle } from 'lucide-react';

export interface CompletionIndicatorProps {
  total: number;
  completed: number;
  className?: string;
  showPercentage?: boolean;
  showFraction?: boolean;
  showText?: boolean;
  showIcons?: boolean;
  variant?: 'default' | 'slim' | 'circle';
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'success';
  customText?: string;
}

/**
 * Composant réutilisable pour afficher la progression d'une liste
 */
export const CompletionIndicator = ({
  total,
  completed,
  className,
  showPercentage = true,
  showFraction = false,
  showText = true,
  showIcons = false,
  variant = 'default',
  size = 'md',
  color = 'primary',
  customText,
}: CompletionIndicatorProps) => {
  // Calculer le pourcentage de progression
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  // Déterminer si la tâche est complétée
  const isCompleted = completed === total && total > 0;

  // Classes pour les variantes
  const variantClasses = {
    default: 'h-2 rounded-full overflow-hidden',
    slim: 'h-1 rounded-full overflow-hidden',
    circle: 'rounded-full aspect-square flex items-center justify-center',
  };

  // Classes pour les tailles
  const sizeClasses = {
    sm: variant === 'circle' ? 'h-8 w-8 text-xs' : 'text-xs',
    md: variant === 'circle' ? 'h-12 w-12 text-sm' : 'text-sm',
    lg: variant === 'circle' ? 'h-16 w-16 text-base' : 'text-base',
  };

  // Classes pour les couleurs
  const colorClasses = {
    default: 'bg-muted',
    primary: 'bg-primary',
    success: 'bg-green-500',
  };

  // Texte à afficher
  const text = customText || (isCompleted ? 'Terminé' : 'En cours');

  // Rendu pour la variante cercle
  if (variant === 'circle') {
    return (
      <div className={cn('flex flex-col items-center gap-1', className)}>
        <div
          className={cn(
            variantClasses.circle,
            sizeClasses[size],
            'border-4',
            isCompleted
              ? `border-${color === 'default' ? 'muted' : color === 'primary' ? 'primary' : 'green-500'}`
              : 'border-muted'
          )}
        >
          {showPercentage && (
            <span className="font-medium">{percentage}%</span>
          )}
          {showFraction && !showPercentage && (
            <span className="font-medium">{completed}/{total}</span>
          )}
        </div>
        {showText && (
          <span className={cn('text-muted-foreground', sizeClasses[size])}>
            {text}
          </span>
        )}
      </div>
    );
  }

  // Rendu pour les variantes default et slim
  return (
    <div className={cn('space-y-1', className)}>
      {showText && (
        <div className="flex items-center justify-between">
          <span className={cn('text-muted-foreground', sizeClasses[size])}>
            {text}
          </span>
          <span className={cn('font-medium', sizeClasses[size])}>
            {showPercentage && `${percentage}%`}
            {showFraction && (showPercentage ? ` (${completed}/${total})` : `${completed}/${total}`)}
          </span>
        </div>
      )}
      
      <div className={cn(variantClasses[variant], 'bg-muted')}>
        <div
          className={cn(
            'h-full',
            colorClasses[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {showIcons && (
        <div className="flex items-center gap-1 mt-1">
          {Array.from({ length: total }).map((_, index) => (
            index < completed ? (
              <CheckCircle2
                key={index}
                className={cn(
                  'text-primary',
                  size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'
                )}
              />
            ) : (
              <Circle
                key={index}
                className={cn(
                  'text-muted-foreground',
                  size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'
                )}
              />
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletionIndicator; 