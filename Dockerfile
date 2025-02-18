# -- Build Stage --
FROM node:22-alpine AS build
WORKDIR /app

# Enable corepack and install pnpm manually
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
# Generate Prisma Client before building the backend
RUN pnpm prisma generate
# Build the backend and frontend
RUN pnpm dlx nx build backend --configuration=production
RUN pnpm dlx nx build frontend --configuration=production

# -- Backend Stage --
FROM node:22-alpine AS backend
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
COPY --from=build /app/apps/backend/prisma ./prisma
COPY --from=build /app/dist ./dist
# Generate Prisma Client before building the backend
RUN pnpm prisma generate --schema=./prisma/schema.prisma
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# -- Frontend Stage --
FROM nginx:alpine-slim AS frontend
WORKDIR /usr/share/nginx/html

# Copy built frontend files
COPY --from=build /app/dist/apps/frontend ./
COPY nginx.conf /etc/nginx/conf.d/default.conf
  