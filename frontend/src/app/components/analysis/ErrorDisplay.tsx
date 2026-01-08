/**
 * Componente para mostrar errores.
 */

'use client';

import GlassCard from '../ui/GlassCard';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorDisplay({ message, onRetry, className = '' }: ErrorDisplayProps) {
  return (
    <GlassCard className={`p-6 text-center ${className}`}>
      <ErrorIcon />
      <h3 className="text-lg font-bold text-white mb-2">Error</h3>
      <p className="text-white/70 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary text-sm"
        >
          Reintentar
        </button>
      )}
    </GlassCard>
  );
}

function ErrorIcon() {
  return (
    <div className="text-red-400 mb-4">
      <svg 
        className="w-12 h-12 mx-auto" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
        />
      </svg>
    </div>
  );
}
