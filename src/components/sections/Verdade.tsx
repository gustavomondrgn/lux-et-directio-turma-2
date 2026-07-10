import Reveal from '@/components/Reveal';

/**
 * BLOCO 2 — A VERDADE (a dor).
 * Coluna editorial estreita, tom sóbrio. Copy do 02-pagina-vendas.md, verbatim.
 */
export default function Verdade() {
  return (
    <section className="section relative">
      <div className="wrap-narrow">
        <Reveal>
          <span className="eyebrow">A verdade</span>
        </Reveal>

        <Reveal delay={80}>
          <p
            className="mt-8 text-balance text-clinical"
            style={{ fontSize: 'clamp(20px,2.6vw,28px)', lineHeight: 1.45 }}
          >
            Você pode passar anos decorando significados e continuar travando na frente de um
            mapa real. É o <span className="italic text-gold-grad">astrólogo de catálogo</span>:
            sabe que “Sol em Áries é mandão”, mas não sabe o porquê — e trava quando o mapa
            contradiz a receita.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <div className="rule-gold my-10" />
        </Reveal>

        <Reveal delay={200}>
          <p className="text-[17px] leading-relaxed text-muted sm:text-lg">
            O problema não é falta de conteúdo. Tá tudo nos livros. O problema é que o livro não
            corrige o seu raciocínio. Astrologia é iniciação oral: sem alguém que já trilhou o
            caminho te dando o tapa na mão, você leva anos — ou desiste.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
