import Depoimento from '@/components/Depoimento';
import Ornament from '@/components/fx/Ornament';
import Reveal from '@/components/Reveal';
import { DEPOIMENTO_VIDEO, DEPOIMENTOS, TOTAL_ENCONTROS, TURMA_1_ALUNOS } from '@/config/site';

/**
 * BLOCO 7 — PROVA.
 * Números gravados em serif (placas) + o depoimento em vídeo de um aluno da
 * 1ª turma. Depoimentos em texto (se algum dia existirem) entram abaixo.
 */
const NUMEROS = [
  { valor: String(TURMA_1_ALUNOS), rotulo: 'alunos na 1ª turma' },
  { valor: '1ª', rotulo: 'turma em andamento' },
  { valor: String(TOTAL_ENCONTROS), rotulo: 'encontros ao vivo' },
];

export default function Prova() {
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

        {/* O depoimento em vídeo */}
        <Reveal delay={200}>
          <Ornament className="mt-20" width="150px" />
        </Reveal>

        <Reveal delay={260}>
          <p className="eyebrow mt-8 text-center">Quem já está lá dentro</p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mx-auto mt-8 max-w-[900px]">
            <Depoimento />
            {DEPOIMENTO_VIDEO.autor && (
              <p className="mt-5 text-center font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.2em] text-muted-3">
                {DEPOIMENTO_VIDEO.autor} · aluno da 1ª turma
              </p>
            )}
          </div>
        </Reveal>

        {DEPOIMENTOS.length > 0 && (
          <div className="mx-auto mt-14 grid max-w-[var(--container-content)] gap-5 sm:grid-cols-2">
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
      </div>
    </section>
  );
}
