/**
 * Speak&Go — camada única de conteúdo institucional.
 *
 * Regra de redação deste arquivo:
 *   `resumo`   = o que aparece na tela. Uma linha. Sempre.
 *   `detalhe`  = o que aparece quando o visitante clica para abrir.
 *
 * O site não despeja informação: ele convida. O aprofundamento de verdade
 * acontece na conversa, não na página.
 *
 * Fonte: Blocos A–D da estrutura oficial Speak&Go 2.0.
 */

/* ------------------------------------------------------------------ */
/* Contato                                                             */
/* ------------------------------------------------------------------ */

export const CONTATO = {
  whatsappNumero: '5571991614325',
  whatsappExibicao: '(71) 99161-4325',
  instagramHandle: '@speakngoeducation',
  instagramUrl: 'https://instagram.com/speakngoeducation',
  email: 'speakgoeducation@gmail.com',
} as const;

export const whatsappUrl = (mensagem?: string) =>
  mensagem
    ? `https://wa.me/${CONTATO.whatsappNumero}?text=${encodeURIComponent(mensagem)}`
    : `https://wa.me/${CONTATO.whatsappNumero}`;

/* ------------------------------------------------------------------ */
/* Marca                                                               */
/* ------------------------------------------------------------------ */

export const MARCA = {
  posicionamento: 'Mentoria de inglês com foco em conversação e vida real.',
  promessa: 'Usar o inglês com confiança na vida real.',
  assinatura: 'English for Real Life.',
  metodo: 'Speak&Go Evolution Method',
} as const;

/* ------------------------------------------------------------------ */
/* Os 5 pilares do método                                              */
/* ------------------------------------------------------------------ */

export type ChaveIcone =
  | 'bussola' | 'maleta' | 'aviao' | 'globo' | 'raio'
  | 'lupa' | 'rota' | 'video' | 'agenda' | 'grafico';

export interface Pilar {
  num: string;
  nome: string;
  resumo: string;
  detalhe: string;
  entrega: string;
  icone: ChaveIcone;
}

export const PILARES: Pilar[] = [
  {
    num: '01',
    nome: 'Diagnóstico',
    resumo: 'Antes de ensinar, entender onde você está.',
    detalhe:
      'Uma leitura do seu nível real de fala, das suas travas, da sua rotina e do seu prazo. É o que impede a jornada de começar no chute.',
    entrega: 'Diagnostic Map',
    icone: 'lupa',
  },
  {
    num: '02',
    nome: 'Plano de evolução',
    resumo: 'Você sabe para onde está indo.',
    detalhe:
      'O desenho do seu ciclo de 8 semanas: foco de cada bloco, habilidades prioritárias e os marcos que mostram que você avançou.',
    entrega: 'Evolution Plan',
    icone: 'rota',
  },
  {
    num: '03',
    nome: 'Aulas ao vivo',
    resumo: 'O lugar onde você fala — não onde você assiste.',
    detalhe:
      'Sessões individuais de prática, correção e construção de confiança. A parte mais longa de toda aula é a parte em que você fala.',
    entrega: 'Session Notes',
    icone: 'video',
  },
  {
    num: '04',
    nome: 'Planner semanal',
    resumo: 'A semana entre uma aula e outra também conta.',
    detalhe:
      'O que praticar, em que dia, com qual material. É o pilar que separa quem evolui de quem só aparece na aula.',
    entrega: 'Weekly English Planner',
    icone: 'agenda',
  },
  {
    num: '05',
    nome: 'Revisão de progresso',
    resumo: 'Evolução medida, não sentida.',
    detalhe:
      'A cada ciclo comparamos onde você estava e onde chegou, ajustamos o foco e definimos o próximo objetivo junto com você.',
    entrega: 'Progress Review',
    icone: 'grafico',
  },
];

/* ------------------------------------------------------------------ */
/* Programas — organizam o OBJETIVO                                    */
/* ------------------------------------------------------------------ */

export interface Programa {
  id: string;
  nome: string;
  nomeCurto: string;
  chamada: string;
  detalhe: string;
  paraQuem: string[];
  foco: string[];
  icone: ChaveIcone;
  principal?: boolean;
}

export const PROGRAMAS: Programa[] = [
  {
    id: 'core',
    nome: 'Speak&Go Core',
    nomeCurto: 'Core',
    chamada: 'Destravar o inglês e evoluir com consistência.',
    detalhe:
      'O programa central da Speak&Go, para quem quer desenvolver comunicação real com confiança e autonomia no dia a dia.',
    paraQuem: [
      'Já estudou antes e ainda trava para falar',
      'Quer construir uma rotina séria de evolução',
      'Precisa de direção e acompanhamento',
    ],
    foco: ['Speaking', 'Listening', 'Confiança'],
    icone: 'bussola',
    principal: true,
  },
  {
    id: 'work',
    nome: 'Speak&Go Work',
    nomeCurto: 'Work',
    chamada: 'Inglês para carreira, reuniões e entrevistas.',
    detalhe:
      'Para quem quer usar o idioma no trabalho com segurança e clareza — em reuniões, apresentações, entrevistas ou networking internacional.',
    paraQuem: [
      'Profissionais e empreendedores',
      'Quem se prepara para entrevistas em inglês',
      'Quem atende clientes internacionais',
    ],
    foco: ['Reuniões', 'Entrevistas', 'Apresentações'],
    icone: 'maleta',
  },
  {
    id: 'travel',
    nome: 'Speak&Go Travel',
    nomeCurto: 'Travel',
    chamada: 'Viajar com autonomia, sem tradutor na mão.',
    detalhe:
      'O inglês das situações reais de viagem: aeroporto, hotel, transporte, restaurante, compras e as conversas do caminho.',
    paraQuem: [
      'Quem tem viagem marcada',
      'Quem quer segurança para se virar fora',
      'Quem cansou de depender de tradutor',
    ],
    foco: ['Aeroporto', 'Hotel', 'Small talk'],
    icone: 'aviao',
  },
  {
    id: 'exchange',
    nome: 'Speak&Go Exchange',
    nomeCurto: 'Exchange',
    chamada: 'Preparação para intercâmbio ou viver fora.',
    detalhe:
      'Para quem vai passar uma temporada ou mudar de país e precisa de independência no idioma para a rotina, os estudos e a adaptação.',
    paraQuem: [
      'Futuros intercambistas',
      'Quem pretende morar fora',
      'Quem vai estudar ou trabalhar no exterior',
    ],
    foco: ['Rotina', 'Socialização', 'Adaptação'],
    icone: 'globo',
  },
  {
    id: 'boost',
    nome: 'Speak&Go Boost',
    nomeCurto: 'Boost',
    chamada: 'Reorganizar a base e voltar a evoluir.',
    detalhe:
      'Para quem já estudou inglês mas sente lacunas, travas ou dificuldade de sair do lugar. Um ciclo para desenferrujar com direção.',
    paraQuem: [
      'Quem sente que sabe, mas não sabe usar',
      'Quem acumulou lacunas ao longo dos anos',
      'Quem quer retomar com um plano',
    ],
    foco: ['Base', 'Vocabulário ativo', 'Fluidez'],
    icone: 'raio',
  },
];

/* ------------------------------------------------------------------ */
/* Planos — organizam a INTENSIDADE                                    */
/* ------------------------------------------------------------------ */

export interface Plano {
  id: string;
  nome: string;
  conceito: string;
  frequencia: string;
  resumo: string;
  entregas: string[];
  destaque?: boolean;
  selo?: string;
}

export const PLANOS: Plano[] = [
  {
    id: 'silver',
    nome: 'Silver',
    conceito: 'Consistência guiada',
    frequencia: '1 encontro por semana',
    resumo: 'Para manter o inglês vivo mesmo com a agenda apertada.',
    entregas: [
      'Prática guiada de conversação',
      'Conteúdo adaptado ao seu objetivo',
      'Correções e direcionamento individual',
    ],
  },
  {
    id: 'gold',
    nome: 'Gold',
    conceito: 'Evolução estratégica',
    frequencia: '2 encontros por semana',
    resumo: 'O ritmo que tira a maioria das pessoas da estagnação.',
    entregas: [
      'Plano de evolução personalizado',
      'Acompanhamento próximo na semana',
      'Correções práticas e suporte contínuo',
      'Tudo o que está no Silver',
    ],
    destaque: true,
    selo: 'Mais escolhido',
  },
  {
    id: 'diamond',
    nome: 'Diamond',
    conceito: 'Aceleração premium',
    frequencia: '3 encontros por semana',
    resumo: 'Para quem tem objetivo com data marcada.',
    entregas: [
      'Mentoria intensiva personalizada',
      'Metas mensais e ajustes contínuos',
      'Simulações reais do seu contexto',
      'Tudo o que está no Gold',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Valores                                                             */
/* ------------------------------------------------------------------ */

export interface Valor {
  num: string;
  titulo: string;
  resumo: string;
}

export const VALORES: Valor[] = [
  { num: '01', titulo: 'Inglês para a vida real', resumo: 'Situação real, vocabulário que se usa, conversa que acontece.' },
  { num: '02', titulo: 'Simplicidade', resumo: 'Aprender inglês não precisa ser complicado.' },
  { num: '03', titulo: 'Ensino personalizado', resumo: 'Cada aluno tem ritmo, objetivo e história próprios.' },
  { num: '04', titulo: 'Desenvolvimento humano', resumo: 'Falar inglês também é ganhar confiança.' },
  { num: '05', titulo: 'Evolução constante', resumo: 'Pequenos avanços frequentes, repetidos por meses.' },
];

/* ------------------------------------------------------------------ */
/* Perguntas frequentes                                                */
/* ------------------------------------------------------------------ */

/**
 * Só entram perguntas cuja resposta a Speak&Go realmente sustenta.
 * Nada de política inventada: reposição de aula, cancelamento e certificado
 * ficam de fora até existir uma regra escrita para elas.
 */
export interface Pergunta {
  id: string;
  pergunta: string;
  resumo: string;
  resposta: string;
}

export const FAQ: Pergunta[] = [
  {
    id: 'preco',
    pergunta: 'Quanto custa?',
    resumo: 'Depende do programa, do plano e da duração do ciclo.',
    resposta:
      'Não publicamos tabela porque a recomendação sai do diagnóstico: primeiro entendemos seu objetivo, seu nível real de fala e quanto tempo você tem por semana; só depois apresentamos a proposta. O diagnóstico é gratuito e não gera compromisso nenhum — se nada fizer sentido para você agora, a gente diz isso também.',
  },
  {
    id: 'tempo',
    pergunta: 'Em quanto tempo eu vou falar inglês?',
    resumo: 'Não existe prazo mágico — existe ciclo com marcos definidos.',
    resposta:
      'Qualquer promessa de "fluência em X meses" ignora seu ponto de partida, sua frequência e sua prática entre as aulas. O que a Speak&Go faz é trabalhar em ciclos de 8 semanas com marcos combinados desde o início, e medir no fim de cada ciclo o que avançou em fala, escuta e vocabulário. Você não fica adivinhando se está evoluindo.',
  },
  {
    id: 'ja-tentei',
    pergunta: 'Já fiz outros cursos e não deu certo. Por que aqui seria diferente?',
    resumo: 'Porque a ordem se inverte: você fala primeiro, a teoria vem depois.',
    resposta:
      'A maioria dos cursos ensina sobre inglês e espera que a fala apareça sozinha. Aqui você começa falando, mesmo com erro; o professor anota, devolve os ajustes e só então explica a regra — que chega com um contexto seu. Somam-se a isso duas coisas que curso de prateleira não tem: um plano individual em vez de apostila igual para todo mundo, e um planner que organiza a sua semana entre uma aula e outra.',
  },
  {
    id: 'rotina',
    pergunta: 'Quanto tempo preciso dedicar por semana?',
    resumo: 'Menos do que você imagina — mas com frequência.',
    resposta:
      'Além das aulas, você recebe o Weekly English Planner com a rotina já montada: o que praticar, em que dia, com qual material. São blocos curtos de prática, não horas de estudo. É justamente essa constância entre as aulas que separa quem evolui de quem só aparece uma vez por semana.',
  },
  {
    id: 'iniciante',
    pergunta: 'Sou iniciante e travo de vergonha. Serve para mim?',
    resumo: 'Serve — é literalmente o caso mais comum aqui.',
    resposta:
      'A aula é individual, então não existe turma para te julgar nem fila para esperar a sua vez de falar. A correção vem no momento certo, sem interromper você no meio da frase. Se o seu caso for de lacunas acumuladas depois de anos estudando, existe um programa específico para reorganizar a base antes de acelerar.',
  },
  {
    id: 'formato',
    pergunta: 'As aulas são individuais? Que dias vocês atendem?',
    resumo: 'Sempre individuais, de segunda a quinta e aos sábados.',
    resposta:
      'Toda aula é 1:1, ao vivo, por videochamada. Atendemos de segunda a quinta-feira e aos sábados — às sextas não temos aulas. O horário é combinado com a sua rotina, e a frequência depende do plano: um, dois ou três encontros por semana.',
  },
  {
    id: 'ferramentas',
    pergunta: 'Preciso instalar ou comprar alguma coisa?',
    resumo: 'Não. Videochamada, Google Classroom e WhatsApp.',
    resposta:
      'Não existe apostila para comprar nem plataforma paga para assinar. As aulas acontecem por videochamada, seus materiais ficam organizados numa sala exclusiva no Google Classroom, e o contato entre as sessões é direto com o professor pelo WhatsApp. Tudo o que você produz na jornada fica registrado na sua sala.',
  },
  {
    id: 'faltar',
    pergunta: 'E se eu precisar faltar? Tem reposição?',
    resumo: 'Tem, combinada antes com o professor.',
    resposta:
      'Imprevisto acontece e a gente sabe disso. A reposição existe e é acertada diretamente com o seu professor, com combinação prévia — avisando com antecedência, remarcamos o encontro. O que não dá é remarcar em cima da hora toda semana, porque aí a constância se perde e é justamente ela que faz a evolução acontecer.',
  },
  {
    id: 'cancelar',
    pergunta: 'Posso cancelar no meio do caminho?',
    resumo: 'Pode. As condições estão no contrato, e você lê antes de assinar.',
    resposta:
      'Ninguém fica preso aqui. As regras de cancelamento estão escritas no contrato que você recebe antes de começar — nada de cláusula escondida ou surpresa no meio do ciclo. Se em algum momento a Speak&Go deixar de fazer sentido para você, é só conversar com a gente.',
  },
  {
    id: 'certificado',
    pergunta: 'Vocês dão certificado?',
    resumo: 'Damos, quando você pedir.',
    resposta:
      'A comprovação do curso realizado fica disponível mediante solicitação — é só avisar quando precisar, seja para uma empresa, um processo seletivo ou um currículo. Vale dizer que o que abre porta de verdade é conseguir sustentar a conversa em inglês; o documento é o registro formal disso.',
  },
  {
    id: 'mudar',
    pergunta: 'Posso mudar de programa ou de plano no meio do caminho?',
    resumo: 'Pode, e sem recomeçar do zero.',
    resposta:
      'O programa organiza o objetivo e o plano organiza a intensidade — os dois podem mudar quando a sua vida muda. Quem entra para destravar o inglês em geral e depois marca uma viagem migra de programa sem trocar de professor e sem perder o acervo. O fim de cada ciclo é exatamente o momento de redefinir isso junto com você.',
  },
];
