import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, ArrowRight, Compass } from 'lucide-react';
import PageShell from '../components/layout/PageShell';
import { guideById } from '../content/guides';
import { useLocale } from '../i18n';

const STORAGE_KEY = 'clarity_saved_guides';

const SavedGuidesPage = ({ setPage }) => {
  const { t } = useLocale();
  const [savedIds, setSavedIds] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });

  const remove = (id) => {
    const next = savedIds.filter((s) => s !== id);
    setSavedIds(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage unavailable — just update the view for this visit
    }
  };

  const saved = savedIds.map(guideById).filter(Boolean);

  return (
    <PageShell maxWidth="max-w-4xl" tone="indigo">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-6">
          <Bookmark size={14} /> {t('saved.badge')}
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
          Saved <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">{t('saved.guides')}</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          {t('saved.subtitle')}
        </p>
      </div>

      {saved.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-sanctuary rounded-[2.5rem] p-12 text-center"
        >
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Compass size={24} className="text-slate-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{t('saved.emptyTitle')}</h3>
          <p className="text-slate-500 text-sm mb-6">
            {t('saved.emptyBody')}
          </p>
          <button
            onClick={() => setPage && setPage('guides')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors"
          >
            {t('saved.browse')} <ArrowRight size={14} />
          </button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {saved.map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-sanctuary rounded-[2rem] p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <BookmarkCheck size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg leading-tight">{g.title}</h3>
                  <p className="text-xs font-medium text-slate-500">{g.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => remove(g.id)}
                  className="px-4 py-2.5 rounded-full border border-slate-200 text-slate-500 text-xs font-bold hover:border-rose-300 hover:text-rose-500 transition-colors"
                  aria-label={`Remove ${g.title} from saved guides`}
                >
{t('saved.remove')}
                </button>
                <button
                  onClick={() => setPage && setPage(g.route)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-indigo-600 transition-colors"
                >
                  {t('saved.open')} <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </PageShell>
  );
};

export default SavedGuidesPage;