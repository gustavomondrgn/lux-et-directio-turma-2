import { CountdownBig } from '@/components/Countdown';
import Lotes from '@/components/Lotes';
import Reveal from '@/components/Reveal';
import { brl } from '@/lib/lotes';
import { PRECO_GRUPO, PRECO_INDIVIDUAL } from '@/config/site';

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
            <h2
              className="mt-6 text-balance"
              style={{ fontSize: 'clamp(29px,4.8vw,50px)', fontWeight: 500 }}
            >
              Individualmente, essa mentoria custa R${brl(PRECO_INDIVIDUAL)} —{' '}
              <span className="italic text-gold-grad">é o preço real, hoje.</span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mx-auto mt-6 max-w-[52ch] text-[17px] leading-relaxed text-muted">
              Em grupo, ela custa R${brl(PRECO_GRUPO)}. O formato é o que permite esse preço — e
              ele sobe a cada dia, em três lotes. Depois do terceiro, a mentoria volta a existir
              só no individual.
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
      </div>
    </section>
  );
}
