'use client';

import { useEffect, useState } from 'react';
import { ANCORA_OFERTA, PARCELAS } from '@/config/site';
import { useRelogio } from '@/hooks/useRelogio';
import { brl, estadoEm } from '@/lib/lotes';

/**
 * Barra de conversão fixa no rodapé. Aparece depois do Hero e some quando a
 * seção da oferta ou o rodapé estão visíveis. Rola pra #oferta.
 * Depende de ids no DOM: #hero, #oferta, #site-footer.
 * Some de vez quando o carrinho fecha.
 */
export default function StickyCta({ buildNow }: { buildNow: number }) {
  const [show, setShow] = useState(false);
  const now = useRelogio(buildNow, 30_000);
  const { vigente } = estadoEm(now);

  useEffect(() => {
    const ids = ['hero', 'oferta', 'site-footer'];
    const state: Record<string, boolean> = { hero: true, oferta: false, 'site-footer': false };
    const observers: IntersectionObserver[] = [];

    const update = () => setShow(!state.hero && !state.oferta && !state['site-footer']);

    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([e]) => {
          state[id] = e.isIntersecting;
          update();
        },
        { threshold: id === 'hero' ? 0.3 : 0.05 },
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  if (!vigente) return null;

  return (
    <div
      aria-hidden={!show}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(184,134,11,.35)] bg-[rgba(8,8,10,.95)] transition-transform duration-500 sm:bg-[rgba(8,8,10,.82)] sm:backdrop-blur-md"
      style={{ transform: show ? 'translateY(0)' : 'translateY(120%)' }}
      suppressHydrationWarning
    >
      <div className="wrap flex items-center justify-between gap-4 py-3">
        <div className="leading-tight">
          <span className="eyebrow block text-[0.6rem]">
            {vigente.parcela != null ? `${PARCELAS}x de` : 'à vista'}
          </span>
          <span className="text-gold-grad text-2xl font-extrabold">
            R${brl(vigente.parcela ?? vigente.preco)}
          </span>
        </div>
        <a
          href={ANCORA_OFERTA}
          className="btn-gold !flex-row rounded-full px-6 py-3 text-sm"
          tabIndex={show ? 0 : -1}
        >
          <span className="uppercase tracking-wide">Quero minha vaga</span>
        </a>
      </div>
    </div>
  );
}
