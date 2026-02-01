import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, Shield, Heart } from 'lucide-react';

/**
 * ENHANCED NAVBAR - Floating Sanctuary Compass
 * Fluid, responsive, and deeply integrated with the Sapphire aesthetic
 */

const Navbar = ({ currentPage, setPage, navLinks = [] }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  // Default navigation with emotional context
  const links = navLinks.length > 0 ? navLinks : [
    { label: 'Library', path: 'guides', color: 'indigo', desc: 'Resources' },
    { label: 'Pulse', path: 'forum', color: 'rose', desc: 'Community' },
    { label: 'Connect', path: 'community', color: 'amber', desc: 'Find others' }
  ];

  // Scroll detection for glassmorphism intensity
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getColorClasses = (color, isActive) => {
    const colors = {
      indigo: isActive ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50',
      rose: isActive ? 'text-rose-600 bg-rose-50' : 'text-slate-500 hover:text-rose-600 hover:bg-rose-50/50',
      amber: isActive ? 'text-amber-600 bg-amber-50' : 'text-slate-500 hover:text-amber-600 hover:bg-amber-50/50',
      cyan: isActive ? 'text-cyan-600 bg-cyan-50' : 'text-slate-500 hover:text-cyan-600 hover:bg-cyan-50/50'
    };
    return colors[color] || colors.indigo;
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className={`
          max-w-5xl mx-auto rounded-full px-6 py-3 flex justify-between items-center
          transition-all duration-500 border
          ${isScrolled 
            ? 'bg-white/90 backdrop-blur-2xl shadow-lg shadow-slate-900/5 border-white/60' 
            : 'bg-white/60 backdrop-blur-xl border-white/40'
          }
        `}>
          
          {/* Logo Section */}
          <motion.button 
            onClick={() => setPage('home')} 
            className="flex items-center gap-3 group relative"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated logo container */}
            <div className="relative">
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 rounded-xl opacity-20 blur-sm"
              />
              <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-50 to-white rounded-xl flex items-center justify-center border border-indigo-100 group-hover:border-indigo-300 transition-colors shadow-sm">
                <Sparkles size={20} className="text-indigo-600 group-hover:text-indigo-700 transition-colors" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-slate-900 leading-none">
                Sapphire
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 hidden sm:block">
                Safe Space
              </span>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 relative">
            {links.map((link) => {
              const isActive = currentPage === link.path;
              const isHovered = hoveredLink === link.path;
              
              return (
                <button 
                  key={link.path}
                  onClick={() => setPage(link.path)}
                  onMouseEnter={() => setHoveredLink(link.path)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`
                    relative px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300
                    ${getColorClasses(link.color, isActive)}
                  `}
                >
                  {/* Animated background pill */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className={`absolute inset-0 bg-${link.color}-100 rounded-full`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </AnimatePresence>
                  
                  <span className="relative z-10 flex items-center gap-2">
                    {isActive && (
                      <motion.span 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }}
                        className={`w-1.5 h-1.5 rounded-full bg-${link.color}-500`}
                      />
                    )}
                    {link.label}
                  </span>

                  {/* Tooltip on hover */}
                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap"
                      >
                        {link.desc}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
            
            {/* Divider */}
            <div className="w-px h-6 bg-slate-200 mx-2" />
            
            {/* Safety Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 hidden lg:block">Safe Mode</span>
              <Shield size={14} className="text-emerald-600 lg:hidden" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl p-6 pt-24"
            >
              <div className="space-y-2">
                {links.map((link, i) => {
                  const isActive = currentPage === link.path;
                  return (
                    <motion.button
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => {
                        setPage(link.path);
                        setMobileMenuOpen(false);
                      }}
                      className={`
                        w-full text-left p-4 rounded-2xl flex items-center justify-between group transition-all
                        ${isActive 
                          ? `bg-${link.color}-50 text-${link.color}-700 border border-${link.color}-200` 
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }
                      `}
                    >
                      <div>
                        <span className="block font-bold text-lg">{link.label}</span>
                        <span className={`text-xs ${isActive ? `text-${link.color}-600` : 'text-slate-400'}`}>
                          {link.desc}
                        </span>
                      </div>
                      {isActive && (
                        <motion.div 
                          layoutId="mobileActive"
                          className={`w-2 h-2 rounded-full bg-${link.color}-500`}
                        />
                      )}
                    </motion.button>
                  );
                })}
                
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <Shield className="text-emerald-600" size={20} />
                    <div>
                      <span className="block font-bold text-sm text-emerald-900">Safe Mode Active</span>
                      <span className="text-xs text-emerald-600">Moderated space</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => {
                    setPage('home');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mt-4 p-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 font-bold hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Heart size={16} /> Back to Home
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;