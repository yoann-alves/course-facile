import { useContext } from 'react';
import { ToastContext } from '@/components/ui/toast';
import { ToastContextType } from '@/types';

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
}

export function useSuccessToast() {
  const { showToast } = useToast();
  
  return (message: string) => showToast(message, 'success');
}

export function useErrorToast() {
  const { showToast } = useToast();
  
  return (message: string) => showToast(message, 'error');
}

export function useInfoToast() {
  const { showToast } = useToast();
  
  return (message: string) => showToast(message, 'info');
}

export function useLoadingToast() {
  const { showToast } = useToast();
  
  return (message: string) => showToast(message, 'loading');
} 