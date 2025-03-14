import { useMemo } from 'react';
import { formatDate, formatRelativeDate, daysBetween, isPastDate } from '@/lib/utils';

/**
 * Hook pour centraliser le formatage des dates
 * @returns Fonctions de formatage de dates
 */
export function useFormatDate() {
  return useMemo(() => ({
    /**
     * Formate une date en français (jour mois année)
     */
    format: (date: string | Date): string => formatDate(date),
    
    /**
     * Formate une date de manière relative (aujourd'hui, hier, etc.)
     */
    formatRelative: (date: string | Date): string => formatRelativeDate(date),
    
    /**
     * Calcule le nombre de jours entre deux dates
     */
    daysBetween: (date1: string | Date, date2?: string | Date): number => daysBetween(date1, date2),
    
    /**
     * Vérifie si une date est dans le passé
     */
    isPast: (date: string | Date): boolean => isPastDate(date),
    
    /**
     * Formate une date pour l'affichage dans un formulaire (YYYY-MM-DD)
     */
    formatForInput: (date: string | Date): string => {
      const d = typeof date === 'string' ? new Date(date) : date;
      return d.toISOString().split('T')[0];
    }
  }), []);
} 