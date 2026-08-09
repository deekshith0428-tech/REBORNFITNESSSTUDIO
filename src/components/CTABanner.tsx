import { ArrowRight, Phone } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export default function CTABanner() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative py-20 lg:py-28">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          data-reveal
          className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-brand-orange to-orange-700 p-12 lg:p-20 text-center"
        >
          {/* Glow accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-[80px]" />

          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Start Your Fitness<br />Journey Today
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
              Join Reborn Fitness Studio and transform your body, your health, and your life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#pricing"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-dark text-white font-semibold hover:bg-black transition-all duration-300"
              >
                View Pricing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/20 backdrop-blur text-white font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                <Phone className="w-4 h-4" />
                Book Free Trial
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
