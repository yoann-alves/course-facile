import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormGroup } from '@/components/form/FormGroup';

describe('FormGroup Component', () => {
  // Test de rendu de base
  it('devrait rendre correctement avec les enfants', () => {
    render(
      <FormGroup>
        <div data-testid="test-child">Contenu du groupe</div>
      </FormGroup>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  // Test avec titre et description
  it('devrait rendre avec un titre et une description', () => {
    render(
      <FormGroup 
        title="Informations personnelles" 
        description="Veuillez saisir vos informations personnelles"
      >
        <div>Contenu du formulaire</div>
      </FormGroup>
    );
    
    expect(screen.getByText('Informations personnelles')).toBeInTheDocument();
    expect(screen.getByText('Veuillez saisir vos informations personnelles')).toBeInTheDocument();
  });

  // Test de layout vertical (par défaut)
  it('devrait utiliser le layout vertical par défaut', () => {
    const { container } = render(
      <FormGroup>
        <div>Champ 1</div>
        <div>Champ 2</div>
      </FormGroup>
    );
    
    // Trouver le conteneur de contenu (deuxième enfant ou premier s'il n'y a pas de titre/description)
    const contentContainer = container.firstChild?.childNodes.length === 1 
      ? container.firstChild?.firstChild 
      : container.firstChild?.childNodes[1];
      
    expect(contentContainer).toHaveClass('flex');
    expect(contentContainer).toHaveClass('flex-col');
  });

  // Test de layout horizontal
  it('devrait utiliser le layout horizontal', () => {
    const { container } = render(
      <FormGroup layout="horizontal">
        <div>Champ 1</div>
        <div>Champ 2</div>
      </FormGroup>
    );
    
    const contentContainer = container.firstChild?.childNodes.length === 1 
      ? container.firstChild?.firstChild 
      : container.firstChild?.childNodes[1];
      
    expect(contentContainer).toHaveClass('sm:flex');
    expect(contentContainer).toHaveClass('sm:flex-row');
  });

  // Test de layout grid
  it('devrait utiliser le layout grid avec le nombre de colonnes spécifié', () => {
    const { container } = render(
      <FormGroup layout="grid" columns={2}>
        <div>Champ 1</div>
        <div>Champ 2</div>
        <div>Champ 3</div>
        <div>Champ 4</div>
      </FormGroup>
    );
    
    const contentContainer = container.firstChild?.childNodes.length === 1 
      ? container.firstChild?.firstChild 
      : container.firstChild?.childNodes[1];
      
    expect(contentContainer).toHaveClass('grid');
    expect(contentContainer).toHaveClass('grid-cols-1');
    expect(contentContainer).toHaveClass('sm:grid-cols-2');
  });

  // Test de gap
  it('devrait appliquer le gap spécifié', () => {
    const { container } = render(
      <FormGroup gap="lg">
        <div>Champ 1</div>
        <div>Champ 2</div>
      </FormGroup>
    );
    
    const contentContainer = container.firstChild?.childNodes.length === 1 
      ? container.firstChild?.firstChild 
      : container.firstChild?.childNodes[1];
      
    expect(contentContainer).toHaveClass('gap-6');
  });

  // Test avec classes personnalisées
  it('devrait accepter des classes personnalisées', () => {
    const { container } = render(
      <FormGroup 
        className="test-class" 
        titleClassName="title-class" 
        descriptionClassName="desc-class" 
        contentClassName="content-class"
        title="Titre"
        description="Description"
      >
        <div>Contenu</div>
      </FormGroup>
    );
    
    // Vérifier la classe du conteneur principal
    expect(container.firstChild).toHaveClass('test-class');
    
    // Vérifier la classe du titre
    expect(screen.getByText('Titre')).toHaveClass('title-class');
    
    // Vérifier la classe de la description
    expect(screen.getByText('Description')).toHaveClass('desc-class');
    
    // Vérifier la classe du conteneur de contenu
    const contentContainer = container.firstChild?.childNodes[1];
    expect(contentContainer).toHaveClass('content-class');
  });

  // Test de structure sans titre ni description
  it('devrait avoir la structure correcte sans titre ni description', () => {
    const { container } = render(
      <FormGroup>
        <div>Contenu</div>
      </FormGroup>
    );
    
    // Vérifier qu'il n'y a qu'un seul enfant direct (le conteneur de contenu)
    expect(container.firstChild?.childNodes.length).toBe(1);
  });

  // Test de structure avec titre et description
  it('devrait avoir la structure correcte avec titre et description', () => {
    const { container } = render(
      <FormGroup title="Titre" description="Description">
        <div>Contenu</div>
      </FormGroup>
    );
    
    // Vérifier qu'il y a deux enfants directs (l'en-tête et le conteneur de contenu)
    expect(container.firstChild?.childNodes.length).toBe(2);
  });
}); 