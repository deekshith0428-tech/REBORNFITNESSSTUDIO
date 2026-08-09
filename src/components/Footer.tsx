import { useState } from 'react';
import { Instagram, Twitter, Facebook, Youtube, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="relative bg-brand-card border-t border-brand-border pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2 mb-5">
              <img src="/images/logo/image.png" alt="Reborn Fitness Studio" className="h-12 w-auto max-w-[180px] object-contain" />
            </a>
            <p className="text-white/50 leading-relaxed mb-6">
              Transform your body and life at Reborn Fitness Studio. Premium training, expert coaches, real results.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-brand-dark border border-brand-border flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all duration-300"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold mb-5 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {['About', 'Programs', 'Trainers', 'Pricing', 'Gallery'].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="text-white/50 hover:text-brand-orange transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-bold mb-5 text-lg">Programs</h3>
            <ul className="space-y-3">
              {['Strength Training', 'Weight Loss', 'CrossFit', 'Yoga', 'Nutrition'].map((l) => (
                <li key={l}>
                  <a href="#programs" className="text-white/50 hover:text-brand-orange transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold mb-5 text-lg">Newsletter</h3>
            <p className="text-white/50 mb-4">Get fitness tips and updates straight to your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-white text-sm focus:border-brand-orange outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-12 h-12 shrink-0 rounded-xl bg-brand-orange flex items-center justify-center hover:bg-orange-500 transition-colors"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">© 2026 Reborn Fitness Studio. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
