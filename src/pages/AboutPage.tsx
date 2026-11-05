import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

export const AboutPage: React.FC<{ onNavigateToShop: () => void }> = ({ onNavigateToShop }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Statement */}
      <div className="border-b-2 border-brand-ink pb-8 space-y-4">
        <span className="font-mono text-xs text-brand-red font-bold uppercase tracking-widest">
          STUDIO MANIFESTO // EST. WALTIER
        </span>
        <h1 className="font-display font-black text-5xl sm:text-7xl text-brand-ink uppercase leading-[0.9]">
          BORING WALLS<br />
          DESERVE BETTER<br />
          <span className="text-brand-red">STORIES.</span>
        </h1>
        <p className="font-sans text-lg text-brand-muted max-w-2xl leading-relaxed">
          WALTIER is an independent poster company operating at the collision point of underground art publications, Japanese typography, streetwear aesthetics, and brutalist graphic design.
        </p>
      </div>

      {/* Visual Identity Study */}
      <div className="bg-brand-pureWhite border-2 border-brand-ink p-8 sm:p-12 shadow-brutal flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/images/logo.png"
            alt="Waltier Winged Brush Stroke W mark"
            className="w-56 h-auto filter contrast-125"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4 font-sans text-sm text-brand-ink/80 leading-relaxed">
          <h3 className="font-display font-black text-2xl text-brand-ink uppercase">
            THE WINGED BRUSH STROKE
          </h3>
          <p>
            The signature Waltier mark isn't a vector geometry from an icon library. It is an expressive, heavy black ink gesture with wings extending into horizontal space.
          </p>
          <p>
            It symbolizes motion, speed, and creative rebellion. It pairs with our crimson red wordmark to anchor every single piece of artwork we produce.
          </p>
        </div>
      </div>

      {/* 3 Core Values */}
      <div className="space-y-6">
        <h2 className="font-display font-black text-3xl text-brand-ink uppercase">
          HOW WE OPERATE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          
          <div className="p-6 bg-brand-pureWhite border border-brand-divider space-y-3">
            <div className="text-brand-red font-black text-xl">01 // NO TEMPLATES</div>
            <h4 className="font-bold text-sm text-brand-ink">ORIGINAL CATALOG ONLY</h4>
            <p className="font-sans text-brand-muted leading-relaxed">
              We never resell generic marketplace vector art. Every poster is developed in-house with authentic typography, grit, and attitude.
            </p>
          </div>

          <div className="p-6 bg-brand-pureWhite border border-brand-divider space-y-3">
            <div className="text-brand-red font-black text-xl">02 // 300 GSM PAPERS</div>
            <h4 className="font-bold text-sm text-brand-ink">TACTILE SUBSTANCE</h4>
            <p className="font-sans text-brand-muted leading-relaxed">
              Thin, flimsy paper that curls when unrolled is offensive. We print exclusively on heavy archival cotton stock that feels substantial.
            </p>
          </div>

          <div className="p-6 bg-brand-pureWhite border border-brand-divider space-y-3">
            <div className="text-brand-red font-black text-xl">03 // SAFE PASSAGE</div>
            <h4 className="font-bold text-sm text-brand-ink">CRUSH-PROOF SHIPPING</h4>
            <p className="font-sans text-brand-muted leading-relaxed">
              Shipped in reinforced cardboard tubes or foam-edged flat mailers. If anything arrives bent, we replace it immediately without interrogation.
            </p>
          </div>

        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 bg-brand-ink text-brand-paper border-2 border-brand-ink flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-display font-black text-2xl uppercase">
            READY TO UPGRADE YOUR SPACE?
          </h3>
          <p className="font-sans text-xs text-brand-paper/70 mt-1">
            Browse our 12 original print archives and claim your wall.
          </p>
        </div>

        <button
          onClick={onNavigateToShop}
          className="bg-brand-red hover:bg-white hover:text-brand-ink text-white font-mono font-bold text-xs px-6 py-3.5 uppercase tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap shadow-brutal-sm"
        >
          <span>BROWSE ARCHIVE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

