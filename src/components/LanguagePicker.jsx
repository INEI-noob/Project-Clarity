import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { LOCALES, useLocale } from '../i18n';

/**
 * Floating LanguagePicker — always visible on every page/module.
 * Lives bottom-right, opposite the Quick Exit button (bottom-left).
 */
const LanguagePicker = () => {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();
  const panelRef = useRef(null);

  const currentLocale = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const select = (code) => {
    setLocale(code);
    setOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="fixed bottom-8 right-4 md:right-8 z-[170]"
      ref={panelRef}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t('nav.language')}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`
          flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold shadow-lg backdrop-blur-xl transition-colors
          ${open ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-white/90 text-indigo-600 border border-indigo-100 shadow-indigo-100/50 hover:bg-indigo-50'}
        `}
      >
        <Globe size={16} />
        <span className="hidden sm:inline">{currentLocale.nativeName}</span>
        <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full right-0 mb-2 w-64 max-h-[70vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-100 p-2"
            role="listbox"
            aria-label={t('nav.language')}
          >
            <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {t('nav.language')}
            </p>
            {LOCALES.map((l) => (
              <button
                key={l.code}
                role="option"
                aria-selected={l.code === locale}
                onClick={() => select(l.code)}
                className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl text-left text-sm font-semibold transition-colors ${
                  l.code === locale ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">{l.nativeName}</span>
                  <span className="text-slate-400">·</span>
                  <span>{l.name}</span>
                </span>
                {l.code === locale && <Check size={15} className="text-indigo-600 shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LanguagePicker;