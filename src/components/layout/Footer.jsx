import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Github, 
  Twitter, 
  Instagram, 
  ArrowUp,
  Heart,
  Shield,
  Wind,
  AlertCircle
} from 'lucide-react';

const Footer = ({ setPage }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const currentYear = new Date().getFullYear();

  // Reference path for the logo
  const footerLogoPath = "/src/assets/header-logo.png";

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    explore: [
      { label: 'Sanctuary Home', path: 'home', icon: Sparkles },
      { label: 'The Library', path: 'guides', icon: Heart },
      { label: 'The Pulse', path: 'forum', icon: Wind },
      { label: 'Community Map', path: 'community', icon: Shield },
    ],
    support: [
      { 
        label: 'Crisis Support', 
        path: 'crisis', 
        icon: AlertCircle, 
        urgent: true,
        badge: '24/7'
      },
      { label: 'Safety Guidelines', path: 'safety' },
      { label: 'Privacy Promise', path: 'privacy' },
      { label: 'Community Guidelines', path: 'guidelines' },
    ],
    connect: [
      { label: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
      { label: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-500' },
      { label: 'GitHub', icon: Github, href: '#', color: 'hover:text-slate-900' },
    ]
  };

  const handleNav = (path) => {
    if (!path || path === '#') return;
    // We scroll to top first to ensure a smooth transition
    scrollToTop();
    // Use a small timeout if the page switch feels jarring
    setTimeout(() => {
        setPage(path);
    }, 100);
  };

  return (
    <>
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-slate-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-600 transition-all hover:scale-110 group"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="relative mt-20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        
        <div className="pt-24 pb-12 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 items-start">
              
              {/* Left Section: Logo and Description */}
              <div className="md:col-span-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <motion.button 
                  onClick={() => handleNav('home')}
                  whileHover={{ y: -2 }}
                  className="flex-shrink-0 group focus:outline-none"
                >
                  <div className="w-28 h-28 flex items-center justify-center overflow-hidden">
                    {!logoError ? (
                      <img 
                        src={footerLogoPath} 
                        alt="Sanctuary Logo"
                        className="w-24 h-24 object-contain transition-transform group-hover:scale-110"
                        onError={() => setLogoError(true)}
                      />
                    ) : (
                      <Sparkles size={48} className="text-indigo-600" />
                    )}
                  </div>
                </motion.button>

                <div className="space-y-4">
                  <p className="text-slate-500 leading-relaxed max-w-sm text-sm italic space-y-4">
                    "A radical digital sanctuary built for discovery, safety, and queer joy. 
                    Designed with care for those finding their way home to themselves."
                  </p>

                  <div className="flex flex-wrap gap-8">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <Shield size={12} />
                      Secure
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <Heart size={12} />
                      Safe Space
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <Wind size={12} />
                      Private
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section: Navigation Links */}
              <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-6">
                    Navigate
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.explore.map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={() => handleNav(link.path)}
                          className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors focus:outline-none"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-6">
                    Resources
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.support.map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={() => handleNav(link.path)}
                          className={`text-sm font-semibold transition-colors focus:outline-none ${
                            link.urgent ? 'text-rose-600 hover:text-rose-700 font-bold' : 'text-slate-600 hover:text-indigo-600'
                          }`}
                        >
                          {link.label}
                          {link.badge && (
                            <span className="ml-2 text-[8px] bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                              {link.badge}
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-6">
                    Connect
                  </h4>
                  <div className="flex gap-5 mb-8">
                    {footerLinks.connect.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-slate-400 transition-all ${link.color} hover:scale-110`}
                        aria-label={link.label}
                      >
                        <link.icon size={20} />
                      </a>
                    ))}
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Crisis Hotline</p>
                    <p className="text-lg font-bold text-slate-900">0800 123 456</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                <span>© {currentYear} Project Clarity</span>
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <span>By the community, for the community</span>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    System Active
                  </span>
                </div>
                
                <button 
                  onClick={scrollToTop}
                  className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none"
                >
                  Back to Top
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;