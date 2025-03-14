import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export interface ModalAction {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'secondary' | 'outline' | 'link' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
}

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  cancelAction?: ModalAction;
  className?: string;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  position?: 'center' | 'top';
  preventClose?: boolean;
}

/**
 * Composant réutilisable pour les modales
 * Basé sur le composant Dialog de shadcn/ui
 */
export default function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  primaryAction,
  secondaryAction,
  cancelAction,
  className,
  showCloseButton = true,
  size = 'md',
  position = 'center',
  preventClose = false,
}: ModalProps) {
  // Classes pour les tailles
  const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    full: 'sm:max-w-[calc(100vw-2rem)] sm:h-[calc(100vh-4rem)]',
  };

  // Classes pour la position
  const positionClasses = {
    center: '',
    top: 'sm:top-[10%] sm:translate-y-0',
  };

  // Fonction pour gérer la fermeture
  const handleOpenChange = (newOpen: boolean) => {
    if (preventClose && !newOpen) {
      return;
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          sizeClasses[size],
          positionClasses[position],
          size === 'full' && 'flex flex-col',
          className
        )}
      >
        {showCloseButton && !preventClose && (
          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Fermer</span>
          </button>
        )}

        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        {size === 'full' ? (
          <div className="flex-1 overflow-auto">{children}</div>
        ) : (
          children
        )}

        {(footer || primaryAction || secondaryAction || cancelAction) && (
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            {footer || (
              <>
                {cancelAction && (
                  <Button
                    variant={cancelAction.variant || 'ghost'}
                    onClick={cancelAction.onClick}
                    disabled={cancelAction.disabled}
                    className="mt-2 sm:mt-0"
                  >
                    {cancelAction.label}
                  </Button>
                )}
                {secondaryAction && (
                  <Button
                    variant={secondaryAction.variant || 'outline'}
                    onClick={secondaryAction.onClick}
                    disabled={secondaryAction.disabled}
                    className="mt-2 sm:mt-0"
                  >
                    {secondaryAction.label}
                  </Button>
                )}
                {primaryAction && (
                  <Button
                    variant={primaryAction.variant || 'default'}
                    onClick={primaryAction.onClick}
                    disabled={primaryAction.disabled}
                    className="mt-2 sm:mt-0"
                  >
                    {primaryAction.label}
                  </Button>
                )}
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
} 