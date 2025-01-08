import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} inline-flex items-center justify-center`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fondo circular verde */}
        <circle cx="50" cy="50" r="50" fill="#22c55e" />
        
        {/* Hoja principal */}
        <path 
          d="M25 65c0-15 10-30 20-30s20 15 20 30c0 5-2.5 10-7.5 12.5-2.5 2.5-7.5 2.5-10 0-2.5-2.5-2.5-7.5 0-10 2.5-2.5 5-2.5 7.5 0" 
          fill="white" 
          stroke="#16a34a" 
          strokeWidth="2"
        />
        
        {/* Vena central de la hoja */}
        <path 
          d="M45 35v30" 
          stroke="#16a34a" 
          strokeWidth="3" 
          strokeLinecap="round"
        />
        
        {/* Pequeñas hojas laterales */}
        <path 
          d="M35 45c-2-2-4-2-6 0s-2 4 0 6" 
          fill="white" 
          stroke="#16a34a" 
          strokeWidth="1.5"
        />
        <path 
          d="M55 50c2-2 4-2 6 0s2 4 0 6" 
          fill="white" 
          stroke="#16a34a" 
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

export default Logo;
