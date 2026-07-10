# ============================================================================
#  LUX ET DIRECTIO — build estático (Next export) servido por nginx, sob /mentoria
#  Mesmo padrão do PQAF.
# ============================================================================

# ---- Stage 1: build do site estático ----
FROM node:22-alpine AS build
WORKDIR /app

# Instala dependências de forma reprodutível
COPY package.json package-lock.json ./
RUN npm ci

# Build (gera ./out por causa de output:'export' no next.config.mjs)
COPY . .
RUN npm run build

# ---- Stage 2: nginx servindo os estáticos ----
FROM nginx:1.27-alpine AS runner

# Limpa o html default e publica o site sob /mentoria
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/out /usr/share/nginx/html/mentoria
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/mentoria/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
