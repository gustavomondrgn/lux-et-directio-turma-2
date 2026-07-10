import Ornament from '@/components/fx/Ornament';
import Reveal from '@/components/Reveal';
import { GRADE, TOTAL_ENCONTROS } from '@/config/site';

/**
 * BLOCO 5 — A GRADE.
 * Os 17 encontros tratados como o ÍNDICE de um fólio: três placas (uma por
 * etapa), numeral romano fantasma, entradas com pontilhado de sumário
 * levando ao número do encontro. Bate o olho, entende a formação inteira.
 */
const ROMANOS = ['I', 'II', 'III'];

export default function Grade() {
  // numeração corrida 01–17 através das etapas
  let contador = 0;

  return (
    <section id="grade" className="section relative border-t border-line">
      <div className="wrap">
        <div className="mx-auto max-w-[var(--container-editorial)] text-center">
          <Reveal>
            <span className="eyebrow">A formação</span>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mt-6 text-balance"
              style={{ fontSize: 'clamp(29px,4.8vw,50px)', fontWeight: 500 }}
            >
              {TOTAL_ENCONTROS} encontros ao vivo,{' '}
              <span className="italic text-gold-grad">em três etapas.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <Ornament className="mt-8" width="180px" />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:gap-6 lg:grid-cols-3">
          {GRADE.map((etapa, i) => {
            const inicio = contador;
            contador += etapa.encontros.length;
            return (
              <Reveal key={etapa.etapa} delay={160 + i * 110}>
                <div className="plate flex h-full flex-col overflow-hidden p-7 sm:p-8">
                  {/* numeral romano fantasma no canto */}
                  <span
                    aria-hidden
                    className="ghost-numeral absolute -right-2 -top-4 select-none"
                    style={{ fontSize: 'clamp(96px,10vw,132px)' }}
                  >
                    {ROMANOS[i]}
                  </span>

                  <span className="eyebrow relative">Etapa {i + 1}</span>
                  <h3 className="latin relative mt-4 text-[0.94rem] leading-relaxed text-clinical sm:text-base">
                    {etapa.etapa}
                  </h3>
                  <span className="relative mt-1.5 font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-wider text-muted-3">
                    {etapa.n} encontros
                  </span>

                  <div className="rule-gold my-6" />

                  <ul className="relative space-y-3.5">
                    {etapa.encontros.map((e, j) => (
                      <li key={e} className="leader text-sm leading-snug text-muted">
                        <span className="max-w-[78%] text-clinical/85">{e}</span>
                        <span aria-hidden className="leader-dots" />
                        <span className="shrink-0 font-[family-name:var(--font-mono)] text-[0.68rem] text-goldenrod/75">
                          {String(inicio + j + 1).padStart(2, '0')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
