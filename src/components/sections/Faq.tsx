import Reveal from '@/components/Reveal';
import { FAQ } from '@/config/site';

/**
 * BLOCO 10a — FAQ.
 * <details>/<summary> nativo: acessível, funciona sem JS e não custa bundle.
 */
export default function Faq() {
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
          {FAQ.map((item, i) => (
            <Reveal key={item.p} delay={120 + i * 60}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-left font-[family-name:var(--font-serif)] text-lg font-medium text-clinical marker:hidden hover:text-ink sm:text-xl">
                  <span>{item.p}</span>
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
          ))}
        </div>
      </div>
    </section>
  );
}
