import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: 'high' | 'low' | 'neutral';
  icon?: string;
}

export default function MetricCard({ 
  title, 
  value, 
  subtitle,
  trend = 'neutral',
  icon
}: MetricCardProps) {
  return (
    <div className="glass-panel p-8 h-full !bg-white/5 hover:!bg-white/10 transition-colors group relative overflow-hidden">
      {/* Background Icon Decoration */}
      <div className="absolute -right-4 -bottom-4 text-8xl opacity-5 group-hover:opacity-10 transition-opacity select-none grayscale group-hover:grayscale-0">
        {icon}
      </div>

      <div className="relative z-10">
        <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4 flex items-center gap-2">
          {icon && <span className="text-lg grayscale group-hover:grayscale-0 transition-all">{icon}</span>}
          {title}
        </h3>
        
        <div className="flex items-baseline gap-2">
          <p className="text-5xl font-bold text-white tracking-tight">{value}</p>
        </div>
        
        {subtitle && (
          <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
            <span className="text-sm text-white/60 font-medium">{subtitle}</span>
            {trend !== 'neutral' && (
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                trend === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'
              }`}>
                {trend === 'high' ? 'ALTO' : 'BAJO'}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
