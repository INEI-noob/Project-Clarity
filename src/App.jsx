import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import GuidesPage from './pages/GuidesPage';
import PulsePage from './pages/PulsePage';
import CommunityPage from './pages/CommunityPage';
import CrisisPage from './pages/CrisisPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

import './index.css';

function App() {
  const [currentPage, setPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  // Initial load animation
  useEffect(() => {
    // Simulate initial load or check auth state here
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle page changes with scroll to top
  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Page transition variants - "Sanctuary" style smooth fades
  const pageTransition = {
    initial: { 
      opacity: 0, 
      y: 20, 
      filter: 'blur(10px)',
      scale: 0.98
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] // Custom easing for that "fluid" feel
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      filter: 'blur(10px)',
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  // Render current page
  const renderPage = () => {
    const props = { setPage: handlePageChange };
    
    switch(currentPage) {
      case 'home':
        return <HomePage {...props} />;
      case 'guides':
        return <GuidesPage {...props} />;
      case 'forum':
      case 'pulse':
        return <PulsePage {...props} />;
      case 'community':
        return <CommunityPage {...props} />;
      case 'crisis':
        return <CrisisPage {...props} />;
      case 'about':
        return <AboutPage {...props} />;
      default:
        return <NotFoundPage {...props} />;
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-slate-50 flex items-center justify-center z-[9999]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ 
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-4 shadow-2xl shadow-indigo-200"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3L14.5 8.5L20 9.5L16 14L17 20L12 17L7 20L8 14L4 9.5L9.5 8.5L12 3Z" />
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 font-bold text-sm tracking-widest uppercase"
          >
            Entering Sanctuary
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <Layout currentPage={currentPage} setPage={handlePageChange}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={currentPage}
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative min-h-screen"
          >
            {renderPage()}
          </motion.main>
        </AnimatePresence>
      </Layout>
    </ToastProvider>
  );
}

export default App;