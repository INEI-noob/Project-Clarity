import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/layout/Layout';

// Detect if we're on mobile for conditional loading
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Simple mobile-aware wrapper - no animations on mobile
const MobileAwareDiv = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

// Lazy load all pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const GuidesPage = lazy(() => import('./pages/GuidesPage'));
const PulsePage = lazy(() => import('./pages/PulsePage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Lazy load guide pages
const ComingOutGuide = lazy(() => import('./pages/guides/ComingOutGuide'));
const GenderIdentityGuide = lazy(() => import('./pages/guides/GenderIdentityGuide'));
const FindingCommunityGuide = lazy(() => import('./pages/guides/FindingCommunityGuide'));
const DigitalSafetyGuide = lazy(() => import('./pages/guides/DigitalSafetyGuide'));
const HealthcareGuide = lazy(() => import('./pages/guides/HealthcareGuide'));
const LegalRightsGuide = lazy(() => import('./pages/guides/LegalRightsGuide'));
const RelationshipsGuide = lazy(() => import('./pages/guides/RelationshipsGuide'));
const SpiritualityGuide = lazy(() => import('./pages/guides/SpiritualityGuide'));
const AdditionalGuides = lazy(() => import('./pages/guides/AdditionalGuides'));

// Lazy load legal & policy pages
const GuidelinesPage = lazy(() => import('./pages/footer/GuidelinesPage'));
const PrivacyPage = lazy(() => import('./pages/footer/PrivacyPage'));
const SafetyPage = lazy(() => import('./pages/footer/SafetyPage'));
const CrisisPage = lazy(() => import('./pages/footer/CrisisPage'));

function App() {
  // Initialize page from URL hash (e.g., #/guide-gender-identity)
  const [currentPage, setPage] = useState(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#/')) {
      return hash.replace('#/', '') || 'home';
    }
    return 'home';
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const newPage = hash ? hash.replace('#/', '') : 'home';
      setPage(newPage || 'home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page) => {
    if (page === 'home') {
      window.location.hash = '/';
    } else {
      window.location.hash = `/${page}`;
    }
    // setPage will be called by the hashchange listener above
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const mobile = isMobile();

  if (isLoading) {
    if (mobile) {
      // Simplified loading for mobile
      return (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center z-[9999]">
          <div className="flex flex-col items-center">
            <img
              src="/logo.png"
              alt="Sanctuary"
              className="w-24 h-24 mb-4 object-contain"
            />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 font-bold text-sm tracking-[0.3em] uppercase">
              Loading...
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center z-[9999]">
        <div className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Sanctuary"
            className="w-32 h-32 mb-8 object-contain"
          />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 font-bold text-sm tracking-[0.3em] uppercase mb-2">
            Entering Sanctuary
          </span>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <Layout currentPage={currentPage} setPage={handlePageChange}>
        <MobileAwareDiv>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          }>
            {renderPage()}
          </Suspense>
        </MobileAwareDiv>
      </Layout>
    </ToastProvider>
  );
}

export default App;