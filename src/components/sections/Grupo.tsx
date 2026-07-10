import Reveal from '@/components/Reveal';

/**
 * BLOCO 6 — O FORMATO EM GRUPO (novo diferencial da 2ª turma).
 */
export default function Grupo() {
  return (
    <section className="section relative border-t border-line">
      <div className="wrap-narrow">
        <Reveal>
          <span className="eyebrow">Novo nesta turma</span>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-6 text-balance" style={{ fontSize: 'clamp(28px,4.4vw,44px)' }}>
            Em vez de ver um mapa corrigido,{' '}
            <span className="italic text-gold-grad">você vê dezenas.</span>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-7 text-[17px] leading-relaxed text-muted sm:text-lg">
            Dessa vez, a formação é em grupo — e isso multiplica o aprendizado. Na correção em
            grupo, você aprende com o seu erro E com o erro dos outros. Em vez de ver um mapa
            corrigido, você vê dezenas. Foi o que os alunos da primeira turma mais pediram.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
