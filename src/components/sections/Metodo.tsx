import Emblema from '@/components/fx/Emblema';
import Reveal from '@/components/Reveal';

/**
 * BLOCO 4 — O MÉTODO ANTI-BURRO (o diferencial-mestre).
 * O ciclo exercício → devolução → correção em três placas ligadas por setas
 * hairline, e a frase mais forte da página numa placa-proclamação selada
 * com o emblema quebrando a borda superior.
 */
const CICLO = [
  { n: '01', t: 'Você recebe', d: 'o mapa ou a pergunta da semana.' },
  { n: '02', t: 'Você devolve', d: 'a sua análise — escrita, com o seu raciocínio exposto.' },
  { n: '03', t: 'O Yuri corrige', d: 'apontando exatamente onde você errou e por quê.' },
];

function Seta({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 12"
      className={className}
      fill="none"
      stroke="rgba(184,134,11,0.6)"
      strokeWidth="1"
    >
      <path d="M0 6h36M32 2l6 4-6 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Metodo() {
  return (
    <section className="section relative border-t border-line">
      <div className="wrap">
        <div className="mx-auto max-w-[var(--container-editorial)]">
          <Reveal>
            <span className="eyebrow eyebrow-gold">O diferencial</span>
          </Reveal>

          <Reveal delay={80}>
            <h2
              className="mt-6 text-balance"
              style={{ fontSize: 'clamp(29px,4.8vw,50px)', fontWeight: 500 }}
            >
              O Método <span className="italic text-gold-grad">Anti-Burro</span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 text-[17px] leading-relaxed text-muted sm:text-lg">
              Toda aula tem exercício prático. Você recebe o mapa ou a pergunta, analisa, devolve —
              e o Yuri corrige o seu raciocínio, apontando exatamente onde você errou e por quê.
            </p>
          </Reveal>
        </div>

        {/* O ciclo: placas ligadas por setas (horizontal ≥sm, vertical no mobile) */}
        <div className="mx-auto mt-14 flex max-w-[900px] flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-0">
          {CICLO.map((c, i) => (
            <div key={c.n} className="contents">
              {i > 0 && (
                <Reveal delay={200 + i * 90} className="flex items-center justify-center py-1 sm:px-1 sm:py-0">
                  <Seta className="h-3 w-9 rotate-90 sm:rotate-0" />
                </Reveal>
              )}
              <Reveal delay={200 + i * 90} className="flex-1">
                <div className="plate ticks h-full p-6 sm:p-7">
                  <span className="font-[family-name:var(--font-mono)] text-xs font-semibold tracking-[0.2em] text-goldenrod/80">
                    {c.n}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-serif)] text-xl font-medium text-clinical sm:text-2xl">
                    {c.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.d}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        {/* A proclamação, selada */}
        <Reveal delay={500}>
          <div className="relative mx-auto mt-20 max-w-[var(--container-editorial)]">
            <div className="plate plate-gold ticks px-7 pb-10 pt-14 text-center sm:px-12 sm:pb-12 sm:pt-16">
              <p
                className="text-balance font-[family-name:var(--font-serif)] text-ink"
                style={{ fontSize: 'clamp(21px,3vw,32px)', lineHeight: 1.4, fontWeight: 500 }}
              >
                É um sistema à prova de falhas: mesmo que você se ache um jumento, se você faz o
                exercício e recebe a correção,{' '}
                <span className="italic text-gold-grad">é impossível não aprender.</span>
              </p>
            </div>
            {/* o selo quebra a borda superior, como lacre */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-bg p-2">
              <Emblema size={48} />
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
