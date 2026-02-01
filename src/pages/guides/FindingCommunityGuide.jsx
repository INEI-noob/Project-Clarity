import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  Globe, 
  Heart, 
  ArrowLeft, 
  MessageSquare, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Coffee
} from 'lucide-react';

/**
 * PROJECT SAPPHIRE - COMMUNITY DISCOVERY GUIDE
 * Location: src/pages/FindingCommunityGuide.jsx
 */

const CommunityTier = ({ title, subtitle, items, icon: Icon, colorClass }) => (
  <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm mb-8 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClass} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity`} />
    <div className="flex items-start gap-6 relative z-10">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50 text-slate-900 group-hover:scale-110 transition-transform duration-500`}>
        <Icon size={28} />
      </div>
      <div className="flex-1">
        <h4 className="text-2xl font-black mb-1">{title}</h4>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">{subtitle}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 border border-transparent hover:border-slate-100 transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span className="text-slate-600 font-medium text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const FindingCommunityGuide = ({ onBack }) => {
  return (
    <div className="min-h-screen pt-40 pb-32 px-6">
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
            <span className="px-4 py-2 rounded-full bg-cyan-50 text-cyan-600 font-black text-[10px] uppercase tracking-widest mb-6 inline-block">
              Connection
            </span>
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-slate-900 leading-[0.85] mb-8">
              Chosen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">Family.</span>
            </h1>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl italic">
              "You were never meant to do this alone. Somewhere, your people are already waiting for you."
            </p>
          </motion.div>
        </header>

        {/* Why it Matters */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="p-10 rounded-[3rem] bg-indigo-600 text-white flex flex-col justify-center">
            <Zap className="mb-6 opacity-50" size={32} />
            <h3 className="text-3xl font-black mb-4 italic">The Vital Link</h3>
            <p className="text-indigo-100 font-medium leading-relaxed">
              Research consistently shows that LGBTQ+ people with strong community ties have significantly lower rates of depression and higher life satisfaction. 
            </p>
          </div>
          <div className="p-10 rounded-[3rem] border-2 border-slate-100 flex flex-col justify-center italic text-2xl font-medium text-slate-400">
             "Community doesn't require visibility. You belong even in stealth."
          </div>
        </div>

        {/* Levels of Connection */}
        <section className="mb-32">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-12 text-center">Pathways to Connection</h3>
          
          <CommunityTier 
            title="Digital Sanctuaries"
            subtitle="Safest First Step"
            icon={Globe}
            colorClass="from-cyan-400 to-blue-500"
            items={["Trans.gg Discord", "r/LGBT Community", "Lex (Text-based app)", "Taimi Social"]}
          />

          <CommunityTier 
            title="Local Lifelines"
            subtitle="Cape Town & Joburg"
            icon={MapPin}
            colorClass="from-indigo-400 to-purple-500"
            items={["Triangle Project", "Gender DynamiX", "FEW (Joburg)", "Pride Africa"]}
          />

          <CommunityTier 
            title="Shared Interests"
            subtitle="Beyond Identity"
            icon={Coffee}
            colorClass="from-amber-400 to-orange-500"
            items={["Queer Book Clubs", "LGBTQ+ Sports Leagues", "Gaymer Groups", "Art Collectives"]}
          />
        </section>

        {/* Safety Protocol */}
        <section className="mb-32 p-12 rounded-[4rem] bg-slate-900 text-white relative overflow-hidden">
          <ShieldCheck className="absolute -top-10 -right-10 w-64 h-64 opacity-5" />
          <div className="relative z-10">
            <h3 className="text-4xl font-black mb-8 italic flex items-center gap-4">
               Safety in Public <div className="h-[2px] w-20 bg-cyan-400" />
            </h3>
            <ul className="space-y-6 max-w-xl">
              <li className="flex gap-4 items-start">
                <CheckCircle className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                <p className="font-medium text-slate-300">Always video chat before meeting an online connection in the physical world.</p>
              </li>
              <li className="flex gap-4 items-start">
                <CheckCircle className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                <p className="font-medium text-slate-300">Meet in well-lit, busy public spaces for at least the first three encounters.</p>
              </li>
              <li className="flex gap-4 items-start">
                <CheckCircle className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                <p className="font-medium text-slate-300">Tell one "anchor" friend where you are going and set a check-in time.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Intersectionality Note */}
        <div className="flex flex-col items-center text-center mb-32">
          <Heart className="text-rose-400 mb-6" size={40} />
          <h3 className="text-4xl font-black mb-6 tracking-tighter">Lift as you climb.</h3>
          <p className="text-slate-500 font-medium max-w-xl leading-relaxed">
            The community thrives when we support those at the intersections—queer people of color, disabled folk, and our elders. We are a chain, only as strong as our most vulnerable link.
          </p>
        </div>

        {/* Footer Resource */}
        <div className="p-12 rounded-[4rem] bg-indigo-50 border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-8">
           <div>
              <h4 className="text-2xl font-black text-indigo-900 mb-2">Isolated right now?</h4>
              <p className="text-indigo-600 font-medium">Post on <span className="font-black italic underline">The Pulse</span>. Someone is listening.</p>
           </div>
           <button 
             className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black flex items-center gap-2 hover:bg-indigo-700 transition-all"
           >
             Open Pulse <MessageSquare size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};

// Helper for Checklist
const CheckCircle = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default FindingCommunityGuide;