'use client';

import { useRef } from 'react';
import { cn } from '@/lib/cn';

interface Props {
  href: string;
  children: React.ReactNode;
  /** Linha menor sob o texto principal. */
  sub?: string;
  variant?: 'gold' | 'outline';
  big?: boolean;
  fullWidth?: boolean;
  newTab?: boolean;
  className?: string;
}

/**
 * CTA dourado (ou outline). Efeito "magnético" no desktop (pointer:fine).
 * Para âncoras internas (#planos) rola suave via scroll-behavior do CSS.
 */
export default function CtaButton({
  href,
  children,
  sub,
  variant = 'gold',
  big = false,
  fullWidth = false,
  newTab = false,
  className,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isExternal = /^https?:\/\//.test(href);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia?.('(pointer: fine)').matches) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${mx * 0.15}px, ${my * 0.15 - 2}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = '';
  };

  return (
    <a
      ref={ref}
      href={href}
      {...(newTab ? { target: '_blank' } : {})}
      {...(isExternal || newTab ? { rel: 'noopener noreferrer' } : {})}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(variant === 'gold' ? 'btn-gold' : 'btn-outline', fullWidth && 'w-full', className)}
      style={
        big
          ? { padding: 'clamp(1rem,2.4vw,1.25rem) clamp(2rem,5vw,2.75rem)', fontSize: 'clamp(1rem,2vw,1.15rem)' }
          : undefined
      }
    >
      <span className="uppercase tracking-wide">{children}</span>
      {sub && (
        <span className="mt-0.5 text-[0.7rem] font-medium normal-case tracking-normal opacity-70">
          {sub}
        </span>
      )}
    </a>
  );
}
