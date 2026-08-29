# Fotos da Speak&Go

Os espaços de foto já existem no site. Enquanto uma imagem não chega, o espaço mostra
um grafismo da marca com o texto do que vai ali — nunca fica buraco branco.

## Convenção de nome

```
<assunto>-<enquadramento>.jpg
```

`assunto` em minúsculas, sem acento, separado por hífen.
`enquadramento` é um destes: `retrato` (3:4), `quadrado` (1:1), `paisagem` (4:3), `largo` (16:9), `painel` (2:1).

Exemplos: `professor-fundador-retrato.jpg`, `aula-online-largo.jpg`, `classroom-aluno-paisagem.jpg`.

## Situação de cada espaço

| Página | Onde | Enquadramento | Arquivo | Situação |
|---|---|---|---|---|
| Início | Herói | 3:4 retrato | `professor-fundador-retrato.jpg` | **pronto** |
| Início | Quem ensina | 1:1 quadrado | `professor-fundador-quadrado.jpg` | **pronto** |
| Sobre | Para quem é | 2:1 painel | `aula-slide-painel.jpg` | **pronto** |
| Como funciona | A aula por dentro | 2:1 painel | `aula-online-painel.jpg` | **pronto** |
| Materiais | Onde acontece | 16:9 largo | `classroom-aluno-largo.jpg` | **pronto** |

## Como ligar uma foto nova

1. Salve o arquivo nesta pasta com o nome da tabela acima.
2. Abra a página correspondente em `src/pages/`.
3. No `<PhotoSlot ...>`, troque `hint` por `src` e escreva um `alt` de verdade.

Antes:

```tsx
<PhotoSlot ratio="largo" hint="Captura de uma aula online" alt="Aula ao vivo da Speak&Go" />
```

Depois:

```tsx
<PhotoSlot
  ratio="largo"
  src="/assets/img/aula-online-largo.jpg"
  alt="Professor e aluna conversando em inglês durante uma aula ao vivo"
/>
```

## As propriedades do PhotoSlot

| Propriedade | Para que serve |
|---|---|
| `src` | Caminho da imagem. Sem ela, aparece o grafismo da marca |
| `alt` | Descrição da cena, em uma frase. **Não é enfeite** — é o que uma pessoa cega ouve e o que o Google lê |
| `ratio` | `retrato` 3:4 · `quadrado` 1:1 · `paisagem` 4:3 · `largo` 16:9 · `painel` 2:1 |
| `veu` | `escuro` (padrão) escurece a base para a foto casar com fundo preto. Use `nenhum` em seção bege |
| `prioridade` | Só para a foto acima da dobra. Carrega de imediato, em vez de esperar a rolagem |

## Recomendações técnicas

- **Formato:** `.jpg` para foto. `.webp` se quiser arquivo menor.
- **Tamanho:** 900px no lado maior já basta — o site nunca exibe mais que isso.
- **Peso:** abaixo de 200 KB. As duas fotos do professor têm ~130 KB e ~160 KB.
- **Luz:** luz quente combina com a paleta. Luz azulada briga com o laranja.
- **Fundo:** fundo escuro e liso funciona melhor que ambiente carregado.

## Sobre a captura de aula

`aula-online-largo.jpg` saiu de um print real de aula no Google Meet, com uma música
compartilhada na tela. O tratamento aplicado:

- **Sem desfoque.** As imagens rodaram um tempo com rosto e nome borrados, por não haver
  autorização. Com a autorização concedida, foram refeitas a partir dos originais.
- **Barra de endereço removida.** O print original mostrava a URL do vídeo no YouTube.
- **Janela recomposta sobre o fundo da marca**, com canto arredondado e sombra, em vez do
  print cru com a área preta do navegador em volta.
- **Sem véu escuro** (`veu="nenhum"`), porque a imagem já traz vinheta própria.

A proporção final é **2:1**, não 16:9: a janela do Meet é larga (2,5:1) e num quadro 16:9
sobrava tarja escura em cima e embaixo, que encolhia a imagem dentro da coluna.

Para as próximas capturas de aula, dá para repetir a receita: tire o print com a janela do
Meet visível, que o resto é tratamento.

> `aula-online-largo.jpg` foi a primeira versão, em 16:9, e ficou sem uso. Pode apagar.

## Sobre a captura com slide

`aula-slide-painel.jpg` saiu de um print de aula com apresentação compartilhada. Tratamento:

- **Sem desfoque**, com autorização do aluno.
- **Código da reunião removido.** O print original mostrava o código do Meet no rodapé, em
  texto legível. Qualquer pessoa que visse a imagem publicada poderia tentar entrar na sala.
  Confira sempre esse canto antes de mandar um print de aula.
- **Barra lateral do navegador e barra de compartilhamento** cortadas.
- **Botõezinhos do Meet sobre a ilustração** dissolvidos com desfoque — ali é nuvem, então
  some sem deixar remendo.

## Sobre a captura do Classroom

`classroom-aluno-largo.jpg` saiu de um print real da sala de uma aluna. Tratamento aplicado:

- **Nome da aluna visível**, com autorização dela. O padrão `Speak&Go | <nome>` é
  justamente o que a imagem precisa mostrar: cada aluno tem a própria sala.
- **Barra lateral removida.** Ela trazia o cartão "Próximas atividades — nenhuma atividade
  para a próxima semana", que num site de vendas passa a mensagem errada, e o botão do
  código da turma.
- **Página recomposta:** o banner e a lista de materiais foram montados dentro de um cartão
  claro, flutuando sobre o fundo da marca.

> **Correção de um palpite errado meu.** Eu tinha registrado o banner rosa como
> incoerência de marca. Não é: a cor do banner é escolhida pela afinidade do aluno,
> de propósito. A personalização fica — o que mudou é que agora existe um conjunto
> em `banners-classroom/` onde a estrutura Speak&Go é sempre a mesma e só o acento
> muda, de modo que a sala continua sendo "do aluno" sem deixar de ser da Speak&Go.

## Sobre os recortes prontos

As duas fotos do professor saíram da mesma imagem original.

No quadrado, a cabeça não cabia inteira: da testa ao queixo são 922 pixels e a foto
original só tem 941 de largura. Em vez de cortar o queixo, as laterais foram esticadas
repetindo a cor da borda linha a linha — como o fundo é um degradê marrom liso, a emenda
é invisível. Se um dia você refizer a foto, tire com mais espaço nas laterais e o recorte
quadrado sai direto.


---

## Se um dia precisar desfocar de novo

Ficou registrado o que funcionou, porque leva algumas tentativas para acertar:

1. **Desfoque simples sobre texto claro vira barra branca** — lê como tarja de redação
   e vira o ponto mais chamativo da imagem.
2. **Colar a região borrada de volta deixa canto vivo.** A máscara precisa ter a borda
   difusa (aplicar `GaussianBlur` na própria máscara, não só na imagem).
3. **Rosto pede escurecimento junto.** Só borrar deixa uma mancha clara; borrar,
   escurecer e puxar para o tom quente faz ler como "pessoa fora de foco".
