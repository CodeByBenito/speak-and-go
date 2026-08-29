import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FAQ, whatsappUrl } from '@/lib/site';
import {
  ROTAS, SITE_URL, PageType, caminhoDe, rotaDe, paginaDoEndereco,
} from '@/lib/rotas';

const HomePage = lazy(() => import('@/pages/HomePage'));
const SobrePage = lazy(() => import('@/pages/SobrePage'));
const ProgramasPage = lazy(() => import('@/pages/ProgramasPage'));
const MetodologiaPage = lazy(() => import('@/pages/MetodologiaPage'));
const ComoFuncionaPage = lazy(() => import('@/pages/ComoFuncionaPage'));
const MateriaisPage = lazy(() => import('@/pages/MateriaisPage'));
const ContatoPage = lazy(() => import('@/pages/ContatoPage'));
const PrivacidadePage = lazy(() => import('@/pages/PrivacidadePage'));

export type { PageType };

const easeCustom = [0.2, 0.7, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Metadados por página                                                */
/* ------------------------------------------------------------------ */

function elementoFixo(seletor: string, criar: () => HTMLElement): HTMLElement {
  let el = document.head.querySelector(seletor) as HTMLElement | null;
  if (!el) {
    el = criar();
    document.head.appendChild(el);
  }
  return el;
}

/**
 * Dados estruturados do FAQ, montados a partir de `FAQ` em site.ts.
 * Poderia estar fixo no index.html, mas aí viraria uma segunda cópia das
 * perguntas — e a cópia envelhece.
 */
function aplicarFaqEstruturado(page: PageType) {
  const ID = 'sg-faq-jsonld';
  document.getElementById(ID)?.remove();
  if (page !== 'contato') return;

  const el = document.createElement('script');
  el.type = 'application/ld+json';
  el.id = ID;
  el.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((q) => ({
      '@type': 'Question',
      name: q.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: q.resposta },
    })),
  });
  document.head.appendChild(el);
}

function aplicarMeta(page: PageType) {
  const rota = rotaDe(page);
  const url = SITE_URL.replace(/\/+$/, '') + rota.caminho;

  document.title = rota.titulo;

  const tag = (seletor: string, attr: string, valor: string) => {
    const el = document.head.querySelector(seletor);
    if (el) el.setAttribute(attr, valor);
  };

  tag('meta[name="description"]', 'content', rota.descricao);
  tag('meta[property="og:title"]', 'content', rota.titulo);
  tag('meta[property="og:description"]', 'content', rota.descricao);
  tag('meta[name="twitter:title"]', 'content', rota.titulo);
  tag('meta[name="twitter:description"]', 'content', rota.descricao);

  // Canônica e og:url acompanham a rota — antes ficavam presas à home
  const canonica = elementoFixo('link[rel="canonical"]', () => {
    const l = document.createElement('link');
    l.setAttribute('rel', 'canonical');
    return l;
  });
  canonica.setAttribute('href', url);

  const ogUrl = elementoFixo('meta[property="og:url"]', () => {
    const m = document.createElement('meta');
    m.setAttribute('property', 'og:url');
    return m;
  });
  ogUrl.setAttribute('content', url);

  aplicarFaqEstruturado(page);
}

/* ------------------------------------------------------------------ */

export function App() {
  const [page, setPage] = useState<PageType>(() => paginaDoEndereco().pagina);

  useEffect(() => {
    const { pagina, legado } = paginaDoEndereco();

    // Link antigo com hash (`/#programas`) vira caminho de verdade, sem
    // recarregar e sem entrada extra no histórico.
    if (legado) {
      window.history.replaceState({ pagina }, '', caminhoDe(pagina));
    }
    aplicarMeta(pagina);

    const aoVoltar = () => {
      const atual = paginaDoEndereco().pagina;
      setPage(atual);
      aplicarMeta(atual);
    };

    window.addEventListener('popstate', aoVoltar);
    return () => window.removeEventListener('popstate', aoVoltar);
  }, []);

  const navegar = (destino: string) => {
    const alvo = destino as PageType;
    if (!ROTAS.some((r) => r.id === alvo)) return;
    if (alvo === page) return;

    window.history.pushState({ pagina: alvo }, '', caminhoDe(alvo));
    setPage(alvo);
    aplicarMeta(alvo);
  };

  return (
    <div className="bg-[#0E0D0C] text-[#FFFDF9] min-h-screen flex flex-col overflow-x-hidden selection:bg-[#FF5A00] selection:text-[#0E0D0C]">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-3 focus:left-3 focus:bg-[#FF5A00] focus:text-[#0E0D0C] focus:font-bold focus:px-5 focus:py-3 focus:rounded-full"
      >
        Pular para o conteúdo
      </a>

      <Header currentPage={page} onNavigate={navegar} />

      <div className="flex-1" id="conteudo">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: easeCustom }}
          >
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-[60vh]">
                  <div
                    className="w-9 h-9 rounded-full border-2 border-[#241F1B] border-t-[#FF5A00] animate-spin"
                    role="status"
                    aria-label="Carregando"
                  />
                </div>
              }
            >
              {page === 'home' && <HomePage onNavigate={navegar} />}
              {page === 'sobre' && <SobrePage onNavigate={navegar} />}
              {page === 'programas' && <ProgramasPage onNavigate={navegar} />}
              {page === 'metodo' && <MetodologiaPage onNavigate={navegar} />}
              {page === 'como' && <ComoFuncionaPage onNavigate={navegar} />}
              {page === 'materiais' && <MateriaisPage onNavigate={navegar} />}
              {page === 'contato' && <ContatoPage onNavigate={navegar} />}
              {page === 'privacidade' && <PrivacidadePage onNavigate={navegar} />}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer onNavigate={navegar} />

      {/* Barra de ação fixa no mobile — o CTA nunca sai da tela.
          Some na página de contato e na política, onde seria ruído. */}
      {page !== 'contato' && page !== 'privacidade' && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E0D0C]/95 backdrop-blur-xl border-t border-[#241F1B] px-4 py-3 flex items-center gap-3">
          <a
            href={caminhoDe('contato')}
            onClick={(e) => {
              e.preventDefault();
              navegar('contato');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-1 bg-[#FF5A00] text-[#0E0D0C] font-bold text-[15px] rounded-full min-h-[48px] flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            Diagnóstico grátis
            <ArrowRight className="w-[17px] h-[17px]" aria-hidden="true" />
          </a>
          <a
            href={whatsappUrl('Olá! Vim pelo site da Speak&Go.')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="flex-none w-12 h-12 rounded-full border border-[#3A251A] bg-[#151312] text-[#FF5A00] flex items-center justify-center active:scale-95 transition-transform"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
