import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeOff, LogOut, ShieldCheck, Sparkles, X } from 'lucide-react';
import { useLocale } from '../i18n';

const KEY = 'clarity_welcomed';

const WelcomeOverlay = () => {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();
  const exitBody = t('welcome.exitBody').split('{esc}');

  useEffect(() => {
    let welcomed = false;
    try {
      welcomed = window.localStorage.getItem(KEY) === '1';
    } catch {
      welcomed = false;
    }
    if (welcomed) return;
    const t = setTimeout(() => setOpen(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(KEY, '1');
    } catch {
      // storage unavailable — just hide for this visit
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to Sanctuary"
        >
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            onClick={dismiss}
            aria-hidden="true"
          />
          <motion.div
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            className="relative bg-white rounded-[2.5rem] p-8 md:p-10 max-w-lg w-full shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-br from-indigo-100/60 to-rose-100/60 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={dismiss}
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
              aria-label="Close welcome message"
            >
              <X size={18} />
            </button>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-rose-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-200">
                <Sparkles size={26} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                {t('welcome.title')}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                {t('welcome.intro')}
              </p>

              <ul className="space-y-5 mb-8">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 text-slate-500">
                    <EyeOff size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t('welcome.anonTitle')}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {t('welcome.anonBody')}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 text-slate-500">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t('welcome.privacyTitle')}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {t('welcome.privacyBody')}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 text-slate-500">
                    <LogOut size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t('welcome.exitTitle')}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {exitBody[0]}
                      <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-xs">Esc</kbd>
                      {exitBody[1]}
                    </p>
                  </div>
                </li>
              </ul>

              <button
                onClick={dismiss}
                className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors"
              >
                {t('welcome.enter')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;