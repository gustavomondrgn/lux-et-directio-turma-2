/** @type {import('next').NextConfig} */

// Mesma infra do PQAF: a página é servida em yuridosanjos.com.br/mentoria
// (path, não subdomínio). basePath faz rotas, <Link> e assets apontarem
// para /mentoria/...
// output:'export' gera site 100% estático (out/), servido por nginx no Coolify.
//
// ⚠️ Consequência importante: NÃO existe servidor em runtime. A virada de lote
// à meia-noite é resolvida no cliente (ver src/lib/lotes.ts) — o HTML estático
// carrega o lote vigente no momento do BUILD e o JS corrige em milissegundos.
const nextConfig = {
  output: 'export',
  basePath: '/mentoria',
  trailingSlash: true,
  images: {
    // necessário no export estático (sem servidor de otimização de imagem)
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
