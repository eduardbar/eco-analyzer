import React from 'react';
import GlassCard from '../ui/GlassCard';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry, className = '' }) => {
  return (
    <GlassCard className={`p-6 text-center ${className}`}>
      <div className="text-red-400 mb-4">
        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-white mb-2">Error</h3>
      <p className="text-white/80 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-300"
        >
          Reintentar
        </button>
      )}
    </GlassCard>
  );
};

export default ErrorDisplay;
