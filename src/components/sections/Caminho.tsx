import Reveal from '@/components/Reveal';

/**
 * BLOCO 3 — O CAMINHO (a ordem validada).
 * Três passos numerados, em mono, com a régua dourada ligando um ao outro.
 */
const PASSOS = [
  {
    titulo: 'Fundamentos',
    texto: 'a base sólida (casas, signos, planetas, aspectos).',
  },
  {
    titulo: 'Horária',
    texto:
      'o filtro. A horária é binária: a resposta é sim ou não. Ela blinda sua mente contra a astrologia de “talvez” e te obriga a ver a metafísica funcionando.',
  },
  {
    titulo: 'Especialização Natal',
    texto: 'as técnicas avançadas e 4 encontros seguidos de leitura de mapa ao vivo.',
  },
];

export default function Caminho() {
  return (
    <section className="section relative border-t border-line">
      <div className="wrap-narrow">
        <Reveal>
          <span className="eyebrow">O caminho</span>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-6 text-balance" style={{ fontSize: 'clamp(28px,4.4vw,44px)' }}>
            A primeira turma provou na prática{' '}
            <span className="italic text-gold-grad">a ordem certa de formação.</span>
          </h2>
        </Reveal>

        <ol className="mt-14 space-y-10">
          {PASSOS.map((p, i) => (
            <Reveal as="li" key={p.titulo} delay={120 + i * 90}>
              <div className="flex gap-5 sm:gap-7">
                <span
                  className="shrink-0 font-[family-name:var(--font-mono)] font-semibold leading-none text-goldenrod/60"
                  style={{ fontSize: 'clamp(28px,4vw,40px)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-clinical sm:text-3xl">{p.titulo}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{p.texto}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={420}>
          <p className="mt-14 border-l-2 border-goldenrod/50 pl-5 font-[family-name:var(--font-serif)] text-lg italic text-clinical sm:text-xl">
            Não é a ordem dos cursos por aí. É a ordem que forma astrólogo de verdade.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
