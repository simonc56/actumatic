#!/bin/sh
# Read Docker secret into an environment variable
export DATABASE_URL=$(cat /run/secrets/database_url)

# Run Prisma migrations (if needed)
npx prisma migrate deploy

# Start the NestJS server
exec node dist/apps/backend/main.js
