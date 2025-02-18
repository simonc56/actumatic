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
RUN pnpm nx build backend --configuration=production
RUN pnpm nx build frontend --configuration=production

# -- Backend Stage --
FROM node:22-alpine AS backend
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/apps/backend/prisma /app/prisma
COPY --from=build /app/node_modules /app/node_modules
COPY package.json .
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# -- Frontend Stage --
FROM nginx:alpine-slim AS frontend
WORKDIR /usr/share/nginx/html

# Copy built frontend files
COPY --from=build /app/dist/apps/frontend ./
COPY nginx.conf /etc/nginx/conf.d/default.conf
  