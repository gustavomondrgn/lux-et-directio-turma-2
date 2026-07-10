import { CountdownBar } from '@/components/Countdown';
import StickyCta from '@/components/StickyCta';
import CursorGlow from '@/components/fx/CursorGlow';
import Emblema from '@/components/fx/Emblema';
import FilmGrain from '@/components/fx/FilmGrain';
import Bonus from '@/components/sections/Bonus';
import Caminho from '@/components/sections/Caminho';
import CtaFinal from '@/components/sections/CtaFinal';
import Faq from '@/components/sections/Faq';
import Grade from '@/components/sections/Grade';
import Grupo from '@/components/sections/Grupo';
import Hero from '@/components/sections/Hero';
import Metodo from '@/components/sections/Metodo';
import Oferta from '@/components/sections/Oferta';
import Prova from '@/components/sections/Prova';
import Verdade from '@/components/sections/Verdade';
import { agora } from '@/lib/lotes';

export default function Home() {
  // Instante do BUILD (isto é um Server Component e o site é `output: 'export'`,
  // então este código roda uma vez, no build). É o `now` do primeiro render —
  // nos dois lados, servidor e cliente — pra hidratação bater. Assim que o JS
  // monta, `useRelogio` troca pelo relógio real e o lote vigente se corrige.
  const buildNow = agora();

  return (
    <>
      <FilmGrain />
      <CursorGlow />
      <CountdownBar buildNow={buildNow} />

      <main className="relative">
        <Hero buildNow={buildNow} />
        <Verdade />
        <Caminho />
        <Metodo />
        <Grade />
        <Grupo />
        <Prova />
        <Bonus />
        <Oferta buildNow={buildNow} />
        <Faq />
        <CtaFinal buildNow={buildNow} />
      </main>

      <footer id="site-footer" className="relative border-t border-line px-5 py-16 text-center">
        <span className="flex justify-center">
          <Emblema size={44} opacity={0.8} />
        </span>
        <p className="latin mt-5 text-[0.78rem] text-gold">Lux et Directio</p>
        <p className="mt-2 text-sm text-muted">
          Mentoria de formação em astrologia · Yuri dos Anjos
        </p>
        <p className="mt-6 font-[family-name:var(--font-mono)] text-xs text-muted-3">
          © {new Date().getFullYear()} Yuri dos Anjos. Todos os direitos reservados.
        </p>
      </footer>

      <StickyCta buildNow={buildNow} />
    </>
  );
}
