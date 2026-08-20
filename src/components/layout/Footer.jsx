import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NewsletterForm from '../NewsletterForm';
import { 
  Sparkles, 
  Github, 
  Twitter, 
  Instagram, 
  ArrowUp,
  Heart,
  Shield,
  Wind,
  AlertCircle,
  Compass,
  PhoneCall
} from 'lucide-react';

/**
 * FIXED FOOTER - Resolved import resolution error.
 * In environments like Cloudflare Pages or certain build setups, 
 * referencing assets via direct relative imports can fail if the 
 * directory structure isn't exactly as expected by the bundler.
 * Switching to a root-relative path for broad compatibility.
 */

const Footer = ({ setPage }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const currentYear = new Date().getFullYear();

  // Root-relative path is safer for production deployments
  const logoPath = "/logo.webp"; 

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
      { label: 'Resource Hub', path: 'resources', icon: Compass },
      { label: 'Community Map', path: 'connect', icon: Shield },
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
    scrollToTop();
    setTimeout(() => {
        if (typeof setPage === 'function') {
          setPage(path);
        }
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
            aria-label="Back to top"
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-slate-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-600 transition-all hover:scale-110 group"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="relative mt-auto">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        
        <div className="pt-24 pb-12 px-6 bg-white/80 backdrop-blur-md">
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
                        src={logoPath} 
                        alt="Sanctuary Logo"
                        className="w-24 h-24 object-contain transition-transform group-hover:scale-110"
                        onError={() => setLogoError(true)}
                      />
                    ) : (
                      <Sparkles size={48} className="text-indigo-600" />
                    )}
                  </div>
                </motion.button>

                <div className="space-y-4 text-center sm:text-left">
                  <p className="text-slate-500 leading-relaxed max-w-sm text-sm italic">
                    "A radical digital sanctuary built for discovery, safety, and queer joy. 
                    Designed with care for those finding their way home to themselves."
                  </p>

                  <div className="flex flex-wrap justify-center sm:justify-start gap-8">
                    <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                      <Shield size={12} />
                      Secure
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                      <Heart size={12} />
                      Safe Space
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                      <Wind size={12} />
                      Private
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section: Navigation Links */}
              <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-6 text-center sm:text-left">
                    Navigate
                  </h4>
                  <ul className="space-y-3 text-center sm:text-left">
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
                  <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-6 text-center sm:text-left">
                    Resources
                  </h4>
                  <ul className="space-y-3 text-center sm:text-left">
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

                <div className="col-span-2 md:col-span-1 text-center sm:text-left">
                  <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-6">
                    Connect
                  </h4>
                  <div className="flex justify-center sm:justify-start gap-5 mb-8">
                    {footerLinks.connect.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 text-slate-500 transition-all ${link.color} hover:scale-110`}
                        aria-label={link.label}
                      >
                        <link.icon size={20} />
                      </a>
                    ))}
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Crisis Hotline</p>
                    <a
                      href="tel:0800567567"
                      className="inline-flex items-center gap-2 text-lg font-bold text-slate-900 hover:text-rose-600 transition-colors"
                    >
                      <PhoneCall size={16} className="text-rose-500" /> 0800 567 567
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mb-16 rounded-[2.5rem] glass-sanctuary p-8 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-md">
                <h3 className="font-black text-slate-900 text-xl mb-2">
                  Letters from the Sanctuary
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Occasional updates, new guides, and community events. No spam, no
                  rainbow-washing — just the good stuff. Unsubscribe anytime.
                </p>
              </div>
              <div className="w-full lg:w-auto lg:min-w-[380px]">
                <NewsletterForm />
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium text-center md:text-left">
                <span>© {currentYear} Project Clarity</span>
                <span className="hidden md:inline w-1 h-1 rounded-full bg-slate-200" />
                <span>By the community, for the community</span>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    System Active
                  </span>
                </div>
                
                <button 
                  onClick={scrollToTop}
                  className="text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-indigo-600 transition-colors focus:outline-none"
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