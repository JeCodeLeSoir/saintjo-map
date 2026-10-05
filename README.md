# SaintJo-Map — version GitHub Pages

Cette édition est entièrement statique : aucun serveur Node.js ni backend n'est nécessaire.

## Publication

1. Copier le contenu de ce dossier à la racine d'un dépôt GitHub, ou dans son dossier `docs`.
2. Dans **Settings → Pages**, sélectionner **Deploy from a branch**.
3. Choisir la branche et le dossier contenant ces fichiers.

Tous les chemins sont relatifs : le site fonctionne aussi bien sur `utilisateur.github.io` que dans un sous-chemin comme `utilisateur.github.io/saintjo-map/`.

## Données et cache

- `data/site-data.json` contient l'annuaire généré par la version locale.
- La recherche est effectuée directement dans le navigateur.
- IndexedDB conserve la dernière copie exploitable des données.
- Le service worker met en cache l'interface, les données et la carte pour les visites suivantes.
- Une mise à jour du dépôt remplace les fichiers statiques lors de la prochaine connexion.

Depuis le projet principal, la commande `npm run pages:data` recopie les données les plus récentes dans ce dossier avant une nouvelle publication.
