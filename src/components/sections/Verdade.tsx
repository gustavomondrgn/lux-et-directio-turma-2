import Ornament from '@/components/fx/Ornament';
import Reveal from '@/components/Reveal';

/**
 * BLOCO 2 — A VERDADE (a dor).
 * Página de miolo de fólio: capitular dourada, coluna editorial, ornamento.
 * Copy do 02-pagina-vendas.md, verbatim.
 */
export default function Verdade() {
  return (
    <section className="section relative">
      <div className="wrap-narrow">
        <Reveal className="text-center">
          <span className="eyebrow">A verdade</span>
          <Ornament className="mt-5" width="140px" />
        </Reveal>

        <Reveal delay={100}>
          <p
            className="dropcap mt-12 text-balance font-[family-name:var(--font-serif)] text-clinical"
            style={{ fontSize: 'clamp(21px,2.8vw,30px)', lineHeight: 1.5, fontWeight: 400 }}
          >
            Você pode passar anos decorando significados e continuar travando na frente de um
            mapa real. É o <span className="italic text-gold-grad">astrólogo de catálogo</span>:
            sabe que “Sol em Áries é mandão”, mas não sabe o porquê — e trava quando o mapa
            contradiz a receita.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <p
            className="mt-10 border-l border-goldenrod/40 pl-6 text-[17px] leading-relaxed text-muted sm:pl-8 sm:text-lg"
          >
            O problema não é falta de conteúdo. Tá tudo nos livros. O problema é que o livro não
            corrige o seu raciocínio. Astrologia é iniciação oral: sem alguém que já trilhou o
            caminho te dando o tapa na mão, você leva anos — ou desiste.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
