# User Interface Design Document - Course Facile

*Date de dernière mise à jour: 14/03/2025*

## Layout Structure
- **Menu Latéral (Sidebar)** : Navigation simple et intuitive, idéal pour les utilisateurs débutants ou intermédiaires. Contient des liens vers toutes les fonctionnalités principales de l'application.
- **Vue Principale** : Dédicacée aux listes de courses avec notifications visibles en haut.
- **Responsive Design** : Adaptation automatique entre les versions mobile et desktop.
- **Mode Sombre** : Support complet du mode sombre pour une meilleure expérience utilisateur.

## Core Components

### Navigation
- **Sidebar** : Barre latérale avec accès à :
  - Tableau de bord
  - Toutes les listes
  - Gérer les péremptions
  - Paramètres
- **Header Mobile** : Barre supérieure avec menu hamburger pour accéder à la sidebar sur mobile.

### Pages Principales
- **Tableau de Bord** : Vue d'ensemble des listes de courses et activités récentes.
- **Toutes les Listes** : Affichage de toutes les listes avec options de filtrage (toutes, actives, terminées, récentes) et de tri (date, nom, nombre d'articles).
- **Détail d'une Liste** : Affichage des produits d'une liste groupés par catégorie avec options d'édition.
- **Détail d'un Produit** : Affichage des informations détaillées d'un produit avec ses instances et dates de péremption.
- **Gérer les Péremptions** : Interface pour suivre et gérer les dates de péremption des produits.
- **Paramètres** : Configuration de l'application et préférences utilisateur, y compris le choix du thème.

### Composants UI
- **Cards** : Utilisées pour afficher les listes de courses et les informations sur les produits.
- **Formulaires** : Simplifiés pour la création et la gestion des listes.
- **Tabs** : Pour naviguer entre différentes vues dans une même page (ex: filtres de listes).
- **Boutons** : Design cohérent avec accents de couleur verte.
- **Toast Notifications** : Pour les confirmations et alertes.
- **Modales** : Pour les actions rapides comme la création de liste sans changement de page.
- **Filtres** : Composants avancés pour la recherche, le filtrage et le tri des données.

## Interaction Patterns
- **Menu Latéral Rétractable** : Pour maximiser l'espace d'affichage sur mobile.
- **Éléments Interactifs** : Accents de vert foncé pour attirer l'attention.
- **Hover States** : Feedback visuel au survol des éléments cliquables.
- **Active States** : Indication visuelle claire de la page active dans la navigation.
- **Cartes Cliquables** : Zones de clic élargies pour une meilleure accessibilité.
- **Mode Double** : Visualisation/édition pour les listes de courses.
- **Menu Contextuel** : Actions rapides pour les cartes de listes.

## Visual Design Elements & Color Scheme
- **Base de Blanc Épuré** : Pour une apparence propre et moderne en mode clair.
- **Fond Sombre** : Pour le mode sombre avec contraste optimisé.
- **Accents de Vert Foncé** : Pour les éléments interactifs et les indicateurs d'état actif.
- **Gris Clair** : Pour les arrière-plans secondaires et les bordures en mode clair.
- **Gris Foncé** : Pour les arrière-plans secondaires en mode sombre.
- **Couleurs Sémantiques** : Rouge pour les alertes, orange pour les avertissements, vert pour les succès.

## Mobile, Web App, Desktop Considerations
- **Mobile** : 
  - Interface réactive avec menu latéral rétractable
  - Boutons et zones tactiles de taille suffisante
  - Navigation simplifiée avec menu hamburger
  - Optimisation pour l'utilisation à une main
- **Web App/Desktop** : 
  - Navigation fluide et intuitive
  - Affichage permanent de la sidebar
  - Utilisation optimisée de l'espace écran
  - Raccourcis clavier pour les actions fréquentes (à implémenter)

## Typography
- **Polices Modernes et Épurées** : Taille de police suffisamment grande pour une bonne lisibilité.
- **Hiérarchie Typographique** : Distinction claire entre titres, sous-titres et corps de texte.
- **Adaptation au Mode Sombre** : Ajustement des contrastes pour une lisibilité optimale.

## Accessibility
- **Navigation Optimisée** : Pour le clavier et les lecteurs d'écran.
- **Contraste Élevé** : Pour les textes et les boutons afin de garantir une bonne visibilité.
- **Textes Alternatifs** : Pour toutes les icônes et éléments visuels.
- **Structure Sémantique** : Utilisation appropriée des balises HTML pour une meilleure accessibilité.
- **Zones de Clic Élargies** : Pour une meilleure accessibilité sur mobile.

## État d'Implémentation
- **Implémenté** :
  - Structure de base de la sidebar
  - Navigation responsive
  - Page "Toutes les listes" avec filtrage et tri
  - Design général de l'application
  - Mode sombre avec adaptation complète de tous les composants
  - Modale de création rapide de liste
  - Page de détail d'une liste avec affichage des produits par catégorie
  - Page de détail d'un produit avec gestion des instances
  - Composants de filtrage avancés (SearchAndFilterBar, TabFilters, AdvancedFilters)
  - Amélioration des contrastes et des couleurs pour l'accessibilité
  
- **En cours de développement** :
  - Amélioration de l'expérience utilisateur
  - Optimisation pour différentes tailles d'écran
  - Animations et transitions subtiles
  
- **À implémenter** :
  - Raccourcis clavier pour les utilisateurs avancés
  - Améliorations d'accessibilité avancées (ARIA, navigation au clavier)
  - Internationalisation (i18n)