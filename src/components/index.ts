/**
 * Fichier d'index pour exporter tous les composants réutilisables
 */

// Composants UI de base
export * from './ui/button';
export * from './ui/badge';
export * from './ui/card';
export * from './ui/checkbox';
export * from './ui/dialog';
export * from './ui/dropdown-menu';
export * from './ui/input';
export * from './ui/label';
export * from './ui/popover';
export * from './ui/scroll-area';
export * from './ui/select';
export * from './ui/separator';
export * from './ui/switch';
export * from './ui/tabs';
export * from './ui/toast';
export * from './ui/tooltip';

// Composants de typographie
export * from './ui/typography';

// Composants d'icônes
export { default as Icon } from './ui/icon';
export type { IconSize, IconVariant } from './ui/icon';

// Composants de navigation
export { default as NavigationItem } from './navigation/NavigationItem';
export type { NavigationItemProps } from './navigation/NavigationItem';
export { default as Breadcrumbs } from './navigation/Breadcrumbs';
export type { BreadcrumbItem, BreadcrumbsProps } from './navigation/Breadcrumbs';
export { default as TabsNavigation } from './navigation/TabsNavigation';
export type { TabItem, TabsNavigationProps } from './navigation/TabsNavigation';

// Composants de mise en page
export { default as Section } from './layout/Section';
export type { SectionProps } from './layout/Section';
export { default as PageHeader } from './layout/PageHeader';
export type { PageHeaderProps, PageHeaderAction } from './layout/PageHeader';
export { default as Grid } from './layout/Grid';
export type { GridProps, GridCols, GridGap } from './layout/Grid';
export { default as Container } from './layout/Container';
export type { ContainerProps } from './layout/Container';
export { default as Divider } from './layout/Divider';
export type { DividerProps } from './layout/Divider';

// Composants de feedback
export { default as EmptyState } from './feedback/EmptyState';
export type { EmptyStateProps } from './feedback/EmptyState';
export { default as Status } from './feedback/Status';
export type { StatusProps, StatusVariant } from './feedback/Status';
export { default as Alert } from './feedback/Alert';
export type { AlertProps, AlertVariant } from './feedback/Alert';
export { default as Modal } from './feedback/Modal';
export type { ModalProps, ModalAction } from './feedback/Modal';

// Composants de données
export { default as DataCard } from './data/DataCard';
export type { DataCardProps } from './data/DataCard';
export { default as ExpirationIndicator } from './data/ExpirationIndicator';
export type { ExpirationIndicatorProps } from './data/ExpirationIndicator';
export { default as Tag } from './data/Tag';
export type { TagProps, TagVariant } from './data/Tag';
export { default as Avatar } from './data/Avatar';
export type { AvatarProps } from './data/Avatar';
export { default as PriceTag } from './data/PriceTag';
export type { PriceTagProps } from './data/PriceTag';
export { default as CompletionIndicator } from './data/CompletionIndicator';
export type { CompletionIndicatorProps } from './data/CompletionIndicator';

// Composants de formulaire
export { default as FormField } from './form/FormField';
export type { FormFieldProps } from './form/FormField';
export { default as QuantitySelector } from './form/QuantitySelector';
export type { QuantitySelectorProps } from './form/QuantitySelector';
export { default as FormGroup } from './form/FormGroup';
export type { FormGroupProps } from './form/FormGroup';
export { default as SwitchField } from './form/SwitchField';
export type { SwitchFieldProps } from './form/SwitchField';
export { default as SearchAndFilterBar } from './form/SearchAndFilterBar';
export type { SearchAndFilterBarProps, FilterOption } from './form/SearchAndFilterBar';
export { default as TabFilters } from './form/TabFilters';
export type { TabFiltersProps, TabOption } from './form/TabFilters';

// Autres composants existants
export { default as BaseCard } from './cards/BaseCard';
export { default as ShoppingListCard } from './cards/ShoppingListCard';

// Note: Les composants suivants ne sont pas encore exportés car ils nécessitent une vérification
// export { default as ThemeSelector } from './ThemeSelector';
// export { default as UserMenu } from './UserMenu';
// export { default as ProductCard } from './cards/ProductCard';
// export { default as NotificationCard } from './cards/NotificationCard'; 