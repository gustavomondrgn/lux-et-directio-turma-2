import Reveal from '@/components/Reveal';
import { DEPOIMENTOS, TOTAL_ENCONTROS, TURMA_1_ALUNOS } from '@/config/site';

/**
 * BLOCO 7 — PROVA.
 * Enquanto os depoimentos da 1ª turma não chegam, a prova é factual: a turma
 * existe, está em andamento e a ordem pedagógica foi validada nela.
 *
 * O aviso de PENDENTE só aparece em `npm run dev` — a página publicada nunca
 * mostra placeholder pro visitante.
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
            <h2 className="mt-6 text-balance" style={{ fontSize: 'clamp(28px,4.4vw,44px)' }}>
              A primeira turma <span className="italic text-gold-grad">já está de pé.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 grid max-w-[var(--container-editorial)] grid-cols-3 gap-4">
          {NUMEROS.map((n, i) => (
            <Reveal key={n.rotulo} delay={120 + i * 80}>
              <div className="rounded-2xl border border-line bg-surface-2 px-3 py-7 text-center">
                <span
                  className="text-gold-grad block font-[family-name:var(--font-mono)] font-semibold leading-none"
                  style={{ fontSize: 'clamp(30px,5vw,48px)' }}
                >
                  {n.valor}
                </span>
                <span className="eyebrow mt-3 block text-[0.56rem] sm:text-[0.64rem]">
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
                <figure className="h-full rounded-2xl border border-line bg-surface-2 p-7">
                  <blockquote className="font-[family-name:var(--font-serif)] text-lg italic leading-relaxed text-clinical">
                    “{d.texto}”
                  </blockquote>
                  <figcaption className="eyebrow mt-5">{d.nome}</figcaption>
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
