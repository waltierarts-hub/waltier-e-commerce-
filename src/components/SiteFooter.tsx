import React, { useState } from 'react';
import { Mail, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const SiteFooter: React.FC<{ onNavigate: (page: string, param?: string) => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <footer className="bg-brand-ink text-brand-paper border-t-4 border-brand-red pt-16 pb-12 noise-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-brand-muted/30">
          
          {/* Brand Manifesto Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-brand-paper inline-block p-2 rounded-sm">
              <BrandLogo size="md" showDescriptor={false} />
            </div>

            <p className="font-sans text-sm text-brand-paper/80 leading-relaxed max-w-sm">
              WALTIER is an independent poster company crafting bold, brutalist, and rebellious art prints for living spaces that reject ordinary walls.
            </p>

            <div className="font-mono text-xs text-brand-red font-bold tracking-wider pt-2">
              “YOUR WALLS DESERVE A PERSONALITY.”
            </div>

            <div className="flex items-center gap-3 pt-4 text-xs font-mono text-brand-paper/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>STUDIO & PRINT LAB ACTIVE // INDIA</span>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-red mb-4">
              ARCHIVE STORE
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-brand-paper/80">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-brand-red transition-colors">
                  All Prints (12)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'AFTER HOURS')} className="hover:text-brand-red transition-colors">
                  After Hours
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'TYPE & ATTITUDE')} className="hover:text-brand-red transition-colors">
                  Type & Attitude
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'STREET ENERGY')} className="hover:text-brand-red transition-colors">
                  Street Energy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'MINIMAL MOOD')} className="hover:text-brand-red transition-colors">
                  Minimal Mood
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'ABSTRACT CHAOS')} className="hover:text-brand-red transition-colors">
                  Abstract Chaos
                </button>
              </li>
            </ul>
          </div>

          {/* Service & Help Column */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-red mb-4">
              CLIENT SERVICES
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-brand-paper/80">
              <li>
                <button onClick={() => onNavigate('track')} className="hover:text-brand-red transition-colors flex items-center gap-1.5">
                  <span>Track Package</span>
                  <span className="text-[10px] bg-brand-red/20 text-brand-red px-1 rounded">LIVE</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-brand-red transition-colors">
                  Size & Framing Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-brand-red transition-colors">
                  Shipping & Handling
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-brand-red transition-colors">
                  Damage Replacements
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-brand-red transition-colors">
                  Meet Waltier Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-brand-red transition-colors">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-red mb-4">
              THE WALL LIST
            </h4>
            <p className="font-sans text-xs text-brand-paper/80 mb-3">
              Early notification for upcoming print drops. No spam, ever.
            </p>

            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-500/50 p-3 text-xs font-mono text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You're on the list. Watch your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    className="w-full bg-[#1b1b1b] border border-brand-muted/40 text-brand-paper px-3 py-2 text-xs font-mono focus:border-brand-red focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-brand-red hover:bg-white hover:text-brand-ink text-white font-mono text-xs font-bold transition-colors flex items-center"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {error && <p className="text-[11px] font-mono text-brand-red">{error}</p>}
                <div className="text-[10px] font-mono text-brand-muted flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Zero marketing spam. Instant unsubscribe.</span>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-brand-muted">
          <div>
            © {new Date().getFullYear()} WALTIER POSTER COMPANY. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('terms')} className="hover:text-brand-paper transition-colors">
              Terms of Service
            </button>
            <span>/</span>
            <button onClick={() => onNavigate('privacy')} className="hover:text-brand-paper transition-colors">
              Privacy Policy
            </button>
            <span>/</span>
            <button onClick={() => onNavigate('returns')} className="hover:text-brand-paper transition-colors">
              Returns & Damage
            </button>
            <span>/</span>
            <button onClick={() => onNavigate('admin')} className="text-brand-muted hover:text-brand-red font-mono transition-colors">
              Studio Admin
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

