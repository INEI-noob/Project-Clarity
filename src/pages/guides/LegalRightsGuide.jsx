import React from 'react';
import { motion } from 'framer-motion';
import { 
  Scale, 
  ShieldCheck, 
  Briefcase, 
  Home, 
  Fingerprint, 
  Heart, 
  Gavel,
  ArrowLeft,
  FileText,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

/**
 * PROJECT SAPPHIRE - LEGAL RIGHTS & ADVOCACY GUIDE (ZA)
 * Location: src/pages/LegalRightsGuide.jsx
 */

const RightsCard = ({ title, icon: Icon, children, status = "Protected" }) => (
  <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
        <Icon size={24} />
      </div>
      <span className="text-[10px] font-black uppercase px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full tracking-widest">
        {status}
      </span>
    </div>
    <h4 className="font-black text-xl text-slate-900 mb-3 italic tracking-tighter">{title}</h4>
    <div className="text-slate-500 text-sm font-medium leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

const ProtocolStep = ({ number, title, desc }) => (
  <div className="flex gap-6 items-start mb-8">
    <div className="text-4xl font-black text-indigo-100 italic">{number}</div>
    <div>
      <h5 className="font-black text-slate-900 mb-1">{title}</h5>
      <p className="text-slate-500 text-sm font-medium">{desc}</p>
    </div>
  </div>
);

const LegalRightsGuide = ({ onBack }) => {
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
            <span className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-6 inline-block">
              Constitutional Shield
            </span>
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-slate-900 leading-[0.85] mb-8">
              Legal <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-slate-400">Power.</span>
            </h1>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl italic">
              "The law is a tool. It is imperfect, but in South Africa, it is firmly on your side."
            </p>
          </motion.div>
        </header>

        {/* The Constitutional Core */}
        <section className="mb-32 p-12 rounded-[4rem] bg-indigo-900 text-white relative overflow-hidden">
          <Scale className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10" />
          <div className="relative z-10">
            <h3 className="text-4xl font-black mb-8 italic">The Progressive Core</h3>
            <p className="text-indigo-100 text-lg font-medium leading-relaxed mb-10 max-w-2xl">
              South Africa's Constitution was the first in the world to explicitly prohibit discrimination based on sexual orientation. 
              You are protected in marriage, adoption, housing, and work.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Same-sex Marriage', 'Joint Adoption', 'Equality Act', 'Hate Crime Laws'].map(item => (
                <div key={item} className="px-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-xs font-black uppercase tracking-widest text-center">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rights Grid */}
        <section className="grid md:grid-cols-2 gap-8 mb-32">
          <RightsCard title="Employment" icon={Briefcase}>
            <p>You cannot be fired or denied promotion for being LGBTQ+.</p>
            <p className="mt-2 text-indigo-600 font-bold">Tool: CCMA handles unfair dismissal.</p>
          </RightsCard>

          <RightsCard title="Housing" icon={Home}>
            <p>Eviction or denial of rental based on identity is illegal.</p>
            <p className="mt-2 text-indigo-600 font-bold">Contact: Triangle Project for safe referrals.</p>
          </RightsCard>

          <RightsCard title="ID & Markers" icon={Fingerprint}>
            <p>You have the right to change gender markers to M, F, or X at Home Affairs.</p>
            <p className="mt-2 text-indigo-600 font-bold">Act: Justice Alliance Case (2017).</p>
          </RightsCard>

          <RightsCard title="Marriage" icon={Heart}>
            <p>Full legal rights via Civil Union Act (2006) and Customary Marriage recognition.</p>
            <p className="mt-2 text-indigo-600 font-bold">Advice: Always have a valid Will.</p>
          </RightsCard>
        </section>

        {/* When Rights are Violated */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <AlertTriangle className="text-rose-500" size={32} />
            <h3 className="text-4xl font-black italic tracking-tighter text-slate-900">Action Protocol</h3>
          </div>

          <div className="bg-white p-12 rounded-[4rem] border border-slate-100">
            <ProtocolStep 
              number="01" 
              title="The Paper Trail" 
              desc="Document every interaction. Save screenshots, BCC private emails, and record dates. In law, if it isn't written down, it didn't happen."
            />
            <ProtocolStep 
              number="02" 
              title="The Witness" 
              desc="Never go to SAPS or Home Affairs alone if you expect hostility. Bring an advocate or a representative from an LGBTQ+ organization."
            />
            <ProtocolStep 
              number="03" 
              title="Quote the Code" 
              desc="Quote the Equality Act or your right to privacy. Note badge numbers. If an officer refuses a report, report them to IPID."
            />
            
            <div className="mt-12 pt-12 border-t border-slate-100 grid sm:grid-cols-2 gap-6">
               <div className="p-6 rounded-3xl bg-slate-50">
                  <h5 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-2">Legal Aid SA</h5>
                  <p className="text-sm font-medium text-slate-600 mb-4">Free legal services for those who cannot afford a lawyer.</p>
                  <button className="text-indigo-600 font-black text-[10px] uppercase flex items-center gap-2">Visit Site <ExternalLink size={12}/></button>
               </div>
               <div className="p-6 rounded-3xl bg-slate-50">
                  <h5 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-2">Triangle Project</h5>
                  <p className="text-sm font-medium text-slate-600 mb-4">Specialized LGBTQ+ legal advocacy and police accompaniment.</p>
                  <button className="text-indigo-600 font-black text-[10px] uppercase flex items-center gap-2">Get Help <ExternalLink size={12}/></button>
               </div>
            </div>
          </div>
        </section>

        {/* Asylum Section */}
        <section className="mb-32 p-10 bg-white border-2 border-slate-100 rounded-[3rem] flex flex-col md:flex-row gap-8 items-center">
           <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center flex-shrink-0">
              <Gavel size={32} />
           </div>
           <div>
              <h4 className="text-2xl font-black mb-2 italic">Refugee & Asylum Status</h4>
              <p className="text-slate-500 font-medium text-sm leading-relaxed mb-4">
                South Africa grants asylum to those fleeing persecution based on sexuality or gender. If you are from a country that criminalizes your existence, contact <span className="text-slate-900 font-bold">PASSOP</span> or <span className="text-slate-900 font-bold">Legal Aid</span> immediately.
              </p>
           </div>
        </section>

        {/* Gap Warning */}
        <div className="text-center italic text-slate-400 font-medium max-w-xl mx-auto border-t border-slate-100 pt-12">
          "The arc of the moral universe bends toward justice—but it needs us to pull it."
        </div>
      </div>
    </div>
  );
};

export default LegalRightsGuide;