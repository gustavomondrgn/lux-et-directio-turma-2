/* =========================================================================
   TRAVA DE PLACEHOLDER
   A página é de fechamento de um high ticket. Um "PENDENTE: descrição"
   escapando pro visitante custa venda e credibilidade — e é fácil escapar,
   porque o texto vive no config e ninguém relê a página inteira antes do
   deploy.

   Então: nada marcado como PENDENTE é renderizado. O componente some ou
   encolhe, e volta sozinho quando o texto real entrar no lugar.
   ========================================================================= */

const MARCA_PENDENTE = /PENDENTE/i;

/** O texto é (ou contém) um marcador de pendência? */
export function ehPendente(texto: string | null | undefined): boolean {
  return !texto || MARCA_PENDENTE.test(texto);
}

/**
 * Devolve o texto sem as frases pendentes, ou `null` se não sobrar nada.
 *
 * "Aula com o Gustavo. PENDENTE: descrição"  →  "Aula com o Gustavo."
 * "PENDENTE: descrição"                       →  null
 *
 * Corta por frase (ponto final) pra não deixar meia-frase órfã na página.
 */
export function semPendencia(texto: string | null | undefined): string | null {
  if (!texto) return null;
  const limpo = texto
    .split(/(?<=\.)\s+/) // divide depois do ponto, mantendo o ponto
    .filter((frase) => !MARCA_PENDENTE.test(frase))
    .join(' ')
    .trim();
  return limpo.length > 0 ? limpo : null;
}
