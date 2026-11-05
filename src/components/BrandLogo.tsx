import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showDescriptor?: boolean;
}

export const BrandLogo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showDescriptor = true 
}) => {
  const heightClasses = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-16',
    hero: 'h-24 md:h-28'
  };

  return (
    <div className={`inline-flex items-center gap-2 select-none group ${className}`}>
      {/* High-res authentic mark using the actual logo.png */}
      <div className="relative flex items-center">
        <img 
          src="/images/logo.png" 
          alt="WALTIER POSTER COMPANY" 
          className={`${heightClasses[size]} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] filter contrast-125`}
        />
      </div>
      {showDescriptor && size === 'lg' && (
        <span className="hidden sm:inline-block border-l-2 border-brand-divider pl-3 font-mono text-[10px] tracking-widest text-brand-muted uppercase leading-tight">
          ARCHIVE<br />POSTERS
        </span>
      )}
    </div>
  );
};

