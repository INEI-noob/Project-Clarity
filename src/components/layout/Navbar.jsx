import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * NAVBAR COMPONENT
 * @param {string} currentPage - Current active page ID
 * @param {function} setPage - State setter for navigation
 * @param {Array} navLinks - Array of { label, path, colorClass }
 */

const Navbar = ({ currentPage, setPage, navLinks = [] }) => {
  // Default links if none provided
  const links = navLinks.length > 0 ? navLinks : [
    { label: 'Library', path: 'guides', color: 'text-indigo-600' },
    { label: 'Pulse', path: 'forum', color: 'text-rose-500' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 p-6">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl rounded-full px-8 py-4 border border-slate-100 shadow-sm flex justify-between items-center transition-all duration-300 hover:shadow-md">
        
        {/* Brand/Logo */}
        <button 
          onClick={() => setPage('home')} 
          className="flex items-center gap-2 font-black tracking-tighter text-xl group"
        >
          <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <Sparkles size={18} className="text-indigo-600 group-hover:text-white transition-colors" />
          </div>
          <span className="text-slate-900">Sapphire.</span>
        </button>
        
        {/* Navigation Links */}
        <div className="flex gap-8 items-center">
          {links.map((link) => (
            <button 
              key={link.path}
              onClick={() => setPage(link.path)}
              className={`relative font-black text-xs uppercase tracking-widest transition-all duration-200 group
                ${currentPage === link.path ? link.color : 'text-slate-400 hover:text-slate-900'}`}
            >
              {link.label}
              
              {/* Animated Underline */}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-current transition-all duration-300 
                ${currentPage === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;