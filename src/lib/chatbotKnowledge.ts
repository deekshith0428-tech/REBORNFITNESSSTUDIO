// Central knowledge base and helpers for the Reborn AI chatbot.

export type Plan = {
  name: string;
  tiers: { label: string; price: string }[];
  tagline: string;
  goals: string[];
};

export const plans: Plan[] = [
  {
    name: 'Strength & CrossFit',
    tagline: 'Best for fat loss, muscle building, and overall conditioning.',
    goals: ['weight loss', 'muscle building', 'strength', 'conditioning', 'fitness'],
    tiers: [
      { label: 'Monthly', price: '₹2,499' },
      { label: 'Silver (3 Months)', price: '₹6,999' },
      { label: 'Gold (6 Months)', price: '₹12,999' },
      { label: 'Platinum (12 Months)', price: '₹23,999' },
    ],
  },
  {
    name: 'Zumba',
    tagline: 'Fun, dance-based cardio — great for weight loss and stamina.',
    goals: ['weight loss', 'cardio', 'dance', 'fun', 'stamina'],
    tiers: [
      { label: 'Monthly', price: '₹2,299' },
      { label: 'Silver (3 Months)', price: '₹5,999' },
    ],
  },
  {
    name: 'CrossFit',
    tagline: 'High-intensity functional training for serious conditioning.',
    goals: ['weight loss', 'conditioning', 'athletic', 'endurance'],
    tiers: [
      { label: 'Monthly', price: '₹2,299' },
      { label: 'Silver (3 Months)', price: '₹5,999' },
    ],
  },
  {
    name: 'Combo Plans',
    tagline: 'Mix two programs for variety and value.',
    goals: ['weight loss', 'variety', 'value'],
    tiers: [
      { label: 'Zumba + CrossFit', price: '₹3,999' },
      { label: 'Strength + Zumba', price: '₹4,299' },
    ],
  },
  {
    name: 'Personal Training',
    tagline: '1-on-1 coaching for fastest, most targeted results.',
    goals: ['weight loss', 'muscle building', 'personal', 'transformation', 'nutrition'],
    tiers: [{ label: '1-on-1 Coaching', price: '₹8,999' }],
  },
];

export const knowledge: Record<string, string> = {
  membership: `We offer several membership options:\n\n• Strength & CrossFit — Monthly ₹2,499 | Silver (3M) ₹6,999 | Gold (6M) ₹12,999 | Platinum (12M) ₹23,999\n• Zumba — Monthly ₹2,299 | Silver (3M) ₹5,999\n• CrossFit — Monthly ₹2,299 | Silver (3M) ₹5,999\n• Combo — Zumba + CrossFit ₹3,999 | Strength + Zumba ₹4,299\n• Personal Training — ₹8,999\n\nWhich plan interests you? I can recommend the best one for your goal — just tell me what you want to achieve.`,
  pricing: `Here's a quick look at our pricing:\n\nStrength & CrossFit: ₹2,499/month, ₹6,999/3M, ₹12,999/6M, ₹23,999/12M\nZumba: ₹2,299/month, ₹5,999/3M\nCrossFit: ₹2,299/month, ₹5,999/3M\nCombos from ₹3,999\nPersonal Training: ₹8,999\n\nWould you like a personalized recommendation? Tell me your fitness goal.`,
  'personal training': `Personal Training is ₹8,999 and includes:\n\n✓ Customized Workout\n✓ Nutrition Guidance\n✓ Weekly Progress Tracking\n✓ One-on-One Coach\n\nOur trainer Yasam Mohan Reddy personally handles every PT client. Would you like to book a free consultation?`,
  trainer: `Our trainer is Yasam Mohan Reddy — an EREPS Certified Personal Trainer (EQF Level 4) with 3+ years of experience. He specializes in:\n\n• Strength & Conditioning\n• Fat Loss\n• Muscle Building\n• Functional Training\n• Nutrition Guidance\n\nWould you like to book a session with him?`,
  certification: `Yasam Mohan Reddy holds an international EREPS certification (EQF Level 4), recognized by EuropeActive. The certification is valid until July 2027.`,
  experience: `Yasam Mohan Reddy has 3+ years of experience in personal training.`,
  timing: `Our gym timings are:\n\nMon - Sat: 5:00 AM - 11:00 PM\nSunday: 6:00 AM - 9:00 PM\n\nVisit any time during these hours!`,
  equipment: `We have premium imported equipment including:\n\n• Commercial Treadmills\n• Cross Trainers\n• Air Bikes\n• Smith Machine\n• Functional Trainer\n• Power Rack\n• Cable Machines\n• Dumbbells, Barbells & Weight Plates\n• Leg Press, Chest Press, Shoulder Press\n• Lat Pulldown & Seated Row\n• Battle Ropes, Kettlebells & Resistance Bands\n• Functional Training Area & Cardio Zone`,
  review: `Our members love us — 500+ reviews with a 4.8 rating! Here's what they say:\n\n⭐ "Excellent trainer support and personal attention!"\n⭐ "Cleanest gym in Kurnool with imported equipment."\n⭐ "Friendly atmosphere, everyone motivates each other."\n⭐ "Lost 8kg in 3 months with Mohan sir's guidance!"\n\nWould you like to visit and experience it yourself? I can book a free trial for you.`,
  parking: `Yes! We have spacious, dedicated private parking for all members.`,
  locker: `Yes, we provide secure locker rooms with shower facilities.`,
  'air conditioning': `Yes, our entire gym is fully air-conditioned for a comfortable training environment.`,
  steam: `Yes! Two complimentary steam sessions are provided to every member every month.`,
  biometric: `We offer secure, modern access at the gym entrance for member safety.`,
  'group classes': `Yes! We run energetic group classes including Zumba and functional training sessions led by expert coaches.`,
  nutrition: `Great question! Here are some general tips:\n\n🍽️ Pre-workout (30-60 min before): A banana, oats with milk, or whole-grain toast with peanut butter for energy.\n🍽️ Post-workout (within 45 min): Protein-rich food like eggs, chicken, paneer, or a protein shake with some carbs.\n🍽️ For fat loss: Focus on high protein, moderate carbs, and healthy fats. Maintain a slight calorie deficit.\n🍽️ For muscle gain: Eat in a calorie surplus with plenty of protein (1.6-2g per kg body weight).\n\nFor a personalized nutrition plan, our trainer Yasam Mohan Reddy can help — would you like to book a consultation?`,
  'weight loss': `Absolutely! Our trainer is a Fat Loss Specialist. Based on your goal, I recommend our Strength & CrossFit program with nutrition guidance — the Monthly plan is ₹2,499. Would you like to book a free trial?`,
  'muscle building': `Yes! Our trainer is a Muscle Building Coach. For muscle gain, I recommend Strength & CrossFit or Personal Training for the fastest results. Would you like a personalized plan recommendation?`,
  'free trial': `I'd love to arrange a free trial for you! Let me collect a few details and our team will confirm your visit.`,
  contact: `You can reach us at:\n\n📍 National flag park, Ameen Abbas Nagar Park Rd, above Indiramma community hall, beside skandanshi cloud 9, Ameen Abbas Nagar, Kurnool, Andhra Pradesh 518006\n📞 +91 86869 68544\n\nMon-Sat: 5 AM - 11 PM, Sun: 6 AM - 9 PM`,
  location: `We're located at National flag park, Ameen Abbas Nagar Park Rd, above Indiramma community hall, beside skandanshi cloud 9, Ameen Abbas Nagar, Kurnool, Andhra Pradesh 518006.\n\nYou can find us on Google Maps: https://maps.app.goo.gl/3F7eFLcySvUtVVJR6`,
  zumba: `Zumba memberships:\n\nMonthly: ₹2,299\nSilver (3 Months): ₹5,999\n\nAlso available in combo plans — Zumba + CrossFit for ₹3,999 or Strength + Zumba for ₹4,299.`,
  crossfit: `CrossFit memberships:\n\nMonthly: ₹2,299\nSilver (3 Months): ₹5,999\n\nAlso available in combo — Zumba + CrossFit for ₹3,999.`,
  combo: `Our combo plans:\n\n• Zumba + CrossFit — ₹3,999\n• Strength + Zumba — ₹4,299\n\nGreat value when you want to train across multiple programs!`,
  notes: `Important membership notes:\n\n• Fee must be paid in advance before joining.\n• Two steam sessions per person are provided every month.\n• Silver, Gold and Platinum memberships are valid in one lump sum.\n• Fee once paid is non-refundable.\n• Management reserves the right to change plans and fee structures.`,
  refund: `Membership fees are non-refundable once paid. Management reserves the right to change plans and fee structures.`,
  facilities: `Our facilities include:\n\n• Imported premium equipment\n• Air-conditioned training environment\n• Secure locker rooms with showers\n• Private parking\n• Steam room (2 free sessions/month)\n• Group classes\n• Strength & CrossFit zones`,
  whatsapp: `Great! You can reach us instantly on WhatsApp. Click the button below to start a chat with a pre-filled message.`,
};

export const joinTriggers = ['join', 'enroll', 'sign up', 'register', 'book', 'trial', 'consultation', 'interested', 'start', 'whatsapp'];

export function findAnswer(input: string): string {
  const text = input.toLowerCase();
  const keys = Object.keys(knowledge);
  for (const key of keys) {
    if (text.includes(key)) return knowledge[key];
  }
  for (const trigger of joinTriggers) {
    if (text.includes(trigger)) return "I'd be happy to help you join! May I collect your name, phone, email, and fitness goal so our team can reach out?";
  }
  if (text.includes('price') || text.includes('cost') || text.includes('fee')) return knowledge.pricing;
  if (text.includes('hour') || text.includes('open') || text.includes('close')) return knowledge.timing;
  if (text.includes('facilit') || text.includes('amenit')) return knowledge.facilities;
  if (text.includes('eat') || text.includes('diet') || text.includes('food')) return knowledge.nutrition;
  if (text.includes('bmi')) return "I can calculate your BMI! Just tell me your height (in cm) and weight (in kg).";
  if (text.includes('recommend') || text.includes('suggest') || text.includes('which plan')) return "I'd love to recommend the perfect plan! Tell me your fitness goal — weight loss, muscle gain, or general fitness?";
  return "I'm not sure about that. Please contact us at +91 86869 68544 for your Transformation. Our trainer will answer all your questions!";
}

export function recommendPlan(goal: string): string {
  const g = goal.toLowerCase();
  let best: Plan | null = null;
  if (g.includes('muscle') || g.includes('gain') || g.includes('build')) best = plans[0];
  else if (g.includes('weight loss') || g.includes('fat') || g.includes('lose')) best = plans[0];
  else if (g.includes('dance') || g.includes('zumba') || g.includes('fun')) best = plans[1];
  else if (g.includes('crossfit') || g.includes('intense') || g.includes('athletic')) best = plans[2];
  else if (g.includes('personal') || g.includes('1-on-1') || g.includes('one on one')) best = plans[4];
  else best = plans[0];

  const tiers = best.tiers.map((t) => `• ${t.label}: ${t.price}`).join('\n');
  return `Based on your goal, I recommend our ${best.name} program — ${best.tagline}\n\n${tiers}\n\nWould you like to book a free trial to experience it yourself?`;
}

export function calculateBMI(heightCm: number, weightKg: number): { bmi: number; category: string; advice: string } {
  const h = heightCm / 100;
  const bmi = weightKg / (h * h);
  let category = '';
  let advice = '';
  if (bmi < 18.5) {
    category = 'Underweight';
    advice = 'Focus on a calorie surplus and strength training to build healthy mass. Our Personal Training or Strength & CrossFit plan would be ideal.';
  } else if (bmi < 25) {
    category = 'Normal weight';
    advice = 'Great! Maintain your fitness with any of our programs. Strength & CrossFit or Combo plans work well.';
  } else if (bmi < 30) {
    category = 'Overweight';
    advice = 'A mix of cardio and strength training with nutrition guidance works best. Our Strength & CrossFit program is recommended.';
  } else {
    category = 'Obese';
    advice = 'Personal Training with nutrition guidance would give you the safest, fastest results. Our trainer will build a customized plan for you.';
  }
  return { bmi: Math.round(bmi * 10) / 10, category, advice };
}

export function estimateTimeToGoal(currentWeight: number, targetWeight: number, goal: string): string {
  const diff = Math.abs(currentWeight - targetWeight);
  if (diff === 0) return "You're already at your target weight — focus on maintaining with regular training and balanced nutrition!";
  const weeksPerKg = goal.toLowerCase().includes('muscle') ? 3 : 2;
  const weeks = Math.round(diff * weeksPerKg);
  const months = Math.round((weeks / 4) * 10) / 10;
  const direction = currentWeight > targetWeight ? 'lose' : 'gain';
  return `To ${direction} ${diff} kg safely, it typically takes about ${weeks} weeks (~${months} months) with consistent training and nutrition.\n\nA safe rate is 0.5-1 kg per week for fat loss, or 0.25-0.5 kg per week for muscle gain. Our trainer can create a personalized plan to hit this target — would you like to book a consultation?`;
}

export const quickReplies = [
  '💰 Membership Plans',
  '💪 Personal Training',
  '🏋 Equipment',
  '⭐ Reviews',
  '📅 Book Free Trial',
  '📍 Gym Location',
  '📞 Contact Us',
];
