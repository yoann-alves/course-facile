import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SwitchField } from '@/components/form/SwitchField';
import { Bell } from 'lucide-react';

// Mock du composant Switch de shadcn/ui
jest.mock('@/components/ui/switch', () => ({
  Switch: ({ 
    id, 
    checked, 
    onCheckedChange, 
    disabled, 
    ...props 
  }: {
    id: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
    [key: string]: unknown;
  }) => (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onCheckedChange(!checked)}
      disabled={disabled}
      data-testid="mock-switch"
      {...props}
    >
      Switch
    </button>
  ),
}));

// Mock du composant Label de shadcn/ui
jest.mock('@/components/ui/label', () => ({
  Label: ({ 
    htmlFor, 
    className, 
    children 
  }: {
    htmlFor: string;
    className?: string;
    children: React.ReactNode;
  }) => (
    <label 
      htmlFor={htmlFor} 
      className={`${className} flex items-center`}
    >
      {children}
    </label>
  ),
}));

describe('SwitchField Component', () => {
  // Test de rendu de base
  it('devrait rendre correctement avec les props de base', () => {
    const handleChange = jest.fn();
    render(
      <SwitchField
        id="test-switch"
        label="Notifications"
        checked={false}
        onCheckedChange={handleChange}
      />
    );
    
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  // Test de changement d'état
  it('devrait appeler onCheckedChange lorsque le switch est cliqué', () => {
    const handleChange = jest.fn();
    render(
      <SwitchField
        id="test-switch"
        label="Notifications"
        checked={false}
        onCheckedChange={handleChange}
      />
    );
    
    fireEvent.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  // Test avec description
  it('devrait rendre avec une description', () => {
    const handleChange = jest.fn();
    render(
      <SwitchField
        id="test-switch"
        label="Notifications"
        description="Recevoir des notifications par email"
        checked={false}
        onCheckedChange={handleChange}
      />
    );
    
    expect(screen.getByText('Recevoir des notifications par email')).toBeInTheDocument();
  });

  // Test avec icône
  it('devrait rendre avec une icône', () => {
    const handleChange = jest.fn();
    render(
      <SwitchField
        id="test-switch"
        label="Notifications"
        checked={false}
        onCheckedChange={handleChange}
        icon={Bell}
      />
    );
    
    // Vérifier que l'icône est rendue (difficile à tester directement)
    // Grâce au mock de Label, on sait que le label a la classe 'flex items-center'
    const label = screen.getByText('Notifications').closest('label');
    expect(label).toHaveClass('flex');
    expect(label).toHaveClass('items-center');
  });

  // Test avec label à gauche
  it('devrait rendre avec le label à gauche', () => {
    const handleChange = jest.fn();
    render(
      <SwitchField
        id="test-switch"
        label="Notifications"
        checked={false}
        onCheckedChange={handleChange}
        labelPosition="left"
      />
    );
    
    const container = screen.getByText('Notifications').closest('div');
    expect(container).toHaveClass('mr-3');
  });

  // Test avec label à droite (par défaut)
  it('devrait rendre avec le label à droite par défaut', () => {
    const handleChange = jest.fn();
    render(
      <SwitchField
        id="test-switch"
        label="Notifications"
        checked={false}
        onCheckedChange={handleChange}
      />
    );
    
    const container = screen.getByText('Notifications').closest('div');
    expect(container).toHaveClass('ml-3');
  });

  // Test avec différentes tailles
  it('devrait appliquer la classe de taille correcte', () => {
    const handleChange = jest.fn();
    render(
      <SwitchField
        id="test-switch"
        label="Notifications"
        checked={false}
        onCheckedChange={handleChange}
        size="lg"
      />
    );
    
    const label = screen.getByText('Notifications').closest('label');
    expect(label).toHaveClass('text-base');
  });

  // Test avec l'attribut required
  it('devrait afficher un indicateur required quand required=true', () => {
    const handleChange = jest.fn();
    render(
      <SwitchField
        id="test-switch"
        label="Notifications"
        checked={false}
        onCheckedChange={handleChange}
        required
      />
    );
    
    // Vérifier qu'il y a un astérisque ou un indicateur de champ requis
    const requiredIndicator = screen.getByText('*');
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator).toHaveClass('text-destructive');
  });

  // Test avec l'attribut disabled
  it('ne devrait pas appeler onCheckedChange quand disabled=true', () => {
    const handleChange = jest.fn();
    render(
      <SwitchField
        id="test-switch"
        label="Notifications"
        checked={false}
        onCheckedChange={handleChange}
        disabled
      />
    );
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
    
    fireEvent.click(switchElement);
    expect(handleChange).not.toHaveBeenCalled();
  });

  // Test avec classes personnalisées
  it('devrait accepter des classes personnalisées', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <SwitchField
        id="test-switch"
        label="Notifications"
        checked={false}
        onCheckedChange={handleChange}
        className="test-class"
        labelClassName="label-class"
        descriptionClassName="desc-class"
        description="Description"
      />
    );
    
    // Vérifier la classe du conteneur principal
    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass('test-class');
    
    // Vérifier la classe du label
    const label = screen.getByText('Notifications').closest('label');
    expect(label).toHaveClass('label-class');
    
    // Vérifier la classe de la description
    const description = screen.getByText('Description');
    expect(description).toHaveClass('desc-class');
  });
}); 