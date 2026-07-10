# Lux et Directio — página de vendas (turma 2)

Página de **fechamento** da mentoria de formação em astrologia do Yuri dos Anjos.
Recebe tráfego quente do pitch feito ao vivo no aulão PQAF.

- **Rota:** `yuridosanjos.com.br/mentoria`
- **Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript
- **Build:** `output: 'export'` → site 100% estático em `out/`
- **Deploy:** Docker (nginx servindo `out/`) na Coolify
- **Design system:** "Lab × Cosmos", o mesmo do PQAF (dark premium, dourado × aço)

## Rodando local

```bash
npm install
npm run dev      # http://localhost:3000/mentoria
npm run build    # gera out/
```

> Node vem do `fnm`. Se `node` não estiver no PATH:
> `$env:Path = "C:\Users\PICHAU\AppData\Roaming\fnm\node-versions\v22.22.1\installation;$env:Path"`

## Onde mexer

Quase tudo o que muda vive em **`src/config/site.ts`** — lotes, preços, links de
checkout, bônus, FAQ, depoimentos, SEO. Não saia caçando pela página.

Tudo que ainda falta está marcado com `PENDENTE` nesse arquivo:

```bash
grep -rn "PENDENTE" src/
```

## Os lotes (o coração da página)

Três lotes com virada automática por data/hora (America/São\_Paulo):

| Lote | Janela | Preço | Parcelado |
|---|---|---|---|
| 1 | até 09/07 23:59:59 | R$1.200 | 12x de R$100 |
| 2 | 10/07, o dia todo | R$1.500 | 12x de R$125 |
| 3 | 11/07, o dia todo | R$2.000 | 12x de R$166 |
| — | 12/07 em diante | carrinho fechado | — |

**A regra:** só o lote **vigente** exibe o parcelado em destaque e tem botão de
compra. Os outros exibem o valor cheio — encerrados riscados, futuros sem botão.
A regra mora num único ponto (`exibeParcelado()` em `src/lib/lotes.ts`), pra não
existirem duas fontes de verdade.

### Como a virada funciona sem servidor

O site é estático (`output: 'export'`): **não existe servidor em runtime** pra
recalcular o lote à meia-noite. Então:

1. No **build**, o Server Component lê o relógio e passa `buildNow` pros
   componentes. É esse estado que vai pro HTML — o que crawler e visitante sem JS
   enxergam.
2. No **cliente**, o primeiro render usa o mesmo `buildNow` (hidratação bate), e
   um efeito troca imediatamente pelo relógio real. O lote se corrige em
   milissegundos, e quem deixou a aba aberta vê a virada acontecer ao vivo.

O nginx serve o HTML com `no-cache`, então um redeploy sempre chega.

### Testando a virada

Preencha `DATA_SIMULADA` em `src/config/site.ts` com um ISO pra congelar o
relógio da página e conferir cada estado. **Deixe `null` em produção.**

```ts
export const DATA_SIMULADA: string | null = '2026-07-10T10:00:00-03:00'; // lote 2
```

## Segredos

O token da Coolify fica em **`.env.local`** (no `.gitignore`, nunca sobe pro
GitHub). Modelo em `.env.example`. A página não lê nenhuma env em runtime.

## Contexto do lançamento

O briefing completo — oferta, copy bloco a bloco, dados pendentes — está em
[`docs/`](docs/).

> ⚠️ **A copy é rascunho validado.** Estrutura fechada; o acabamento é do Gustavo.
> Não reescrever por conta própria.
