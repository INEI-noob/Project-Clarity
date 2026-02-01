import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Lock, 
  Smartphone, 
  EyeOff, 
  Globe, 
  ArrowLeft, 
  AlertOctagon,
  Key,
  Trash2,
  HardDrive
} from 'lucide-react';

/**
 * PROJECT SAPPHIRE - DIGITAL SAFETY PROTOCOL
 * Location: src/pages/DigitalSafetyGuide.jsx
 */

const RiskCard = ({ title, description, level = "High" }) => (
  <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <h4 className="font-black text-lg text-slate-900">{title}</h4>
      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
        level === "Critical" ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"
      }`}>
        {level} Risk
      </span>
    </div>
    <p className="text-slate-500 text-sm font-medium leading-relaxed">{description}</p>
  </div>
);

const ProtocolSection = ({ title, icon: Icon, children }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-24"
  >
    <div className="flex items-center gap-4 mb-10">
      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
        <Icon size={24} />
      </div>
      <h3 className="text-4xl font-black tracking-tighter text-slate-900">{title}</h3>
    </div>
    {children}
  </motion.section>
);

const DigitalSafetyGuide = ({ onBack }) => {
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
            <div className="flex items-center gap-3 mb-6">
              <ShieldAlert className="text-rose-500" size={24} />
              <span className="text-rose-500 font-black text-[10px] uppercase tracking-widest">Security Protocol</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-slate-900 leading-[0.85] mb-8">
              Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">Cloaking.</span>
            </h1>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              Your digital footprint can out you before you're ready. This is how you reclaim your shadow.
            </p>
          </motion.div>
        </header>

        {/* The Risks Matrix */}
        <ProtocolSection title="The Vulnerabilities" icon={AlertOctagon}>
          <div className="grid md:grid-cols-2 gap-4">
            <RiskCard 
              title="Device History" 
              description="Browser logs, search queries, and autocomplete can reveal months of research in seconds." 
              level="Critical"
            />
            <RiskCard 
              title="Location Metadata" 
              description="Photos and apps often embed your exact GPS coordinates, outing your visits to queer venues." 
              level="High"
            />
            <RiskCard 
              title="Social Algorithms" 
              description="'People You May Know' suggestions can link your alt accounts to family members." 
              level="High"
            />
            <RiskCard 
              title="Biometrics" 
              description="Fingerprints can be used to unlock your phone while you are asleep or incapacitated." 
              level="Critical"
            />
          </div>
        </ProtocolSection>

        {/* Browser Layer */}
        <ProtocolSection title="Browser Level" icon={Globe}>
          <div className="space-y-6">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h4 className="text-2xl font-black mb-4">Compartmentalization</h4>
                <p className="text-slate-500 font-medium mb-6">
                  Don't mix your worlds. Use separate browsers for different parts of your life.
                </p>
                <div className="flex gap-4">
                  <div className="flex-1 p-4 bg-slate-50 rounded-2xl text-center">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Public Life</p>
                    <p className="font-bold text-slate-900">Chrome / Safari</p>
                  </div>
                  <div className="flex-1 p-4 bg-indigo-50 rounded-2xl text-center">
                    <p className="text-[10px] font-black uppercase text-indigo-400 mb-2">Queer Life</p>
                    <p className="font-bold text-indigo-600">Firefox / Brave</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-900 text-white rounded-[2.5rem]">
                <Trash2 className="text-rose-400 mb-4" />
                <h5 className="font-black text-xl mb-2">Regular Purge</h5>
                <p className="text-slate-400 text-sm">Set a habit: <span className="text-white font-mono">Ctrl+Shift+Delete</span> every single night. No exceptions.</p>
              </div>
              <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem]">
                <EyeOff className="text-indigo-600 mb-4" />
                <h5 className="font-black text-xl mb-2">Privacy Search</h5>
                <p className="text-slate-500 text-sm">Switch your default search engine to <span className="text-slate-900 font-bold">DuckDuckGo</span> to prevent targeted ad tracking.</p>
              </div>
            </div>
          </div>
        </ProtocolSection>

        {/* Device Layer */}
        <ProtocolSection title="Device Hardening" icon={Smartphone}>
          <div className="bg-indigo-600 rounded-[3.5rem] p-12 text-white overflow-hidden relative">
            <HardDrive className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10" />
            <div className="relative z-10 max-w-lg">
              <h4 className="text-3xl font-black mb-6 italic tracking-tighter">Physical Security</h4>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center font-black">1</div>
                  <p className="font-medium text-indigo-100"><span className="text-white font-black">Disable Biometrics:</span> Use a complex Alphanumeric PIN instead. Police or family can force a finger, but they can't force a thought.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center font-black">2</div>
                  <p className="font-medium text-indigo-100"><span className="text-white font-black">App Disguise:</span> Use 'Calculator' vault apps to hide photos or sensitive communication apps.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center font-black">3</div>
                  <p className="font-medium text-indigo-100"><span className="text-white font-black">Second User:</span> On Android, create a guest profile. It's an entirely separate encrypted space for your queer apps.</p>
                </li>
              </ul>
            </div>
          </div>
        </ProtocolSection>

        {/* Emergency Cleanup */}
        <div className="mt-32 p-12 rounded-[4rem] bg-white border-2 border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <Key className="text-indigo-600" size={32} />
            <h3 className="text-4xl font-black italic tracking-tighter text-slate-900">In Case of Emergency</h3>
          </div>
          <p className="text-slate-500 font-medium mb-10 text-lg">If you believe your phone is about to be seized or searched:</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-slate-50">
              <h5 className="font-black mb-2 uppercase text-[10px] tracking-widest text-slate-400">The Remote Wipe</h5>
              <p className="text-sm text-slate-600">Ensure 'Find My Device' is active on another computer. You can factory reset your phone instantly from any browser.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50">
              <h5 className="font-black mb-2 uppercase text-[10px] tracking-widest text-slate-400">The "Alt" Narrative</h5>
              <p className="text-sm text-slate-600">Keep a pre-written message to a friend about "being hacked" or "phone acting weird." It is a survival lie, and it is valid.</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex items-center gap-4">
             <div className="p-2 bg-rose-50 text-rose-500 rounded-lg">
                <Lock size={16} />
             </div>
             <p className="text-sm font-black text-slate-400 italic">"Digital safety is physical safety. Protect your data to protect yourself."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalSafetyGuide;