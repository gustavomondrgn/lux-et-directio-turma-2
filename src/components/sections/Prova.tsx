import Reveal from '@/components/Reveal';
import { DEPOIMENTOS, TOTAL_ENCONTROS, TURMA_1_ALUNOS } from '@/config/site';

/**
 * BLOCO 7 — PROVA.
 * Números gravados em serif (placas), depoimentos como excertos de fólio.
 * O aviso de PENDENTE só existe em `npm run dev` — nunca na página publicada.
 */
const MOSTRAR_PENDENCIAS = process.env.NODE_ENV !== 'production';

const NUMEROS = [
  { valor: String(TURMA_1_ALUNOS), rotulo: 'alunos na 1ª turma' },
  { valor: '1ª', rotulo: 'turma em andamento' },
  { valor: String(TOTAL_ENCONTROS), rotulo: 'encontros ao vivo' },
];

export default function Prova() {
  const temDepoimentos = DEPOIMENTOS.length > 0;

  return (
    <section className="section relative border-t border-line">
      <div className="wrap">
        <div className="mx-auto max-w-[var(--container-editorial)] text-center">
          <Reveal>
            <span className="eyebrow">A prova</span>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mt-6 text-balance"
              style={{ fontSize: 'clamp(29px,4.6vw,48px)', fontWeight: 500 }}
            >
              A primeira turma <span className="italic text-gold-grad">já está de pé.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-[var(--container-editorial)] grid-cols-3 gap-3 sm:gap-5">
          {NUMEROS.map((n, i) => (
            <Reveal key={n.rotulo} delay={120 + i * 80}>
              <div className="plate px-2 py-8 text-center sm:py-10">
                <span
                  className="text-gold-grad block font-[family-name:var(--font-serif)] font-medium leading-none"
                  style={{ fontSize: 'clamp(34px,5.4vw,56px)' }}
                >
                  {n.valor}
                </span>
                <span className="eyebrow mt-3.5 block text-[0.52rem] sm:text-[0.62rem]">
                  {n.rotulo}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {temDepoimentos && (
          <div className="mx-auto mt-12 grid max-w-[var(--container-content)] gap-5 sm:grid-cols-2">
            {DEPOIMENTOS.map((d, i) => (
              <Reveal key={d.nome} delay={140 + i * 80}>
                <figure className="plate h-full p-7 sm:p-8">
                  <span
                    aria-hidden
                    className="block font-[family-name:var(--font-serif)] text-5xl leading-none text-goldenrod/40"
                  >
                    “
                  </span>
                  <blockquote className="mt-2 font-[family-name:var(--font-serif)] text-lg italic leading-relaxed text-clinical">
                    {d.texto}
                  </blockquote>
                  <figcaption className="eyebrow mt-6">— {d.nome}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        {!temDepoimentos && MOSTRAR_PENDENCIAS && (
          <div className="mx-auto mt-12 max-w-[var(--container-editorial)] rounded-2xl border border-dashed border-danger/50 p-8 text-center">
            <p className="font-[family-name:var(--font-mono)] text-sm text-danger-hi">
              PENDENTE — depoimentos da 1ª turma
            </p>
            <p className="mt-2 text-sm text-muted">
              Preencha <code className="text-clinical">DEPOIMENTOS</code> em{' '}
              <code className="text-clinical">src/config/site.ts</code>. Este aviso não aparece na
              página publicada.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
