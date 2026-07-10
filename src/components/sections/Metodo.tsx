import Reveal from '@/components/Reveal';

/**
 * BLOCO 4 — O MÉTODO ANTI-BURRO (o diferencial-mestre).
 * O ciclo exercício → devolução → correção, em três beats, e a frase de fecho
 * em destaque (é a frase mais forte da página; recebe o card dourado).
 */
const CICLO = [
  { n: '01', t: 'Você recebe', d: 'o mapa ou a pergunta da semana.' },
  { n: '02', t: 'Você devolve', d: 'a sua análise — escrita, com o seu raciocínio exposto.' },
  { n: '03', t: 'O Yuri corrige', d: 'apontando exatamente onde você errou e por quê.' },
];

export default function Metodo() {
  return (
    <section className="section relative border-t border-line">
      <div className="wrap">
        <div className="mx-auto max-w-[var(--container-editorial)]">
          <Reveal>
            <span className="eyebrow eyebrow-gold">O diferencial</span>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-6 text-balance" style={{ fontSize: 'clamp(28px,4.6vw,46px)' }}>
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

        <div className="mx-auto mt-14 grid max-w-[var(--container-editorial)] gap-4 sm:grid-cols-3 sm:gap-5">
          {CICLO.map((c, i) => (
            <Reveal key={c.n} delay={200 + i * 90}>
              <div className="h-full rounded-2xl border border-line bg-surface-2 p-6">
                <span className="font-[family-name:var(--font-mono)] text-sm font-semibold text-goldenrod/70">
                  {c.n}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-clinical">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={480}>
          <div
            className="mx-auto mt-14 max-w-[var(--container-editorial)] rounded-2xl border p-8 text-center sm:p-10"
            style={{ borderColor: 'rgba(184,134,11,0.35)', background: 'rgba(224,184,76,0.035)' }}
          >
            <p
              className="text-balance font-[family-name:var(--font-serif)] font-semibold text-ink"
              style={{ fontSize: 'clamp(20px,2.8vw,30px)', lineHeight: 1.35 }}
            >
              É um sistema à prova de falhas: mesmo que você se ache um jumento, se você faz o
              exercício e recebe a correção,{' '}
              <span className="italic text-gold-grad">é impossível não aprender.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
