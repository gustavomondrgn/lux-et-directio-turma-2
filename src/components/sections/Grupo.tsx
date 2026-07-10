import Ornament from '@/components/fx/Ornament';
import Reveal from '@/components/Reveal';

/**
 * BLOCO 6 — O FORMATO EM GRUPO (novo diferencial da 2ª turma).
 * Interlúdio editorial centrado — respiro entre a grade e a prova.
 */
export default function Grupo() {
  return (
    <section
      className="section relative border-t border-line"
      style={{
        background:
          'radial-gradient(90% 70% at 50% 50%, rgba(90,113,132,0.06) 0%, transparent 70%)',
      }}
    >
      <div className="wrap-narrow text-center">
        <Reveal>
          <span className="eyebrow">Novo nesta turma</span>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="mx-auto mt-6 max-w-[22ch] text-balance"
            style={{ fontSize: 'clamp(29px,4.6vw,48px)', fontWeight: 500 }}
          >
            Em vez de ver um mapa corrigido,{' '}
            <span className="italic text-gold-grad">você vê dezenas.</span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <Ornament className="mt-9" width="150px" />
        </Reveal>

        <Reveal delay={220}>
          <p className="mx-auto mt-9 max-w-[58ch] text-[17px] leading-relaxed text-muted sm:text-lg">
            Dessa vez, a formação é em grupo — e isso multiplica o aprendizado. Na correção em
            grupo, você aprende com o seu erro E com o erro dos outros. Em vez de ver um mapa
            corrigido, você vê dezenas. Foi o que os alunos da primeira turma mais pediram.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
