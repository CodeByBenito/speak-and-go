import React from 'react';
import { ArrowRight, MessageCircle, Mail } from 'lucide-react';
import { AmpersandMark } from '@/components/brand/graphics';
import { CONTATO, MARCA, whatsappUrl } from '@/lib/site';
import { caminhoDe, PageType } from '@/lib/rotas';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const paginas = [
  { id: 'home', nome: 'Início' },
  { id: 'sobre', nome: 'Sobre' },
  { id: 'programas', nome: 'Programas e planos' },
  { id: 'metodo', nome: 'Metodologia' },
  { id: 'como', nome: 'Como funciona' },
  { id: 'materiais', nome: 'Materiais' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const navegar = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-[#0B0A09] text-[#FFFDF9] pb-[76px] lg:pb-0">
      <AmpersandMark className="absolute -left-16 -bottom-16 w-[340px]" opacity={0.04} />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 pt-16 pb-12 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1.1fr] gap-12 relative z-10">
        {/* Marca */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img
              src="/assets/img/logo-sg-128.png"
              srcSet="/assets/img/logo-sg-128.png 1x, /assets/img/logo-sg-256.png 2x"
              alt="Speak&Go"
              width={38}
              height={38}
              className="w-[38px] h-[38px] rounded-[11px] block ring-1 ring-[#3A251A]"
            />
            <span className="font-['Bricolage_Grotesque'] font-extrabold text-[18px] tracking-[-0.025em]">
              Speak<span className="text-[#FF5A00]">&amp;</span>Go
            </span>
          </div>
          <p className="text-[15px] leading-[1.6] text-[#C9BFB2] max-w-[300px] m-0">
            {MARCA.posicionamento}
          </p>
          <p className="font-['Bricolage_Grotesque'] font-extrabold text-[17px] mt-5 tracking-[-0.02em] bg-gradient-to-r from-[#FF5A00] to-[#FFB347] bg-clip-text text-transparent">
            {MARCA.assinatura}
          </p>
        </div>

        {/* Páginas */}
        <nav className="grid gap-3 content-start" aria-label="Rodapé — páginas">
          <h2 className="text-[12px] tracking-[0.18em] uppercase text-[#8A8077] mb-1 font-bold m-0">
            Páginas
          </h2>
          {paginas.map((p) => (
            <a
              key={p.id}
              href={caminhoDe(p.id as PageType)}
              onClick={(e) => navegar(e, p.id)}
              className="text-[15px] text-[#C9BFB2] hover:text-[#FF5A00] transition-colors cursor-pointer w-fit inline-flex items-center min-h-[44px] md:min-h-0 md:py-0"
            >
              {p.nome}
            </a>
          ))}
        </nav>

        {/* Contato */}
        <div className="grid gap-3.5 content-start">
          <h2 className="text-[12px] tracking-[0.18em] uppercase text-[#8A8077] mb-1 font-bold m-0">
            Fale com a gente
          </h2>

          <a
            href={whatsappUrl('Olá! Vim pelo site da Speak&Go e quero saber mais sobre a mentoria.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-[15px] text-[#C9BFB2] hover:text-[#FF5A00] transition-colors w-fit min-h-[44px] md:min-h-0"
          >
            <MessageCircle className="w-4 h-4 text-[#FF5A00]" aria-hidden="true" />
            {CONTATO.whatsappExibicao}
          </a>

          <a
            href={CONTATO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-[15px] text-[#C9BFB2] hover:text-[#FF5A00] transition-colors w-fit min-h-[44px] md:min-h-0"
          >
            <svg
              className="w-4 h-4 text-[#FF5A00]"
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
            {CONTATO.instagramHandle}
          </a>

          <a
            href={`mailto:${CONTATO.email}`}
            className="inline-flex items-center gap-2.5 text-[15px] text-[#C9BFB2] hover:text-[#FF5A00] transition-colors w-fit min-h-[44px] md:min-h-0"
          >
            <Mail className="w-4 h-4 text-[#FF5A00]" aria-hidden="true" />
            {CONTATO.email}
          </a>

          <a
            href={caminhoDe('contato')}
            onClick={(e) => navegar(e, 'contato')}
            className="group inline-flex items-center gap-2 text-[15px] font-bold text-[#FF5A00] hover:text-[#FF7C33] transition-colors cursor-pointer w-fit mt-2 min-h-[44px] md:min-h-0"
          >
            Agendar diagnóstico grátis
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-6 border-t border-[#241F1B] flex justify-between gap-x-6 gap-y-3 flex-wrap text-[13px] text-[#8A8077] relative z-10">
        <span>© {new Date().getFullYear()} Speak&amp;Go. Todos os direitos reservados.</span>
        <span className="flex items-center gap-4 flex-wrap">
          <a
            href={caminhoDe('privacidade')}
            onClick={(e) => navegar(e, 'privacidade')}
            className="hover:text-[#FF5A00] transition-colors cursor-pointer inline-flex items-center min-h-[44px] md:min-h-0"
          >
            Política de privacidade
          </a>
          <span aria-hidden="true">·</span>
          <span>Aulas online e individuais · Brasil</span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
