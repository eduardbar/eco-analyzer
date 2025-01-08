import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
