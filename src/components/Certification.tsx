import { useState } from 'react';
import { Award, BadgeCheck, Globe2, ShieldCheck, X, Maximize2 } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const credentials = [
  { icon: BadgeCheck, label: 'EREPS Certified' },
  { icon: Globe2, label: 'EuropeActive Recognized' },
  { icon: Award, label: 'EQF Level 4 Personal Trainer' },
  { icon: ShieldCheck, label: 'International Certification' },
];

export default function Certification() {
  const ref = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState(false);

  return (
    <section className="relative py-28 lg:py-36 bg-gradient-to-b from-brand-dark via-brand-card/30 to-brand-dark">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange mb-4 block" data-reveal>
            International Certification
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4" data-reveal>
            Certified to Coach Your Best
          </h2>
        </div>

        <div data-reveal className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center max-w-5xl mx-auto">
          <div className="relative group rounded-3xl overflow-hidden border border-brand-border bg-brand-card p-3">
            <img
              src="/images/certificates/Screenshot_2026-08-07_221747.png"
              alt="EREPS certificate for Yasam Mohan Reddy"
              className="w-full aspect-[4/3] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="absolute bottom-7 right-7 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-5 py-3 text-sm font-semibold text-white hover:bg-orange-500 transition-colors orange-glow-sm"
            >
              <Maximize2 className="w-4 h-4" /> View Certificate
            </button>
          </div>

          <div className="bg-brand-card border border-brand-border rounded-3xl p-8 lg:p-10">
            <p className="text-white/60 leading-relaxed mb-8">
              Yasam Mohan Reddy brings internationally recognized training standards to every session, with coaching built around safe progress and measurable results.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {credentials.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl bg-brand-dark/60 border border-brand-border p-4">
                  <Icon className="w-5 h-5 text-brand-orange shrink-0" />
                  <span className="text-sm font-medium text-white/80">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-brand-orange/30 bg-brand-orange/10 p-4 text-brand-orange font-semibold">
              Valid Until July 2027
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-5" onClick={() => setOpen(false)}>
          <button type="button" aria-label="Close certificate" onClick={() => setOpen(false)} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">
            <X className="w-6 h-6 text-white" />
          </button>
          <img src="/images/certificates/Screenshot_2026-08-07_221747.png" alt="EREPS certificate" className="max-w-full max-h-[90vh] rounded-2xl object-contain" />
        </div>
      )}
    </section>
  );
}
