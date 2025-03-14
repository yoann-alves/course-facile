import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Paragraph,
  SmallText,
  Muted,
  Highlight,
  Quote,
  Code,
  List,
  ListItem
} from '@/components/ui/typography';

describe('Typography Components', () => {
  // Tests pour les titres
  describe('Heading Components', () => {
    it('devrait rendre Heading1 correctement', () => {
      render(<Heading1>Titre principal</Heading1>);
      const heading = screen.getByText('Titre principal');
      expect(heading.tagName).toBe('H1');
      expect(heading).toHaveClass('text-3xl');
    });

    it('devrait rendre Heading2 correctement', () => {
      render(<Heading2>Sous-titre</Heading2>);
      const heading = screen.getByText('Sous-titre');
      expect(heading.tagName).toBe('H2');
      expect(heading).toHaveClass('text-2xl');
    });

    it('devrait rendre Heading3 correctement', () => {
      render(<Heading3>Titre de section</Heading3>);
      const heading = screen.getByText('Titre de section');
      expect(heading.tagName).toBe('H3');
      expect(heading).toHaveClass('text-xl');
    });

    it('devrait rendre Heading4 correctement', () => {
      render(<Heading4>Titre de sous-section</Heading4>);
      const heading = screen.getByText('Titre de sous-section');
      expect(heading.tagName).toBe('H4');
      expect(heading).toHaveClass('text-lg');
    });
  });

  // Tests pour les paragraphes et textes
  describe('Text Components', () => {
    it('devrait rendre Paragraph correctement', () => {
      render(<Paragraph>Texte de paragraphe</Paragraph>);
      const paragraph = screen.getByText('Texte de paragraphe');
      expect(paragraph.tagName).toBe('P');
      expect(paragraph).toHaveClass('leading-7');
    });

    it('devrait rendre SmallText correctement', () => {
      render(<SmallText>Petit texte</SmallText>);
      const smallText = screen.getByText('Petit texte');
      expect(smallText.tagName).toBe('SMALL');
      expect(smallText).toHaveClass('text-sm');
    });

    it('devrait rendre Muted correctement', () => {
      render(<Muted>Texte atténué</Muted>);
      const muted = screen.getByText('Texte atténué');
      expect(muted.tagName).toBe('P');
      expect(muted).toHaveClass('text-sm');
      expect(muted).toHaveClass('text-gray-500');
    });

    it('devrait rendre Highlight correctement', () => {
      render(<Highlight>Texte mis en évidence</Highlight>);
      const highlight = screen.getByText('Texte mis en évidence');
      expect(highlight).toHaveClass('font-medium');
      expect(highlight).toHaveClass('text-gray-900');
    });
  });

  // Tests pour les éléments spéciaux
  describe('Special Components', () => {
    it('devrait rendre Quote correctement', () => {
      render(<Quote>Citation importante</Quote>);
      const quote = screen.getByText('Citation importante');
      expect(quote.tagName).toBe('BLOCKQUOTE');
      expect(quote).toHaveClass('border-l-2');
      expect(quote).toHaveClass('italic');
    });

    it('devrait rendre Code correctement', () => {
      render(<Code>console.log(&apos;test&apos;)</Code>);
      const code = screen.getByText("console.log('test')");
      expect(code.tagName).toBe('CODE');
      expect(code).toHaveClass('relative');
    });
  });

  // Tests pour les listes
  describe('List Components', () => {
    it('devrait rendre List correctement', () => {
      render(
        <List>
          <ListItem>Premier élément</ListItem>
          <ListItem>Deuxième élément</ListItem>
        </List>
      );
      
      const list = screen.getByRole('list');
      expect(list.tagName).toBe('UL');
      expect(list).toHaveClass('my-6');
      
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(2);
      expect(items[0]).toHaveTextContent('Premier élément');
      expect(items[1]).toHaveTextContent('Deuxième élément');
    });

    it('devrait rendre List avec as="ol" correctement', () => {
      render(
        <List as="ol">
          <ListItem>Premier élément</ListItem>
          <ListItem>Deuxième élément</ListItem>
        </List>
      );
      
      const list = screen.getByRole('list');
      expect(list.tagName).toBe('OL');
    });
  });

  // Tests pour les classes personnalisées
  describe('Custom Classes', () => {
    it('devrait accepter des classes personnalisées pour Heading1', () => {
      render(<Heading1 className="test-class">Titre personnalisé</Heading1>);
      const heading = screen.getByText('Titre personnalisé');
      expect(heading).toHaveClass('test-class');
    });

    it('devrait accepter des classes personnalisées pour Paragraph', () => {
      render(<Paragraph className="test-class">Paragraphe personnalisé</Paragraph>);
      const paragraph = screen.getByText('Paragraphe personnalisé');
      expect(paragraph).toHaveClass('test-class');
    });
  });
}); 