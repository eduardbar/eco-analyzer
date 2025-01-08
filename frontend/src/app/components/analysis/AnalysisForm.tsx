import React, { useState } from 'react';
import CustomButton from '../ui/CustomButton';

interface AnalysisFormProps {
  onSubmit: (description: string) => void;
  isLoading: boolean;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onSubmit, isLoading }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    onSubmit(description);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-3">
          Descripción del Producto
        </label>
        <textarea
          className="w-full p-4 bg-white/5 text-white rounded-2xl border border-white/10 focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:outline-none transition-all duration-300 backdrop-blur-sm placeholder-gray-400 resize-none"
          rows={6}
          placeholder="Describe el producto que quieres analizar... (ej: iPhone 15 Pro, Tesla Model 3, etc.)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-400">
            {description.length}/500 caracteres
          </span>
          {description.length > 400 && (
            <span className="text-xs text-yellow-400">
              Descripción muy larga
            </span>
          )}
        </div>
      </div>
      
      <CustomButton 
        type="submit" 
        isLoading={isLoading} 
        disabled={isLoading || !description.trim()} 
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 px-6 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Analizando...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>Analizar Impacto Ambiental</span>
          </div>
        )}
      </CustomButton>
    </form>
  );
};

export default AnalysisForm;
