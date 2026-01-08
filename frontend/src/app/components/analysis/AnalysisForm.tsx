import React, { useState } from 'react';

interface AnalysisFormProps {
  onSubmit: (description: string) => void;
  isLoading: boolean;
}

export default function AnalysisForm({ onSubmit, isLoading }: AnalysisFormProps) {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe el producto aquí (ej: 'Camiseta de algodón 100% orgánico, teñido natural, fabricada en Portugal...')"
          className="w-full h-64 bg-white/5 border border-white/10 rounded-3xl p-8 text-xl text-white placeholder-white/30 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none transition-all resize-none leading-relaxed"
          disabled={isLoading}
        />
        <div className="absolute bottom-6 right-8 text-sm font-medium text-white/40 bg-black/20 px-3 py-1 rounded-full backdrop-blur-md">
          {description.length} caracteres
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={!description.trim() || isLoading}
          className="btn-primary min-w-[200px] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group text-lg"
        >
          {isLoading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Procesando...
            </>
          ) : (
            <>
              Generar Análisis Completo
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
