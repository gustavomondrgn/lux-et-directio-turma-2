# ============================================================================
#  LUX ET DIRECTIO — build estático (Next export) servido por nginx
#
#  ⚠️ O site é publicado em yuridosanjos.com.br/mentoria, mas o nginx serve
#  na RAIZ. Não é engano: a Coolify põe um middleware `stripprefix` no Traefik
#  que remove `/mentoria` antes de encaminhar pro container. Ou seja, o nginx
#  recebe `/`, `/_next/...`, `/video/...` — sem o prefixo.
#
#  O `basePath: '/mentoria'` do Next continua necessário: é ele que faz o HTML
#  apontar os assets pra /mentoria/..., que o browser pede e o Traefik descasca.
#
#  (O app irmão `pqaf` foi criado antes de a Coolify passar a ligar o
#  stripprefix por padrão — por isso o Dockerfile dele copia pra /pqaf.)
# ============================================================================

# ---- Stage 1: build do site estático ----
FROM node:22-alpine AS build
WORKDIR /app

# Instala dependências de forma reprodutível
COPY package.json package-lock.json ./
RUN npm ci

# Build (gera ./out por causa de output:'export' no next.config.mjs).
# O `postbuild` falha aqui se algum placeholder PENDENTE escapou pro HTML.
COPY . .
RUN npm run build

# ---- Stage 2: nginx servindo os estáticos ----
FROM nginx:1.27-alpine AS runner

# Limpa o html default e publica o site na raiz (ver nota do stripprefix acima)
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
