import React from 'react';
import { motion } from 'framer-motion';
import {
  Flame, Sparkles, HelpCircle, HandHeart, Ghost, Wind,
  Shield, Heart, Construction, ArrowLeft
} from 'lucide-react';
import { useLocale } from '../i18n';

const PulseComingSoon = ({ setPage }) => {
  const { t } = useLocale();

  const MOOD_FEATURES = [
    {
      icon: Flame,
      label: t('pulse.mood.rant'),
      desc: t('pulse.feature.rant'),
      color: 'bg-rose-50 text-rose-600',
      border: 'border-rose-100'
    },
    {
      icon: Sparkles,
      label: t('pulse.mood.celebrate'),
      desc: t('pulse.feature.celebrate'),
      color: 'bg-amber-50 text-amber-600',
      border: 'border-amber-100'
    },
    {
      icon: HelpCircle,
      label: t('pulse.mood.question'),
      desc: t('pulse.feature.question'),
      color: 'bg-indigo-50 text-indigo-600',
      border: 'border-indigo-100'
    },
    {
      icon: HandHeart,
      label: t('pulse.mood.support'),
      desc: t('pulse.feature.support'),
      color: 'bg-teal-50 text-teal-600',
      border: 'border-teal-100'
    }
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-32 px-4 md:px-6 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-40 left-10 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-600 font-bold text-xs uppercase tracking-wider mb-6"
          >
            <Construction size={14} /> {t('pulse.construction')}
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
            The <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-600">Pulse</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
            {t('pulse.tagline')}
          </p>
        </motion.div>

        {/* Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-sanctuary rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-indigo-100/50 mb-12 text-center"
        >
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart size={44} className="text-rose-400 fill-rose-100" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            {t('pulse.building')}
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-xl mx-auto mb-8">
            {t('pulse.buildingBody')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-50 border border-slate-100">
              <Ghost size={14} className="text-slate-500" /> {t('pulse.anonByDefault')}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-50 border border-slate-100">
              <Shield size={14} className="text-emerald-500" /> {t('pulse.communityModerated')}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-50 border border-slate-100">
              <Wind size={14} className="text-indigo-500" /> {t('pulse.postDeleteAnytime')}
            </span>
          </div>
        </motion.div>

        {/* What you will find here */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
              {t('pulse.comingTo')}
            </h2>
            <div className="h-1 w-12 bg-gradient-to-r from-rose-400 to-indigo-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {MOOD_FEATURES.map((feature, i) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className={`p-8 rounded-[2rem] bg-white border ${feature.border} shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-5`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{feature.label}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            {t('pulse.footerNote')}
          </p>
          <button
            onClick={() => setPage && setPage('home')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-900/20"
          >
            <ArrowLeft size={18} /> {t('pulse.backHome')}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PulseComingSoon;