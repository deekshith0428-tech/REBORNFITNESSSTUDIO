import { useState } from 'react';
import { Clock, ExternalLink, MapPin, Phone, Send } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  goal: string;
  preferredTime: string;
  message: string;
};

const initialForm: ContactForm = {
  name: '',
  email: '',
  phone: '',
  goal: 'Weight Loss',
  preferredTime: 'Morning (5 AM - 10 AM)',
  message: '',
};

const WHATSAPP_URL = 'https://wa.me/918686968544?text=';
const MAPS_URL = 'https://maps.app.goo.gl/3F7eFLcySvUtVVJR6';

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [error, setError] = useState('');

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.goal || !form.preferredTime || !form.message.trim()) {
      setError('Please complete every field so our team has all the information needed to contact you.');
      return;
    }

    const message = `Hello Reborn Fitness Studio,\n\nI would like to request a callback.\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nFitness Goal: ${form.goal}\nPreferred Time: ${form.preferredTime}\nMessage: ${form.message}\n\nPlease contact me regarding my fitness enquiry.\n\nThank you.`;
    window.location.href = `${WHATSAPP_URL}${encodeURIComponent(message)}`;
  };

  return (
    <section id="contact" className="relative py-28 lg:py-36">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange mb-4 block" data-reveal>
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4" data-reveal>
            Get In Touch
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto" data-reveal>
            Ready to begin? Request a callback and we'll reach out to you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6" data-reveal>
            <div className="bg-brand-card border border-brand-border rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-white/50">National flag park, Ameen Abbas Nagar Park Rd, above Indiramma community hall, beside skandanshi cloud 9, Ameen Abbas Nagar, Kurnool, Andhra Pradesh 518006</p>
              </div>
            </div>

            <div className="bg-brand-card border border-brand-border rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-white/50">+91 86869 68544</p>
              </div>
            </div>

            <div className="bg-brand-card border border-brand-border rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Opening Hours</h3>
                <p className="text-white/50">Mon - Sat: 5:00 AM - 9:00 PM</p>
                <p className="text-white/50">Sunday: 6:00 AM - 10:00 PM</p>
              </div>
            </div>

            <div className="rounded-2xl border border-brand-border bg-brand-card p-6 flex items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Find Us on Google Maps</h3>
                  <p className="text-white/50 text-sm">Get directions to Reborn Fitness Studio.</p>
                </div>
              </div>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-4 py-3 text-sm font-semibold text-white hover:bg-orange-500 transition-colors orange-glow-sm">
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Get Directions</span>
                <span className="sm:hidden">Maps</span>
              </a>
            </div>
          </div>

          <div data-reveal>
            <form onSubmit={handleSubmit} className="bg-brand-card border border-brand-border rounded-3xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name" name="name" type="text" placeholder="Your name" value={form.name} onChange={(value) => updateField('name', value)} />
                <Field label="Email" name="email" type="email" placeholder="you@email.com" value={form.email} onChange={(value) => updateField('email', value)} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Phone" name="phone" type="tel" placeholder="+91 86869 68544" value={form.phone} onChange={(value) => updateField('phone', value)} />
                <SelectField label="Fitness Goal" value={form.goal} onChange={(value) => updateField('goal', value)} options={['Weight Loss', 'Muscle Building', 'General Fitness', 'Personal Training']} />
              </div>
              <SelectField label="Preferred Time" value={form.preferredTime} onChange={(value) => updateField('preferredTime', value)} options={['Morning (5 AM - 10 AM)', 'Afternoon (10 AM - 4 PM)', 'Evening (4 PM - 11 PM)']} />
              <div>
                <label className="block text-sm text-white/60 mb-2" htmlFor="message">Message</label>
                <textarea id="message" name="message" required rows={4} value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder="Tell us about your goals..." className="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-white focus:border-brand-orange outline-none transition-colors resize-none" />
              </div>
              {error && <p className="text-sm text-red-300" role="alert">{error}</p>}
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-brand-orange text-white font-semibold hover:bg-orange-500 transition-all duration-300 orange-glow-sm">
                <Send className="w-4 h-4" />
                Request Callback
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type, placeholder, value, onChange }: { label: string; name: string; type: string; placeholder: string; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <label className="block text-sm text-white/60 mb-2" htmlFor={name}>{label}</label>
      <input required id={name} type={type} name={name} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-white focus:border-brand-orange outline-none transition-colors" />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <div>
      <label className="block text-sm text-white/60 mb-2">{label}</label>
      <select required value={value} onChange={(event) => onChange(event.target.value)} className="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-white focus:border-brand-orange outline-none transition-colors">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </div>
  );
}
