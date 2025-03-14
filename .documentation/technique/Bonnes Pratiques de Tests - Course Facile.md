# Bonnes Pratiques de Tests - Course Facile

*Date de création: 14/03/2025*  
*Dernière mise à jour: 14/03/2025*

## Table des matières

1. [Introduction](#introduction)
2. [Organisation des tests](#organisation-des-tests)
3. [Conventions de nommage](#conventions-de-nommage)
4. [Structure des tests](#structure-des-tests)
5. [Bonnes pratiques générales](#bonnes-pratiques-générales)
6. [Tests de composants React](#tests-de-composants-react)
7. [Mocks et stubs](#mocks-et-stubs)
8. [Workflow de développement](#workflow-de-développement)
9. [Leçons apprises](#leçons-apprises)
10. [Ressources](#ressources)

## Introduction

Ce document définit les bonnes pratiques à suivre pour l'écriture et la maintenance des tests unitaires dans le projet Course Facile. Ces pratiques visent à assurer la qualité, la maintenabilité et l'efficacité des tests.

## Organisation des tests

- **Structure miroir** : Les tests doivent suivre la même structure que le code source.
  ```
  src/
    components/
      ui/
        Button.tsx
  src/__tests__/
    components/
      ui/
        Button.test.tsx
  ```

- **Séparation des types de tests** : Séparer les tests unitaires, d'intégration et end-to-end dans des dossiers distincts.
  ```
  src/__tests__/        # Tests unitaires
  src/__integration__/  # Tests d'intégration
  cypress/              # Tests end-to-end
  ```

## Conventions de nommage

- **Fichiers de test** : Nommer les fichiers de test avec le suffixe `.test.tsx` ou `.test.ts`.
- **Groupes de test** : Utiliser `describe` pour regrouper les tests liés à un même composant ou une même fonctionnalité.
- **Cas de test** : Commencer les descriptions des cas de test par "devrait" (ou "should" en anglais).

## Structure des tests

Chaque fichier de test doit suivre cette structure :

```typescript
import { render, screen } from '@testing-library/react';
import { ComponentToTest } from '@/components/path/to/component';

describe('ComponentToTest', () => {
  // Tests de rendu
  it('devrait rendre correctement avec les props par défaut', () => {
    // ...
  });

  // Tests de comportement
  it('devrait réagir correctement aux interactions utilisateur', () => {
    // ...
  });

  // Tests de cas limites
  it('devrait gérer correctement les cas limites', () => {
    // ...
  });
});
```

## Bonnes pratiques générales

1. **Principe AAA** : Suivre le principe Arrange-Act-Assert pour structurer chaque test.
   ```typescript
   it('devrait incrémenter le compteur', () => {
     // Arrange
     render(<Counter />);
     const button = screen.getByRole('button', { name: /incrémenter/i });
     
     // Act
     fireEvent.click(button);
     
     // Assert
     expect(screen.getByText('1')).toBeInTheDocument();
   });
   ```

2. **Tests isolés** : Chaque test doit être indépendant des autres.

3. **Éviter la logique conditionnelle** : Les tests ne doivent pas contenir de logique conditionnelle (if, switch, etc.).

4. **Tester les comportements, pas l'implémentation** : Se concentrer sur ce que le composant fait, pas sur comment il le fait.

5. **Couverture de code** : Viser une couverture de code d'au moins 70% pour les composants critiques.

## Tests de composants React

1. **Tester le rendu** : Vérifier que le composant se rend correctement avec différentes props.

2. **Tester les interactions utilisateur** : Utiliser `fireEvent` ou `userEvent` pour simuler les interactions utilisateur.

3. **Tester l'accessibilité** : Vérifier que les composants sont accessibles (rôles ARIA, attributs, etc.).

4. **Tester les cas d'erreur** : Vérifier que le composant gère correctement les erreurs.

5. **Éviter de tester les styles** : Les styles CSS sont difficiles à tester et changent souvent.

## Mocks et stubs

1. **Mocker les dépendances externes** : Mocker les API, les hooks de routage, etc.

2. **Utiliser des fixtures** : Créer des données de test réutilisables dans des fichiers séparés.

3. **Éviter les mocks excessifs** : Ne mocker que ce qui est nécessaire.

## Workflow de développement

1. **TDD quand c'est possible** : Écrire les tests avant le code quand c'est possible.

2. **Exécuter les tests fréquemment** : Lancer les tests après chaque modification significative.

3. **Vérifier la couverture** : Vérifier régulièrement la couverture de code.

4. **Corriger les tests cassés immédiatement** : Ne pas laisser s'accumuler les tests qui échouent.

5. **Avant chaque commit** : Lancer la suite de tests complète avant chaque commit.

## Leçons apprises

### Importations correctes

Vérifier le type d'exportation du composant à tester :
- Pour les exportations par défaut : `import Component from '@/components/path/Component'`
- Pour les exportations nommées : `import { Component } from '@/components/path/Component'`

### Adaptation aux composants shadcn/ui

Les composants shadcn/ui peuvent nécessiter des approches spécifiques :
- Certains composants comme Button ont des variantes qui ne correspondent pas exactement aux classes CSS attendues
- Les props comme `asChild` peuvent ne pas être reconnues dans les tests
- Il peut être nécessaire de mocker certains composants shadcn/ui pour les tests

### Gestion des textes fragmentés

Lorsqu'un texte est divisé en plusieurs éléments DOM :
- Utiliser des expressions régulières avec `getByText(/texte/i)` plutôt que des correspondances exactes
- Vérifier la structure du DOM rendu pour comprendre comment le texte est fragmenté
- Utiliser `getByTestId` comme alternative si le texte est trop complexe à cibler

### Vérification des classes CSS

Pour les classes CSS générées par Tailwind :
- Vérifier les classes individuellement plutôt que toutes ensemble
- Se concentrer sur les classes fonctionnelles importantes plutôt que sur les classes de style
- Utiliser `toHaveClass()` pour vérifier la présence d'une classe spécifique

### Typage TypeScript

Assurer un typage correct dans les tests :
- Créer des types pour les mocks si nécessaire
- Utiliser `as HTMLElement` pour les assertions sur les éléments DOM
- Ajouter des déclarations de types pour les extensions Jest si nécessaire

## Commandes utiles

```bash
# Lancer tous les tests
npm test

# Lancer les tests en mode watch
npm run test:watch

# Lancer les tests avec couverture
npm test -- --coverage

# Lancer un test spécifique
npm test -- ComponentName
```

## Ressources

- [Documentation de Jest](https://jestjs.io/docs/getting-started)
- [Documentation de React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Guide des bonnes pratiques de test React](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) 