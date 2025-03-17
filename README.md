# 📰 Actumatic

### Aggrégateur d'actualités tech

Site web regroupant les articles des sites d'actualités tech francophones en temps réel.

🌱 Développé en clean architecture avec le gestionnaire de monorepo `nx`.

- Stack backend : Nest.js, Prisma, Jest

- Stack frontend : React, Redux Toolkit, Mantine, Vitest

## Setup

Installer Postgresql et Node.js (ou utiliser Docker, voir ci-dessous)

Créer le fichier `.env` à partir du `.env.exemple` et modifiez la variable `DATABASE_URL`

Installer les dépendances :

```sh
npm install
```

Créer la base de donnée et lancer la migration :

```sh
createdb actumatic
npx prisma migrate dev
```

## Lancement

Lancer le back et le front en mode dev :

```sh
npm run backend:start
npm run frontend:start
```

Pour build :

```sh
npm run backend:build
npm run frontend:build
```

## Docker

Préparer les fichiers secrets :

```sh
secrets/postgres_user      # nom d'utilisateur postgres
secrets/postgres_password  # mot de passe postgres
secrets/postgres_db        # nom de la base de données dédiée au projet
secrets/database_url       # url d'accès (idem .env)
```
Modifier si besoin les ports dans le `compose.yaml`

Puis lancer docker depuis le répertoire du projet :
```sh
docker compose up -d
```
