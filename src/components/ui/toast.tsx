'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

export type ToastType = 'success' | 'error' | 'info' | 'loading';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const toastIcons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <AlertCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
  loading: <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
};

const toastStyles = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  loading: 'bg-gray-50 border-gray-200 text-gray-800'
};

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    if (type !== 'loading') {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border ${toastStyles[type]}`}
    >
      {toastIcons[type]}
      <p className="text-sm">{message}</p>
      {type !== 'loading' && (
        <button
          onClick={onClose}
          className="ml-2 text-gray-500 hover:text-gray-700"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

export const ToastContext = React.createContext<ToastContextType>({
  showToast: () => {}
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Array<{ id: number; message: string; type: ToastType }>>([]);
  const pathname = usePathname();

  useEffect(() => {
    setToasts([]);
  }, [pathname]);

  const showToast = React.useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    
    if (type === 'loading') {
      setToasts(prev => [...prev.filter(toast => toast.type !== 'loading'), { id, message, type }]);
    } else {
      setToasts(prev => {
        const loadingToast = prev.find(t => t.type === 'loading');
        return loadingToast
          ? [...prev.filter(t => t.id !== loadingToast.id), { id, message, type }]
          : [...prev, { id, message, type }];
      });
    }
  }, []);

  const hideToast = React.useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
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
    </ToastContext.Provider>
  );
} 