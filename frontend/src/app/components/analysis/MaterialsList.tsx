import React from 'react';
import GlassCard from '../ui/GlassCard';

interface Material {
  materialName: string;
  sustainabilityScore: number;
  notes: string;
}

interface MaterialsListProps {
  materials: Material[];
  className?: string;
}

const MaterialsList: React.FC<MaterialsListProps> = ({ materials, className = '' }) => {
  const getScoreColor = (score: number) => {
    if (score >= 7.5) return 'text-green-400';
    if (score >= 5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className={className}>
      <h3 className="text-lg font-bold text-white mb-4">Análisis de Materiales</h3>
      <div className="space-y-3">
        {materials.map((material, index) => (
          <GlassCard key={index} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-white">{material.materialName}</h4>
              <span className={`font-bold ${getScoreColor(material.sustainabilityScore)}`}>
                {material.sustainabilityScore.toFixed(1)}/10
              </span>
            </div>
            <p className="text-sm text-white/80">{material.notes}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default MaterialsList;
