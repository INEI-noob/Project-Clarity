import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Sparkles, Rainbow, BookOpen, Flame, ChevronRight, Heart, Shield, Users, MessageCircle } from 'lucide-react';

const IridescentCard = ({ children, className = "", delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={shouldReduceMotion ? {} : { y: -5 }}
      className={`relative h-full ${className}`}
    >
      <div className="relative bg-white/80 backdrop-blur-xl p-8 md:p-10 h-full w-full flex flex-col rounded-[2.5rem] border border-slate-100 shadow-sm">
        {children}
      </div>
    </motion.div>
  );
};

const HomePage = ({ setPage }) => {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Optimized Scroll Tracking
  // We track until the element is fully scrolled out (1.0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // FIX: Adjusted ranges so items don't disappear too early
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      containerRef.current.style.setProperty('--local-mx', `${x}%`);
      containerRef.current.style.setProperty('--local-my', `${y}%`);
    }
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full">
      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, y: heroY }} 
        className="relative min-h-screen flex flex-col justify-center px-6 pt-30 pb-20"
      >
        {!shouldReduceMotion && (
          <div 
            className="absolute w-[30rem] h-[30rem] bg-indigo-100/30 rounded-full blur-[100px] pointer-events-none transition-all duration-1000 ease-out"
            style={{ 
              left: 'var(--local-mx, 50%)', 
              top: 'var(--local-my, 40%)',
              transform: 'translate(-50%, -50%)'
            }}
          />
        )}
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-18 items-center relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="h-px w-12 bg-indigo-500" />
              <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs">Project Clarity</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-slate-900 leading-[1.1] mb-8 tracking-tight">
              Softly <span className="italic font-serif text-indigo-600">Queer,</span> <br />
              Loudly <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Clarity.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed">
              Find your reflection in a radical digital garden built for the community. No noise, just you.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button 
                onClick={() => setPage('guides')} 
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
              >
                Start Exploring <Sparkles size={18} />
              </button>
              
              <button 
                onClick={() => setPage('forum')} 
                className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95"
              >
                The Rant Room
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-slate-500 text-sm font-medium"><Shield size={16}/> Moderated</div>
              <div className="flex items-center gap-2 text-slate-500 text-sm font-medium"><Users size={16}/> 500+ Members</div>
            </div>
          </div>

          <div className="relative hidden lg:block aspect-square">
            <div className="absolute inset-0 bg-indigo-50/50 rounded-[3rem] rotate-3 scale-95" />
            <div className="relative h-full w-full bg-white rounded-[3rem] border border-slate-100 shadow-2xl flex items-center justify-center overflow-hidden">
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute opacity-5"
               >
                 <Rainbow size={400} />
               </motion.div>
               <Heart size={80} className="text-rose-400 fill-rose-50" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Bento Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Designed for Safety.</h2>
          <p className="text-lg text-slate-500">Explore the pillars of our community garden.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 h-[450px]">
            <IridescentCard>
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-6">
                <BookOpen size={24} />
              </div>
              <h3 className="text-3xl font-bold mb-4">Guided Discovery</h3>
              <p className="text-slate-600 text-lg mb-8">
                Curated paths through identity. Find language for who you are without forcing labels.
              </p>
              <button 
                onClick={() => setPage('guides')} 
                className="mt-auto flex items-center gap-2 text-indigo-600 font-bold hover:underline"
              >
                Enter Library <ChevronRight size={18} />
              </button>
            </IridescentCard>
          </div>

          <div className="md:col-span-5 h-[450px]">
            <div className="h-full bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col justify-end relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center mb-6">
                  <MessageCircle size={24} />
                </div>
                <h3 className="text-3xl font-bold mb-3 text-white">The Pulse</h3>
                <p className="text-slate-400 mb-8">Anonymous rants and shared celebrations.</p>
                <button 
                  onClick={() => setPage('forum')}
                  className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-rose-400 hover:text-white transition-colors"
                >
                  Join the Pulse
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;