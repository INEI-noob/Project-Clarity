import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, List } from 'lucide-react';

const GuideProgress = () => {
  const [progress, setProgress] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    return max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
  });
  const [toc] = useState(() => {
    if (typeof window === 'undefined') return [];
    const main = document.querySelector('main');
    if (!main) return [];
    const headings = Array.from(main.querySelectorAll('h2, h3'))
      .filter((h) => h.textContent && h.textContent.trim().length > 2)
      .slice(0, 12);
    headings.forEach((h, i) => {
      if (!h.id) h.id = `guide-section-${i}`;
    });
    return headings.map((h) => ({
      id: h.id,
      label: h.textContent.trim(),
      sub: h.tagName === 'H3',
    }));
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jump = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollTop = () => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-[95] h-1 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-400 transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {toc.length > 0 && (
        <div className="fixed right-4 md:right-6 bottom-24 z-[85] flex flex-col items-end gap-2">
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                className="w-72 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-100 shadow-xl overflow-hidden"
              >
                <p className="px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                  On this page
                </p>
                <nav className="max-h-72 overflow-y-auto p-2">
                  {toc.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => jump(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-50 transition-colors ${
                        item.sub ? 'pl-6 text-slate-500' : 'font-semibold text-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <button
                    onClick={scrollTop}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-indigo-600 hover:bg-indigo-50 transition-colors mt-1"
                  >
                    <ArrowUp size={14} /> Back to top
                  </button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Jump to a section"
            className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
          >
            <List size={18} />
          </button>
        </div>
      )}
    </>
  );
};

export default GuideProgress;