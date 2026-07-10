import ArmillarySphere from '@/components/fx/ArmillarySphere';
import { CountdownBig } from '@/components/Countdown';
import { CtaVigente, PrecoVigente } from '@/components/Lotes';
import { TOTAL_ENCONTROS, TURMA_1_ALUNOS } from '@/config/site';

/**
 * BLOCO 1 — HERO.
 * Mesma linguagem do PQAF ("Lab × Cosmos"): full-bleed, esfera armilar girando
 * atrás, entrada escalonada com `.rise`.
 *
 * A `<section id="hero">` é referência da barra fixa de conversão — não renomear.
 */
export default function Hero({ buildNow }: { buildNow: number }) {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden px-5 py-20 text-center sm:px-6"
      style={{
        minHeight: '94vh',
        background:
          'radial-gradient(120% 80% at 50% -10%, rgba(224,184,76,0.16) 0%, rgba(201,150,46,0.05) 30%, transparent 62%), linear-gradient(180deg, #0b0a07 0%, #08080a 55%, #08080a 100%)',
      }}
    >
      <ArmillarySphere
        size={720}
        spin
        opacity={0.06}
        className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 max-w-[110vw]"
      />

      <div className="wrap-narrow relative z-[2] flex flex-col items-center">
        <div className="rise" style={{ animationDelay: '0.05s' }}>
          <span className="eyebrow eyebrow-gold">Mentoria Lux et Directio · 2ª turma</span>
        </div>

        <h1
          className="rise mt-6 text-balance"
          style={{ animationDelay: '0.2s', fontSize: 'clamp(30px, 5.2vw, 52px)', lineHeight: 1.08 }}
        >
          Torne-se um astrólogo completo — do zero à leitura profissional de mapa,{' '}
          <span className="italic text-gold-grad">
            com cada exercício seu corrigido pelo Yuri.
          </span>
        </h1>

        <p
          className="rise mx-auto mt-7 max-w-[60ch] text-balance text-[#c2c2c2]"
          style={{ animationDelay: '0.3s', fontSize: 'clamp(16px, 1.9vw, 20px)' }}
        >
          {TOTAL_ENCONTROS} encontros ao vivo · em grupo · Método Anti-Burro · 2ª turma (a 1ª
          está em andamento, com {TURMA_1_ALUNOS} alunos)
        </p>

        <div className="rise mt-9" style={{ animationDelay: '0.4s' }}>
          <PrecoVigente buildNow={buildNow} />
        </div>

        <div className="rise mt-10 w-full" style={{ animationDelay: '0.5s' }}>
          <CountdownBig buildNow={buildNow} />
        </div>

        <div className="rise mt-10" style={{ animationDelay: '0.6s' }}>
          <CtaVigente buildNow={buildNow} big />
        </div>

        <div
          className="rise mt-14 flex flex-col items-center gap-3"
          style={{ animationDelay: '0.7s' }}
          aria-hidden
        >
          <span className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.3em] text-muted-3">
            role para ler
          </span>
          <span
            className="w-px"
            style={{ height: '54px', background: 'linear-gradient(180deg, rgba(184,134,11,0.6), transparent)' }}
          />
        </div>
      </div>
    </section>
  );
}
