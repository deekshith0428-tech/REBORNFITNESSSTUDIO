import { useState, useRef, useEffect, FormEvent } from 'react';
import { MessageCircle, X, Send, Loader2, Calculator, Dumbbell, Apple, MapPin, Phone } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import {
  findAnswer, recommendPlan, calculateBMI, estimateTimeToGoal, quickReplies,
} from '@/lib/chatbotKnowledge';
import { createPersonalTrainingMessage, getTrainerDetails } from '@/lib/trainers';

type Msg = { role: 'bot' | 'user'; text: string; time: string; action?: 'whatsapp' };
type Flow =
  | { type: 'none' }
  | { type: 'lead'; leadType: string; step: number; data: Record<string, string> }
  | { type: 'trial'; step: number; data: Record<string, string> }
  | { type: 'recommend'; step: number; data: Record<string, string> }
  | { type: 'bmi'; step: number; data: Record<string, string> }
  | { type: 'fatgoal'; step: number; data: Record<string, string> };

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const WHATSAPP_NUMBER = '918686968544';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'bot', text: "Hi! I'm Reborn AI, your fitness assistant. I can recommend plans, calculate your BMI, book a free trial, and answer anything about Reborn Fitness Studio. How can I help?", time: now() },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [flow, setFlow] = useState<Flow>({ type: 'none' });
  const [submitting, setSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const pushBot = (text: string, action?: 'whatsapp') =>
    setMessages((m) => [...m, { role: 'bot', text, time: now(), action }]);
  const pushUser = (text: string) => setMessages((m) => [...m, { role: 'user', text, time: now() }]);
  const botReply = (text: string, action?: 'whatsapp') => {
    setTyping(true);
    setTimeout(() => { setTyping(false); pushBot(text, action); }, 700);
  };

  const saveLead = async (data: Record<string, string>, leadType: string) => {
    setSubmitting(true);
    try {
      const payload: Record<string, string | number | boolean | null> = {
        full_name: data.name || 'Unknown',
        phone: data.phone || 'Unknown',
        email: data.email || 'unknown@email.com',
        fitness_goal: data.goal || data.fitnessGoal || 'General Fitness',
        lead_type: leadType,
        preferred_date: data.date || null,
        preferred_time: data.time || null,
        interested_membership: data.membership || data.recommendation || null,
        age: data.age ? parseInt(data.age) : null,
        gender: data.gender || null,
        height: data.height || null,
        weight: data.weight || null,
        workout_experience: data.experience || null,
        whatsapp_opt_in: data.whatsapp === 'yes',
      };
      if (data.bmi) payload.bmi = parseFloat(data.bmi);
      const { error } = await supabase.from('chatbot_leads').insert(payload);
      if (error) throw error;
      return true;
    } catch {
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const startFlow = (f: Flow) => { setFlow(f); };

  // ---- Flow step prompts ----
  const flowPrompts: Record<string, string[]> = {
    lead: [
      "Great! Let's get you started. What's your full name?",
      "Thanks! What's your phone number?",
      "And your email address?",
      "What's your fitness goal? (e.g., Weight Loss, Muscle Building, General Fitness)",
    ],
    trial: [
      "I'd love to book your free trial! What's your full name?",
      "What's your phone number?",
      "And your email address?",
      "What preferred date works for you? (e.g., 15 Aug 2026)",
      "And what preferred time? (e.g., Morning 7 AM)",
    ],
    recommend: [
      "I can recommend the perfect plan! First, what's your age?",
      "What's your gender? (Male / Female / Other)",
      "What's your height in cm?",
      "What's your weight in kg?",
      "What's your fitness goal? (Weight Loss / Muscle Gain / General Fitness)",
      "What's your workout experience? (Beginner / Intermediate / Advanced)",
    ],
    bmi: [
      "Let's calculate your BMI! What's your height in cm?",
      "And your weight in kg?",
    ],
    fatgoal: [
      "Let's estimate your goal timeline! What's your current weight in kg?",
      "What's your target weight in kg?",
      "Is your goal fat loss or muscle gain?",
    ],
  };

  const handleFlowInput = async (text: string) => {
    if (flow.type === 'none') return false;
    pushUser(text);
    const step = (flow as { step: number }).step;
    const data = { ...(flow as { data: Record<string, string> }).data };
    const fields: Record<string, string[]> = {
      lead: ['name', 'phone', 'email', 'goal'],
      trial: ['name', 'phone', 'email', 'date', 'time'],
      recommend: ['age', 'gender', 'height', 'weight', 'goal', 'experience'],
      bmi: ['height', 'weight'],
      fatgoal: ['weight', 'target', 'goal'],
    };
    const fieldList = fields[flow.type];
    if (step < fieldList.length) {
      data[fieldList[step]] = text;
    }
    const nextStep = step + 1;

    if (nextStep < fieldList.length) {
      setFlow({ ...flow, step: nextStep, data } as Flow);
      botReply(flowPrompts[flow.type][nextStep]);
      return true;
    }

    // Flow complete
    if (flow.type === 'lead') {
      const ok = await saveLead(data, 'general');
      botReply(ok
        ? "Thank you! Our team will contact you shortly. Would you like to continue on WhatsApp?"
        : "Sorry, I couldn't submit your details right now. Please call us at +91 86869 68544.");
      if (ok) startFlow({ type: 'lead', leadType: 'general', step: 0, data: { ...data, whatsapp: '' } });
      else setFlow({ type: 'none' });
      return true;
    }
    if (flow.type === 'trial') {
      const ok = await saveLead(data, 'free_trial');
      botReply(ok
        ? "Your free trial request has been submitted. Our team will contact you shortly. Would you like to continue on WhatsApp?"
        : "Sorry, I couldn't submit your trial request. Please call us at +91 86869 68544.");
      if (ok) startFlow({ type: 'lead', leadType: 'general', step: 0, data: { ...data, whatsapp: '' } });
      else setFlow({ type: 'none' });
      return true;
    }
    if (flow.type === 'recommend') {
      const rec = recommendPlan(data.goal);
      const bmi = calculateBMI(parseFloat(data.height), parseFloat(data.weight));
      const summary = `Here's your personalized recommendation:\n\n📊 Your BMI: ${bmi.bmi} (${bmi.category})\n\n${rec}\n\nWould you like to book a free trial or have our team call you?`;
      data.recommendation = rec.split('\n')[0].replace('Based on your goal, I recommend our ', '').replace(' program', '');
      data.bmi = String(bmi.bmi);
      botReply(summary);
      setFlow({ type: 'none' });
      return true;
    }
    if (flow.type === 'bmi') {
      const h = parseFloat(data.height);
      const w = parseFloat(data.weight);
      if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
        botReply("I couldn't read those numbers. Please enter valid height (cm) and weight (kg). You can try again by typing 'BMI'.");
        setFlow({ type: 'none' });
        return true;
      }
      const bmi = calculateBMI(h, w);
      const leadData = { ...data, name: 'BMI Inquiry', phone: 'Unknown', email: 'unknown@email.com', goal: `BMI Check: ${bmi.category}`, bmi: String(bmi.bmi) };
      await saveLead(leadData, 'general');
      botReply(`Your BMI is ${bmi.bmi} — ${bmi.category}.\n\n${bmi.advice}\n\nWould you like a personalized plan? Our trainer can help!`);
      setFlow({ type: 'none' });
      return true;
    }
    if (flow.type === 'fatgoal') {
      const cur = parseFloat(data.weight);
      const tgt = parseFloat(data.target);
      if (isNaN(cur) || isNaN(tgt)) {
        botReply("I couldn't read those numbers. Please try again by typing 'fat goal'.");
        setFlow({ type: 'none' });
        return true;
      }
      const result = estimateTimeToGoal(cur, tgt, data.goal);
      botReply(result);
      setFlow({ type: 'none' });
      return true;
    }
    return true;
  };

  const handleQuick = (reply: string) => {
    const map: Record<string, string> = {
      '💰 Membership Plans': 'membership plans',
      '💪 Personal Training': 'personal training',
      '🏋 Equipment': 'equipment',
      '⭐ Reviews': 'reviews',
      '📅 Book Free Trial': '__trial__',
      '📍 Gym Location': 'location',
      '📞 Contact Us': 'contact',
    };
    const key = map[reply] || reply;
    pushUser(reply);
    if (key === '__trial__') {
      startFlow({ type: 'trial', step: 0, data: {} });
      botReply(flowPrompts.trial[0]);
      return;
    }
    if (key === 'personal training') {
      botReply(createPersonalTrainingMessage());
      return;
    }
    botReply(findAnswer(key));
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput('');

    if (flow.type !== 'none') {
      await handleFlowInput(text);
      return;
    }

    pushUser(text);
    const lower = text.toLowerCase();

    // Flow triggers
    if (lower.includes('recommend') || lower.includes('suggest plan') || lower.includes('which plan') || lower.includes('best plan')) {
      startFlow({ type: 'recommend', step: 0, data: {} });
      botReply(flowPrompts.recommend[0]);
      return;
    }
    if (lower.includes('bmi')) {
      startFlow({ type: 'bmi', step: 0, data: {} });
      botReply(flowPrompts.bmi[0]);
      return;
    }
    if (lower.includes('fat goal') || lower.includes('body fat') || lower.includes('how long') && (lower.includes('lose') || lower.includes('gain'))) {
      startFlow({ type: 'fatgoal', step: 0, data: {} });
      botReply(flowPrompts.fatgoal[0]);
      return;
    }
    if (lower.includes('free trial') || lower.includes('book trial') || lower.includes('trial')) {
      startFlow({ type: 'trial', step: 0, data: {} });
      botReply(flowPrompts.trial[0]);
      return;
    }
    if (lower.includes('whatsapp')) {
      const msg = encodeURIComponent("Hi! I'm interested in joining Reborn Fitness Studio. Can you help me?");
      botReply("Great! Click below to chat with us on WhatsApp instantly.", 'whatsapp');
      return;
    }
    if (lower.includes('join') || lower.includes('enroll') || lower.includes('sign up') || lower.includes('register') || lower.includes('interested')) {
      startFlow({ type: 'lead', leadType: 'general', step: 0, data: {} });
      botReply(flowPrompts.lead[0]);
      return;
    }
    if (lower.includes('weight loss') || lower.includes('lose weight') || lower.includes('fat loss')) {
      botReply(recommendPlan('weight loss') + "\n\nWould you like to book a free trial?");
      return;
    }
    if (lower.includes('muscle') || lower.includes('gain')) {
      botReply(recommendPlan('muscle building') + "\n\nWould you like to book a free trial?");
      return;
    }

    const trainerDetails = getTrainerDetails(text);
    if (trainerDetails) {
      botReply(trainerDetails);
      return;
    }

    botReply(findAnswer(text));
  };

  const toolButtons = [
    { icon: Calculator, label: 'BMI', onClick: () => { startFlow({ type: 'bmi', step: 0, data: {} }); pushUser('BMI Calculator'); botReply(flowPrompts.bmi[0]); } },
    { icon: Dumbbell, label: 'Plan Match', onClick: () => { startFlow({ type: 'recommend', step: 0, data: {} }); pushUser('Recommend a plan'); botReply(flowPrompts.recommend[0]); } },
    { icon: Apple, label: 'Nutrition', onClick: () => { pushUser('Nutrition tips'); botReply(findAnswer('nutrition')); } },
    { icon: MapPin, label: 'Location', onClick: () => { pushUser('Gym location'); botReply(findAnswer('location')); } },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat assistant"
        className="fixed bottom-6 right-6 z-[90] w-16 h-16 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg orange-glow hover:scale-110 transition-transform duration-300"
      >
        {open ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
        {!open && <span className="absolute inset-0 rounded-full bg-brand-orange animate-ping opacity-20" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-[90] w-[calc(100vw-2rem)] max-w-[400px] h-[600px] max-h-[82vh] bg-brand-card border border-brand-border rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-[fadeInUp_0.3s_ease-out]">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-orange to-orange-600 px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white">Reborn AI Assistant</h3>
              <p className="text-xs text-white/80">Typically replies instantly</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-brand-dark/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === 'user' ? 'bg-brand-orange text-white rounded-br-sm' : 'bg-brand-card border border-brand-border text-white/80 rounded-bl-sm'}`}>
                  <p className="whitespace-pre-line">{m.text}</p>
                  {m.action === 'whatsapp' && (
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'm interested in joining Reborn Fitness Studio. Can you help me?")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 bg-green-500 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" /> Open WhatsApp
                    </a>
                  )}
                  <span className="block text-[10px] text-white/40 mt-1 text-right">{m.time}</span>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-brand-card border border-brand-border rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            {submitting && (
              <div className="flex justify-center">
                <div className="text-xs text-white/40 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving your details...
                </div>
              </div>
            )}
          </div>

          {/* Tool buttons */}
          {flow.type === 'none' && (
            <div className="px-3 py-2 flex gap-2 border-t border-brand-border/50">
              {toolButtons.map((t) => (
                <button key={t.label} type="button" onClick={t.onClick} className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl bg-white/5 hover:bg-brand-orange/20 transition-colors text-white/60 hover:text-brand-orange">
                  <t.icon className="w-4 h-4" />
                  <span className="text-[10px] font-medium">{t.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Quick replies */}
          {flow.type === 'none' && (
            <div className="px-3 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {quickReplies.map((q) => (
                <button key={q} type="button" onClick={() => handleQuick(q)} className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-colors">
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-brand-border flex gap-2 bg-brand-card">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={flow.type !== 'none' ? 'Type your answer...' : 'Type your message...'}
              className="flex-1 bg-brand-dark border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-brand-orange"
            />
            <button type="submit" aria-label="Send message" className="w-10 h-10 shrink-0 rounded-xl bg-brand-orange text-white flex items-center justify-center hover:bg-orange-500 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
