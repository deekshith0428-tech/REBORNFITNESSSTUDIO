import { Dumbbell, Flame, Bone, UserCog, Zap, Music, Sun, HeartPulse, Apple } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const programs = [
  { icon: Dumbbell, title: 'Strength Training', desc: 'Build raw power and muscle with progressive overload training.' },
  { icon: Flame, title: 'Weight Loss', desc: 'Burn fat efficiently with HIIT and metabolic conditioning.' },
  { icon: Bone, title: 'Muscle Building', desc: 'Sculpt and grow lean muscle mass with targeted hypertrophy.' },
  { icon: UserCog, title: 'Personal Training', desc: '1-on-1 coaching tailored to your body and goals.' },
  { icon: Zap, title: 'CrossFit', desc: 'High-intensity functional training for all-round athleticism.' },
  { icon: Music, title: 'Zumba', desc: 'Dance your way to fitness with energetic group sessions.' },
  { icon: Sun, title: 'Yoga', desc: 'Improve flexibility, balance, and mindfulness.' },
  { icon: HeartPulse, title: 'Cardio', desc: 'Boost endurance and heart health with varied cardio.' },
  { icon: Apple, title: 'Nutrition', desc: 'Personalized meal plans to fuel your transformation.' },
];

export default function Programs() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="programs" className="relative py-28 lg:py-36">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange mb-4 block" data-reveal>
            Our Programs
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4" data-reveal>
            Train With Purpose
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto" data-reveal>
            From strength to flexibility, we offer programs designed for every fitness goal and level.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p) => (
            <div
              key={p.title}
              data-reveal
              className="group relative bg-brand-card border border-brand-border rounded-3xl p-8 hover:border-brand-orange/40 transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/0 to-brand-orange/0 group-hover:from-brand-orange/5 group-hover:to-transparent transition-all duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-6 group-hover:bg-brand-orange group-hover:scale-110 transition-all duration-500">
                  <p.icon className="w-7 h-7 text-brand-orange group-hover:text-white transition-colors duration-500" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-white/50 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
