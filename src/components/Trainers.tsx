import { useState } from 'react';
import {
  Award,
  BadgeCheck,
  Brain,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

type Trainer = {
  name: string;
  role?: string;
  experience: string;
  photo: string;
  alt: string;
  introduction: string;
  qualifications: { label: string; icon: typeof Award }[];
  certificate?: { src: string; alt: string };
};

const trainers: Trainer[] = [
  {
    name: 'Yasam Mohan Reddy',
    role: 'Personal Trainer',
    experience: '3+ years in personal training',
    photo: 'public/images/trainers/YASAM MOHAN REDDY.png',
    alt: 'Yasam Mohan Reddy, personal trainer',
    introduction: 'Yasam Mohan Reddy helps members build strength, improve conditioning, and make sustainable progress through structured coaching and nutrition guidance.',
    qualifications: [
      { label: 'EREPS Certified Personal Trainer', icon: BadgeCheck },
      { label: 'EQF Level 4', icon: Award },
      { label: 'European Register of Exercise Professionals', icon: ShieldCheck },
      { label: 'Strength & Conditioning Coach', icon: Dumbbell },
      { label: 'Muscle Building Coach', icon: Sparkles },
      { label: 'Fat Loss Specialist', icon: Brain },
      { label: 'Functional Training', icon: Dumbbell },
      { label: 'Nutrition Guidance', icon: Sparkles },
    ],
    certificate: {
      src: '/images/certificates/Screenshot_2026-08-07_221747.png',
      alt: 'EREPS certificate for Yasam Mohan Reddy',
    },
  },
  {
    name: 'Shaik Mohammed Abuzar',
    experience: '9+ years',
    photo: 'public/images/trainers/SHAIK MOHAMMED ABUZAR.png',
    alt: 'Shaik Mohammed Abuzar',
    introduction: 'Shaik Mohammed Abuzar brings extensive experience and a broad range of recognised training and nutrition qualifications to Reborn Fitness Studio.',
    qualifications: [
      { label: 'EREPS Level 4', icon: BadgeCheck },
      { label: "Gold's Gym Advanced Personal Training", icon: Dumbbell },
      { label: 'REPs UAE', icon: ShieldCheck },
      { label: 'SPEFL-SC Fitness Trainer — NSQF Level 4', icon: Award },
      { label: 'Body Transformation Strategies — Malaysia', icon: Sparkles },
      { label: 'EWMS Nutrition Specialist', icon: Brain },
      { label: 'Female Fitness Training', icon: Dumbbell },
      { label: 'Special Population Training Specialist', icon: ShieldCheck },
      { label: 'Sports Nutrition Course — Rajasthan Royals Team', icon: Brain },
      { label: 'CPR/AED First Aid Certification', icon: BadgeCheck },
      { label: 'Strength & Conditioning Training Specialist — ACE', icon: Dumbbell },
    ],
  },
  {
    name: 'KUSHI',
    experience: '2 years',
    photo: 'public/images/trainers/Screenshot_2026-08-08_224634.png',
    alt: 'KUSHI',
    introduction: 'KUSHI is part of the Reborn coaching team with two years of experience and certified Level 4 training credentials.',
    qualifications: [
      { label: 'E-REPS Level 4 Certification', icon: BadgeCheck },
      { label: 'SPEFL Level 4 Certification', icon: Award },
    ],
  },
  {
    name: 'Angadi Hasan Basha',
    experience: '9 years',
    photo: 'public/images/trainers/ANGADI HASAN BASHA.png',
    alt: 'Angadi Hasan Basha',
    introduction: 'Angadi Hasan Basha brings nine years of experience and an academic qualification in physical education from Rayalaseema University, Kurnool.',
    qualifications: [
      { label: 'Master of Physical Education (M.P.Ed.)', icon: GraduationCap },
      { label: 'Rayalaseema University, Kurnool', icon: Award },
    ],
    certificate: {
      src: '/images/certificates/Screenshot_2026-08-08_224814.png',
      alt: 'Rayalaseema University M.P.Ed. certificate for Angadi Hasan Basha',
    },
  },
  {
    name: 'Rajesh Are',
    role: 'Official Zumba Instructor',
    experience: '7 years',
    photo: 'public/images/trainers/RAJESH ARE.png',
    alt: 'Rajesh Are, official Zumba instructor',
    introduction: 'Rajesh Are is an official Zumba instructor with seven years of experience helping members enjoy energetic, consistent movement training.',
    qualifications: [
      { label: 'Zumba Instructor License — B1', icon: BadgeCheck },
    ],
  },
];

export default function Trainers() {
  const ref = useReveal<HTMLDivElement>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [certificate, setCertificate] = useState<Trainer['certificate']>();
  const trainer = trainers[selectedIndex];

  const changeTrainer = (direction: number) => {
    setSelectedIndex((current) => (current + direction + trainers.length) % trainers.length);
  };

  return (
    <section id="trainers" className="relative py-28 lg:py-36">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange mb-4 block" data-reveal>
            Our Trainers
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4" data-reveal>
            Certified to Coach Your Best
          </h2>
        </div>

        <div data-reveal className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-stretch">
            <div className="relative group rounded-3xl overflow-hidden border border-brand-border bg-brand-card min-h-[520px] lg:min-h-[620px] orange-glow">
              <img
                src={trainer.photo}
                alt={trainer.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                {trainer.certificate && (
                  <button
                    type="button"
                    onClick={() => setCertificate(trainer.certificate)}
                    className="absolute bottom-7 right-7 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-4 py-3 text-sm font-semibold text-white hover:bg-orange-500 transition-colors orange-glow-sm"
                  >
                    <Award className="w-4 h-4" /> View Certificate
                  </button>
                )}
                {trainer.role && <span className="text-brand-orange text-sm font-semibold uppercase tracking-wider mb-2 block">{trainer.role}</span>}
                <h3 className="text-3xl font-bold pr-36">{trainer.name}</h3>
                <p className="text-white/60 mt-2">{trainer.experience}</p>
              </div>
            </div>

            <div className="bg-brand-card border border-brand-border rounded-3xl p-7 lg:p-10 flex flex-col">
              <div className="flex items-start justify-between gap-5 mb-6">
                <div>
                  <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-semibold uppercase tracking-wider mb-3">
                    <Award className="w-5 h-5" /> {trainer.experience}
                  </span>
                  <h3 className="text-3xl font-bold">{trainer.name}</h3>
                </div>
                <span className="text-sm text-white/40 font-medium whitespace-nowrap">{selectedIndex + 1} / {trainers.length}</span>
              </div>
              <p className="text-white/60 leading-relaxed mb-8">{trainer.introduction}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {trainer.qualifications.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-start gap-3 rounded-2xl bg-brand-dark/60 border border-brand-orange/20 p-4 hover:border-brand-orange/60 transition-colors">
                    <Icon className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-white/80 leading-relaxed">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" aria-label="Choose a trainer">
              {trainers.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${index === selectedIndex ? 'bg-brand-orange text-white orange-glow-sm' : 'bg-brand-card border border-brand-border text-white/60 hover:border-brand-orange hover:text-white'}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => changeTrainer(-1)} aria-label="Previous trainer" className="w-11 h-11 rounded-full border border-brand-border bg-brand-card flex items-center justify-center text-white hover:border-brand-orange hover:text-brand-orange transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button type="button" onClick={() => changeTrainer(1)} aria-label="Next trainer" className="w-11 h-11 rounded-full border border-brand-border bg-brand-card flex items-center justify-center text-white hover:border-brand-orange hover:text-brand-orange transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {certificate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-5" onClick={() => setCertificate(undefined)}>
          <button type="button" aria-label="Close certificate" onClick={() => setCertificate(undefined)} className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">
            <X className="w-6 h-6 text-white" />
          </button>
          <img src={certificate.src} alt={certificate.alt} className="max-w-full max-h-[90vh] rounded-2xl object-contain" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
