import { useState, useCallback, useMemo } from 'react';

interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  totalItems: number;
  maxPageButtons?: number;
}

interface PaginationResult {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  pageNumbers: number[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
}

export function usePagination({
  initialPage = 1,
  initialPageSize = 10,
  totalItems,
  maxPageButtons = 5
}: UsePaginationOptions): PaginationResult {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  
  // Recalculer la page courante si le nombre total d'éléments ou la taille de page change
  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalItems / pageSize)), [totalItems, pageSize]);
  
  // S'assurer que la page courante est valide
  const validCurrentPage = useMemo(() => {
    return Math.min(Math.max(1, currentPage), totalPages);
  }, [currentPage, totalPages]);
  
  // Mettre à jour la page courante si elle est devenue invalide
  if (validCurrentPage !== currentPage) {
    setCurrentPage(validCurrentPage);
  }
  
  // Calculer les indices de début et de fin pour les éléments affichés
  const startIndex = useMemo(() => (validCurrentPage - 1) * pageSize, [validCurrentPage, pageSize]);
  const endIndex = useMemo(() => Math.min(startIndex + pageSize - 1, totalItems - 1), [startIndex, pageSize, totalItems]);
  
  // Vérifier s'il y a des pages précédentes ou suivantes
  const hasPreviousPage = useMemo(() => validCurrentPage > 1, [validCurrentPage]);
  const hasNextPage = useMemo(() => validCurrentPage < totalPages, [validCurrentPage, totalPages]);
  
  // Générer les numéros de page à afficher
  const pageNumbers = useMemo(() => {
    if (totalPages <= maxPageButtons) {
      // Si le nombre total de pages est inférieur ou égal au nombre maximum de boutons,
      // afficher tous les numéros de page
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Calculer le nombre de boutons de chaque côté de la page courante
    const sideButtons = Math.floor((maxPageButtons - 1) / 2);
    
    let startPage = Math.max(1, validCurrentPage - sideButtons);
    let endPage = startPage + maxPageButtons - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [validCurrentPage, totalPages, maxPageButtons]);
  
  // Fonctions pour naviguer entre les pages
  const goToPage = useCallback((page: number) => {
    const targetPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(targetPage);
  }, [totalPages]);
  
  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasNextPage]);
  
  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setCurrentPage(prev => prev - 1);
    }
  }, [hasPreviousPage]);
  
  // Fonction pour changer la taille de page
  const handleSetPageSize = useCallback((size: number) => {
    const newSize = Math.max(1, size);
    
    // Calculer la nouvelle page courante pour maintenir approximativement la même position
    const firstItemIndex = startIndex;
    const newPage = Math.floor(firstItemIndex / newSize) + 1;
    
    setPageSize(newSize);
    setCurrentPage(newPage);
  }, [startIndex]);
  
  return {
    currentPage: validCurrentPage,
    pageSize,
    totalPages,
    startIndex,
    endIndex,
    hasPreviousPage,
    hasNextPage,
    pageNumbers,
    goToPage,
    nextPage,
    previousPage,
    setPageSize: handleSetPageSize
  };
} 