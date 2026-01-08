/**
 * Componente LoadingSpinner.
 * Indicador de carga animado.
 */

'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
} as const;

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  return (
    <div
      className={`
        ${SIZES[size]}
        border-white/20
        border-t-emerald-500
        rounded-full
        animate-spin
        ${className}
      `}
      role="status"
      aria-label="Cargando..."
    />
  );
}

/**
 * Variante con texto de carga.
 */
export function LoadingWithText({ text = 'Cargando...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <LoadingSpinner size="lg" />
      <p className="text-gray-400 animate-pulse">{text}</p>
    </div>
  );
}
