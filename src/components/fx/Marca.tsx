import { cn } from '@/lib/cn';

/**
 * A marca da mentoria: a águia dourada com o listel "Lux et Directio".
 * Raster (WebP com alpha) — é uma ilustração, não um ícone; não dá pra virar SVG.
 * Duas variantes: `sm` (360px, rodapé) e cheia (801px nativo, hero).
 *
 * O <img> nu (e não next/image) porque o site é `output: 'export'` com
 * `images.unoptimized` — o Image não agregaria nada e ainda custaria JS.
 */
export default function Marca({
  size = 180,
  className,
  variant = 'full',
  priority = false,
}: {
  size?: number;
  className?: string;
  variant?: 'full' | 'sm';
  priority?: boolean;
}) {
  const src =
    variant === 'sm'
      ? '/mentoria/marca/logo-lux-et-directio-sm.webp'
      : '/mentoria/marca/logo-lux-et-directio.webp';

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Lux et Directio — mentoria de formação em astrologia"
      width={size}
      height={Math.round((size * 741) / 801)} // proporção nativa: 801×741
      draggable={false}
      fetchPriority={priority ? 'high' : undefined}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      // sem width no style: os atributos width/height já reservam o espaço
      // (evitam CLS) e servem de tamanho padrão. Quem quiser um tamanho
      // responsivo passa `w-[...]` no className, que sobrepõe.
      className={cn('block h-auto max-w-none select-none', className)}
    />
  );
}
