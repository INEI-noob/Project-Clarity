// src/pages/NotFoundPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Wind, ArrowLeft } from 'lucide-react';
import { useLocale } from '../i18n';

const NotFoundPage = ({ setPage }) => {
  const { t } = useLocale();
  return (
  <div className="min-h-screen flex items-center justify-center px-6 pt-32 pb-32">
    <div className="text-center max-w-md">
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-indigo-100 to-rose-100 flex items-center justify-center"
      >
        <Wind size={40} className="text-indigo-400" />
      </motion.div>
      <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-700 mb-4">{t('notFound.title')}</h2>
      <p className="text-slate-500 mb-8 leading-relaxed">
        {t('notFound.body')}
      </p>
      <button 
        onClick={() => setPage('home')}
        className="btn-primary inline-flex items-center gap-2"
      >
        <ArrowLeft size={18} /> {t('notFound.home')}
      </button>
    </div>
  </div>
  );
};

export default NotFoundPage;