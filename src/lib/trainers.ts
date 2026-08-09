export type TrainerProfile = {
  name: string;
  role?: string;
  experience: string;
  introduction: string;
  specialties: string[];
  qualifications: string[];
  certificate?: { src: string; alt: string };
};

export const trainers: TrainerProfile[] = [
  {
    name: 'Yasam Mohan Reddy',
    role: 'Personal Trainer',
    experience: '3+ years in personal training',
    introduction:
      'Yasam Mohan Reddy helps members build strength, improve conditioning, and make sustainable progress through structured coaching and nutrition guidance.',
    specialties: ['Strength & Conditioning', 'Fat Loss', 'Muscle Building', 'Functional Training', 'Nutrition Guidance'],
    qualifications: [
      'EREPS Certified Personal Trainer',
      'EQF Level 4',
      'European Register of Exercise Professionals',
      'Strength & Conditioning Coach',
      'Muscle Building Coach',
      'Fat Loss Specialist',
      'Functional Training',
      'Nutrition Guidance',
    ],
    certificate: {
      src: '/images/certificates/Screenshot_2026-08-07_221747.png',
      alt: 'EREPS certificate for Yasam Mohan Reddy',
    },
  },
  {
    name: 'Shaik Mohammed Abuzar',
    experience: '9+ years',
    introduction:
      'Shaik Mohammed Abuzar brings extensive experience and a broad range of recognised training and nutrition qualifications to Reborn Fitness Studio.',
    specialties: ['Advanced Personal Training', 'Nutrition Coaching', 'Body Transformation', 'Sports Conditioning'],
    qualifications: [
      'EREPS Level 4',
      "Gold's Gym Advanced Personal Training",
      'REPs UAE',
      'SPEFL-SC Fitness Trainer — NSQF Level 4',
      'Body Transformation Strategies — Malaysia',
      'EWMS Nutrition Specialist',
      'Female Fitness Training',
      'Special Population Training Specialist',
      'Sports Nutrition Course — Rajasthan Royals Team',
      'CPR/AED First Aid Certification',
      'Strength & Conditioning Training Specialist — ACE',
    ],
  },
  {
    name: 'KUSHI',
    experience: '2 years',
    introduction:
      'KUSHI is part of the Reborn coaching team with two years of experience and certified Level 4 training credentials.',
    specialties: ['Personal Training', 'Strength Training', 'Functional Fitness'],
    qualifications: ['E-REPS Level 4 Certification', 'SPEFL Level 4 Certification'],
  },
  {
    name: 'Angadi Hasan Basha',
    experience: '9 years',
    introduction:
      'Angadi Hasan Basha brings nine years of experience and an academic qualification in physical education from Rayalaseema University, Kurnool.',
    specialties: ['Strength Training', 'Physical Education', 'Legacy Coaching'],
    qualifications: ['Master of Physical Education (M.P.Ed.)', 'Rayalaseema University, Kurnool'],
    certificate: {
      src: '/images/certificates/Screenshot_2026-08-08_224814.png',
      alt: 'Rayalaseema University M.P.Ed. certificate for Angadi Hasan Basha',
    },
  },
  {
    name: 'Rajesh Are',
    role: 'Official Zumba Instructor',
    experience: '7 years',
    introduction:
      'Rajesh Are is an official Zumba instructor with seven years of experience helping members enjoy energetic, consistent movement training.',
    specialties: ['Zumba', 'Dance Fitness', 'Group Motivation'],
    qualifications: ['Zumba Instructor License — B1'],
  },
];

export function createPersonalTrainingMessage(): string {
  return [
    'We have 5 expert trainers for Personal Training. Here are the profiles:',
    ...trainers.map((trainer, index) =>
      `${index + 1}. ${trainer.name}${trainer.role ? ` — ${trainer.role}` : ''}
${trainer.experience}
${trainer.introduction}`,
    ),
    'Please type the name of the trainer you would like to choose for more details.',
  ].join('\n\n');
}

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
}

export function findTrainerByText(text: string) {
  const normalized = normalizeText(text);
  if (!normalized) return undefined;
  return trainers.find((trainer) => {
    const name = normalizeText(trainer.name);
    if (normalized.includes(name) || name.includes(normalized)) return true;
    return trainer.name
      .split(' ')
      .map((part) => normalizeText(part))
      .some((token) => token && normalized.includes(token));
  });
}

export function getTrainerDetails(nameOrText: string): string | undefined {
  const trainer = findTrainerByText(nameOrText);
  if (!trainer) return undefined;

  return [
    `${trainer.name}${trainer.role ? ` — ${trainer.role}` : ''}`,
    trainer.experience,
    '',
    trainer.introduction,
    '',
    'Specialties:',
    ...trainer.specialties.map((item) => `• ${item}`),
    '',
    'Qualifications:',
    ...trainer.qualifications.map((item) => `• ${item}`),
    trainer.certificate ? '' : '',
    trainer.certificate
      ? `
Certification available: ${trainer.certificate.alt}.` // not bullet to avoid formatting issue
      : '',
    '',
    'If you want, you can choose another trainer from the list.',
  ]
    .filter(Boolean)
    .join('\n');
}
