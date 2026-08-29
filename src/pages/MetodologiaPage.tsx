import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import MagneticButton from '@/components/ui/magnetic-button';
import { Acordeao, ExpandCard } from '@/components/ui/disclosure';
import {
  ArcDivider, AmpersandMark, JourneyLine, IconBadge, Eyebrow,
} from '@/components/brand/graphics';
import Icone from '@/components/brand/icons';
import { PILARES } from '@/lib/site';
import { caminhoDe } from '@/lib/rotas';

interface MetodologiaPageProps {
  onNavigate: (page: string) => void;
}

const ease = [0.2, 0.7, 0.3, 1] as const;
const surge = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease },
};

const principios = [
  {
    num: '01',
    titulo: 'Fala antes de teoria',
    resumo: 'Você começa falando, mesmo com erro.',
    detalhe:
      'O professor anota, devolve os ajustes e só então explica a regra. Aprender assim gruda, porque a regra chega com um contexto seu.',
  },
  {
    num: '02',
    titulo: 'Material vivo',
    resumo: 'Séries, podcasts, e-mails de verdade.',
    detalhe:
      'A linguagem que existe fora da sala, incluindo gíria, sotaque e as palavras que ninguém pronuncia inteiras.',
  },
  {
    num: '03',
    titulo: 'Repetição espaçada',
    resumo: 'A expressão nova volta dias depois, em outro contexto.',
    detalhe:
      'É assim que vocabulário sai da lista e entra na conversa automática, sem você precisar procurar a palavra.',
  },
  {
    num: '04',
    titulo: 'Objetivo no centro',
    resumo: 'Nada entra na semana sem motivo.',
    detalhe:
      'Uma entrevista técnica, uma reunião, uma viagem. O conteúdo existe para te aproximar dessa cena específica.',
  },
];

export const MetodologiaPage: React.FC<MetodologiaPageProps> = ({ onNavigate }) => {
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
            <Eyebrow className="mb-6">Speak&amp;Go Evolution Method</Eyebrow>
            <h1 className="font-['Bricolage_Grotesque'] font-extrabold text-[36px] sm:text-[54px] lg:text-[66px] leading-[0.96] tracking-[-0.04em] mb-6 text-[#FFFDF9] max-w-[820px]">
              Um método com nome, etapas e entregáveis.
            </h1>
            <p className="text-[19px] leading-[1.55] text-[#F0E7D8] max-w-[540px] m-0">
              É o que separa uma mentoria de uma sequência de aulas soltas.
            </p>
          </motion.div>

          <motion.div {...surge} className="mt-14 hidden md:block">
            <JourneyLine rotulos={PILARES.map((p) => p.nome)} />
          </motion.div>
        </div>
      </section>

      <ArcDivider fill="#241610" />

      {/* Os 5 pilares */}
      <section className="sg-bg-coffee sg-grain relative overflow-hidden pt-6 pb-20 md:pb-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...surge} className="mb-10 max-w-[700px]">
            <Eyebrow tone="amber" className="mb-5">A espinha dorsal</Eyebrow>
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[46px] leading-[1.0] tracking-[-0.035em] text-[#FFFDF9] m-0">
              Cinco pilares
            </h2>
            <p className="text-[17px] leading-[1.6] text-[#C9BFB2] mt-5 m-0">
              Cada um gera um documento seu. Abra para ver qual.
            </p>
          </motion.div>

          <motion.div {...surge}>
            <Acordeao
              tom="escuro"
              inicial={0}
              itens={PILARES.map((p) => ({
                id: p.num,
                etiqueta: `Pilar ${p.num}`,
                titulo: p.nome,
                resumo: p.resumo,
                conteudo: (
                  <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start">
                    <IconBadge tone="orange" size="lg">
                      <Icone chave={p.icone} className="w-7 h-7" />
                    </IconBadge>
                    <div>
                      <p className="m-0 mb-4 text-[16px] leading-[1.65]">{p.detalhe}</p>
                      <p className="inline-flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase font-bold text-[#FFB347] border border-[#FFB347]/30 bg-[#FFB347]/8 rounded-full px-3.5 py-1.5 m-0">
                        Você recebe · {p.entrega}
                      </p>
                    </div>
                  </div>
                ),
              }))}
            />
          </motion.div>
        </div>
      </section>

      {/* Princípios */}
      <section className="sg-bg-ember sg-grain relative overflow-hidden py-20 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...surge} className="mb-10 max-w-[760px]">
            <Eyebrow className="mb-5">Princípios de ensino</Eyebrow>
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[46px] leading-[1.0] tracking-[-0.035em] text-[#FFFDF9] m-0">
              Inglês real, do jeito que as pessoas falam
            </h2>
            <p className="text-[17px] leading-[1.6] text-[#C9BFB2] mt-5 m-0">
              A gramática entra a serviço da fala, nunca no lugar dela.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principios.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: Math.min(i, 3) * 0.07, ease }}
              >
                <ExpandCard
                  tom="escuro"
                  numero={item.num}
                  titulo={item.titulo}
                  resumo={item.resumo}
                  detalhe={<p className="m-0">{item.detalhe}</p>}
                  rotuloAbrir="Como assim"
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ArcDivider fill="#F0E7D8" />

      {/* Fazemos / não fazemos */}
      <section className="sg-bg-sand text-[#0E0D0C] pt-6 pb-20 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 sg-dots-dark opacity-50" aria-hidden="true" />
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...surge} className="mb-10 max-w-[700px]">
            <Eyebrow tone="brown" className="mb-5">Onde traçamos a linha</Eyebrow>
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[46px] leading-[1.0] tracking-[-0.035em] m-0">
              O que fazemos e o que recusamos
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div {...surge} className="bg-[#0E0D0C] text-[#FFFDF9] rounded-[22px] p-8 md:p-10 relative overflow-hidden">
              <AmpersandMark className="absolute -right-8 -bottom-10 w-[200px]" opacity={0.08} />
              <h3 className="flex items-center gap-2.5 text-[12px] tracking-[0.18em] uppercase text-[#FF5A00] mb-6 font-bold m-0 relative">
                <Plus className="w-4 h-4" aria-hidden="true" />
                Fazemos
              </h3>
              <ul className="grid gap-3.5 text-[16px] leading-[1.5] text-[#F0E7D8] list-none p-0 m-0 relative">
                {[
                  'Corrigir pronúncia durante a fala livre',
                  'Simular as situações que dão medo',
                  'Ensinar o que os nativos realmente usam',
                  'Registrar tudo por escrito',
                  'Medir a evolução a cada ciclo',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="text-[#FF5A00] font-bold" aria-hidden="true">+</span>
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...surge} className="bg-[#FFFDF9] rounded-[22px] p-8 md:p-10 border border-[#DCD0BD]">
              <h3 className="flex items-center gap-2.5 text-[12px] tracking-[0.18em] uppercase text-[#5A3620] mb-6 font-bold m-0">
                <Minus className="w-4 h-4" aria-hidden="true" />
                Não fazemos
              </h3>
              <ul className="grid gap-3.5 text-[16px] leading-[1.5] text-[#5A3620] list-none p-0 m-0">
                {[
                  'Apostila igual para todo aluno',
                  'Turma, com você esperando a vez',
                  'Meses de gramática antes de conversar',
                  'Promessa de fluência em prazo mágico',
                  'Ciclo sem revisão, onde ninguém mede nada',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="text-[#5A3620] font-bold" aria-hidden="true">—</span>
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sg-bg-flame text-[#0E0D0C] py-16 md:py-20 relative overflow-hidden">
        <AmpersandMark className="absolute -right-10 -top-10 w-[280px]" opacity={0.12} />
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[30px] sm:text-[40px] leading-[1.0] tracking-[-0.035em] max-w-[560px] m-0">
            Veja o método funcionando na primeira conversa.
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

export default MetodologiaPage;
