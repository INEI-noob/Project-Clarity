import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/layout/Layout';

// Main Pages
import HomePage from './pages/HomePage';
import GuidesPage from './pages/GuidesPage';
import PulsePage from './pages/PulsePage';
import CommunityPage from './pages/CommunityPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

// Guide Pages
import ComingOutGuide from './pages/guides/ComingOutGuide';
import GenderIdentityGuide from './pages/guides/GenderIdentityGuide';
import FindingCommunityGuide from './pages/guides/FindingCommunityGuide';
import DigitalSafetyGuide from './pages/guides/DigitalSafetyGuide';
import HealthcareGuide from './pages/guides/HealthcareGuide';
import LegalRightsGuide from './pages/guides/LegalRightsGuide';
import RelationshipsGuide from './pages/guides/RelationshipsGuide';
import SpiritualityGuide from './pages/guides/SpiritualityGuide';
import AdditionalGuides from './pages/guides/AdditionalGuides';

// Legal & Policy Pages
import GuidelinesPage from './pages/footer/GuidelinesPage';
import PrivacyPage from './pages/footer/PrivacyPage';
import SafetyPage from './pages/footer/SafetyPage';
import CrisisPage from './pages/footer/CrisisPage';

function App() {
  const [currentPage, setPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageTransition = {
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -20, filter: 'blur(10px)' }
  };

  const renderPage = () => {
    const props = { setPage: handlePageChange };

    switch(currentPage) {
      // Main navigation
      case 'home': return <HomePage {...props} />;
      case 'guides': return <GuidesPage {...props} />;
      case 'forum':
      case 'pulse': return <PulsePage {...props} />;
      case 'community': return <CommunityPage {...props} />;
      case 'crisis': return <CrisisPage {...props} />;
      case 'about': return <AboutPage {...props} />;
      
      // Individual Guide Pages
      case 'guide-coming-out': return <ComingOutGuide {...props} />;
      case 'guide-gender-identity': return <GenderIdentityGuide {...props} />;
      case 'guide-finding-community': return <FindingCommunityGuide {...props} />;
      case 'guide-digital-safety': return <DigitalSafetyGuide {...props} />;
      case 'guide-healthcare': return <HealthcareGuide {...props} />;
      case 'guide-legal-rights': return <LegalRightsGuide {...props} />;
      case 'guide-relationships': return <RelationshipsGuide {...props} />;
      case 'guide-spirituality': return <SpiritualityGuide {...props} />;
      case 'guide-additional': return <AdditionalGuides {...props} />;
      
      // Legal & Policy Pages
      case 'guidelines': return <GuidelinesPage {...props} />;
      case 'privacy': return <PrivacyPage {...props} />;
      case 'safety': return <SafetyPage {...props} />;
      
      default: return <NotFoundPage {...props} />;
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center z-[9999]">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Logo Container with gentle floating animation */}
          <div className="relative w-32 h-32 mb-8">
            {/* Soft glow effect behind logo */}
            <motion.div
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-cyan-200 rounded-full blur-2xl"
            />
            
            {/* Your Actual Logo */}
            <motion.img 
              src="/src/assets/header-logo.png"
              alt="Sanctuary"
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{ 
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-full h-full object-contain relative z-10 drop-shadow-xl"
            />
            
            {/* Sparkle effects */}
            <motion.div
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                rotate: [0, 180]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 1,
                ease: "easeInOut" 
              }}
              className="absolute -top-2 -right-2 w-4 h-4 text-yellow-400"
            >
              ✦
            </motion.div>
            <motion.div
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                repeatDelay: 0.5,
                delay: 0.5,
                ease: "easeInOut" 
              }}
              className="absolute -bottom-1 -left-4 w-3 h-3 text-pink-400"
            >
              ✦
            </motion.div>
          </div>
          
          {/* Loading Text with gradient matching logo colors */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 font-bold text-sm tracking-[0.3em] uppercase mb-2">
              Entering Sanctuary
            </span>
            
            {/* Progress bar with rainbow gradient */}
            <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="w-full h-full bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <Layout currentPage={currentPage} setPage={handlePageChange}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </Layout>
    </ToastProvider>
  );
}

export default App;