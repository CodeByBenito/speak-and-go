import React from 'react';

/**
 * Elementos gráficos autorais da Speak&Go.
 *
 * Tudo aqui é SVG inline: escala sem perder nitidez, herda a cor do contexto,
 * não pesa no carregamento e não depende de arquivo externo nenhum.
 */

/* ------------------------------------------------------------------ */
/* Divisor em arco — a transição entre uma seção e a seguinte          */
/* ------------------------------------------------------------------ */

interface DividerProps {
  /** Cor da seção que vem ABAIXO do divisor. */
  fill: string;
  className?: string;
  flip?: boolean;
}

export const ArcDivider: React.FC<DividerProps> = ({ fill, className = '', flip = false }) => (
  <div className={`relative w-full leading-[0] ${className}`} aria-hidden="true">
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`block w-full h-[48px] md:h-[80px] ${flip ? 'rotate-180' : ''}`}
    >
      <path d="M0,80 C280,10 560,0 720,0 C880,0 1160,10 1440,80 L1440,80 L0,80 Z" fill={fill} />
    </svg>
  </div>
);

/** Divisor diagonal — corte seco, para transições de mais energia. */
export const SlantDivider: React.FC<DividerProps> = ({ fill, className = '', flip = false }) => (
  <div className={`relative w-full leading-[0] ${className}`} aria-hidden="true">
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={`block w-full h-[36px] md:h-[60px] ${flip ? 'rotate-180' : ''}`}
    >
      <path d="M0,60 L1440,0 L1440,60 Z" fill={fill} />
    </svg>
  </div>
);

/* ------------------------------------------------------------------ */
/* Grafismo do "&" — a marca virando ornamento                         */
/* ------------------------------------------------------------------ */

export const AmpersandMark: React.FC<{ className?: string; opacity?: number }> = ({
  className = '',
  opacity = 0.06,
}) => (
  <svg
    viewBox="0 0 200 200"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
    style={{ opacity }}
  >
    <defs>
      <linearGradient id="sg-amp" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF5A00" />
        <stop offset="100%" stopColor="#FFB347" />
      </linearGradient>
    </defs>
    <text
      x="50%"
      y="54%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily="Bricolage Grotesque, sans-serif"
      fontWeight="800"
      fontSize="190"
      fill="url(#sg-amp)"
    >
      &amp;
    </text>
  </svg>
);

/* ------------------------------------------------------------------ */
/* Ondas concêntricas — "a fala saindo"                                */
/* ------------------------------------------------------------------ */

export const SpeechWaves: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 240 240" className={`pointer-events-none ${className}`} aria-hidden="true">
    {[40, 70, 100, 130].map((r, i) => (
      <circle
        key={r}
        cx="120"
        cy="120"
        r={r}
        fill="none"
        stroke="#FF5A00"
        strokeWidth="1.5"
        opacity={0.4 - i * 0.08}
      />
    ))}
    <circle cx="120" cy="120" r="14" fill="#FF5A00" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Trilha da jornada — marcos ligados por uma linha                    */
/* ------------------------------------------------------------------ */

/**
 * Reescrita em HTML + CSS, não em SVG.
 *
 * A versão em SVG tinha três defeitos que só apareceram no navegador real:
 *   1. o primeiro e o último marco ficavam cortados pela borda do viewBox;
 *   2. a linha sumia — o gradiente usava `objectBoundingBox` num `<line>`
 *      de altura zero, caso em que o Chrome não pinta nada;
 *   3. com `preserveAspectRatio="none"` a altura era refém da proporção do
 *      viewBox, o que abria um vão morto embaixo dos marcos.
 *
 * Em CSS nada disso existe: a linha é um `div` com gradiente, os marcos são
 * `flex` com `justify-between` (nunca encostam na borda) e o rótulo faz parte
 * do componente, então texto e marco não podem desalinhar.
 */
export const JourneyLine: React.FC<{
  /** Rótulo de cada marco. Sem rótulo, mostra só a linha e os pontos. */
  rotulos?: string[];
  /** Quantos marcos, quando não há rótulos. */
  steps?: number;
  /** 'escuro' = linha sobre fundo preto/café; 'claro' = sobre bege/creme. */
  tom?: 'escuro' | 'claro';
  className?: string;
}> = ({ rotulos, steps = 5, tom = 'escuro', className = '' }) => {
  const marcos = rotulos ?? Array.from({ length: steps }, () => '');
  const miolo = tom === 'claro' ? 'bg-[#F0E7D8]' : 'bg-[#0E0D0C]';
  const texto = tom === 'claro' ? 'text-[#5A3620]' : 'text-[#C9BFB2]';

  return (
    <div className={`relative w-full ${className}`}>
      {/* A linha, atrás dos marcos */}
      <div
        className="absolute left-0 right-0 top-[11px] h-[2px] rounded-full bg-gradient-to-r from-[#5A3620] via-[#FF5A00] to-[#FFB347]"
        aria-hidden="true"
      />

      <ol className="relative flex items-start justify-between list-none p-0 m-0 gap-2">
        {marcos.map((rotulo, i) => (
          <li key={i} className="flex flex-col items-center flex-1 min-w-0">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center flex-none ring-2 ring-[#FF5A00] ${miolo}`}
              aria-hidden="true"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A00]" />
            </span>
            {rotulo && (
              <span
                className={`mt-3.5 text-[13px] leading-[1.3] font-bold text-center ${texto}`}
              >
                {rotulo}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Selo de ícone — o ícone de cada programa e de cada pilar            */
/* ------------------------------------------------------------------ */

interface IconBadgeProps {
  children: React.ReactNode;
  tone?: 'orange' | 'amber' | 'brown' | 'cream';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const TONES: Record<string, string> = {
  orange: 'bg-[#FF5A00]/12 text-[#FF5A00] ring-1 ring-[#FF5A00]/30',
  amber: 'bg-[#FFB347]/12 text-[#FFB347] ring-1 ring-[#FFB347]/30',
  brown: 'bg-[#5A3620]/10 text-[#5A3620] ring-1 ring-[#5A3620]/25',
  cream: 'bg-[#FFFDF9]/10 text-[#F0E7D8] ring-1 ring-[#FFFDF9]/20',
};

const SIZES: Record<string, string> = {
  sm: 'w-10 h-10 rounded-[12px]',
  md: 'w-12 h-12 rounded-[14px]',
  lg: 'w-16 h-16 rounded-[18px]',
};

export const IconBadge: React.FC<IconBadgeProps> = ({
  children,
  tone = 'orange',
  size = 'md',
  className = '',
}) => (
  <span
    className={`inline-flex items-center justify-center flex-none ${SIZES[size]} ${TONES[tone]} ${className}`}
    aria-hidden="true"
  >
    {children}
  </span>
);

/* ------------------------------------------------------------------ */
/* Espaço de foto                                                      */
/* ------------------------------------------------------------------ */

interface PhotoSlotProps {
  /**
   * Caminho da imagem em /public. Ex.: "/assets/img/equipe.jpg".
   * Sem src, o espaço mostra um grafismo da marca — não um buraco.
   */
  src?: string;
  alt?: string;
  /** Proporção: 'retrato' 3:4, 'paisagem' 4:3, 'largo' 16:9, 'painel' 2:1, 'quadrado' 1:1 */
  ratio?: 'retrato' | 'paisagem' | 'largo' | 'painel' | 'quadrado';
  /** Texto do placeholder, para você saber que foto vai ali. */
  hint?: string;
  /**
   * Véu escuro sobre a base da foto. Existe para costurar a imagem com os
   * fundos escuros. Em seção clara (bege/creme) use 'nenhum'.
   */
  veu?: 'escuro' | 'nenhum';
  /**
   * true para a foto acima da dobra. Carrega de imediato e com prioridade,
   * em vez de preguiçosa — carregar o herói com `lazy` atrasa o maior
   * elemento da tela e derruba a métrica de LCP.
   */
  prioridade?: boolean;
  className?: string;
  rounded?: string;
}

const RATIOS: Record<string, string> = {
  retrato: 'aspect-[3/4]',
  paisagem: 'aspect-[4/3]',
  largo: 'aspect-[16/9]',
  painel: 'aspect-[2/1]',
  quadrado: 'aspect-square',
};

export const PhotoSlot: React.FC<PhotoSlotProps> = ({
  src,
  alt = '',
  ratio = 'retrato',
  hint = 'Espaço reservado para foto',
  veu = 'escuro',
  prioridade = false,
  className = '',
  rounded = 'rounded-[22px]',
}) => {
  const [falhou, setFalhou] = React.useState(false);
  const mostrarFoto = src && !falhou;

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${RATIOS[ratio]} ${className}`}
      data-photo-slot={hint}
    >
      {mostrarFoto ? (
        <img
          src={src}
          alt={alt}
          loading={prioridade ? 'eager' : 'lazy'}
          decoding={prioridade ? 'sync' : 'async'}
          fetchPriority={prioridade ? 'high' : 'auto'}
          onError={() => setFalhou(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 sg-bg-coffee sg-dots flex flex-col items-center justify-center gap-4 p-6 text-center">
          <AmpersandMark className="absolute -right-8 -bottom-10 w-[70%]" opacity={0.09} />
          <SpeechWaves className="w-20 h-20 opacity-70" />
          <p className="relative text-[13px] leading-[1.4] tracking-[0.14em] uppercase font-bold text-[#8A8077] m-0 max-w-[220px]">
            {hint}
          </p>
        </div>
      )}

      {/* Véu quente: costura a foto com a paleta, qualquer que seja a imagem */}
      {mostrarFoto && veu === 'escuro' && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0E0D0C]/70 via-[#0E0D0C]/8 to-transparent"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Eyebrow — o rótulo que abre toda seção                              */
/* ------------------------------------------------------------------ */

export const Eyebrow: React.FC<{ children: React.ReactNode; tone?: 'orange' | 'brown' | 'amber'; className?: string }> = ({
  children,
  tone = 'orange',
  className = '',
}) => {
  const cor = tone === 'brown' ? 'text-[#5A3620]' : tone === 'amber' ? 'text-[#FFB347]' : 'text-[#FF5A00]';
  const ponto = tone === 'brown' ? 'bg-[#5A3620]' : tone === 'amber' ? 'bg-[#FFB347]' : 'bg-[#FF5A00]';
  return (
    <p className={`flex items-center gap-2.5 text-[12px] tracking-[0.18em] uppercase font-bold m-0 ${cor} ${className}`}>
      <span className={`w-[6px] h-[6px] rounded-full ${ponto}`} aria-hidden="true" />
      {children}
    </p>
  );
};
