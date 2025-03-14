# Composants Réutilisables - Course Facile

Ce document présente les composants réutilisables développés pour l'application Course Facile. Ces composants sont conçus pour être facilement intégrés dans différentes parties de l'application, assurant ainsi une cohérence visuelle et une maintenance simplifiée.

## Table des matières

1. [Composants de typographie](#composants-de-typographie)
2. [Composants d'icônes](#composants-dicônes)
3. [Composants de navigation](#composants-de-navigation)
4. [Composants de mise en page](#composants-de-mise-en-page)
5. [Composants de feedback](#composants-de-feedback)
6. [Composants de données](#composants-de-données)
7. [Composants de formulaire](#composants-de-formulaire)
8. [Bonnes pratiques d'utilisation](#bonnes-pratiques-dutilisation)

## Composants de typographie

Les composants de typographie permettent de maintenir une cohérence dans les styles de texte à travers l'application.

### Utilisation

```tsx
import { Heading1, Paragraph, SmallText } from '@/components';

<Heading1>Titre principal</Heading1>
<Paragraph>Texte de paragraphe standard</Paragraph>
<SmallText>Texte plus petit</SmallText>
```

## Composants d'icônes

Le composant `Icon` est un wrapper autour des icônes Lucide qui permet de standardiser leur utilisation.

### Utilisation

```tsx
import { Icon } from '@/components';
import { ShoppingCart, Bell } from 'lucide-react';

<Icon icon={ShoppingCart} size="md" variant="primary" />
<Icon icon={Bell} size="sm" variant="danger" withBackground />
<Icon icon={Bell} label="Notifications" labelPosition="right" />
```

### Props

- `icon`: L'icône Lucide à afficher
- `size`: Taille de l'icône ('xs', 'sm', 'md', 'lg', 'xl')
- `variant`: Variante de couleur ('default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'muted')
- `withBackground`: Ajoute un fond circulaire à l'icône
- `label`: Texte à afficher à côté de l'icône
- `labelPosition`: Position du label ('left', 'right')
- `onClick`: Fonction appelée au clic sur l'icône
- `className`: Classes CSS additionnelles

## Composants de navigation

### NavigationItem

Composant pour les éléments de navigation dans la sidebar.

```tsx
import { NavigationItem } from '@/components';
import { Home, ShoppingCart } from 'lucide-react';

<NavigationItem 
  href="/dashboard" 
  icon={Home} 
  label="Tableau de bord" 
  isCollapsed={false} 
  badgeCount={3} 
/>
```

### Breadcrumbs

Composant pour afficher un fil d'Ariane (breadcrumbs).

```tsx
import { Breadcrumbs } from '@/components';
import { FileText } from 'lucide-react';

<Breadcrumbs 
  items={[
    { label: 'Listes', href: '/lists' },
    { label: 'Ma liste', href: '/lists/123' },
    { label: 'Édition', icon: <FileText className="h-4 w-4" /> }
  ]}
  showHomeIcon
/>
```

### TabsNavigation

Composant pour la navigation par onglets.

```tsx
import { TabsNavigation } from '@/components';
import { List, Clock, Settings } from 'lucide-react';

<TabsNavigation 
  tabs={[
    { 
      id: 'active', 
      label: 'Actives', 
      icon: List, 
      content: <div>Listes actives</div>,
      badge: 3
    },
    { 
      id: 'archived', 
      label: 'Archivées', 
      icon: Clock, 
      content: <div>Listes archivées</div> 
    },
    { 
      id: 'settings', 
      label: 'Paramètres', 
      icon: Settings, 
      content: <div>Paramètres des listes</div> 
    }
  ]}
  variant="pills"
/>
```

## Composants de mise en page

### Section

Composant pour organiser les sections de page.

```tsx
import { Section } from '@/components';
import { ShoppingCart } from 'lucide-react';

<Section 
  title="Mes listes de courses" 
  description="Gérez vos listes de courses" 
  icon={ShoppingCart}
  variant="card"
>
  {/* Contenu de la section */}
</Section>
```

### PageHeader

Composant pour les en-têtes de page.

```tsx
import { PageHeader } from '@/components';
import { ShoppingCart, Plus } from 'lucide-react';

<PageHeader 
  title="Listes de courses" 
  description="Gérez vos listes de courses" 
  icon={ShoppingCart}
  actions={[
    { 
      label: 'Nouvelle liste', 
      onClick: () => {}, 
      icon: Plus 
    }
  ]}
/>
```

### Grid

Composant pour les mises en page en grille.

```tsx
import { Grid } from '@/components';

<Grid 
  cols={1} 
  colsMd={2} 
  colsLg={3} 
  gap="md"
>
  <div>Élément 1</div>
  <div>Élément 2</div>
  <div>Élément 3</div>
</Grid>
```

### Container

Composant pour créer un conteneur avec une largeur maximale et un padding.

```tsx
import { Container } from '@/components';

<Container 
  size="lg" 
  padding="md" 
  centered
>
  {/* Contenu du conteneur */}
</Container>
```

### Divider

Composant pour créer un séparateur horizontal ou vertical.

```tsx
import { Divider } from '@/components';

<Divider />

<Divider 
  orientation="horizontal" 
  variant="dashed" 
  size="medium" 
  color="primary" 
  label="Ou" 
  labelPosition="center" 
/>
```

## Composants de feedback

### EmptyState

Composant pour afficher un état vide.

```tsx
import { EmptyState } from '@/components';
import { ShoppingCart } from 'lucide-react';

<EmptyState 
  title="Aucune liste de courses" 
  description="Vous n'avez pas encore créé de liste de courses" 
  icon={ShoppingCart}
  action={{
    label: 'Créer une liste',
    onClick: () => {}
  }}
/>
```

### Status

Composant pour afficher des statuts.

```tsx
import { Status } from '@/components';
import { Clock } from 'lucide-react';

<Status 
  label="En attente" 
  variant="warning" 
  icon={Clock} 
  withDot 
/>
```

### Alert

Composant pour afficher des messages d'alerte.

```tsx
import { Alert } from '@/components';
import { Button } from '@/components/ui/button';

<Alert 
  title="Attention" 
  variant="warning"
  onClose={() => {}}
  actions={
    <Button size="sm">Résoudre</Button>
  }
>
  Votre liste contient des produits expirés.
</Alert>
```

### Modal

Composant pour afficher des modales.

```tsx
import { Modal } from '@/components';
import { useState } from 'react';

const [open, setOpen] = useState(false);

<Modal 
  open={open} 
  onOpenChange={setOpen}
  title="Confirmation"
  description="Êtes-vous sûr de vouloir supprimer cette liste ?"
  primaryAction={{
    label: 'Supprimer',
    onClick: () => {},
    variant: 'destructive'
  }}
  cancelAction={{
    label: 'Annuler',
    onClick: () => setOpen(false)
  }}
/>
```

## Composants de données

### DataCard

Composant pour afficher des cartes de données.

```tsx
import { DataCard } from '@/components';
import { ShoppingCart } from 'lucide-react';

<DataCard 
  title="Listes de courses" 
  value={12} 
  icon={ShoppingCart}
  description="Total des listes actives"
  trend={{
    value: 5,
    isPositive: true,
    label: "vs mois dernier"
  }}
/>
```

### ExpirationIndicator

Composant pour afficher l'état d'expiration d'un produit.

```tsx
import { ExpirationIndicator } from '@/components';

<ExpirationIndicator 
  expiryDate="2023-12-31" 
  showIcon 
  showDays 
  variant="badge"
/>
```

### Tag

Composant pour afficher des étiquettes.

```tsx
import { Tag } from '@/components';
import { ShoppingCart } from 'lucide-react';

<Tag 
  variant="primary" 
  size="md" 
  icon={ShoppingCart} 
  onRemove={() => {}}
>
  Courses
</Tag>
```

### Avatar

Composant pour afficher un avatar utilisateur.

```tsx
import { Avatar } from '@/components';

<Avatar 
  src="/images/avatar.jpg" 
  alt="John Doe" 
  size="md" 
  status="online" 
/>

<Avatar 
  initials="JD" 
  size="lg" 
  shape="square" 
/>
```

### PriceTag

Composant pour afficher un prix.

```tsx
import { PriceTag } from '@/components';

<PriceTag 
  price={19.99} 
  oldPrice={24.99} 
  variant="primary" 
  size="md" 
/>
```

### CompletionIndicator

Composant pour afficher la progression d'une liste.

```tsx
import { CompletionIndicator } from '@/components';

<CompletionIndicator 
  total={10} 
  completed={7} 
  showPercentage 
  showFraction 
  variant="default" 
/>

<CompletionIndicator 
  total={5} 
  completed={3} 
  variant="circle" 
  size="lg" 
/>
```

## Composants de formulaire

### FormField

Composant pour les champs de formulaire.

```tsx
import { FormField } from '@/components';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

<FormField 
  id="email" 
  label="Adresse email" 
  description="Nous ne partagerons jamais votre email" 
  icon={Mail}
  required
>
  <Input id="email" placeholder="exemple@email.com" />
</FormField>
```

### QuantitySelector

Composant pour sélectionner des quantités.

```tsx
import { QuantitySelector } from '@/components';
import { useState } from 'react';

const [quantity, setQuantity] = useState(1);

<QuantitySelector 
  value={quantity} 
  onChange={setQuantity} 
  min={1} 
  max={10} 
  label="Quantité"
/>
```

### FormGroup

Composant pour regrouper des champs de formulaire.

```tsx
import { FormGroup, FormField } from '@/components';
import { Input } from '@/components/ui/input';

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
```

### SwitchField

Composant pour les champs d'interrupteur.

```tsx
import { SwitchField } from '@/components';
import { useState } from 'react';
import { Bell } from 'lucide-react';

const [enabled, setEnabled] = useState(false);

<SwitchField 
  id="notifications" 
  label="Notifications" 
  description="Recevoir des notifications par email" 
  checked={enabled} 
  onCheckedChange={setEnabled} 
  icon={Bell}
/>
```

### SearchAndFilterBar

Composant pour la recherche et le filtrage.

```tsx
import { SearchAndFilterBar } from '@/components';
import { useState } from 'react';

const [search, setSearch] = useState('');
const [filters, setFilters] = useState([
  {
    id: 'category',
    label: 'Catégorie',
    type: 'select',
    options: ['Fruits', 'Légumes', 'Viandes'],
    selected: ''
  }
]);

<SearchAndFilterBar 
  value={search} 
  onChange={setSearch} 
  onSearch={value => console.log('Recherche:', value)} 
  filters={filters} 
  onFilterChange={setFilters} 
/>
```

### TabFilters

Composant pour le filtrage par onglets.

```tsx
import { TabFilters } from '@/components';
import { useState } from 'react';
import { List, Clock, Archive } from 'lucide-react';

const [activeTab, setActiveTab] = useState('active');

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

## Bonnes pratiques d'utilisation

1. **Importation centralisée** : Importez les composants depuis le point d'entrée central :
   ```tsx
   import { Icon, Section, PageHeader, Grid, DataCard } from '@/components';
   ```

2. **Composition** : Combinez les composants pour créer des interfaces complexes :
   ```tsx
   <Section title="Statistiques">
     <Grid cols={1} colsMd={3} gap="md">
       <DataCard title="Listes" value={12} />
       <DataCard title="Produits" value={45} />
       <DataCard title="Économies" value="45€" />
     </Grid>
   </Section>
   ```

3. **Personnalisation** : Utilisez les props pour personnaliser les composants selon vos besoins.

4. **Cohérence** : Utilisez systématiquement ces composants plutôt que de créer des éléments ad hoc.

5. **Extension** : Si un composant ne répond pas exactement à vos besoins, étendez-le plutôt que d'en créer un nouveau.

---

Pour ajouter de nouveaux composants réutilisables, suivez la structure existante et mettez à jour cette documentation. 