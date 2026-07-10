'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { DEPOIMENTO_VIDEO } from '@/config/site';

/**
 * Depoimento em vídeo (paisagem, um só). Nasce como pôster + botão de play:
 * `preload="none"` significa que o vídeo (~4 MB) só desce se a pessoa clicar.
 * Numa página que abre em celular, no meio de um pitch ao vivo, isso vale mais
 * do que o autoplay.
 *
 * Fontes: WebM/VP9 primeiro (menor), MP4/H.264 como rede de segurança pra
 * Safari antigo. O <video> escolhe a primeira que sabe tocar.
 */
export default function Depoimento() {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);

  const play = () => {
    setTocando(true);
    // o <video> só ganha controls/src depois do clique; toca no próximo tick
    requestAnimationFrame(() => ref.current?.play());
  };

  return (
    <div className="plate ticks group relative mx-auto overflow-hidden p-2 sm:p-2.5">
      <div className="relative overflow-hidden rounded-[10px] bg-black">
        <video
          ref={ref}
          className="block aspect-video w-full"
          poster={DEPOIMENTO_VIDEO.poster}
          preload="none"
          playsInline
          controls={tocando}
          onEnded={() => setTocando(false)}
        >
          <source src={DEPOIMENTO_VIDEO.webm} type="video/webm" />
          <source src={DEPOIMENTO_VIDEO.mp4} type="video/mp4" />
          Seu navegador não consegue exibir este vídeo.
        </video>

        {/* Camada de play — some quando o vídeo começa */}
        {!tocando && (
          <button
            type="button"
            onClick={play}
            aria-label="Assistir ao depoimento"
            className={cn(
              'absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-4',
              'bg-[radial-gradient(60%_60%_at_50%_50%,rgba(8,8,10,.35),rgba(8,8,10,.72))]',
              'transition-colors hover:bg-[rgba(8,8,10,.55)]',
            )}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/70 bg-[rgba(8,8,10,.6)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="ml-1 h-7 w-7 text-gold sm:h-8 sm:w-8"
                fill="currentColor"
              >
                <path d="M8 5.14v13.72a.5.5 0 0 0 .77.42l10.5-6.86a.5.5 0 0 0 0-.84L8.77 4.72a.5.5 0 0 0-.77.42Z" />
              </svg>
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.24em] text-clinical">
              Assistir ao depoimento
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
