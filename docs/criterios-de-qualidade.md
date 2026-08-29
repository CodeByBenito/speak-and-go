# Critérios de Qualidade — desmontagem da referência

Sete mecanismos extraídos do que a referência (`Speak&Go Site.dc.html`) faz bem,
mais o que ela erra e nós não podemos errar.

O **Crítico Visual** avalia **apenas** este arquivo contra o resultado renderizado.
Nenhum critério aqui é um adjetivo. Todos são verificáveis olhando a imagem.

---

## Q1 — Hierarquia por salto, não por gradação

O título principal tem **cerca de 4x** o tamanho do corpo (76px vs 19px na home, 62px vs 19px nas internas).
Entre esses dois extremos existem no máximo **dois** tamanhos intermediários.

**Verificação:** conte os tamanhos de texto distintos visíveis em uma tela. Se passar de **4**, reprova.
Se o título e o parágrafo parecerem "próximos" em tamanho, reprova.

---

## Q2 — Display apertado, corpo solto

Todo título tem entrelinha **menor que a altura da letra** (line-height ≤ 1.05) e letras encostadas
(tracking negativo). Todo parágrafo tem entrelinha **larga** (≥ 1.55) e largura de linha curta.

**Verificação:** um título de duas linhas deve ter as linhas quase se tocando.
Um parágrafo não pode ultrapassar **~70 caracteres** por linha — nenhum texto corre de ponta a ponta
dos 1240px. Se um parágrafo atravessar a largura total, reprova.

---

## Q3 — Laranja é pontual ou faixa, nunca campo

> **Corrigido após medição.** A primeira versão deste critério exigia no máximo 2 manchas laranja
> por dobra e um único botão laranja. A referência falha nisso: a dobra dela tem seis marcas laranja
> (logo, botão do cabeçalho, ponto do eyebrow, a palavra "falar.", botão do herói e a faixa do marquee).
> Um critério que a própria referência reprova é um critério inventado, não extraído. Este é o mecanismo real.

O cabeçalho fixo (marca + botão persistente) é **cromo**, não conteúdo, e não entra na conta —
ele é constante em todas as páginas.

Descontado o cromo, o laranja em uma dobra aparece em **no máximo 4 marcas**, e cada marca é
uma destas formas: um texto curto, um botão, um ponto ou ícone, um numeral, ou uma **faixa
de até 60px de altura**.

Laranja como campo largo e quieto não existe: nenhum retângulo laranja passa de 60px de altura,
exceto **um único card por página**.

**Verificação:** conte as marcas laranja fora do cabeçalho. Cinco ou mais, reprova.
Qualquer bloco laranja maior que 400×60px que não seja o único card laranja da página, reprova.

---

## Q4 — O fundo alterna em blocos inteiros

O fundo da página só assume dois valores: **preto** ou **bege**. A troca sempre ocupa a
**largura total** e uma **seção inteira**, criando faixas horizontais nítidas ao rolar.
Nenhum gradiente, nenhuma foto de fundo, nenhum terceiro tom.

**Verificação:** role a página inteira reduzida. O ritmo deve ler como faixas alternadas bem definidas.
Um bloco bege "flutuando" no meio de uma seção preta com margem lateral, reprova.
Qualquer gradiente, reprova.

---

## Q5 — Nenhuma coluna abandonada

Em toda grade de duas colunas, **as duas colunas têm conteúdo** e alturas comparáveis
(a menor tem pelo menos **60%** da altura da maior).

> **Este é o erro da referência.** Na página "Como funciona", a seção "50 minutos com pauta"
> tem a coluna esquerda terminando na metade e um vazio morto de ~300px abaixo dela.
> Não podemos repetir isso.

**Verificação:** procure buracos verticais. Um vazio maior que **200px** dentro de uma coluna,
com a coluna vizinha preenchida, reprova.

---

## Q6 — Toda seção abre com rótulo, depois título

Cada seção começa com um **eyebrow** — 12px, caixa alta, letras muito espaçadas (≥0.16em) — e
logo abaixo um título grande. O parágrafo só vem depois. Nunca o contrário, nunca sem o rótulo.

**Verificação:** percorra as seções. Uma seção que começa direto no parágrafo ou direto no card, reprova.
Um eyebrow em caixa baixa ou sem espaçamento entre letras, reprova.

---

## Q7 — O herói é só o herói

> **Corrigido após medição.** A primeira versão media os 900px do viewport e reprovava se a
> seção seguinte aparecesse. A referência mostra a faixa do marquee entrando por volta de y≈755 —
> ela reprovaria a si mesma. O mecanismo real não é sobre o viewport, é sobre o **bloco do herói**.

Acima da primeira troca de cor de fundo existem apenas: **um eyebrow, um H1, um parágrafo,
até dois botões e um único elemento de apoio** (card, número, imagem). Nada além disso.

O herói tem no mínimo **80px de respiro** entre o cabeçalho e o eyebrow, e entre o último botão
e a próxima faixa. O espaço vazio ocupa **pelo menos 35%** da área do herói.

**Verificação:** olhe só o que está acima da primeira faixa de cor diferente. Um terceiro grupo
de conteúdo (segunda lista, terceira coluna, logos de clientes, depoimento), reprova.
Herói apertado contra o cabeçalho, ou título e parágrafo colados com menos de 24px entre eles, reprova.

---

## O que estamos superando na referência

Além do Q5, três falhas conhecidas da referência que o resultado precisa resolver:

1. **Não é responsiva.** Grades fixas de 3 e 4 colunas, `font-size` em px absolutos, sem media query.
   Abaixo de 1000px a referência quebra. A nossa não pode quebrar entre 320px e 1600px.
2. **Sem estados de foco.** Navegação por teclado é invisível na referência.
3. **Marrom subutilizado.** A cor existe no token e quase não aparece.
   No nosso resultado o marrom precisa carregar peso real como cor de texto sobre bege.
