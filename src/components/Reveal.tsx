'use client';

import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';

interface Props {
  children: React.ReactNode;
  /** Atraso da animação (ms) — pra escalonar elementos. */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
}

/**
 * Envolve conteúdo abaixo da dobra e o revela (fade + translateY) ao entrar na
 * viewport. Elementos já visíveis no primeiro paint são revelados na hora.
 */
export default function Reveal({ children, delay = 0, className, as = 'div' }: Props) {
  const { ref, inView } = useInView();
  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      data-reveal
      data-in={inView ? '' : undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className && cn(className)}
    >
      {children}
    </Tag>
  );
}
