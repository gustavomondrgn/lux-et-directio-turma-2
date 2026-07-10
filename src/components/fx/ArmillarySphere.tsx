import { cn } from '@/lib/cn';

interface Props {
  size?: number;
  className?: string;
  /** Anima o selo girando devagar (usos decorativos de fundo). */
  spin?: boolean;
  /** Legado — não usado desde que virou a logo (mantido p/ compat de chamadas). */
  stroke?: string;
  opacity?: number;
}

/**
 * Marca/selo do aulão — a logo dourada ("Por Que a Astrologia Funciona?").
 * Substitui a antiga esfera armilar de linha. Usada como assinatura (pequena) e
 * como ornamento de fundo (grande + `spin`). Decorativa por padrão (aria-hidden).
 * Respeita reduced-motion via CSS global (animações zeradas).
 */
export default function ArmillarySphere({
  size = 120,
  className,
  spin = false,
  opacity = 1,
}: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/pqaf/marca/logo-aulao.webp"
      alt=""
      aria-hidden
      draggable={false}
      width={size}
      height={size}
      style={{
        opacity,
        animation: spin ? 'pq-spin 150s linear infinite' : undefined,
        transformOrigin: '50% 50%',
      }}
      className={cn('inline-block max-w-none select-none', className)}
    />
  );
}
