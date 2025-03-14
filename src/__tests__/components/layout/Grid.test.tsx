import React from 'react';
import { render, screen } from '@testing-library/react';
import Grid from '@/components/layout/Grid';

describe('Grid Component', () => {
  // Test de rendu de base
  it('devrait rendre correctement avec les enfants', () => {
    render(
      <Grid>
        <div data-testid="child-1">Élément 1</div>
        <div data-testid="child-2">Élément 2</div>
      </Grid>
    );
    
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });

  // Test avec nombre de colonnes
  it('devrait appliquer le nombre de colonnes spécifié', () => {
    const { container } = render(
      <Grid cols={3}>
        <div>Élément 1</div>
        <div>Élément 2</div>
        <div>Élément 3</div>
      </Grid>
    );
    
    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-3');
  });

  // Test avec gap
  it('devrait appliquer l\'espacement spécifié', () => {
    const { container } = render(
      <Grid gap="lg">
        <div>Élément 1</div>
        <div>Élément 2</div>
      </Grid>
    );
    
    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass('gap-6');
  });

  // Test avec colonnes responsives
  it('devrait appliquer les colonnes responsives', () => {
    const { container } = render(
      <Grid cols={1} className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div>Élément 1</div>
        <div>Élément 2</div>
      </Grid>
    );
    
    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('sm:grid-cols-2');
    expect(grid).toHaveClass('md:grid-cols-3');
    expect(grid).toHaveClass('lg:grid-cols-4');
    expect(grid).toHaveClass('xl:grid-cols-5');
  });

  // Test avec élément personnalisé
  it('devrait rendre l\'élément personnalisé spécifié', () => {
    const { container } = render(
      <Grid as="section">
        <div>Élément 1</div>
      </Grid>
    );
    
    const section = container.firstChild as HTMLElement;
    expect(section.tagName).toBe('SECTION');
    expect(section).toHaveClass('grid');
  });

  // Test avec classes personnalisées
  it('devrait accepter des classes personnalisées', () => {
    const { container } = render(
      <Grid className="test-class">
        <div>Élément 1</div>
      </Grid>
    );
    
    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass('test-class');
  });
}); 