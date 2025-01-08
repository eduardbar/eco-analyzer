import React from 'react';
import GlassCard from '../ui/GlassCard';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description?: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  icon, 
  title, 
  value, 
  description, 
  className = '' 
}) => {
  return (
    <GlassCard className={`p-4 ${className}`}>
      <div className="flex items-center mb-2">
        <div className="mr-3 text-white/80">
          {icon}
        </div>
        <h4 className="font-bold text-white text-sm">{title}</h4>
      </div>
      <p className="text-xl font-bold text-white mb-1">{value}</p>
      {description && (
        <p className="text-xs text-white/70">{description}</p>
      )}
    </GlassCard>
  );
};

export default MetricCard;
