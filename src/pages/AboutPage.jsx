import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Users, Sparkles, Globe, Mail } from 'lucide-react';
import PageShell from '../components/layout/PageShell';
import { useLocale } from '../i18n';

const AboutPage = ({ setPage }) => {
  const { t } = useLocale();
  const values = [
    {
      icon: Shield,
      key: 'safety',
      title: "Safety First",
      desc: "Every space we create prioritizes physical and emotional safety. No exceptions.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Heart,
      key: 'acceptance',
      title: "Radical Acceptance",
      desc: "You are valid exactly as you are. No labels required, no boxes to check.",
      color: "bg-rose-50 text-rose-600"
    },
    {
      icon: Users,
      key: 'community',
      title: "Community Led",
      desc: "Built by the community, for the community. Peer support is our foundation.",
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      icon: Globe,
      key: 'accessibility',
      title: "Digital Accessibility",
      desc: "Reaching rural and remote areas through online spaces when physical isn't possible.",
      color: "bg-emerald-50 text-emerald-600"
    }
  ];

  const team = [
    { name: "Jade Oelofse", role: "Founder", pronouns: "she/her", color: "bg-indigo-100 text-indigo-600" },
    { name: "Samira Nkosi", role: "Community Lead", pronouns: "she/her", color: "bg-rose-100 text-rose-600" },
    { name: "Jordan Peters", role: "Safety Officer", pronouns: "he/him", color: "bg-cyan-100 text-cyan-600" }
  ];

  return (
    <PageShell maxWidth="max-w-4xl" tone="rose">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-wide uppercase mb-8"
          >
            <Sparkles size={16} /> {t('about.badge')}
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight">
            Our <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Sanctuary</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Project Clarity was born from a simple belief: everyone deserves a place to 
            discover themselves without fear. We're building that place, together.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white/60 backdrop-blur-xl border border-slate-100 rounded-[3rem] p-10 md:p-16 mb-24 text-center shadow-sm"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 rounded-t-full" />
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-8">{t('about.mission')}</h2>
          <p className="text-2xl md:text-3xl text-slate-800 leading-snug max-w-2xl mx-auto font-serif italic">
            "To create digital and physical sanctuaries where queer individuals can explore identity, 
            find community, and access life-saving resources."
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <value.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t(`about.value.${value.key}`)}</h3>
              <p className="text-slate-600 text-lg leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('about.careTeam')}</h2>
            <div className="h-1 w-12 bg-indigo-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-[2.5rem] bg-slate-50/50 border border-transparent hover:border-slate-200 transition-all"
              >
                <div className={`w-24 h-24 mx-auto mb-6 rounded-full ${member.color} flex items-center justify-center text-3xl font-bold shadow-inner`}>
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-1">{member.name}</h3>
                <p className="text-indigo-600 font-bold text-sm mb-2 tracking-wide uppercase">{member.role}</p>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{member.pronouns}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative text-center p-12 md:p-16 rounded-[3.5rem] bg-slate-900 text-white overflow-hidden shadow-2xl"
        >
          {/* Decorative light flare */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">{t('about.joinTitle')}</h3>
            <p className="text-slate-300 mb-10 text-lg max-w-lg mx-auto">
              {t('about.joinBody')}
            </p>
            <button onClick={() => setPage && setPage('contact')} className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all flex items-center gap-2 mx-auto active:scale-95 shadow-lg">
              {t('about.getInvolved')} <Mail size={20} />
            </button>
          </div>
        </motion.div>
    </PageShell>
  );
};

export default AboutPage;