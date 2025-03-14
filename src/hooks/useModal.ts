import { useState, useCallback } from 'react';

interface UseModalOptions {
  initialOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export function useModal({
  initialOpen = false,
  onOpen,
  onClose
}: UseModalOptions = {}) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  
  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);
  
  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);
  
  const toggle = useCallback(() => {
    setIsOpen(prev => {
      const newValue = !prev;
      
      if (newValue) {
        onOpen?.();
      } else {
        onClose?.();
      }
      
      return newValue;
    });
  }, [onOpen, onClose]);
  
  return {
    isOpen,
    open,
    close,
    toggle
  };
} 