import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import TiltCard from '@/components/ui/tilt-card';
import MagneticButton from '@/components/ui/magnetic-button';
import Marquee from '@/components/ui/marquee';
import LiveClass from '@/components/ui/live-class';
import { ExpandCard, Abas } from '@/components/ui/disclosure';
import {
  ArcDivider, SlantDivider, AmpersandMark, SpeechWaves,
  JourneyLine, IconBadge, PhotoSlot, Eyebrow,
} from '@/components/brand/graphics';
import Icone from '@/components/brand/icons';
import { PILARES, PROGRAMAS, PLANOS, whatsappUrl } from '@/lib/site';
import { caminhoDe } from '@/lib/rotas';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const ease = [0.2, 0.7, 0.3, 1] as const;

const surge = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease },
};

const marqueeItens = [
  'Inglês para a vida real',
  'Conversação desde a primeira aula',
  'Plano individual',
  'Acompanhamento semanal',
];

const travas = [
  { icone: 'lupa', titulo: 'Você entende, mas não fala', resumo: 'A frase existe na cabeça e some na boca.' },
  { icone: 'rota', titulo: 'Você já estudou. Muito.', resumo: 'Anos de curso e a conversa nunca veio.' },
  { icone: 'agenda', titulo: 'Você traduz antes de falar', resumo: 'Quando a frase fica pronta, o assunto já passou.' },
  { icone: 'raio', titulo: 'Você precisa do inglês agora', resumo: 'Uma vaga, uma viagem, uma mudança de país.' },
] as const;

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const ir = (destino: string) => (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    onNavigate(destino);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main>
      {/* ================================================================ */}
      {/* HERÓI                                                            */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden sg-bg-ember sg-grain">
        <AmpersandMark className="absolute -left-24 top-10 w-[420px] hidden lg:block" opacity={0.05} />
        <SpeechWaves className="absolute right-[-60px] bottom-[-40px] w-[320px] opacity-30 hidden lg:block sg-float" />

        <div className="max-w-[1240px] mx-auto px-6 md:px-10 pt-16 pb-20 md:pt-24 md:pb-28 grid grid-cols-1 lg:grid-cols-[1.05fr_0.85fr] gap-12 lg:gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="inline-flex items-center gap-2.5 border border-[#3A251A] rounded-full px-4 py-2 text-[12px] tracking-[0.16em] uppercase text-[#F0E7D8] mb-8 bg-[#0E0D0C]/50 backdrop-blur-md">
              <span className="relative w-[7px] h-[7px] rounded-full bg-[#FF5A00] sg-pulse-ring" aria-hidden="true" />
              Mentoria de inglês 1:1
            </span>

            <h1 className="font-['Bricolage_Grotesque'] font-extrabold text-[42px] sm:text-[58px] lg:text-[76px] leading-[0.92] tracking-[-0.04em] mb-6 text-[#FFFDF9]">
              Chega de estudar.
              <br />
              Hora de{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#FF5A00]">falar</span>
                <span
                  className="absolute left-0 right-0 bottom-[0.08em] h-[0.18em] bg-[#FF5A00]/25 rounded-full"
                  aria-hidden="true"
                />
              </span>
              .
            </h1>

            <p className="text-[19px] md:text-[21px] leading-[1.55] text-[#F0E7D8] max-w-[480px] mb-9">
              Mentoria individual de inglês para quem entende, mas trava na hora de conversar.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <MagneticButton
                href={caminhoDe('contato')}
                onClick={ir('contato')}
                className="bg-[#FF5A00] text-[#0E0D0C] font-bold text-[16px] px-8 py-4 rounded-full shadow-[0_10px_40px_-12px_rgba(255,90,0,0.7)] hover:bg-[#FF7C33] active:scale-95 transition-all gap-2"
              >
                Agendar diagnóstico grátis
                <ArrowRight className="w-[18px] h-[18px]" aria-hidden="true" />
              </MagneticButton>

              <MagneticButton
                href={whatsappUrl('Olá! Vim pelo site da Speak&Go e quero saber mais.')}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#3A251A] text-[#FFFDF9] font-bold text-[16px] px-7 py-4 rounded-full bg-[#0E0D0C]/40 backdrop-blur-sm hover:border-[#FFFDF9] active:scale-95 transition-all gap-2"
              >
                <MessageCircle className="w-[18px] h-[18px] text-[#FF5A00]" aria-hidden="true" />
                Chamar no WhatsApp
              </MagneticButton>
            </div>

            <ul className="flex flex-wrap gap-x-7 gap-y-2.5 list-none p-0 m-0">
              {['Aula individual', 'Online, no seu horário', 'Primeira conversa grátis'].map((t) => (
                <li key={t} className="flex items-center gap-2 text-[14px] text-[#C9BFB2]">
                  <Check className="w-4 h-4 text-[#FF5A00] flex-none" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Foto do herói + selo flutuante */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[30px] bg-gradient-to-br from-[#FF5A00]/25 to-[#FFB347]/10 blur-2xl" aria-hidden="true" />
            <PhotoSlot
              ratio="retrato"
              src="/assets/img/professor-fundador-retrato.jpg"
              alt="Professor e fundador da Speak&Go"
              prioridade
              className="relative border border-[#3A251A] shadow-2xl"
            />
            <div className="absolute -bottom-5 -left-4 md:-left-8 bg-[#F0E7D8] text-[#0E0D0C] rounded-[18px] px-5 py-4 shadow-2xl max-w-[230px]">
              <p className="text-[11px] tracking-[0.16em] uppercase font-bold text-[#B23F0A] m-0 mb-1">
                Primeira conversa
              </p>
              <p className="font-['Bricolage_Grotesque'] font-extrabold text-[26px] leading-none tracking-[-0.03em] m-0">
                30 min grátis
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Faixa viva */}
      <section className="sg-bg-flame text-[#0E0D0C] py-4 relative overflow-hidden select-none" aria-label="Princípios da Speak&Go">
        <Marquee speed={25} pauseOnHover={true}>
          <div className="flex items-center gap-10 pr-10 font-['Bricolage_Grotesque'] font-extrabold text-[19px] tracking-[-0.01em] whitespace-nowrap">
            {[...marqueeItens, ...marqueeItens, ...marqueeItens].map((t, i) => (
              <React.Fragment key={i}>
                <span>{t}</span>
                <span className="opacity-50" aria-hidden="true">✦</span>
              </React.Fragment>
            ))}
          </div>
        </Marquee>
      </section>

      {/* ================================================================ */}
      {/* O PONTO DE VIRADA                                                */}
      {/* ================================================================ */}
      <section className="sg-bg-coffee sg-grain relative overflow-hidden py-20 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...surge} className="max-w-[760px] mb-12">
            <Eyebrow className="mb-5">Talvez você se reconheça</Eyebrow>
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[46px] leading-[1.0] tracking-[-0.035em] text-[#FFFDF9] m-0">
              O problema nunca foi você.
              <br />
              Foi a <span className="text-[#FFB347]">ordem</span>.
            </h2>
            <p className="text-[18px] leading-[1.6] text-[#C9BFB2] mt-5 max-w-[560px]">
              Você aprendeu <em>sobre</em> inglês por anos. Quase nunca <em>usou</em> inglês. Aqui a
              ordem se inverte.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {travas.map((t, i) => (
              <motion.div
                key={t.titulo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.08, ease }}
              >
                <TiltCard
                  maxTilt={7}
                  className="h-full bg-[#0E0D0C]/60 backdrop-blur-sm border border-[#3A251A] rounded-[20px] p-7"
                >
                  <IconBadge tone="orange" className="mb-5">
                    <Icone chave={t.icone} className="w-5 h-5" />
                  </IconBadge>
                  <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-[19px] leading-[1.15] tracking-[-0.02em] mb-2 text-[#FFFDF9] m-0">
                    {t.titulo}
                  </h3>
                  <p className="text-[15px] leading-[1.5] text-[#9B9188] m-0">{t.resumo}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* UMA AULA POR DENTRO                                              */}
      {/* ================================================================ */}
      <section className="sg-bg-ember sg-grain relative overflow-hidden py-20 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
          <motion.div {...surge}>
            <Eyebrow className="mb-5">Uma aula por dentro</Eyebrow>
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[46px] leading-[1.0] tracking-[-0.035em] text-[#FFFDF9] m-0">
              Você fala primeiro.
              <br />
              A correção vem na hora.
            </h2>
            <p className="text-[18px] leading-[1.6] text-[#C9BFB2] mt-5 mb-8 max-w-[520px]">
              Nada de decorar regra antes de abrir a boca. A conversa revela o erro, o professor
              ajusta no momento e o ajuste vira o foco da semana.
            </p>

            <ul className="grid gap-3 list-none p-0 m-0 mb-8">
              {[
                'Conversa real desde o primeiro minuto',
                'Correção de estrutura, vocabulário e pronúncia',
                'Session Notes ao fim de toda aula',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[16px] leading-[1.5] text-[#F0E7D8]">
                  <Check className="w-[18px] h-[18px] text-[#F0E7D8] flex-none mt-0.5" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>

            <a
              href={caminhoDe('como')}
              onClick={ir('como')}
              className="group inline-flex items-center gap-2 font-bold text-[16px] text-[#FF5A00] sg-underline min-h-[44px] md:min-h-0"
            >
              Ver como funciona
              <ArrowRight className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div {...surge}>
            <LiveClass />
          </motion.div>
        </div>
      </section>

      <ArcDivider fill="#F0E7D8" />

      {/* ================================================================ */}
      {/* O MÉTODO                                                         */}
      {/* ================================================================ */}
      <section className="sg-bg-sand text-[#0E0D0C] pt-6 pb-20 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 sg-dots-dark opacity-60" aria-hidden="true" />
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...surge} className="max-w-[720px] mb-10">
            <Eyebrow tone="brown" className="mb-5">Speak&amp;Go Evolution Method</Eyebrow>
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[46px] leading-[1.0] tracking-[-0.035em] m-0">
              Cinco pilares. Um ciclo de oito semanas.
            </h2>
          </motion.div>

          <JourneyLine
            tom="claro"
            rotulos={PILARES.map((p) => p.nome)}
            className="mb-12 hidden md:block"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PILARES.map((pilar, i) => (
              <motion.div
                key={pilar.num}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: Math.min(i, 3) * 0.07, ease }}
              >
                <ExpandCard
                  tom="claro"
                  numero={pilar.num}
                  titulo={pilar.nome}
                  resumo={pilar.resumo}
                  icone={
                    <IconBadge tone="brown">
                      <Icone chave={pilar.icone} className="w-5 h-5" />
                    </IconBadge>
                  }
                  detalhe={
                    <>
                      <p className="m-0 mb-3">{pilar.detalhe}</p>
                      <p className="text-[12px] tracking-[0.16em] uppercase font-bold text-[#B23F0A] m-0">
                        Você recebe · {pilar.entrega}
                      </p>
                    </>
                  }
                  className="h-full"
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.28, ease }}
            >
              <a
                href={caminhoDe('metodo')}
                onClick={ir('metodo')}
                className="group h-full flex flex-col justify-between rounded-[20px] p-7 bg-[#0E0D0C] text-[#FFFDF9] relative overflow-hidden"
              >
                <AmpersandMark className="absolute -right-6 -bottom-8 w-[180px]" opacity={0.1} />
                <SpeechWaves className="w-14 h-14 mb-5 relative" />
                <div className="relative">
                  <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-[21px] leading-[1.15] tracking-[-0.02em] mb-2 m-0">
                    Como isso funciona por dentro
                  </h3>
                  <p className="text-[15px] leading-[1.5] text-[#C9BFB2] m-0 mb-5">
                    A metodologia completa, pilar por pilar.
                  </p>
                  <span className="inline-flex items-center gap-2 text-[14px] font-bold text-[#FF5A00]">
                    Ver a metodologia
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <ArcDivider fill="#17100B" flip />

      {/* ================================================================ */}
      {/* PROGRAMAS                                                        */}
      {/* ================================================================ */}
      <section className="sg-bg-ember sg-grain relative overflow-hidden py-20 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...surge} className="max-w-[720px] mb-10">
            <Eyebrow className="mb-5">Programas</Eyebrow>
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[46px] leading-[1.0] tracking-[-0.035em] text-[#FFFDF9] m-0">
              Qual é o seu motivo?
            </h2>
            <p className="text-[18px] leading-[1.6] text-[#C9BFB2] mt-5 max-w-[540px]">
              O caminho muda conforme o objetivo. Escolha o seu e veja como fica.
            </p>
          </motion.div>

          <Abas
            itens={PROGRAMAS.map((p) => ({
              id: p.id,
              rotulo: p.nomeCurto,
              icone: <Icone chave={p.icone} className="w-4 h-4" />,
              conteudo: (
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start bg-[#151312] border border-[#241F1B] rounded-[24px] p-8 md:p-10">
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <IconBadge tone="orange" size="lg">
                        <Icone chave={p.icone} className="w-7 h-7" />
                      </IconBadge>
                      <div>
                        {p.principal && (
                          <span className="inline-block bg-[#FF5A00] text-[#0E0D0C] text-[10px] font-extrabold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full mb-2">
                            Principal
                          </span>
                        )}
                        <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-[26px] leading-[1.1] tracking-[-0.025em] text-[#FFFDF9] m-0">
                          {p.nome}
                        </h3>
                      </div>
                    </div>

                    <p className="text-[19px] leading-[1.45] text-[#F0E7D8] font-medium m-0 mb-4">
                      {p.chamada}
                    </p>
                    <p className="text-[16px] leading-[1.6] text-[#9B9188] m-0 mb-6">{p.detalhe}</p>

                    <div className="flex flex-wrap gap-2">
                      {p.foco.map((f) => (
                        <span
                          key={f}
                          className="text-[13px] text-[#FFB347] border border-[#FFB347]/30 bg-[#FFB347]/8 rounded-full px-3 py-1"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full">
                    <h4 className="text-[12px] tracking-[0.18em] uppercase font-bold text-[#FF5A00] mb-4 m-0">
                      É para você se
                    </h4>
                    <ul className="grid gap-3 list-none p-0 m-0 mb-7">
                      {p.paraQuem.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#C9BFB2]">
                          <Check className="w-[18px] h-[18px] text-[#FF5A00] flex-none mt-0.5" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <MagneticButton
                      href={caminhoDe('contato')}
                      onClick={ir('contato')}
                      className="w-full bg-[#FF5A00] text-[#0E0D0C] font-bold text-[15px] py-3.5 px-6 rounded-full text-center hover:bg-[#FF7C33] transition-colors gap-2"
                    >
                      Quero o {p.nomeCurto}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </MagneticButton>
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* ================================================================ */}
      {/* PLANOS                                                           */}
      {/* ================================================================ */}
      <section className="sg-bg-coffee sg-grain relative overflow-hidden py-20 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...surge} className="max-w-[720px] mb-11">
            <Eyebrow tone="amber" className="mb-5">Planos</Eyebrow>
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[46px] leading-[1.0] tracking-[-0.035em] text-[#FFFDF9] m-0">
              Quantas vezes por semana?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {PLANOS.map((plano, i) => (
              <motion.div
                key={plano.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.09, ease }}
                className="h-full"
              >
                <div
                  className={`h-full flex flex-col rounded-[22px] p-8 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${
                    plano.destaque
                      ? 'bg-gradient-to-b from-[#2A1710] to-[#17100B] border-2 border-[#FF5A00] shadow-[0_20px_60px_-25px_rgba(255,90,0,0.6)]'
                      : 'bg-[#0E0D0C]/70 border border-[#3A251A]'
                  }`}
                >
                  {plano.selo && (
                    <span className="absolute top-0 right-6 bg-[#FF5A00] text-[#0E0D0C] text-[10px] font-extrabold tracking-[0.14em] uppercase px-3 py-1.5 rounded-b-[10px]">
                      {plano.selo}
                    </span>
                  )}

                  <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-[#FFB347] m-0 mb-3">
                    {plano.conceito}
                  </p>
                  <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] leading-[1.05] tracking-[-0.03em] text-[#FFFDF9] m-0 mb-1">
                    {plano.nome}
                  </h3>
                  <p className="text-[16px] font-bold text-[#FF5A00] m-0 mb-4">{plano.frequencia}</p>
                  <p className="text-[15px] leading-[1.55] text-[#C9BFB2] m-0 mb-6">{plano.resumo}</p>

                  <ul className="grid gap-2.5 list-none p-0 m-0 pt-5 border-t border-[#3A251A] mb-7">
                    {plano.entregas.map((e) => (
                      <li key={e} className="flex items-start gap-2.5 text-[14px] leading-[1.45] text-[#9B9188]">
                        <Check className="w-4 h-4 text-[#FF5A00] flex-none mt-0.5" aria-hidden="true" />
                        {e}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <MagneticButton
                      href={caminhoDe('contato')}
                      onClick={ir('contato')}
                      className={`w-full font-bold text-[15px] py-3.5 px-6 rounded-full text-center transition-all ${
                        plano.destaque
                          ? 'bg-[#FF5A00] text-[#0E0D0C] hover:bg-[#FF7C33]'
                          : 'border border-[#3A251A] text-[#FFFDF9] hover:border-[#FF5A00] hover:text-[#FF5A00]'
                      }`}
                    >
                      Escolher {plano.nome}
                    </MagneticButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-7 text-[14px] leading-[1.5] text-[#8A8077] text-center max-w-[520px] mx-auto">
            Valores conforme programa e duração do ciclo. A proposta sai na primeira conversa.
          </p>
        </div>
      </section>

      <SlantDivider fill="#F0E7D8" />

      {/* ================================================================ */}
      {/* QUEM ENSINA                                                      */}
      {/* ================================================================ */}
      <section className="sg-bg-sand text-[#0E0D0C] py-20 md:py-24 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
            <motion.div {...surge}>
              <PhotoSlot
                ratio="quadrado"
                src="/assets/img/professor-fundador-quadrado.jpg"
                alt="Professor e fundador da Speak&Go"
                veu="nenhum"
                className="shadow-2xl"
              />
            </motion.div>

            <motion.div {...surge}>
              <Eyebrow tone="brown" className="mb-5">Quem ensina</Eyebrow>
              <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[46px] leading-[1.0] tracking-[-0.035em] mb-5 m-0">
                Inglês aprendido na conversa, não só no livro.
              </h2>
              <p className="text-[18px] leading-[1.6] text-[#5A3620] mb-8 max-w-[520px]">
                Anos de sala de aula e vivência direta com nativos. Muda o que você ouve: pronúncia
                real, expressão atual, correção na hora certa.
              </p>

              <a
                href={caminhoDe('sobre')}
                onClick={ir('sobre')}
                className="group inline-flex items-center gap-2 font-bold text-[16px] text-[#B23F0A] sg-underline min-h-[44px] md:min-h-0"
              >
                Conhecer a Speak&amp;Go
                <ArrowRight className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CTA FINAL                                                        */}
      {/* ================================================================ */}
      <section className="sg-bg-flame text-[#0E0D0C] py-16 md:py-20 relative overflow-hidden">
        <AmpersandMark className="absolute -right-10 -top-10 w-[280px]" opacity={0.12} />
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="max-w-[560px]">
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[30px] sm:text-[42px] leading-[1.0] tracking-[-0.035em] m-0">
              Trinta minutos. Sem compromisso.
            </h2>
            <p className="text-[17px] leading-[1.55] mt-3 m-0 font-medium">
              Você sai sabendo onde está, o que trava e qual seria o caminho.
            </p>
          </div>
          <MagneticButton
            href={caminhoDe('contato')}
            onClick={ir('contato')}
            className="bg-[#0E0D0C] text-[#FFFDF9] font-bold text-[16px] px-8 py-4 rounded-full shadow-xl hover:bg-[#241610] active:scale-95 transition-all flex-none gap-2"
          >
            Agendar agora
            <ArrowRight className="w-[18px] h-[18px] text-[#FF5A00]" aria-hidden="true" />
          </MagneticButton>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
