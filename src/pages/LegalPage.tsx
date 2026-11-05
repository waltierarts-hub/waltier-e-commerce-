import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';

export const LegalPage: React.FC<{ initialTab?: string }> = ({ initialTab = 'shipping' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Tab Switcher */}
      <div className="border-b-2 border-brand-ink pb-4 flex flex-wrap gap-2">
        {[
          { id: 'shipping', label: 'SHIPPING POLICY', icon: Truck },
          { id: 'returns', label: 'TRANSIT DAMAGE & RETURNS', icon: RotateCcw },
          { id: 'privacy', label: 'PRIVACY POLICY', icon: ShieldCheck },
          { id: 'terms', label: 'TERMS OF SERVICE', icon: FileText }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 font-mono text-xs font-bold py-2 px-4 border transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-ink text-brand-paper border-brand-ink shadow-brutal-sm'
                  : 'bg-brand-pureWhite text-brand-ink border-brand-divider hover:border-brand-ink'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-brand-red" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="bg-brand-pureWhite border-2 border-brand-ink p-8 space-y-6 shadow-brutal text-sm leading-relaxed">
        
        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h2 className="font-display font-black text-3xl uppercase text-brand-ink">
              SHIPPING & FULFILLMENT
            </h2>
            <p>
              Every art print at WALTIER is produced on-demand at our fine art printing facility. We do not sell pre-printed warehoused inventory that has been sitting for months.
            </p>
            <div className="p-4 bg-brand-paper border border-brand-divider font-mono text-xs space-y-1">
              <div>• <strong>Printing & Quality Check:</strong> 24–48 hours from order placement.</div>
              <div>• <strong>Domestic Metro Delivery:</strong> 2–3 business days after dispatch.</div>
              <div>• <strong>Rest of India / Tier 2 & 3:</strong> 4–6 business days after dispatch.</div>
              <div>• <strong>Free Shipping Threshold:</strong> Automatically free on orders over ₹1,499.</div>
            </div>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="space-y-4">
            <h2 className="font-display font-black text-3xl uppercase text-brand-ink">
              TRANSIT DAMAGE & RETURN POLICY
            </h2>
            <p>
              Due to the custom-printed nature of art prints and customized framing choices, we do not accept returns for buyer's remorse or accidental size orders.
            </p>
            <h3 className="font-bold text-brand-ink font-mono uppercase">
              100% TRANSIT DAMAGE REPLACEMENT GUARANTEE:
            </h3>
            <p>
              If your package arrives bent, punctured, crushed, or damaged in any way, send us clear photos of the damaged tube/box and the affected artwork within <strong>48 hours of delivery</strong>. We will reprint and ship an identical replacement immediately with expedited shipping at our cost.
            </p>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="font-display font-black text-3xl uppercase text-brand-ink">
              PRIVACY POLICY
            </h2>
            <p>
              WALTIER respects your personal privacy. We only collect the minimal information necessary to process your poster orders and ensure accurate courier delivery: your name, shipping address, contact phone number, and email.
            </p>
            <p>
              We do not sell, rent, or trade your contact data to third-party advertising brokers or spam syndicates. Your payment information is processed through secure, RBI-compliant tokenized payment gateways (such as Razorpay or Stripe) and is never stored on our local servers.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="font-display font-black text-3xl uppercase text-brand-ink">
              TERMS OF SERVICE
            </h2>
            <p>
              All graphic designs, typographic layouts, illustrations, and digital assets displayed on this website are original intellectual property of WALTIER POSTER COMPANY.
            </p>
            <p>
              Purchasing a poster grants you ownership of the physical printed copy for personal display. It does not grant reproduction, resale, digital redistribution, or commercial merchandising rights.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};

