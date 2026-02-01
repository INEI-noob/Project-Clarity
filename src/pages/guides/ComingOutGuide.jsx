import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Heart, 
  AlertTriangle, 
  MessageCircle, 
  CheckCircle2, 
  ArrowLeft, 
  ExternalLink,
  Users,
  Lightbulb,
  Sparkles
} from 'lucide-react';

/**
 * PROJECT SAPPHIRE - IMMERSIVE GUIDE SYSTEM
 * Replacing flat Markdown with an interactive, section-based narrative.
 * Location: src/pages/ComingOutGuide.jsx
 */

const Section = ({ title, icon: Icon, children, color = "indigo" }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-20"
  >
    <div className="flex items-center gap-4 mb-8">
      <div className={`p-3 rounded-2xl bg-${color}-50 text-${color}-600`}>
        <Icon size={28} />
      </div>
      <h3 className="text-4xl font-black tracking-tighter text-slate-900">{title}</h3>
    </div>
    <div className="pl-2 border-l-2 border-slate-100 ml-6">
      {children}
    </div>
  </motion.section>
);

const SafetyCard = ({ title, items, type = "success" }) => (
  <div className={`p-8 rounded-[2.5rem] mb-6 ${
    type === "warning" ? 'bg-rose-50 border border-rose-100' : 'bg-indigo-50/50 border border-indigo-100'
  }`}>
    <h4 className={`text-xl font-black mb-4 flex items-center gap-2 ${
      type === "warning" ? 'text-rose-600' : 'text-indigo-600'
    }`}>
      {type === "warning" ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
      {title}
    </h4>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            type === "warning" ? 'bg-rose-300' : 'bg-indigo-300'
          }`} />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const ComingOutGuide = ({ onBack }) => {
  return (
    <div className="min-h-screen pt-40 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs / Back */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black uppercase text-[10px] tracking-[0.2em] mb-12 transition-all"
        >
          <ArrowLeft size={16} /> Back to Library
        </button>

        {/* Hero Header */}
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-6 inline-block">
              Foundations
            </span>
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-slate-900 leading-[0.85] mb-8">
              Coming <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-600">Home.</span>
            </h1>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl italic">
              "There is no 'right' way to do this. There is only your way."
            </p>
          </motion.div>
        </header>

        {/* Core Principles */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            { title: "No Debt", text: "You don't owe anyone your truth. It is yours first.", icon: Heart },
            { title: "No Clock", text: "At 5 or 50, your timeline is perfectly valid.", icon: Sparkles },
            { title: "No Limit", text: "You can come out a thousand times or never.", icon: Users },
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
              <item.icon className="text-indigo-600 mb-4" size={24} />
              <h4 className="font-black text-xl mb-2">{item.title}</h4>
              <p className="text-slate-500 text-sm font-medium">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Safety First */}
        <Section title="Safety Infrastructure" icon={ShieldCheck} color="rose">
          <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
            Before we talk about words, we talk about foundations. Survival is the bravest thing you can do.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <SafetyCard 
              title="Essential Checklist"
              items={[
                "A support person who already knows",
                "A physical 'Safe Haven' backup location",
                "Financial independence (if dependent)",
                "Emergency documents (IDs, bank info)"
              ]}
            />
            <SafetyCard 
              type="warning"
              title="Wait if these exist..."
              items={[
                "Physical or emotional abuse at home",
                "Dependence on extreme anti-queer views",
                "Unstable mental health period",
                "Lack of a reliable escape route"
              ]}
            />
          </div>
        </Section>

        {/* The Strategy */}
        <Section title="The Strategy" icon={Lightbulb} color="amber">
          <div className="space-y-8">
            <div className="p-10 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-2xl font-black mb-4 italic">The "Safe First" Circle</h4>
                <p className="text-slate-400 mb-6 font-medium">Start where the friction is lowest.</p>
                <div className="flex flex-wrap gap-3">
                  {['Online Communities', 'Geographically Distant Friends', 'Verified Allies', 'Anonymous Hotlines'].map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-10 rounded-[3rem]">
              <h4 className="text-2xl font-black mb-6 flex items-center gap-3">
                <MessageCircle className="text-indigo-600" /> Scripting the Moment
              </h4>
              <div className="bg-slate-50 p-8 rounded-2xl italic text-slate-600 font-medium mb-8 border-l-4 border-indigo-400">
                "I need to tell you something important about myself. I'm [identity]. I'm telling you because you matter to me and I want to be authentic with you."
              </div>
              <p className="text-slate-500 font-medium">
                Remember: <span className="text-slate-900 font-black">"I'm still figuring that out"</span> is a complete sentence.
              </p>
            </div>
          </div>
        </Section>

        {/* South Africa Resources */}
        <div className="mt-32 p-12 rounded-[4rem] bg-gradient-to-br from-indigo-600 to-indigo-900 text-white">
          <h3 className="text-4xl font-black mb-8 italic">Local Lifelines (ZA)</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <a href="tel:0217126699" className="p-6 rounded-3xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all group">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Triangle Project</p>
              <p className="text-2xl font-black flex items-center justify-between">
                021 712 6699 <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
              </p>
            </a>
            <div className="p-6 rounded-3xl bg-white/10 border border-white/10">
               <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">The Rant Room</p>
               <p className="text-2xl font-black italic">Pulse Community Hub</p>
            </div>
          </div>
          <p className="mt-12 text-center text-indigo-300 font-bold text-sm italic">
            "You are already brave for just being here."
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingOutGuide;