import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { Captions, Mic, NotebookPen, Pause, Play } from 'lucide-react';
import { AULA_DEMO, type FalaAula } from '@/lib/site';

/**
 * LiveClass — uma aula da Speak&Go encenada em seis falas.
 *
 * As falas entram uma a uma enquanto o card está na tela; ao fim, a conversa
 * some e recomeça. O visitante pode pausar (o conteúdo muda sozinho, então
 * precisa de controle) e ligar ou desligar as legendas em português.
 * Com movimento reduzido, a conversa aparece inteira e parada.
 */

const ease = [0.2, 0.7, 0.3, 1] as const;
const PASSO_MS = 2000;
const BARRAS = 28;
/** Duas batidas a mais no fim para a conversa inteira ser lida antes de recomeçar. */
const ULTIMO_PASSO = AULA_DEMO.length + 2;

const useRelogio = (inicio: number, ativo: boolean) => {
  const [s, setS] = useState(inicio);
  useEffect(() => {
    if (!ativo) return;
    const id = window.setInterval(() => setS((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [ativo]);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

const Onda: React.FC<{ ativa: boolean }> = ({ ativa }) => (
  <div className="flex h-8 min-w-0 flex-1 items-center gap-[3px] overflow-hidden" aria-hidden="true">
    {Array.from({ length: BARRAS }).map((_, i) => (
      <span
        key={i}
        className={`sg-wave h-full w-[3px] flex-none rounded-full transition-colors duration-300 ${
          ativa ? 'bg-[#FFB347]' : 'bg-[#F0E7D8]/20'
        }`}
        style={{
          animationDuration: `${0.6 + ((i * 37) % 6) / 10}s`,
          animationDelay: `${(i % 7) * -0.12}s`,
          animationPlayState: ativa ? 'running' : 'paused',
        }}
      />
    ))}
  </div>
);

const Fala: React.FC<{ fala: FalaAula; legendas: boolean }> = ({ fala, legendas }) => {
  if (fala.tipo === 'correcao') {
    return (
      <div className="w-full rounded-[16px] border border-[#FFB347]/25 bg-[#FFB347]/8 px-5 py-4">
        <p className="m-0 mb-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[#FFB347]">Correção na hora</p>
        <p className="m-0 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[18px] font-bold leading-[1.3]">
          <span className="text-[#9B9188] line-through decoration-[#9B9188]/60">{fala.disse}</span>
          <span className="text-[#9B9188]" aria-hidden="true">→</span>
          <span className="text-[#FFFDF9]">{fala.certo}</span>
        </p>
        <p className="m-0 mt-1 text-[14px] leading-[1.5] text-[#C9BFB2]">{fala.porque}</p>
      </div>
    );
  }

  if (fala.tipo === 'notas') {
    return (
      <div className="flex w-full items-center gap-3 rounded-[16px] border border-[#3A251A] bg-[#0E0D0C] px-5 py-3">
        <NotebookPen className="h-[18px] w-[18px] flex-none text-[#F0E7D8]" aria-hidden="true" />
        <p className="m-0 text-[14px] leading-[1.45] text-[#C9BFB2]">
          <strong className="text-[#FFFDF9]">Session Notes</strong> · {fala.foco}
        </p>
      </div>
    );
  }

  const aluno = fala.tipo === 'aluno';
  return (
    <div className={`flex ${aluno ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-[16px] px-4 py-3 ${
          aluno ? 'bg-[#F0E7D8] text-[#0E0D0C]' : 'border border-[#241F1B] bg-[#0E0D0C] text-[#FFFDF9]'
        }`}
      >
        <p className="m-0 text-[15px] font-medium leading-[1.4]" lang="en">
          {fala.en}
        </p>
        {legendas && (
          <p className={`m-0 mt-1 text-[13px] leading-[1.4] ${aluno ? 'text-[#5A3620]' : 'text-[#9B9188]'}`}>{fala.pt}</p>
        )}
      </div>
    </div>
  );
};

export const LiveClass: React.FC<{ className?: string }> = ({ className = '' }) => {
  const reduzir = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const naTela = useInView(ref, { margin: '-80px' });

  const [passo, setPasso] = useState(reduzir ? AULA_DEMO.length : 1);
  const [pausado, setPausado] = useState(false);
  const [legendas, setLegendas] = useState(true);

  const tocando = !reduzir && !pausado && naTela;
  const relogio = useRelogio(12 * 60 + 48, tocando);

  useEffect(() => {
    if (!tocando) return;
    // O passo 0 é a batida vazia entre uma volta e a próxima.
    const id = window.setInterval(() => setPasso((p) => (p >= ULTIMO_PASSO ? 0 : p + 1)), PASSO_MS);
    return () => window.clearInterval(id);
  }, [tocando]);

  const visiveis = AULA_DEMO.slice(0, Math.min(passo, AULA_DEMO.length));
  const atual = passo <= AULA_DEMO.length ? AULA_DEMO[passo - 1] : undefined;
  const falando = tocando && (atual?.tipo === 'aluno' || atual?.tipo === 'professor');

  return (
    <div ref={ref} className={`relative ${className}`}>
      <figure
        className="relative m-0 overflow-hidden rounded-[22px] border border-[#3A251A] bg-[#151312] shadow-2xl"
        aria-label="Demonstração de uma aula ao vivo da Speak&Go"
      >
        {/* Barra da chamada */}
        <div className="flex items-center justify-between gap-4 border-b border-[#241F1B] px-6 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <img src="/assets/img/logo-sg-128.png" alt="" width={40} height={40} className="h-10 w-10 flex-none rounded-[10px]" />
            <div className="min-w-0">
              <p className="m-0 text-[15px] font-bold leading-[1.2] text-[#FFFDF9]">Aula ao vivo</p>
              <p className="m-0 text-[13px] leading-[1.3] text-[#9B9188]">Conversação · 1:1</p>
            </div>
          </div>
          <span className="inline-flex flex-none items-center gap-2 rounded-full border border-[#3A251A] px-3 py-1.5 text-[13px] font-bold tabular-nums text-[#F0E7D8]">
            <span className={`h-2 w-2 rounded-full bg-[#FF5A00] ${tocando ? 'animate-pulse' : ''}`} aria-hidden="true" />
            REC {relogio}
          </span>
        </div>

        {/* A conversa */}
        <div
          className="flex h-[420px] flex-col justify-end gap-3 overflow-hidden px-6 py-6 [mask-image:linear-gradient(to_bottom,transparent,black_16%)]"
          aria-live="off"
        >
          <AnimatePresence initial={false}>
            {visiveis.map((fala, i) => (
              <motion.div
                key={i}
                layout="position"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.25, ease } }}
                transition={{ duration: 0.45, ease }}
              >
                <Fala fala={fala} legendas={legendas} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-4 border-t border-[#241F1B] px-6 py-4">
          <span
            className={`flex h-10 w-10 flex-none items-center justify-center rounded-full transition-colors duration-300 ${
              falando ? 'bg-[#FFB347] text-[#0E0D0C]' : 'bg-[#241F1B] text-[#F0E7D8]'
            }`}
            aria-hidden="true"
          >
            <Mic className="h-[18px] w-[18px]" />
          </span>
          <Onda ativa={falando} />
          {!reduzir && (
            <button
              type="button"
              onClick={() => setPausado((v) => !v)}
              aria-label={pausado ? 'Retomar a demonstração' : 'Pausar a demonstração'}
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-[#3A322B] text-[#FFFDF9] transition-colors duration-300 hover:border-[#FFFDF9]"
            >
              {pausado ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
            </button>
          )}
          <button
            type="button"
            onClick={() => setLegendas((v) => !v)}
            aria-pressed={legendas}
            className={`inline-flex min-h-[44px] flex-none items-center gap-2 rounded-full border px-4 text-[13px] font-bold transition-colors duration-300 hover:border-[#FFFDF9] ${
              legendas ? 'border-[#F0E7D8] text-[#FFFDF9]' : 'border-[#3A322B] text-[#9B9188]'
            }`}
          >
            <Captions className="h-4 w-4" aria-hidden="true" />
            Legendas
          </button>
        </div>
      </figure>
    </div>
  );
};

export default LiveClass;
