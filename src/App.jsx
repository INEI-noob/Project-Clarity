import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Layout & UI Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import GuidesPage from './pages/GuidesPage';
import CommunityPage from './pages/CommunityPage';
import PulsePage from './pages/PulsePage';

/**
 * PROJECT SAPPHIRE - CLEAN MULTI-FILE ROUTER
 * This serves as the optimized entry point with modular imports.
 */
export default function App() {
  const [page, setPage] = useState('home');

  // Universal scroll-to-top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  // Navigation configuration
  const navLinks = [
    { label: 'Library', path: 'guides', color: 'text-indigo-600' },
    { label: 'Pulse', path: 'forum', color: 'text-rose-500' },
    { label: 'Community', path: 'community', color: 'text-cyan-500' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar 
        currentPage={page} 
        setPage={setPage} 
        navLinks={navLinks} 
      />

      <AnimatePresence mode="wait">
        <motion.main 
          key={page} 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="min-h-screen"
        >
          {page === 'home' && <HomePage setPage={setPage} />}
          {page === 'guides' && <GuidesPage />}
          {page === 'community' && <CommunityPage />}
          {page === 'forum' && <PulsePage />}
        </motion.main>
      </AnimatePresence>

      <Footer setPage={setPage} />
    </div>
  );
}