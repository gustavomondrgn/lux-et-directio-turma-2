/* =========================================================================
   LÓGICA DE LOTES — funções puras, sem React e sem relógio próprio.
   Quem chama passa o `now` (ms). Isso é de propósito:

   - No BUILD (Server Component), `now` = instante do build → gera o HTML
     estático. É o que o crawler e o visitante sem JS enxergam.
   - No CLIENTE, o primeiro render usa o MESMO `now` do build (via prop), pra
     hidratação bater; logo em seguida um efeito troca pelo relógio real.
     É assim que o lote vira à meia-noite sem redeploy, mesmo com output:'export'
     (não existe servidor em runtime pra recalcular).
   ========================================================================= */

import { DATA_SIMULADA, LOTES, PARCELAS, type Lote } from '@/config/site';

/** Estado de um lote em relação ao instante consultado. */
export type StatusLote = 'encerrado' | 'vigente' | 'futuro';

/** Em que ponto do lançamento estamos. */
export type Fase =
  /** Antes da abertura do 1º lote (pré-lançamento). */
  | 'aguardando'
  /** Um dos 3 lotes está vigente — dá pra comprar. */
  | 'aberto'
  /** Passou do último lote. Carrinho fechado. */
  | 'fechado';

export interface EstadoLotes {
  fase: Fase;
  /** O lote que está vendendo agora (null em 'aguardando' e 'fechado'). */
  vigente: Lote | null;
  /** Instante do próximo evento (fim do lote vigente, ou abertura do 1º). */
  proximoMarco: number | null;
  /** Os 3 lotes, cada um com seu status naquele instante. */
  lotes: { lote: Lote; status: StatusLote }[];
}

const ms = (iso: string) => new Date(iso).getTime();

/**
 * Relógio da página. Respeita DATA_SIMULADA (config) pra testar a virada de
 * lote sem esperar a meia-noite.
 */
export function agora(): number {
  return DATA_SIMULADA ? ms(DATA_SIMULADA) : Date.now();
}

/** Fotografia do lançamento no instante `now`. */
export function estadoEm(now: number): EstadoLotes {
  const primeiro = LOTES[0];
  const ultimo = LOTES[LOTES.length - 1];

  const lotes = LOTES.map((lote) => {
    let status: StatusLote;
    if (now >= ms(lote.fim)) status = 'encerrado';
    else if (now >= ms(lote.inicio)) status = 'vigente';
    else status = 'futuro';
    return { lote, status };
  });

  if (now < ms(primeiro.inicio)) {
    return { fase: 'aguardando', vigente: null, proximoMarco: ms(primeiro.inicio), lotes };
  }
  if (now >= ms(ultimo.fim)) {
    return { fase: 'fechado', vigente: null, proximoMarco: null, lotes };
  }

  const vigente = lotes.find((l) => l.status === 'vigente')!.lote;
  return { fase: 'aberto', vigente, proximoMarco: ms(vigente.fim), lotes };
}

/** 1200 → "1.200" (padrão pt-BR, sem centavos). */
export function brl(n: number): string {
  return n.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
}

/**
 * "12x de R$120" — ou `null` se a parcela do lote ainda não foi definida.
 *
 * O valor vem do config, NUNCA de `preco / 12`. O parcelado é no cartão e
 * embute juros: o lote 1 é R$1.200 à vista e 12x de R$120. Calcular daria
 * R$100 e a página prometeria um preço que o checkout não pratica.
 */
export function parcelado(lote: Lote): string | null {
  return lote.parcela == null ? null : `${PARCELAS}x de R$${brl(lote.parcela)}`;
}

/* --------------------------------------------------------------------------
   REGRA DE EXIBIÇÃO DO PARCELAMENTO (a regra que o roadmap chama de crítica):
   SOMENTE o lote vigente exibe o parcelado em destaque. Todos os outros
   exibem o valor cheio, à vista. Um único ponto de decisão, usado por toda a
   página, pra não haver duas fontes de verdade.

   Se o lote vigente ainda não tem parcela definida, ele também cai no valor
   cheio — melhor exibir só o à vista do que inventar uma parcela.
   -------------------------------------------------------------------------- */
export function exibeParcelado(status: StatusLote, lote: Lote): boolean {
  return status === 'vigente' && lote.parcela != null;
}

/** Tempo restante até `alvo`, quebrado em unidades. */
export interface Restante {
  dias: number;
  horas: number;
  min: number;
  seg: number;
  acabou: boolean;
}

export function restanteAte(alvo: number, now: number): Restante {
  const diff = alvo - now;
  if (diff <= 0) return { dias: 0, horas: 0, min: 0, seg: 0, acabou: true };
  const s = Math.floor(diff / 1000);
  return {
    dias: Math.floor(s / 86400),
    horas: Math.floor((s % 86400) / 3600),
    min: Math.floor((s % 3600) / 60),
    seg: s % 60,
    acabou: false,
  };
}

/** "09/07" — rótulo curto do último dia do lote (o `fim` é exclusivo). */
export function ultimoDiaLabel(lote: Lote): string {
  const d = new Date(ms(lote.fim) - 1000);
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'America/Sao_Paulo',
  });
}
