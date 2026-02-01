import React from 'react';
import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  ShieldAlert, 
  Brain, 
  Activity, 
  ArrowLeft, 
  Search, 
  AlertCircle,
  Clock,
  FileText,
  UserCheck
} from 'lucide-react';

/**
 * PROJECT SAPPHIRE - AFFIRMING HEALTHCARE NAVIGATOR
 * Location: src/pages/HealthcareGuide.jsx
 */

const ProviderCard = ({ title, category, location, link }) => (
  <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">{category}</p>
    <h4 className="font-black text-xl text-slate-900 mb-1">{title}</h4>
    <p className="text-slate-500 text-sm mb-4 font-medium">{location}</p>
    <button className="text-indigo-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
      View Details <ArrowLeft size={14} className="rotate-180" />
    </button>
  </div>
);

const Section = ({ title, icon: Icon, children, color = "emerald" }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-24"
  >
    <div className="flex items-center gap-4 mb-10">
      <div className={`p-4 rounded-2xl bg-${color}-50 text-${color}-600`}>
        <Icon size={24} />
      </div>
      <h3 className="text-4xl font-black tracking-tighter text-slate-900">{title}</h3>
    </div>
    {children}
  </motion.section>
);

const HealthcareGuide = ({ onBack }) => {
  return (
    <div className="min-h-screen pt-40 pb-32 px-6 bg-slate-50/30">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black uppercase text-[10px] tracking-[0.2em] mb-12 transition-all"
        >
          <ArrowLeft size={16} /> Back to Library
        </button>

        {/* Header */}
        <header className="mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-6 inline-block">
              Well-being
            </span>
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-slate-900 leading-[0.85] mb-8">
              Vital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-600">Care.</span>
            </h1>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl italic">
              "You deserve affirming care. Not just as a patient, but as your whole self."
            </p>
          </motion.div>
        </header>

        {/* Find Providers */}
        <Section title="Finding Your Team" icon={Search} color="emerald">
          <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
            Affirming providers in South Africa don't always advertise. Finding them requires a mix of community wisdom and vetting.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <ProviderCard 
              category="Gender Clinics"
              title="Groote Schuur / Charlotte Maxeke"
              location="Public (CT / JHB)"
            />
            <ProviderCard 
              category="Therapy"
              title="Psychology Today (LGBTQ+ Filter)"
              location="Nationwide / Online"
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-start gap-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
               <UserCheck size={24} />
            </div>
            <div>
               <h5 className="font-black text-lg mb-2 italic">The "Call Ahead" Test</h5>
               <p className="text-slate-500 text-sm font-medium">
                 Call a new GP and ask: <span className="text-slate-900">"Do you have experience with LGBTQ+ patients?"</span> 
                 A split-second hesitation or confusion is often your answer. Look for providers who follow <span className="font-bold">WPATH</span> standards.
               </p>
            </div>
          </div>
        </Section>

        {/* Survival Guide */}
        <Section title="Surviving Bad Care" icon={ShieldAlert} color="rose">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-[2.5rem] bg-rose-50 border border-rose-100">
               <h4 className="text-rose-600 font-black text-xl mb-4 italic">If Refused Care</h4>
               <ul className="space-y-4 text-sm font-medium text-rose-800/70">
                 <li className="flex gap-2">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    Ask for the refusal reason in writing.
                 </li>
                 <li className="flex gap-2">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    File a complaint with the HPCSA.
                 </li>
                 <li className="flex gap-2">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    Focus on the immediate issue: "I am here for the flu, not my identity."
                 </li>
               </ul>
            </div>
            <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white flex flex-col justify-center">
               <h4 className="text-xl font-black mb-4 italic">The Red Flags</h4>
               <p className="text-slate-400 text-sm leading-relaxed">
                 Any therapist who suggests your identity is a symptom of trauma, or uses religious framing to "cure" you, is dangerous. <span className="text-white font-bold">Leave immediately.</span>
               </p>
            </div>
          </div>
        </Section>

        {/* Sexual Health */}
        <Section title="Sexual Vitality" icon={Activity} color="indigo">
          <div className="space-y-6">
            <div className="p-10 rounded-[3rem] bg-indigo-600 text-white relative overflow-hidden">
              <Clock className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10" />
              <div className="relative z-10">
                <h4 className="text-2xl font-black mb-4 italic underline decoration-indigo-300 underline-offset-8">PEP & PrEP</h4>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-black text-indigo-200 uppercase text-[10px] tracking-widest mb-2">Pre-Exposure (PrEP)</h5>
                    <p className="text-sm font-medium">Daily pill for HIV prevention. Available free at government clinics in SA.</p>
                  </div>
                  <div>
                    <h5 className="font-black text-rose-300 uppercase text-[10px] tracking-widest mb-2">Post-Exposure (PEP)</h5>
                    <p className="text-sm font-medium">Emergency treatment. Must start within 72 hours of exposure. Sooner is better.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem]">
               <h4 className="text-xl font-black mb-4">Routine Testing</h4>
               <p className="text-slate-500 text-sm font-medium mb-6">Judgment-free testing is available at Dis-Chem, Clicks, or local public clinics. Aim for every 3-6 months if sexually active.</p>
               <div className="flex flex-wrap gap-2">
                 {["HIV 4th Gen", "Syphilis", "Chlamydia", "Hepatitis B/C"].map(t => (
                   <span key={t} className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                     {t}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        </Section>

        {/* Privacy & Law */}
        <div className="mt-32 p-12 rounded-[4rem] bg-white border-2 border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <FileText className="text-indigo-600" size={32} />
            <h3 className="text-4xl font-black italic tracking-tighter text-slate-900">Privacy & The Law (ZA)</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h5 className="font-black text-lg mb-2">Age of Consent</h5>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                In South Africa, if you are <span className="text-slate-900 font-bold">16+ years old</span>, you have the legal right to medical privacy. Your doctor cannot share your info with parents without your consent.
              </p>
            </div>
            <div>
              <h5 className="font-black text-lg mb-2">Medical Aid Privacy</h5>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Discovery and Bonitas typically don't show procedure specifics to principal members, but they may show codes (e.g., "Endocrinology"). Use cash for sensitive visits if needed.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Footer */}
        <div className="mt-32 text-center bg-rose-50 p-10 rounded-[3rem] border border-rose-100">
           <h4 className="text-rose-600 font-black text-xl mb-2 italic">Medical Emergency?</h4>
           <p className="text-slate-600 text-sm font-medium max-w-lg mx-auto leading-relaxed">
             If you are using DIY HRT and experience leg pain, shortness of breath, or yellowing skin, <span className="text-rose-600 font-black">go to the ER immediately.</span> These are signs of DVT or liver distress.
           </p>
        </div>
      </div>
    </div>
  );
};

export default HealthcareGuide;