import React from 'react';
import {
  Compass, Briefcase, Plane, Globe, Zap,
  Search, Route, Video, CalendarDays, LineChart,
} from 'lucide-react';
import type { ChaveIcone } from '@/lib/site';

/** Um lugar só para decidir qual desenho representa cada conceito da marca. */
const MAPA: Record<ChaveIcone, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  bussola: Compass,
  maleta: Briefcase,
  aviao: Plane,
  globo: Globe,
  raio: Zap,
  lupa: Search,
  rota: Route,
  video: Video,
  agenda: CalendarDays,
  grafico: LineChart,
};

export const Icone: React.FC<{ chave: ChaveIcone; className?: string }> = ({
  chave,
  className = 'w-6 h-6',
}) => {
  const Svg = MAPA[chave] ?? Compass;
  return <Svg className={className} strokeWidth={1.75} />;
};

export default Icone;
