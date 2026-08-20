import React from 'react';
import { motion } from 'framer-motion';

const BLOCK_TONES = {
  indigo: { primary: 'bg-indigo-200/30', secondary: 'bg-purple-200/25' },
  rose: { primary: 'bg-rose-200/30', secondary: 'bg-indigo-200/25' },
  amber: { primary: 'bg-amber-200/30', secondary: 'bg-indigo-200/25' },
  teal: { primary: 'bg-teal-200/30', secondary: 'bg-indigo-200/25' },
  slate: { primary: 'bg-slate-200/30', secondary: 'bg-purple-200/25' },
};

const PageShell = ({ children, maxWidth = 'max-w-5xl', tone = 'indigo', className = '' }) => {
  const colors = BLOCK_TONES[tone] || BLOCK_TONES.indigo;

  return (
    <div className={`relative min-h-screen pt-32 pb-32 px-4 md:px-6 overflow-hidden ${className}`}>
      {/* Themed ambient blobs - let the aurora background breathe through */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className={`absolute top-40 left-10 w-96 h-96 ${colors.primary} rounded-full blur-3xl`}
        />
        <motion.div
          animate={{ y: [0, 30, 0], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className={`absolute bottom-40 right-10 w-[500px] h-[500px] ${colors.secondary} rounded-full blur-3xl`}
        />
      </div>

      <div className={`${maxWidth} mx-auto relative z-10`}>{children}</div>
    </div>
  );
};

export default PageShell;