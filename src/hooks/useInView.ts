'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-reveal: retorna um ref e um booleano `inView` que vira true (e fica)
 * quando o elemento entra na viewport. Respeita prefers-reduced-motion
 * (revela na hora). Usado pelo componente <Reveal>.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  // threshold 0 (dispara assim que qualquer pixel entra, já com a margem de -10%):
  // com 0.15 uma seção mais alta que a viewport do celular nunca atingia 15% de
  // interseção e ficava presa em opacity:0 (parte da "tela preta" no mobile).
  options: IntersectionObserverInit = { threshold: 0, rootMargin: '0px 0px -10% 0px' },
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
