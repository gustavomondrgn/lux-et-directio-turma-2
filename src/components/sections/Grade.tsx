import Reveal from '@/components/Reveal';
import { GRADE, TOTAL_ENCONTROS } from '@/config/site';

/**
 * BLOCO 5 — A GRADE.
 * 17 encontros ao vivo, em 3 cards/colunas escaneáveis (uma por etapa).
 * Escaneável é requisito: o leitor bate o olho e entende a formação inteira.
 */
export default function Grade() {
  return (
    <section id="grade" className="section relative border-t border-line">
      <div className="wrap">
        <div className="mx-auto max-w-[var(--container-editorial)] text-center">
          <Reveal>
            <span className="eyebrow">A formação</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 text-balance" style={{ fontSize: 'clamp(28px,4.6vw,46px)' }}>
              {TOTAL_ENCONTROS} encontros ao vivo,{' '}
              <span className="italic text-gold-grad">em três etapas.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:gap-6 lg:grid-cols-3">
          {GRADE.map((etapa, i) => (
            <Reveal key={etapa.etapa} delay={120 + i * 100}>
              <div className="flex h-full flex-col rounded-[20px] border border-line bg-surface-2 p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="eyebrow">Etapa {i + 1}</span>
                  <span className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-wider text-muted-3">
                    {etapa.n} encontros
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-semibold leading-tight text-clinical">
                  {etapa.etapa}
                </h3>

                <div className="rule-gold my-6" />

                <ul className="space-y-3">
                  {etapa.encontros.map((e, j) => (
                    <li key={e} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-0.5 shrink-0 font-[family-name:var(--font-mono)] text-[0.7rem] text-goldenrod/60">
                        {String(j + 1).padStart(2, '0')}
                      </span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
