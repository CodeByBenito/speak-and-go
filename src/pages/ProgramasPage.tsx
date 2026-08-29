import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import MagneticButton from '@/components/ui/magnetic-button';
import { Acordeao } from '@/components/ui/disclosure';
import { ArcDivider, AmpersandMark, IconBadge, Eyebrow } from '@/components/brand/graphics';
import Icone from '@/components/brand/icons';
import { PROGRAMAS, PLANOS } from '@/lib/site';
import { caminhoDe } from '@/lib/rotas';

interface ProgramasPageProps {
  onNavigate: (page: string) => void;
}

const ease = [0.2, 0.7, 0.3, 1] as const;
const surge = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease },
};

const prescricoes = [
  { cenario: 'Quero destravar o inglês em geral', receita: 'Core + Gold' },
  { cenario: 'Tenho viagem marcada', receita: 'Travel + Silver' },
  { cenario: 'Preciso para uma vaga ou entrevista', receita: 'Work + Gold' },
  { cenario: 'Vou morar fora', receita: 'Exchange + Diamond' },
  { cenario: 'Estudei muito e travei', receita: 'Boost + Gold' },
];

export const ProgramasPage: React.FC<ProgramasPageProps> = ({ onNavigate }) => {
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
            <Eyebrow className="mb-6">Programas e planos</Eyebrow>
            <h1 className="font-['Bricolage_Grotesque'] font-extrabold text-[36px] sm:text-[54px] lg:text-[66px] leading-[0.96] tracking-[-0.04em] mb-6 text-[#FFFDF9] max-w-[820px]">
              Primeiro o objetivo.
              <br />
              Depois o <span className="text-[#FFB347]">ritmo</span>.
            </h1>
            <p className="text-[19px] leading-[1.55] text-[#F0E7D8] max-w-[520px] m-0">
              O programa diz para onde o seu inglês vai. O plano diz com que velocidade.
            </p>
          </motion.div>
        </div>
      </section>

      <ArcDivider fill="#241610" />

      {/* Programas */}
      <section className="sg-bg-coffee sg-grain relative overflow-hidden pt-6 pb-20 md:pb-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...surge} className="mb-10 max-w-[700px]">
            <Eyebrow tone="amber" className="mb-5">Camada 1 — Programas</Eyebrow>
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[46px] leading-[1.0] tracking-[-0.035em] text-[#FFFDF9] m-0">
              Cinco caminhos, um método só
            </h2>
            <p className="text-[17px] leading-[1.6] text-[#C9BFB2] mt-5 m-0">
              Você pode migrar de programa quando o objetivo mudar, sem recomeçar do zero.
            </p>
          </motion.div>

          <motion.div {...surge}>
            <Acordeao
              tom="escuro"
              inicial={0}
              itens={PROGRAMAS.map((p) => ({
                id: p.id,
                etiqueta: p.principal ? 'Programa principal' : undefined,
                titulo: p.nome,
                resumo: p.chamada,
                conteudo: (
                  <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start">
                    <IconBadge tone="orange" size="lg">
                      <Icone chave={p.icone} className="w-7 h-7" />
                    </IconBadge>
                    <div>
                      <p className="m-0 mb-5 text-[16px] leading-[1.6]">{p.detalhe}</p>
                      <h4 className="text-[12px] tracking-[0.18em] uppercase font-bold text-[#FF5A00] mb-3 m-0">
                        É para você se
                      </h4>
                      <ul className="grid gap-2.5 list-none p-0 m-0 mb-6">
                        {p.paraQuem.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-[15px] leading-[1.5]">
                            <Check className="w-[18px] h-[18px] text-[#FF5A00] flex-none mt-0.5" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
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
                  </div>
                ),
              }))}
            />
          </motion.div>
        </div>
      </section>

      {/* Planos */}
      <section className="sg-bg-ember sg-grain relative overflow-hidden py-20 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...surge} className="mb-11 max-w-[700px]">
            <Eyebrow className="mb-5">Camada 2 — Planos</Eyebrow>
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[46px] leading-[1.0] tracking-[-0.035em] text-[#FFFDF9] m-0">
              Quantas vezes por semana
            </h2>
            <p className="text-[17px] leading-[1.6] text-[#C9BFB2] mt-5 m-0">
              Qualquer programa cabe em qualquer plano.
            </p>
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
                      : 'bg-[#151312] border border-[#241F1B]'
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

                  <ul className="grid gap-2.5 list-none p-0 m-0 pt-5 border-t border-[#241F1B] mb-7">
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
                          : 'border border-[#3A322B] text-[#FFFDF9] hover:border-[#FF5A00] hover:text-[#FF5A00]'
                      }`}
                    >
                      Escolher {plano.nome}
                    </MagneticButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ArcDivider fill="#F0E7D8" />

      {/* Prescrição */}
      <section className="sg-bg-sand text-[#0E0D0C] pt-6 pb-20 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 sg-dots-dark opacity-50" aria-hidden="true" />
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...surge} className="mb-10 max-w-[700px]">
            <Eyebrow tone="brown" className="mb-5">Como escolher</Eyebrow>
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[46px] leading-[1.0] tracking-[-0.035em] m-0">
              Você não escolhe sozinho
            </h2>
            <p className="text-[17px] leading-[1.6] text-[#5A3620] mt-5 m-0">
              No diagnóstico recomendamos o encaixe. Mas, em geral, é assim:
            </p>
          </motion.div>

          <div className="grid gap-3">
            {prescricoes.map((p, i) => (
              <motion.div
                key={p.cenario}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: Math.min(i, 4) * 0.06, ease }}
                className="bg-[#FFFDF9] rounded-[16px] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <p className="text-[17px] leading-[1.4] text-[#0E0D0C] font-medium m-0">
                  “{p.cenario}”
                </p>
                <span className="inline-flex items-center gap-2 text-[15px] font-bold text-[#B23F0A] flex-none">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  {p.receita}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sg-bg-flame text-[#0E0D0C] py-16 md:py-20 relative overflow-hidden">
        <AmpersandMark className="absolute -right-10 -top-10 w-[280px]" opacity={0.12} />
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[30px] sm:text-[40px] leading-[1.0] tracking-[-0.035em] max-w-[560px] m-0">
            Descubra o seu encaixe em 30 minutos.
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

export default ProgramasPage;
