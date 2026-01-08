/**
 * Componente EcoScoreGauge.
 * Muestra el score ecológico con un indicador visual animado.
 */

'use client';

import { getScoreTextColor, getScoreLevel } from '@/utils/score.utils';

interface EcoScoreGaugeProps {
  score: number;
}

const SCORE_LABELS = {
  high: 'SOSTENIBLE',
  medium: 'MODERADO',
  low: 'CRÍTICO',
} as const;

export default function EcoScoreGauge({ score }: EcoScoreGaugeProps) {
  const colorClass = getScoreTextColor(score);
  const level = getScoreLevel(score);
  const bgColorClass = colorClass.replace('text-', 'bg-');
  const borderColorClass = colorClass.replace('text-', 'border-');

  return (
    <div className="h-full flex flex-col justify-center items-center py-6">
      <div className="relative w-56 h-56 flex items-center justify-center">
        {/* Outer Glow Ring */}
        <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 ${bgColorClass}`} />
        
        {/* Animated Dashed Ring */}
        <div className="absolute inset-0 border-[6px] border-white/10 rounded-full border-dashed animate-spin-slow" />
        
        {/* Inner Solid Ring */}
        <div className={`absolute inset-4 border-2 rounded-full opacity-30 ${borderColorClass}`} />

        {/* Main Score Display */}
        <div className="text-center z-10 relative">
          <span className={`text-7xl font-bold block mb-1 tracking-tighter ${colorClass}`}>
            {score.toFixed(1)}
          </span>
          <span className="text-xs font-bold text-white/40 tracking-[0.2em] uppercase block">
            Eco Score
          </span>
        </div>
      </div>
      
      {/* Label Badge */}
      <div className={`mt-8 py-2 px-8 rounded-full border bg-white/5 backdrop-blur-md ${borderColorClass} ${colorClass}`}>
        <span className="text-sm font-bold tracking-widest uppercase">
          {SCORE_LABELS[level]}
        </span>
      </div>
    </div>
  );
}
