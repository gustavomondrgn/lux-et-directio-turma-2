'use client';

import { useEffect, useState } from 'react';
import { agora } from '@/lib/lotes';

/**
 * Relógio da página, à prova de hidratação.
 *
 * O primeiro render (servidor E cliente) usa `buildNow` — o instante do build,
 * passado como prop pelo Server Component. Como os dois lados renderizam o mesmo
 * valor, o HTML bate e o React não reclama.
 *
 * Depois que monta, um efeito troca pelo relógio real e passa a tiquetaquear de
 * segundo em segundo. É isso que faz o lote virar sozinho à meia-noite: quem
 * deixou a aba aberta vê a página se atualizar sem recarregar, e quem chega
 * depois pega o estado certo em milissegundos.
 *
 * @param buildNow instante do build (ms), vindo do Server Component
 * @param tick     de quanto em quanto tempo atualizar (ms). 1000 = countdown.
 */
export function useRelogio(buildNow: number, tick = 1000): number {
  const [now, setNow] = useState(buildNow);

  useEffect(() => {
    setNow(agora());
    const id = setInterval(() => setNow(agora()), tick);
    return () => clearInterval(id);
  }, [tick]);

  return now;
}

/**
 * `true` só depois que o componente montou no cliente. Serve pra esconder o
 * countdown em segundos no HTML estático (que nasceria com um valor velho) e
 * revelá-lo já correto no primeiro tick.
 */
export function useMontado(): boolean {
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);
  return montado;
}
