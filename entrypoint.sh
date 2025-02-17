#!/bin/sh
# Read Docker secret into an environment variable
export DATABASE_URL=$(cat /run/secrets/database_url)

# Set Prisma schema path explicitly
export PRISMA_SCHEMA_PATH="/app/prisma/schema.prisma"

# Run Prisma migrations (if needed)
npx prisma migrate deploy --schema="$PRISMA_SCHEMA_PATH"

# Start the NestJS server
exec node dist/apps/backend/main.js
