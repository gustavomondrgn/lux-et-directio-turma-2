import Reveal from '@/components/Reveal';
import { cn } from '@/lib/cn';
import { BONUS } from '@/config/site';

/**
 * BLOCO 8 — BÔNUS.
 * 7 slots; o Placidus ganha o card em destaque (dourado, largura cheia).
 * Cortar um bônus = `ativo: false` no config — não mexer aqui.
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
            <h2 className="mt-6 text-balance" style={{ fontSize: 'clamp(28px,4.6vw,46px)' }}>
              E mais <span className="italic text-gold-grad">{ativos.length} bônus.</span>
            </h2>
          </Reveal>
        </div>

        {destaque && (
          <Reveal delay={120}>
            <div
              className="mx-auto mt-14 max-w-[var(--container-editorial)] rounded-[20px] border p-8 sm:p-10"
              style={{
                borderColor: 'rgba(224,184,76,0.55)',
                background:
                  'radial-gradient(120% 140% at 50% 0%, rgba(224,184,76,0.09), transparent 65%), #141414',
              }}
            >
              <span className="inline-block rounded-full bg-[linear-gradient(180deg,#edca6c,#cd9a30)] px-3 py-1 font-[family-name:var(--font-mono)] text-[0.62rem] font-semibold uppercase tracking-wider text-[#0a0a0a]">
                ★ Bônus principal
              </span>
              <h3 className="mt-5 text-balance text-2xl font-semibold text-ink sm:text-3xl">
                {destaque.titulo}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{destaque.desc}</p>
            </div>
          </Reveal>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demais.map((b, i) => (
            <Reveal key={b.titulo} delay={160 + i * 70}>
              <div className={cn('h-full rounded-2xl border border-line bg-surface-2 p-6')}>
                <span className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-wider text-goldenrod/70">
                  Bônus {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-clinical">
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
