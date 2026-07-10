import { CountdownBig } from '@/components/Countdown';
import Lotes from '@/components/Lotes';
import Reveal from '@/components/Reveal';
import { brl } from '@/lib/lotes';
import { GARANTIA_ATIVA, GARANTIA_DIAS, PRECO_INDIVIDUAL } from '@/config/site';

/**
 * BLOCO 9 — OFERTA + URGÊNCIA.
 * A `<section id="oferta">` é o destino de todos os CTAs e a referência da
 * barra fixa de conversão — não renomear o id.
 */
export default function Oferta({ buildNow }: { buildNow: number }) {
  return (
    <section
      id="oferta"
      className="section relative border-t border-line"
      style={{
        background:
          'radial-gradient(100% 60% at 50% 0%, rgba(224,184,76,0.07) 0%, transparent 60%)',
      }}
    >
      <div className="wrap">
        <div className="mx-auto max-w-[var(--container-editorial)] text-center">
          <Reveal>
            <span className="eyebrow eyebrow-gold">A oferta</span>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-6 text-balance" style={{ fontSize: 'clamp(28px,4.6vw,46px)' }}>
              Individualmente, essa mentoria custa R${brl(PRECO_INDIVIDUAL)} —{' '}
              <span className="italic text-gold-grad">é o preço real, hoje.</span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mx-auto mt-6 max-w-[52ch] text-[17px] leading-relaxed text-muted">
              O formato em grupo é o que permite esse preço. Ele sobe a cada dia, em três lotes —
              e depois do terceiro, a mentoria volta a existir só no individual.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-14">
            <CountdownBig buildNow={buildNow} />
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-16">
            <Lotes buildNow={buildNow} />
          </div>
        </Reveal>

        {GARANTIA_ATIVA && (
          <Reveal delay={320}>
            <div className="mx-auto mt-12 flex max-w-[52ch] items-start gap-4 rounded-2xl border border-line bg-surface-2 p-6">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="mt-0.5 h-6 w-6 shrink-0 text-gold"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-clinical">
                  Garantia de {GARANTIA_DIAS} dias
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  Entrou, não era pra você? Peça o dinheiro de volta em até {GARANTIA_DIAS} dias.
                  É o que o Código de Defesa do Consumidor garante — risco zero, por lei.
                </p>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
