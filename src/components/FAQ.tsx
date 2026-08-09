import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const faqs = [
  { q: 'Do I need to be fit before joining?', a: 'Not at all! Reborn Fitness Studio welcomes all fitness levels. Our trainers will assess your current fitness and design a program that suits your needs.' },
  { q: 'Can I freeze my membership?', a: 'Yes, you can freeze your membership for up to 30 days per year on quarterly and annual plans, no questions asked.' },
  { q: 'Do you offer personal training?', a: 'Absolutely. We offer 1-on-1 personal training sessions with our certified coaches, tailored to your specific goals.' },
  { q: 'What should I bring to my first session?', a: 'Just bring comfortable workout clothes, a water bottle, and a towel. We provide everything else you need.' },
  { q: 'Is there a free trial available?', a: 'Yes! We offer a complimentary 1-day trial so you can experience our facility and meet our trainers before committing.' },
];

export default function FAQ() {
  const ref = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-28 lg:py-36 bg-gradient-to-b from-brand-dark via-brand-card/30 to-brand-dark">
      <div ref={ref} className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange mb-4 block" data-reveal>
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4" data-reveal>
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              data-reveal
              className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden hover:border-brand-orange/30 transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
              >
                <span className="text-lg font-semibold">{item.q}</span>
                <div className="w-8 h-8 shrink-0 rounded-full bg-brand-orange/10 flex items-center justify-center">
                  {open === i ? <Minus className="w-4 h-4 text-brand-orange" /> : <Plus className="w-4 h-4 text-brand-orange" />}
                </div>
              </button>
              <div
                className="faq-content"
                style={{ maxHeight: open === i ? '300px' : '0px', opacity: open === i ? 1 : 0 }}
              >
                <p className="px-6 pb-6 text-white/60 leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
