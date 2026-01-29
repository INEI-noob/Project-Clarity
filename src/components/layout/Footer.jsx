import React from 'react';
import { Sparkles, Github, Twitter, Instagram, ArrowUpRight } from 'lucide-react';

/**
 * FOOTER COMPONENT
 * @param {function} setPage - State setter for navigation
 */

const Footer = ({ setPage }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Sanctuary: [
      { label: 'Home', path: 'home' },
      { label: 'Library', path: 'guides' },
      { label: 'The Pulse', path: 'forum' },
    ],
    Support: [
      { label: 'Safety Center', path: '#' },
      { label: 'Privacy Policy', path: '#' },
      { label: 'Community Guidelines', path: '#' },
    ],
    Social: [
      { label: 'Instagram', icon: Instagram, href: '#' },
      { label: 'Twitter', icon: Twitter, href: '#' },
      { label: 'Github', icon: Github, href: '#' },
    ]
  };

  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 font-black tracking-tighter text-xl mb-6">
              <Sparkles size={22} className="text-indigo-600" /> Sapphire.
            </div>
            <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-xs">
              A radical digital garden built for the community. Designed for peace, identity, and shared wisdom.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-300 mb-8">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.path ? (
                      <button
                        onClick={() => link.path !== '#' && setPage(link.path)}
                        className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1 group"
                      >
                        {link.label}
                        {link.path === '#' && <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2"
                      >
                        {link.icon && <link.icon size={16} />}
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
            © {currentYear} Project Sapphire • Built with care
          </p>
          
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              System: Stable
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;