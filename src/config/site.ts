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
   * Valor da PARCELA mensal (12x), em reais.
   *
   * ⚠️ NÃO é `preco / 12`. O lote 1 custa R$1.200 à vista e parcela em
   * 12x de R$120 — quem parcela paga mais. Por isso o valor é explícito, e
   * nunca calculado: uma divisão simples exibiria R$100 e prometeria um preço
   * que o checkout não pratica.
   *
   * `null` = a parcela deste lote ainda não foi definida. Nesse caso o lote,
   * mesmo vigente, exibe só o valor à vista — em vez de inventar um número.
   */
  parcela: number | null;
  /**
   * Link de WhatsApp deste lote (wa.me com mensagem pré-preenchida).
   * NÃO é checkout: o lead cai na conversa e a venda é fechada na mão.
   * A mensagem já identifica de qual lote a pessoa veio.
   * Enquanto for '#', o botão fica desabilitado visualmente.
   */
  checkout: string;
}

const WA = 'https://wa.me/556299623961?text=';
/** Mensagem pré-preenchida do lead. Encode já aplicado pelo helper. */
const msgLote = (n: string) =>
  WA +
  encodeURIComponent(
    `Eu quero entrar na Turma 02 da Mentoria de Formação para Astrólogos no Lote ${n}`,
  );

export const LOTES: readonly Lote[] = [
  {
    n: 1,
    nome: 'Primeiro lote',
    inicio: '2026-07-09T00:00:00-03:00',
    fim: '2026-07-10T00:00:00-03:00', // vale até 09/07 23:59:59
    preco: 1200,
    parcela: 120,
    checkout: msgLote('01'),
  },
  {
    n: 2,
    nome: 'Segundo lote',
    inicio: '2026-07-10T00:00:00-03:00',
    fim: '2026-07-14T00:00:00-03:00', // vale até 13/07 23:59:59
    preco: 1500,
    parcela: 150,
    checkout: msgLote('02'),
  },
  {
    n: 3,
    nome: 'Terceiro lote',
    inicio: '2026-07-14T00:00:00-03:00',
    fim: '2026-07-15T12:00:00-03:00', // encerra 15/07 ao meio-dia — depois o carrinho fecha (não há lote mais caro)
    preco: 2000,
    parcela: 200,
    checkout: msgLote('03'),
  },
] as const;

/** Nº de parcelas exibidas. NUNCA mencionar juros — só o valor da parcela. */
export const PARCELAS = 12;

/**
 * Parcelamento no PIX — a forma de pagamento liberada na última chamada.
 *
 * Como a parcela do cartão, o valor é EXPLÍCITO, nunca `preco / 8`: são
 * "8x de R$250 no Pix" (= R$2.000), e é isso que o checkout pratica.
 */
export const PIX_PARCELAS = 8;
export const PIX_PARCELA = 250;

/** Âncora máxima: quanto custa a mentoria no formato individual. */
export const PRECO_INDIVIDUAL = 5500;

/** Preço "cheio" do formato em grupo — a segunda âncora, antes dos lotes. */
export const PRECO_GRUPO = 3000;

/**
 * Modo de teste da virada de lote. Preencha com um ISO pra "congelar" o relógio
 * da página e conferir cada estado sem esperar a meia-noite. Ex.:
 *   '2026-07-13T10:00:00-03:00'  → lote 2 vigente (último dia)
 *   '2026-07-14T10:00:00-03:00'  → lote 3 vigente
 *   '2026-07-15T12:00:01-03:00'  → carrinho fechado (passou do meio-dia do 15)
 * Deixe null em produção.
 */
export const DATA_SIMULADA: string | null = null;

/* -------------------------------------------------------------------------
   LINKS. Enquanto forem '#', os CTAs ficam desabilitados visualmente.
   ------------------------------------------------------------------------- */
export const LINKS = {
  /** WhatsApp do carrinho fechado — quem chega tarde e quer o individual. */
  whatsapp:
    WA + encodeURIComponent('Quero saber sobre a mentoria individual de astrologia'),
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
   BÔNUS — lista final (6). `ativo: false` some da página sem apagar o registro.
   `formato` vira uma etiqueta discreta (aço, não dourado — não compete com a
   oferta). O Placidus é o clímax: `destaque` + `badge` dourado.
   ------------------------------------------------------------------------- */
export const BONUS: {
  titulo: string;
  desc: string;
  ativo: boolean;
  /** Etiqueta fria (ex.: "aula gravada"). */
  formato?: string;
  destaque?: boolean;
  /** Badge dourado — só no bônus de destaque. */
  badge?: string;
}[] = [
  { titulo: 'Técnica de Revolução Solar', desc: '', ativo: true, formato: 'aula gravada' },
  { titulo: 'Técnica de Revolução Lunar', desc: '', ativo: true, formato: 'aula gravada' },
  { titulo: 'Sinastria', desc: '', ativo: true, formato: 'aula gravada' },
  { titulo: 'Como Identificar e Curar Vícios', desc: '', ativo: true, formato: 'aula gravada' },
  {
    titulo: 'Viver de Astrologia',
    desc: 'Com o Gustavo.',
    ativo: true,
    formato: 'aula gravada',
  },
  {
    titulo: 'Acesso prioritário ao Placidus',
    desc: 'O site de astrologia do Yuri. Você entra antes do público.',
    ativo: true,
    destaque: true,
    badge: 'Acesso antecipado · antes do público',
  },
];

/** Linha discreta no rodapé do bloco de bônus. */
export const BONUS_RODAPE = 'Acesso imediato e vitalício aos bônus gravados';

/* -------------------------------------------------------------------------
   PROVA — a 1ª turma.
   ------------------------------------------------------------------------- */
export const TURMA_1_ALUNOS = 12;

/**
 * O depoimento em vídeo (um só, paisagem). Os arquivos vivem em `public/video/`
 * e são servidos sob o basePath. WebM/VP9 é a fonte principal; o MP4 existe só
 * como rede de segurança pra Safari antigo.
 */
export const DEPOIMENTO_VIDEO = {
  webm: '/mentoria/video/depoimento-01.webm',
  mp4: '/mentoria/video/depoimento-01.mp4',
  poster: '/mentoria/video/depoimento-01-poster.webp',
  /** PENDENTE: nome do aluno, pra legenda sob o vídeo. */
  autor: '',
} as const;

/** Depoimentos em texto (opcional — hoje a prova é o vídeo acima). */
export const DEPOIMENTOS: { nome: string; texto: string }[] = [];

/* -------------------------------------------------------------------------
   FAQ — PENDENTE: respostas finais do Gustavo/Yuri.
   ------------------------------------------------------------------------- */
export const FAQ: { p: string; r: string }[] = [
  {
    p: 'Sou iniciante total. Consigo acompanhar?',
    r: 'Sim — a formação começa do zero, na Formação Inicial, e a ordem foi validada pela 1ª turma. Você sai dominando completamente a técnica horária e natal.',
  },
  {
    p: 'Não posso assistir ao vivo. E agora?',
    r: 'Ficará gravado na plataforma de forma vitalícia. Os exercícios podem ser enviados para o Yuri ou no grupo.',
  },
  {
    p: 'Quanto tempo por semana eu preciso dedicar?',
    r: 'O ideal seria participar do encontro semanal + fazer os exercícios.',
  },
  {
    p: 'Como funciona o parcelamento?',
    r: 'O pagamento será feito pela InfinitePay e é possível parcelar em até 12x pelo cartão de crédito.',
  },
  {
    p: 'Quando começa a turma?',
    r: 'Será comunicado no grupo, após o encerramento da oferta.',
  },
];

/* -------------------------------------------------------------------------
   SEO / Open Graph
   ------------------------------------------------------------------------- */
export const SEO = {
  titulo: 'Lux et Directio — Mentoria de Astrologia com Yuri dos Anjos',
  descricao:
    'Formação completa de astrólogos: do zero à leitura profissional de mapa. 17 encontros ao vivo, em grupo, com cada exercício seu corrigido pelo Yuri. 2ª turma.',
  /** 1200×630, a águia sobre o fundo escuro. Gerada de public/marca/. */
  ogImage: '/mentoria/og-image.jpg',
} as const;
