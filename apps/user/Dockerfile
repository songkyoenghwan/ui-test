# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS base

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

FROM base AS build

WORKDIR /app
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build?schema=public

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY nest-cli.json prisma.config.ts tsconfig.json tsconfig.build.json ./
COPY prisma ./prisma
COPY scripts ./scripts
COPY src ./src

RUN npm run build && npm prune --omit=dev

FROM base AS runtime

WORKDIR /app
ENV NODE_ENV=production \
    PORT=3011

COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist

USER node
EXPOSE 3011

HEALTHCHECK --interval=10s --timeout=3s --start-period=20s --retries=6 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3011/health/live').then(r => { if (!r.ok) process.exit(1) }).catch(() => process.exit(1))"]

CMD ["node", "dist/main.js"]
