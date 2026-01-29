import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MoreHorizontal } from 'lucide-react';

/**
 * PROJECT SAPPHIRE - UNIVERSAL CARD SYSTEM
 * A polymorphic card component that adapts to different page contexts.
 */

const Card = ({ 
  children, 
  onClick, 
  className = "", 
  variant = "default", // default, glass, dark, iridescent
  hover = true 
}) => {
  const variants = {
    default: "bg-white border border-slate-100",
    glass: "bg-white/60 backdrop-blur-xl border border-white/20",
    dark: "bg-slate-900 text-white border-slate-800",
    iridescent: "bg-white iridescent-border shadow-2xl shadow-indigo-100/50"
  };

  return (
    <motion.div
      whileHover={hover ? { y: -8, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      className={`
        relative p-8 rounded-[3.5rem] flex flex-col overflow-hidden transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

// --- [ CARD SUB-COMPONENTS ] ---

Card.Badge = ({ children, className = "" }) => (
  <span className={`
    inline-block px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 w-fit
    bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors
    ${className}
  `}>
    {children}
  </span>
);

Card.Title = ({ children, className = "" }) => (
  <h3 className={`text-3xl md:text-4xl font-black leading-tight tracking-tighter mb-4 ${className}`}>
    {children}
  </h3>
);

Card.Description = ({ children, className = "" }) => (
  <p className={`text-slate-500 font-medium leading-relaxed mb-8 ${className}`}>
    {children}
  </p>
);

Card.Footer = ({ children, className = "" }) => (
  <div className={`mt-auto pt-6 border-t border-slate-50 flex items-center justify-between ${className}`}>
    {children}
  </div>
);

Card.Action = ({ icon: Icon = ArrowUpRight }) => (
  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center self-end group-hover:bg-indigo-600 transition-all">
    <Icon size={20} />
  </div>
);

// --- [ PRESET COMPOSITIONS ] ---

export const LibraryCard = ({ title, tag, description, colorClass }) => (
  <Card className="group min-h-[400px]">
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClass} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity`} />
    <Card.Badge>{tag}</Card.Badge>
    <Card.Title>{title}</Card.Title>
    <Card.Description>{description}</Card.Description>
    <Card.Action />
  </Card>
);

export const PulseCard = ({ user, content, stats, type = "rant" }) => (
  <Card variant="default" className="border-l-8 border-l-rose-400">
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500">
          <MoreHorizontal size={14} />
        </div>
        <span className="font-black text-[10px] uppercase tracking-widest text-slate-400">{user}</span>
      </div>
    </div>
    <p className="text-2xl font-medium text-slate-800 italic mb-8">"{content}"</p>
    <Card.Footer>
      <div className="flex gap-6">
        {stats.map((s, i) => (
          <span key={i} className="flex items-center gap-2 text-xs font-black text-slate-300">
             <s.icon size={16} /> {s.value}
          </span>
        ))}
      </div>
    </Card.Footer>
  </Card>
);

export default Card;