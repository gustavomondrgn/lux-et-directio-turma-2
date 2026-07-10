import Reveal from '@/components/Reveal';
import { ehPendente } from '@/lib/copy';
import { FAQ } from '@/config/site';

/**
 * BLOCO 10a — FAQ.
 * <details>/<summary> nativo: acessível, funciona sem JS e não custa bundle.
 *
 * Perguntas com resposta ainda em PENDENTE aparecem em `npm run dev` (pra
 * escrever vendo a página, marcadas em vermelho) e NÃO vão pro ar — um acordeão
 * que abre e diz "PENDENTE" é pior do que não existir. Preencheu a resposta em
 * `src/config/site.ts`, ela entra no ar sozinha.
 */
const DEV = process.env.NODE_ENV !== 'production';

export default function Faq() {
  // em produção, só o que está pronto; em dev, tudo (com aviso)
  const perguntas = DEV ? FAQ : FAQ.filter((item) => !ehPendente(item.r));
  if (perguntas.length === 0) return null;

  return (
    <section className="section relative border-t border-line">
      <div className="wrap-narrow">
        <Reveal>
          <span className="eyebrow">Dúvidas</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6" style={{ fontSize: 'clamp(29px,4.6vw,48px)', fontWeight: 500 }}>
            Perguntas <span className="italic text-gold-grad">frequentes</span>
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {perguntas.map((item, i) => {
            const pendente = ehPendente(item.r);
            return (
              <Reveal key={item.p} delay={120 + i * 60}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-left font-[family-name:var(--font-serif)] text-lg font-medium text-clinical marker:hidden hover:text-ink sm:text-xl">
                    <span>
                      {item.p}
                      {DEV && pendente && (
                        <span className="ml-3 align-middle font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-widest text-danger-hi">
                          não vai pro ar
                        </span>
                      )}
                    </span>
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="h-5 w-5 shrink-0 text-goldenrod transition-transform duration-300 group-open:rotate-45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </summary>
                  <p className="pb-7 pr-9 leading-relaxed text-muted">{item.r}</p>
                </details>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
