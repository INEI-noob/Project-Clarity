import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Wallet, ShieldCheck, Briefcase, DoorOpen, 
  Lock, EyeOff, Terminal, Landmark, TrendingUp, 
  AlertTriangle, MapPin, Package, HeartHandshake,
  ExternalLink, ChevronRight, Info
} from 'lucide-react';

/**
 * PROJECT SAPPHIRE - EXTENDED LIBRARY GUIDES
 * Includes: Queer Money, Workplace, Digital Safety, and Exit Strategy
 */

// --- [ REUSABLE COMPONENTS ] ---

const GuideContainer = ({ title, subtitle, colorClass, icon: Icon, children, onBack }) => (
  <div className="min-h-screen pt-40 pb-32 px-6 bg-slate-50/20">
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black uppercase text-[10px] tracking-widest mb-12 transition-all">
        <ArrowLeft size={16} /> Back to Library
      </button>
      <header className="mb-20">
        <div className={`p-4 rounded-2xl ${colorClass} w-fit mb-8`}>
          <Icon size={32} />
        </div>
        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-slate-900 leading-[0.85] mb-8">
          {title.split(' ')[0]} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-400">{title.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="text-2xl text-slate-500 font-medium italic leading-relaxed max-w-2xl">{subtitle}</p>
      </header>
      {children}
    </div>
  </div>
);

const ContentBlock = ({ title, children, variant = "white" }) => (
  <section className={`p-10 md:p-12 rounded-[3.5rem] mb-8 ${variant === 'dark' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-100'}`}>
    <h3 className="text-3xl font-black italic mb-6 tracking-tight">{title}</h3>
    <div className="space-y-4 text-slate-500 font-medium leading-relaxed">
      {children}
    </div>
  </section>
);

// --- [ 1. QUEER MONEY ] ---

export const QueerMoneyGuide = ({ onBack }) => (
  <GuideContainer 
    title="Queer Money" 
    subtitle="Financial sovereignty is the ultimate tool for queer liberation."
    icon={Wallet}
    colorClass="bg-emerald-50 text-emerald-600"
    onBack={onBack}
  >
    <ContentBlock title="The 'Safety Fund'">
      <p>In a hostile household, money is often used as a leash. Building a 'Safety Fund' (or "Fuck Off Fund") is your first step to independence.</p>
      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        <div className="p-6 rounded-3xl bg-emerald-50 text-emerald-900">
          <h4 className="font-black text-xs uppercase tracking-widest mb-2">Digital Hiding</h4>
          <p className="text-xs">Use digital banks (TymeBank/Bank Zero) with no physical mail. Opt for e-statements only.</p>
        </div>
        <div className="p-6 rounded-3xl bg-emerald-50 text-emerald-900">
          <h4 className="font-black text-xs uppercase tracking-widest mb-2">Small Diversions</h4>
          <p className="text-xs">If you handle groceries or cash, keep the change. It adds up slowly but surely.</p>
        </div>
      </div>
    </ContentBlock>

    <ContentBlock title="Identity & Banking" variant="dark">
      <p className="text-slate-400">FICA laws in SA are strict, but you have rights. If your ID marker doesn't match your presentation:</p>
      <ul className="mt-6 space-y-4">
        <li className="flex gap-3 items-start"><TrendingUp className="text-emerald-400 shrink-0" size={18} /> Most major banks allow 'Preferred Name' on your card, even if the legal name remains on the account.</li>
        <li className="flex gap-3 items-start"><Landmark className="text-emerald-400 shrink-0" size={18} /> Standard Bank and FNB have specific LGBTQ+ sensitivity training for staff—ask for a private booth if uncomfortable.</li>
      </ul>
    </ContentBlock>
  </GuideContainer>
);

// --- [ 2. PROFESSIONAL CLOSET ] ---

export const WorkplaceGuide = ({ onBack }) => (
  <GuideContainer 
    title="Professional Closet" 
    subtitle="Navigating corporate South Africa while staying true to yourself."
    icon={Briefcase}
    colorClass="bg-slate-100 text-slate-600"
    onBack={onBack}
  >
    <ContentBlock title="The Interview Dance">
      <p>Disclosure is a personal choice, not an obligation. You are not required to disclose your orientation or gender identity during an interview.</p>
      <div className="mt-8 p-8 bg-slate-50 rounded-3xl border-l-4 border-slate-900">
        <p className="italic text-slate-700">"Is this company safe? Check their BEE report for diversity metrics or look at their LinkedIn to see if they celebrate Pride or have an ERG (Employee Resource Group)."</p>
      </div>
    </ContentBlock>

    <ContentBlock title="Medical Aid & Partners">
      <p>Under SA law, same-sex partners have the same rights as opposite-sex partners for medical aid dependency.</p>
      <div className="grid gap-4 mt-6">
        {['Discovery', 'Bonitas', 'GEMS'].map(aid => (
          <div key={aid} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
            <span className="font-black uppercase text-[10px] tracking-widest">{aid} Compliance</span>
            <span className="text-emerald-600 font-bold text-xs uppercase">Full Rights</span>
          </div>
        ))}
      </div>
    </ContentBlock>
  </GuideContainer>
);

// --- [ 3. DIGITAL FORTRESS ] ---

export const DigitalSafetyGuide = ({ onBack }) => (
  <GuideContainer 
    title="Digital Fortress" 
    subtitle="In the digital age, privacy isn't just a preference—it's protection."
    icon={Lock}
    colorClass="bg-purple-50 text-purple-600"
    onBack={onBack}
  >
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      <div className="p-10 rounded-[3rem] bg-slate-900 text-purple-400 flex flex-col justify-between">
        <Terminal size={40} className="mb-8" />
        <h4 className="text-2xl font-black italic mb-4">Device Privacy</h4>
        <p className="text-sm font-medium text-slate-400">Use 'Calculators' apps that act as secret vaults for photos. Always use a numeric PIN, not biometrics (FaceID can be forced).</p>
      </div>
      <div className="p-10 rounded-[3rem] bg-purple-600 text-white flex flex-col justify-between">
        <EyeOff size={40} className="mb-8" />
        <h4 className="text-2xl font-black italic mb-4">Dating App Security</h4>
        <p className="text-sm font-medium text-purple-100">Never link your Instagram to your Tinder. It makes you too easy to track. Use a VOIP number (like Skype or Burner) for initial chats.</p>
      </div>
    </div>

    <ContentBlock title="PoPI Act & Doxing">
      <p>If someone 'outs' you or leaks your private info without consent, they are violating the Protection of Personal Information Act.</p>
      <button className="mt-6 flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-widest">
        Report a Violation <ExternalLink size={14} />
      </button>
    </ContentBlock>
  </GuideContainer>
);

// --- [ 4. EXIT STRATEGY ] ---

export const ExitStrategyGuide = ({ onBack }) => (
  <GuideContainer 
    title="Exit Strategy" 
    subtitle="Getting out is the first step toward getting through."
    icon={DoorOpen}
    colorClass="bg-orange-50 text-orange-600"
    onBack={onBack}
  >
    <ContentBlock title="The Go-Bag Essentials" variant="dark">
      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: Package, text: "Original ID / Birth Cert" },
          { icon: HeartHandshake, text: "3 Months Meds Supply" },
          { icon: Wallet, text: "Emergency Cash (hidden)" },
          { icon: MapPin, text: "Powerbank & Cables" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/5 border border-white/10 text-center">
            <item.icon className="text-orange-400 mb-2" size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest">{item.text}</span>
          </div>
        ))}
      </div>
    </ContentBlock>

    <ContentBlock title="Safe Shelters (ZA)">
      <div className="space-y-4">
        <div className="p-6 rounded-3xl bg-orange-50 border border-orange-100">
          <h4 className="font-black text-orange-900 mb-1">Pride Shelter Trust (Cape Town)</h4>
          <p className="text-xs text-orange-800/70">The first formal LGBTQ+ shelter in Africa. Provides safe beds and social services.</p>
        </div>
        <div className="p-6 rounded-3xl bg-orange-50 border border-orange-100">
          <h4 className="font-black text-orange-900 mb-1">OUT LGBT Well-being (Pretoria)</h4>
          <p className="text-xs text-orange-800/70">Referrals for emergency housing and legal protection from domestic violence.</p>
        </div>
      </div>
    </ContentBlock>
  </GuideContainer>
);

// --- [ MAIN SWITCHER COMPONENT ] ---

export default function App() {
  const [currentGuide, setCurrentGuide] = useState('menu');

  const renderGuide = () => {
    switch(currentGuide) {
      case 'money': return <QueerMoneyGuide onBack={() => setCurrentGuide('menu')} />;
      case 'work': return <WorkplaceGuide onBack={() => setCurrentGuide('menu')} />;
      case 'safety': return <DigitalSafetyGuide onBack={() => setCurrentGuide('menu')} />;
      case 'exit': return <ExitStrategyGuide onBack={() => setCurrentGuide('menu')} />;
      default: return (
        <div className="min-h-screen pt-40 pb-32 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-black italic tracking-tighter mb-12">Expand Your Knowledge.</h1>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { id: 'money', title: 'Queer Money', icon: Wallet, color: 'hover:bg-emerald-50 text-emerald-600' },
                { id: 'work', title: 'Workplace', icon: Briefcase, color: 'hover:bg-slate-50 text-slate-600' },
                { id: 'safety', title: 'Digital Fortress', icon: Lock, color: 'hover:bg-purple-50 text-purple-600' },
                { id: 'exit', title: 'Exit Strategy', icon: DoorOpen, color: 'hover:bg-orange-50 text-orange-600' }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => setCurrentGuide(item.id)}
                  className={`p-10 rounded-[3rem] border-2 border-slate-50 transition-all flex flex-col items-center gap-6 group ${item.color}`}
                >
                  <item.icon size={48} className="group-hover:scale-110 transition-transform" />
                  <span className="font-black text-xl italic tracking-tighter text-slate-900">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="font-sans antialiased text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {renderGuide()}
    </div>
  );
}