import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Github, 
  Twitter, 
  Instagram, 
  ArrowUpRight, 
  ArrowUp,
  Heart,
  Shield,
  Wind,
  Mail,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

const Footer = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
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
      { label: 'Safety Guidelines', path: '#', external: true },
      { label: 'Privacy Promise', path: '#', external: true },
      { label: 'Community Guidelines', path: '#', external: true },
    ],
    connect: [
      { label: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500 hover:bg-pink-50' },
      { label: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-500 hover:bg-sky-50' },
      { label: 'GitHub', icon: Github, href: '#', color: 'hover:text-slate-900 hover:bg-slate-100' },
    ]
  };

  const handleNav = (path) => {
    if (path === '#') return;
    setPage(path);
    scrollToTop();
  };

  return (
    <>
      {/* Floating Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl shadow-indigo-200 flex items-center justify-center hover:bg-indigo-600 transition-all hover:scale-110 group"
          >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="relative mt-32">
        {/* Iridescent Top Border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-rose-200 via-indigo-300 to-cyan-200 blur-sm" />

        {/* Newsletter Section */}
        <div className="px-6 -mt-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-sanctuary rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-indigo-100/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100/50 to-rose-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4">
                    <Mail size={14} /> Stay Connected
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                    Keep the Pulse Alive
                  </h3>
                  <p className="text-slate-600 max-w-md">
                    Monthly wisdom, new resources, and community stories delivered gently to your inbox. No spam, just care.
                  </p>
                </div>

                <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-shrink-0">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full sm:w-64 px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-slate-700 placeholder:text-slate-400 font-medium"
                        required
                      />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg whitespace-nowrap"
                    >
                      {subscribed ? 'Welcome!' : 'Join'}
                    </motion.button>
                  </div>
                  <AnimatePresence>
                    {subscribed && (
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-emerald-600 font-bold mt-3 flex items-center gap-1 justify-center sm:justify-start"
                      >
                        <Heart size={12} className="fill-current" /> Welcome to the family
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Footer */}
        <div className="pt-20 pb-12 px-6 bg-gradient-to-b from-white/50 to-slate-50/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
              
              {/* Brand Column */}
              <div className="md:col-span-5 space-y-6">
                <motion.button 
                  onClick={() => handleNav('home')}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="relative">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 rounded-xl opacity-20 blur-sm"
                    />
                    <div className="relative w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg border border-slate-100 group-hover:border-indigo-200 transition-colors">
                      <Sparkles size={24} className="text-indigo-600" />
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">
                    Project <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Sapphire</span>
                  </span>
                </motion.button>

                <p className="text-slate-600 leading-relaxed max-w-sm text-sm">
                  A radical digital sanctuary built for discovery, safety, and queer joy. 
                  Designed with care for those finding their way home to themselves.
                </p>

                {/* Safety Badges */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold">
                    <Shield size={12} />
                    Encrypted
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold">
                    <Heart size={12} className="fill-current" />
                    Moderated
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
                    <Wind size={12} />
                    Anonymous
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                {/* Explore */}
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-6">
                    Navigate
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.explore.map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={() => handleNav(link.path)}
                          className="group flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
                        >
                          <link.icon size={14} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support */}
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-6">
                    Safety & Support
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.support.map((link) => (
                      <li key={link.label}>
                        {link.path === 'crisis' ? (
                          <button
                            onClick={() => handleNav(link.path)}
                            className="group flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors w-full"
                          >
                            <link.icon size={14} />
                            <span>{link.label}</span>
                            <span className="ml-auto text-[9px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">
                              {link.badge}
                            </span>
                          </button>
                        ) : (
                          <a
                            href={link.path}
                            className="group flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-rose-500 transition-colors"
                          >
                            {link.label}
                            {link.external && <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300" />}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social */}
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-6">
                    Follow
                  </h4>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {footerLinks.connect.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className={`w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 transition-all shadow-sm ${link.color} hover:scale-110 hover:shadow-md`}
                        aria-label={link.label}
                      >
                        <link.icon size={18} />
                      </a>
                    ))}
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-white border border-rose-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-rose-400 mb-1">Crisis Support</p>
                    <p className="text-lg font-bold text-rose-600">0800 123 456</p>
                    <p className="text-[10px] text-rose-400 mt-1">24/7 • Anonymous</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>© {currentYear} Project Sapphire</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span>Built with care</span>
                <Heart size={12} className="text-rose-400 fill-rose-400 inline ml-1" />
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-emerald-400"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    All Systems Operational
                  </span>
                </div>
                
                <button 
                  onClick={scrollToTop}
                  className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
                >
                  Top <ArrowUp size={12} />
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