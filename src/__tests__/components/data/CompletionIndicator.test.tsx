import React from 'react';
import { render, screen } from '@testing-library/react';
import { CompletionIndicator } from '@/components/data/CompletionIndicator';

describe('CompletionIndicator Component', () => {
  // Test de rendu de base
  it('devrait rendre correctement avec les valeurs de base', () => {
    render(<CompletionIndicator total={10} completed={5} />);
    // Vérifier que le pourcentage est affiché
    const percentageElement = screen.getByText(/50%/);
    expect(percentageElement).toBeInTheDocument();
  });

  // Test avec showPercentage=false
  it('ne devrait pas afficher le pourcentage quand showPercentage=false', () => {
    render(<CompletionIndicator total={10} completed={5} showPercentage={false} showFraction />);
    expect(screen.queryByText(/50%/)).not.toBeInTheDocument();
    expect(screen.getByText('5/10')).toBeInTheDocument();
  });

  // Test avec showFraction=true
  it('devrait afficher la fraction quand showFraction=true', () => {
    render(<CompletionIndicator total={10} completed={5} showFraction />);
    // Le texte peut être divisé en plusieurs éléments, donc on utilise une regex
    const percentageWithFraction = screen.getByText(/50%.+\(5\/10\)/);
    expect(percentageWithFraction).toBeInTheDocument();
  });

  // Test avec showText=false
  it('ne devrait pas afficher le texte quand showText=false', () => {
    render(<CompletionIndicator total={10} completed={5} showText={false} />);
    expect(screen.queryByText('En cours')).not.toBeInTheDocument();
  });

  // Test avec customText
  it('devrait afficher le texte personnalisé', () => {
    render(<CompletionIndicator total={10} completed={5} customText="Progression" />);
    expect(screen.getByText('Progression')).toBeInTheDocument();
  });

  // Test avec variante circle
  it('devrait rendre correctement avec la variante circle', () => {
    render(<CompletionIndicator total={10} completed={5} variant="circle" />);
    // Vérifier que le pourcentage est affiché dans un cercle
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  // Test avec tâche complétée
  it('devrait afficher "Terminé" quand la tâche est complétée', () => {
    render(<CompletionIndicator total={10} completed={10} />);
    expect(screen.getByText('Terminé')).toBeInTheDocument();
  });

  // Test avec total=0
  it('devrait afficher 0% quand total=0', () => {
    render(<CompletionIndicator total={0} completed={0} />);
    expect(screen.getByText(/0%/)).toBeInTheDocument();
  });

  // Test avec showIcons=true
  it('devrait afficher les icônes quand showIcons=true', () => {
    const { container } = render(
      <CompletionIndicator total={3} completed={2} showIcons />
    );
    // Vérifier que les icônes sont rendues
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBe(3); // 2 CheckCircle2 + 1 Circle
  });
}); 