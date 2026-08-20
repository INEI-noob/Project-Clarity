import React from 'react';
import { motion } from 'framer-motion';
import GuideFeedback from '../../components/GuideFeedback';
import { 
  ShieldAlert, 
  Lock, 
  Smartphone, 
  EyeOff, 
  Globe, 
  ArrowLeft, 
  Heart,
  Key,
  Trash2,
  HardDrive,
  MessageCircle,
  AlertCircle,
  Fingerprint,
  UserX
} from 'lucide-react';

/**
 * Digital Safety Guide - Protecting your peace in a surveilled world
 * Location: src/pages/DigitalSafetyGuide.jsx
 * Tone: Empowering, non-paranoid, trauma-informed, practically grounded
 */

const RiskCard = ({ title, description, level = "High" }) => (
  <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <h4 className="font-black text-lg text-slate-900">{title}</h4>
      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
        level === "Critical" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
      }`}>
        {level}
      </span>
    </div>
    <p className="text-slate-600 text-sm font-medium leading-relaxed">{description}</p>
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
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
        <Icon size={24} />
      </div>
      <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">{title}</h3>
    </div>
    {children}
  </motion.section>
);

const QuoteBlock = ({ children, author }) => (
  <div className="my-8 p-6 rounded-2xl bg-slate-50 border-l-4 border-indigo-400 italic text-slate-700 font-medium">
    "{children}"
    {author && <span className="block mt-3 text-sm text-slate-500 not-italic">— {author}</span>}
  </div>
);

const DigitalSafetyGuide = () => {
  return (
    <div className="min-h-screen pt-32 pb-32 px-6 bg-gradient-to-b from-white to-slate-50/30">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold uppercase text-[11px] tracking-widest mb-12 transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Guides
        </button>

        {/* Header */}
        <header className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-6 inline-block">
              Protecting Your Peace
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[0.95] mb-8">
              Your Phone Is Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Diary.</span>
            </h1>
            <div className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl space-y-6">
              <p>
                If someone picks up your phone right now, what would they find? In South Africa, where phones are shared, borrowed for "just a quick call," or sometimes taken and searched, guarding your digital space isn't about having "something to hide"—it's about having something to protect: <strong>your right to privacy, your safety, and your autonomy.</strong>
              </p>
              <p className="text-slate-500">
                This guide isn't about turning you into a spy. It's about basic hygiene—like locking your front door. Not because the world is evil, but because boundaries keep us safe.
              </p>
            </div>
          </motion.div>
        </header>

        {/* Validation Section */}
        <QuoteBlock author="Someone who learned the hard way">
          My mom went through my WhatsApp while I was showering. She saw a message from my boyfriend and everything exploded. I wish I'd known how to set up a guest profile. It would have saved me so much trauma.
        </QuoteBlock>

        {/* Risks - Reframed */}
        <ProtocolSection title="What We're Protecting Against" icon={ShieldAlert}>
          <p className="text-slate-600 font-medium mb-8 leading-relaxed">
            These aren't just "risks"—they're real scenarios that happen to queer South Africans regularly. Knowing them isn't paranoia; it's preparation.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <RiskCard 
              title="The Casual Phone Grab" 
              description="Family members 'borrowing' your phone to check Facebook, then clicking through your photos or WhatsApp. In shared-data households, this is incredibly common." 
              level="High"
            />
            <RiskCard 
              title="Location Trail" 
              description="Photos you send to friends contain GPS data that shows exactly where you were. If you're supposed to be 'at a friend's house' but the metadata says 'Cape Town Pride,' that's evidence." 
              level="Critical"
            />
            <RiskCard 
              title="The 'People You May Know' Trap" 
              description="Facebook/Instagram algorithms suggesting your alt account to your uncle because you both looked at the same meme page. Platform connections can out you before you speak." 
              level="High"
            />
            <RiskCard 
              title="Forced Unlocking" 
              description="Someone holding your fingerprint to the sensor while you sleep, or demanding your PIN through intimidation. Biometrics seem secure until they're used against you." 
              level="Critical"
            />
          </div>
        </ProtocolSection>

        {/* Browser Section - Warmer */}
        <ProtocolSection title="Separate Your Worlds" icon={Globe}>
          <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h4 className="text-2xl font-black mb-4 text-slate-900">The Browser Split</h4>
                <p className="text-slate-600 font-medium mb-6 leading-relaxed">
                  Think of it like having two phones, but cheaper. One browser for the life you share with family (school, work, news), one for the life you're exploring (community, dating, support groups).
                </p>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-2">Public Browser</p>
                    <p className="font-bold text-slate-900 text-sm">Chrome / Safari</p>
                    <p className="text-xs text-slate-500 mt-1">Default on your phone</p>
                  </div>
                  <div className="flex-1 p-4 bg-indigo-50 rounded-2xl text-center border border-indigo-100">
                    <p className="text-[10px] font-black uppercase text-indigo-600 mb-2">Private Browser</p>
                    <p className="font-bold text-indigo-700 text-sm">Firefox / Brave</p>
                    <p className="text-xs text-indigo-600/70 mt-1">With private mode always on</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 italic">
                  Keep the private browser hidden in a folder called "Utilities" or "Productivity"—not on your home screen.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 bg-slate-900 text-white rounded-[2.5rem]">
              <Trash2 className="text-rose-400 mb-4" size={28} />
              <h5 className="font-black text-xl mb-3">The Daily Clear</h5>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Make it a bedtime ritual: <span className="text-white font-mono bg-white/10 px-2 py-1 rounded">Ctrl+Shift+Delete</span> or the mobile equivalent. Not because you're ashamed, but because you don't leave your diary open on the kitchen table.
              </p>
              <p className="text-xs text-slate-500">
                Set a phone reminder for 11 PM: "Brush teeth, clear history, sleep safe."
              </p>
            </div>
            
            <div className="p-8 bg-purple-50 border border-purple-100 rounded-[2.5rem]">
              <EyeOff className="text-purple-600 mb-4" size={28} />
              <h5 className="font-black text-xl mb-3 text-slate-900">Search Without Tracking</h5>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Switch your default search to <span className="text-purple-700 font-bold">DuckDuckGo</span>. It doesn't save your searches or follow you around the internet with ads for things you looked up once.
              </p>
              <div className="p-3 bg-white rounded-xl border border-purple-100">
                <p className="text-xs text-slate-500">
                  <strong>Why this matters:</strong> Targeted ads for PrEP or LGBTQ+ events can show up as notifications at the wrong moment.
                </p>
              </div>
            </div>
          </div>
        </ProtocolSection>

        {/* WhatsApp Section - CRITICAL for SA */}
        <ProtocolSection title="WhatsApp is Your Living Room" icon={MessageCircle}>
          <div className="prose prose-lg text-slate-600 font-medium leading-relaxed mb-8">
            <p>
              In South Africa, WhatsApp isn't just an app—it's infrastructure. Family groups, work chats, community organizing all happen here. But it's also the first place people look when they want to "catch you."
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-[3rem] p-8 md:p-12">
            <h4 className="text-2xl font-black mb-6 text-amber-900 flex items-center gap-3">
              <AlertCircle size={24} /> Lock It Down
            </h4>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">1</div>
                <div>
                  <h5 className="font-bold text-amber-900 mb-1">Fingerprint Lock</h5>
                  <p className="text-amber-900/70 text-sm leading-relaxed">
                    Go to WhatsApp Settings → Privacy → Fingerprint Lock. Turn it on. Now even if someone has your phone, they need your finger to open your messages. <strong>This is non-negotiable if you share a phone or have nosy family.</strong>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">2</div>
                <div>
                  <h5 className="font-bold text-amber-900 mb-1">Disable Message Previews</h5>
                  <p className="text-amber-900/70 text-sm leading-relaxed">
                    When your phone is face-up on the table, anyone can see message contents. Turn off previews so it just says "WhatsApp Message" without showing the text from your partner.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">3</div>
                <div>
                  <h5 className="font-bold text-amber-900 mb-1">Archive, Don't Delete</h5>
                  <p className="text-amber-900/70 text-sm leading-relaxed">
                    Deleting chats looks suspicious. Archiving hides them from the main list but keeps them accessible. Long press a chat → Archive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ProtocolSection>

        {/* Device Security - Less Spy, More Safety */}
        <ProtocolSection title="Locking The Device Itself" icon={Smartphone}>
          <div className="bg-indigo-600 rounded-[3rem] p-8 md:p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10">
              <h4 className="text-3xl font-black mb-6 italic tracking-tight">Choose PIN Over Fingerprints</h4>
              
              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Fingerprint size={24} className="text-indigo-200" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">The Problem with Biometrics</h5>
                    <p className="text-indigo-100 text-sm leading-relaxed">
                      If you're asleep, distracted, or coerced, someone can use your finger to unlock your phone. They cannot force you to remember a PIN that exists only in your head.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Lock size={24} className="text-indigo-200" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">The Alphanumeric PIN</h5>
                    <p className="text-indigo-100 text-sm leading-relaxed">
                      Use letters AND numbers (like "M0mmyS4ysN0"). It's a pain to type every time, but it's nearly impossible to guess or force.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <UserX size={24} className="text-indigo-200" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">The Second Space (Android)</h5>
                    <p className="text-indigo-100 text-sm leading-relaxed">
                      Many Android phones have a "Second User" or "Guest Profile." It's like having two phones in one. Switch to the guest profile when you hand your phone to someone else.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/20">
                <p className="text-sm text-indigo-200 italic">
                  <strong>Remember:</strong> If you live with people who routinely take your phone without permission, that's a violation of your boundaries, not a sign you need to hide better.
                </p>
              </div>
            </div>
          </div>
        </ProtocolSection>

        {/* Emergency Section - Less Spy Movie */}
        <div className="mt-20 p-8 md:p-12 rounded-[3rem] bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-rose-50 text-rose-600">
              <Key size={24} />
            </div>
            <h3 className="text-3xl font-black tracking-tight text-slate-900">If Things Go Sideways</h3>
          </div>
          
          <p className="text-slate-600 font-medium mb-10 leading-relaxed">
            Sometimes, despite precautions, someone demands your phone or takes it forcefully. Here's how to minimize damage in the moment:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
              <h5 className="font-black mb-3 text-slate-900 flex items-center gap-2">
                <HardDrive size={18} className="text-indigo-500" /> 
                Remote Wipe Setup
              </h5>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Set up Google Find My Device or Apple Find My <strong>now</strong>, when you're calm. If your phone is taken, you can factory reset it from another computer.
              </p>
              <p className="text-xs text-slate-500">
                It's a nuclear option—you lose your photos—but it protects your contacts, chats, and location history.
              </p>
            </div>
            
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
              <h5 className="font-black mb-3 text-slate-900 flex items-center gap-2">
                <Heart size={18} className="text-rose-500" /> 
                The Cover Story
              </h5>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Keep a pre-written "excuse" note in your phone's Notes app: "My phone has been glitching and showing old notifications, ignore anything weird."
              </p>
              <p className="text-xs text-slate-500">
                Survival lies are valid when your safety is at risk. You don't owe anyone your truth in a dangerous moment.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-rose-50 border border-rose-100 flex gap-4 items-start">
            <div className="p-2 bg-rose-100 rounded-lg flex-shrink-0">
              <AlertCircle className="text-rose-600" size={20} />
            </div>
            <div>
              <h5 className="font-bold text-rose-900 mb-1">If you're being digitally stalked or harassed</h5>
              <p className="text-sm text-rose-800/80">
                This is a violation of the <strong>Protection of Personal Information Act (PoPIA)</strong> and potentially the <strong>Protection from Harassment Act</strong>. Save screenshots (email them to yourself), note times/dates, and contact the <a href="https://triangle.org.za" target="_blank" rel="noreferrer" className="underline font-bold">Triangle Project</a> or <a href="https://www.out.org.za" target="_blank" rel="noreferrer" className="underline font-bold">OUT Well-being</a> for legal support.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Affirmation */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center p-12 rounded-[3rem] bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100"
        >
          <Heart className="mx-auto text-indigo-400 mb-6" size={48} />
          <h3 className="text-2xl font-black text-slate-900 mb-4">You're Not Being Paranoid</h3>
          <p className="text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed">
            If you have to check over your shoulder before opening an app, if your heart races when someone picks up your phone, if you feel like you're living a double life online—<strong>that's not drama, that's survival stress.</strong> These tools help, but remember: the ultimate goal is a life where you don't need to hide. Until then, protect your peace fiercely.
          </p>
        </motion.div>

        <GuideFeedback guideId="digital-safety" guideTitle="Digital Safety" />
      </div>
    </div>
  );
};

export default DigitalSafetyGuide;