# 03 — DADOS PENDENTES

> Estado em 09/07/2026, com a página já no ar em `yuridosanjos.com.br/mentoria`.

## Resolvido

- [x] **Rota da página** — `/mentoria`
- [x] **Links de compra** — não é checkout: cada lote aponta pro **WhatsApp**, com
      mensagem pré-preenchida identificando o lote. O pagamento (InfinitePay) é
      combinado na conversa.
- [x] **Bônus** — lista final de **6** (o livro "Igreja Católica e Astrologia
      Tradicional" saiu). Cinco aulas gravadas + Placidus em destaque.
- [x] **Depoimentos** — um depoimento em vídeo de aluno da 1ª turma.
- [x] **Data de início da turma 2** — respondida no FAQ ("comunicado no grupo,
      após o encerramento da oferta na sexta").
- [x] **Garantia de 7 dias** — ❌ **DECIDIDO: NÃO EXISTE.** O Gustavo removeu
      (09/07). Não tem lógica dar garantia nesta oferta. **Não re-adicionar.**
- [x] **Imagens** — a marca é a águia dourada (`public/marca/`); og:image gerada.
- [x] **FAQ** — as cinco respostas estão no ar.

## Em aberto

- [ ] **Revisão manual da copy pelo Gustavo** — o briefing sempre disse que a
      estrutura era rascunho validado e o acabamento era dele. Subiu sem essa
      passada.
- [ ] **Nome do aluno do depoimento** (`DEPOIMENTO_VIDEO.autor` em
      `src/config/site.ts`) — hoje sem legenda sob o vídeo.

---

NÃO invente nenhum desses valores. Textos marcados com `PENDENTE` no config não
são renderizados em produção, e o `postbuild` derruba o build se um escapar.
