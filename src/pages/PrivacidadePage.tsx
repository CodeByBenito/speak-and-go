import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import MagneticButton from '@/components/ui/magnetic-button';
import { ArcDivider, AmpersandMark, IconBadge, Eyebrow } from '@/components/brand/graphics';
import { CONTATO, whatsappUrl } from '@/lib/site';
import { caminhoDe } from '@/lib/rotas';

interface PrivacidadePageProps {
  onNavigate: (page: string) => void;
}

const ease = [0.2, 0.7, 0.3, 1] as const;

/** Data da última revisão do documento. Atualize ao mudar qualquer cláusula. */
export const ATUALIZADO_EM = '29 de agosto de 2026';

/**
 * PENDÊNCIA — identificação jurídica do controlador.
 *
 * A LGPD não exige CNPJ na política, mas uma política que identifica o
 * controlador só pelo nome fantasia é mais fraca se alguém questionar.
 * Quando a Speak&Go tiver CNPJ, acrescente razão social e número na seção 01.
 *
 * Este texto foi escrito a partir do que o site realmente faz, não de um
 * modelo genérico. Ainda assim, vale uma leitura de advogado antes de
 * publicar — principalmente as bases legais da seção 05.
 */

/* Blocos de texto corrido, para a página não virar um muro de JSX. */
const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[17px] leading-[1.7] text-[#5A3620] m-0 mb-4">{children}</p>
);

const Lista: React.FC<{ itens: React.ReactNode[] }> = ({ itens }) => (
  <ul className="grid gap-2.5 list-none p-0 m-0 mb-5">
    {itens.map((item, i) => (
      <li key={i} className="flex gap-3 text-[17px] leading-[1.6] text-[#5A3620]">
        <span className="text-[#B23F0A] font-bold flex-none" aria-hidden="true">
          ·
        </span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Secao: React.FC<{ num: string; titulo: string; children: React.ReactNode }> = ({
  num,
  titulo,
  children,
}) => (
  <section className="border-t border-[#DCD0BD] pt-9 mt-9 first:border-0 first:pt-0 first:mt-0">
    <div className="flex items-baseline gap-4 mb-5">
      <span className="font-['Bricolage_Grotesque'] font-extrabold text-[26px] leading-none tracking-[-0.03em] text-[#B23F0A] flex-none">
        {num}
      </span>
      <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[24px] sm:text-[28px] leading-[1.15] tracking-[-0.025em] text-[#0E0D0C] m-0">
        {titulo}
      </h2>
    </div>
    {children}
  </section>
);

export const PrivacidadePage: React.FC<PrivacidadePageProps> = ({ onNavigate }) => {
  const ir = (destino: string) => (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    onNavigate(destino);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main>
      {/* Cabeçalho */}
      <section className="sg-bg-ember sg-grain relative overflow-hidden py-20 md:py-24">
        <AmpersandMark className="absolute -right-16 -top-10 w-[360px] hidden md:block" opacity={0.05} />
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="max-w-[760px]"
          >
            <Eyebrow className="mb-6">Política de privacidade</Eyebrow>
            <h1 className="font-['Bricolage_Grotesque'] font-extrabold text-[34px] sm:text-[48px] lg:text-[56px] leading-[1.0] tracking-[-0.04em] mb-6 text-[#FFFDF9]">
              O que fazemos com os seus dados.
            </h1>
            <p className="text-[18px] leading-[1.6] text-[#F0E7D8] m-0">
              Em português claro, sem letra miúda. Se ficar alguma dúvida, é só perguntar.
            </p>
            <p className="text-[14px] text-[#8A8077] mt-6 m-0">
              Última atualização: {ATUALIZADO_EM}
            </p>
          </motion.div>
        </div>
      </section>

      <ArcDivider fill="#F0E7D8" />

      {/* Corpo */}
      <section className="sg-bg-sand text-[#0E0D0C] pt-6 pb-20 md:pb-24 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
          <div className="max-w-[720px]">
            {/* Resumo honesto, antes do texto formal */}
            <div className="bg-[#FFFDF9] rounded-[20px] p-7 md:p-8 mb-12 border border-[#DCD0BD]">
              <div className="flex items-start gap-4">
                <IconBadge tone="brown" size="md">
                  <ShieldCheck className="w-6 h-6" strokeWidth={1.75} />
                </IconBadge>
                <div>
                  <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[21px] leading-[1.15] tracking-[-0.02em] text-[#0E0D0C] m-0 mb-3">
                    O resumo, em quatro linhas
                  </h2>
                  <Lista
                    itens={[
                      'Este site não tem banco de dados. O formulário monta uma mensagem e abre o seu WhatsApp — nada fica guardado aqui.',
                      'Não usamos cookies próprios, não temos analytics e não guardamos nada no seu navegador.',
                      'Não vendemos, alugamos nem trocamos dados de ninguém.',
                      'Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento.',
                    ]}
                  />
                </div>
              </div>
            </div>

            <Secao num="01" titulo="Quem é o responsável pelos seus dados">
              {/* Ao ter CNPJ, troque por: "A <RAZÃO SOCIAL>, CNPJ nº <número>,
                  que atua sob a marca Speak&Go, é a controladora..." */}
              <P>
                A Speak&amp;Go é a controladora dos dados pessoais tratados aqui, nos termos da
                Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
              </P>
              <P>
                Para qualquer assunto relacionado a dados pessoais — dúvida, pedido de acesso,
                correção ou exclusão — fale com a gente:
              </P>
              <Lista
                itens={[
                  <>
                    E-mail:{' '}
                    <a href={`mailto:${CONTATO.email}`} className="text-[#B23F0A] font-bold sg-underline sg-link-inline">
                      {CONTATO.email}
                    </a>
                  </>,
                  <>
                    WhatsApp:{' '}
                    <a
                      href={whatsappUrl('Olá! Tenho uma dúvida sobre a política de privacidade.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#B23F0A] font-bold sg-underline sg-link-inline"
                    >
                      {CONTATO.whatsappExibicao}
                    </a>
                  </>,
                ]}
              />
            </Secao>

            <Secao num="02" titulo="Que dados coletamos">
              <P>
                <strong>Quando você preenche o formulário do site:</strong> nome, número de
                WhatsApp, seu nível de inglês hoje, o programa que despertou interesse, seu
                objetivo principal com o idioma e os horários em que você costuma estar livre.
                Só o nome, o WhatsApp e o nível são obrigatórios.
              </P>
              <P>
                <strong>Quando você fala com a gente por outro canal</strong> — WhatsApp,
                e-mail ou Instagram —, ficamos com aquilo que você mesmo escreve na conversa.
              </P>
              <P>
                <strong>Se você se tornar aluno,</strong> passamos a tratar também as
                informações do formulário de entrada, os registros das aulas e o acompanhamento
                da sua evolução, guardados na sua sala do Google Classroom.
              </P>
              <P>
                Não pedimos CPF, endereço, dados de cartão nem qualquer informação sensível para
                agendar um diagnóstico.
              </P>
            </Secao>

            <Secao num="03" titulo="Como o formulário funciona por dentro">
              <P>
                Vale explicar, porque muda bastante o que acontece com o que você digita: este
                site é estático. Ele não tem servidor próprio nem banco de dados.
              </P>
              <P>
                Quando você clica em enviar, o seu próprio navegador monta uma mensagem de texto
                com as respostas e abre o WhatsApp com ela pronta. Nada é gravado no site, e nada
                sai do seu aparelho até você apertar enviar na conversa. A partir daí, os dados
                existem na conversa do WhatsApp, como qualquer mensagem que você mandaria por
                conta própria.
              </P>
            </Secao>

            <Secao num="04" titulo="Para que usamos">
              <Lista
                itens={[
                  'Entrar em contato para agendar e conduzir o diagnóstico gratuito.',
                  'Recomendar o programa e o plano que fazem sentido para o seu objetivo.',
                  'Prestar o serviço, se você se tornar aluno: planejar aulas, acompanhar evolução e organizar seus materiais.',
                  'Responder o que você perguntar pelos nossos canais.',
                ]}
              />
              <P>
                Não usamos os seus dados para publicidade direcionada nem para alimentar
                qualquer tipo de perfil comercial.
              </P>
            </Secao>

            <Secao num="05" titulo="Com que base legal">
              <P>
                Quando você pede contato, o tratamento se apoia no{' '}
                <strong>procedimento preliminar de contrato a seu pedido</strong> (art. 7º, V da
                LGPD). Se você se torna aluno, passa a ser{' '}
                <strong>execução do contrato</strong> (mesmo artigo). Para responder mensagens que
                você nos envia por conta própria, o apoio é o{' '}
                <strong>legítimo interesse</strong> (art. 7º, IX) — sempre limitado ao que você
                mesmo procurou.
              </P>
            </Secao>

            <Secao num="06" titulo="Com quem compartilhamos">
              <P>
                Não vendemos, não alugamos e não trocamos dados de ninguém. O compartilhamento se
                limita às ferramentas que usamos para funcionar, e apenas no necessário:
              </P>
              <Lista
                itens={[
                  <>
                    <strong>WhatsApp (Meta)</strong> — é onde a conversa acontece.
                  </>,
                  <>
                    <strong>Google</strong> — Meet para as aulas ao vivo, Classroom e Drive para os
                    seus materiais.
                  </>,
                  <>
                    <strong>Serviço de hospedagem do site</strong> — que, como todo servidor web,
                    registra acessos técnicos por questão de segurança.
                  </>,
                ]}
              />
              <P>
                Cada uma dessas empresas tem a própria política de privacidade, e o tratamento que
                elas fazem segue os termos delas. Podemos ainda compartilhar dados se uma ordem
                judicial ou obrigação legal exigir.
              </P>
            </Secao>

            <Secao num="07" titulo="Cookies e rastreamento">
              <P>
                Este site <strong>não usa cookies próprios</strong>, não tem Google Analytics, não
                tem pixel de rede social e não guarda nada no armazenamento do seu navegador.
              </P>
              <P>
                Existe uma única conexão externa: as fontes tipográficas são carregadas do Google
                Fonts. Como em qualquer arquivo buscado na internet, isso transmite ao Google o seu
                endereço de IP e informações básicas do navegador, necessárias para entregar o
                arquivo.
              </P>
            </Secao>

            <Secao num="08" titulo="Por quanto tempo guardamos">
              <P>
                Conversas de quem pediu contato mas não seguiu adiante são mantidas apenas enquanto
                fizer sentido para retomar o assunto, e apagadas quando você pedir. Dados de alunos
                são guardados durante a jornada e pelo prazo necessário para cumprir obrigações
                legais depois do encerramento.
              </P>
              <P>
                Seus materiais de estudo continuam acessíveis na sua sala do Classroom, e você pode
                pedir a remoção deles a qualquer momento.
              </P>
            </Secao>

            <Secao num="09" titulo="Seus direitos">
              <P>A LGPD garante a você, sobre os seus dados, o direito de:</P>
              <Lista
                itens={[
                  'Confirmar que existe tratamento e acessar o que temos.',
                  'Corrigir dado incompleto, desatualizado ou errado.',
                  'Pedir anonimização, bloqueio ou eliminação de dado desnecessário ou excessivo.',
                  'Pedir portabilidade a outro fornecedor.',
                  'Saber com quem compartilhamos os seus dados.',
                  'Revogar o consentimento e pedir a eliminação, quando o tratamento se apoiar nele.',
                  'Se opor a um tratamento que você considere irregular.',
                ]}
              />
              <P>
                Para exercer qualquer um deles, basta escrever para{' '}
                <a href={`mailto:${CONTATO.email}`} className="text-[#B23F0A] font-bold sg-underline sg-link-inline">
                  {CONTATO.email}
                </a>{' '}
                ou chamar no WhatsApp. Respondemos em até 15 dias.
              </P>
            </Secao>

            <Secao num="10" titulo="Menores de 18 anos">
              <P>
                A Speak&amp;Go atende jovens e adultos. Quando o aluno tiver menos de 18 anos, a
                contratação e o tratamento dos dados dependem do consentimento específico de um dos
                pais ou do responsável legal, na forma do art. 14 da LGPD.
              </P>
            </Secao>

            <Secao num="11" titulo="Segurança">
              <P>
                Usamos contas protegidas por senha e verificação em duas etapas nas ferramentas em
                que os dados ficam, e o acesso é restrito a quem precisa dele para dar aula ou
                atender você. Nenhum sistema é infalível: se acontecer um incidente que possa trazer
                risco relevante a você, avisamos você e a Autoridade Nacional de Proteção de Dados.
              </P>
            </Secao>

            <Secao num="12" titulo="Mudanças nesta política">
              <P>
                Se algo mudar de forma relevante, atualizamos esta página e a data do topo. Vale a
                pena dar uma olhada de vez em quando.
              </P>
            </Secao>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sg-bg-flame text-[#0E0D0C] py-14 md:py-16 relative overflow-hidden">
        <AmpersandMark className="absolute -right-10 -top-10 w-[260px]" opacity={0.12} />
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-[26px] sm:text-[34px] leading-[1.05] tracking-[-0.03em] max-w-[560px] m-0">
            Alguma dúvida sobre isso? É só perguntar.
          </h2>
          <MagneticButton
            href={caminhoDe('contato')}
            onClick={ir('contato')}
            className="bg-[#0E0D0C] text-[#FFFDF9] font-bold text-[16px] px-8 py-4 rounded-full shadow-xl hover:bg-[#241610] active:scale-95 transition-all flex-none gap-2"
          >
            Falar com a gente
            <ArrowRight className="w-[18px] h-[18px] text-[#FF5A00]" aria-hidden="true" />
          </MagneticButton>
        </div>
      </section>
    </main>
  );
};

export default PrivacidadePage;
