import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Leaf, 
  Flame, 
  ArrowLeft, 
  ShieldAlert, 
  Users, 
  Book, 
  Heart,
  Compass,
  MessageCircle
} from 'lucide-react';

/**
 * PROJECT SAPPHIRE - SPIRITUALITY & RELIGION GUIDE
 * Location: src/pages/SpiritualityGuide.jsx
 */

const TabButton = ({ active, onClick, label, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
      active 
        ? 'bg-slate-900 text-white shadow-xl scale-105' 
        : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

const SpiritualCard = ({ title, children, source, color = "amber" }) => (
  <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
    <h4 className={`font-black text-xl text-slate-900 mb-4 italic tracking-tighter`}>{title}</h4>
    <div className="text-slate-500 text-sm font-medium leading-relaxed space-y-4">
      {children}
    </div>
    {source && (
      <div className={`mt-6 pt-6 border-t border-slate-50 text-[10px] font-black uppercase tracking-widest text-${color}-600`}>
        Source: {source}
      </div>
    )}
  </div>
);

const SpiritualityGuide = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('christianity');

  const content = {
    christianity: {
      title: "Affirming Christianity",
      desc: "Faith doesn't have to mean exclusion. Progressive theology focuses on 'Side A'—full affirmation of queer identity.",
      cards: [
        {
          title: "SA Specific Context",
          body: "The Methodist Church of SA officially allowed same-sex marriage in 2020. Many Anglican parishes are also moving toward full inclusion.",
          source: "IAM (Inclusive & Affirming Ministries)"
        },
        {
          title: "Theology Check",
          body: "Matthew Vines and Rev. Dr. Cheryl Townsend offer frameworks for understanding the Bible through lenses of justice and love rather than 'sin'.",
          source: "God and the Gay Christian"
        }
      ]
    },
    islam: {
      title: "Progressive Islam",
      desc: "Allah created diversity (Surah 49:13). Queer Muslims reclaim their space through progressive interpretation.",
      cards: [
        {
          title: "Interpretations",
          body: "Progressive scholars argue the story of Lut is about rape and lack of hospitality, not consensual same-sex love.",
          source: "MPV (Muslims for Progressive Values)"
        },
        {
          title: "Community",
          body: "Cape Town is a hub for queer-affirming Muslim groups and progressive Iftars.",
          source: "Irshad Manji / Local Groups"
        }
      ]
    },
    traditional: {
      title: "Traditional African Spirituality",
      desc: "Before colonization, many African cultures recognized gender diversity. Ancestors want your wholeness.",
      cards: [
        {
          title: "Sangoma Lineage",
          body: "Sangomas and traditional healers often acknowledge same-sex attraction as part of one's calling and ancestral guidance.",
          source: "Indigenous Knowledge Systems"
        },
        {
          title: "Genealogy vs Spirit",
          body: "Lineage isn't just about genes; it's about spirit. Your ancestors aren't 'broken' by your identity; they are part of it.",
          source: "Traditional Advocacy"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen pt-40 pb-32 px-6 bg-slate-50/20">
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
            <span className="px-4 py-2 rounded-full bg-amber-50 text-amber-600 font-black text-[10px] uppercase tracking-widest mb-6 inline-block">
              Soul & Spirit
            </span>
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-slate-900 leading-[0.85] mb-8">
              Divine <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600">Wholeness.</span>
            </h1>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl italic">
              "I realized God, if real, would rather have me whole and happy than broken and church-going."
            </p>
          </motion.div>
        </header>

        {/* The Wound Section */}
        <section className="mb-32 p-12 rounded-[4rem] bg-rose-900 text-white relative overflow-hidden">
          <ShieldAlert className="absolute -bottom-10 -left-10 w-64 h-64 opacity-10" />
          <div className="relative z-10">
            <h3 className="text-4xl font-black mb-8 italic text-rose-200">The Spiritual Wound</h3>
            <p className="text-rose-100 text-lg font-medium leading-relaxed mb-8 max-w-2xl">
              Many of us were raised in faiths that taught us we were broken. This is <span className="text-white font-black underline decoration-rose-400 underline-offset-4">spiritual abuse</span>. It's not true, and it's not your fault.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {['Question what you were taught', 'Grieve the lost safety', 'Rebuild your own values', 'Find a new circle'].map((step, i) => (
                 <div key={i} className="flex gap-4 items-center p-4 bg-white/10 rounded-2xl border border-white/10">
                    <span className="font-black text-rose-300">0{i+1}</span>
                    <span className="text-sm font-bold uppercase tracking-widest">{step}</span>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Faith Reclaiming Toggle */}
        <section className="mb-32">
          <div className="flex flex-wrap gap-4 mb-12">
            <TabButton 
              active={activeTab === 'christianity'} 
              onClick={() => setActiveTab('christianity')} 
              label="Christianity" 
              icon={Book}
            />
            <TabButton 
              active={activeTab === 'islam'} 
              onClick={() => setActiveTab('islam')} 
              label="Islam" 
              icon={Moon}
            />
            <TabButton 
              active={activeTab === 'traditional'} 
              onClick={() => setActiveTab('traditional')} 
              label="Traditional" 
              icon={Flame}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="mb-12">
                <h3 className="text-5xl font-black italic text-slate-900 tracking-tighter mb-4">{content[activeTab].title}</h3>
                <p className="text-xl text-slate-500 font-medium max-w-2xl">{content[activeTab].desc}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {content[activeTab].cards.map((card, i) => (
                  <SpiritualCard key={i} title={card.title} source={card.source}>
                    <p>{card.body}</p>
                  </SpiritualCard>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Defense & Boundaries */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <MessageCircle className="text-indigo-600" size={32} />
            <h3 className="text-4xl font-black italic tracking-tighter text-slate-900">Setting Boundaries</h3>
          </div>

          <div className="space-y-6">
             <div className="p-10 rounded-[3rem] bg-white border border-slate-100 flex gap-8 items-start">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                   <Users size={24} />
                </div>
                <div>
                   <h5 className="font-black text-xl mb-2">When family uses religion...</h5>
                   <p className="text-slate-500 font-medium leading-relaxed mb-4">"We can disagree on theology, but you cannot use my identity as a weapon. If you can't respect my humanity, we can't have this relationship."</p>
                </div>
             </div>

             <div className="p-10 rounded-[3rem] bg-slate-900 text-white flex gap-8 items-start">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-amber-300 flex items-center justify-center flex-shrink-0">
                   <Sun size={24} />
                </div>
                <div>
                   <h5 className="font-black text-xl mb-2 italic">Secular Spirituality</h5>
                   <p className="text-slate-400 font-medium leading-relaxed">You don't need religion to be spiritual. Meditation, nature connection, and ethics based on consent and care are just as sacred.</p>
                </div>
             </div>
          </div>
        </section>

        {/* Resources Footer */}
        <div className="p-12 rounded-[4rem] bg-amber-50 border-2 border-amber-100 flex flex-col md:flex-row items-center gap-12">
           <Compass size={64} className="text-amber-500 opacity-50" />
           <div>
              <h4 className="text-2xl font-black mb-4 italic">Spiritual Support</h4>
              <div className="flex flex-wrap gap-4">
                 {['iam.org.za', 'mpvusa.org', 'Q Christian Fellowship'].map(link => (
                    <div key={link} className="px-4 py-2 bg-white rounded-xl text-[10px] font-black uppercase tracking-widest text-amber-700 shadow-sm border border-amber-100">
                       {link}
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Final Quote */}
        <div className="mt-32 text-center text-slate-400 italic font-medium max-w-2xl mx-auto">
          "Your queerness is not a test from God. It's part of the diversity of creation."
        </div>
      </div>
    </div>
  );
};

export default SpiritualityGuide;