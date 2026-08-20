import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Wallet, ShieldCheck, Briefcase, DoorOpen, 
  MapPin, Home, Phone, HeartHandshake, AlertCircle,
  Lock, EyeOff, Terminal, Landmark, TrendingUp, 
  AlertTriangle, Package, Heart,
  ExternalLink, ChevronRight, Sparkles, Coffee,
  Clock, UserCheck
} from 'lucide-react';

/**
 * Extended Guides - For when you need practical armor but also want to feel human
 * Queer Money, Workplace Navigation, Digital Safety, and Leaving Unsafe Homes
 */

const GuideContainer = ({ title, subtitle, colorClass, icon: Icon, children, onBack }) => (
  <div className="min-h-screen pt-32 pb-32 px-6 bg-gradient-to-b from-white to-slate-50/30">
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold uppercase text-[11px] tracking-widest mb-12 transition-all group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        Back to Guides
      </button>
      
      <header className="mb-20">
        <div className={`p-4 rounded-2xl ${colorClass} w-fit mb-8`}>
          <Icon size={32} />
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[0.95] mb-8">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      </header>
      {children}
    </div>
  </div>
);

const ContentBlock = ({ title, children, variant = "white", className = "" }) => (
  <section className={`p-8 md:p-12 rounded-[3rem] mb-8 ${variant === 'dark' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-100 shadow-sm'} ${className}`}>
    <h3 className="text-2xl md:text-3xl font-black italic mb-6 tracking-tight">{title}</h3>
    <div className="space-y-4 text-slate-600 font-medium leading-relaxed">
      {children}
    </div>
  </section>
);

const QuoteBlock = ({ children, context }) => (
  <div className="my-8 p-6 md:p-8 rounded-2xl bg-slate-50 border-l-4 border-indigo-400 italic text-slate-700 font-medium relative">
    <Sparkles className="absolute right-4 top-4 text-indigo-200" size={20} />
    "{children}"
    {context && <span className="block mt-3 text-sm text-slate-500 not-italic">— {context}</span>}
  </div>
);

// --- [ 1. QUEER MONEY ] ---

export const QueerMoneyGuide = ({ onBack }) => (
  <GuideContainer 
    title="Queer Money" 
    subtitle="Financial privacy isn't about shame—it's about survival. And building your safety net, rand by rand, is an act of radical self-love."
    icon={Wallet}
    colorClass="bg-emerald-50 text-emerald-600"
    onBack={onBack}
  >
    <div className="prose prose-lg text-slate-600 font-medium leading-relaxed mb-12">
      <p>
        If someone controls your money, they control your ability to leave. If someone monitors your spending, they monitor your life. 
        <strong className="text-slate-900"> This isn't your fault.</strong> Economic abuse is real, and in South Africa's economic climate, it's often the chain that keeps people trapped longest.
      </p>
      <p>
        Starting a secret fund doesn't make you deceitful. It makes you strategic. It makes you free.
      </p>
    </div>

    <ContentBlock title="The 'Fuck Off Fund'" className="bg-emerald-50/30 border-emerald-100">
      <p className="mb-6">
        That's the real name. It's the money that lets you say "no" when you need to, that lets you leave the room, the relationship, or the house. 
        Here's how to build it when every rand is watched:
      </p>
      
      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm">
          <Clock className="text-emerald-500 mb-3" size={24} />
          <h4 className="font-black text-slate-900 mb-2">The Slow Build</h4>
          <p className="text-sm text-slate-600">
            R20 here, the change from groceries there. If you do the shopping, ask for cash back and pocket R50. It feels small, but six months of R50 is R300. That's a night in a safe guesthouse.
          </p>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm">
          <Phone className="text-emerald-500 mb-3" size={24} />
          <h4 className="font-black text-slate-900 mb-2">Invisible Banking</h4>
          <p className="text-sm text-slate-600">
            Open a <strong>TymeBank</strong> or <strong>Bank Zero</strong> account on your phone. No physical branches, no mail. Use a friend's address if you need to. Turn off all app notifications—better to check manually than risk a popup at the wrong moment.
          </p>
        </div>
      </div>

      <QuoteBlock context="Someone who made it out, Johannesburg">
        I saved R5,000 over eight months by claiming 'transport costs' went up. It was terrifying but thrilling. That money bought me a week's head start when I left.
      </QuoteBlock>
    </ContentBlock>

    <ContentBlock title="When Your ID Doesn't Match You" variant="dark">
      <p className="text-slate-300 mb-6">
        Walking into a bank with an ID that outs you before you speak is vulnerability you shouldn't have to feel. You have options:
      </p>
      
      <div className="space-y-6">
        <div className="flex gap-4 items-start">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
            <UserCheck size={16} className="text-emerald-400" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">Preferred Name Options</h4>
            <p className="text-slate-400 text-sm">
              Most major SA banks (FNB, Standard Bank, Nedbank) allow a "preferred name" on your card, even if your legal name remains on the account. You don't owe the teller an explanation.
            </p>
          </div>
        </div>
        
        <div className="flex gap-4 items-start">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
            <Landmark size={16} className="text-emerald-400" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">Ask for Privacy</h4>
            <p className="text-slate-400 text-sm">
              FNB and Standard Bank have LGBTQ+ sensitivity training. You can ask to speak to a supervisor or use a private booth. You're allowed to say, "I'd prefer to discuss this privately."
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10">
        <p className="text-sm text-slate-300 italic">
          <strong>Note:</strong> Changing your gender marker legally is possible but bureaucratic. For now, protect your peace with preferred names while you navigate the system.
        </p>
      </div>
    </ContentBlock>

    <ContentBlock title="Black Tax & Queerness" className="bg-amber-50/30 border-amber-100">
      <p className="mb-4">
        When you're supporting family financially, leaving or setting boundaries can feel impossible—they depend on you. You're not selfish for wanting safety. 
      </p>
      <p className="text-slate-700">
        <strong>Practical tip:</strong> If you send money home, use methods that don't reveal your location or full financial picture. Shoprite/Money Market transfers can be less traceable than bank transfers, and you can send cash without a paper trail.
      </p>
    </ContentBlock>
  </GuideContainer>
);

// --- [ 2. WORKPLACE NAVIGATION ] ---

export const WorkplaceGuide = ({ onBack }) => (
  <GuideContainer 
    title="The 9-to-5 Self" 
    subtitle="Navigating corporate South Africa when bringing your whole self to work isn't safe—or when you're just not ready to."
    icon={Briefcase}
    colorClass="bg-slate-100 text-slate-600"
    onBack={onBack}
  >
    <div className="mb-12 text-slate-600 font-medium leading-relaxed space-y-4">
      <p>
        South Africa has excellent LGBTQ+ protections on paper. The reality in the breakroom? It varies. From "we don't have a pronoun policy" to casual homophobia disguised as humor, the workplace can be exhausting.
      </p>
      <p>
        <strong>You don't owe your employer your authenticity.</strong> If code-switching keeps you safe andpaid, that's survival, not betrayal.
      </p>
    </div>

    <ContentBlock title="The Interview: Reading the Room">
      <p className="mb-6">
        You never have to disclose during an interview. But if you want to test the waters before accepting a job:
      </p>
      
      <div className="grid gap-4">
        {[
          { q: "Ask about diversity initiatives", a: "If they stumble or say 'we hire based on merit,' that's data." },
          { q: "Check their BEE report online", a: "Look for actual diversity metrics, not just tick-box exercises." },
          { q: "LinkedIn reconnaissance", a: "Do they post for Pride? Do any out queer people work there? (And are they in senior roles or just junior?)" }
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4 items-start">
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 text-xs font-bold text-slate-600 mt-0.5">
              {i + 1}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">{item.q}</h4>
              <p className="text-sm text-slate-600">{item.a}</p>
            </div>
          </div>
        ))}
      </div>

      <QuoteBlock context="Corporate worker, Durban">
        I asked 'What's the culture like for diverse employees?' and the interviewer said 'Oh, we don't see color or orientation here.' That was my red flag. Erasure isn't safety.
      </QuoteBlock>
    </ContentBlock>

    <ContentBlock title="Medical Aid & Your Partner" className="bg-emerald-50/30 border-emerald-100">
      <p className="mb-6">
        Under SA law, your same-sex partner has the same medical aid rights as a straight spouse. But you might need to fight for it.
      </p>
      
      <div className="space-y-4">
        <div className="p-6 rounded-2xl bg-white border border-emerald-100">
          <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
            <ShieldCheck size={18} /> Your Rights Are Real
          </h4>
          <p className="text-sm text-slate-700 mb-3">
            Discovery, Bonitas, and GEMS all recognize same-sex partnerships. If HR pushes back, cite the <strong>Medical Schemes Act</strong>—they're violating it.
          </p>
          <p className="text-xs text-slate-500">
            Tip: Keep records. If they deny your partner coverage, that's discrimination grounds.
          </p>
        </div>
      </div>
    </ContentBlock>

    <ContentBlock title="When to Stay 'Closeted' at Work" className="bg-rose-50/30 border-rose-100">
      <p className="text-slate-700 mb-4">
        Sometimes the professional closet is the smartest room in the building. Protect yourself if:
      </p>
      <ul className="space-y-3">
        <li className="flex items-start gap-3 text-slate-700">
          <span className="text-rose-400 mt-1.5">•</span>
          You're in a contract period and can be let go "without cause"
        </li>
        <li className="flex items-start gap-3 text-slate-700">
          <span className="text-rose-400 mt-1.5">•</span>
          Your direct supervisor has made 'jokes' that made you uncomfortable
        </li>
        <li className="flex items-start gap-3 text-slate-700">
          <span className="text-rose-400 mt-1.5">•</span>
          You simply don't have the energy to educate coworkers today (or ever)
        </li>
      </ul>
      <p className="mt-6 text-slate-600 italic">
        You're not "living a lie." You're drawing a healthy boundary between your labor and your life.
      </p>
    </ContentBlock>
  </GuideContainer>
);

// --- [ 3. DIGITAL SAFETY ] ---

export const DigitalSafetyGuide = ({ onBack }) => (
  <GuideContainer 
    title="Digital Borders" 
    subtitle="Privacy isn't paranoia when your safety depends on it. Here's how to exist online without leaving traces that can hurt you."
    icon={Lock}
    colorClass="bg-purple-50 text-purple-600"
    onBack={onBack}
  >
    <div className="mb-12 p-6 rounded-3xl bg-purple-900 text-white">
      <p className="text-lg font-medium leading-relaxed">
        "But I have nothing to hide" is a privilege. When your existence is contested, privacy is survival. 
        <span className="block mt-2 text-purple-200">
          Checking your phone over your shoulder isn't paranoia. It's adaptation.
        </span>
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8 mb-8">
      <div className="p-8 rounded-[3rem] bg-slate-900 text-white flex flex-col justify-between border border-purple-500/20">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
            <EyeOff size={24} className="text-purple-400" />
          </div>
          <h4 className="text-2xl font-black italic mb-4">The 'Calculator' Vault</h4>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Apps like Calculator+ or LockMyPix look like utilities but hide photos, documents, and chats behind a functional calculator interface.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200">
          <strong>Pro tip:</strong> Use a numeric PIN for your phone, not FaceID/TouchID. You can't be forced to type a PIN as easily as someone can hold your phone to your face while you sleep.
        </div>
      </div>
      
      <div className="p-8 rounded-[3rem] bg-purple-50 border border-purple-100 flex flex-col justify-between">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-purple-200 flex items-center justify-center mb-6">
            <Phone size={24} className="text-purple-700" />
          </div>
          <h4 className="text-2xl font-black italic mb-4 text-slate-900">Separate Numbers</h4>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            For dating apps or community groups, use a VOIP number (Google Voice, Skype, or a cheap prepaid SIM). Keep your real number for people you trust.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-purple-100 text-xs text-slate-600">
          <strong>Safety note:</strong> When meeting someone new, never share your workplace or home address. Meet in public, and tell a friend where you're going.
        </div>
      </div>
    </div>

    <ContentBlock title="Social Media Hygiene">
      <p className="mb-6">
        Your digital footprint can out you before you speak. Regular audits keep you safe:
      </p>
      
      <div className="space-y-4">
        {[
          { icon: Lock, title: "Separate Accounts", desc: "Have a 'family safe' account and a real one. It's not duplicitous; it's compartmentalization for safety." },
          { icon: EyeOff, title: "Check Tagged Photos", desc: "Friends might tag you at Pride or with a partner. Set tags to require approval, and regularly search your name." },
          { icon: MapPin, title: "Location Off", desc: "Turn off location services for camera apps. Photos contain metadata that can reveal exactly where you took them." }
        ].map((item, i) => (
          <div key={i} className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <item.icon className="text-purple-500 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </ContentBlock>

    <div className="p-8 rounded-[3rem] bg-gradient-to-br from-purple-100 to-pink-50 border border-purple-200">
      <h4 className="font-black text-xl mb-4 text-purple-900 flex items-center gap-3">
        <HeartHandshake size={24} /> If You're Outed Online
      </h4>
      <p className="text-slate-700 font-medium mb-4">
        If someone posts your private info or outs you without consent, they're violating the <strong>Protection of Personal Information Act (PoPIA)</strong>. You can report it.
      </p>
      <div className="flex flex-wrap gap-3">
        <a href="https://inforegulator.org.za/popia/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-purple-700 transition-colors">
          File a Report <ExternalLink size={14} />
        </a>
        <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-purple-700 font-bold text-xs uppercase tracking-wider border border-purple-200">
          Screenshot everything first
        </span>
      </div>
    </div>
  </GuideContainer>
);

// --- [ 4. EXIT STRATEGY ] ---

export const ExitStrategyGuide = ({ onBack }) => (
  <GuideContainer 
    title="Leaving Unsafe Homes" 
    subtitle="You deserve a home where you don't have to hide. Getting there is scary, but you don't have to figure it out alone."
    icon={Home}
    colorClass="bg-orange-50 text-orange-600"
    onBack={onBack}
  >
    <div className="mb-12 text-slate-600 font-medium leading-relaxed space-y-4">
      <p>
        Whether it's a family home that turned violent, a relationship that went toxic, or a living situation that became unbearable—<strong>leaving is an act of survival, not abandonment.</strong>
      </p>
      <p>
        You don't need to have everything figured out. You just need to get to safety. The rest can wait.
      </p>
    </div>

    <ContentBlock title="The Quiet Preparation" className="bg-orange-50/30 border-orange-100">
      <p className="mb-6">
        If you can, plan your exit when emotions aren't running high. The goal is to leave when they're not home, or when you have the maximum head start.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: Package, title: "The Essentials", items: ["ID & birth certificate", "Passport if you have one", "Bank cards & some cash", "Phone charger & powerbank", "3 months of medication if applicable"] },
          { icon: Heart, title: "The Sentimentals", items: ["Photos that can't be replaced", "A comforting object", "Important contacts written down (not just in phone)", "A change of clothes"] }
        ].map((section, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white border border-orange-100 shadow-sm">
            <section.icon className="text-orange-500 mb-3" size={24} />
            <h4 className="font-black text-slate-900 mb-3">{section.title}</h4>
            <ul className="space-y-2">
              {section.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-orange-300 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 p-6 rounded-2xl bg-amber-100/50 border border-amber-200 text-amber-900 text-sm font-medium">
        <AlertTriangle className="inline mr-2" size={16} />
        <strong>Safety first:</strong> If you fear violence, don't pack while they're home. Leave the non-essentials. Things can be replaced. You can't.
      </div>
    </ContentBlock>

    <ContentBlock title="Where to Go" variant="dark">
      <p className="text-slate-300 mb-8">
        Shelters aren't "last resorts"—they're bridges to safety. Using one is smart, not shameful.
      </p>
      
      <div className="space-y-4">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="font-black text-white text-lg mb-1">Pride Shelter Trust</h4>
            <p className="text-slate-400 text-sm mb-2">Cape Town • 021 012 5014</p>
            <p className="text-slate-500 text-sm">
              Africa's first formal LGBTQ+ shelter. Safe beds, meals, and holistic support services. They understand family rejection.
            </p>
          </div>
          <a href="tel:0210125014" className="flex-shrink-0 px-6 py-3 rounded-full bg-orange-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors flex items-center gap-2">
            <Phone size={14} /> Call Now
          </a>
        </div>

        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="font-black text-white text-lg mb-1">OUT LGBT Well-being</h4>
            <p className="text-slate-400 text-sm mb-2">Pretoria • 012 430 3272</p>
            <p className="text-slate-500 text-sm">
              Crisis intervention, legal protection from domestic violence, and referrals to safe housing networks in Gauteng.
            </p>
          </div>
          <a href="tel:0124303272" className="flex-shrink-0 px-6 py-3 rounded-full bg-orange-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors flex items-center gap-2">
            <Phone size={14} /> Call Now
          </a>
        </div>

        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
          <h4 className="font-black text-white text-lg mb-1">Friends of the Family</h4>
          <p className="text-slate-400 text-sm mb-2">Johannesburg</p>
          <p className="text-slate-500 text-sm">
            Support for LGBTQIA+ youth experiencing homelessness. They also help with family mediation if safe and desired.
          </p>
        </div>
      </div>
    </ContentBlock>

    <ContentBlock title="The First 48 Hours" className="bg-slate-50 border-slate-200">
      <p className="mb-6">
        Once you're out, the adrenaline will crash. You'll feel exhausted, terrified, maybe guilty. That's normal.
      </p>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
          <div>
            <h4 className="font-bold text-slate-900">Get to safety first</h4>
            <p className="text-sm text-slate-600">Even if it's just a 24-hour McDonald's with WiFi while you figure out the next step. Safe and Comfortable.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
          <div>
            <h4 className="font-bold text-slate-900">Change your passwords</h4>
            <p className="text-sm text-slate-600">Immediately. All of them. Especially iCloud/Google if family had any access.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="	w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
          <div>
            <h4 className="font-bold text-slate-900">Notify one safe person</h4>
            <p className="text-sm text-slate-600">Let someone know you're safe. You don't have to explain, just confirm.</p>
          </div>
        </div>
      </div>

      <QuoteBlock context="Former shelter resident, now social worker">
        When I left, I felt like I was destroying my family. Three years later, I realize I was saving myself. That wasn't selfish—that was survival.
      </QuoteBlock>
    </ContentBlock>

    <div className="mt-12 p-8 rounded-[3rem] bg-gradient-to-br from-orange-100 to-amber-50 border border-orange-200 text-center">
      <HeartHandshake className="mx-auto text-orange-500 mb-4" size={48} />
      <h3 className="text-2xl font-black text-slate-900 mb-3">You Don't Have to Do This Alone</h3>
      <p className="text-slate-700 font-medium max-w-xl mx-auto mb-6">
        If you're in immediate danger: <strong>Call 079 297 7434 (Triangle Project Crisis Line)</strong> or <strong>0860 123 456 (Lifeline)</strong>.
      </p>
      <p className="text-sm text-slate-600">
        Shelters have waiting lists, but they also have emergency provisions. Call even if you think they're full.
      </p>
    </div>
  </GuideContainer>
);

// --- [ MAIN SWITCHER COMPONENT ] ---

export default function AdditionalGuides() {
  const [currentGuide, setCurrentGuide] = useState('menu');

  const handleBack = () => setCurrentGuide('menu');

  const renderGuide = () => {
    switch(currentGuide) {
      case 'money': return <QueerMoneyGuide onBack={handleBack} />;
      case 'work': return <WorkplaceGuide onBack={handleBack} />;
      case 'safety': return <DigitalSafetyGuide onBack={handleBack} />;
      case 'exit': return <ExitStrategyGuide onBack={handleBack} />;
      default: return (
        <div className="min-h-screen pt-32 pb-32 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold uppercase text-[11px] tracking-widest mb-12 transition-all group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Guides
            </button>

            <header className="mb-16">
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[0.95] mb-6">
                Living in the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Real World.</span>
              </h1>
              <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">
                Practical guides for navigating systems that weren't built for us—money, work, privacy, and finding safe housing.
              </p>
            </header>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { id: 'money', title: 'Queer Money', desc: 'Financial privacy & safety funds', icon: Wallet, color: 'bg-emerald-50 text-emerald-600 hover:border-emerald-200' },
                { id: 'work', title: 'The Workplace', desc: 'Navigating corporate SA', icon: Briefcase, color: 'bg-slate-50 text-slate-600 hover:border-slate-300' },
                { id: 'safety', title: 'Digital Safety', desc: 'Privacy & online boundaries', icon: Lock, color: 'bg-purple-50 text-purple-600 hover:border-purple-200' },
                { id: 'exit', title: 'Leaving Home', desc: 'Exit strategies & shelters', icon: Home, color: 'bg-orange-50 text-orange-600 hover:border-orange-200' }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => setCurrentGuide(item.id)}
                  className={`p-8 rounded-[2.5rem] border-2 border-slate-100 transition-all flex flex-col items-start gap-4 group text-left hover:shadow-lg ${item.color}`}
                >
                  <div className="p-4 rounded-2xl bg-white shadow-sm group-hover:scale-110 transition-transform">
                    <item.icon size={32} />
                  </div>
                  <div>
                    <h3 className="font-black text-2xl text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 font-medium">{item.desc}</p>
                  </div>
                  <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Read Guide <ChevronRight size={14} />
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-20 p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-slate-600 font-medium italic">
                "Survival is a skill, but thriving is your birthright. These tools are temporary bridges to get you to safety."
              </p>
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