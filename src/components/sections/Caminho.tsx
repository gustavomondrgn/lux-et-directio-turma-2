import Reveal from '@/components/Reveal';

/**
 * BLOCO 3 — O CAMINHO (a ordem validada).
 * Três estações numeradas em romano, ligadas por uma hairline vertical —
 * a "via" que dá nome à mentoria (directio).
 */
const PASSOS = [
  {
    numeral: 'I',
    titulo: 'Fundamentos',
    texto: 'a base sólida (casas, signos, planetas, aspectos).',
  },
  {
    numeral: 'II',
    titulo: 'Horária',
    texto:
      'o filtro. A horária é binária: a resposta é sim ou não. Ela blinda sua mente contra a astrologia de “talvez” e te obriga a ver a metafísica funcionando.',
  },
  {
    numeral: 'III',
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
          <h2
            className="mt-6 text-balance"
            style={{ fontSize: 'clamp(29px,4.6vw,48px)', fontWeight: 500 }}
          >
            A primeira turma provou na prática{' '}
            <span className="italic text-gold-grad">a ordem certa de formação.</span>
          </h2>
        </Reveal>

        <ol className="relative mt-16 space-y-12">
          {/* a via: hairline vertical ligando as estações */}
          <span
            aria-hidden
            className="absolute bottom-4 left-[26px] top-4 w-px sm:left-[34px]"
            style={{
              background:
                'linear-gradient(180deg, transparent, rgba(184,134,11,0.4) 12%, rgba(184,134,11,0.4) 88%, transparent)',
            }}
          />
          {PASSOS.map((p, i) => (
            <Reveal as="li" key={p.titulo} delay={120 + i * 90}>
              <div className="flex gap-6 sm:gap-9">
                {/* estação: numeral romano num anel hairline */}
                <span className="relative z-[1] flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-goldenrod/50 bg-bg sm:h-[68px] sm:w-[68px]">
                  <span
                    className="text-gold-grad font-[family-name:var(--font-serif)] font-medium leading-none"
                    style={{ fontSize: 'clamp(20px,2.6vw,28px)' }}
                  >
                    {p.numeral}
                  </span>
                </span>
                <div className="pt-1.5 sm:pt-3">
                  <h3 className="font-[family-name:var(--font-serif)] text-2xl font-medium text-clinical sm:text-3xl">
                    {p.titulo}
                  </h3>
                  <p className="mt-2.5 max-w-[52ch] leading-relaxed text-muted">{p.texto}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={420}>
          <p
            className="mx-auto mt-16 max-w-[36ch] text-balance text-center font-[family-name:var(--font-serif)] italic text-clinical"
            style={{ fontSize: 'clamp(19px,2.4vw,24px)', lineHeight: 1.45 }}
          >
            Não é a ordem dos cursos por aí. É a ordem que forma astrólogo de verdade.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
