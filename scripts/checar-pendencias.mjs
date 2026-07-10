/**
 * Guarda de deploy: falha o build se algum placeholder "PENDENTE" tiver
 * escapado pro HTML publicado.
 *
 * Roda depois do `next build` (ver `postbuild` no package.json). É a última
 * linha de defesa — a primeira é `semPendencia()`/`ehPendente()` em
 * src/lib/copy.ts, que impede a renderização.
 */
import { readFileSync } from 'node:fs';

const arquivo = 'out/index.html';
let html;
try {
  html = readFileSync(arquivo, 'utf8');
} catch {
  console.error(`\n✗ ${arquivo} não existe — o build gerou o export?\n`);
  process.exit(1);
}

const ocorrencias = html.match(/PENDENTE/gi) ?? [];

if (ocorrencias.length > 0) {
  // mostra um pedaço em volta de cada ocorrência, pra achar rápido
  const trechos = [...html.matchAll(/PENDENTE[^"<\\]{0,80}/gi)]
    .slice(0, 12)
    .map((m) => `    • ${m[0].trim()}`);

  console.error(
    `\n✗ ${ocorrencias.length} placeholder(s) "PENDENTE" no HTML publicado.\n` +
      `  Isso apareceria pro comprador. Preencha em src/config/site.ts:\n\n` +
      trechos.join('\n') +
      `\n\n  (Textos marcados com PENDENTE são escondidos por src/lib/copy.ts —\n` +
      `   se um escapou, é porque o componente não passou pelo filtro.)\n`,
  );
  process.exit(1);
}

console.log('✓ nenhum placeholder PENDENTE no HTML publicado');
