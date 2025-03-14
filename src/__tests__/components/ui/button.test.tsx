import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  // Test de rendu de base
  it('devrait rendre correctement avec le texte par défaut', () => {
    render(<Button>Cliquez-moi</Button>);
    expect(screen.getByRole('button', { name: /cliquez-moi/i })).toBeInTheDocument();
  });

  // Test avec variante
  it('devrait appliquer des classes spécifiques pour la variante outline', () => {
    render(<Button variant="outline">Supprimer</Button>);
    const button = screen.getByRole('button', { name: /supprimer/i });
    // Vérifions des classes qui sont plus susceptibles d'être présentes
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('border-green-700');
  });

  // Test avec taille
  it('devrait appliquer des classes spécifiques pour la taille sm', () => {
    render(<Button size="sm">Petit</Button>);
    const button = screen.getByRole('button', { name: /petit/i });
    // Vérifions des classes qui sont plus susceptibles d'être présentes
    expect(button).toHaveClass('text-sm');
    expect(button).toHaveClass('h-9');
  });

  // Test avec l'attribut disabled
  it('devrait être désactivé quand disabled=true', () => {
    render(<Button disabled>Désactivé</Button>);
    const button = screen.getByRole('button', { name: /désactivé/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });

  // Test d'événement onClick
  it('devrait appeler onClick quand le bouton est cliqué', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Cliquer</Button>);
    
    await user.click(screen.getByRole('button', { name: /cliquer/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test avec classes personnalisées
  it('devrait accepter des classes personnalisées', () => {
    render(<Button className="test-class">Personnalisé</Button>);
    const button = screen.getByRole('button', { name: /personnalisé/i });
    expect(button).toHaveClass('test-class');
  });
}); 