import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Target, Eye } from 'lucide-react';
import MagneticButton from '@/components/ui/magnetic-button';
import TiltCard from '@/components/ui/tilt-card';
import { Acordeao } from '@/components/ui/disclosure';
import {
  ArcDivider, AmpersandMark, SpeechWaves, IconBadge, PhotoSlot, Eyebrow,
} from '@/components/brand/graphics';
import { VALORES, MARCA } from '@/lib/site';
import { caminhoDe } from '@/lib/rotas';

interface SobrePageProps {
  onNavigate: (page: string) => void;
}

const ease = [0.2, 0.7, 0.3, 1] as const;
const surge = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease },
};

const publicos = [
  {
    id: 'zero',
    titulo: 'Quer sair do zero ou destravar o básico',
    resumo: 'Comunicação real desde cedo, sem esperar dominar a teoria.',
    conteudo:
      'Você desenvolve vocabulário funcional e confiança para usar o inglês em situações do dia a dia, sem depender de decorar regra antes de abrir a boca.',
  },
  {
    id: 'carreira',
    titulo: 'Precisa do inglês para a carreira',
    resumo: 'Entrevistas, reuniões, networking e acesso a oportunidades.',
    conteudo:
      'O conteúdo é montado em cima das cenas profissionais que você precisa resolver — a reunião com o time internacional, a entrevista técnica, a apresentação para o cliente.',
  },
  {
    id: 'fora',
    titulo: 'Vai viajar, morar fora ou fazer intercâmbio',
    resumo: 'Autonomia para a rotina inteira, não só para pedir comida.',
    conteudo:
      'Aeroporto, hotel, transporte, moradia, socialização, adaptação cultural. O inglês que resolve o que aparece quando você está longe de casa.',
  },
  {
    id: 'travado',
    titulo: 'Já estudou inglês, mas ainda trava',
    resumo: 'O caso mais comum de quem chega até aqui.',
    conteudo:
      'Anos de curso e a conversa nunca veio. O foco passa a ser reduzir bloqueio, criar prática frequente e transformar o que você já sabe em fala.',
  },
];

export const SobrePage: React.FC<SobrePageProps> = ({ onNavigate }) => {
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
            <Eyebrow className="mb-6">Sobre a Speak&amp;Go</Eyebrow>
            <h1 className="font-['Bricolage_Grotesque'] font-extrabold text-[36px] sm:text-[54px] lg:text-[66px] leading-[0.96] tracking-[-0.04em] mb-6 text-[#FFFDF9] max-w-[860px]">
              Falar inglês não deveria ser privilégio de quem morou fora.
            </h1>
            <p className="text-[19px] leading-[1.55] text-[#F0E7D8] max-w-[520px] m-0">
              A Speak&amp;Go existe para transformar insegurança em autonomia.
            </p>
          </motion.div>
        </div>
      </section>

      <ArcDivider fill="#F0E7D8" />

      {/* Missão e visão */}
      <section className="sg-bg-sand text-[#0E0D0C] pt-6 pb-20 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 sg-dots-dark opacity-50" aria-hidden="true" />
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...surge} className="mb-11 max-w-[700px]">
            <Eyebrow tone="brown" className="mb-5">Por que existimos</Eyebrow>
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[46px] leading-[1.0] tracking-[-0.035em] m-0">
              O inglês como ferramenta, não como matéria.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                Icone: Target,
                titulo: 'Missão',
                texto:
                  'Simplificar o aprendizado do inglês e torná-lo prático e relevante — para o aluno deixar de estudar o idioma e começar a usá-lo.',
              },
              {
                Icone: Eye,
                titulo: 'Visão',
                texto:
                  'Ser referência em ensino de inglês prático e humanizado, com uma comunidade que enxerga o idioma como transformação de vida.',
              },
            ].map((bloco) => (
              <motion.div key={bloco.titulo} {...surge}>
                <TiltCard maxTilt={5} className="h-full bg-[#FFFDF9] rounded-[22px] p-8 md:p-10 shadow-md">
                  <IconBadge tone="brown" size="lg" className="mb-6">
                    <bloco.Icone className="w-7 h-7" strokeWidth={1.75} />
                  </IconBadge>
                  <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-[26px] leading-[1.1] tracking-[-0.025em] mb-3 m-0">
                    {bloco.titulo}
                  </h3>
                  <p className="text-[17px] leading-[1.6] text-[#5A3620] m-0">{bloco.texto}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ArcDivider fill="#17100B" flip />

      {/* Valores */}
      <section className="sg-bg-ember sg-grain relative overflow-hidden py-20 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...surge} className="mb-11 max-w-[700px]">
            <Eyebrow className="mb-5">Nossos valores</Eyebrow>
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[46px] leading-[1.0] tracking-[-0.035em] text-[#FFFDF9] m-0">
              Cinco compromissos em cada aula
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALORES.map((valor, i) => (
              <motion.div
                key={valor.num}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: Math.min(i, 3) * 0.07, ease }}
                className="h-full"
              >
                <div className="h-full bg-[#151312] border border-[#241F1B] rounded-[20px] p-7 relative overflow-hidden transition-colors duration-300 hover:border-[#3A251A]">
                  <span
                    className="absolute top-4 right-6 font-['Bricolage_Grotesque'] font-extrabold text-[54px] leading-none tracking-[-0.04em] text-[#241F1B] select-none"
                    aria-hidden="true"
                  >
                    {valor.num}
                  </span>
                  <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-[21px] leading-[1.15] tracking-[-0.02em] mb-2.5 text-[#FFFDF9] m-0 relative max-w-[80%]">
                    {valor.titulo}
                  </h3>
                  <p className="text-[15px] leading-[1.55] text-[#9B9188] m-0 relative">{valor.resumo}</p>
                </div>
              </motion.div>
            ))}

            <motion.div {...surge} className="h-full">
              <div className="h-full sg-bg-flame text-[#0E0D0C] rounded-[20px] p-7 flex flex-col justify-between relative overflow-hidden">
                <SpeechWaves className="absolute -right-6 -bottom-8 w-[150px] opacity-40" />
                <p className="font-['Bricolage_Grotesque'] font-extrabold text-[24px] leading-[1.1] tracking-[-0.025em] m-0 relative">
                  {MARCA.assinatura}
                </p>
                <p className="text-[15px] leading-[1.5] font-medium m-0 mt-5 relative">
                  Falar inglês é expandir possibilidades e construir oportunidades.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="sg-bg-coffee sg-grain relative overflow-hidden py-20 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
            <motion.div {...surge}>
              <Eyebrow tone="amber" className="mb-5">Para quem é</Eyebrow>
              <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[44px] leading-[1.0] tracking-[-0.035em] text-[#FFFDF9] mb-5 m-0">
                Quatro pontos de partida
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#C9BFB2] m-0 mb-8">
                Objetivos diferentes, a mesma necessidade: parar de estudar no vazio.
              </p>
              <PhotoSlot
                ratio="painel"
                src="/assets/img/aula-slide-painel.jpg"
                alt="Aula ao vivo da Speak&Go com o slide English A1: Personal Pronouns & To Be na tela"
                veu="nenhum"
                className="hidden lg:block border border-[#3A251A] shadow-2xl"
              />
            </motion.div>

            <motion.div {...surge}>
              <Acordeao itens={publicos} tom="escuro" inicial={-1} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sg-bg-flame text-[#0E0D0C] py-16 md:py-20 relative overflow-hidden">
        <AmpersandMark className="absolute -right-10 -top-10 w-[280px]" opacity={0.12} />
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[30px] sm:text-[40px] leading-[1.0] tracking-[-0.035em] max-w-[560px] m-0">
            Qual é o seu ponto de partida?
          </h2>
          <MagneticButton
            href={caminhoDe('contato')}
            onClick={ir('contato')}
            className="bg-[#0E0D0C] text-[#FFFDF9] font-bold text-[16px] px-8 py-4 rounded-full shadow-xl hover:bg-[#241610] active:scale-95 transition-all flex-none gap-2"
          >
            Descobrir na conversa
            <ArrowRight className="w-[18px] h-[18px] text-[#FF5A00]" aria-hidden="true" />
          </MagneticButton>
        </div>
      </section>
    </main>
  );
};

export default SobrePage;
