import { Star } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const reviews = [
  { initials: 'SS', name: 'Sonu Sahil', date: '2 weeks ago', text: 'Best gym in the city! The trainers are incredibly supportive and the equipment is top-notch. I have never felt better.' },
  { initials: 'KM', name: 'Krishna Mohan', date: '1 month ago', text: 'Reborn Fitness Studio completely changed my life. Lost 10kg in 3 months with their personal training program.' },
  { initials: 'SB', name: 'Sai Bhuvan', date: '1 month ago', text: 'Amazing atmosphere, great energy, and the CrossFit classes are intense but fun. Highly recommend to everyone.' },
  { initials: 'RS', name: 'Reyan Shaik', date: '2 months ago', text: 'The trainers genuinely care about your progress. The facility is clean, spacious, and well-maintained.' },
  { initials: 'SR', name: 'Santosh Royal', date: '3 months ago', text: 'I joined for weight loss and stayed for the community. The Zumba and yoga classes are fantastic.' },
  { initials: 'AS', name: 'Ashwak Syed', date: '3 months ago', text: 'Premium equipment, expert coaching, and a motivating environment. Worth every rupee. 5 stars!' },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export default function Reviews() {
  const ref = useReveal<HTMLDivElement>();
  const doubled = [...reviews, ...reviews];

  return (
    <section id="reviews" className="relative py-28 lg:py-36 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10 mb-16">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange mb-4 block" data-reveal>
            Google Reviews
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4" data-reveal>
            What Our Members Say
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6" data-reveal>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-brand-orange text-brand-orange" />
              ))}
            </div>
            <span className="text-2xl font-bold">4.8</span>
            <span className="text-white/50">· 500+ reviews</span>
          </div>
        </div>
      </div>

      {/* Infinite marquee */}
      <div className="relative w-full overflow-hidden" data-reveal>
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none" />
        <div className="marquee-track gap-6 py-4">
          {doubled.map((r, i) => (
            <div
              key={i}
              className="w-[380px] shrink-0 bg-brand-card border border-brand-border rounded-3xl p-6 hover:border-brand-orange/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-sm">
                  {r.initials}
                </div>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-white/40">{r.date}</div>
                </div>
                <div className="ml-auto">
                  <GoogleIcon />
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                ))}
              </div>
              <p className="text-white/60 leading-relaxed text-sm">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
