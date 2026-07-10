/* =========================================================================
   CONFIG CENTRAL — MENTORIA "LUX ET DIRECTIO"
   Todos os dados pendentes ficam aqui, marcados com PENDENTE.
   Troque os valores aqui quando receber os links/textos reais — nada de
   sair caçando pela página.
   ========================================================================= */

/* -------------------------------------------------------------------------
   LOTES — o coração da página.
   3 lotes com virada automática por data/hora (America/Sao_Paulo, GMT-3).
   `fim` é o instante EXCLUSIVO em que o lote morre (= início do próximo).
   Fora das 3 janelas → carrinho fechado.
   ------------------------------------------------------------------------- */
export interface Lote {
  /** 1 | 2 | 3 */
  n: number;
  nome: string;
  /** Instante em que o lote passa a valer (ISO com offset -03:00). */
  inicio: string;
  /** Instante em que o lote deixa de valer (ISO com offset -03:00). */
  fim: string;
  /** Preço à vista, em reais. */
  preco: number;
  /**
   * Link de checkout InfinitePay deste lote.
   * PENDENTE — enquanto for '#', o botão fica desabilitado visualmente.
   */
  checkout: string;
}

export const LOTES: readonly Lote[] = [
  {
    n: 1,
    nome: 'Primeiro lote',
    inicio: '2026-07-09T00:00:00-03:00',
    fim: '2026-07-10T00:00:00-03:00', // vale até 09/07 23:59:59
    preco: 1200,
    checkout: '#', // PENDENTE: link InfinitePay do lote 1
  },
  {
    n: 2,
    nome: 'Segundo lote',
    inicio: '2026-07-10T00:00:00-03:00',
    fim: '2026-07-11T00:00:00-03:00', // vale até 10/07 23:59:59
    preco: 1500,
    checkout: '#', // PENDENTE: link InfinitePay do lote 2
  },
  {
    n: 3,
    nome: 'Terceiro lote',
    inicio: '2026-07-11T00:00:00-03:00',
    fim: '2026-07-12T00:00:00-03:00', // vale até 11/07 23:59:59
    preco: 2000,
    checkout: '#', // PENDENTE: link InfinitePay do lote 3
  },
] as const;

/** Nº de parcelas exibidas. Divisão simples — NUNCA mencionar juros. */
export const PARCELAS = 12;

/** Ancoragem verdadeira: o preço do formato individual. */
export const PRECO_INDIVIDUAL = 3000;

/**
 * Modo de teste da virada de lote. Preencha com um ISO pra "congelar" o relógio
 * da página e conferir cada estado sem esperar a meia-noite. Ex.:
 *   '2026-07-10T10:00:00-03:00'  → lote 2 vigente
 *   '2026-07-12T00:00:01-03:00'  → carrinho fechado
 * Deixe null em produção.
 */
export const DATA_SIMULADA: string | null = null;

/* -------------------------------------------------------------------------
   LINKS PENDENTES — o Gustavo passa os reais.
   Enquanto forem '#', os CTAs ficam desabilitados visualmente.
   ------------------------------------------------------------------------- */
export const LINKS = {
  /** Grupo/contato de WhatsApp pra dúvidas e pro carrinho fechado. */
  whatsapp: '#', // PENDENTE
} as const;

/** Helper: o link já está preenchido (diferente do placeholder)? */
export const isLinkReady = (href: string) => href !== '#' && href.trim() !== '';

/** Âncora interna: todos os CTAs da página rolam pra seção da oferta. */
export const ANCORA_OFERTA = '#oferta';

/* -------------------------------------------------------------------------
   A GRADE — 17 encontros ao vivo, em 3 etapas.
   ------------------------------------------------------------------------- */
export const GRADE: { etapa: string; n: number; encontros: readonly string[] }[] = [
  {
    etapa: 'Formação Inicial',
    n: 5,
    encontros: [
      'Introdução e Cosmologia',
      'Casas',
      'Signos',
      'Planetas',
      'Aspectos e nodos lunares (translação e coleta de luz)',
    ],
  },
  {
    etapa: 'Formação em Horária',
    n: 4,
    encontros: [
      'Técnicas — parte 1',
      'Técnicas — parte 2',
      'Exercícios: respostas 1',
      'Exercícios: respostas 2',
    ],
  },
  {
    etapa: 'Especialização Natal',
    n: 8,
    encontros: [
      'Estrelas fixas',
      'Partes árabes',
      'Temperamento',
      'Motivação primária',
      'Leitura de Mapa 1 — ao vivo, com o Yuri',
      'Leitura de Mapa 2 — ao vivo, com o Yuri',
      'Leitura de Mapa 3 — ao vivo, com o Yuri',
      'Leitura de Mapa 4 — ao vivo, com o Yuri',
    ],
  },
];

export const TOTAL_ENCONTROS = GRADE.reduce((s, e) => s + e.n, 0); // 17

/* -------------------------------------------------------------------------
   BÔNUS — 7 slots. O Gustavo confirma/corta com o Yuri.
   `ativo: false` some da página sem apagar o registro.
   ------------------------------------------------------------------------- */
export const BONUS: {
  titulo: string;
  desc: string;
  ativo: boolean;
  destaque?: boolean;
}[] = [
  { titulo: 'Técnica de Revolução Solar', desc: 'PENDENTE: descrição', ativo: true },
  { titulo: 'Técnica de Revolução Lunar', desc: 'PENDENTE: descrição', ativo: true },
  { titulo: 'Sinastria', desc: 'PENDENTE: descrição', ativo: true },
  { titulo: 'Como Identificar e Curar Vícios', desc: 'PENDENTE: descrição', ativo: true },
  { titulo: 'Viver de Astrologia', desc: 'Aula com o Gustavo. PENDENTE: descrição', ativo: true },
  {
    titulo: 'Livro: Igreja Católica e Astrologia Tradicional',
    desc: 'O livro do Yuri — o que a Igreja realmente ensina sobre a arte. PENDENTE: descrição',
    ativo: true,
  },
  {
    titulo: 'Acesso prioritário ao Placidus',
    desc: 'O site de astrologia do Yuri. Você entra numa rodada privada, antes do público. PENDENTE: descrição',
    ativo: true,
    destaque: true,
  },
];

/* -------------------------------------------------------------------------
   GARANTIA — redutor de risco. [opcional — Gustavo decide]
   ------------------------------------------------------------------------- */
export const GARANTIA_ATIVA = true;
export const GARANTIA_DIAS = 7;

/* -------------------------------------------------------------------------
   PROVA — depoimentos da 1ª turma. PENDENTE: coletar.
   ------------------------------------------------------------------------- */
export const TURMA_1_ALUNOS = 12;
export const DEPOIMENTOS: { nome: string; texto: string }[] = [
  // PENDENTE: colar depoimentos reais da 1ª turma aqui.
];

/* -------------------------------------------------------------------------
   FAQ — PENDENTE: respostas finais do Gustavo/Yuri.
   ------------------------------------------------------------------------- */
export const FAQ: { p: string; r: string }[] = [
  {
    p: 'Sou iniciante total. Consigo acompanhar?',
    r: 'PENDENTE: resposta. (Estrutura: sim — a formação começa do zero, na Formação Inicial, e a ordem foi validada pela 1ª turma.)',
  },
  {
    p: 'Não posso assistir ao vivo. E agora?',
    r: 'PENDENTE: resposta. (Confirmar: os encontros ficam gravados? por quanto tempo? o exercício pode ser entregue depois?)',
  },
  {
    p: 'Quanto tempo por semana eu preciso dedicar?',
    r: 'PENDENTE: resposta. (Encontro + exercício da semana.)',
  },
  {
    p: 'Como funciona o parcelamento?',
    r: 'PENDENTE: resposta. (Checkout InfinitePay, cartão ou Pix.)',
  },
  {
    p: 'Quando começa a turma?',
    r: 'PENDENTE: data de início da turma 2.',
  },
];

/* -------------------------------------------------------------------------
   SEO / Open Graph
   ------------------------------------------------------------------------- */
export const SEO = {
  titulo: 'Lux et Directio — Mentoria de Astrologia com Yuri dos Anjos',
  descricao:
    'Formação completa de astrólogos: do zero à leitura profissional de mapa. 17 encontros ao vivo, em grupo, com cada exercício seu corrigido pelo Yuri. 2ª turma.',
  ogImage: '/mentoria/og-image.jpg', // PENDENTE: og:image final
} as const;
