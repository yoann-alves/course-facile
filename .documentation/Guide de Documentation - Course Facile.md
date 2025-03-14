# Guide de Documentation - Course Facile

*Date de création: 14/03/2025*

## Principe fondamental

**Pour chaque action de développement, une mise à jour documentaire correspondante est requise.**

## Table de correspondance Actions-Documentation

| Action | Documents à mettre à jour |
|--------|--------------------------|
| **Nouvelle fonctionnalité** | - Avancement du Projet (statut)<br>- Project Log (détails)<br>- Guide Utilisateur (si visible pour l'utilisateur) |
| **Correction de bug** | - Project Log (solution)<br>- Journal des Erreurs (documentation complète) |
| **Nouveau composant** | - Documentation du composant<br>- Rétro-ingénierie (mise à jour de la cartographie) |
| **Modification d'architecture** | - Software Requirements Specification<br>- Rétro-ingénierie |
| **Changement d'UI** | - User Interface Design Document<br>- Guide Utilisateur (captures d'écran) |
| **Nouvelle erreur rencontrée** | - Journal des Erreurs (contexte, cause, solution) |
| **Nouvelle version** | - Avancement du Projet (version)<br>- Project Log (changements) |
| **Nouveau document** | - Organisation de la Documentation (structure) |

## Format standard des entrées

### Journal des Erreurs
```
### [Message d'erreur court]
**Date**: JJ/MM/AAAA
**Contexte**: [Contexte]
**Cause**: [Cause]
**Solution**: [Solution]
```

### Project Log
```
### JJ/MM/AAAA - [Titre]
- [Description des changements]
- [Impact]
```

### Avancement du Projet (fonctionnalité)
```
- ✅/🔄/📝 [Nom de la fonctionnalité]
```

## Chemins des documents principaux

- Avancement: `.documentation/projet/Avancement du Projet - Course Facile.md`
- Project Log: `.documentation/projet/Project Log - Course Facile.md`
- Erreurs: `.documentation/technique/Journal des Erreurs - Course Facile.md`
- SRS: `.documentation/technique/Software Requirements Specification Document - Course Facile.md`
- UI Design: `.documentation/technique/User Interface Design Document - Course Facile.md`
- Guide: `.documentation/utilisateur/Guide Utilisateur - Course Facile.md`
- Rétro-ingénierie: `.documentation/analyse/Rétro-ingénierie - Course Facile.md`

## Workflow simplifié

1. **Avant** une tâche: Identifier les documents à mettre à jour
2. **Pendant** la tâche: Documenter en parallèle du développement
3. **Après** la tâche: Vérifier que toute la documentation nécessaire est à jour

## Checklist rapide

- [ ] Avancement du Projet mis à jour
- [ ] Project Log mis à jour
- [ ] Documentation technique mise à jour (si applicable)
- [ ] Journal des Erreurs mis à jour (si applicable)
- [ ] Guide Utilisateur mis à jour (si applicable) 