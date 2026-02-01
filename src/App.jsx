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
    const timer = setTimeout(() => setIsLoading(false), 500);
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
      <div className="fixed inset-0 bg-slate-50 flex items-center justify-center z-[9999]">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }} className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 3L14.5 8.5L20 9.5L16 14L17 20L12 17L7 20L8 14L4 9.5L9.5 8.5L12 3Z" /></svg>
          </motion.div>
          <span className="text-slate-400 font-bold text-sm tracking-widest uppercase">Entering Sanctuary</span>
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