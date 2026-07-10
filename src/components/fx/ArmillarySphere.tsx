import { cn } from '@/lib/cn';

interface Props {
  size?: number;
  className?: string;
  /** Gira devagar (usos decorativos de fundo). */
  spin?: boolean;
  opacity?: number;
}

/**
 * Esfera armilar de gravura — anéis, meridianos, eclíptica tracejada e eixo
 * polar em hairline dourado. Puro SVG inline (o PQAF usava a logo do aulão em
 * <img>; aqui a marca é outra e o ornamento é desenhado, não carregado).
 * Decorativa (aria-hidden); reduced-motion zera o giro via CSS global.
 */
export default function ArmillarySphere({
  size = 120,
  className,
  spin = false,
  opacity = 1,
}: Props) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      fill="none"
      className={cn('inline-block max-w-none select-none', className)}
      style={{
        opacity,
        animation: spin ? 'pq-spin 180s linear infinite' : undefined,
        transformOrigin: '50% 50%',
      }}
    >
      {/* anel externo duplo */}
      <circle r="48" stroke="#e0b84c" strokeWidth="0.7" strokeOpacity="0.9" />
      <circle r="45" stroke="#e0b84c" strokeWidth="0.45" strokeOpacity="0.55" />

      {/* banda equatorial (dupla, em perspectiva) */}
      <ellipse rx="46.5" ry="13.5" stroke="#e0b84c" strokeWidth="0.6" strokeOpacity="0.8" />
      <ellipse rx="46.5" ry="9.5" stroke="#e0b84c" strokeWidth="0.4" strokeOpacity="0.45" />

      {/* meridianos */}
      <ellipse rx="13.5" ry="46.5" stroke="#e0b84c" strokeWidth="0.6" strokeOpacity="0.8" />
      <ellipse
        rx="30"
        ry="46.5"
        stroke="#e0b84c"
        strokeWidth="0.45"
        strokeOpacity="0.5"
        transform="rotate(28)"
      />

      {/* eclíptica tracejada, inclinada 23.5° */}
      <ellipse
        rx="46.5"
        ry="24"
        stroke="#f6e3a6"
        strokeWidth="0.5"
        strokeOpacity="0.55"
        strokeDasharray="1.4 3"
        transform="rotate(-23.5)"
      />

      {/* eixo polar */}
      <g transform="rotate(-23.5)">
        <line y1="-49.5" y2="49.5" stroke="#e0b84c" strokeWidth="0.6" strokeOpacity="0.75" />
        <circle cy="-49" r="1.6" stroke="#f6e3a6" strokeWidth="0.5" strokeOpacity="0.8" />
        <circle cy="49" r="1.6" stroke="#f6e3a6" strokeWidth="0.5" strokeOpacity="0.8" />
      </g>

      {/* a terra no centro */}
      <circle r="3.2" stroke="#f6e3a6" strokeWidth="0.6" strokeOpacity="0.9" />
      <circle r="0.9" fill="#f6e3a6" fillOpacity="0.9" />
    </svg>
  );
}
