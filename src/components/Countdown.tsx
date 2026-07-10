'use client';

import { useEffect, useRef } from 'react';
import { useRelogio } from '@/hooks/useRelogio';
import { estadoEm, restanteAte, ultimoDiaLabel } from '@/lib/lotes';

const pad = (n: number) => String(n).padStart(2, '0');

/** Faltando menos de 6h pro fim do lote, o cronômetro fica vermelho. */
const URGENCIA_HORAS = 6;

function urgente(dias: number, horas: number): boolean {
  return dias === 0 && horas < URGENCIA_HORAS;
}

/* ---------------------------------------------------------------- BAR ---- */
/**
 * Faixa fixa no topo: estado do lote + barra de progresso de leitura.
 * Fica vermelha na reta final do lote vigente.
 */
export function CountdownBar({ buildNow }: { buildNow: number }) {
  const now = useRelogio(buildNow);
  const barRef = useRef<HTMLSpanElement>(null);
  const { fase, vigente, proximoMarco } = estadoEm(now);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? (window.scrollY / h) * 100 : 0;
        if (barRef.current) barRef.current.style.width = `${p}%`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  let texto: string;
  let urg = false;

  if (fase === 'fechado') {
    texto = 'Inscrições encerradas';
  } else if (fase === 'aguardando' || !vigente || !proximoMarco) {
    texto = 'As inscrições abrem em breve';
  } else {
    const t = restanteAte(proximoMarco, now);
    urg = urgente(t.dias, t.horas);
    const tempo = t.dias >= 1 ? `${t.dias}d ${t.horas}h` : `${t.horas}h ${pad(t.min)}min`;
    texto = urg
      ? `ÚLTIMA CHAMADA · o ${vigente.nome.toLowerCase()} vira em ${tempo}`
      : `${vigente.nome} · R$${vigente.preco.toLocaleString('pt-BR')} até ${ultimoDiaLabel(vigente)} · faltam ${tempo}`;
  }

  return (
    <div
      className={
        urg
          ? 'sticky top-0 z-50 border-b border-[rgba(224,35,31,.55)] bg-[rgba(30,6,6,.96)] sm:bg-[rgba(30,6,6,.8)] sm:backdrop-blur-md'
          : 'sticky top-0 z-50 border-b border-[rgba(107,82,18,.5)] bg-[rgba(8,8,10,.94)] sm:bg-[rgba(8,8,10,.74)] sm:backdrop-blur-md'
      }
    >
      <p
        className={
          'wrap flex items-center justify-center gap-2 overflow-hidden py-2.5 text-center font-[family-name:var(--font-mono)] tracking-wide sm:text-xs ' +
          (urg
            ? 'text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[#ffe0dc] sm:text-[0.72rem]'
            : 'text-[0.66rem] text-clinical sm:text-[0.72rem]')
        }
        suppressHydrationWarning
      >
        {urg && (
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-danger"
            style={{ animation: 'pq-pulse 1.2s ease-in-out infinite' }}
          />
        )}
        {texto}
      </p>
      <span
        ref={barRef}
        aria-hidden
        className={'absolute bottom-0 left-0 block h-0.5 ' + (urg ? 'bg-danger' : 'bg-gold')}
        style={{ width: '0%' }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------- BIG ---- */
function Cell({
  valor,
  rotulo,
  urg,
  compact,
}: {
  valor: string;
  rotulo: string;
  urg: boolean;
  compact: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={
          (urg ? 'text-danger-grad' : 'text-gold-grad') +
          ' font-[family-name:var(--font-mono)] font-semibold leading-none tabular-nums'
        }
        style={{ fontSize: compact ? 'clamp(30px,7.5vw,52px)' : 'clamp(40px,11vw,86px)' }}
      >
        {valor}
      </span>
      <span className="eyebrow mt-2 text-[0.6rem] sm:text-[0.7rem]">{rotulo}</span>
    </div>
  );
}

/**
 * Cronômetro grande até o fim do lote vigente (Hero e seção da oferta).
 * `compact` reduz a escala pro hero caber numa dobra. Quando o carrinho
 * fecha, some — quem cuida do estado "fechado" é o componente de lotes.
 */
export function CountdownBig({ buildNow, compact = false }: { buildNow: number; compact?: boolean }) {
  const now = useRelogio(buildNow);
  const { fase, proximoMarco } = estadoEm(now);

  if (fase === 'fechado' || !proximoMarco) return null;

  const t = restanteAte(proximoMarco, now);
  const urg = fase === 'aberto' && urgente(t.dias, t.horas);

  const Sep = () => (
    <span
      className={
        'font-[family-name:var(--font-mono)] font-semibold ' +
        (urg ? 'text-danger/50' : 'text-goldenrod/50')
      }
      style={{ fontSize: compact ? 'clamp(22px,5vw,38px)' : 'clamp(28px,7vw,64px)' }}
    >
      :
    </span>
  );

  return (
    <div className="relative" suppressHydrationWarning>
      {urg && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 blur-2xl"
          style={{ background: 'radial-gradient(60% 80% at 50% 50%, rgba(224,35,31,.28), transparent 70%)' }}
        />
      )}
      <div
        className={
          'flex flex-wrap items-start justify-center gap-y-4 ' +
          (compact ? 'gap-x-2.5 sm:gap-x-4' : 'gap-x-3 sm:gap-x-5')
        }
      >
        <Cell valor={String(t.dias)} rotulo="dias" urg={urg} compact={compact} />
        <Sep />
        <Cell valor={pad(t.horas)} rotulo="horas" urg={urg} compact={compact} />
        <Sep />
        <Cell valor={pad(t.min)} rotulo="min" urg={urg} compact={compact} />
        <Sep />
        <Cell valor={pad(t.seg)} rotulo="seg" urg={urg} compact={compact} />
      </div>
      <p className={'eyebrow text-center text-[0.62rem] sm:text-[0.7rem] ' + (compact ? 'mt-4' : 'mt-6')}>
        {fase === 'aberto' ? 'para o preço subir' : 'para as inscrições abrirem'}
      </p>
    </div>
  );
}
