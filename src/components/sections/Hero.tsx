import ArmillarySphere from '@/components/fx/ArmillarySphere';
import Emblema from '@/components/fx/Emblema';
import Starfield from '@/components/fx/Starfield';
import { CountdownBig } from '@/components/Countdown';
import { CtaVigente, PrecoVigente } from '@/components/Lotes';
import { TOTAL_ENCONTROS, TURMA_1_ALUNOS } from '@/config/site';

/**
 * BLOCO 1 — HERO, tratado como FRONTISPÍCIO de atlas celeste:
 * selo → wordmark latina entre hairlines → título da obra (H1) → linha de
 * especificações em mono → placa de preço → cronômetro compacto → CTA.
 * O stack é comprimido de propósito: preço + CTA precisam caber na dobra.
 *
 * A `<section id="hero">` é referência da barra fixa de conversão — não renomear.
 */

/** Itens da sub (copy do briefing, quebrada pra linha de especificações). */
const SPECS = [
  `${TOTAL_ENCONTROS} encontros ao vivo`,
  'em grupo',
  'Método Anti-Burro',
  `2ª turma (a 1ª está em andamento, com ${TURMA_1_ALUNOS} alunos)`,
];

export default function Hero({ buildNow }: { buildNow: number }) {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden px-5 py-16 text-center sm:px-6"
      style={{
        minHeight: '94vh',
        background:
          'radial-gradient(120% 80% at 50% -10%, rgba(224,184,76,0.15) 0%, rgba(201,150,46,0.05) 30%, transparent 62%), linear-gradient(180deg, #0b0a07 0%, #08080a 55%, #08080a 100%)',
      }}
    >
      <Starfield className="opacity-70" />
      <ArmillarySphere
        size={720}
        spin
        opacity={0.07}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[115vw]"
      />

      <div className="relative z-[2] mx-auto flex w-full max-w-[880px] flex-col items-center">
        {/* Frontispício: selo + wordmark entre hairlines + kicker */}
        <div className="rise flex w-full flex-col items-center" style={{ animationDelay: '0.05s' }}>
          <Emblema size={54} />
          <div className="mt-5 flex w-full items-center justify-center gap-4 sm:gap-6">
            <span
              aria-hidden
              className="h-px w-10 sm:w-16"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(184,134,11,0.7))' }}
            />
            <span className="latin whitespace-nowrap text-[0.8rem] text-gold sm:text-[0.95rem]">
              Lux et Directio
            </span>
            <span
              aria-hidden
              className="h-px w-10 sm:w-16"
              style={{ background: 'linear-gradient(270deg, transparent, rgba(184,134,11,0.7))' }}
            />
          </div>
          <span className="eyebrow mt-2.5 text-[0.6rem] sm:text-[0.66rem]">
            Mentoria · 2ª turma
          </span>
        </div>

        {/* H1 — o título da obra */}
        <h1
          className="rise mt-7 text-balance"
          style={{
            animationDelay: '0.2s',
            fontSize: 'clamp(29px, 4.6vw, 50px)',
            lineHeight: 1.08,
            fontWeight: 500,
          }}
        >
          Torne-se um astrólogo completo — do zero à leitura profissional de mapa,{' '}
          <span className="italic text-gold-grad">
            com cada exercício seu corrigido pelo Yuri.
          </span>
        </h1>

        {/* Linha de especificações (a sub, em mono de catálogo) */}
        <p
          className="rise mx-auto mt-6 flex max-w-[70ch] flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-[family-name:var(--font-mono)] text-[0.66rem] tracking-[0.08em] text-muted sm:text-[0.72rem]"
          style={{ animationDelay: '0.32s' }}
        >
          {SPECS.map((s, i) => (
            <span key={s} className="inline-flex items-center gap-x-3">
              {i > 0 && (
                <span aria-hidden className="block h-1 w-1 rotate-45 bg-goldenrod/60" />
              )}
              {s}
            </span>
          ))}
        </p>

        {/* Placa de preço + cronômetro compacto + CTA */}
        <div className="rise mt-8" style={{ animationDelay: '0.42s' }}>
          <PrecoVigente buildNow={buildNow} />
        </div>

        <div className="rise mt-8 w-full" style={{ animationDelay: '0.52s' }}>
          <CountdownBig buildNow={buildNow} compact />
        </div>

        <div className="rise mt-8" style={{ animationDelay: '0.62s' }}>
          <CtaVigente buildNow={buildNow} big />
        </div>

        {/* Dica de scroll */}
        <div
          className="rise mt-12 flex flex-col items-center gap-2.5"
          style={{ animationDelay: '0.75s' }}
          aria-hidden
        >
          <span className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.3em] text-muted-3">
            role para ler
          </span>
          <span
            className="w-px"
            style={{
              height: '42px',
              background: 'linear-gradient(180deg, rgba(184,134,11,0.6), transparent)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
