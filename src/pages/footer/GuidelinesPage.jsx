import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  ShieldAlert, 
  Handshake, 
  Leaf, 
  MessageCircle, 
  UserCheck, 
  ShieldCheck,
  ZapOff,
  FlameKindling
} from 'lucide-react';
import PageShell from '../../components/layout/PageShell';

const GuidelinesPage = ({ setPage }) => {
  const pillars = [
    {
      icon: <Heart className="text-pink-500" />,
      title: "Radical Empathy",
      desc: "Assume good intent. We are all at different stages of our journeys. Speak with the kindness you would offer a younger version of yourself."
    },
    {
      icon: <UserCheck className="text-blue-500" />,
      title: "Respect Identity",
      desc: "Honor names, pronouns, and labels. We have zero tolerance for deadnaming, misgendering, or questioning the validity of anyone's lived experience."
    },
    {
      icon: <ShieldCheck className="text-emerald-500" />,
      title: "Protect Privacy",
      desc: "What stays here, stays here. Do not share others' stories, screenshots, or personal details outside this space without explicit consent."
    }
  ];

  const boundaries = [
    {
      title: "No Hate Speech",
      desc: "Any content that promotes violence, incites hatred, or demeans based on race, gender, orientation, or ability results in an immediate permanent ban.",
      icon: <ZapOff size={20} className="text-rose-500" />
    },
    {
      title: "No Unsolicited Advice",
      desc: "Sometimes people just need to be heard. Ask 'Are you looking for support or solutions?' before offering advice.",
      icon: <MessageCircle size={20} className="text-amber-500" />
    },
    {
      title: "Content Warnings",
      desc: "Use clear tags [CW] for sensitive topics like trauma or dysphoria to allow others to choose when they are ready to engage.",
      icon: <ShieldAlert size={20} className="text-purple-500" />
    }
  ];

  return (
    <PageShell maxWidth="max-w-4xl" tone="indigo">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs uppercase tracking-widest mb-6">
            <Handshake size={14} /> Our Shared Intent
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Community</span> Creed
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            This is a sanctuary for growth, exploration, and healing. By entering this space, you agree to uphold the following standards of care.
          </p>
        </motion.div>

        {/* Pillars of Culture */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
            >
              <div className="mb-4">{pillar.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{pillar.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Deep Dive: Boundaries */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-200 shadow-xl mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <FlameKindling className="text-orange-500" /> Protecting the Spark
          </h2>
          <div className="space-y-8">
            {boundaries.map((item, i) => (
              <div key={i} className="flex gap-6 items-start pb-8 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="p-3 bg-slate-50 rounded-xl">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reporting Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-indigo-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-md text-center md:text-left">
            <h3 className="text-2xl font-bold mb-3">See something? Say something.</h3>
            <p className="text-indigo-200">
              Our moderation team is here to keep you safe. If you feel uncomfortable or see a violation, report it immediately. Reports are anonymous.
            </p>
          </div>
          <button
            onClick={() => setPage && setPage('contact')}
            className="whitespace-nowrap px-8 py-4 bg-white text-indigo-900 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-lg"
          >
            Submit a Report
          </button>
        </motion.div>

        {/* Final Affirmation */}
        <div className="mt-16 text-center">
          <Leaf className="w-8 h-8 mx-auto text-emerald-500 mb-4" />
          <p className="text-slate-500 italic max-w-lg mx-auto">
            "Community is a practice. It is not something we 'have,' but something we do together every day."
          </p>
        </div>
    </PageShell>
  );
};

export default GuidelinesPage;