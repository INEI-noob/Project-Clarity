import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Sparkles, 
  HelpCircle, 
  Stethoscope, 
  ArrowLeft, 
  CheckCircle,
  Shapes,
  Heart,
  Eye
} from 'lucide-react';

/**
 * PROJECT SAPPHIRE - GENDER IDENTITY & DISCOVERY GUIDE
 * Location: src/pages/GenderIdentityGuide.jsx
 */

const SpectrumItem = ({ label, description, color }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
    <div className={`w-3 h-3 rounded-full mb-4 ${color} shadow-lg shadow-current`} />
    <h5 className="font-black text-slate-900 mb-1">{label}</h5>
    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{description}</p>
  </div>
);

const Section = ({ title, icon: Icon, children, color = "indigo" }) => (
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

const GenderIdentityGuide = ({ onBack }) => {
  return (
    <div className="min-h-screen pt-40 pb-32 px-6 bg-white">
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
            <span className="px-4 py-2 rounded-full bg-rose-50 text-rose-500 font-black text-[10px] uppercase tracking-widest mb-6 inline-block">
              Self-Discovery
            </span>
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-slate-900 leading-[0.85] mb-8">
              True <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-purple-400 to-cyan-400">Nature.</span>
            </h1>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl italic">
              "Gender is not what is between your legs. It is what is between your ears—and your heart."
            </p>
          </motion.div>
        </header>

        {/* The Basics - Three Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            { label: "Sex", desc: "Biological traits assigned at birth.", icon: User },
            { label: "Identity", desc: "Your internal sense of who you are.", icon: Heart },
            { label: "Expression", desc: "How you present to the world.", icon: Eye },
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
              <item.icon className="text-slate-400 group-hover:text-purple-500 mb-4 transition-colors" size={24} />
              <h4 className="font-black text-xl mb-2">{item.label}</h4>
              <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* The Spectrum Map */}
        <Section title="The Map of You" icon={Shapes} color="purple">
          <div className="p-10 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden mb-12">
            <div className="relative z-10">
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-8">Beyond the Binary</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SpectrumItem label="Non-binary" description="Outside the 2" color="bg-cyan-400" />
                <SpectrumItem label="Genderfluid" description="In Motion" color="bg-rose-400" />
                <SpectrumItem label="Agender" description="Neutral" color="bg-slate-400" />
                <SpectrumItem label="Transgender" description="Evolved" color="bg-purple-400" />
              </div>
            </div>
          </div>
          <p className="text-center italic text-slate-400 font-medium px-8">
            "All are valid. All are real. All are enough."
          </p>
        </Section>

        {/* Questioning */}
        <Section title="Euphoria vs Dysphoria" icon={Sparkles} color="rose">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[3rem] bg-rose-50 border border-rose-100">
              <h4 className="text-xl font-black text-rose-600 mb-6 italic">Looking for Euphoria</h4>
              <ul className="space-y-4">
                {[
                  "Joy when someone uses a different pronoun",
                  "Feeling 'right' in a specific outfit",
                  "A sense of peace with a new name",
                  "Feeling connected to your reflection"
                ].map((text, i) => (
                  <li key={i} className="flex gap-3 text-rose-700/70 font-medium text-sm">
                    <CheckCircle size={16} className="mt-1 flex-shrink-0" /> {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="text-2xl font-black mb-4">There is no "Trans Enough."</h4>
              <p className="text-slate-500 font-medium leading-relaxed">
                You don't need a medical diagnosis or intense pain to justify your identity. 
                Sometimes, it's just about following the joy.
              </p>
            </div>
          </div>
        </Section>

        {/* Exploratory Lab */}
        <Section title="Exploration Lab" icon={HelpCircle} color="cyan">
          <div className="space-y-6">
            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] flex gap-6 items-start">
               <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-500 flex items-center justify-center flex-shrink-0">
                  <Globe size={24} />
               </div>
               <div>
                  <h5 className="font-black text-lg mb-1">Digital Try-On</h5>
                  <p className="text-slate-500 text-sm font-medium">Use different names or pronouns in anonymous online spaces. See how they "fit" before sharing them in the physical world.</p>
               </div>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] flex gap-6 items-start">
               <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center flex-shrink-0">
                  <Heart size={24} />
               </div>
               <div>
                  <h5 className="font-black text-lg mb-1">Private Rituals</h5>
                  <p className="text-slate-500 text-sm font-medium">Dressing in private, taking photos, or journaling. These are valid experiments that belong only to you.</p>
               </div>
            </div>
          </div>
        </Section>

        {/* Transition (ZA) */}
        <Section title="The Path in South Africa" icon={Stethoscope} color="amber">
          <div className="p-12 rounded-[3.5rem] bg-amber-50 border border-amber-100">
            <div className="grid md:grid-cols-3 gap-8 mb-10 text-center">
              <div>
                <p className="text-[10px] font-black uppercase text-amber-500 tracking-widest mb-2">Social</p>
                <p className="font-black text-amber-900">Name & Pronouns</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-amber-500 tracking-widest mb-2">Medical</p>
                <p className="font-black text-amber-900">Hormones & Care</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-amber-500 tracking-widest mb-2">Legal</p>
                <p className="font-black text-amber-900">Marker & Docs</p>
              </div>
            </div>
            <p className="text-amber-800/60 font-medium text-sm text-center mb-8 italic">
              "Not all transition is medical. Not all medical transition is accessible. You are still you."
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="http://www.genderdynamix.org.za" target="_blank" rel="noreferrer" className="px-6 py-3 bg-white rounded-2xl font-black text-amber-600 border border-amber-200 hover:shadow-md transition-all flex items-center gap-2">
                Gender DynamiX <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </Section>

        {/* Closing Quote */}
        <div className="mt-32 text-center">
           <div className="inline-block w-12 h-1 bg-gradient-to-r from-rose-300 to-cyan-400 mb-8" />
           <p className="text-3xl font-black italic text-slate-900 max-w-xl mx-auto leading-tight mb-6">
             "I spent years thinking I had to choose between being a man or a woman. Then I realized I could just be me."
           </p>
           <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Community Member</p>
        </div>
      </div>
    </div>
  );
};

export default GenderIdentityGuide;