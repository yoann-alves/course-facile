# Documentation Technique - Composants Réutilisables

*Date de création: 15/11/2023*  
*Dernière mise à jour: 15/11/2023*

## Introduction

Ce document technique décrit l'architecture et l'implémentation des composants réutilisables dans l'application Course Facile. Ces composants ont été conçus pour assurer une cohérence visuelle, simplifier le développement et faciliter la maintenance de l'application.

## Architecture des composants

Les composants réutilisables sont organisés selon la structure suivante :

```
src/components/
├── ui/                  # Composants UI de base (shadcn/ui)
├── navigation/          # Composants de navigation
├── layout/              # Composants de mise en page
├── feedback/            # Composants de feedback
├── data/                # Composants de données
├── form/                # Composants de formulaire
├── cards/               # Composants de cartes
└── index.ts             # Point d'entrée pour l'exportation des composants
```

### Principes de conception

1. **Atomicité** : Les composants sont conçus selon le principe de l'atomicité, allant des éléments les plus simples (atomes) aux plus complexes (organismes).
2. **Réutilisabilité** : Chaque composant est conçu pour être réutilisé dans différents contextes.
3. **Personnalisation** : Les composants acceptent des props pour personnaliser leur apparence et leur comportement.
4. **Accessibilité** : Les composants respectent les normes d'accessibilité WCAG 2.1.
5. **Thème** : Les composants s'adaptent au thème clair/sombre de l'application.

## Dépendances

Les composants réutilisables s'appuient sur les bibliothèques suivantes :

- **shadcn/ui** : Bibliothèque de composants UI de base
- **Tailwind CSS** : Framework CSS utilitaire
- **Lucide React** : Bibliothèque d'icônes
- **React** : Bibliothèque UI
- **Next.js** : Framework React

## Implémentation

### Composants de typographie

Les composants de typographie (`Heading1`, `Paragraph`, etc.) sont implémentés dans `src/components/ui/typography.tsx`. Ils utilisent Tailwind CSS pour le style et acceptent des props pour personnaliser leur apparence.

```tsx
// Exemple d'implémentation
export function Heading1({ children, className, as: Component = 'h1' }: TypographyProps) {
  return (
    <Component className={cn(
      'scroll-m-20 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50',
      className
    )}>
      {children}
    </Component>
  );
}
```

### Composants d'icônes

Le composant `Icon` (`src/components/ui/icon.tsx`) est un wrapper autour des icônes Lucide qui permet de standardiser leur utilisation. Il accepte des props pour personnaliser la taille, la couleur, et d'autres aspects de l'icône.

```tsx
// Exemple d'utilisation
<Icon 
  icon={ShoppingCart} 
  size="md" 
  variant="primary" 
  withBackground 
/>
```

### Composants de navigation

Les composants de navigation (`NavigationItem`, `Breadcrumbs`, `TabsNavigation`) sont implémentés dans le répertoire `src/components/navigation/`. Ils utilisent Next.js pour la navigation et shadcn/ui pour les éléments UI.

### Composants de mise en page

Les composants de mise en page (`Section`, `PageHeader`, `Grid`, `Container`, `Divider`) sont implémentés dans le répertoire `src/components/layout/`. Ils utilisent Tailwind CSS pour la mise en page et acceptent des props pour personnaliser leur apparence.

```tsx
// Exemple d'utilisation du composant Container
<Container 
  size="lg" 
  padding="md" 
  centered
>
  {/* Contenu du conteneur */}
</Container>

// Exemple d'utilisation du composant Divider
<Divider 
  orientation="horizontal" 
  variant="dashed" 
  size="medium" 
  color="primary" 
  label="Ou" 
  labelPosition="center" 
/>
```

### Composants de feedback

Les composants de feedback (`EmptyState`, `Status`, `Alert`, `Modal`) sont implémentés dans le répertoire `src/components/feedback/`. Ils utilisent shadcn/ui pour les éléments UI et Tailwind CSS pour le style.

### Composants de données

Les composants de données (`DataCard`, `ExpirationIndicator`, `Tag`, `Avatar`, `PriceTag`, `CompletionIndicator`) sont implémentés dans le répertoire `src/components/data/`. Ils sont conçus pour afficher des données spécifiques à l'application.

```tsx
// Exemple d'utilisation du composant Tag
<Tag 
  variant="primary" 
  size="md" 
  icon={ShoppingCart} 
  onRemove={() => {}}
>
  Courses
</Tag>

// Exemple d'utilisation du composant Avatar
<Avatar 
  src="/images/avatar.jpg" 
  alt="John Doe" 
  size="md" 
  status="online" 
/>

// Exemple d'utilisation du composant PriceTag
<PriceTag 
  price={19.99} 
  oldPrice={24.99} 
  variant="primary" 
  size="md" 
/>

// Exemple d'utilisation du composant CompletionIndicator
<CompletionIndicator 
  total={10} 
  completed={7} 
  showPercentage 
  showFraction 
  variant="default" 
/>
```

### Composants de formulaire

Les composants de formulaire (`FormField`, `QuantitySelector`, `FormGroup`, `SwitchField`, `SearchAndFilterBar`, `TabFilters`) sont implémentés dans le répertoire `src/components/form/`. Ils utilisent shadcn/ui pour les éléments UI et acceptent des props pour personnaliser leur apparence et leur comportement.

```tsx
// Exemple d'utilisation du composant FormGroup
<FormGroup 
  title="Informations personnelles" 
  description="Veuillez saisir vos informations personnelles" 
  layout="grid" 
  columns={2}
>
  <FormField id="firstName" label="Prénom">
    <Input id="firstName" />
  </FormField>
  <FormField id="lastName" label="Nom">
    <Input id="lastName" />
  </FormField>
</FormGroup>

// Exemple d'utilisation du composant SwitchField
<SwitchField 
  id="notifications" 
  label="Notifications" 
  description="Recevoir des notifications par email" 
  checked={enabled} 
  onCheckedChange={setEnabled} 
  icon={Bell}
/>

// Exemple d'utilisation du composant SearchAndFilterBar
<SearchAndFilterBar 
  value={search} 
  onChange={setSearch} 
  onSearch={value => console.log('Recherche:', value)} 
  filters={filters} 
  onFilterChange={setFilters} 
/>

// Exemple d'utilisation du composant TabFilters
<TabFilters 
  options={[
    { id: 'active', label: 'Actives', icon: List, count: 5 },
    { id: 'pending', label: 'En attente', icon: Clock, count: 2 },
    { id: 'archived', label: 'Archivées', icon: Archive, count: 10 }
  ]} 
  value={activeTab} 
  onChange={setActiveTab} 
  variant="pills" 
/>
```

## Utilisation

Les composants réutilisables sont exportés depuis le fichier `src/components/index.ts`, ce qui permet de les importer facilement dans n'importe quel fichier de l'application.

```tsx
// Exemple d'importation
import { Icon, Section, PageHeader, Grid, DataCard } from '@/components';
```

## Bonnes pratiques

1. **Utiliser les composants existants** : Avant de créer un nouveau composant, vérifier si un composant existant peut être utilisé ou étendu.
2. **Documenter les composants** : Chaque composant doit être documenté avec des commentaires JSDoc et des exemples d'utilisation.
3. **Tester les composants** : Les composants doivent être testés pour s'assurer qu'ils fonctionnent correctement dans différents contextes.
4. **Respecter les principes de conception** : Les composants doivent respecter les principes de conception définis ci-dessus.
5. **Mettre à jour la documentation** : La documentation doit être mise à jour lorsque des composants sont ajoutés, modifiés ou supprimés.

## Évolution future

Les composants réutilisables sont destinés à évoluer avec l'application. Voici quelques pistes d'évolution :

1. **Ajout de nouveaux composants** : De nouveaux composants seront ajoutés en fonction des besoins de l'application.
2. **Amélioration des composants existants** : Les composants existants seront améliorés en fonction des retours d'utilisation.
3. **Mise en place de tests unitaires** : Des tests unitaires seront ajoutés pour s'assurer de la qualité des composants.
4. **Création d'une documentation visuelle** : Une documentation visuelle (storybook) sera créée pour faciliter l'utilisation des composants.

## Conclusion

Les composants réutilisables sont un élément clé de l'architecture de l'application Course Facile. Ils permettent de maintenir une cohérence visuelle, de simplifier le développement et de faciliter la maintenance de l'application. 