import { Package, Snowflake, Lock, Car, Dumbbell, Users } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const facilities = [
  { icon: Package, title: 'Imported Equipment', desc: 'Premium machines from leading global brands.' },
  { icon: Snowflake, title: 'Air Conditioned', desc: 'Climate-controlled training environment.' },
  { icon: Lock, title: 'Locker Rooms', desc: 'Secure storage with shower facilities.' },
  { icon: Car, title: 'Private Parking', desc: 'Spacious, dedicated parking for members.' },
  { icon: Dumbbell, title: 'Strength & CrossFit', desc: 'Dedicated zones for strength and CrossFit training.' },
  { icon: Users, title: 'Group Sessions', desc: 'Energetic classes led by expert coaches.' },
];

export default function Facilities() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative py-28 lg:py-36 bg-gradient-to-b from-brand-dark via-brand-card/30 to-brand-dark">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange mb-4 block" data-reveal>
            Facilities
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4" data-reveal>
            World-Class Amenities
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto" data-reveal>
            Everything you need for a premium training experience under one roof.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((f) => (
            <div
              key={f.title}
              data-reveal
              className="group flex items-start gap-5 bg-brand-card border border-brand-border rounded-3xl p-7 hover:border-brand-orange/40 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-brand-orange/10 flex items-center justify-center group-hover:bg-brand-orange transition-all duration-500">
                <f.icon className="w-7 h-7 text-brand-orange group-hover:text-white transition-colors duration-500" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
