import React from 'react';
import EcoScoreGauge from './EcoScoreGauge';
import MetricCard from './MetricCard';
import MaterialsList from './MaterialsList';

interface Material {
  materialName: string;
  sustainabilityScore: number;
  notes: string;
}

interface AnalysisResult {
  productTitle: string;
  ecoScore: number;
  summary: string;
  carbonFootprint: number;
  waterUsage: number;
  materials: Material[];
}

interface ResultDisplayProps {
  result: AnalysisResult;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const CarbonIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.002 4.002 0 003 15z" />
    </svg>
  );

  const WaterIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
          {result.productTitle}
        </h2>
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-gray-300 text-lg leading-relaxed">{result.summary}</p>
        </div>
      </div>

      {/* Eco Score Gauge */}
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
        <EcoScoreGauge score={result.ecoScore} />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
          <MetricCard
            icon={<CarbonIcon />}
            title="Huella de Carbono"
            value={`${result.carbonFootprint} kg CO₂`}
            description="Emisiones de carbono estimadas"
          />
        </div>
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
          <MetricCard
            icon={<WaterIcon />}
            title="Uso de Agua"
            value={`${result.waterUsage} L`}
            description="Consumo de agua estimado"
          />
        </div>
      </div>

      {/* Materials Analysis */}
      {result.materials && result.materials.length > 0 && (
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
          <MaterialsList materials={result.materials} />
        </div>
      )}

      {/* Reset Button */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Realizar Nuevo Análisis</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
