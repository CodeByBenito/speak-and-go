# Sistema de Design — Speak&Go

Documento normativo. O **Crítico do Sistema** avalia aderência a este arquivo, e só a ele.
Tudo aqui é verificável olhando o resultado renderizado.

---

## 1. Cores

A paleta cresceu. A versão original permitia dois fundos — preto e bege — e o resultado ficou
correto e monótono. Hoje a família é quente e tem cinco degraus de profundidade, do preto ao creme.

### Núcleo — o que sempre foi a marca

| Token | Hex | Papel |
|---|---|---|
| `--accent` | `#FF5A00` | Laranja Speak&Go. Ação, destaque, eyebrow |
| `--accent-hover` | `#FF7C33` | Somente `:hover` |
| `--amber` | `#FFB347` | Dourado da identidade. Segundo acento, degradês |
| `--ink` | `#0E0D0C` | Preto base |
| `--beige` | `#F0E7D8` | Bege claro |
| `--cream` | `#FFFDF9` | Branco. Card sobre bege |
| `--brown` | `#5A3620` | Texto de apoio sobre claro |

### Profundidade — os fundos

| Token | Hex | Papel |
|---|---|---|
| `--ink-2` | `#151312` | Card elevado sobre preto |
| `--ink-3` | `#0B0A09` | Rodapé |
| `--espresso` | `#17100B` | Fundo de seção quente e escuro |
| `--coffee` | `#241610` | Fundo de seção quente, um degrau acima |
| `--rust` | `#B23F0A` | Laranja profundo. Degradês e texto sobre bege |
| `--sand` | `#E4D6C0` | Bege escurecido. Alterna com o bege |

### Linhas e texto

| Token | Hex | Papel |
|---|---|---|
| `--line-dark` | `#241F1B` | Borda sobre preto |
| `--line-warm` | `#3A251A` | Borda sobre fundo quente |
| `--line-light` | `#DCD0BD` | Borda sobre bege |
| `--text-dim` | `#C9BFB2` | Parágrafo sobre escuro |
| `--text-mute` | `#9B9188` | Texto secundário |
| `--text-faint` | `#8A8077` | Legenda. 5,02:1 sobre `--ink` |

### As quatro classes de fundo

Nenhuma seção escolhe cor à mão. Toda seção usa uma destas quatro, definidas em `index.css`:

| Classe | O que é | Onde usar |
|---|---|---|
| `.sg-bg-ember` | Preto que aquece para baixo, com aura laranja no topo | Herói, seções principais escuras |
| `.sg-bg-coffee` | O degrau quente entre o preto e o bege | Seções escuras intermediárias |
| `.sg-bg-sand` | Bege que escurece para baixo | Seções claras |
| `.sg-bg-flame` | Faixa laranja viva com âmbar | Marquee e chamadas curtas |

Somadas a `.sg-grain` (grão) e `.sg-dots` / `.sg-dots-dark` (malha de pontos), dão textura
sem custo de imagem.

**Ainda proibido:** cor de fundo fora dessas quatro classes, sombra colorida que não seja o
halo laranja do card em destaque, e qualquer hex fora das tabelas acima.

### Contraste mínimo

- Texto de corpo sobre fundo escuro: `--text-dim` ou mais claro. Nunca `--text-faint` em parágrafo.
- Texto sobre `--accent` ou `.sg-bg-flame`: sempre `--ink`. Nunca branco sobre laranja.
- **Todo texto atinge WCAG AA**: 4,5:1 normal, 3:1 para texto grande (≥24px, ou ≥19px em peso 700),
  em todos os estados — painel do menu móvel aberto incluído.

---

## 2. Tipografia

Duas famílias. Nenhuma terceira.

- **Display:** `Bricolage Grotesque`, peso **800** apenas.
- **Texto:** `Karla`, pesos **400 / 500 / 700**.

### Escala (desktop)

| Papel | Tamanho | Família | line-height | letter-spacing |
|---|---|---|---|---|
| H1 home | 76px | Bricolage 800 | 0.94 | −0.035em |
| H1 interna | 62px | Bricolage 800 | 0.98 | −0.035em |
| H2 | 44px | Bricolage 800 | 1.02 | −0.03em |
| H2 faixa CTA | 34px | Bricolage 800 | 1.1 | −0.03em |
| H3 / card | 20–26px | Bricolage 800 | 1.15 | −0.02em |
| Corpo grande | 19px | Karla 400 | 1.6 | 0 |
| Corpo | 17–18px | Karla 400 | 1.6 | 0 |
| Apoio | 15px | Karla 400 | 1.5 | 0 |
| Eyebrow | 12px | Karla 500 | 1 | **≥ 0.16em**, `uppercase` |
| Nota | 13–14px | Karla 400 | 1.5 | 0 |

### Escada responsiva

A tabela acima é a escala **desktop**. Abaixo de 1024px os títulos descem por estes degraus,
e nenhum outro valor é permitido:

| Papel | ≥1025px | ≤1024px | ≤520px |
|---|---|---|---|
| H1 home | 76px | 56px | 40px |
| H1 interna | 62px | 44px | 34px |
| H2 | 44px | 34px | 28px |

Corpo, apoio, eyebrow e nota não mudam de tamanho por breakpoint.

**Fronteira com a seção 5.** Esta tabela governa o texto de leitura: títulos, parágrafos,
eyebrows e notas. O texto **dentro de componentes interativos** — rótulo de botão (16px ou 14px),
label de formulário (13px) e valor de campo (16px) — é definido pela seção 5 e não precisa
constar aqui. Antes de acusar um tamanho de indocumentado, procure-o nas duas tabelas
desta seção **e** na seção 5.

**Fora desta escala, por especificação:** o numeral de passo (42–56px) é um componente e segue
a seção 5, não esta tabela. É a única exceção.

**Regras duras:**
- Nenhum título em Karla.
- **Bricolage é exclusiva de títulos e numerais.** Se um texto está em Bricolage 800 e funciona
  como título de um bloco, ele precisa ser um elemento de heading de verdade (`<h2>`, `<h3>`),
  não um `<p>` ou `<span>` estilizado. Título de card é `<h3>`.
  A única exceção é o numeral de passo, que é ornamento e não entra no esqueleto do documento.
- Todo eyebrow é `uppercase` + `letter-spacing ≥ 0.16em` + 12px.
- **O teto de 68 caracteres por linha vale para todo parágrafo**, em qualquer contexto.
  Nenhum texto ocupa os 1240px.
- **O piso de 52 vale só para Corpo e Corpo grande** (17–19px), e só quando a largura foi
  escolhida — isto é, quando o parágrafo é mais estreito que o contêiner dele.
  Um parágrafo de introdução em 42 caracteres está espremido ao lado de um H1 de 62px.
- **Apoio (15px) e Nota (13–14px) não têm piso.** São textos curtos, limitados pelo card ou
  pela coluna onde vivem, e ficam naturalmente mais estreitos. Uma descrição de card em
  30 caracteres está correta.
- Nenhum texto abaixo de 12px em qualquer breakpoint.

---

## 3. Grade e espaçamento

- Container: `max-width: 1240px`, padding lateral **40px** (desktop), **24px** (≤768px).
- Padding vertical de seção: **88px** desktop / **64px** tablet / **48px** mobile.
- Escala de espaçamento — usar **apenas** estes valores:
  `4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64, 88` px.
- A escala governa **espaçamento de layout**: margem, gap, padding de seção, padding de card.
- **Exceção:** o padding interno de botões, pílulas e campos de formulário é óptico e segue
  a tabela de componentes da seção 5, não a escala.
- Gap entre cards de uma mesma grade: **16px** ou **20px**. Nunca outro valor.
- Padding interno de card: **≥ 28px** (desktop), **≥ 20px** (mobile).

---

## 4. Raios

Três faixas, por função. Nenhum canto vivo (`0`) em superfície.

| Elemento | Raio |
|---|---|
| Botão, tag, pílula, badge | `999px` |
| Card, painel, caixa de seção | `14px`–`22px` |
| Input, select, textarea | `12px` |
| Logo | `10px` |

---

## 5. Componentes

### Botão primário
Fundo `--accent`, texto `--ink`, peso 700, raio 999px, padding `17px 30px` (16px) ou `12px 20px` (14px).
Hover: fundo `--accent-hover`, texto continua `--ink`.

### Botão secundário
Fundo transparente, borda `1px solid #3A322B` (sobre preto), texto `--cream`, mesmo raio e padding.
Hover: borda `--cream`.

### Card sobre preto
Fundo `transparent` ou `--ink-2`, borda `1px solid --line-dark`, raio 14–18px.

### Card sobre bege
Fundo `--cream`, **sem borda**, raio 16–18px.

### Eyebrow
`<p>` ou `<span>` 12px, uppercase, tracking ≥0.16em.
Cor: `--accent` sobre fundo preto; `--brown` sobre fundo bege.

### Card em destaque (laranja)

**No máximo um por página.** É a única exceção à regra "laranja nunca é superfície larga" da seção 1,
e existe na referência — é o recurso que marca um item entre iguais numa grade.

- Fundo `--accent`, raio 14–22px, sem borda.
- **Todo** texto dentro dele é `--ink`: título, descrição e numeral. Nunca `--cream`,
  nunca `--text-mute` (daria 3,04:1). Com `--ink` a razão é 6,21:1.
- O numeral dentro deste card é `--ink`, não `--accent` nem `--brown` — as duas cores do
  numeral de passo pressupõem fundo neutro.
- Não acumule: se a página já tem um card laranja, nenhum outro bloco laranja acima de
  400×60px é permitido.

### Acento repetido em lista ou grade

Marcador que se repete item a item — rótulo de tempo, sinal de lista, bullet — **não usa laranja**.
Quatro marcadores laranja somados ao eyebrow da seção estouram o teto de 4 marcas por dobra do Q3.

- Sobre fundo **bege ou creme**: use `--brown`.
- Sobre fundo **preto ou card escuro**: use `--beige`. Marrom sobre escuro dá 1,75:1 e é proibido.

O laranja fica reservado ao **eyebrow da seção** e ao **botão de ação primária**.

### Numeral de passo
Bricolage 800, 42–56px, cor `--accent` (ou `--brown` quando o card já for bege).

### Campo de formulário
Fundo `--cream`, borda `1px solid --line-light`, raio 12px, padding `15px 18px`, texto 16px `--ink`.
`:focus` → `border-color: --accent` + `outline: 2px solid rgba(255,90,0,.35)`.
Label acima: 13px, peso 700, uppercase, tracking 0.06em, cor `--brown`.

---

## 6. Estados e acessibilidade

- **Todo** elemento interativo tem `:hover` **e** `:focus-visible` distintos.
- `:focus-visible` = anel `2px solid --accent` com `outline-offset: 3px`. Nunca `outline: none` sem substituto.
- Área de toque mínima de 44×44px em elementos clicáveis **em telas ≤768px**. Em desktop,
  onde o alvo é o cursor, links de navegação e de rodapé podem ser menores.
- Toda `<img>` tem `alt`. Todo `<input>` tem `<label>` associado por `for`/`id`.
- Um único `<h1>` por página. Hierarquia de heading sem pular nível.
- **O esqueleto do documento reflete o que se vê.** Todo título de card ou de sub-bloco é um
  `<h3>` dentro do `<h2>` da sua seção. Uma página cheia de cards não pode ter zero `<h3>`.
- `<nav>`, `<header>`, `<main>`, `<footer>`, `<section>` semânticos. A página ativa no menu carrega `aria-current="page"`.

---

## 7. Movimento

- Duração entre **200ms e 600ms**. Nada abaixo de 200ms, nada acima de 600ms.
- Easing único: `cubic-bezier(.2,.7,.3,1)`.
- Transições permitidas: `color`, `background-color`, `border-color`, `opacity`, `transform`.
  **Proibido** animar `width`, `height`, `top`, `left`.
- Toda animação respeita `@media (prefers-reduced-motion: reduce)` desativando movimento.
- **Revelação por rolagem é aprimoramento progressivo.** O conteúdo é visível por padrão no CSS.
  O JavaScript adiciona uma classe na raiz (ex.: `.js`) que *então* habilita o estado inicial oculto.
  Se o JS falhar, não carregar, ou o observador nunca disparar, a página continua legível.
  Conteúdo nunca depende de um evento de rolagem para existir.
- Marquee da home: velocidade constante, `linear`, loop sem salto visível.

---

## 8. Responsividade

Breakpoints: **1024px**, **768px**, **520px**.

- Nenhuma barra de rolagem horizontal em **nenhuma** largura entre 320px e 1600px.
- Grades de 3 ou 4 colunas colapsam para 2 em ≤1024px e para 1 em ≤640px.
- Grades de 2 colunas colapsam para 1 em ≤768px.
- **Grade de 2 colunas com texto desigual é frágil.** Se uma coluna leva título e a outra leva
  parágrafos, a proporção de altura entre elas oscila a cada quebra de linha e escorrega para
  fora do piso de 60% sem aviso. Prefira: título em largura total acima, colunas só com conteúdo
  de mesma natureza abaixo — ou distribua texto real nas duas colunas.
  **Nunca** resolva o desequilíbrio estreitando uma coluna até o título dela crescer:
  isso troca um vazio por um título picado, e o resultado piora.
- Tamanhos de título seguem a **escada responsiva** da seção 2. Nenhum valor fora dela.
- Menu vira botão hambúrguer com painel em ≤860px.

---

## 9. Estrutura de arquivos

O site migrou de HTML estático para **React + Vite + Tailwind v4**. A régua das seções 1 a 8
continua valendo integralmente; muda só onde o código mora.

```
index.html                     Casca, meta tags e JSON-LD
src/main.tsx                   Ponto de entrada
src/App.tsx                    Roteamento por hash + meta por página
src/index.css                  Tokens da seção 1 + base + foco visível
src/lib/site.ts                CONTEÚDO INSTITUCIONAL — programas, planos, pilares, valores, contato
src/components/Header.tsx      Cabeçalho fixo (idêntico nas 7 páginas)
src/components/Footer.tsx      Rodapé (idêntico nas 7 páginas)
src/components/ui/             SpotlightCard, TiltCard, MagneticButton, Marquee
src/components/kokonutui/      FlowField, MorphicNavbar
src/pages/HomePage.tsx         Início
src/pages/SobrePage.tsx        Sobre
src/pages/ProgramasPage.tsx    Programas e planos
src/pages/MetodologiaPage.tsx  Metodologia (Evolution Method)
src/pages/ComoFuncionaPage.tsx Como funciona (jornada)
src/pages/MateriaisPage.tsx    Materiais e ambiente
src/pages/ContatoPage.tsx      Contato
public/assets/img/logo-sg.png
```

**Regra de ouro do conteúdo.** Programas, planos, pilares, valores e dados de contato vivem
**só** em `src/lib/site.ts`. Nenhuma página redigita um nome de plano ou um número de WhatsApp.
Mudou a oferta, mudou um arquivo.

**Navegação.** Seis itens de menu (Início, Sobre, Programas, Metodologia, Como funciona,
Materiais) mais o botão persistente de ação, que aponta para Contato. Contato não é item de menu:
é a ação. O menu vira hambúrguer em ≤1024px, não mais em ≤860px — com seis itens, 860px apertava.

---

## 10. Divergências conhecidas e deliberadas

Duas coisas neste código não seguem a régua ao pé da letra, por decisão:

**Gradientes no herói e nos cards.** A seção 1 proíbe gradiente de qualquer tipo. O herói usa
duas auras radiais laranja de baixa opacidade e o `SpotlightCard` usa um radial que segue o
cursor. Não são fundo de seção — são atmosfera sobre `--ink`, e o fundo continuar preto sólido
mantém o Q4 (o ritmo de faixas). A troca foi consciente: o site ganhou profundidade sem perder
o alternado preto/bege.

**Revelação por rolagem via `motion`.** A seção 7 exige que o conteúdo seja visível por padrão
no CSS e só fique oculto sob uma classe que o JS adiciona. O `whileInView` do `motion` faz o
contrário: aplica `opacity: 0` inline e revela depois. Para o usuário real não muda nada, mas
significa que **o conteúdo abaixo da dobra depende do JS**. Se um dia o site precisar de SEO
mais forte ou de renderização no servidor, é o primeiro ponto a resolver.



---

## 11. Elementos gráficos

Vivem em `src/components/brand/graphics.tsx`. Tudo SVG inline: escala sem perder nitidez,
herda a cor do contexto, não pesa no carregamento e não depende de arquivo externo.

| Componente | O que é | Onde usar |
|---|---|---|
| `ArcDivider` | Curva suave entre duas seções | Transição preto → bege e volta |
| `SlantDivider` | Corte diagonal seco | Transição com mais energia |
| `AmpersandMark` | O `&` da marca virando marca d'água | Canto de seção, dentro de card escuro |
| `SpeechWaves` | Ondas concêntricas — a fala saindo | Apoio de herói e de placeholder |
| `JourneyLine` | Cinco marcos ligados por uma linha | Representa o ciclo do método |
| `IconBadge` | Selo arredondado que envolve um ícone | Programa, pilar, item de lista |
| `PhotoSlot` | Espaço de foto com placeholder digno | Ver `public/assets/img/LEIA-ME-FOTOS.md` |
| `Eyebrow` | O rótulo que abre toda seção | Início de cada seção |

**Ícones** vêm de `lucide-react`, mapeados em `src/components/brand/icons.tsx`. Nenhuma página
importa ícone direto: pede pela chave (`bussola`, `maleta`, `aviao`…). Trocar o desenho de um
conceito é mudar uma linha.

**Fotos.** `PhotoSlot` sem `src` mostra um grafismo da marca com o texto do que vai ali —
nunca um buraco branco. Com `src`, aplica um véu quente por cima, para que qualquer foto
converse com a paleta.

---

## 12. Revelação progressiva

A regra de conteúdo do site: **a tela mostra uma ou duas linhas; o detalhe abre sob clique.**
Isso resolve duas coisas ao mesmo tempo — a página deixa de ser parede de texto e o
aprofundamento fica reservado para a conversa.

Três componentes, em `src/components/ui/disclosure.tsx`:

| Componente | Quando usar |
|---|---|
| `ExpandCard` | Grade de itens curtos que podem crescer. Pilares, princípios, ativos |
| `Acordeao` | Lista vertical onde só um item fica aberto. Jornada, programas |
| `Abas` | Alternativas mutuamente exclusivas. Os cinco programas na home |

Todos são acessíveis por teclado, com `aria-expanded`, `aria-controls` e `role="tab"` onde cabe.

**Onde o texto longo mora agora.** Em `src/lib/site.ts`, cada item tem `resumo` (uma linha, vai
para a tela) e `detalhe` (o que aparece ao abrir). Se um `resumo` passar de uma linha e meia
em 390px, ele não é resumo.

---

## 13. Mobile

- Menu vira **painel de tela cheia** em ≤1024px, com itens de 28px e alvos generosos.
  Fecha no Esc, trava a rolagem do fundo e tem `role="dialog"`.
- **Barra de ação fixa** no rodapé em ≤1024px, com o CTA principal e o WhatsApp.
  Some na própria página de contato, onde seria redundante.
- O rodapé reserva `pb-[76px]` para não ficar embaixo dessa barra.
- Alvo de toque mínimo de 44px em telas ≤768px, links de rodapé incluídos.
