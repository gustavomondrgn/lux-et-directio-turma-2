import { cn } from '@/lib/cn';

/**
 * Céu de carta celeste: estrelas pontuais + algumas cruzetas de gravura.
 * Posições vêm de um PRNG SEMEADO calculado no load do módulo — o mesmo nos
 * dois lados (servidor e cliente), então a hidratação bate. Nunca usar
 * Math.random() aqui. Estático; só ~1 em 8 estrelas cintila (classe .tw,
 * ligada apenas no desktop via CSS).
 */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Star {
  x: number;
  y: number;
  r: number;
  o: number;
  tw: boolean;
  cross: boolean;
}

const rnd = mulberry32(1622); // MMXXVI-ish; qualquer semente fixa serve
const STARS: Star[] = Array.from({ length: 88 }, (_, i) => ({
  x: Math.round(rnd() * 1200 * 10) / 10,
  y: Math.round(rnd() * 800 * 10) / 10,
  r: Math.round((0.5 + rnd() * 1.1) * 100) / 100,
  o: Math.round((0.2 + rnd() * 0.6) * 100) / 100,
  tw: i % 8 === 0,
  cross: i % 11 === 0,
}));

export default function Starfield({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    >
      {STARS.map((s, i) =>
        s.cross ? (
          <path
            key={i}
            d={`M${s.x - 3.2},${s.y} H${s.x + 3.2} M${s.x},${s.y - 3.2} V${s.y + 3.2}`}
            stroke="#e0b84c"
            strokeOpacity={s.o * 0.7}
            strokeWidth="0.6"
            className={s.tw ? 'tw' : undefined}
            style={s.tw ? { animationDelay: `${(i % 7) * 0.7}s` } : undefined}
          />
        ) : (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#f6e3a6"
            fillOpacity={s.o}
            className={s.tw ? 'tw' : undefined}
            style={s.tw ? { animationDelay: `${(i % 7) * 0.7}s` } : undefined}
          />
        ),
      )}
    </svg>
  );
}
