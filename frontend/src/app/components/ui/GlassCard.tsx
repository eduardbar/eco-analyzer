/**
 * Componente GlassCard.
 * Tarjeta con efecto de vidrio esmerilado.
 */

'use client';

import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`
        bg-white/5 
        backdrop-blur-xl 
        border border-white/10 
        rounded-2xl 
        shadow-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}
