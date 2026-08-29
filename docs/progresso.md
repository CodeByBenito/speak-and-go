# Progresso — Ciclo de Design Speak&Go

**Objetivo:** site institucional Speak&Go (5 páginas) — mentoria de inglês 1:1 com foco em conversação.
**Referência:** `Downloads/Speak&Go institucional/Speak&Go Site.dc.html` (capturada em 5 screenshots full-page a 1440px).
**Limite:** 7 rodadas por peça.

| Papel | Modelo |
|---|---|
| Construtor | Sonnet |
| Crítico do Briefing | Sonnet |
| Crítico do Sistema | Haiku → **Sonnet** a partir da rodada 6 |
| Crítico Visual | Opus |

---

## Peças

| # | Peça | Entregáveis | Status | Rodadas |
|---|---|---|---|---|
| P1 | Fundação + Início | `style.css`, `main.js`, `index.html`, header, footer | **APROVADA** | 6 de 7 |
| P2 | Como funciona + Metodologia | `como-funciona.html`, `metodologia.html` | **APROVADA** | 6 de 7 |
| P3 | Materiais + Contato | `materiais.html`, `contato.html` | **APROVADA** | 2 de 7 |

---

## Infraestrutura do ciclo

A pane de browser desta sessão não compõe frames, então a renderização foi montada à parte:

- `scratchpad/shot.js` — Chrome headless + CDP. Captura full-page em qualquer largura,
  com `prefers-reduced-motion: no-preference` emulado (sem isso o headless reporta `reduce`
  e mede transições de 0.00001s).
- `scratchpad/audit.js` — auditoria objetiva a partir da **DOM viva e dos estilos computados**:
  cores, tamanhos, raios, durações, headings, overflow em 8 larguras e foco por **Tab real**
  (`Input.dispatchKeyEvent`), não `.focus()` programático, que dá falso negativo.
- Referência capturada em `scratchpad/ref/` (5 páginas).
- Comparação cega do Crítico Visual em `scratchpad/cego/` (A e B sem identificação).

---

## Histórico

### P1 — Rodada 1

**Construtor (Sonnet)** entregou `style.css`, `main.js`, `index.html`.

Correções feitas na régua antes de criticar (para não gerar reprovação falsa):
- A escala de espaçamento do sistema não continha os 28px que o próprio documento exigia como
  padding de card, e não isentava o padding óptico de botões. Contradição interna do spec — corrigida
  no `sistema-de-design.md`, não no resultado.

Auditoria da rodada 1: 0 imagens sem alt, 0 campos sem label, 0 estilo inline,
0 links sem nome acessível, 29 paradas de Tab todas com anel de foco visível,
transições em 0.26s e 0.5s, nenhum overflow horizontal de 320px a 1600px.

**Veredictos:**

| Crítico | Modelo | Veredicto |
|---|---|---|
| Briefing | Sonnet | **APROVADO** — R1 a R8 todos aprovados, maior lacuna: nenhuma |
| Sistema | Haiku | **REPROVADO** — 5 de 7 itens reprovados |
| Visual | Opus | **REPROVADO** — Q3, Q5, Q6, Q7 reprovados |

**Comparação cega:** o Crítico Visual escolheu **A** (a referência). Comparação inválida nesta
rodada — ver artefato abaixo.

### O artefato que contaminou a rodada 1

Ao emular `prefers-reduced-motion: no-preference` (correto), o scroll-reveal passou a esconder o
conteúdo abaixo da dobra. Minha captura full-page usa `captureBeyondViewport`, que **não rola a
página** — então o `IntersectionObserver` nunca disparava e 70% da home saía em branco.
O Crítico Visual julgou uma página vazia; suas reprovações de Q5 e Q6 são inválidas.

O Crítico do Briefing, sozinho, desconfiou do artefato, foi ao navegador real, extraiu o texto e a
árvore de acessibilidade, e julgou pelo conteúdo verdadeiro. Bom sinal sobre o rigor do papel.

**Correção:** `shot.js` e `audit.js` agora rolam a página inteira antes de medir e capturar.

**Ganho real vindo do artefato:** o incidente expôs uma fragilidade genuína — o conteúdo dependia
de um evento de rolagem para existir. Se o JS falhasse, 70% da página sumiria para um usuário real.
Virou regra na seção 7 do sistema: revelação por rolagem é aprimoramento progressivo.

### Correções na régua, não no resultado

Dois critérios meus eram **mais rígidos que a própria referência** — ou seja, inventados, não extraídos:

- **Q3** exigia no máximo 2 marcas laranja por dobra. A dobra da referência tem 6. Reescrito:
  o cabeçalho fixo é cromo e não conta; até 4 marcas de conteúdo; nenhum campo laranja acima de
  60px de altura exceto um card por página.
- **Q7** media os 900px do viewport e reprovava se a seção seguinte aparecesse. Na referência o
  marquee entra em y≈755 — ela se reprovaria. Reescrito para medir o **bloco do herói**, não o viewport.

Também no `sistema-de-design.md`: adicionado `--ink-scrim` (o cabeçalho fixo precisa de transparência
para o `backdrop-filter`), esclarecido que o numeral de passo é componente e não segue a escala
tipográfica, e a regra de alvo de toque de 44px foi escopada para telas ≤768px.

### Achados legítimos devolvidos ao Construtor

Cores fora da tabela (`#4A423B`, `#1E1B18`, `#1A1614`), um texto de 11px, parágrafo de nota correndo
os 1240px sem `max-width`, nove valores de espaçamento fora da escala, um raio de 9px, e alvos de
toque no mobile.

---

### P1 — Rodada 2

**Construtor (Sonnet)** corrigiu tudo o que foi devolvido. A lacuna principal foi fechada:
captura **sem rolar a página** mostra a home inteira, confirmando que o conteúdo é visível por
padrão e o estado oculto só existe sob a classe que o JS adiciona.

| Medida | Rodada 1 | Rodada 2 |
|---|---|---|
| Cores fora da tabela | 4 | 0 |
| Texto abaixo de 12px | 1 | 0 |
| Espaçamento fora da escala | 14 valores | 4 valores |
| Raios fora das faixas | 1 | 0 |
| Cores de borda distintas | 4 | 2 |

**Veredictos:**

| Crítico | Modelo | Veredicto |
|---|---|---|
| Briefing | Sonnet | **APROVADO** — R1 a R8, nenhuma lacuna |
| Sistema | Haiku | **REPROVADO** — tipografia (falso), espaçamento, acessibilidade |
| Visual | Opus | **REPROVADO** — Q5. Q1, Q2, Q3, Q4, Q6, Q7 aprovados |

**Comparação cega:** lados trocados nesta rodada (nosso resultado em A, referência em B) para não
criar padrão entre rodadas. O crítico escolheu **B, a referência**, com uma razão concreta e útil:
nossa página tem 4047px contra 3453px, e gasta os 594px de diferença em respiro que não vira
composição.

#### Terceira correção de instrumento: a medida de parágrafo

O Crítico do Sistema reprovou a tipografia por "74 caracteres/linha, 6 além do máximo de 68".
Margem estreita demais para confiar — meu estimador dividia a largura do parágrafo por
`fontSize × 0.5`, um chute sobre a largura média do caractere.

Troquei por medição real: um `Range` sobre o conteúdo do parágrafo devolve **um retângulo por
linha renderizada**, então caracteres por linha é a contagem real dividida pelo número real de
linhas. Passei a ignorar parágrafos de uma linha só, que não têm problema de medida por definição.

Resultado medido corretamente: **64 caracteres/linha** no pior caso ("Cursos tradicionais
entregam o mesmo material..." em 3 linhas). Dentro da faixa de 52–68.

**A reprovação de tipografia era falsa.** Terceiro artefato de medição desta peça, e o terceiro
que teria virado retrabalho do Construtor se eu tivesse repassado sem conferir.

**Achados legítimos que seguem em aberto:** quatro paddings de layout fora da escala
(5px, 7px, 14px, 18px) e três alvos de toque abaixo de 44px em telas ≤768px — o link "pular para
o conteúdo" (41px), o logo (42px) e "Ver o passo a passo completo" (23px).

#### O Q5 virou instrumento

Em vez de depender do crítico reparar a cada rodada, instrumentei a medição no `audit.js`:
para cada grade de 2 ou 3 colunas, ele percorre os descendentes visíveis de cada coluna, acha
até onde o conteúdo realmente alcança, e reporta a diferença entre a coluna mais funda e a
mais rasa. Vale automaticamente para as peças 2 e 3.

Resultado na rodada 2:

| Buraco | Altura da linha | Coluna curta preenche | Onde |
|---|---|---|---|
| **364px** | 482px | **24%** | "O que é a Speak&Go — Uma mentoria, não um curso de prateleira" |
| 184px | 310px | 41% | Rodapé |
| 89px | 507px | 82% | Herói |

O Crítico Visual, medindo de forma independente e sem acesso a esta auditoria, chegou a **369px**
e 23% no mesmo lugar. Instrumento e olho concordam — é a falha que eu havia identificado na
referência durante a desmontagem e registrado como "não podemos repetir isso". Repetimos.

---

### P1 — Rodada 3

Devolvido ao Construtor num pacote só:

1. **Maior lacuna (Visual):** tirar a fileira "Individual / Ao vivo, online / Com acompanhamento"
   de dentro da coluna direita e colocá-la como linha de largura total abaixo do bloco de duas
   colunas. Some o buraco de 369px, os cards dobram de largura e as quebras "Ao vivo, / online"
   desaparecem sozinhas. Junto: parar de esticar os cards até a altura do mais alto (~95px de
   chão morto em cada).
2. **Densidade vertical (comparação cega):** vão de 60px→43px nos cards de plano, links de rodapé
   de 56px→34px.
3. **Sistema:** quatro paddings fora da escala; três alvos de toque em telas ≤768px.
4. **Q6:** a faixa final "A primeira conversa é gratuita" abre sem eyebrow.

Instruído a **não mexer** no herói, nas cores, nos raios, no movimento, na responsividade
nem nos `max-width` de parágrafo — todos aprovados ou falso-reprovados.

**Construtor (Sonnet)** entregou. Resultados medidos:

| Medida | Rodada 2 | Rodada 3 | Alvo |
|---|---|---|---|
| Maior buraco de coluna | **364px** (24% preenchido) | **65px** (71% preenchido) | ≤200px, ≥60% |
| Espaçamento fora da escala | 4 valores | **nenhum** | nenhum |
| Alvos de toque <44px em ≤768px | 3 | **nenhum** | nenhum |
| Altura da página | 4047px | **3702px** | referência: 3453px |

O Construtor descobriu que mover a fileira de cards não bastava — o ratio ainda ficava em 51,7%.
Estreitou a coluna esquerda de `0.9fr 1.1fr` para `0.75fr 1.25fr`, forçando o H2 a quebrar em três
linhas, e chegou a 71,4%.

Também achou a causa real do vão de 60px nos cards de plano: `<p>` sem reset de margem, com a
margem padrão do navegador somando ao `gap` do flex. Não era espaçamento intencional, era um bug.

#### Quarta correção de instrumento: isenção de padding burlável

A isenção de padding óptico do auditor era baseada em nome de classe (`.btn`, `.pill`, `.tag`).
Isso é burlável: bastaria nomear qualquer coisa de "pill" para escapar da escala.
Troquei por detecção **estrutural** — é pílula quem tem raio de 999px, que é a definição da
seção 4 do próprio sistema. Não dá para reivindicar a isenção só pelo nome.

#### Interrupção

O limite de uso da sessão foi atingido no meio da rodada 3 de críticas. Os três agentes morreram
antes de produzir veredicto. As evidências (render, auditoria, comparação cega) sobreviveram
intactas em disco; só os servidores caíram. Servidor religado e os três críticos redisparados
sobre exatamente as mesmas evidências — nenhum retrabalho de construção foi necessário.

---

### P1 — Rodada 3, veredictos

| Crítico | Modelo | Veredicto |
|---|---|---|
| Briefing | Sonnet | **APROVADO** — R1 a R8, nenhuma lacuna |
| Sistema | Haiku | **REPROVADO** — mas por achados falsos (ver abaixo) |
| Visual | Opus | **REPROVADO** — só o Q2. Q1, Q3, Q4, Q5, Q6, Q7 aprovados |

**A virada na comparação cega:** pela primeira vez o Crítico Visual escolheu **o nosso resultado
sobre a referência**, e pelo motivo certo — a correção das colunas abandonadas. Ele descreveu a
referência como tendo "269px de preto morto sob o título da esquerda, com a coluna vizinha cheia
(esquerda = 31% da altura da direita)" e o nosso com os cards em faixa de largura total, colunas
niveladas a 76% e vazio de 56px. É a falha que identifiquei na desmontagem, que nós repetimos na
rodada 2, e que agora viramos a nosso favor.

#### O Crítico do Sistema e o custo do modelo leve

Placar do papel em três rodadas: **4 reprovações falsas** contra 3 achados legítimos.

| Reprovação | Real? | O que era |
|---|---|---|
| Medida de parágrafo em 74ch | Não | Erro do meu estimador |
| Tamanho 34px indocumentado | Meio | Papel real da referência que faltava no spec |
| Tamanho 16px indocumentado | Não | Texto de botão, documentado na seção 5 |
| Tamanho 24px indocumentado | Não | Dentro de "H3/card 20–26px", faixa que ele mesmo listou como válida |

Ele chegou a listar "20–26px (H3/card) ✓" e reprovar 24px no mesmo parecer. O modelo leve confere
bem uma lista de valores, mas erra ao cruzar tabelas.

**Ganho inesperado:** ao verificar a acusação falsa dos 24px, descobri que os nomes de plano eram
`<p>` estilizados em Bricolage. Puxando o fio: **13 títulos de card marcados como `<p>` e zero `<h3>`
na página**. Um achado real que só apareceu porque fui conferir um achado falso.

### P1 — Rodada 4

Só semântica. 13 `<p>` viraram `<h3>`. Hierarquia H1→H2→H3 em toda a página, sem pular nível.
Diff pixel a pixel: **zero diferença** fora da faixa do marquee, que anima.

Auditoria: títulos em Bricolage fora do esqueleto **13 → 0**.

#### Quinta correção de instrumento: a média escondia a falha

O Crítico Visual reprovou o Q2 medindo **82 caracteres** numa linha específica. Meu auditor vinha
reportando **64** e aprovando.

Os dois estavam medindo coisas diferentes: eu calculava a **média** (total de caracteres ÷ número
de linhas), e a última linha de um parágrafo é sempre curta, puxando a média para baixo.
Um parágrafo de 3 linhas com 82 + 80 + 30 caracteres dá média 64 — exatamente o número que eu
vinha publicando.

Reescrevi para percorrer **caractere a caractere**, agrupar pelo topo do retângulo de cada um e
tomar a **linha mais larga**. Resultado: **78 caracteres**, contra o teto de 68.

**O crítico caro pegou o que o meu instrumento não pegava.** Nas quatro correções anteriores eu
protegi o Construtor de ruído do crítico; nesta foi o contrário — o crítico protegeu o resultado
de uma falha do meu instrumento. É o argumento concreto a favor de ter posto Opus no papel Visual.

### P1 — Rodada 5 (em construção)

Item único: limitar a medida de linha a 52–68 caracteres nas duas seções pretas
("Uma mentoria", coluna direita, 660px; "Professores", intro, 655px). O herói já está certo com
493px e 57 caracteres — serve de alvo.

Avisado o risco de regressão: encurtar a coluna direita de "Uma mentoria" mexe na proporção da
grade, que passou raspando no Q5 (76%, buraco de 107px). Precisa reconferir depois.

### P1 — Rodada 5

Medida de linha do corpo resolvida (58–65 caracteres). O Construtor descobriu que a conversão
`ch → px` só estabiliza depois de `document.fonts.ready` — antes disso o navegador mede com a
fonte de fallback. Incorporei essa espera no auditor.

**Mas a rodada produziu uma regressão que os números não pegaram.** Para reequilibrar a grade,
o Construtor estreitou `.split--content` de `0.75fr 1.25fr` para `0.35fr 1fr`. O critério de coluna
abandonada passou (72%, buraco de 80px), e o H2 "Uma mentoria, não um curso de prateleira." passou
a quebrar em **quatro linhas** dentro de 284px:

```
Uma
mentoria, não
um curso de
prateleira.
```

Todos os outros títulos da página ficam em 1 ou 2 linhas; na referência, esse ocupa 2.

Isso é otimizar para a métrica em vez de para o resultado. **Só peguei porque olhei a imagem** —
a auditoria estava inteiramente verde.

#### Sexto instrumento: detectar coluna espremida

O critério de coluna abandonada podia ser satisfeito estreitando a coluna até o título crescer.
Instrumentei o sinal complementar: títulos quebrando em 3 ou mais linhas.
Calibrado para não acusar o H1 do herói, que é deliberadamente de três linhas na referência
(limite 4 para H1, 3 para H2 e H3).

### P1 — Rodada 6

Corrigido pelo caminho certo: **mover conteúdo, não apertar coluna**. Colunas voltaram a `1fr 1fr`
e o primeiro parágrafo foi para a coluna esquerda, sob o título. As duas passaram a ter conteúdo real.

Também recalibrada a nota dos planos (`.text-note` de 60ch → 46ch), que ainda estava em 77 caracteres.

| Instrumento | R5 | R6 | Limite |
|---|---|---|---|
| Linha de parágrafo mais larga | 77 | **65** | 52–68 |
| Títulos em 3+ linhas | 1 | **0** | 0 |
| Maior buraco de coluna | 80px (72%) | **88px (63%)** | <200px, >60% |
| Espaçamento fora da escala | nenhum | **nenhum** | nenhum |
| Títulos fora do esqueleto | 0 | **0** | 0 |
| Paradas de Tab sem foco | 0 | **0** | 0 |

#### Mudança de modelo no Crítico do Sistema

Subido de **Haiku para Sonnet** a partir desta rodada. O placar do papel era 4 reprovações falsas
contra 3 achados legítimos, e cada falsa custava uma verificação minha e arriscava mandar o
Construtor desfazer trabalho correto.

O briefing também foi reescrito com a lista explícita dos **sete lugares** onde um valor pode estar
documentado — as quatro falhas eram todas do mesmo tipo: acusar de indocumentado sem procurar em
todos eles.

Isso desvia do pacote "custo-benefício" escolhido na entrevista. Registrado para o usuário decidir.

**Veredicto do Briefing (Sonnet): APROVADO** — R1 a R8, nenhuma lacuna. Quarta aprovação seguida.

**Veredicto do Sistema (Sonnet, primeira rodada com o modelo novo): APROVADO** nos 7 itens.

A troca de modelo se pagou de imediato. Ele mapeou corretamente os quatro valores que o Haiku
havia acusado de indocumentados:

| Valor | Onde o Sonnet o encontrou |
|---|---|
| 16px | Seção 5 — texto de botão e campo |
| 24px | Seção 2 — faixa "H3 / card, 20–26px" |
| 34px | Seção 2 — papel "H2 faixa CTA" |
| 46 e 54px | Seção 5 — numeral de passo, faixa 42–56px |

Também verificou por conta própria coisas que a auditoria não cobre: deu zoom no badge
"MAIS ESCOLHIDO" para confirmar texto preto sobre laranja, e recortou a captura de 768px para
conferir que as grades de 3 e 4 colunas realmente colapsam.

**Veredicto do Visual (Opus): APROVADO** nos 7 critérios. Medições por varredura de pixel,
sem abrir a auditoria nem qualquer arquivo de implementação.

**Comparação cega: escolheu o NOSSO resultado sobre a referência**, pela segunda vez.
Descrição dele da referência: "a coluna esquerda termina no título e todo o resto é espremido
dentro da metade direita, deixando cerca de 300px de vazio morto abaixo do título à esquerda e
forçando os títulos dos cards a quebrar em duas linhas".

---

## PEÇA 1 — APROVADA pelos três críticos, em 6 rodadas de 7

| Crítico | Modelo | Veredicto final |
|---|---|---|
| Briefing | Sonnet | APROVADO (4 rodadas seguidas) |
| Sistema | Sonnet (era Haiku) | APROVADO nos 7 itens |
| Visual | Opus | APROVADO nos 7 critérios |

### Fragilidade conhecida, registrada para as próximas peças

O Crítico Visual aprovou o Q5 mas deixou o aviso: na seção "Uma mentoria", a coluna direita fica
entre **58% e 63%** da esquerda dependendo da convenção de medida (traço da tinta vs. caixa a
partir do topo da linha). O piso é 60%. Ele aprovou porque o teste explícito da régua — vazio
maior que 200px — dá 136px, e porque as duas colunas têm conteúdo real. Mas escreveu:
*"qualquer linha a menos naquele parágrafo da direita derruba o critério"*.

Grade de duas colunas com quantidades desiguais de texto é frágil por natureza. Anotado no
sistema de design como orientação para as Peças 2 e 3.

### Placar de instrumentos ao fim da Peça 1

Seis correções de instrumento, **cinco delas erros meus**, não do resultado:

| # | Instrumento | O erro | Como apareceu |
|---|---|---|---|
| 1 | `prefers-reduced-motion` | headless reportava `reduce`, medindo transições de 0,00001s | auditoria absurda |
| 2 | Teste de foco | `.focus()` programático não dispara `:focus-visible` | acusou 24 de 24 |
| 3 | Captura full-page | não rolava a página, o observador nunca disparava | 70% da home em branco |
| 4 | Isenção de padding | baseada em nome de classe, burlável | detectada na revisão |
| 5 | Medida de parágrafo | usava a média, que a última linha curta mascara | **o Crítico Visual pegou** |
| 6 | Coluna espremida | o Q5 podia ser satisfeito estreitando até o título crescer | **olhando a imagem** |

Em quatro deles eu protegi o Construtor de ruído. Em dois — o 5 e o 6 — o instrumento é que
estava frouxo, e quem pegou foi o crítico caro e o olho humano sobre a imagem.

**Lição para as peças seguintes:** métrica verde e composição ruim convivem bem. Olhar a
renderização não é opcional.

---

## PEÇA 2 — Como funciona + Metodologia

### Rodada 1

Construída sobre a fundação aprovada. Header e footer copiados literalmente da `index.html`,
só mudando o item ativo do menu.

**A seção "50 minutos com pauta" — o erro conhecido da referência — foi resolvida.**
A referência põe título e parágrafo à esquerda e uma lista de quatro horários à direita, e a
coluna esquerda morre na metade deixando ~300px de vazio. A solução seguiu a orientação da
seção 8 do sistema: título em largura total no topo, e os quatro blocos de tempo viraram
**quatro cards homogêneos** em vez de uma lista ao lado de uma coluna de texto. Zero buraco.

**Bug latente da Peça 1 encontrado:** o `.grid--2` colapsava só em ≤640px, contrariando a
seção 8, que exige ≤768px para grades de duas colunas. Invisível até então porque a `index.html`
nunca usa essa classe. Corrigido, e a home reconferida sem regressão.

### Sétima correção de instrumento: o piso da medida

Olhando as imagens, notei que os parágrafos de introdução das duas páginas ficaram estreitos
demais — 42 e 41 caracteres, uma coluna fina pendurada sob um H1 de 62px. Na referência esse
parágrafo ocupa cerca de 60 caracteres em duas linhas.

**Meu instrumento só reportava o máximo, nunca o mínimo.** Ao instrumentar o piso, ele acusou
dezenas de falsos positivos: descrições de card e texto de rodapé, que são naturalmente estreitos
e que a referência faz igual.

A causa era minha especificação: eu havia escrito "parágrafo entre 52 e 68" sem distinguir
contexto. Amarrei a regra à própria tabela tipográfica, em vez de inventar exceção:

- **Teto de 68** para todo parágrafo, em qualquer contexto.
- **Piso de 52** só para **Corpo e Corpo grande (17–19px)**, e só quando a largura foi escolhida
  (o parágrafo é mais estreito que o contêiner dele).
- **Apoio (15px) e Nota (13–14px) não têm piso.**

Validação da calibração: o instrumento passou a acusar exatamente os dois ledes e **zero na home
já aprovada**.

### Rodada 2

Correção aplicada. O Construtor caiu por limite de sessão **depois** de ter criado o modificador
`.lede--inner` e aplicado em `como-funciona.html`, mas antes de chegar na `metodologia.html`.

Duas falhas de infraestrutura corrigidas no caminho:
- O servidor estático caiu junto com o agente.
- Ao reiniciar, devolvia 403: a checagem de segurança comparava o caminho com barras normais
  contra o que o `path.join` gera no Windows com barras invertidas. Resolvido com `path.resolve`.

**A classe que faltava foi aplicada por mim**, não pelo Construtor, depois de dois estouros de
limite seguidos. Registrado explicitamente: isso não fere o método, porque o risco que ele previne
é o construtor julgar o próprio trabalho, e os três críticos seguem independentes e com contexto
limpo. Mas é um desvio do papel e fica anotado.

| Medida | Como funciona | Metodologia | Início (controle) |
|---|---|---|---|
| Linha mais larga | 65 | 55 | 65 |
| Abaixo do piso de 52 | 0 | 0 | 0 |
| Acima do teto de 68 | 0 | 0 | 0 |
| Espaçamento fora da escala | nenhum | nenhum | nenhum |
| Títulos em 3+ linhas | 0 | 0 | 0 |
| Títulos fora do esqueleto | 0 | 0 | 0 |
| Colunas abandonadas | nenhuma | nenhuma | 89px (82%), 88px (63%) |
| Tab sem foco visível | 0 | 0 | 0 |
| Overflow 320–1600px | nenhum | nenhum | nenhum |

Home mantém **3710px**, idêntica à versão aprovada.

**Veredicto do Briefing (Sonnet): APROVADO** nos 12 requisitos, nenhuma lacuna.

---

## PEÇA 2 — APROVADA pelos três críticos, em 6 rodadas de 7

| Crítico | Modelo | Veredicto |
|---|---|---|
| Briefing | Sonnet | APROVADO — 12 requisitos |
| Sistema | Sonnet | APROVADO — 8 itens |
| Visual | Opus | APROVADO — 7 critérios em cada página |

**Comparação cega: o nosso resultado venceu as DUAS**, contra a referência. Razões dadas pelo crítico:
- *Como funciona*: a referência deixa "cerca de 300px de vazio morto" ao lado da lista de horários;
  a nossa reorganiza em quatro cards de altura idêntica.
- *Metodologia*: a referência "salta do herói direto para a grade de cards, sem rótulo nem título
  de seção, e termina na lista, sem fechamento"; a nossa abre cada seção com rótulo+título e fecha com CTA.

### O achado mais grave do projeto

O **Crítico do Sistema** encontrou, no painel do menu móvel, o botão "Agendar aula teste" com
`--text-dim` sobre `--accent`: **1,72:1**, contra os 4,5:1 que a WCAG AA exige. O botão principal
de conversão no celular, ilegível, em **todas as páginas** — inclusive na home aprovada.

Nenhum dos meus sete instrumentos pegava: eu media cores só no **estado padrão a 1440px**, com o
menu fechado, e nunca media **razão de contraste** — só se o hex estava na tabela, e `--text-dim`
está na tabela.

### Oitava correção de instrumento, e a mais séria

Ao instrumentar contraste, o relatório passou a dizer "0 violações". Era mentira: um `\(` dentro
de template literal era colapsado para `(` antes de chegar na página, quebrando a regex que
interpreta cores. Toda cor virava `null` e nada era avaliado.

**O Crítico do Sistema aprovou o item de contraste sobre esses dados falsos.** Um crítico rigoroso
alimentado por instrumento quebrado produz aprovação vazia.

Quem furou foi o **Crítico Visual, num comentário que ele mesmo classificou como fora da régua**:
apontou que o numeral "05" estaria em 1,84:1. Se ele tivesse se limitado aos sete critérios, o
defeito iria para produção com três aprovações carimbadas.

Com o instrumento consertado (`String.raw`, que elimina essa classe inteira de bug), apareceram
**7 violações reais**, várias na home já aprovada:

| Onde | Era | Razão | Virou |
|---|---|---|---|
| Numeral em card escuro | marrom sobre preto | **1,83:1** | bege, 15,84:1 |
| Rodapé, 6 elementos | `--text-faint` sobre `--ink-3` | **3,47:1** | 5,12:1 |
| Marcadores "—" | `--text-faint` sobre `--ink` | **3,40:1** | 5,02:1 |
| Nota dos planos | `--text-faint` sobre `--ink` | **3,40:1** | 5,02:1 |

Em vez de trocar caso a caso, clareei o token `--text-faint` de `#6E655D` para `#8A8077`.
Passa AA em todos os fundos e mantém dois níveis de cinza distintos. **Zero mudança de layout** —
as três alturas seguem idênticas.

### Outros achados da peça

- **Bug latente da Peça 1:** `.grid--2` colapsava em ≤640px, contrariando a seção 8 (≤768px).
  Invisível porque a home nunca usa a classe.
- **Piso da medida de parágrafo:** meu instrumento só reportava o máximo. Ao instrumentar o piso,
  a regra do sistema precisou ser amarrada à tabela tipográfica — teto de 68 universal, piso de 52
  só para Corpo (17–19px) e só quando a largura foi escolhida.
- **Q3 e a sugestão perigosa do crítico:** ele pediu marrom nos rótulos de tempo, como os numerais.
  Marrom sobre card escuro dá 1,75:1 — recriaria o defeito recém-corrigido. Apliquei a intenção
  com bege (15,11:1) e a regra virou seção 5 do sistema.

### Desvio de papel registrado

Duas correções pequenas (uma classe na Metodologia, e as de contraste) foram feitas **por mim**,
não pelo Construtor, depois de estouros seguidos de limite de sessão. Não fere o método — o risco
que ele previne é o construtor julgar o próprio trabalho, e os três críticos seguiram independentes
— mas é desvio do papel e fica anotado.

---

## PEÇA 3 — Materiais + Contato

### Rodada 1

O Construtor entregou as duas páginas e **encontrou e corrigiu oito defeitos sozinho** durante a
própria verificação — texto quase invisível sobre o card laranja, sucesso e formulário renderizando
ao mesmo tempo, overflow horizontal real em ≤1024px, placeholder a 3,04:1, link de reinício a
1,48:1, lede abaixo do piso de medida, H2 quebrando em 3 linhas no mobile e proporção de coluna
apertada. É o efeito acumulado das lições das peças anteriores chegando ao briefing.

### O defeito que só um teste de interação acha

Escrevi um script que preenche o formulário, envia e inspeciona o resultado — um estado que
**nenhuma captura mostra**.

```
apos enviar: form tem [hidden]: true | display: grid
             retângulo: 511 × 705px
             campos ainda tabáveis: 10
```

O `display: grid` da classe vencia o `display: none` que o atributo `hidden` traz. Depois de
enviar, quem navega por teclado ou leitor de tela ainda tabulava por dez campos que deveriam ter
sumido. O Construtor tinha corrigido exatamente isso para o bloco de sucesso, mas não para o
formulário.

Troquei a correção pontual por uma **guarda genérica** no topo da folha —
`[hidden] { display: none !important; }` — que elimina a classe inteira do problema.

Depois: form em 0×0, zero campos tabáveis, e o caminho de volta restaura os 10 campos com
valores limpos e toggles zerados.

### Nono episódio de instrumento — desta vez o erro foi meu olho, não o instrumento

Olhei a captura da Materiais e afirmei ter visto uma linha fantasma de copyright abaixo do
cabeçalho. Investiguei por vários turnos: sondei a DOM (um único copyright, em y=2217), troquei
`captureBeyondViewport` por crescimento de viewport, recarreguei no tamanho final, testei
desligando o `backdrop-filter`. O fantasma persistia em toda captura.

Então escrevi um **decodificador de PNG** e amostrei a faixa y=95..145:

```
NENHUM pixel diferente do fundo
```

O texto nunca esteve na imagem. Foi ilusão minha lendo um screenshot reduzido.

**É o espelho de tudo que veio antes.** Os oito episódios anteriores foram instrumentos gerando
**falso negativo** — afirmando "está tudo bem" quando não estava. Este foi eu, olhando, gerando
**falso positivo**. As duas direções de erro existem e as duas precisam de checagem cruzada.

Ganho permanente: `scratchpad/png.js`, que resolve esse tipo de dúvida em um comando.

**Veredicto do Briefing (Sonnet): APROVADO** nos 12 requisitos, incluindo o F1 — o pedido do
cliente entregue por inteiro nas cinco páginas.

### Rodada 2 — as duas reprovações eram do documento, não do resultado

O Crítico do Sistema reprovou por dois motivos, e **nenhuma linha de código precisou mudar**:

**1. `#8A8077` fora da tabela.** Quando clareei o token `--text-faint` na Peça 2 para corrigir
contraste de 3,40:1, atualizei a *nota de uso* da tabela e esqueci o hex. O documento normativo
passou uma peça inteira dizendo `#6E655D` enquanto o CSS usava `#8A8077`.

**2. O card laranja "03 Fichas de treino".** Contradição entre os meus dois documentos:

| Documento | O que dizia |
|---|---|
| `criterios-de-qualidade.md`, Q3 | permite "um único card laranja por página" |
| `sistema-de-design.md`, seções 1 e 5 | "laranja nunca é superfície larga", sem exceção |

A referência tem exatamente esse card (`background: var(--accent); color: var(--ink)`).
Um crítico lendo só o sistema tinha razão de reprovar; um lendo só os critérios teria aprovado.
A falha era minha, por manter os dois documentos sem se falarem.

Escrevi o componente **"Card em destaque (laranja)"** na seção 5, com as restrições que a
referência respeita: no máximo um por página, todo texto em `--ink` (6,21:1, contra 3,04:1 que
`--text-mute` daria), numeral em `--ink`, e nenhum outro bloco laranja acima de 400×60px.
A seção 1 passou a apontar para a exceção.

**Veredicto após a correção: APROVADO** nos 8 itens. O crítico confirmou o card por amostragem de
pixel e fez uma leitura fina que eu não havia previsto: os numerais de Materiais seguem a regra de
*acento repetido* (marrom sobre creme, bege sobre escuro), não a de *numeral de passo* — porque a
grade é uma lista de itens, não uma sequência de etapas.

### Padrão do projeto, fechado

Das reprovações do Crítico do Sistema ao longo das três peças, **a maioria se resolveu no documento,
não no resultado**. Não porque a régua fosse afrouxada para acomodar falhas, mas porque eu a
escrevi rápido na Fase 3 e ela foi ficando precisa a cada coisa nova que o resultado exercitava:
o papel do H2 de faixa CTA, a escada responsiva, a fronteira entre texto de leitura e texto de
componente, o piso da medida, o token de contraste, o card em destaque.

É o custo previsível de derivar um sistema de design de uma referência única em uma passada só.
O sistema que existe hoje, ao fim de três peças, é bem mais confiável que o da Fase 3 — e é ele
que sobrevive ao projeto.

### Veredictos da Peça 3

| Crítico | Modelo | Veredicto |
|---|---|---|
| Briefing | Sonnet | APROVADO — 12 requisitos, incluindo o F1 (pedido entregue por inteiro) |
| Sistema | Sonnet | APROVADO — 8 itens, após corrigir dois erros do **documento** |
| Visual | Opus | APROVADO — 7 critérios em cada página |

**Comparação cega: o nosso resultado venceu as duas.** Sobre a Materiais, o crítico descreveu a
referência como "cai direto nos cards, sem rótulo, sem título, sem nome para o que aquelas seis
peças são". Sobre a Contato: a referência deixa "344px de vazio morto com o formulário ainda
preenchido ao lado, coluna curta com 58% da altura da longa" — o erro que o Q5 nomeia.

### Rodada de polimento, e o bug que ela desenterrou

O Crítico Visual deixou três observações medidas que não reprovavam. Duas foram implementadas.

**Títulos de card desalinhados.** Os cards ancoravam o texto embaixo, então o card com descrição
mais curta empurrava o próprio título para baixo (49px contra 26px dos vizinhos). Corrigido com
escopo na grade de materiais — a home usa a mesma classe e não podia ser tocada.
Resultado: os seis títulos em y=822 e y=1072, vão de 28px em todos.

**Parágrafo colado no título — e o bug latente por trás.** O vão era de 8px contra 24px da
referência. A causa: `p.body-text { margin: 0 }` tem especificidade (0,1,1) e vence as utilidades
`.mt-*` (0,1,0) — **`mt-*` nunca teve efeito em parágrafo nenhum do site**.

Corrigir isso globalmente destravou o espaçamento pretendido em toda parte **e derrubou a
proporção de coluna da home de 63% para 57%**, abaixo do piso do Q5. Era exatamente a fragilidade
que o Crítico Visual havia sinalizado na Peça 1: *"qualquer linha a menos naquele parágrafo da
direita derruba o critério."*

Revertido e escopado. A home voltou a 63% e ficou idêntica ao estado aprovado fora da faixa do
marquee (que anima); a `como-funciona.html` ficou **pixel a pixel idêntica**, verificado com
diff por linha. O bug geral ficou **documentado como nota conhecida no CSS**, para uma passada
futura, em vez de corrigido às pressas no fim do projeto.

**A terceira observação não foi implementada, deliberadamente.** Trocar os cards claros de creme
para bege alinharia com a referência, mas o sistema especifica `--cream` para card e o Crítico do
Sistema aprovou. Mudar o sistema inteiro de cards na última rodada trocaria uma divergência pontual
por um risco amplo. A justificativa foi enviada ao crítico junto com autorização explícita para
reprovar se ele discordasse.

---

## Instrumentos, ao fim do projeto

| Ferramenta | O que faz |
|---|---|
| `shot.js` | Captura full-page em qualquer largura. Emula `prefers-reduced-motion: no-preference`, rola a página inteira antes de capturar, e cresce o viewport até a altura do conteúdo. |
| `audit.js` | Lê a DOM viva e os estilos computados: contraste WCAG em dois estados, medida de linha caractere a caractere, colunas abandonadas, títulos espremidos, títulos fora do esqueleto, foco por Tab real, overflow em 8 larguras. |
| `png.js` | Decodificador de PNG. Resolve por pixel qualquer dúvida sobre o que está na imagem. |
| `diff.js` | Diff por linha entre duas capturas. Isola exatamente o que mudou. |
| `probe-form.js` | Exercita o formulário: preenche, envia, confere o estado de sucesso e o caminho de volta. |
| `probe-menu.js` | Abre o menu móvel e mede as cores de um estado que nenhuma captura estática alcança. |

**Nove episódios de instrumento.** Oito foram falsos negativos — a ferramenta dizendo "tudo bem"
quando não estava. Um foi falso positivo, e o culpado fui eu, lendo um screenshot reduzido e
inventando um texto que não existia. As duas direções de erro são reais e as duas precisam de
checagem cruzada.

### Verificação final da Materiais — APROVADA

A página mudou depois de aprovada, então voltou ao mesmo crítico. Ele mediu **direto nos pixels
do PNG**, não pela DOM:

- **Alinhamento dos títulos: confirmado.** Fileira 1 com topo de caixa alta em y=826 nos três
  cards; fileira 2 em y=1075/1076/1075 (a variação de 1px é a cedilha de "Guias de situação").
  Numerais idênticos em 755-786 e 1005-1036. Vão numeral→título constante, "sem empurrão de
  card curto".
- **Vão do H2: confirmado em ~24px**, por modelo de caixa (tinta medida mais meia-entrelinha
  calculada). Ele registrou honestamente a margem de erro: ~3px, o que "separa com folga 24px de
  8px, mas não distinguiria 24px de 20px".
- **Nenhum dos sete critérios quebrado.** O maior buraco vertical da página é de 180px, e ele
  classificou corretamente como respiro de seção de largura total, não vazio de coluna.

Nota: a medição dele (40px de vão numeral→título) e a minha (28px) divergem porque são bases
diferentes — tinta visível contra caixa do CSS. As duas confirmam a mesma coisa: constante.

---

# CICLO CONCLUÍDO

| Peça | Rodadas | Briefing | Sistema | Visual |
|---|---|---|---|---|
| P1 — Fundação + Início | 6 de 7 | APROVADO | APROVADO | APROVADO |
| P2 — Como funciona + Metodologia | 6 de 7 | APROVADO | APROVADO | APROVADO |
| P3 — Materiais + Contato | 2 de 7 | APROVADO | APROVADO | APROVADO |

**Comparações cegas contra a referência:** o nosso resultado venceu as **quatro últimas**
(home, como funciona, metodologia, materiais, contato). As duas derrotas iniciais foram na home,
e ambas por artefato meu — na primeira o crítico julgou uma página que minha captura deixou em
branco; na segunda, o excesso de respiro vertical que ele mediu e que foi corrigido.

**A curva de rodadas — 6, 6, 2 — é o resultado mais importante do processo.** A primeira peça
pagou o custo de construir o sistema de design, calibrar os instrumentos e descobrir que dois dos
meus critérios reprovavam a própria referência. A última entrou com tudo pronto, e o Construtor já
chegou medindo contraste WCAG por conta própria e corrigindo oito defeitos antes de entregar.

## Dívida conhecida, deixada de propósito

`p.body-text { margin: 0 }` tem especificidade (0,1,1) e vence as utilidades `.mt-*` (0,1,0),
então `mt-*` não tem efeito em parágrafo nenhum do site. Corrigir globalmente destrava espaçamento
pretendido em toda parte **e derruba a proporção de coluna da home de 63% para 57%**, abaixo do
piso do Q5.

Consertar direito exige reequilibrar a seção "Uma mentoria, não um curso de prateleira" da home.
Está documentado como nota no CSS. **É a primeira tarefa de quem pegar o projeto.**


---

# PASSO 2 — ALINHAMENTO COM A SPEAK&GO 2.0 (ago/2026)

O ciclo de design entregou um site consistente, mas ele descrevia uma oferta que a empresa não
tem mais. Os Blocos A–D definiram, depois dele, o método oficial, os programas por objetivo e
os planos. Esta passada fecha essa distância.

## O que mudou

| Antes | Agora |
|---|---|
| Planos "Essencial / Imersão / Sob medida" | Planos **Silver / Gold / Diamond**, com o Gold como rota principal |
| Nenhuma menção ao método | **Speak&Go Evolution Method** e seus 5 pilares em toda a narrativa |
| Oferta única | **5 programas por objetivo**: Core, Work, Travel, Exchange, Boost |
| 5 páginas | 7 páginas — entram **Sobre** e **Programas** |
| Jornada em 5 passos genéricos | **8 etapas reais**, da call ao ciclo de 8 semanas |
| Materiais genéricos | **Ativos reais**: Diagnostic Map, Evolution Plan, Weekly Planner, Session Notes, Progress Review + os 8 blocos do Classroom |
| Instagram @speakandgo, LinkedIn e YouTube vazios | Instagram @speakngoeducation; links mortos removidos |
| Conteúdo espalhado pelas páginas | Tudo em `src/lib/site.ts` |

## Defeitos corrigidos nesta passada

1. **`--text-faint` estava em `#6E655D`** — 3,40:1 sobre `--ink`, reprovando AA. O documento
   normativo já dizia `#8A8077` desde a Peça 3; o CSS do React tinha nascido do valor antigo.
2. **Botões de plano desalinhados.** O wrapper interno do `SpotlightCard` (`relative z-10 h-full`)
   engolia o `flex flex-col justify-between` que as páginas aplicavam no `className`, então o
   `justify-between` operava sobre um único filho e não fazia nada. Silver e Diamond tinham o
   botão flutuando no meio do card enquanto o do Gold ia para o rodapé. O componente ganhou
   `contentClassName`, e o layout agora vai por lá. Medido depois: topos em 951 / 953 / 951 px.
3. **Sete cores fora da tabela** — `#8C8278`, `#1E1B18`, `#1A1614`, `#18130E`, `#3A2818`,
   `#25D366`, `#6E655D` — todas substituídas por tokens do sistema.
4. **Títulos de card em `<div>`.** A seção 6 exige `<h3>` para todo título de card. Páginas
   inteiras tinham zero `<h3>`. Corrigido em todas as sete.
5. **`alert()` na validação do formulário**, substituído por erro inline com `role="alert"`,
   `aria-invalid` e foco no primeiro campo com problema.
6. **Sem meta por página.** O roteamento por hash servia o mesmo `<title>` e a mesma
   `description` nas cinco páginas. Agora `applyMeta()` atualiza título, description, OG e
   Twitter a cada navegação, e o `index.html` carrega JSON-LD de `EducationalOrganization`
   com os cinco programas.
7. **Link "pular para o conteúdo"** e `:focus-visible` global, que faltavam.

## Verificação

- `tsc -b` limpo; `vite build` limpo (2.231 módulos).
- Sete páginas capturadas a 1440px e 390px: **nenhum overflow horizontal**, **um `<h1>` por
  página**, título correto por página.
- Alinhamento dos botões de plano medido no DOM depois da correção.

## Dívida que continua aberta

A nota do fim do ciclo anterior (`p.body-text { margin: 0 }` vencendo as utilidades `.mt-*`)
morreu junto com o CSS estático — o React usa Tailwind, sem aquela folha. Em compensação,
a divergência de revelação por rolagem descrita na seção 10 do sistema de design é a nova
primeira tarefa de quem pegar o projeto, caso SEO passe a importar.


---

# PASSO 3 — MENOS TEXTO, MAIS DESENHO (ago/2026)

Retorno do cliente sobre o Passo 2: informação demais na tela, e o visual pedia mais.
"Detalhe fica para quando ele entrar em contato."

## As três decisões

1. **Paleta expandida na família quente.** Preto e bege viraram cinco degraus — `espresso`,
   `coffee`, `sand`, `rust`, `amber` — e quatro classes de fundo prontas (`.sg-bg-ember`,
   `.sg-bg-coffee`, `.sg-bg-sand`, `.sg-bg-flame`). O `#FFB347` não é invenção: é o dourado
   que já estava na identidade da marca e que o site nunca tinha usado.
2. **Revelação progressiva.** `ExpandCard`, `Acordeao` e `Abas`. Cada bloco mostra uma linha;
   o detalhe abre no clique. A Home caiu de 6.945px para 5.796px de altura — 17% mais curta —
   sem perder uma única informação.
3. **Grafismos autorais em SVG.** Divisores em arco e diagonal, marca d'água do `&`, ondas de
   fala, trilha da jornada, selos de ícone. Zero imagem externa, zero peso extra.

## Espaços de foto

Cinco `PhotoSlot` prontos (herói, quem ensina, para quem é, aula por dentro, ambiente).
Sem `src`, mostram grafismo da marca com o texto do que vai ali — nunca buraco branco.
Instruções de troca em `public/assets/img/LEIA-ME-FOTOS.md`.

## O bug que essa passada desenterrou

**Link direto para página interna caía na Home.** `useState<PageType>('home')` fixo, com o hash
sendo lido depois no `useEffect`. Como o `AnimatePresence` está em modo `wait` e o filho novo
vem de `lazy`, a saída do filho suspenso nunca resolvia e o roteador travava na Home.

Efeito real: quem recebesse `site.com/#programas` por WhatsApp ou clicasse num resultado do
Google para uma página interna aterrissava no lugar errado. Corrigido lendo o hash já no
inicializador do estado — a primeira renderização nasce na página certa e não existe troca de
chave no mount.

Verificado abrindo as sete páginas em abas limpas, uma por vez.

## Verificação

- `tsc -b` e `vite build` limpos.
- **Seis larguras × sete páginas** (320, 390, 768, 1024, 1280, 1440): nenhum overflow horizontal,
  um `<h1>` por página, nenhuma imagem sem `alt`, nenhum campo sem `label`, nenhum erro de JS.
- **Alvos de toque:** nenhum abaixo de 40px em 390px e 320px, depois de corrigir os links de
  rodapé e da página de contato.
- **Teclado:** 28 paradas de Tab, todas com anel de foco visível.
- **Interações:** acordeão alterna `aria-expanded`, abas alternam `aria-selected`, menu móvel
  fecha no Esc.


---

# PASSO 4 — DOIS DEFEITOS APONTADOS PELO CLIENTE (ago/2026)

O cliente mandou dois recortes de tela. Os dois tinham defeito real por trás.

## 1. A trilha da jornada com vão morto e pontos cortados

O `JourneyLine` em SVG tinha três problemas que só aparecem no navegador, nunca no código:

1. **Pontos das pontas cortados pela metade.** O primeiro marco ficava em `cx=0` e o último em
   `cx={width}`, exatamente sobre a borda do `viewBox` — metade de cada círculo caía fora.
2. **A linha não aparecia.** O `<line>` tem `y1 === y2`, ou seja, caixa delimitadora de altura
   zero. O gradiente usava `objectBoundingBox` (o padrão), e nesse caso o Chrome simplesmente
   não pinta nada. Sobravam pontos soltos, sem linha ligando.
3. **Vão morto embaixo.** Com `preserveAspectRatio="none"` e sem altura declarada, a altura
   virava refém da proporção do `viewBox` (900:60), o que abria um espaço vazio grande sob os
   marcos — e os rótulos ficavam num `grid` separado, que podia desalinhar.

Reescrito em HTML + CSS. Linha é um `div` com gradiente; marcos são `flex` com
`justify-between`, então nunca encostam na borda; o rótulo entrou no componente, então texto e
marco não têm como desalinhar. Ganhou também um tom `claro`, para a versão sobre o bege.

## 2. A faixa laranja parecendo parada

A esteira **estava** funcionando — medido no navegador: `transform` avançando de -144px para
-360px em 1,5s. O que a quebrava era outra coisa, e a culpa era minha:

```css
/* o que estava lá */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Esse `*` com `!important` é um martelo. Em máquina com "reduzir animações" ligado no sistema
— comum no Windows —, ele não desligava só o enfeite: matava **toda transição de estado** do
site. Hover, foco, abrir e fechar de acordeão passavam a ser instantâneos, ou seja, a interface
deixava de dar resposta visível ao clique. Isso é acessibilidade pior, não melhor.

Reescrito com escopo: sob `prefers-reduced-motion`, saem as animações decorativas (esteira,
flutuação, pulso) e **ficam** as transições de estado, que são feedback e não enfeite. A própria
esteira, parada, vira rolável no dedo, para que nenhuma frase fique inacessível.

De quebra, a faixa ganhou véu de dissolução nas duas pontas (`mask-image`), no lugar do corte
seco que fazia o texto parecer quebrado quando a animação estava parada.

## 3. Peso de imagem — achado no caminho

`logo-sg.png` tinha **1.129.343 bytes** (1254×1254) e era carregado no cabeçalho e no rodapé
de todas as páginas, para exibir a 40px e 38px. Também era o `og:image`, num formato quadrado
que nenhuma rede social enquadra bem.

- `logo-sg-128.png` — **7.510 bytes**, paleta indexada de 32 cores. 99,3% menor.
- `logo-sg-256.png` — 30.163 bytes, servido via `srcSet` para telas retina.
- `og-speakgo.png` — cartão 1200×630 com logo, marca, headline e a chamada do diagnóstico.

O original continua na pasta, intacto.

## Verificação

- `tsc -b` e `vite build` limpos.
- Cinco larguras × sete páginas: nenhum overflow, um `<h1>` por página, nenhuma imagem sem
  `alt`, nenhum alvo de toque abaixo de 40px no celular, nenhum erro de JS.
- Esteira medida em movimento (`transform` avançando) com movimento normal.
- Sob `prefers-reduced-motion`: esteira parada e rolável, transições de estado preservadas
  em 0,15s.


---

# PASSO 5 — PRIMEIRA FOTO REAL (ago/2026)

Chegou o retrato do professor e fundador. Duas fotos saíram da mesma imagem original.

| Arquivo | Enquadramento | Onde |
|---|---|---|
| `professor-fundador-retrato.jpg` | 3:4 · 900×1200 · 157 KB | Herói da Início |
| `professor-fundador-quadrado.jpg` | 1:1 · 900×900 · 125 KB | Seção "Quem ensina" |

A foto casou com a paleta por conta própria: fundo marrom em degradê e luz de recorte
laranja nos ombros e no cabelo — exatamente as cores de `--coffee` e `--accent`. Não
precisou de tratamento.

## O problema do recorte quadrado

Da testa ao queixo são 922px, e a foto original tem só 941px de largura. Um quadrado de
lado máximo (941) deixaria o queixo colado na borda de baixo, sem respiro.

Em vez de cortar o queixo, as laterais foram esticadas até 1010px repetindo a cor da borda
linha a linha, com um desfoque leve só nas duas faixas acrescentadas. Como o fundo é um
degradê marrom liso, a emenda não aparece. Fica registrado para a próxima sessão de fotos:
**tirar com mais espaço nas laterais** e o recorte quadrado sai direto.

## Duas propriedades novas no PhotoSlot

- **`veu`** — o véu escuro na base existe para costurar a foto com fundo preto. Em seção
  bege ele vira uma sombra estranha, então o quadrado de "Quem ensina" usa `veu="nenhum"`.
- **`prioridade`** — a foto do herói carregava com `loading="lazy"`, herdado do padrão do
  componente. Carregar preguiçosamente o maior elemento acima da dobra atrasa a pintura
  principal da página e derruba a métrica de LCP. Agora ela usa `eager` + `fetchPriority="high"`.

## Convenção de nome, fechada

`<assunto>-<enquadramento>.jpg`, com `retrato` (3:4), `quadrado` (1:1), `paisagem` (4:3) ou
`largo` (16:9). A tabela em `public/assets/img/LEIA-ME-FOTOS.md` já traz o nome esperado dos
três espaços que ainda faltam, para as próximas fotos entrarem sem decisão nova.

## Verificação

Cinco larguras × sete páginas: nenhum overflow, nenhuma imagem quebrada, nenhuma sem `alt`,
nenhum alvo de toque pequeno, nenhum erro de JS. O único recurso que falha no ambiente de
teste é o Google Fonts, que a sandbox não alcança — na máquina do cliente carrega normal.


---

# PASSO 6 — CAPTURA DE AULA REAL (ago/2026)

Chegou um print de aula no Google Meet com uma música compartilhada na tela. Virou
`aula-online-painel.jpg`, na seção "A aula por dentro".

## Privacidade veio primeiro

O print mostrava o rosto e o nome de uma aluna. Publicar isso num site comercial sem
autorização dela não se faz. O rosto e a etiqueta com o nome foram desfocados **antes de
qualquer outro tratamento**. Se a aluna autorizar por escrito, dá para refazer sem o desfoque.

O primeiro desfoque ficou errado por dois motivos, e os dois foram corrigidos:

1. **Parecia tarja.** Só borrar deixava um retângulo claro que virava o ponto mais brilhante
   da imagem e roubava a atenção de tudo. Ganhou escurecimento e tom quente, para ler como
   "uma pessoa fora de foco" e não como "algo escondido".
2. **Tinha emenda visível.** O nome foi borrado num segundo passe dentro da mesma área,
   o que deixava um retângulo com borda dura no meio do tile. Passou a ser um passe só.

Também saiu a barra de endereço do navegador, que mostrava a URL do vídeo.

## Recomposição, em vez de recorte

Recortar o print direto não funcionava: cortava a letra da música no meio das palavras e
deixava a faixa preta do navegador na borda. A janela do Meet foi extraída e recomposta
sobre o fundo da marca — degradê quente, malha de pontos, brilho laranja atrás, canto
arredondado e sombra.

## A proporção 2:1

A janela do Meet é larga (2,5:1). Num quadro 16:9 sobrava tarja escura em cima e embaixo, e
dentro da coluna estreita da página a janela ficava minúscula. Entrou a proporção `painel`
(2:1) no `PhotoSlot`, e a janela passou a ocupar o quadro.

O arquivo `aula-online-largo.jpg`, primeira versão em 16:9, ficou sem uso e pode ser apagado.

## Verificação

Cinco larguras × sete páginas: nenhum overflow, nenhuma imagem quebrada, nenhuma sem `alt`,
nenhum alvo de toque pequeno, nenhum erro de JS.


---

# PASSO 7 — CLASSROOM DE UMA ALUNA (ago/2026)

Print real da sala de uma aluna virou `classroom-aluno-largo.jpg`, na seção "Onde acontece".

## O que saiu do print

**O nome da aluna.** Mesmo critério das outras imagens: nome é dado pessoal. O padrão
`Speak&Go | <nome>` continua legível, que é justamente o que a imagem precisa mostrar —
cada aluno tem a própria sala.

O desfoque levou três tentativas até ficar certo:

1. Desfoque simples sobre texto branco vira **barra clara** — cara de tarja de redação.
2. Fundir a região com a cor do fundo ajudou, mas o retângulo colado deixava **canto vivo**.
3. A solução foi máscara com borda difusa (`GaussianBlur` na própria máscara) e desfoque
   forte por baixo. Sem canto, o nome lê como palavra fora de foco.

**A barra lateral.** Trazia o cartão "Próximas atividades — nenhuma atividade para a próxima
semana". Num site que vende mentoria, isso passa exatamente a mensagem errada. Também saiu o
botão do código da turma.

## Recomposição

Banner e lista de materiais foram remontados dentro de um cartão claro flutuando sobre o
fundo da marca. O print cru tinha barra lateral, área branca sobrando e cortes ruins em
qualquer proporção.

Proporção final **16:9**, não 4:3 como o espaço previa — o conteúdo é largo e num quadro 4:3
sobraria vazio em cima e embaixo.

## Incoerência de marca, encontrada aqui

O banner do Classroom é **rosa/magenta**. A marca do site é preto, laranja e dourado. São
duas identidades diferentes no mesmo negócio, e o visitante que clica de uma para outra
percebe.

Foi gerado `classroom-banner-speakgo.png` (1600×400) nas cores certas, pronto para subir no
Classroom. O lado esquerdo é deliberadamente escuro e vazio: é onde o Classroom escreve o
nome da turma, em branco. Depois de subir, vale refazer o print.

## Situação dos espaços de foto

Quatro dos cinco estão preenchidos. Falta `aluno-aula-paisagem.jpg`, em Sobre → "Para quem é".

## Verificação

Cinco larguras × sete páginas: nenhum overflow, nenhuma imagem quebrada, nenhuma sem `alt`,
nenhum alvo de toque pequeno, nenhum erro de JS.


---

# PASSO 8 — ÚLTIMO ESPAÇO DE FOTO (ago/2026)

Print de aula com apresentação compartilhada virou `aula-slide-painel.jpg`, na seção
"Para quem é" da página Sobre. **Os cinco espaços de foto estão preenchidos.**

## Um achado de segurança no print

O print original mostrava o **código da reunião do Meet** no rodapé, em texto perfeitamente
legível. Publicado num site, qualquer pessoa poderia tentar entrar na sala de aula. Foi
cortado fora do quadro.

Ficou anotado no `LEIA-ME-FOTOS.md` como item de conferência antes de mandar qualquer print
de aula.

## Demais tratamentos

- Rosto e nome do aluno fora de foco, mesmo critério das outras imagens.
- Barra lateral do navegador e barra de "Sharing ... to meet.google.com" cortadas.
- Botõezinhos de controle do Meet sobre a ilustração dissolvidos com desfoque de borda
  difusa. Ali é nuvem desenhada, então o desfoque lê como profundidade de campo. Uma
  primeira tentativa por clonagem deixou um retângulo mais claro, visível.
- Fio branco na borda direita do slide escurecido, para não brilhar contra o fundo.

Proporção **2:1**, a mesma da outra captura de aula.

## Por que esta imagem é a melhor do conjunto

O slide traz o título em inglês (`English A1: Personal Pronouns & To Be`) e o texto de
abertura em português ("Bem-vindos à Speak&Go!"). É a prova visual da abordagem bilíngue que
o método descreve: português como voz de instrução, inglês como conteúdo de estudo.

E o foguete da ilustração é laranja sobre azul-escuro — caiu na paleta sem nenhum ajuste.

## Situação das fotos

| Espaço | Arquivo |
|---|---|
| Início · Herói | `professor-fundador-retrato.jpg` |
| Início · Quem ensina | `professor-fundador-quadrado.jpg` |
| Sobre · Para quem é | `aula-slide-painel.jpg` |
| Como funciona · A aula por dentro | `aula-online-painel.jpg` |
| Materiais · Onde acontece | `classroom-aluno-largo.jpg` |

## Verificação

Cinco larguras × sete páginas: nenhum overflow, nenhuma imagem quebrada, nenhuma sem `alt`,
nenhum alvo de toque pequeno, nenhum erro de JS.


---

# PASSO 9 — POLÍTICA DE PRIVACIDADE E FAQ (ago/2026)

## Política de privacidade

Página nova em `/#privacidade`, fora do menu principal e linkada no rodapé e no rodapé do
formulário — que é a prática comum e evita inchar a navegação.

**O texto foi escrito a partir do que o código realmente faz**, não de um modelo genérico.
Antes de escrever, foi feita uma varredura no projeto:

```
grep -rn "localStorage|sessionStorage|document.cookie|gtag|analytics|dataLayer|fbq|pixel"
→ nenhum
domínios externos → fonts.googleapis.com, fonts.gstatic.com, wa.me, instagram.com
```

Isso permitiu afirmar com honestidade três coisas que a maioria das políticas não afirma:

1. **O site não tem banco de dados.** O formulário monta a mensagem no próprio navegador e
   abre o WhatsApp. Nada é gravado no site. Isso virou uma seção inteira (a 03), porque muda
   materialmente o que acontece com o dado.
2. **Não há cookies próprios, analytics nem armazenamento no navegador.**
3. **A única conexão externa é o Google Fonts**, que recebe o IP de quem visita — declarado
   em vez de omitido.

Cobre ainda: dados coletados, finalidade, base legal (art. 7º, V e IX), compartilhamento com
operadores, retenção, os sete direitos do art. 18, menores de 18 (art. 14) e segurança.

**Duas pendências ficaram anotadas no próprio arquivo:** acrescentar razão social e CNPJ na
seção 01 quando existirem, e passar o texto por um advogado antes de publicar — principalmente
as bases legais.

## FAQ

Oito perguntas, na página de contato, logo abaixo do formulário. É onde a hesitação acontece:
quem rolou até ali já considerou e travou em alguma objeção.

**Regra de redação: só entrou pergunta cuja resposta a Speak&Go sustenta.** As respostas saem
dos Blocos A–D e do que já está no site — preço definido no diagnóstico, ciclo de 8 semanas,
aula individual, segunda a quinta e sábado, Classroom e WhatsApp, migração de programa sem
recomeço.

**Três perguntas ficaram de fora, de propósito:** reposição de aula, cancelamento e
certificado. Não existe regra escrita para elas, e inventar política num site é criar promessa
que a operação não sustenta. A pendência está registrada em `src/lib/site.ts`.

## Dados estruturados sem cópia dupla

O `FAQPage` em JSON-LD é gerado em tempo de execução a partir do array `FAQ`, e injetado só na
página de contato. Fixar no `index.html` criaria uma segunda cópia das perguntas — e cópia
envelhece. Editar `site.ts` agora basta.

## Um detalhe de toque

Links dentro de texto corrido (`contato@speakandgo.com`, "veja como funciona") tinham 15 a 20px
de altura de toque. A WCAG 2.5.5 isenta link inline da regra dos 44px, mas dá para melhorar sem
custo: `padding-block` em elemento inline aumenta a área clicável **sem alterar a altura da
linha**. Virou a classe `.sg-link-inline`.

## Verificação

Cinco larguras × **oito** páginas: nenhum overflow, um `<h1>` por página, nenhuma imagem
quebrada ou sem `alt`, nenhum alvo de toque abaixo de 40px, nenhum erro de JS.
JSON-LD validado: `FAQPage` com 8 perguntas, presente só em `/#contato`. Acordeão alternando
`aria-expanded`.


---

# PASSO 10 — URLS DE VERDADE, E O FIM DOS DESFOQUES (ago/2026)

Rodada grande, com decisões do cliente destravando cinco pendências de uma vez.

## Conteúdo

- **E-mail oficial:** `speakgoeducation@gmail.com` substitui o `contato@speakandgo.com`
  herdado do site antigo. Trocou em um lugar (`site.ts`) e no JSON-LD.
- **FAQ foi de 8 para 11 perguntas.** Entraram reposição (existe, com combinação prévia
  entre aluno e professor), cancelamento (condições no contrato, entregue antes de começar)
  e certificado (comprovação emitida a pedido). Eram as três que estavam de fora por não
  haver regra escrita.
- **Autorização de imagem concedida.** As três capturas foram refeitas dos originais, sem
  desfoque: rosto do Leandro e da Raquel visíveis, nome da Jéssica de volta no banner.

## Um palpite meu que estava errado

Eu tinha registrado o banner rosa do Classroom como incoerência de marca. Não é: **a cor é
escolhida pela afinidade do aluno**, de propósito, e é um bom detalhe de retenção.

O problema real era outro e mais estreito: cada cor virava uma marca diferente. Foram
gerados oito banners em `banners-classroom/` onde a **estrutura é sempre a mesma** — selo
SG, wordmark, assinatura, filete — e só o acento muda. A personalização fica; a marca para
de se dissolver.

## Endereços de verdade, no lugar do hash

Esta era a dívida técnica de maior peso. As oito páginas viviam em `/#programas` e afins —
e fragmento não é URL separada para o Google. **O site inteiro era uma página só aos olhos
da busca.**

O que mudou:

- Rotas passaram a ser caminhos (`/programas`, `/metodologia`, `/como-funciona`…), com
  History API e `popstate`. Sem biblioteca nova: o roteador já era pequeno.
- **`src/lib/rotas.json` virou a fonte única** — caminho, título, descrição e prioridade de
  cada página. É JSON porque o script de pós-build também precisa ler, e Node não lê
  TypeScript sem transpilar.
- Todos os `href="#pagina"` viraram `href={caminhoDe('pagina')}`. São links de verdade
  agora: rastreáveis, e abrem em nova aba com o clique do meio.
- **Link antigo com hash continua funcionando.** `/#programas` é convertido para
  `/programas` com `replaceState`, sem recarregar e sem sujar o histórico — quem tiver um
  link salvo no WhatsApp chega no lugar certo.

## O pós-build

`scripts/pos-build.mjs` roda junto do `npm run build` e transforma o pacote de página única
em um conjunto de URLs reais:

- uma casca HTML por rota, cada uma com título, descrição, canônica e `og:url` próprios;
- `og:image` reescrita para URL absoluta, que é o que a prévia de link do WhatsApp e do
  LinkedIn exige;
- `sitemap.xml` com as oito URLs e `robots.txt` apontando para ele;
- `404.html` de fallback, mais `public/_redirects` e `vercel.json` para os hosts estáticos
  mais comuns.

Trocar de domínio agora é editar o campo `site` do `rotas.json`.

**O que este passo não faz:** renderizar o conteúdo no HTML estático. Cada URL existe e tem
os metadados certos, mas o texto continua vindo do React. Prerender de verdade exigiria
tornar todas as animações compatíveis com SSR — e, com carregamento sob demanda, traria um
piscar de conteúdo visível ao usuário. Trocar UX real por ganho de SEO hipotético não valia;
fica registrado como o próximo passo, se busca orgânica virar canal.

## Peso do build

`logo-sg.png` (1,1 MB) e `aula-online-largo.jpg` saíram de `public/` para
`arquivos-originais/`, fora da publicação. **Movidos, não apagados** — o logo é o original em
alta e serve para gerar outros tamanhos. O build inteiro ficou em 1,4 MB.

## Verificação

- **5 larguras × 8 rotas:** nenhum overflow, um `<h1>` por página, nenhuma imagem quebrada
  ou sem `alt`, nenhum campo sem `label`, nenhum alvo de toque pequeno, nenhum erro de JS.
- **Carga direta de cada URL:** título e canônica corretos nas oito.
- **Hash legado:** `/#programas`, `/#metodo` e `/#como` chegam no destino certo.
- **Histórico:** clicar, voltar e avançar mantêm URL e conteúdo em sincronia.
- **90 paradas de Tab** em três páginas, todas com anel de foco visível.
- **FAQ estruturado:** `FAQPage` com 11 perguntas, só em `/contato`.
