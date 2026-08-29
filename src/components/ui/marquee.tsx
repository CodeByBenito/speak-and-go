import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  /** Segundos para a esteira dar uma volta completa. Menor = mais rápido. */
  speed?: number;
  pauseOnHover?: boolean;
  /** Véu que dissolve o texto nas duas pontas, em vez de cortá-lo em seco. */
  fade?: boolean;
  className?: string;
}

/**
 * Esteira infinita.
 *
 * Duas cópias idênticas do conteúdo correm juntas e a faixa desliza -50%.
 * Quando a primeira cópia sai de cena, a segunda está exatamente no lugar
 * onde a primeira começou — por isso o laço não tem emenda visível.
 *
 * A segunda cópia é `aria-hidden`: quem usa leitor de tela ouve o texto uma vez.
 */
export const Marquee: React.FC<MarqueeProps> = ({
  children,
  speed = 25,
  pauseOnHover = true,
  fade = true,
  className = '',
}) => {
  const mascara = fade
    ? {
        maskImage:
          'linear-gradient(to right, transparent 0, #000 72px, #000 calc(100% - 72px), transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0, #000 72px, #000 calc(100% - 72px), transparent 100%)',
      }
    : undefined;

  return (
    <div
      className={`sg-marquee overflow-hidden flex select-none w-full ${className}`}
      style={mascara}
    >
      <div
        className="sg-marquee-track flex shrink-0 items-center"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>

      <style>{`
        @keyframes sgMarqueeScroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .sg-marquee-track {
          display: flex;
          width: max-content;
          animation-name: sgMarqueeScroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        ${pauseOnHover ? '.sg-marquee:hover .sg-marquee-track { animation-play-state: paused; }' : ''}

        /* Quem pediu menos movimento no sistema não recebe a esteira andando.
           Em troca, a faixa vira rolável no dedo e no trackpad, para que
           nenhuma frase fique inacessível. */
        @media (prefers-reduced-motion: reduce) {
          .sg-marquee {
            overflow-x: auto;
            scrollbar-width: none;
          }
          .sg-marquee::-webkit-scrollbar { display: none; }
          .sg-marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
