import React, { useId, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';

/**
 * Revelação progressiva.
 *
 * A regra do site: a tela mostra uma ou duas linhas. Quem quiser o detalhe,
 * abre. Nada de informação se perde e nada de parede de texto.
 */

const ease = [0.2, 0.7, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Card que expande                                                    */
/* ------------------------------------------------------------------ */

interface ExpandCardProps {
  titulo: string;
  resumo: string;
  detalhe?: React.ReactNode;
  icone?: React.ReactNode;
  numero?: string;
  /** 'escuro' para fundos pretos/café, 'claro' para bege/creme */
  tom?: 'escuro' | 'claro' | 'destaque';
  rotuloAbrir?: string;
  className?: string;
}

export const ExpandCard: React.FC<ExpandCardProps> = ({
  titulo,
  resumo,
  detalhe,
  icone,
  numero,
  tom = 'escuro',
  rotuloAbrir = 'Ver detalhe',
  className = '',
}) => {
  const [aberto, setAberto] = useState(false);
  const id = useId();

  const paleta = {
    escuro: {
      card: 'bg-[#151312] border border-[#241F1B] hover:border-[#3A251A]',
      titulo: 'text-[#FFFDF9]',
      resumo: 'text-[#C9BFB2]',
      detalhe: 'text-[#9B9188]',
      linha: 'border-[#241F1B]',
      botao: 'text-[#FF5A00] hover:text-[#FF7C33]',
      numero: 'text-[#3A251A]',
    },
    claro: {
      card: 'bg-[#FFFDF9] border border-transparent hover:border-[#DCD0BD]',
      titulo: 'text-[#0E0D0C]',
      resumo: 'text-[#5A3620]',
      detalhe: 'text-[#5A3620]',
      linha: 'border-[#DCD0BD]',
      botao: 'text-[#B23F0A] hover:text-[#FF5A00]',
      numero: 'text-[#DCD0BD]',
    },
    destaque: {
      card: 'bg-[#FF5A00] border border-[#FF5A00]',
      titulo: 'text-[#0E0D0C]',
      resumo: 'text-[#0E0D0C]',
      detalhe: 'text-[#0E0D0C]',
      linha: 'border-[#0E0D0C]/25',
      botao: 'text-[#0E0D0C] hover:opacity-70',
      numero: 'text-[#0E0D0C]/25',
    },
  }[tom];

  return (
    <div
      className={`relative overflow-hidden rounded-[20px] p-7 transition-colors duration-300 ${paleta.card} ${className}`}
    >
      {numero && (
        <span
          className={`absolute top-4 right-6 font-['Bricolage_Grotesque'] font-extrabold text-[54px] leading-none tracking-[-0.04em] pointer-events-none select-none ${paleta.numero}`}
          aria-hidden="true"
        >
          {numero}
        </span>
      )}

      {icone && <div className="mb-5 relative">{icone}</div>}

      <h3
        className={`font-['Bricolage_Grotesque'] font-extrabold text-[21px] leading-[1.15] tracking-[-0.02em] mb-2.5 relative m-0 ${paleta.titulo}`}
      >
        {titulo}
      </h3>

      <p className={`text-[15px] leading-[1.55] m-0 relative ${paleta.resumo}`}>{resumo}</p>

      {detalhe && (
        <>
          <AnimatePresence initial={false}>
            {aberto && (
              <motion.div
                key="detalhe"
                id={`${id}-detalhe`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease }}
                className="overflow-hidden relative"
              >
                <div className={`mt-5 pt-5 border-t text-[15px] leading-[1.6] ${paleta.linha} ${paleta.detalhe}`}>
                  {detalhe}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls={`${id}-detalhe`}
            className={`mt-5 inline-flex items-center gap-2 text-[14px] font-bold transition-colors relative min-h-[44px] ${paleta.botao}`}
          >
            <motion.span
              animate={{ rotate: aberto ? 45 : 0 }}
              transition={{ duration: 0.3, ease }}
              className="inline-flex"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
            </motion.span>
            {aberto ? 'Fechar' : rotuloAbrir}
          </button>
        </>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Acordeão                                                            */
/* ------------------------------------------------------------------ */

export interface ItemAcordeao {
  id: string;
  titulo: string;
  resumo?: string;
  conteudo: React.ReactNode;
  etiqueta?: string;
}

interface AcordeaoProps {
  itens: ItemAcordeao[];
  tom?: 'escuro' | 'claro';
  /** Índice que já começa aberto. -1 para todos fechados. */
  inicial?: number;
  className?: string;
}

export const Acordeao: React.FC<AcordeaoProps> = ({
  itens,
  tom = 'escuro',
  inicial = 0,
  className = '',
}) => {
  const [abertoId, setAbertoId] = useState<string | null>(itens[inicial]?.id ?? null);

  const p =
    tom === 'claro'
      ? {
          item: 'bg-[#FFFDF9]',
          titulo: 'text-[#0E0D0C]',
          resumo: 'text-[#5A3620]',
          conteudo: 'text-[#5A3620]',
          etiqueta: 'text-[#B23F0A]',
          sinal: 'text-[#5A3620]',
          borda: 'border-[#DCD0BD]',
        }
      : {
          item: 'bg-[#151312] border border-[#241F1B]',
          titulo: 'text-[#FFFDF9]',
          resumo: 'text-[#9B9188]',
          conteudo: 'text-[#C9BFB2]',
          etiqueta: 'text-[#FF5A00]',
          sinal: 'text-[#FF5A00]',
          borda: 'border-[#241F1B]',
        };

  return (
    <div className={`grid gap-3 ${className}`}>
      {itens.map((item) => {
        const aberto = abertoId === item.id;
        return (
          <div key={item.id} className={`rounded-[18px] overflow-hidden ${p.item}`}>
            <h3 className="m-0">
              <button
                type="button"
                onClick={() => setAbertoId(aberto ? null : item.id)}
                aria-expanded={aberto}
                aria-controls={`painel-${item.id}`}
                className="w-full flex items-start justify-between gap-5 text-left p-6 md:p-7 min-h-[44px]"
              >
                <span className="flex-1">
                  {item.etiqueta && (
                    <span
                      className={`block text-[11px] tracking-[0.18em] uppercase font-bold mb-2 ${p.etiqueta}`}
                    >
                      {item.etiqueta}
                    </span>
                  )}
                  <span
                    className={`block font-['Bricolage_Grotesque'] font-extrabold text-[20px] md:text-[23px] leading-[1.15] tracking-[-0.02em] ${p.titulo}`}
                  >
                    {item.titulo}
                  </span>
                  {item.resumo && (
                    <span className={`block text-[15px] leading-[1.5] mt-2 ${p.resumo}`}>
                      {item.resumo}
                    </span>
                  )}
                </span>

                <motion.span
                  animate={{ rotate: aberto ? 45 : 0 }}
                  transition={{ duration: 0.3, ease }}
                  className={`flex-none mt-1 ${p.sinal}`}
                  aria-hidden="true"
                >
                  <Plus className="w-6 h-6" />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {aberto && (
                <motion.div
                  id={`painel-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="overflow-hidden"
                >
                  <div
                    className={`px-6 md:px-7 pb-7 pt-1 text-[16px] leading-[1.65] border-t mt-0 ${p.borda} ${p.conteudo}`}
                  >
                    <div className="pt-5">{item.conteudo}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Abas                                                                */
/* ------------------------------------------------------------------ */

export interface ItemAba {
  id: string;
  rotulo: string;
  icone?: React.ReactNode;
  conteudo: React.ReactNode;
}

export const Abas: React.FC<{ itens: ItemAba[]; className?: string }> = ({
  itens,
  className = '',
}) => {
  const [ativa, setAtiva] = useState(itens[0]?.id);

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Programas"
        className="flex flex-wrap gap-2 mb-8 p-1.5 rounded-[18px] bg-[#151312] border border-[#241F1B] w-fit max-w-full"
      >
        {itens.map((item) => {
          const on = ativa === item.id;
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              id={`aba-${item.id}`}
              aria-selected={on}
              aria-controls={`painel-aba-${item.id}`}
              onClick={() => setAtiva(item.id)}
              className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-[13px] text-[14px] font-bold whitespace-nowrap transition-colors min-h-[44px] ${
                on ? 'text-[#0E0D0C]' : 'text-[#9B9188] hover:text-[#FFFDF9]'
              }`}
            >
              {on && (
                <motion.span
                  layoutId="aba-ativa"
                  className="absolute inset-0 rounded-[13px] bg-[#FF5A00]"
                  transition={{ duration: 0.3, ease }}
                />
              )}
              <span className="relative flex items-center gap-2">
                {item.icone}
                {item.rotulo}
              </span>
            </button>
          );
        })}
      </div>

      {itens.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`painel-aba-${item.id}`}
          aria-labelledby={`aba-${item.id}`}
          hidden={ativa !== item.id}
        >
          {ativa === item.id && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease }}
            >
              {item.conteudo}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};
