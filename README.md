# Actumatic

Website to show last headlines of most famous news tech websites.

## Setup

- Install Postgresql and Node.
- Create .env file based on .env.exemple and fill DATABASE_URL.
- Install dependancies :

```sh
npm install
```

- Create database and run migration :

```sh
# Create database
createdb actumatic

# Run prisma migrations
npx prisma migrate dev
```

## Run tasks

To run the dev server, use:

```sh
npm run backend:start
npm run frontend:start
```

To run both front & back in same command with :

```sh
npm run start
```

To create a production bundle of frontend:

```sh
npx nx build frontend
```

To see all available targets to run for a project, run:

```sh
npx nx show project frontend
```
