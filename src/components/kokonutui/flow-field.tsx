import React, { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ColorTheme = "aurora" | "ember" | "ocean" | "speakgo";
type ParticleDensity = "sparse" | "medium" | "dense";

interface Particle {
  x: number;
  y: number;
  speed: number;
  hue: number;
  life: number;
  maxLife: number;
}

interface ThemeConfig {
  hueStart: number;
  hueRange: number;
  saturation: number;
  lightness: number;
  bg: string;
  trailAlpha: number;
}

export interface FlowFieldProps {
  className?: string;
  children?: ReactNode;
  theme?: ColorTheme;
  density?: ParticleDensity;
  customBg?: string;
}

const PARTICLE_COUNTS: Record<ParticleDensity, number> = {
  sparse: 300,
  medium: 600,
  dense: 1000,
} as const;

const THEMES: Record<ColorTheme, ThemeConfig> = {
  speakgo: {
    hueStart: 18,
    hueRange: 32,
    saturation: 100,
    lightness: 54,
    bg: "14, 13, 12", // #0E0D0C
    trailAlpha: 0.08,
  },
  ember: {
    hueStart: 10,
    hueRange: 45,
    saturation: 95,
    lightness: 58,
    bg: "14, 13, 12",
    trailAlpha: 0.07,
  },
  aurora: {
    hueStart: 120,
    hueRange: 200,
    saturation: 90,
    lightness: 62,
    bg: "14, 13, 12",
    trailAlpha: 0.06,
  },
  ocean: {
    hueStart: 180,
    hueRange: 90,
    saturation: 88,
    lightness: 60,
    bg: "14, 13, 12",
    trailAlpha: 0.06,
  },
} as const;

function fieldAngle(x: number, y: number, t: number): number {
  const s = 0.0025;
  return (
    Math.sin(x * s + t * 0.0007) * Math.PI +
    Math.cos(y * s + t * 0.0005) * Math.PI +
    Math.sin((x + y) * s * 0.6 + t * 0.0009) * Math.PI * 0.6 +
    Math.cos((x - y) * s * 0.4 + t * 0.0006) * Math.PI * 0.4
  );
}

export default function FlowField({
  className,
  children,
  theme = "speakgo",
  density = "medium",
  customBg,
}: FlowFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth <= 768;

    const cfg = THEMES[theme] || THEMES.speakgo;
    const baseCount = PARTICLE_COUNTS[density];
    const count = isMobile ? Math.floor(baseCount * 0.5) : baseCount;
    const dpr = Math.min(window.devicePixelRatio ?? 1, 2); // Cap at 2 for performance

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    let animId = 0;
    let time = 0;
    let isVisible = true;
    let particles: Particle[] = [];

    const bgRgb = customBg || cfg.bg;

    const spawnParticle = (): Particle => {
      const maxLife = 180 + Math.floor(Math.random() * 260);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.8 + Math.random() * 1.4,
        hue: cfg.hueStart + Math.random() * cfg.hueRange,
        life: Math.floor(Math.random() * maxLife),
        maxLife,
      };
    };

    const resize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      ctx.fillStyle = `rgb(${bgRgb})`;
      ctx.fillRect(0, 0, width, height);

      particles = Array.from({ length: count }, spawnParticle);
    };

    const render = () => {
      if (!isVisible || prefersReducedMotion) return;

      time++;

      ctx.fillStyle = `rgba(${bgRgb}, ${cfg.trailAlpha})`;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        const angle = fieldAngle(p.x, p.y, time);

        p.x += Math.cos(angle) * p.speed;
        p.y += Math.sin(angle) * p.speed;
        p.life++;

        if (p.life > p.maxLife) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.life = 0;
          p.hue = cfg.hueStart + Math.random() * cfg.hueRange;
          continue;
        }

        if (p.x < 0) p.x += width;
        else if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        else if (p.y > height) p.y -= height;

        const progress = p.life / p.maxLife;
        const fadeIn = Math.min(progress * 8, 1);
        const fadeOut = Math.min((1 - progress) * 6, 1);
        const alpha = fadeIn * fadeOut * 0.85;

        const hueMod = (p.hue + (angle / (Math.PI * 2)) * 30 + 360) % 360;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hueMod}, ${cfg.saturation}%, ${cfg.lightness}%, ${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    resize();

    // IntersectionObserver to pause loop when container is scrolled out of view
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible && !prefersReducedMotion) {
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);

    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [theme, density, customBg]);

  const bgRgb = customBg || (THEMES[theme] || THEMES.speakgo).bg;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden",
        className
      )}
      style={{ background: `rgb(${bgRgb})` }}
    >
      <canvas
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        ref={canvasRef}
      />

      {/* Radial vignette — soft focus on content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(${bgRgb}, 0.85) 100%)`,
        }}
      />

      {/* Fades top and bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background: `linear-gradient(to bottom, rgb(${bgRgb}), transparent)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background: `linear-gradient(to top, rgb(${bgRgb}), transparent)`,
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
