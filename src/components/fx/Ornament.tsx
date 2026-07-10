import { cn } from '@/lib/cn';

/**
 * Régua ornamentada de fólio: hairline — ◆ — hairline.
 * Substitui divisores planos; o losango é um span rotacionado (sem SVG).
 */
export default function Ornament({
  className,
  width = 'min(320px, 60%)',
}: {
  className?: string;
  width?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn('mx-auto flex items-center justify-center gap-3', className)}
      style={{ width }}
    >
      <span
        className="h-px flex-1"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(184,134,11,0.65))' }}
      />
      <span
        className="block h-1.5 w-1.5 rotate-45"
        style={{ background: 'linear-gradient(135deg, #f6e3a6, #c9962e)' }}
      />
      <span
        className="h-px flex-1"
        style={{ background: 'linear-gradient(270deg, transparent, rgba(184,134,11,0.65))' }}
      />
    </div>
  );
}
