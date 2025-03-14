import React from 'react';
import { render, screen } from '@testing-library/react';
import { Container } from '@/components/layout/Container';

describe('Container Component', () => {
  // Test de rendu de base
  it('devrait rendre correctement avec le contenu enfant', () => {
    render(
      <Container>
        <p>Contenu de test</p>
      </Container>
    );
    expect(screen.getByText('Contenu de test')).toBeInTheDocument();
  });

  // Test des tailles
  it('devrait appliquer la classe de taille correcte', () => {
    const { container } = render(
      <Container size="sm">
        <p>Petit conteneur</p>
      </Container>
    );
    expect(container.firstChild as HTMLElement).toHaveClass('max-w-screen-sm');
  });

  // Test du padding
  it('devrait appliquer la classe de padding correcte', () => {
    const { container } = render(
      <Container padding="lg">
        <p>Conteneur avec grand padding</p>
      </Container>
    );
    expect(container.firstChild as HTMLElement).toHaveClass('px-8');
  });

  // Test du centrage
  it('devrait être centré par défaut', () => {
    const { container } = render(
      <Container>
        <p>Conteneur centré</p>
      </Container>
    );
    expect(container.firstChild as HTMLElement).toHaveClass('mx-auto');
  });

  // Test sans centrage
  it('ne devrait pas être centré quand centered est false', () => {
    const { container } = render(
      <Container centered={false}>
        <p>Conteneur non centré</p>
      </Container>
    );
    expect(container.firstChild as HTMLElement).not.toHaveClass('mx-auto');
  });

  // Test avec un élément personnalisé
  it('devrait utiliser l\'élément personnalisé spécifié', () => {
    const { container } = render(
      <Container as="section">
        <p>Conteneur section</p>
      </Container>
    );
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  // Test avec des classes personnalisées
  it('devrait accepter des classes personnalisées', () => {
    const { container } = render(
      <Container className="test-class">
        <p>Conteneur avec classe personnalisée</p>
      </Container>
    );
    expect(container.firstChild as HTMLElement).toHaveClass('test-class');
  });

  // Test des valeurs par défaut
  it('devrait utiliser les valeurs par défaut correctement', () => {
    const { container } = render(
      <Container>
        <p>Conteneur avec valeurs par défaut</p>
      </Container>
    );
    expect(container.firstChild as HTMLElement).toHaveClass('max-w-screen-lg');
    expect(container.firstChild as HTMLElement).toHaveClass('px-6');
    expect(container.firstChild as HTMLElement).toHaveClass('mx-auto');
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
}); 