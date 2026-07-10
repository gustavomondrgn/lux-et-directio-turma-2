import type { Metadata, Viewport } from 'next';
import { Newsreader, Hanken_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import { SEO } from '@/config/site';
import './globals.css';

// "Lab × Cosmos" — mesma identidade do PQAF: Newsreader (serif, títulos),
// Hanken Grotesk (corpo/UI), IBM Plex Mono (kickers, números, legendas).
const serif = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});
const sans = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-hanken',
  display: 'swap',
});
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yuridosanjos.com.br'),
  title: SEO.titulo,
  description: SEO.descricao,
  openGraph: {
    title: SEO.titulo,
    description: SEO.descricao,
    url: '/mentoria',
    siteName: 'Yuri dos Anjos',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: SEO.ogImage, width: 1200, height: 630, alt: SEO.titulo }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.titulo,
    description: SEO.descricao,
    images: [SEO.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#08080a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: o script inline abaixo adiciona .js ao <html>
    // ANTES da hidratação (de propósito — guarda anti-"tela preta"), e o React
    // reclamaria da diferença de className. Só silencia neste elemento.
    <html
      lang="pt-BR"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/*
          Guarda anti-"tela preta" (herdada do PQAF, onde o bug apareceu no
          WebView do Facebook): marca <html> com .js antes do 1º paint — só aí o
          CSS esconde os [data-reveal] — e instala uma rede de segurança: se um
          elemento visível na tela seguir escondido (o IntersectionObserver não
          disparou ou o bundle não rodou), força tudo a reaparecer com
          .reveal-fallback. Roda fora do React, então sobrevive até a uma falha
          de hidratação.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;d.classList.add('js');" +
              "var done=false;function check(){if(done)return;" +
              "var els=document.querySelectorAll('[data-reveal]:not([data-in])');" +
              "var h=window.innerHeight||document.documentElement.clientHeight||0;" +
              "for(var i=0;i<els.length;i++){var r=els[i].getBoundingClientRect();" +
              "if(r.top<h&&r.bottom>0){done=true;d.classList.add('reveal-fallback');return;}}}" +
              "var t;function schedule(){clearTimeout(t);t=setTimeout(check,2500);}" +
              "addEventListener('scroll',schedule,{passive:true});" +
              "addEventListener('load',schedule);schedule();})();",
          }}
        />
        {children}
      </body>
    </html>
  );
}
