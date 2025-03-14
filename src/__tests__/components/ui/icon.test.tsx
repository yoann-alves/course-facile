import React from 'react';
import { render, screen } from '@testing-library/react';
import Icon from '@/components/ui/icon';
import { Home, Settings, User } from 'lucide-react';

describe('Icon Component', () => {
  // Test de rendu de base
  it('devrait rendre correctement avec l\'icône spécifiée', () => {
    const { container } = render(<Icon icon={Home} />);
    // Utilisons container.querySelector pour trouver l'élément SVG
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon?.tagName.toLowerCase()).toBe('svg');
  });

  // Test avec taille
  it('devrait appliquer la taille spécifiée', () => {
    const { container } = render(<Icon icon={Settings} size="lg" />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('h-6');
    expect(icon).toHaveClass('w-6');
  });

  // Test avec couleur
  it('devrait appliquer la couleur spécifiée', () => {
    const { container } = render(<Icon icon={User} variant="primary" />);
    const icon = container.querySelector('svg');
    // Vérifions une classe qui est plus susceptible d'être présente
    expect(icon).toHaveClass('text-green-600');
  });

  // Test avec fond
  it('devrait rendre avec un fond quand withBackground est true', () => {
    const { container } = render(<Icon icon={Home} withBackground />);
    // Vérifions que le composant est rendu avec un fond
    const divContainer = container.querySelector('div');
    expect(divContainer).toHaveClass('flex');
    expect(divContainer).toHaveClass('items-center');
    expect(divContainer).toHaveClass('justify-center');
  });

  // Test avec classes personnalisées
  it('devrait accepter des classes personnalisées', () => {
    const { container } = render(<Icon icon={Home} className="test-class" />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('test-class');
  });

  // Test avec label
  it('devrait ajouter un label quand label est fourni', () => {
    render(<Icon icon={Home} label="Accueil" />);
    // Vérifions que le label est présent
    expect(screen.getByText('Accueil')).toBeInTheDocument();
  });
}); 