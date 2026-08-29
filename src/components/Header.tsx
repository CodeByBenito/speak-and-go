import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import MorphicNavbar, { NavItem } from '@/components/kokonutui/morphic-navbar';
import MagneticButton from '@/components/ui/magnetic-button';
import { CONTATO, whatsappUrl } from '@/lib/site';
import { caminhoDe, PageType } from '@/lib/rotas';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const ease = [0.2, 0.7, 0.3, 1] as const;

const navItems: NavItem[] = [
  { id: 'home', name: 'Início' },
  { id: 'sobre', name: 'Sobre' },
  { id: 'programas', name: 'Programas' },
  { id: 'metodo', name: 'Metodologia' },
  { id: 'como', name: 'Como funciona' },
  { id: 'materiais', name: 'Materiais' },
];

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  /* Cabeçalho ganha peso assim que a página sai do topo */
  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  /* Com o painel aberto, o fundo não rola */
  useEffect(() => {
    document.body.style.overflow = menuAberto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuAberto]);

  /* Esc fecha */
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuAberto(false);
    };
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, []);

  const navegar = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onNavigate(id);
    setMenuAberto(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          rolou
            ? 'bg-[#0E0D0C]/92 backdrop-blur-xl border-b border-[#241F1B] shadow-lg'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-3 flex items-center justify-between gap-4">
          {/* Marca */}
          <motion.a
            href={caminhoDe('home')}
            onClick={(e) => navegar(e, 'home')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 text-[#FFFDF9] flex-none cursor-pointer rounded-[10px]"
            aria-label="Speak&Go — ir para o início"
          >
            <img
              src="/assets/img/logo-sg-128.png"
              srcSet="/assets/img/logo-sg-128.png 1x, /assets/img/logo-sg-256.png 2x"
              alt="Speak&Go"
              width={40}
              height={40}
              className="w-[40px] h-[40px] rounded-[11px] block ring-1 ring-[#3A251A]"
            />
            <span className="font-['Bricolage_Grotesque'] font-extrabold text-[20px] tracking-[-0.025em]">
              Speak<span className="text-[#FF5A00]">&amp;</span>Go
            </span>
          </motion.a>

          {/* Navegação desktop */}
          <div className="hidden lg:flex flex-1 justify-center min-w-0">
            <MorphicNavbar items={navItems} activeId={currentPage} onNavigate={onNavigate} />
          </div>

          {/* Ação persistente */}
          <div className="hidden lg:block flex-none">
            <MagneticButton
              href={caminhoDe('contato')}
              onClick={(e) => navegar(e, 'contato')}
              className="bg-[#FF5A00] text-[#0E0D0C] font-bold text-[14px] px-5 py-2.5 rounded-full whitespace-nowrap shadow-[0_8px_28px_-10px_rgba(255,90,0,0.8)] hover:bg-[#FF7C33] transition-colors gap-1.5"
            >
              Diagnóstico grátis
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </MagneticButton>
          </div>

          {/* Botão do menu móvel */}
          <button
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-[14px] border border-[#3A251A] bg-[#151312] text-[#FFFDF9] transition-colors active:scale-95"
            type="button"
            onClick={() => setMenuAberto(true)}
            aria-expanded={menuAberto}
            aria-controls="painel-menu"
            aria-label="Abrir menu"
          >
            <Menu className="w-[22px] h-[22px]" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Painel móvel em tela cheia */}
      <AnimatePresence>
        {menuAberto && (
          <motion.div
            key="painel"
            id="painel-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="fixed inset-0 z-[60] lg:hidden sg-bg-ember sg-grain flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#241F1B]">
              <span className="font-['Bricolage_Grotesque'] font-extrabold text-[20px] tracking-[-0.025em] text-[#FFFDF9]">
                Speak<span className="text-[#FF5A00]">&amp;</span>Go
              </span>
              <button
                type="button"
                onClick={() => setMenuAberto(false)}
                aria-label="Fechar menu"
                className="flex items-center justify-center w-11 h-11 rounded-[14px] border border-[#3A251A] bg-[#151312] text-[#FFFDF9] active:scale-95"
              >
                <X className="w-[22px] h-[22px]" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Navegação principal">
              <ul className="list-none p-0 m-0 grid gap-1">
                {navItems.map((item, i) => {
                  const ativo = currentPage === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 + i * 0.05, ease }}
                    >
                      <a
                        href={caminhoDe(item.id as PageType)}
                        onClick={(e) => navegar(e, item.id)}
                        aria-current={ativo ? 'page' : undefined}
                        className={`flex items-center justify-between gap-4 py-4 border-b border-[#241F1B] font-['Bricolage_Grotesque'] font-extrabold text-[28px] leading-[1.1] tracking-[-0.03em] transition-colors ${
                          ativo ? 'text-[#FF5A00]' : 'text-[#FFFDF9]'
                        }`}
                      >
                        {item.name}
                        <ArrowRight
                          className={`w-5 h-5 flex-none ${ativo ? 'text-[#FF5A00]' : 'text-[#5A3620]'}`}
                          aria-hidden="true"
                        />
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="px-6 pb-8 pt-4 grid gap-3 border-t border-[#241F1B]">
              <a
                href={caminhoDe('contato')}
                onClick={(e) => navegar(e, 'contato')}
                className="bg-[#FF5A00] text-[#0E0D0C] font-bold text-[16px] px-6 py-4 rounded-full text-center min-h-[52px] flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                Agendar diagnóstico grátis
                <ArrowRight className="w-[18px] h-[18px]" aria-hidden="true" />
              </a>
              <a
                href={whatsappUrl('Olá! Vim pelo site da Speak&Go.')}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#3A251A] text-[#FFFDF9] font-bold text-[16px] px-6 py-4 rounded-full text-center min-h-[52px] flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <MessageCircle className="w-[18px] h-[18px] text-[#FF5A00]" aria-hidden="true" />
                {CONTATO.whatsappExibicao}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
