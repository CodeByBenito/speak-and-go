import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Video, FolderOpen, MessageCircle, LineChart } from 'lucide-react';
import MagneticButton from '@/components/ui/magnetic-button';
import { ExpandCard } from '@/components/ui/disclosure';
import {
  ArcDivider, SlantDivider, AmpersandMark, IconBadge, PhotoSlot, Eyebrow,
} from '@/components/brand/graphics';
import { caminhoDe } from '@/lib/rotas';

interface MateriaisPageProps {
  onNavigate: (page: string) => void;
}

const ease = [0.2, 0.7, 0.3, 1] as const;
const surge = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease },
};

const ativos = [
  {
    num: '01',
    titulo: 'Diagnostic Map',
    resumo: 'O retrato do seu ponto de partida.',
    detalhe: 'Nível de fala, lacunas, rotina, objetivo e as prioridades do primeiro ciclo.',
  },
  {
    num: '02',
    titulo: 'Evolution Plan',
    resumo: 'O desenho das suas oito semanas.',
    detalhe: 'Foco de cada bloco, habilidades prioritárias, ritmo de estudo e marcos de sucesso.',
  },
  {
    num: '03',
    titulo: 'Weekly Planner',
    resumo: 'A sua semana, montada.',
    detalhe: 'Objetivo, plano por dia, prática de fala, listening e as expressões para ativar.',
  },
  {
    num: '04',
    titulo: 'Session Notes',
    resumo: 'O registro de cada aula.',
    detalhe: 'O que foi trabalhado, as correções que importam e o que entrou no seu repertório.',
  },
  {
    num: '05',
    titulo: 'Progress Review',
    resumo: 'O fechamento de cada ciclo.',
    detalhe: 'O que avançou em speaking, listening e vocabulário, e o foco do ciclo seguinte.',
  },
  {
    num: '06',
    titulo: 'Resource Library',
    resumo: 'Curadoria feita para o seu nível.',
    detalhe: 'Séries, canais, podcasts e guias de situação escolhidos pelo sotaque que você precisa enfrentar.',
  },
];

const blocos = [
  'Start Here', 'Your Journey', 'Live Sessions', 'Weekly Planner',
  'Tasks & Practice', 'Progress', 'Resource Library', 'Important Info',
];

export const MateriaisPage: React.FC<MateriaisPageProps> = ({ onNavigate }) => {
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
            <Eyebrow className="mb-6">Materiais e ambiente</Eyebrow>
            <h1 className="font-['Bricolage_Grotesque'] font-extrabold text-[36px] sm:text-[54px] lg:text-[66px] leading-[0.96] tracking-[-0.04em] mb-6 text-[#FFFDF9] max-w-[820px]">
              Não é uma pasta de arquivos. É a sua jornada.
            </h1>
            <p className="text-[19px] leading-[1.55] text-[#F0E7D8] max-w-[520px] m-0">
              Uma sala exclusiva no Classroom, montada a partir das suas próprias aulas.
            </p>
          </motion.div>
        </div>
      </section>

      <ArcDivider fill="#F0E7D8" />

      {/* Os ativos */}
      <section className="sg-bg-sand text-[#0E0D0C] pt-6 pb-20 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 sg-dots-dark opacity-50" aria-hidden="true" />
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...surge} className="mb-10 max-w-[700px]">
            <Eyebrow tone="brown" className="mb-5">Seus ativos</Eyebrow>
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[46px] leading-[1.0] tracking-[-0.035em] m-0">
              Seis documentos que são seus
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ativos.map((a, i) => (
              <motion.div
                key={a.num}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: Math.min(i, 3) * 0.07, ease }}
              >
                <ExpandCard
                  tom={a.num === '03' ? 'destaque' : 'claro'}
                  numero={a.num}
                  titulo={a.titulo}
                  resumo={a.resumo}
                  detalhe={<p className="m-0">{a.detalhe}</p>}
                  rotuloAbrir="O que tem dentro"
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SlantDivider fill="#17100B" />

      {/* A sala */}
      <section className="sg-bg-ember sg-grain relative overflow-hidden py-20 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...surge} className="mb-10 max-w-[700px]">
            <Eyebrow className="mb-5">A sua sala</Eyebrow>
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[46px] leading-[1.0] tracking-[-0.035em] text-[#FFFDF9] m-0">
              Oito blocos, sempre no mesmo lugar
            </h2>
            <p className="text-[17px] leading-[1.6] text-[#C9BFB2] mt-5 m-0">
              Você nunca precisa procurar onde ficou o material da semana passada.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            {blocos.map((b, i) => (
              <motion.span
                key={b}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: Math.min(i, 7) * 0.05, ease }}
                className="inline-flex items-center gap-2.5 bg-[#151312] border border-[#241F1B] rounded-full pl-3 pr-5 py-2.5 text-[15px] text-[#F0E7D8] transition-colors hover:border-[#FF5A00]"
              >
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FF5A00]/12 text-[#FF5A00] text-[12px] font-extrabold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {b}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Onde acontece */}
      <section className="sg-bg-coffee sg-grain relative overflow-hidden py-20 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div {...surge}>
              <Eyebrow tone="amber" className="mb-5">Onde acontece</Eyebrow>
              <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[44px] leading-[1.0] tracking-[-0.035em] text-[#FFFDF9] mb-6 m-0">
                Um lugar só seu
              </h2>

              <div className="grid gap-3">
                {[
                  { Icone: Video, label: 'Aulas ao vivo', valor: 'Videochamada individual' },
                  { Icone: FolderOpen, label: 'Materiais', valor: 'Classroom exclusivo' },
                  { Icone: MessageCircle, label: 'Entre as aulas', valor: 'WhatsApp direto' },
                  { Icone: LineChart, label: 'Progresso', valor: 'A cada 8 semanas' },
                ].map((linha) => (
                  <div
                    key={linha.label}
                    className="flex items-center gap-4 bg-[#0E0D0C]/60 border border-[#3A251A] rounded-[16px] px-5 py-4"
                  >
                    <IconBadge tone="amber" size="sm">
                      <linha.Icone className="w-5 h-5" strokeWidth={1.75} />
                    </IconBadge>
                    <span className="flex-1 text-[16px] text-[#F0E7D8]">{linha.label}</span>
                    <span className="text-[15px] text-[#9B9188] text-right">{linha.valor}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...surge}>
              <PhotoSlot
                ratio="largo"
                src="/assets/img/classroom-aluno-largo.jpg"
                alt="Sala de um aluno no Google Classroom da Speak&Go, com o banner da marca e os materiais publicados"
                veu="nenhum"
                className="border border-[#3A251A] shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sg-bg-flame text-[#0E0D0C] py-16 md:py-20 relative overflow-hidden">
        <AmpersandMark className="absolute -right-10 -top-10 w-[280px]" opacity={0.12} />
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[30px] sm:text-[40px] leading-[1.0] tracking-[-0.035em] max-w-[560px] m-0">
            Sua sala começa no dia do diagnóstico.
          </h2>
          <MagneticButton
            href={caminhoDe('contato')}
            onClick={ir('contato')}
            className="bg-[#0E0D0C] text-[#FFFDF9] font-bold text-[16px] px-8 py-4 rounded-full shadow-xl hover:bg-[#241610] active:scale-95 transition-all flex-none gap-2"
          >
            Agendar diagnóstico
            <ArrowRight className="w-[18px] h-[18px] text-[#FF5A00]" aria-hidden="true" />
          </MagneticButton>
        </div>
      </section>
    </main>
  );
};

export default MateriaisPage;
