import { useState, useCallback } from 'react';

interface UseModalsOptions {
  initialState?: Record<string, boolean>;
  onOpen?: (name: string) => void;
  onClose?: (name: string) => void;
}

/**
 * Hook pour gérer plusieurs modales
 * @param options Options de configuration
 * @returns Objet contenant l'état et les fonctions pour gérer les modales
 */
export function useModals({
  initialState = {},
  onOpen,
  onClose
}: UseModalsOptions = {}) {
  const [modals, setModals] = useState<Record<string, boolean>>(initialState);

  const openModal = useCallback((name: string) => {
    setModals(prev => ({ ...prev, [name]: true }));
    onOpen?.(name);
  }, [onOpen]);

  const closeModal = useCallback((name: string) => {
    setModals(prev => ({ ...prev, [name]: false }));
    onClose?.(name);
  }, [onClose]);

  const toggleModal = useCallback((name: string) => {
    setModals(prev => {
      const newValue = !prev[name];
      
      if (newValue) {
        onOpen?.(name);
      } else {
        onClose?.(name);
      }
      
      return { ...prev, [name]: newValue };
    });
  }, [onOpen, onClose]);

  const closeAll = useCallback(() => {
    const modalNames = Object.keys(modals);
    const closedState = modalNames.reduce((acc, name) => {
      acc[name] = false;
      return acc;
    }, {} as Record<string, boolean>);
    
    setModals(closedState);
    modalNames.forEach(name => {
      if (modals[name]) {
        onClose?.(name);
      }
    });
  }, [modals, onClose]);

  const isOpen = useCallback((name: string) => {
    return !!modals[name];
  }, [modals]);

  return {
    modals,
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    closeAll
  };
} 