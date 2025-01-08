import React from 'react';
import GlassCard from '../ui/GlassCard';

interface EcoScoreGaugeProps {
  score: number;
  className?: string;
}

const EcoScoreGauge: React.FC<EcoScoreGaugeProps> = ({ score, className = '' }) => {
  const getScoreColor = (score: number) => {
    if (score >= 7.5) return 'text-green-400 border-green-400';
    if (score >= 5) return 'text-yellow-400 border-yellow-400';
    return 'text-red-400 border-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 7.5) return 'Excelente';
    if (score >= 5) return 'Moderado';
    return 'Preocupante';
  };

  const percentage = (score / 10) * 100;

  return (
    <GlassCard className={`p-6 text-center ${className}`}>
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
            className={getScoreColor(score)}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
            {score.toFixed(1)}
          </span>
          <span className="text-sm text-white/80">/ 10</span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mt-4">Eco-Score</h3>
      <p className={`text-sm font-medium ${getScoreColor(score)}`}>
        {getScoreLabel(score)}
      </p>
    </GlassCard>
  );
};

export default EcoScoreGauge;
