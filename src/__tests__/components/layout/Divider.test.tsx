import React from 'react';
import { render, screen } from '@testing-library/react';
import { Divider } from '@/components/layout/Divider';

describe('Divider Component', () => {
  // Tests de rendu de base
  it('devrait rendre un séparateur horizontal par défaut', () => {
    const { container } = render(<Divider />);
    const divider = container.firstChild as HTMLElement;
    
    expect(divider).toHaveClass('w-full');
    expect(divider).toHaveClass('border-solid');
    expect(divider).toHaveClass('border-t');
    expect(divider).toHaveClass('border-border');
    expect(divider).toHaveClass('my-4');
  });

  // Test d'orientation
  it('devrait rendre un séparateur vertical', () => {
    const { container } = render(<Divider orientation="vertical" />);
    const divider = container.firstChild as HTMLElement;
    
    expect(divider).toHaveClass('h-full');
    expect(divider).toHaveClass('border-l');
    expect(divider).toHaveClass('mx-4');
  });

  // Test de variante
  it('devrait appliquer la variante dashed', () => {
    const { container } = render(<Divider variant="dashed" />);
    const divider = container.firstChild as HTMLElement;
    
    expect(divider).toHaveClass('border-dashed');
  });

  // Test de taille
  it('devrait appliquer la taille thick', () => {
    const { container } = render(<Divider size="thick" />);
    const divider = container.firstChild as HTMLElement;
    
    expect(divider).toHaveClass('border-t-4');
  });

  // Test de couleur
  it('devrait appliquer la couleur primary', () => {
    const { container } = render(<Divider color="primary" />);
    const divider = container.firstChild as HTMLElement;
    
    expect(divider).toHaveClass('border-primary');
  });

  // Test d'espacement
  it('devrait appliquer l\'espacement lg', () => {
    const { container } = render(<Divider spacing="lg" />);
    const divider = container.firstChild as HTMLElement;
    
    expect(divider).toHaveClass('my-6');
  });

  // Test avec label
  it('devrait rendre avec un label au centre par défaut', () => {
    render(<Divider label="Ou" />);
    
    expect(screen.getByText('Ou')).toBeInTheDocument();
    expect(screen.getByText('Ou')).toHaveClass('mx-3');
  });

  // Test avec label à gauche
  it('devrait rendre avec un label à gauche', () => {
    render(<Divider label="Début" labelPosition="left" />);
    
    expect(screen.getByText('Début')).toBeInTheDocument();
    expect(screen.getByText('Début')).toHaveClass('mr-3');
  });

  // Test avec label à droite
  it('devrait rendre avec un label à droite', () => {
    render(<Divider label="Fin" labelPosition="right" />);
    
    expect(screen.getByText('Fin')).toBeInTheDocument();
    expect(screen.getByText('Fin')).toHaveClass('ml-3');
  });

  // Test avec classes personnalisées
  it('devrait accepter des classes personnalisées', () => {
    const { container } = render(<Divider className="test-class" />);
    const divider = container.firstChild as HTMLElement;
    
    expect(divider).toHaveClass('test-class');
  });

  // Test de structure avec label
  it('devrait avoir la structure correcte avec un label', () => {
    const { container } = render(<Divider label="Test" />);
    
    // Vérifier que le conteneur est un div avec flex
    const divider = container.firstChild as HTMLElement;
    expect(divider).toHaveClass('flex');
    expect(divider).toHaveClass('items-center');
    
    // Vérifier qu'il y a 3 éléments enfants (ligne, label, ligne)
    expect(divider.childNodes.length).toBe(3);
  });
}); 