import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FaqContactPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSent, setFormSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });

  const faqs = [
    {
      q: 'What paper stock and ink do you use?',
      a: 'All Waltier posters are printed on 300 GSM archival fine art cotton rag or heavy matte art card using 12-color Giclée mineral pigment inks. The colors are UV-stable and engineered to stay vibrant for decades without yellowing.'
    },
    {
      q: 'Do the frames come with glass or acrylic?',
      a: 'We use shatterproof optical-grade museum acrylic rather than ordinary heavy glass. This ensures zero risk of glass shattering during domestic transit, reduced surface glare, and lightweight hanging.'
    },
    {
      q: 'How long does domestic shipping in India take?',
      a: 'Because each print is freshly produced, inspected, and hand-packed, printing takes 24–48 hours. Courier transit via Bluedart, Delhivery, or Expressbees takes 2–4 business days depending on your metro or tier-2 location.'
    },
    {
      q: 'What is your transit damage replacement policy?',
      a: 'If your tube or frame arrives bent, pierced, or crushed, simply email a photo of the package to support@waltier.co within 48 hours of delivery. We will dispatch a brand-new print immediately at zero extra cost.'
    },
    {
      q: 'Can I request a custom size or orientation?',
      a: 'Currently we offer standardized ISO sizes (A4, A3, A2, A1) to ensure optimal typography composition and compatibility with readily available framing standards worldwide.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="border-b-2 border-brand-ink pb-6">
        <span className="font-mono text-xs text-brand-red font-bold uppercase tracking-widest">
          HELP & INQUIRIES
        </span>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-brand-ink uppercase">
          FAQ & STUDIO CONTACT
        </h1>
        <p className="font-sans text-sm text-brand-muted mt-1">
          Everything you need to know about paper specs, frame construction, and courier delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* FAQ Section */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-mono text-xs font-bold uppercase text-brand-ink tracking-wider mb-2">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="bg-brand-pureWhite border border-brand-divider transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left font-mono text-xs font-bold text-brand-ink hover:text-brand-red"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 flex-shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 font-sans text-xs text-brand-ink/80 border-t border-brand-divider leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-5">
          <div className="bg-brand-pureWhite border-2 border-brand-ink p-6 space-y-4 shadow-brutal-sm">
            <div className="font-mono text-xs font-bold uppercase text-brand-red tracking-wider">
              MESSAGE THE DESIGN DESK
            </div>

            {formSent ? (
              <div className="bg-emerald-50 border border-emerald-300 p-6 text-center space-y-3">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-display font-black text-lg text-emerald-950 uppercase">
                  MESSAGE DISPATCHED
                </h4>
                <p className="font-sans text-xs text-emerald-800">
                  Thank you for reaching out. The Waltier support studio replies within 12–24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-brand-ink mb-1">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Kabir Sen"
                    className="w-full bg-brand-paper border border-brand-divider p-2 text-xs font-sans focus:outline-none focus:border-brand-ink"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-brand-ink mb-1">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="kabir@example.com"
                    className="w-full bg-brand-paper border border-brand-divider p-2 text-xs font-sans focus:outline-none focus:border-brand-ink"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-brand-ink mb-1">
                    TOPIC
                  </label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full bg-brand-paper border border-brand-divider p-2 text-xs font-mono focus:outline-none focus:border-brand-ink"
                  >
                    <option value="Order Status">Order Tracking / Transit</option>
                    <option value="Damaged Item">Damaged in Transit Claim</option>
                    <option value="Custom Order">Bulk Studio / Bulk Order Inquiry</option>
                    <option value="Other">General Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-brand-ink mb-1">
                    MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="How can our print lab assist you today?"
                    className="w-full bg-brand-paper border border-brand-divider p-2 text-xs font-sans focus:outline-none focus:border-brand-ink"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-ink hover:bg-brand-red text-white font-mono font-bold text-xs py-3 uppercase tracking-wider transition-colors shadow-brutal-sm"
                >
                  SEND INQUIRY
                </button>
              </form>
            )}

            <div className="pt-4 border-t border-brand-divider text-[11px] font-mono text-brand-muted space-y-1">
              <div>Studio Email: support@waltier.co</div>
              <div>Operating Hours: Mon–Sat, 10:00 AM – 7:00 PM IST</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

