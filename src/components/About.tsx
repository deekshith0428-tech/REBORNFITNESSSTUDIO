import { ArrowRight, Users, Trophy, Calendar } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export default function About() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - image */}
          <div className="relative" data-reveal>
            <div className="relative rounded-3xl overflow-hidden orange-glow">
              <img
                src="/images/about/unnamed_(4).jpg"
                alt="Reborn Fitness Studio interior"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-brand-card border border-brand-border rounded-2xl p-6 shadow-2xl hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/15 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <div className="text-2xl font-bold">10+</div>
                  <span className="text-xs text-white/50 uppercase tracking-wider">Years Experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - content */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange mb-4 block" data-reveal>
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6" data-reveal>
              More Than a Gym.<br />It's a Lifestyle.
            </h2>
            <p className="text-lg text-white/60 leading-relaxed mb-8" data-reveal>
              At Reborn Fitness Studio, we believe fitness is the foundation of a better life. Our state-of-the-art facility, expert trainers, and supportive community create the perfect environment for transformation — whether you're a beginner or an athlete.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10" data-reveal>
              <div className="bg-brand-card border border-brand-border rounded-2xl p-5">
                <Users className="w-6 h-6 text-brand-orange mb-3" />
                <div className="text-2xl font-bold">2000+</div>
                <span className="text-xs text-white/50 uppercase tracking-wider">Members</span>
              </div>
              <div className="bg-brand-card border border-brand-border rounded-2xl p-5">
                <Trophy className="w-6 h-6 text-brand-orange mb-3" />
                <div className="text-2xl font-bold">15+</div>
                <span className="text-xs text-white/50 uppercase tracking-wider">Awards</span>
              </div>
              <div className="bg-brand-card border border-brand-border rounded-2xl p-5">
                <Calendar className="w-6 h-6 text-brand-orange mb-3" />
                <div className="text-2xl font-bold">50+</div>
                <span className="text-xs text-white/50 uppercase tracking-wider">Classes/wk</span>
              </div>
            </div>

            <a
              href="#programs"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-orange text-white font-semibold hover:bg-orange-500 transition-all duration-300 orange-glow-sm"
              data-reveal
            >
              Explore Programs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
