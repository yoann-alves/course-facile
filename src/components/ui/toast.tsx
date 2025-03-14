'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ToastType, ToastContextType } from '@/types';
import { TIMEOUTS } from '@/lib/constants';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const toastIcons = {
  success: <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />,
  error: <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />,
  info: <Info className="w-5 h-5 text-blue-500 dark:text-blue-400" />,
  loading: <Loader2 className="w-5 h-5 text-gray-500 dark:text-gray-400 animate-spin" />
};

const toastStyles = {
  success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300',
  error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300',
  info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300',
  loading: 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
};

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    if (type !== 'loading') {
      const timer = setTimeout(() => {
        onClose();
      }, TIMEOUTS.TOAST);
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-md ${toastStyles[type]}`}
    >
      {toastIcons[type]}
      <p className="text-sm">{message}</p>
      {type !== 'loading' && (
        <button
          onClick={onClose}
          className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
}

export const ToastContext = React.createContext<ToastContextType>({
  showToast: () => {}
});

// Nombre maximum de notifications à afficher
const MAX_TOASTS = 2;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Array<{ id: number; message: string; type: ToastType }>>([]);
  const pathname = usePathname();

  useEffect(() => {
    setToasts([]);
  }, [pathname]);

  const showToast = React.useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    
    if (type === 'loading') {
      // Pour les toasts de type loading, on remplace l'existant s'il y en a un
      setToasts(prev => [...prev.filter(toast => toast.type !== 'loading'), { id, message, type }]);
    } else {
      setToasts(prev => {
        // Si on a un toast de chargement, on le remplace
        const loadingToast = prev.find(t => t.type === 'loading');
        if (loadingToast) {
          return [...prev.filter(t => t.id !== loadingToast.id), { id, message, type }];
        }
        
        // Sinon, on ajoute le nouveau toast et on limite à MAX_TOASTS
        const newToasts = [...prev, { id, message, type }];
        // On garde les MAX_TOASTS plus récents
        return newToasts.slice(-MAX_TOASTS);
      });
    }
  }, []);

  const hideToast = React.useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => hideToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
} 