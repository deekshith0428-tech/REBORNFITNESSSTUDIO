import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    };
    const onLeave = () => {
      el.style.transform = 'translate(0,0)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-brand-dark/80 backdrop-blur-xl border-b border-brand-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-center group shrink-0"
          aria-label="Reborn Fitness Studio home"
        >
          <img
            src="/images/reborn-logo.png"
            alt="Reborn Fitness Studio"
            className="logo w-[130px] h-auto object-contain block group-hover:scale-105 transition-transform duration-300 opacity-100"
          />
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-brand-orange transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <a
          ref={btnRef}
          href="#pricing"
          className="hidden lg:inline-flex magnetic items-center gap-2 px-6 py-2.5 rounded-full bg-brand-orange text-white text-sm font-semibold hover:bg-orange-500 transition-colors duration-300 orange-glow-sm"
        >
          Join Now
        </a>

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-brand-dark/95 backdrop-blur-xl border-t border-brand-border">
          <ul className="flex flex-col px-6 py-6 gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-white/80 hover:text-brand-orange transition-colors py-2 text-lg font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="block text-center px-6 py-3 rounded-full bg-brand-orange text-white font-semibold mt-2"
              >
                Join Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
