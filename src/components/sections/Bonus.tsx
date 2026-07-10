import Emblema from '@/components/fx/Emblema';
import Reveal from '@/components/Reveal';
import { BONUS } from '@/config/site';

/**
 * BLOCO 8 — BÔNUS.
 * O Placidus é a joia: placa dourada larga com o emblema em marca d'água.
 * Os demais, placas hairline em grade. Cortar bônus = `ativo: false` no config.
 */
export default function Bonus() {
  const ativos = BONUS.filter((b) => b.ativo);
  const destaque = ativos.find((b) => b.destaque);
  const demais = ativos.filter((b) => !b.destaque);

  if (ativos.length === 0) return null;

  return (
    <section className="section relative border-t border-line">
      <div className="wrap">
        <div className="mx-auto max-w-[var(--container-editorial)] text-center">
          <Reveal>
            <span className="eyebrow eyebrow-gold">Vai junto</span>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mt-6 text-balance"
              style={{ fontSize: 'clamp(29px,4.8vw,50px)', fontWeight: 500 }}
            >
              E mais <span className="italic text-gold-grad">{ativos.length} bônus.</span>
            </h2>
          </Reveal>
        </div>

        {destaque && (
          <Reveal delay={120}>
            <div className="plate plate-gold ticks mx-auto mt-16 max-w-[var(--container-editorial)] overflow-hidden p-8 sm:p-11">
              {/* emblema em marca d'água */}
              <span aria-hidden className="absolute -right-10 -top-10 opacity-[0.16]">
                <Emblema size={190} />
              </span>
              <span className="relative inline-block rounded-full bg-[linear-gradient(180deg,#edca6c,#cd9a30)] px-3.5 py-1 font-[family-name:var(--font-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#0a0a0a]">
                ★ Bônus principal
              </span>
              <h3
                className="relative mt-6 max-w-[24ch] text-balance font-[family-name:var(--font-serif)] font-medium text-ink"
                style={{ fontSize: 'clamp(23px,3.2vw,34px)', lineHeight: 1.2 }}
              >
                {destaque.titulo}
              </h3>
              <p className="relative mt-4 max-w-[56ch] leading-relaxed text-muted">
                {destaque.desc}
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demais.map((b, i) => (
            <Reveal key={b.titulo} delay={160 + i * 70}>
              <div className="plate h-full p-6 sm:p-7">
                <span className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.2em] text-goldenrod/75">
                  Bônus {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-serif)] text-xl font-medium leading-snug text-clinical">
                  {b.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
