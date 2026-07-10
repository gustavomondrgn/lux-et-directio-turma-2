'use client';

import Emblema from '@/components/fx/Emblema';
import { cn } from '@/lib/cn';
import { useRelogio } from '@/hooks/useRelogio';
import { brl, estadoEm, exibeParcelado, parcela, parcelado, ultimoDiaLabel, type StatusLote } from '@/lib/lotes';
import { isLinkReady, LINKS, PARCELAS, PRECO_INDIVIDUAL, type Lote } from '@/config/site';
import CtaButton from './CtaButton';

/* ------------------------------------------------------------------ CARD -- */
function LoteCard({ lote, status }: { lote: Lote; status: StatusLote }) {
  const vigente = status === 'vigente';
  const encerrado = status === 'encerrado';
  const linkPronto = isLinkReady(lote.checkout);

  return (
    <div
      className={cn(
        'flex flex-col p-6 transition-opacity sm:p-7',
        vigente ? 'plate plate-gold plate-live ticks' : 'plate',
        encerrado && 'opacity-45',
      )}
    >
      {vigente && (
        <span className="selo-pulse absolute -top-3.5 left-1/2 z-[1] -translate-x-1/2 whitespace-nowrap rounded-full bg-[linear-gradient(180deg,#edca6c,#cd9a30)] px-4 py-1 font-[family-name:var(--font-mono)] text-[0.68rem] font-semibold uppercase tracking-wider text-[#0a0a0a]">
          Lote atual
        </span>
      )}

      {/* carimbo de encerrado sobre a placa */}
      {encerrado && <span className="stamp">Encerrado</span>}

      <div className="flex items-baseline justify-between gap-3">
        <span className={cn('latin text-[0.7rem]', vigente ? 'text-gold' : 'text-steel')}>
          {lote.nome}
        </span>
        <span className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-wider text-muted-3">
          {encerrado ? 'encerrado' : `até ${ultimoDiaLabel(lote)}`}
        </span>
      </div>

      {/* ---------------------------------------------------------------------
          A REGRA: só o lote VIGENTE mostra o parcelado em destaque.
          Encerrado e futuro mostram o valor cheio, à vista.
          --------------------------------------------------------------------- */}
      {exibeParcelado(status) ? (
        <>
          <p className="mt-7 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-muted">
            {PARCELAS}x de
          </p>
          <div className="mt-1 flex items-end gap-1">
            <span className="mb-1 text-sm font-medium text-muted">R$</span>
            <span
              className="text-gold-grad font-[family-name:var(--font-serif)] font-medium leading-none"
              style={{ fontSize: 'clamp(56px,9vw,76px)' }}
            >
              {brl(parcela(lote.preco))}
            </span>
          </div>
          <p className="mt-3 text-sm text-muted">ou R${brl(lote.preco)} à vista</p>
        </>
      ) : (
        <>
          <div className="mt-7 flex items-end gap-1">
            <span className="mb-1 text-sm font-medium text-muted">R$</span>
            <span
              className={cn(
                'font-[family-name:var(--font-serif)] font-medium leading-none',
                encerrado ? 'text-muted line-through decoration-danger/60' : 'text-clinical',
              )}
              style={{ fontSize: 'clamp(46px,7.5vw,62px)' }}
            >
              {brl(lote.preco)}
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-3">
            {encerrado ? 'Esse lote já fechou.' : 'Valor cheio, à vista.'}
          </p>
        </>
      )}

      <div className="mt-auto pt-8">
        {vigente ? (
          <>
            <CtaButton
              href={linkPronto ? lote.checkout : '#'}
              newTab={linkPronto}
              fullWidth
              className={cn(!linkPronto && 'pointer-events-none opacity-50')}
            >
              Quero minha vaga
            </CtaButton>
            <p className="mt-3 text-center font-[family-name:var(--font-mono)] text-[0.65rem] text-muted-3">
              {linkPronto
                ? 'Você fala direto com a equipe no WhatsApp.'
                : 'PENDENTE: link do lote.'}
            </p>
          </>
        ) : (
          <p className="border-t border-line pt-5 text-center font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.2em] text-muted-3">
            {encerrado ? 'Indisponível' : 'Ainda não liberado'}
          </p>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- FECHADO -- */
function CarrinhoFechado() {
  const zap = isLinkReady(LINKS.whatsapp);
  return (
    <div className="plate ticks mx-auto max-w-[54ch] p-8 text-center sm:p-12">
      <span className="mx-auto flex justify-center">
        <Emblema size={52} opacity={0.85} />
      </span>
      <span className="latin mt-6 block text-[0.72rem] text-steel">Turma 2</span>
      <h3
        className="mt-4"
        style={{ fontSize: 'clamp(28px,4.5vw,42px)', fontWeight: 500 }}
      >
        As inscrições <span className="italic text-gold-grad">encerraram.</span>
      </h3>
      <p className="mt-5 leading-relaxed text-muted">
        Os três lotes fecharam e a turma está completa. A partir de agora, a mentoria volta
        a existir apenas no formato individual — a R${brl(PRECO_INDIVIDUAL)}.
      </p>
      {zap && (
        <div className="mt-8">
          <CtaButton href={LINKS.whatsapp} variant="outline" newTab>
            Falar sobre o individual
          </CtaButton>
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- GRID --- */
export default function Lotes({ buildNow }: { buildNow: number }) {
  const now = useRelogio(buildNow, 30_000); // não precisa de segundo aqui: quem tiquetaqueia é o countdown
  const { fase, lotes } = estadoEm(now);

  if (fase === 'fechado') return <CarrinhoFechado />;

  return (
    <div className="grid gap-6 pt-4 sm:gap-7 lg:grid-cols-3" suppressHydrationWarning>
      {lotes.map(({ lote, status }) => (
        <LoteCard key={lote.n} lote={lote} status={status} />
      ))}
    </div>
  );
}

/* ------------------------------------------------- PREÇO DO LOTE VIGENTE -- */
/** Placa de preço do Hero: âncora riscada → parcelado do lote vigente. */
export function PrecoVigente({ buildNow }: { buildNow: number }) {
  const now = useRelogio(buildNow, 30_000);
  const { vigente } = estadoEm(now);

  if (!vigente) return null;

  return (
    <div
      className="plate ticks inline-flex flex-col items-center gap-0.5 px-8 py-[clamp(10px,1.8vh,20px)] sm:px-11"
      suppressHydrationWarning
    >
      <span className="flex items-baseline gap-3">
        <span className="text-sm text-muted line-through decoration-goldenrod/70 sm:text-base">
          R${brl(PRECO_INDIVIDUAL)}
        </span>
        <span className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.24em] text-muted-3">
          hoje
        </span>
      </span>
      <span
        className="text-gold-grad font-[family-name:var(--font-serif)] font-medium leading-tight"
        style={{ fontSize: 'min(clamp(26px,3.8vw,38px), 4.4vh)' }}
      >
        {parcelado(vigente.preco)}
      </span>
    </div>
  );
}

/** CTA que aponta direto pro checkout do lote vigente (Hero e CTA final). */
export function CtaVigente({
  buildNow,
  big = false,
  label = 'Quero minha vaga',
}: {
  buildNow: number;
  big?: boolean;
  label?: string;
}) {
  const now = useRelogio(buildNow, 30_000);
  const { vigente } = estadoEm(now);

  if (!vigente) return null;
  const linkPronto = isLinkReady(vigente.checkout);

  return (
    <CtaButton
      href={linkPronto ? vigente.checkout : '#'}
      newTab={linkPronto}
      big={big}
      sub={parcelado(vigente.preco)}
      className={cn(!linkPronto && 'pointer-events-none opacity-50')}
    >
      {label}
    </CtaButton>
  );
}
