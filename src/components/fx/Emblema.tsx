import { cn } from '@/lib/cn';

/**
 * O selo da mentoria: rosa-dos-ventos de 8 pontas ("directio") dentro de um
 * duplo anel com serrilha pontilhada — traço de gravura, hairline dourado.
 * Puro SVG inline: zero requisição, escala em qualquer tamanho.
 */
export default function Emblema({
  size = 56,
  className,
  opacity = 1,
}: {
  size?: number;
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      fill="none"
      className={cn('shrink-0', className)}
      style={{ opacity }}
    >
      {/* anéis: externo, serrilha pontilhada, interno */}
      <circle r="47" stroke="#b8860b" strokeOpacity="0.7" strokeWidth="1" />
      <circle r="42.5" stroke="#e0b84c" strokeOpacity="0.45" strokeWidth="0.75" strokeDasharray="0.75 3" />
      <circle r="38" stroke="#b8860b" strokeOpacity="0.55" strokeWidth="0.75" />

      {/* raios cardeais (longos) — N S L O */}
      <g fill="#e0b84c" fillOpacity="0.9">
        <path d="M0,-34 L2.6,-5 L0,0 L-2.6,-5 Z" />
        <path d="M0,34 L2.6,5 L0,0 L-2.6,5 Z" />
        <path d="M-34,0 L-5,2.6 L0,0 L-5,-2.6 Z" />
        <path d="M34,0 L5,2.6 L0,0 L5,-2.6 Z" />
      </g>

      {/* raios diagonais (curtos), atrás dos cardeais */}
      <g fill="#c9962e" fillOpacity="0.5" transform="rotate(45)">
        <path d="M0,-22 L1.9,-4 L0,0 L-1.9,-4 Z" />
        <path d="M0,22 L1.9,4 L0,0 L-1.9,4 Z" />
        <path d="M-22,0 L-4,1.9 L0,0 L-4,-1.9 Z" />
        <path d="M22,0 L4,1.9 L0,0 L4,-1.9 Z" />
      </g>

      {/* contorno fino sobre os raios cardeais (gravura) */}
      <g stroke="#f6e3a6" strokeOpacity="0.55" strokeWidth="0.5" fill="none">
        <path d="M0,-34 L2.6,-5 L0,0 L-2.6,-5 Z" />
        <path d="M0,34 L2.6,5 L0,0 L-2.6,5 Z" />
        <path d="M-34,0 L-5,2.6 L0,0 L-5,-2.6 Z" />
        <path d="M34,0 L5,2.6 L0,0 L5,-2.6 Z" />
      </g>

      {/* miolo */}
      <circle r="3.4" stroke="#f6e3a6" strokeOpacity="0.8" strokeWidth="0.75" />
      <circle r="1.1" fill="#f6e3a6" />

      {/* quatro estrelinhas entre os anéis, nas diagonais */}
      <g fill="#e0b84c" fillOpacity="0.65">
        {[45, 135, 225, 315].map((a) => (
          <path
            key={a}
            transform={`rotate(${a}) translate(0,-40.25)`}
            d="M0,-2 L0.55,-0.55 L2,0 L0.55,0.55 L0,2 L-0.55,0.55 L-2,0 L-0.55,-0.55 Z"
          />
        ))}
      </g>
    </svg>
  );
}
