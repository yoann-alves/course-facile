import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('Badge Component', () => {
  // Test de rendu de base
  it('devrait rendre correctement avec le texte par défaut', () => {
    render(<Badge>Nouveau</Badge>);
    expect(screen.getByText('Nouveau')).toBeInTheDocument();
  });

  // Test avec variante outline
  it('devrait appliquer la variante outline', () => {
    render(<Badge variant="outline">Brouillon</Badge>);
    const badge = screen.getByText('Brouillon');
    expect(badge).toHaveClass('border');
    // La variante outline n'a pas de classe bg-transparent
    expect(badge).toHaveClass('text-gray-800');
  });

  // Test avec variante secondary
  it('devrait appliquer la variante secondary', () => {
    render(<Badge variant="secondary">Secondaire</Badge>);
    const badge = screen.getByText('Secondaire');
    expect(badge).toHaveClass('bg-gray-100');
    expect(badge).toHaveClass('text-gray-800');
  });

  // Test avec variante destructive
  it('devrait appliquer la variante destructive', () => {
    render(<Badge variant="destructive">Erreur</Badge>);
    const badge = screen.getByText('Erreur');
    expect(badge).toHaveClass('bg-red-100');
    expect(badge).toHaveClass('text-red-800');
  });

  // Test avec classes personnalisées
  it('devrait accepter des classes personnalisées', () => {
    render(<Badge className="test-class">Personnalisé</Badge>);
    const badge = screen.getByText('Personnalisé');
    expect(badge).toHaveClass('test-class');
  });
}); 