import ArmillarySphere from '@/components/fx/ArmillarySphere';
import { CountdownBig } from '@/components/Countdown';
import { CtaVigente } from '@/components/Lotes';
import Reveal from '@/components/Reveal';

/**
 * BLOCO 10b — CTA FINAL.
 * Fecha com o argumento transversal do lançamento (o mesmo que ecoa do aulão
 * pro pitch) e cobra a decisão.
 */
export default function CtaFinal({ buildNow }: { buildNow: number }) {
  return (
    <section
      className="relative overflow-hidden border-t border-line px-5 py-24 text-center sm:px-6 sm:py-32"
      style={{
        background:
          'radial-gradient(110% 70% at 50% 100%, rgba(224,184,76,0.13) 0%, transparent 62%), #08080a',
      }}
    >
      <ArmillarySphere
        size={640}
        spin
        opacity={0.05}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[110vw]"
      />

      <div className="wrap-narrow relative z-[2]">
        <Reveal>
          <p
            className="mx-auto max-w-[24ch] text-balance font-[family-name:var(--font-serif)] italic text-ink"
            style={{ fontSize: 'clamp(24px,3.6vw,38px)', lineHeight: 1.3 }}
          >
            Sem saber por que a astrologia funciona, ninguém é astrólogo.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <p className="mx-auto mt-6 max-w-[52ch] text-balance leading-relaxed text-muted">
            E quem sabe já está na frente de muito “astrólogo” que cobra consulta.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-16">
            <CountdownBig buildNow={buildNow} />
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-14">
            <CtaVigente buildNow={buildNow} big />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
