import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Génère un ID aléatoire unique
 * @param prefix Préfixe optionnel pour l'ID (ex: 'list', 'product')
 * @returns Un ID aléatoire sous forme de chaîne de caractères
 */
export function generateId(prefix?: string): string {
  const randomPart = Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now().toString(36);
  return prefix ? `${prefix}_${timestamp}_${randomPart}` : `${timestamp}_${randomPart}`;
}

/**
 * Formate une date en français
 * @param date La date à formater
 * @returns La date formatée en français
 */
export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleDateString('fr-FR');
}
