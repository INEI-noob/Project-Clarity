import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, Heart } from 'lucide-react';

/**
 * FIXED NAV - Resolved import error and fixed Cloudflare pathing.
 */

const Navbar = ({ currentPage, setPage, navLinks = [] }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  /**
   * CLOUDFLARE PRODUCTION FIX:
   * Instead of importing (which causes resolve errors if the file structure isn't perfect),
   * we use the root-relative path. 
   * * IMPORTANT: Ensure your logo is located at: public/logo.webp
   * In production, the "public" folder is stripped, so the URL is just "/logo.webp".
   */
  const logoPath = "/logo.webp"; 

  const links = navLinks.length > 0 ? navLinks : [
    { label: 'Library', path: 'guides', color: 'indigo' },
    { label: 'Pulse', path: 'forum', color: 'rose' },
    { label: 'Connect', path: 'community', color: 'amber' },
    { label: 'About', path: 'about', color: 'slate' }
  ];

  const getColorClasses = (color, isActive) => {
    const colors = {
      indigo: isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600',
      rose: isActive ? 'text-rose-600' : 'text-slate-500 hover:text-rose-600',
      amber: isActive ? 'text-amber-600' : 'text-slate-500 hover:text-amber-600',
      slate: isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900',
    };
    return colors[color] || colors.indigo;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <div className="max-w-5xl mx-auto rounded-full px-2 md:px-4 py-2 flex justify-between items-center bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          
          {/* LEFT: Branding */}
          <div className="flex items-center gap-3 md:w-1/4">
            <button 
              onClick={() => setPage('home')} 
              className="flex items-center group ml-1"
            >
              <div className="relative w-16 h-16 flex items-center justify-center transition-transform hover:scale-105 active:scale-95">
                {!logoError ? (
                  <img 
                    src={logoPath} 
                    alt="Sanctuary"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // If /logo.webp fails, try /assets/logo.webp as a fallback
                      if (e.target.src.indexOf('/assets/') === -1) {
                        e.target.src = '/assets/logo.webp';
                      } else {
                        setLogoError(true);
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center">
                    <Sparkles size={16} className="text-indigo-500" />
                  </div>
                )}
              </div>
            </button>
          </div>

          {/* CENTER: Navigation */}
          <div className="hidden md:flex items-center bg-slate-100/30 p-1 rounded-full border border-slate-200/20">
            {links.map((link) => {
              const isActive = currentPage === link.path;
              return (
                <button 
                  key={link.path}
                  onClick={() => setPage(link.path)}
                  className={`
                    relative px-5 py-2 rounded-full text-[13px] font-bold tracking-tight transition-all duration-300
                    ${getColorClasses(link.color, isActive)}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-white rounded-full shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Visual Balance */}
          <div className="flex items-center justify-end md:w-1/4 pr-1">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
            >
              <Menu size={20} />
            </button>
            
            <span className="hidden md:block text-[10px] font-medium text-slate-400 italic">
              Built for joy.
            </span>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)} />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 bottom-0 w-[80%] bg-white p-6 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <Sparkles size={24} className="text-indigo-500" />
                <button onClick={() => setMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {links.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      setPage(link.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left p-5 rounded-2xl font-bold text-lg ${
                      currentPage === link.path ? 'bg-slate-50 text-indigo-600' : 'text-slate-500'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="mt-auto">
                <button className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center gap-2">
                  <Heart size={16} /> Support Sanctuary
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;