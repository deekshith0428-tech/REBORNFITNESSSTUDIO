import { Dumbbell, Music, Flame, Layers, UserCog, Check, Info } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

type Tier = { label: string; price: string };
type Plan = {
  icon: typeof Dumbbell;
  title: string;
  tiers: Tier[];
  features?: string[];
  cta: string;
  featured?: boolean;
  glow?: boolean;
};

const plans: Plan[] = [
  {
    icon: Dumbbell,
    title: 'Strength & CrossFit',
    featured: true,
    glow: true,
    cta: 'Join Now',
    tiers: [
      { label: 'Monthly', price: '₹2,499' },
      { label: 'Silver (3 Months)', price: '₹6,999' },
      { label: 'Gold (6 Months)', price: '₹12,999' },
      { label: 'Platinum (12 Months)', price: '₹23,999' },
    ],
  },
  {
    icon: Music,
    title: 'Zumba',
    glow: true,
    cta: 'Join Now',
    tiers: [
      { label: 'Monthly', price: '₹2,299' },
      { label: 'Silver (3 Months)', price: '₹5,999' },
    ],
  },
  {
    icon: Flame,
    title: 'CrossFit',
    glow: true,
    cta: 'Join Now',
    tiers: [
      { label: 'Monthly', price: '₹2,299' },
      { label: 'Silver (3 Months)', price: '₹5,999' },
    ],
  },
  {
    icon: Layers,
    title: 'Combo Plans',
    glow: true,
    cta: 'Join Now',
    tiers: [
      { label: 'Zumba + CrossFit', price: '₹3,999' },
      { label: 'Strength + Zumba', price: '₹4,299' },
    ],
  },
  {
    icon: UserCog,
    title: 'Personal Training',
    cta: 'Book Consultation',
    tiers: [{ label: '1-on-1 Coaching', price: '₹8,999' }],
    features: ['Customized Workout', 'Nutrition Guidance', 'Weekly Progress Tracking', 'Personal Coach'],
  },
];

const notes = [
  'Fee must be paid in advance before joining.',
  'Two complimentary steam sessions are provided every month.',
  'Silver, Gold and Platinum memberships require full payment.',
  'Membership fees are non-refundable.',
  'Management reserves the right to revise plans and fees.',
];

function PlanCard({ plan }: { plan: Plan }) {
  const Icon = plan.icon;
  return (
    <div
      data-reveal
      className={`relative rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 backdrop-blur-md ${
        plan.glow
          ? 'bg-gradient-to-b from-brand-orange/15 to-brand-card/80 border-2 border-brand-orange orange-glow'
          : 'bg-brand-card/70 border border-brand-border hover:border-brand-orange/40'
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-orange text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap">
          Most Popular
        </span>
      )}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-brand-orange" />
        </div>
        <h3 className="text-xl font-bold">{plan.title}</h3>
      </div>

      <div className="space-y-3 mb-6">
        {plan.tiers.map((tier) => (
          <div key={tier.label} className="flex items-center justify-between rounded-xl bg-brand-dark/50 border border-brand-border px-4 py-3">
            <span className="text-white/60 text-sm">{tier.label}</span>
            <span className="text-lg font-bold text-white">{tier.price}</span>
          </div>
        ))}
      </div>

      {plan.features && (
        <ul className="space-y-2.5 mb-6">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-white/70">
              <Check className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>
      )}

      <a
        href="#contact"
        className={`block text-center px-6 py-3.5 rounded-2xl font-semibold transition-all duration-300 ${
          plan.featured
            ? 'bg-brand-orange text-white hover:bg-orange-500 orange-glow-sm'
            : 'bg-white/5 border border-white/15 text-white hover:bg-white/10'
        }`}
      >
        {plan.cta}
      </a>
    </div>
  );
}

export default function Pricing() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="pricing" className="relative py-28 lg:py-36">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange mb-4 block" data-reveal>
            Membership Plans
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4" data-reveal>
            Choose Your Plan
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto" data-reveal>
            Flexible memberships designed to fit your goals and budget.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.slice(0, 3).map((plan) => (
            <PlanCard key={plan.title} plan={plan} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
          {plans.slice(3).map((plan) => (
            <PlanCard key={plan.title} plan={plan} />
          ))}
        </div>

        <div data-reveal className="max-w-4xl mx-auto mt-12 rounded-3xl border border-brand-orange/30 bg-brand-card/60 backdrop-blur-md p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-brand-orange/15 flex items-center justify-center">
              <Info className="w-6 h-6 text-brand-orange" />
            </div>
            <h3 className="text-xl font-bold">Important Membership Information</h3>
          </div>
          <ul className="space-y-3">
            {notes.map((note) => (
              <li key={note} className="flex items-start gap-3 text-white/70 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-2.5" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
