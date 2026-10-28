# ==============================================================================
# Estágio 1: Instalação de Dependências (Cache Otimizado)
# ==============================================================================
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps --no-audit --no-fund

# ==============================================================================
# Estágio 2: Build de Produção
# ==============================================================================
FROM node:20-alpine AS builder
WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV GENERATE_SOURCEMAP=false

COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY public ./public
COPY src ./src

RUN npm run build

# ==============================================================================
# Estágio 3: Runner Leve de Produção
# ==============================================================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN npm install -g serve@14.2.3 && npm cache clean --force

COPY --from=builder /app/build ./build
COPY docker/scripts/start-app.sh /usr/local/bin/start-app.sh
RUN sed -i 's/\r$//' /usr/local/bin/start-app.sh && chmod +x /usr/local/bin/start-app.sh

EXPOSE 3000

CMD ["/usr/local/bin/start-app.sh"]
