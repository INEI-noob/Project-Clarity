import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Rainbow, BookOpen, Flame, ChevronRight, Heart } from 'lucide-react';

/**
 * IridescentCard - A reusable high-personality container using index.css classes
 */
const IridescentCard = ({ children, className = "" }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.02 }}
    className={`relative group p-1 rounded-[2.5rem] iridescent-border shadow-xl transition-all ${className}`}
  >
    <div className="bg-white/90 backdrop-blur-2xl rounded-[2.3rem] p-10 h-full w-full flex flex-col">
      {children}
    </div>
  </motion.div>
);

const SectionHeading = ({ title, subtitle, gradient }) => (
  <div className="mb-16">
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`text-6xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r ${gradient} leading-tight`}
    >
      {title}
    </motion.h2>
    <p className="text-2xl text-slate-500 font-medium max-w-2xl leading-relaxed">{subtitle}</p>
  </div>
);

const HomePage = ({ setPage }) => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-10">
              <span className="h-[2px] w-16 bg-gradient-to-r from-indigo-500 to-transparent" />
              <span className="text-indigo-500 font-black tracking-[0.2em] uppercase text-xs">A Digital Sanctuary</span>
            </div>
            
            <h1 className="text-7xl md:text-[10rem] font-black text-slate-900 leading-[0.85] mb-12 tracking-tighter">
              Softly <br />
              <span className="italic font-serif-custom text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Queer,</span> <br />
              Loudly <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-purple-500 to-indigo-500">
                Sapphire.
              </span>
            </h1>

            <p className="text-2xl text-slate-600 mb-12 max-w-lg leading-relaxed font-medium">
              Find your reflection in a radical digital garden built for the LGBTQIA+ community. No noise, just you.
            </p>

            <div className="flex flex-wrap gap-6">
              <button onClick={() => setPage('guides')} className="btn-primary">
                <span className="relative z-10">Start Exploring</span>
                <Sparkles className="w-6 h-6 relative z-10" />
              </button>
              
              <button onClick={() => setPage('forum')} className="btn-secondary">
                The Rant Room
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative aspect-[4/5] hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-200 via-indigo-200 to-cyan-100 rounded-[5rem] rotate-12 scale-95 opacity-40 blur-3xl animate-pulse" />
            <div className="relative h-full w-full glass-card overflow-hidden group">
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Rainbow className="w-64 h-64 text-indigo-50 opacity-50 group-hover:text-rose-100 group-hover:rotate-45 transition-all duration-[3000ms]" />
               </div>
               
               <div className="absolute bottom-12 left-12 right-12 p-10 bg-white/80 backdrop-blur-xl rounded-[3rem] border border-white/50 shadow-xl transform group-hover:-translate-y-4 transition-transform duration-700">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(i => <Heart key={i} size={14} className="fill-rose-400 text-rose-400" />)}
                  </div>
                  <p className="text-indigo-900 font-black text-2xl italic leading-tight">"A space that breathes with you."</p>
                  <p className="text-indigo-600/60 font-bold text-sm mt-4 uppercase tracking-widest">— Project Sapphire Alpha</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <SectionHeading 
          title="Designed for Safety."
          subtitle="Explore the pillars of Project Sapphire. Every corner of this site is built to celebrate your identity."
          gradient="from-indigo-600 to-cyan-500"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <IridescentCard className="h-full">
              <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-200">
                <BookOpen size={32} />
              </div>
              <h3 className="text-5xl font-black mb-6 italic tracking-tighter">Guided Discovery</h3>
              <p className="text-xl text-slate-500 max-w-md leading-relaxed mb-8">
                Curated paths through gender, sexuality, and community. We help you find the language for who you are.
              </p>
              <button onClick={() => setPage('guides')} className="w-fit flex items-center gap-3 text-indigo-600 font-black text-lg group">
                Enter Library 
                <div className="w-10 h-10 rounded-full border-2 border-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <ChevronRight />
                </div>
              </button>
            </IridescentCard>
          </div>

          <div className="md:col-span-5">
            <div className="h-full bg-slate-900 rounded-[3rem] p-12 text-white flex flex-col justify-end relative overflow-hidden group min-h-[450px]">
              <Flame className="absolute -top-10 -right-10 w-64 h-64 opacity-10 text-rose-500 group-hover:scale-125 transition-transform duration-[2000ms]" />
              <div className="relative z-10">
                <h3 className="text-4xl font-black mb-4">The Pulse</h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed mb-8">
                  Venting is healing. Share your anonymous rants, celebrations, and questions with a community that actually gets it.
                </p>
                <button 
                  onClick={() => setPage('forum')}
                  className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black hover:bg-rose-400 hover:text-white transition-all"
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