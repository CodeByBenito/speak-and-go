import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';
import MagneticButton from '@/components/ui/magnetic-button';
import { Acordeao } from '@/components/ui/disclosure';
import { ArcDivider, AmpersandMark, PhotoSlot, Eyebrow } from '@/components/brand/graphics';
import { caminhoDe } from '@/lib/rotas';

interface ComoFuncionaPageProps {
  onNavigate: (page: string) => void;
}

const ease = [0.2, 0.7, 0.3, 1] as const;
const surge = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease },
};

/** As oito etapas — resumo de uma linha na tela, detalhe sob clique. */
const etapas = [
  {
    id: 'e1',
    etiqueta: 'Etapa 01 · 30 min, grátis',
    titulo: 'Conversa de diagnóstico',
    resumo: 'Uma parte em português, uma parte em inglês.',
    conteudo:
      'Entendemos seu momento, seu nível real de fala e o seu objetivo. Ao final recomendamos o programa e o plano que fazem sentido — ou dizemos que ainda não é a hora.',
  },
  {
    id: 'e2',
    etiqueta: 'Etapa 02',
    titulo: 'Boas-vindas e formulário',
    resumo: 'A conversa vira informação organizada.',
    conteudo:
      'Você recebe a mensagem oficial de boas-vindas com os próximos passos e um formulário de entrada sobre a sua rotina, seu contexto e suas travas.',
  },
  {
    id: 'e3',
    etiqueta: 'Etapa 03',
    titulo: 'Diagnostic Map',
    resumo: 'Sua leitura estratégica, por escrito.',
    conteudo:
      'Onde está a lacuna, o que priorizar e qual será o foco do primeiro ciclo. É o documento que impede a jornada de começar no chute.',
  },
  {
    id: 'e4',
    etiqueta: 'Etapa 04 · 8 semanas',
    titulo: 'Evolution Plan',
    resumo: 'O desenho do seu ciclo, antes de começar.',
    conteudo:
      'Foco de cada bloco de semanas, habilidades prioritárias, ritmo de estudo e os marcos de sucesso. Você sabe para onde está indo.',
  },
  {
    id: 'e5',
    etiqueta: 'Etapa 05',
    titulo: 'Seu Classroom',
    resumo: 'Um ambiente só seu, organizado em blocos fixos.',
    conteudo:
      'Início, sua jornada, aulas e materiais, planner semanal, tarefas, progresso e biblioteca. Nada de arquivo solto em pasta compartilhada.',
  },
  {
    id: 'e6',
    etiqueta: 'Etapa 06 · toda semana',
    titulo: 'Ciclo de aprendizagem',
    resumo: 'Aula, registro, planner, prática, ajuste.',
    conteudo:
      'É a engrenagem que roda semana após semana: a aula ao vivo, as Session Notes, o planner publicado, a sua rotina de prática e o ajuste do professor.',
  },
  {
    id: 'e7',
    etiqueta: 'Etapa 07',
    titulo: 'Progress Review',
    resumo: 'Evolução medida, não sentida.',
    conteudo:
      'Comparamos sua fala de hoje com a do início, medimos o avanço em speaking, listening e vocabulário, e ajustamos o foco.',
  },
  {
    id: 'e8',
    etiqueta: 'Etapa 08',
    titulo: 'Renovação com novo foco',
    resumo: 'Fim de ciclo é hora de redefinir o objetivo.',
    conteudo:
      'Continuar no mesmo programa, migrar para outro, subir ou baixar a intensidade. Você decide com dados na mão, não por inércia.',
  },
];

const blocosSessao = [
  { tempo: '5-10', titulo: 'Warm-up', desc: 'Retomada e ativação. Você já começa falando.' },
  { tempo: '10-15', titulo: 'Input guiado', desc: 'Um recorte de inglês real entra em cena.' },
  { tempo: '15-25', titulo: 'Conversa', desc: 'A parte mais longa é a parte em que você fala.' },
  { tempo: '10-15', titulo: 'Correção', desc: 'Ajuste de estrutura, vocabulário e pronúncia.' },
  { tempo: '5', titulo: 'Fechamento', desc: 'O foco da semana e a tarefa até a próxima aula.' },
];

export const ComoFuncionaPage: React.FC<ComoFuncionaPageProps> = ({ onNavigate }) => {
  const ir = (destino: string) => (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    onNavigate(destino);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main>
      {/* Cabeçalho */}
      <section className="sg-bg-ember sg-grain relative overflow-hidden py-20 md:py-28">
        <AmpersandMark className="absolute -right-16 -top-10 w-[380px] hidden md:block" opacity={0.06} />
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease }}>
            <Eyebrow className="mb-6">Como funciona</Eyebrow>
            <h1 className="font-['Bricolage_Grotesque'] font-extrabold text-[36px] sm:text-[54px] lg:text-[66px] leading-[0.96] tracking-[-0.04em] mb-6 text-[#FFFDF9] max-w-[820px]">
              Oito etapas, do primeiro contato ao primeiro ciclo.
            </h1>
            <p className="text-[19px] leading-[1.55] text-[#F0E7D8] max-w-[520px] m-0">
              Nada de matrícula às cegas. A primeira etapa é gratuita.
            </p>
          </motion.div>
        </div>
      </section>

      <ArcDivider fill="#241610" />

      {/* A jornada */}
      <section className="sg-bg-coffee sg-grain relative overflow-hidden pt-6 pb-20 md:pb-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...surge} className="mb-10 max-w-[700px]">
            <Eyebrow tone="amber" className="mb-5">A jornada</Eyebrow>
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[46px] leading-[1.0] tracking-[-0.035em] text-[#FFFDF9] m-0">
              Uma engrenagem que gira
            </h2>
            <p className="text-[17px] leading-[1.6] text-[#C9BFB2] mt-5 m-0">
              As cinco primeiras acontecem uma vez. As três últimas se repetem a cada ciclo.
            </p>
          </motion.div>

          <motion.div {...surge}>
            <Acordeao tom="escuro" inicial={0} itens={etapas} />
          </motion.div>
        </div>
      </section>

      {/* A aula por dentro */}
      <section className="sg-bg-ember sg-grain relative overflow-hidden py-20 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
            <motion.div {...surge}>
              <Eyebrow className="mb-5">A aula por dentro</Eyebrow>
              <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[44px] leading-[1.0] tracking-[-0.035em] text-[#FFFDF9] mb-5 m-0">
                Toda aula tem pauta
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#C9BFB2] m-0 mb-8">
                A divisão muda conforme o dia. A lógica não: você fala primeiro, a explicação vem
                depois. Uma música, um trecho de série, um e-mail de trabalho — o material entra
                pela tela e a conversa acontece em cima dele.
              </p>
              <PhotoSlot
                ratio="painel"
                src="/assets/img/aula-online-painel.jpg"
                alt="Aula ao vivo da Speak&Go no Google Meet, com a letra de uma música compartilhada na tela"
                veu="nenhum"
                className="border border-[#3A251A] shadow-2xl"
              />
            </motion.div>

            <motion.div {...surge} className="grid gap-3">
              {blocosSessao.map((b, i) => (
                <motion.div
                  key={b.titulo}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: Math.min(i, 4) * 0.07, ease }}
                  className="flex items-center gap-5 bg-[#151312] border border-[#241F1B] rounded-[18px] p-5 md:p-6 transition-colors hover:border-[#3A251A]"
                >
                  <span className="flex-none flex flex-col items-center justify-center w-[74px] h-[62px] rounded-[14px] bg-[#FF5A00]/10 ring-1 ring-[#FF5A00]/25">
                    <span className="font-['Bricolage_Grotesque'] font-extrabold text-[22px] leading-none text-[#FF5A00] tracking-[-0.03em]">
                      {b.tempo}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] text-[#FFB347] mt-1">
                      <Clock className="w-[10px] h-[10px]" aria-hidden="true" />
                      min
                    </span>
                  </span>
                  <span>
                    <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-[19px] leading-[1.15] tracking-[-0.02em] text-[#FFFDF9] m-0 mb-1">
                      {b.titulo}
                    </h3>
                    <p className="text-[15px] leading-[1.45] text-[#9B9188] m-0">{b.desc}</p>
                  </span>
                </motion.div>
              ))}

              <div className="mt-3 rounded-[18px] p-6 bg-[#FFB347]/8 border border-[#FFB347]/25">
                <p className="text-[15px] leading-[1.55] text-[#F0E7D8] m-0">
                  Toda sessão gera duas saídas: as{' '}
                  <strong className="text-[#FFB347]">Session Notes</strong> e a{' '}
                  <strong className="text-[#FFB347]">ação da semana</strong>. A aula não acaba sem
                  próximo passo.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sg-bg-flame text-[#0E0D0C] py-16 md:py-20 relative overflow-hidden">
        <AmpersandMark className="absolute -right-10 -top-10 w-[280px]" opacity={0.12} />
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[30px] sm:text-[40px] leading-[1.0] tracking-[-0.035em] max-w-[560px] m-0">
            A etapa 01 é grátis. Depois dela você decide.
          </h2>
          <MagneticButton
            href={caminhoDe('contato')}
            onClick={ir('contato')}
            className="bg-[#0E0D0C] text-[#FFFDF9] font-bold text-[16px] px-8 py-4 rounded-full shadow-xl hover:bg-[#241610] active:scale-95 transition-all flex-none gap-2"
          >
            Começar pela etapa 01
            <ArrowRight className="w-[18px] h-[18px] text-[#FF5A00]" aria-hidden="true" />
          </MagneticButton>
        </div>
      </section>
    </main>
  );
};

export default ComoFuncionaPage;
