import { useEffect, useRef, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';

const stats = [
  { value: 500, suffix: '+', label: 'Happy Members' },
  { value: 4.8, suffix: '', label: 'Google Rating', decimals: 1 },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 5, suffix: '', label: 'Expert Trainer' },
];

function Counter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(value * eased);
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(value);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-black text-brand-orange">
      {count.toFixed(decimals)}
      {suffix}
    </div>
  );
}

export default function Statistics() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative py-20 lg:py-28">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="bg-brand-card border border-brand-border rounded-3xl p-12 lg:p-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center" data-reveal>
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                <div className="text-sm text-white/50 uppercase tracking-wider mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
