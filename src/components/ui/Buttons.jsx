import React from 'react';

/**
 * BUTTON COMPONENT
 * @param {string} variant - primary, secondary, outline, ghost
 * @param {string} size - sm, md, lg
 */
export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = "",
  icon: Icon
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-black transition-all active:scale-95 overflow-hidden group";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-indigo-600 shadow-xl shadow-indigo-100 rounded-[1.5rem]",
    secondary: "bg-white text-slate-900 border-2 border-slate-100 hover:border-rose-300 hover:bg-rose-50/30 rounded-[1.5rem]",
    outline: "border-2 border-slate-100 text-slate-600 hover:text-slate-900 hover:border-slate-300 rounded-[1.2rem]",
    ghost: "text-slate-400 hover:text-slate-900 p-2 rounded-xl"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs gap-2",
    md: "px-8 py-4 text-base gap-3",
    lg: "px-10 py-6 text-xl gap-4"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : 20} className="relative z-10" />}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

/**
 * TAB SELECTOR COMPONENT
 */
export const TabSelector = ({ options, activeValue, onChange, className = "" }) => {
  return (
    <div className={`flex gap-1 p-1.5 bg-slate-100 rounded-2xl w-fit ${className}`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
            activeValue === opt.value 
              ? 'bg-white text-slate-900 shadow-sm' 
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};