import Emblema from '@/components/fx/Emblema';
import Reveal from '@/components/Reveal';
import { semPendencia } from '@/lib/copy';
import { BONUS, BONUS_RODAPE } from '@/config/site';

/** Em dev, mostra a descrição pendente (marcada). Em produção, esconde. */
const DEV = process.env.NODE_ENV !== 'production';

function Desc({ texto, className }: { texto: string; className: string }) {
  const limpo = semPendencia(texto);
  if (limpo) return <p className={className}>{limpo}</p>;
  if (!DEV || !texto) return null;
  return (
    <p className={className}>
      <span className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-widest text-danger-hi">
        não vai pro ar ·{' '}
      </span>
      {texto}
    </p>
  );
}

/** Etiqueta fria de formato ("aula gravada") — aço, nunca dourado. */
function Etiqueta({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-steel/30 bg-[rgba(90,113,132,0.09)] px-2.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.58rem] uppercase tracking-[0.16em] text-steel-2">
      <span aria-hidden className="block h-1 w-1 rounded-full bg-steel/70" />
      {children}
    </span>
  );
}

/**
 * BLOCO 8 — BÔNUS.
 * Cinco aulas gravadas em placas hairline, com etiqueta fria; o Placidus é o
 * clímax — placa dourada larga, badge de acesso antecipado e o emblema em
 * marca d'água. O dourado é reservado pra ele: se todos brilham, ninguém brilha.
 * Cortar um bônus = `ativo: false` no config.
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

        {/* As cinco aulas gravadas */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demais.map((b, i) => (
            <Reveal key={b.titulo} delay={120 + i * 70}>
              <div className="plate flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.2em] text-goldenrod/75">
                    Bônus {String(i + 1).padStart(2, '0')}
                  </span>
                  {b.formato && <Etiqueta>{b.formato}</Etiqueta>}
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-serif)] text-xl font-medium leading-snug text-clinical">
                  {b.titulo}
                </h3>
                <Desc texto={b.desc} className="mt-2 text-sm leading-relaxed text-muted" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* O clímax: Placidus */}
        {destaque && (
          <Reveal delay={160}>
            <div className="plate plate-gold ticks mx-auto mt-6 max-w-[var(--container-content)] overflow-hidden p-8 sm:p-11">
              <span aria-hidden className="absolute -right-10 -top-10 opacity-[0.16]">
                <Emblema size={190} />
              </span>

              <div className="relative flex flex-wrap items-center gap-3">
                <span className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.2em] text-goldenrod/75">
                  Bônus {String(demais.length + 1).padStart(2, '0')}
                </span>
                {destaque.badge && (
                  <span className="inline-block rounded-full bg-[linear-gradient(180deg,#edca6c,#cd9a30)] px-3.5 py-1 font-[family-name:var(--font-mono)] text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#0a0a0a]">
                    ★ {destaque.badge}
                  </span>
                )}
              </div>

              <h3
                className="relative mt-5 max-w-[26ch] text-balance font-[family-name:var(--font-serif)] font-medium text-ink"
                style={{ fontSize: 'clamp(24px,3.4vw,38px)', lineHeight: 1.15 }}
              >
                {destaque.titulo}
              </h3>
              <Desc
                texto={destaque.desc}
                className="relative mt-4 max-w-[56ch] leading-relaxed text-muted"
              />
            </div>
          </Reveal>
        )}

        {BONUS_RODAPE && (
          <Reveal delay={220}>
            <p className="mt-8 text-center font-[family-name:var(--font-mono)] text-[0.64rem] uppercase tracking-[0.18em] text-muted-3">
              {BONUS_RODAPE}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
