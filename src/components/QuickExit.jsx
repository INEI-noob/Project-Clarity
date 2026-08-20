import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut } from 'lucide-react';

const ESCAPE_URL = 'https://www.google.com';
const ESCAPE_KEYPRESS_WINDOW_MS = 1500;
const ESCAPE_KEYPRESS_COUNT = 3;

/**
 * QuickExit - Global safety button.
 * Always visible, redirects to a neutral page in one tap.
 * Keyboard shortcut: press Escape 3 times quickly.
 */
const QuickExit = () => {
  const [isArmed, setIsArmed] = useState(false);
  const [presses, setPresses] = useState(0);
  const [lastPress, setLastPress] = useState(0);

  const exitNow = () => {
    // Replace history so back button does not return to Sanctuary
    window.location.replace(ESCAPE_URL);
  };

  const handleKeyDown = (e) => {
    if (e.key !== 'Escape') return;
    const now = Date.now();
    if (now - lastPress > ESCAPE_KEYPRESS_WINDOW_MS) {
      setPresses(1);
    } else {
      setPresses((p) => p + 1);
    }
    setLastPress(now);
  };

  const handleClick = () => {
    if (isArmed) {
      exitNow();
      return;
    }
    setIsArmed(true);
    setTimeout(() => setIsArmed(false), 4000);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    if (presses >= ESCAPE_KEYPRESS_COUNT) {
      exitNow();
    }
  }, [presses]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
      className="fixed bottom-8 left-8 z-[160]"
    >
      <AnimatePresence mode="wait">
        <motion.button
          key={isArmed ? 'armed' : 'idle'}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={handleClick}
          aria-label={isArmed ? 'Confirm quick exit' : 'Quick exit - leave site now'}
          title="Quick Exit (press Escape 3x)"
          className={`
            flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-bold
            shadow-lg backdrop-blur-xl transition-colors
            ${isArmed
              ? 'bg-rose-600 text-white shadow-rose-200'
              : 'bg-white/90 text-rose-600 border border-rose-100 shadow-rose-100/50 hover:bg-rose-50'}
          `}
        >
          <LogOut size={16} className={isArmed ? 'animate-pulse' : ''} />
          {isArmed ? 'Tap again to exit' : 'Quick Exit'}
        </motion.button>
      </AnimatePresence>
    </motion.div>
  );
};

export default QuickExit;