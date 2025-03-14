# Tests Unitaires - Course Facile

**Date de création :** 14/03/2025  
**Dernière mise à jour :** 14/03/2025

## Introduction

Ce document décrit l'approche et les bonnes pratiques pour les tests unitaires dans l'application Course Facile. Les tests unitaires sont essentiels pour garantir la fiabilité, la maintenabilité et la qualité du code de l'application.

## Configuration

### Outils et bibliothèques

- **Jest** : Framework de test principal
- **React Testing Library** : Bibliothèque pour tester les composants React
- **jest-dom** : Extensions pour les assertions DOM
- **user-event** : Simulation des interactions utilisateur

### Structure des dossiers

```
src/
├── __tests__/
│   ├── components/
│   │   ├── ui/
│   │   ├── navigation/
│   │   ├── layout/
│   │   ├── feedback/
│   │   ├── data/
│   │   ├── form/
│   │   └── cards/
│   ├── hooks/
│   ├── utils/
│   └── pages/
└── types/
    └── jest-dom.d.ts  // Déclarations de types pour jest-dom
```

## Bonnes pratiques

### Conventions de nommage

- Les fichiers de test doivent suivre le format `[NomDuComposant].test.tsx`
- Les fichiers de test doivent être placés dans le même dossier que le composant testé, mais dans l'arborescence `__tests__/`

### Structure des tests

1. **Imports** : Importer les bibliothèques et le composant à tester
2. **Mocks** : Définir les mocks nécessaires (si applicable)
3. **Describe** : Regrouper les tests par fonctionnalité ou comportement
4. **Tests** : Écrire des tests individuels avec des descriptions claires

Exemple :

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentToTest } from '@/components/path/to/component';

// Mocks si nécessaire
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('ComponentToTest', () => {
  it('should render correctly with default props', () => {
    // Arrange
    render(<ComponentToTest />);
    
    // Assert
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
  
  it('should handle user interaction', async () => {
    // Arrange
    const user = userEvent.setup();
    const onChangeMock = jest.fn();
    render(<ComponentToTest onChange={onChangeMock} />);
    
    // Act
    await user.click(screen.getByRole('button'));
    
    // Assert
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
```

### Principes de test

1. **Tests isolés** : Chaque test doit être indépendant des autres
2. **Tests déterministes** : Les tests doivent produire les mêmes résultats à chaque exécution
3. **Tests lisibles** : Les tests doivent être faciles à comprendre
4. **Tests maintenables** : Les tests doivent être faciles à maintenir

### Modèle AAA (Arrange-Act-Assert)

- **Arrange** : Préparer les données et l'environnement pour le test
- **Act** : Exécuter l'action à tester
- **Assert** : Vérifier que le résultat est conforme aux attentes

### Mocking

- Utiliser des mocks pour isoler le composant des dépendances externes
- Éviter de tester l'implémentation interne des composants
- Se concentrer sur le comportement observable du composant

### Assertions

- Utiliser les assertions de `jest-dom` pour vérifier l'état du DOM
- Privilégier les assertions qui vérifient le comportement plutôt que l'implémentation
- Utiliser des assertions précises pour faciliter le débogage

## Tests des composants React

### Sélection des éléments

Privilégier les méthodes de sélection dans cet ordre :

1. `getByRole` : Sélectionner par rôle ARIA (accessibilité)
2. `getByLabelText` : Sélectionner par label (formulaires)
3. `getByText` : Sélectionner par texte visible
4. `getByTestId` : Sélectionner par attribut `data-testid` (dernier recours)

### Interactions utilisateur

Utiliser `userEvent` pour simuler les interactions utilisateur :

```tsx
const user = userEvent.setup();
await user.click(screen.getByRole('button'));
await user.type(screen.getByRole('textbox'), 'Hello, world!');
```

### Tests d'accessibilité

- Vérifier que les composants sont accessibles
- Utiliser les rôles ARIA appropriés
- Tester la navigation au clavier

## Workflow de développement

### TDD (Test-Driven Development)

1. Écrire un test qui échoue
2. Écrire le code minimal pour faire passer le test
3. Refactoriser le code tout en maintenant les tests verts

### Exécution des tests

- Exécuter les tests avant chaque commit
- Exécuter les tests après chaque modification importante
- Configurer l'intégration continue pour exécuter les tests automatiquement

### Commandes

- `npm test` : Exécuter tous les tests
- `npm test -- --watch` : Exécuter les tests en mode watch
- `npm test -- --coverage` : Générer un rapport de couverture

## Exemples de tests

### Test d'un composant UI simple

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('should render with the correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeDisabled();
  });
});
```

### Test d'un composant avec état

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from '@/components/Counter';

describe('Counter', () => {
  it('should increment count when increment button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={0} />);
    
    await user.click(screen.getByRole('button', { name: /increment/i }));
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
});
```

### Test d'un composant avec props

```tsx
import { render, screen } from '@testing-library/react';
import { FormGroup } from '@/components/form/FormGroup';

describe('FormGroup', () => {
  it('should render with title and description', () => {
    render(
      <FormGroup title="Form Title" description="Form Description">
        <input type="text" />
      </FormGroup>
    );
    
    expect(screen.getByText('Form Title')).toBeInTheDocument();
    expect(screen.getByText('Form Description')).toBeInTheDocument();
  });
});
```

## Résolution des problèmes courants

### Problèmes de typage TypeScript

Si vous rencontrez des problèmes de typage avec les assertions jest-dom, assurez-vous d'avoir un fichier de déclaration de types :

```typescript
// src/types/jest-dom.d.ts
import '@testing-library/jest-dom';
```

### Mocking des composants externes

Pour les composants externes comme ceux de shadcn/ui, créez des mocks simplifiés :

```tsx
jest.mock('@/components/ui/Switch', () => ({
  Switch: ({ checked, onCheckedChange }: { checked?: boolean; onCheckedChange?: (checked: boolean) => void }) => (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange && onCheckedChange(!checked)}
      data-testid="mock-switch"
    >
      Switch
    </button>
  ),
}));
```

### Tests asynchrones

Pour les tests impliquant des opérations asynchrones, utilisez `async/await` :

```tsx
it('should load data asynchronously', async () => {
  render(<AsyncComponent />);
  
  // Attendre que les données soient chargées
  expect(await screen.findByText('Data loaded')).toBeInTheDocument();
});
```

## Conclusion

Les tests unitaires sont un investissement qui améliore la qualité du code et facilite la maintenance à long terme. En suivant ces bonnes pratiques, nous pouvons créer une suite de tests robuste qui nous donne confiance dans notre code et nous permet de détecter rapidement les régressions.

## Ressources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
- [Kent C. Dodds - Common Mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) 