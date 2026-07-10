# 00 — ROADMAP DE EXECUÇÃO

> Trabalhe etapa por etapa, commitando e subindo a cada etapa. Antes de começar: enumere as skills instaladas e selecione as relevantes; leia todos os arquivos deste pacote.

## FASE 0 — Setup
- [ ] Confirmar com o usuário: rota da página (sugestão: `yuridosanjos.com.br/mentoria` ou `/pqaf/mentoria`)
- [ ] Reusar o projeto/stack do PQAF (Astro 5 + Tailwind v4 + Coolify) e o design system existente
- [ ] Commit + deploy de teste

## FASE 1 — Componente de LOTES (o coração da página)
A lógica mais importante da página. Regras:
- [ ] 3 lotes com janelas por data/hora (horário de Brasília, GMT-3):
  - LOTE 1: até 2026-07-09 23:59:59 → R$1.200
  - LOTE 2: 2026-07-10 00:00 até 23:59:59 → R$1.500
  - LOTE 3: 2026-07-11 00:00 até 23:59:59 → R$2.000
  - Após: CARRINHO FECHADO (página vira "vagas encerradas" ou seção de fechamento)
- [ ] **REGRA DE EXIBIÇÃO DO PARCELAMENTO:** somente o lote VIGENTE exibe parcelado em destaque (12x de R$100 / R$125 / R$166 — divisão simples por 12, sem mencionar juros). Todos os outros lotes exibem VALOR CHEIO.
- [ ] Lotes passados: riscados/encerrados. Lotes futuros: valor cheio, sem botão.
- [ ] Botão de compra: apenas no lote vigente, apontando pro link InfinitePay do lote (placeholder — perguntar; pode ser 1 link por lote).
- [ ] Countdown pro fim do lote vigente (grande, visível).
- [ ] Virada automática à meia-noite (client-side por data; se possível, também no build/SSR pra não depender só de JS).

## FASE 2 — Página completa
- [ ] Construir os 10 blocos (copy em `02-pagina-vendas.md`), reaproveitando componentes do PQAF
- [ ] Hero com countdown + preço do lote vigente
- [ ] Grade dos 17 encontros como cards escaneáveis (3 colunas/etapas)
- [ ] Bloco de bônus com 7 slots (Placidus em destaque)
- [ ] Responsividade mobile-first
- [ ] Commit + deploy

## FASE 3 — Refino
- [ ] SEO básico + og:image
- [ ] Performance
- [ ] Validar links (perguntar ao usuário)
- [ ] Testar a virada de lote (simular datas)
- [ ] Commit + deploy final

## FASE 4 — Handoff Claude Design
- [ ] Ao concluir, gerar um prompt de handoff descrevendo a página pro Claude Design elevar o visual (mantendo estrutura e copy)

## LEMBRETES
- Copy é rascunho validado — Gustavo revisa à mão. Não reescrever.
- Mobile-first, página escaneável (o usuário é "psicopata por UX").
- Mesma identidade do PQAF (Lab × Cosmos / dourado × cinza / dark premium).
