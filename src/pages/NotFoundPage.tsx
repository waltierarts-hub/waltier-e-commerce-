import React from 'react';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

export const NotFoundPage: React.FC<{ onNavigateHome: () => void; onNavigateShop: () => void }> = ({
  onNavigateHome,
  onNavigateShop
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-8">
      {/* Visual Frame */}
      <div className="w-48 h-64 mx-auto border-4 border-dashed border-brand-ink bg-brand-pureWhite flex flex-col items-center justify-center p-6 shadow-brutal relative">
        <span className="font-mono text-xs text-brand-red font-bold">404 ERROR</span>
        <span className="font-display font-black text-6xl text-brand-ink">EMPTY</span>
        <span className="font-mono text-[10px] text-brand-muted mt-2">[NO PRINT HUNG HERE]</span>
      </div>

      <div className="space-y-3">
        <h1 className="font-display font-black text-5xl sm:text-6xl text-brand-ink uppercase tracking-tight">
          THIS WALL IS EMPTY.
        </h1>
        <p className="font-sans text-sm text-brand-muted max-w-sm mx-auto">
          The link you followed leads to an unmapped coordinate. Don't worry, there's plenty of real artwork in the archive.
        </p>
      </div>

      <div className="flex justify-center gap-4 pt-2">
        <button
          onClick={onNavigateShop}
          className="bg-brand-red hover:bg-brand-ink text-white font-mono font-bold text-xs px-6 py-3.5 uppercase tracking-wider shadow-brutal transition-colors flex items-center gap-2"
        >
          <Compass className="w-4 h-4" />
          <span>BACK TO THE GOOD STUFF</span>
        </button>

        <button
          onClick={onNavigateHome}
          className="bg-brand-paper hover:bg-brand-ink hover:text-brand-paper text-brand-ink border-2 border-brand-ink font-mono font-bold text-xs px-6 py-3.5 uppercase shadow-brutal-sm transition-colors flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>HOMEPAGE</span>
        </button>
      </div>
    </div>
  );
};

