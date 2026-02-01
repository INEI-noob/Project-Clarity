import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  ShieldCheck, 
  AlertCircle, 
  MessageCircle, 
  ArrowLeft, 
  Sparkles,
  Zap,
  Phone,
  Compass,
  Lock
} from 'lucide-react';

/**
 * PROJECT SAPPHIRE - RELATIONSHIPS & DATING GUIDE
 * Location: src/pages/RelationshipsGuide.jsx
 */

const FlagCard = ({ type, title, items }) => (
  <div className={`p-8 rounded-[2.5rem] ${type === 'green' ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'} border shadow-sm`}>
    <h4 className={`text-xl font-black mb-6 italic flex items-center gap-2 ${type === 'green' ? 'text-emerald-600' : 'text-rose-600'}`}>
      {type === 'green' ? <Sparkles size={20} /> : <AlertCircle size={20} />}
      {title}
    </h4>
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className={`text-sm font-medium ${type === 'green' ? 'text-emerald-800/70' : 'text-rose-800/70'} flex gap-3`}>
          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${type === 'green' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const Section = ({ title, icon: Icon, children, color = "rose" }) => (
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

const RelationshipsGuide = ({ onBack }) => {
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
              Connection
            </span>
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-slate-900 leading-[0.85] mb-8">
              Queer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-400 to-purple-500">Love.</span>
            </h1>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl italic">
              "Queer dating is beautiful, complicated, and often terrifying. Let's navigate it together."
            </p>
          </motion.div>
        </header>

        {/* Foundations */}
        <Section title="Before the Swiping" icon={Compass} color="amber">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-10 rounded-[3rem] bg-amber-50 border border-amber-100">
               <h4 className="font-black text-xl text-amber-900 mb-4 italic">Know Your "Why"</h4>
               <p className="text-amber-800/70 text-sm font-medium leading-relaxed">
                 Are you exploring? Lonely? Seeking validation? All are valid, but being honest with yourself (and them) prevents collateral damage.
               </p>
            </div>
            <div className="p-10 rounded-[3rem] bg-slate-900 text-white flex flex-col justify-center">
               <h4 className="font-black text-xl mb-4 italic text-amber-300">Hard Limits</h4>
               <p className="text-slate-400 text-sm font-medium leading-relaxed">
                 Define your boundaries early: Age gaps, monogamy vs polyamory, and your emotional bandwidth.
               </p>
            </div>
          </div>
        </Section>

        {/* Safety Protocol */}
        <Section title="Safety Protocol" icon={ShieldCheck} color="indigo">
          <div className="p-12 rounded-[3.5rem] bg-indigo-900 text-white relative overflow-hidden mb-8">
            <Lock className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10" />
            <div className="relative z-10 grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-2xl font-black mb-6 italic underline decoration-indigo-400 underline-offset-8">The "Real" Check</h4>
                <ul className="space-y-4 text-sm font-medium text-indigo-200">
                  <li className="flex gap-3">Video chat before meeting in person.</li>
                  <li className="flex gap-3">Reverse image search their profile photos.</li>
                  <li className="flex gap-3">Check for a social media history (avoid blank accounts).</li>
                </ul>
              </div>
              <div>
                <h4 className="text-2xl font-black mb-6 italic underline decoration-indigo-400 underline-offset-8">On the Date</h4>
                <ul className="space-y-4 text-sm font-medium text-indigo-200">
                  <li className="flex gap-3">Public places only. No "secluded spots."</li>
                  <li className="flex gap-3">Share your live location with a trusted friend.</li>
                  <li className="flex gap-3">Have a "get me out" code word ready.</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Green vs Red Flags */}
        <Section title="Flag Spotting" icon={Zap} color="emerald">
          <div className="grid md:grid-cols-2 gap-8">
            <FlagCard 
              type="green"
              title="Green Flags"
              items={[
                "Asks about boundaries before assuming",
                "Respects your 'no' without pouting",
                "Has queer friends (not just romantic interests)",
                "Is open about their coming-out status"
              ]}
            />
            <FlagCard 
              type="red"
              title="Red Flags"
              items={[
                "Secretive about basic life details",
                "All their exes are 'crazy'",
                "Guilts you for your level of closetedness",
                "Moving too fast (Love Bombing)"
              ]}
            />
          </div>
        </Section>

        {/* Queer Conversations */}
        <Section title="The Conversations" icon={MessageCircle} color="purple">
          <div className="space-y-6">
            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:border-purple-200 transition-colors">
              <h5 className="font-black text-lg mb-2 italic">Safer Sex & Genitals</h5>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Different configurations = different risks. Discuss PrEP, dental dams, and toys before things get heated.
              </p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:border-purple-200 transition-colors">
              <h5 className="font-black text-lg mb-2 italic">Gender Affirmation</h5>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                "What pronouns do we use in public?" "Are there specific areas of your body that trigger dysphoria?"
              </p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:border-purple-200 transition-colors">
              <h5 className="font-black text-lg mb-2 italic">Community Etiquette</h5>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                The queer community is small. Be transparent about mutual exes to prevent unnecessary drama later.
              </p>
            </div>
          </div>
        </Section>

        {/* Heartbreak & Identity */}
        <div className="mt-32 p-12 rounded-[4rem] bg-rose-50 border-2 border-rose-100 text-center">
           <Heart className="text-rose-500 mx-auto mb-6" size={40} />
           <h3 className="text-4xl font-black italic tracking-tighter text-slate-900 mb-4">Queer Heartbreak</h3>
           <p className="text-slate-600 font-medium max-w-xl mx-auto leading-relaxed mb-8">
             Heartbreak in our community hits different. Because the pool is smaller, it can feel like you've lost your "only chance." 
             <span className="block mt-4 text-rose-600 font-black italic">It’s not true. Love is abundant. You are lovable.</span>
           </p>
           <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-white rounded-2xl font-black text-xs uppercase tracking-widest text-slate-900 shadow-sm">
                Relationship Resources
              </button>
           </div>
        </div>

        {/* Final Quote */}
        <div className="mt-32 text-center text-slate-400 italic font-medium px-8">
          "The right person won't make you choose between your safety and your authenticity."
        </div>
      </div>
    </div>
  );
};

export default RelationshipsGuide;