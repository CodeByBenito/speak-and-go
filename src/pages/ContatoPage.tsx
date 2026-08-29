import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Check, ArrowRight, Phone, Mail, Sparkles } from 'lucide-react';
import { AmpersandMark, SpeechWaves, Eyebrow, ArcDivider } from '@/components/brand/graphics';
import { Acordeao } from '@/components/ui/disclosure';
import { CONTATO, PROGRAMAS, FAQ, whatsappUrl } from '@/lib/site';
import { caminhoDe } from '@/lib/rotas';

const easeCustom = [0.2, 0.7, 0.3, 1] as const;

const niveis = [
  'Básico / Iniciante',
  'Entendo bem, mas travo para falar',
  'Intermediário — falo com esforço, quero fluidez',
  'Avançado — quero precisão e naturalidade',
  'Não sei dizer — quero descobrir no diagnóstico',
];

const disponibilidadeOptions = ['Manhã', 'Horário de almoço', 'Tarde', 'Noite', 'Sábado'];

interface Erros {
  nome?: string;
  whatsapp?: string;
  nivel?: string;
}

interface ContatoPageProps {
  onNavigate: (page: string) => void;
}

export const ContatoPage: React.FC<ContatoPageProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [link, setLink] = useState('');
  const [erros, setErros] = useState<Erros>({});
  const [disponibilidade, setDisponibilidade] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    nivel: '',
    programa: '',
    objetivo: '',
  });

  const toggleOption = (opt: string) => {
    setDisponibilidade((prev) =>
      prev.includes(opt) ? prev.filter((item) => item !== opt) : [...prev, opt]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const novosErros: Erros = {};
    if (!formData.nome.trim()) novosErros.nome = 'Precisamos saber como te chamar.';
    if (!formData.whatsapp.trim()) novosErros.whatsapp = 'Informe um WhatsApp para retornarmos.';
    if (!formData.nivel) novosErros.nivel = 'Escolha a opção que mais se parece com o seu momento.';

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) {
      const primeiro = document.getElementById(Object.keys(novosErros)[0]);
      primeiro?.focus();
      return;
    }

    const disp = disponibilidade.length > 0 ? disponibilidade.join(', ') : 'A combinar';

    const mensagem =
      `*Novo pedido de diagnóstico — Speak&Go*\n\n` +
      `Nome: ${formData.nome.trim()}\n` +
      `WhatsApp: ${formData.whatsapp.trim()}\n` +
      `Nível de inglês: ${formData.nivel}\n` +
      `Interesse: ${formData.programa || 'Ainda não sei / quero orientação'}\n` +
      `Objetivo: ${formData.objetivo.trim() || 'Não informado'}\n` +
      `Disponibilidade: ${disp}\n\n` +
      `_Enviado pelo formulário do site Speak&Go_`;

    const url = whatsappUrl(mensagem);
    setLink(url);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setFormData({ nome: '', whatsapp: '', nivel: '', programa: '', objetivo: '' });
    setDisponibilidade([]);
    setErros({});
  };

  const campoBase =
    'bg-[#FFFDF9] border rounded-xl px-4 py-3.5 text-[16px] text-[#0E0D0C] outline-none transition-all placeholder:text-[#8A8077] focus:border-[#FF5A00] focus:ring-2 focus:ring-[#FF5A00]/35';

  const borda = (erro?: string) => (erro ? 'border-[#FF5A00]' : 'border-[#DCD0BD]');

  return (
    <main>
      <section className="sg-bg-ember sg-grain py-20 md:py-28 relative overflow-hidden">
        <AmpersandMark className="absolute -left-20 top-24 w-[380px] hidden lg:block" opacity={0.05} />
        <SpeechWaves className="absolute right-[-70px] bottom-[-50px] w-[300px] opacity-25 hidden lg:block" />

        <div className="max-w-[1240px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start relative z-10">
          {/* Coluna de contexto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: easeCustom }}
          >
            <Eyebrow className="mb-6">Diagnóstico gratuito</Eyebrow>
            <h1 className="font-['Bricolage_Grotesque'] font-extrabold text-[38px] sm:text-[54px] leading-[0.96] tracking-[-0.04em] mb-6 text-[#FFFDF9]">
              Trinta minutos que mudam o jogo.
            </h1>
            <p className="text-[18px] leading-[1.6] text-[#F0E7D8] mb-8 max-w-[420px]">
              Preencha ao lado. Suas respostas chegam prontas no nosso WhatsApp.
            </p>

            <div className="grid gap-3.5 mb-10">
              {[
                'Metade em português, metade em inglês',
                'Você descobre seu nível real de fala',
                'Sai com a recomendação certa, sem compromisso',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-[16px] leading-[1.5] text-[#F0E7D8]">
                  <Check className="w-[18px] h-[18px] text-[#FF5A00] flex-none mt-1" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="grid gap-6 border-t border-[#241F1B] pt-8">
              <div>
                <h2 className="text-[12px] tracking-[0.16em] uppercase text-[#8A8077] mb-1.5 font-bold flex items-center gap-2 m-0">
                  <Phone className="w-3.5 h-3.5 text-[#FF5A00]" aria-hidden="true" />
                  WhatsApp direto
                </h2>
                <a
                  href={whatsappUrl('Olá! Vim pelo site da Speak&Go e quero agendar o diagnóstico.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[18px] text-[#F0E7D8] hover:text-[#FF5A00] transition-colors inline-flex items-center gap-2 font-medium min-h-[44px] md:min-h-0"
                >
                  {CONTATO.whatsappExibicao}
                  <ArrowRight className="w-4 h-4 opacity-70" aria-hidden="true" />
                </a>
              </div>

              <div>
                <h2 className="text-[12px] tracking-[0.16em] uppercase text-[#8A8077] mb-1.5 font-bold flex items-center gap-2 m-0">
                  <svg
                    className="w-3.5 h-3.5 text-[#FF5A00]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  Instagram
                </h2>
                <a
                  href={CONTATO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[18px] text-[#F0E7D8] hover:text-[#FF5A00] transition-colors inline-flex items-center min-h-[44px] md:min-h-0"
                >
                  {CONTATO.instagramHandle}
                </a>
              </div>

              <div>
                <h2 className="text-[12px] tracking-[0.16em] uppercase text-[#8A8077] mb-1.5 font-bold flex items-center gap-2 m-0">
                  <Mail className="w-3.5 h-3.5 text-[#FF5A00]" aria-hidden="true" />
                  E-mail
                </h2>
                <a
                  href={`mailto:${CONTATO.email}`}
                  className="text-[18px] text-[#F0E7D8] hover:text-[#FF5A00] transition-colors inline-flex items-center min-h-[44px] md:min-h-0"
                >
                  {CONTATO.email}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeCustom }}
            className="bg-[#F0E7D8] text-[#0E0D0C] rounded-[24px] p-8 md:p-12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] border border-[#DCD0BD] relative"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="grid gap-6" noValidate>
                <div className="border-b border-[#DCD0BD] pb-4">
                  <p className="flex items-center gap-2 text-[#5A3620] font-bold text-[14px] m-0">
                    <Sparkles className="w-4 h-4 text-[#FF5A00]" aria-hidden="true" />
                    <span>Diagnóstico individual gratuito · 30 minutos</span>
                  </p>
                </div>

                {/* Nome */}
                <div className="grid gap-2">
                  <label
                    htmlFor="nome"
                    className="text-[13px] font-bold tracking-[0.06em] uppercase text-[#5A3620]"
                  >
                    Nome completo <span className="text-[#FF5A00]">*</span>
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    autoComplete="name"
                    placeholder="Como você se chama?"
                    className={`${campoBase} ${borda(erros.nome)}`}
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    aria-invalid={!!erros.nome}
                    aria-describedby={erros.nome ? 'erro-nome' : undefined}
                  />
                  {erros.nome && (
                    <p id="erro-nome" className="text-[13px] text-[#5A3620] font-bold m-0" role="alert">
                      {erros.nome}
                    </p>
                  )}
                </div>

                {/* WhatsApp */}
                <div className="grid gap-2">
                  <label
                    htmlFor="whatsapp"
                    className="text-[13px] font-bold tracking-[0.06em] uppercase text-[#5A3620]"
                  >
                    Seu WhatsApp <span className="text-[#FF5A00]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    autoComplete="tel"
                    placeholder="(DDD) 99999-9999"
                    className={`${campoBase} ${borda(erros.whatsapp)}`}
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    aria-invalid={!!erros.whatsapp}
                    aria-describedby={erros.whatsapp ? 'erro-whatsapp' : undefined}
                  />
                  {erros.whatsapp && (
                    <p id="erro-whatsapp" className="text-[13px] text-[#5A3620] font-bold m-0" role="alert">
                      {erros.whatsapp}
                    </p>
                  )}
                </div>

                {/* Nível */}
                <div className="grid gap-2">
                  <label
                    htmlFor="nivel"
                    className="text-[13px] font-bold tracking-[0.06em] uppercase text-[#5A3620]"
                  >
                    Seu inglês hoje <span className="text-[#FF5A00]">*</span>
                  </label>
                  <select
                    id="nivel"
                    name="nivel"
                    className={`${campoBase} ${borda(erros.nivel)} appearance-none cursor-pointer`}
                    value={formData.nivel}
                    onChange={(e) => setFormData({ ...formData, nivel: e.target.value })}
                    aria-invalid={!!erros.nivel}
                    aria-describedby={erros.nivel ? 'erro-nivel' : undefined}
                  >
                    <option value="">Selecione uma opção</option>
                    {niveis.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  {erros.nivel && (
                    <p id="erro-nivel" className="text-[13px] text-[#5A3620] font-bold m-0" role="alert">
                      {erros.nivel}
                    </p>
                  )}
                </div>

                {/* Programa de interesse */}
                <div className="grid gap-2">
                  <label
                    htmlFor="programa"
                    className="text-[13px] font-bold tracking-[0.06em] uppercase text-[#5A3620]"
                  >
                    O que te trouxe até aqui
                  </label>
                  <select
                    id="programa"
                    name="programa"
                    className={`${campoBase} border-[#DCD0BD] appearance-none cursor-pointer`}
                    value={formData.programa}
                    onChange={(e) => setFormData({ ...formData, programa: e.target.value })}
                  >
                    <option value="">Ainda não sei — quero orientação</option>
                    {PROGRAMAS.map((p) => (
                      <option key={p.id} value={p.nome}>
                        {p.nome} — {p.chamada}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Objetivo */}
                <div className="grid gap-2">
                  <label
                    htmlFor="objetivo"
                    className="text-[13px] font-bold tracking-[0.06em] uppercase text-[#5A3620]"
                  >
                    Seu objetivo principal com o inglês
                  </label>
                  <textarea
                    id="objetivo"
                    name="objetivo"
                    rows={3}
                    placeholder="Ex: destravar para reuniões com o time internacional, viagem em novembro, entrevista para uma vaga..."
                    className={`${campoBase} border-[#DCD0BD] resize-y leading-[1.5]`}
                    value={formData.objetivo}
                    onChange={(e) => setFormData({ ...formData, objetivo: e.target.value })}
                  />
                </div>

                {/* Disponibilidade */}
                <fieldset className="grid gap-3 border-0 p-0 m-0">
                  <legend className="text-[13px] font-bold tracking-[0.06em] uppercase text-[#5A3620] p-0 mb-1">
                    Melhores horários para você
                  </legend>
                  <div className="flex flex-wrap gap-2.5">
                    {disponibilidadeOptions.map((opt) => {
                      const on = disponibilidade.includes(opt);
                      return (
                        <motion.button
                          key={opt}
                          type="button"
                          onClick={() => toggleOption(opt)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          aria-pressed={on}
                          className={`text-[14px] font-bold px-4 py-2.5 rounded-full cursor-pointer transition-colors min-h-[44px] ${
                            on
                              ? 'bg-[#FF5A00] border border-[#FF5A00] text-[#0E0D0C] shadow-sm'
                              : 'bg-transparent border border-[#DCD0BD] text-[#5A3620] hover:border-[#5A3620]'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      );
                    })}
                  </div>
                  <p className="text-[13px] text-[#5A3620] m-0">
                    Sexta-feira não temos aulas. Segunda a quinta e sábado.
                  </p>
                </fieldset>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#FF5A00] text-[#0E0D0C] font-bold text-[17px] py-4 px-8 border-none rounded-full cursor-pointer mt-2 shadow-lg hover:bg-[#FF7C33] transition-colors flex items-center justify-center gap-3 min-h-[44px]"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>Enviar e agendar pelo WhatsApp</span>
                </motion.button>

                <p className="text-[13px] leading-[1.5] text-[#5A3620] text-center m-0">
                  Ao enviar, você será direcionado para o nosso WhatsApp oficial com o resumo
                  pronto. Este site não guarda os seus dados —{' '}
                  <a
                    href={caminhoDe('privacidade')}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('privacidade');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#B23F0A] font-bold sg-underline sg-link-inline cursor-pointer"
                  >
                    veja como funciona
                  </a>
                  .
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: easeCustom }}
                className="grid gap-6 py-6 text-center justify-items-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-[#FF5A00] flex items-center justify-center text-[#0E0D0C] shadow-xl"
                >
                  <Check className="w-10 h-10 stroke-[3]" aria-hidden="true" />
                </motion.div>

                <div>
                  <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] leading-[1.05] tracking-[-0.02em] text-[#0E0D0C] mb-3 m-0">
                    Pronto, {formData.nome.split(' ')[0]}!
                  </h2>
                  <p className="text-[17px] leading-[1.6] text-[#5A3620] m-0 max-w-[440px]">
                    Seu resumo foi gerado e aberto no WhatsApp oficial da Speak&amp;Go{' '}
                    <strong>{CONTATO.whatsappExibicao}</strong>. Se a janela não abriu, use o botão
                    abaixo.
                  </p>
                </div>

                <div className="bg-[#FFFDF9] border border-[#DCD0BD] rounded-xl p-5 w-full text-left grid gap-2 text-[14px] leading-[1.5] text-[#5A3620]">
                  <div>
                    <strong>Nome:</strong> {formData.nome}
                  </div>
                  <div>
                    <strong>Nível:</strong> {formData.nivel}
                  </div>
                  <div>
                    <strong>Interesse:</strong>{' '}
                    {formData.programa || 'Ainda não sei — quero orientação'}
                  </div>
                  {formData.objetivo && (
                    <div>
                      <strong>Objetivo:</strong> {formData.objetivo}
                    </div>
                  )}
                  <div>
                    <strong>Disponibilidade:</strong>{' '}
                    {disponibilidade.length > 0 ? disponibilidade.join(', ') : 'A combinar'}
                  </div>
                </div>

                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-[#0E0D0C] text-[#FFFDF9] font-bold text-[16px] py-3.5 px-8 rounded-full shadow-lg hover:bg-[#151312] transition-colors w-full sm:w-auto min-h-[44px]"
                  >
                    <MessageCircle className="w-5 h-5 text-[#FF5A00]" aria-hidden="true" />
                    <span>Abrir no WhatsApp</span>
                  </a>
                )}

                <a
                  href={caminhoDe('contato')}
                  onClick={handleReset}
                  className="font-bold text-[15px] text-[#5A3620] border-b-2 border-[#FF5A00] pb-0.5 hover:text-[#0E0D0C] transition-colors mt-2 cursor-pointer inline-block"
                >
                  Preencher outro formulário
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <ArcDivider fill="#241610" />

      {/* Perguntas frequentes — as objeções resolvidas onde a decisão acontece */}
      <section className="sg-bg-coffee sg-grain relative overflow-hidden pt-6 pb-20 md:pb-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: easeCustom }}
            className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start"
          >
            <div>
              <Eyebrow tone="amber" className="mb-5">Antes de perguntar</Eyebrow>
              <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[32px] sm:text-[44px] leading-[1.0] tracking-[-0.035em] text-[#FFFDF9] mb-5 m-0">
                O que costumam querer saber
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#C9BFB2] m-0 mb-6">
                Se a sua dúvida não estiver aqui, manda no WhatsApp. Respondemos de verdade,
                não com robô.
              </p>
              <a
                href={whatsappUrl('Olá! Tenho uma dúvida sobre a Speak&Go.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[16px] font-bold text-[#FF5A00] hover:text-[#FF7C33] transition-colors min-h-[44px]"
              >
                <MessageCircle className="w-[18px] h-[18px]" aria-hidden="true" />
                Perguntar no WhatsApp
              </a>
            </div>

            <Acordeao
              tom="escuro"
              inicial={-1}
              itens={FAQ.map((q) => ({
                id: q.id,
                titulo: q.pergunta,
                resumo: q.resumo,
                conteudo: <p className="m-0">{q.resposta}</p>,
              }))}
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ContatoPage;
