import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tag } from '@/components/data/Tag';
import { ShoppingCart } from 'lucide-react';

describe('Tag Component', () => {
  // Test de rendu de base
  it('devrait rendre correctement avec le contenu enfant', () => {
    render(<Tag>Test Tag</Tag>);
    expect(screen.getByText('Test Tag')).toBeInTheDocument();
  });

  // Test des variantes
  it('devrait appliquer la classe de variante correcte', () => {
    const { container } = render(<Tag variant="primary">Primary Tag</Tag>);
    expect(container.firstChild).toHaveClass('bg-primary');
  });

  // Test des tailles
  it('devrait appliquer la classe de taille correcte', () => {
    const { container } = render(<Tag size="lg">Large Tag</Tag>);
    expect(container.firstChild).toHaveClass('text-base');
    expect(container.firstChild).toHaveClass('py-1.5');
    expect(container.firstChild).toHaveClass('px-3');
  });

  // Test avec une icône
  it('devrait rendre avec une icône', () => {
    render(<Tag icon={ShoppingCart}>Tag with Icon</Tag>);
    // Vérifier que l'icône est rendue (en vérifiant la présence d'un SVG)
    expect(screen.getByText('Tag with Icon').previousSibling).toBeTruthy();
  });

  // Test du bouton de suppression
  it('devrait appeler onRemove lorsque le bouton de suppression est cliqué', () => {
    const handleRemove = jest.fn();
    render(<Tag onRemove={handleRemove}>Removable Tag</Tag>);
    
    // Trouver et cliquer sur le bouton de suppression
    const removeButton = screen.getByRole('button', { name: /supprimer/i });
    fireEvent.click(removeButton);
    
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  // Test du comportement interactif
  it('devrait appeler onClick lorsque le tag interactif est cliqué', () => {
    const handleClick = jest.fn();
    render(
      <Tag interactive onClick={handleClick}>
        Interactive Tag
      </Tag>
    );
    
    // Cliquer sur le tag
    fireEvent.click(screen.getByText('Interactive Tag'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test du comportement désactivé
  it('ne devrait pas appeler onClick lorsque le tag est désactivé', () => {
    const handleClick = jest.fn();
    render(
      <Tag interactive onClick={handleClick} disabled>
        Disabled Tag
      </Tag>
    );
    
    // Cliquer sur le tag désactivé
    fireEvent.click(screen.getByText('Disabled Tag'));
    
    // Vérifier que onClick n'a pas été appelé
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test des attributs d'accessibilité
  it('devrait avoir les attributs d\'accessibilité corrects', () => {
    render(
      <Tag interactive disabled title="Tag Title">
        Accessible Tag
      </Tag>
    );
    
    const tag = screen.getByText('Accessible Tag').parentElement;
    expect(tag).toHaveAttribute('role', 'button');
    expect(tag).toHaveAttribute('aria-disabled', 'true');
    expect(tag).toHaveAttribute('title', 'Tag Title');
  });
}); 