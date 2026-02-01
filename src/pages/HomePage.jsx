import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Rainbow, BookOpen, Flame, ChevronRight, Heart, Shield, Users, MessageCircle } from 'lucide-react';

/**
 * Enhanced Iridescent Card with depth layers
 */
const IridescentCard = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.16, 1, 0.3, 1] 
      }}
      whileHover={{ y: -12, scale: 1.02 }}
      className={`relative group ${className}`}
    >
      {/* Animated border gradient */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-rose-200 via-indigo-200 to-cyan-200 rounded-[2.5rem] opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      {/* Main card body */}
      <div className="relative glass-sanctuary p-10 h-full w-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

const SectionHeading = ({ title, subtitle, gradient }) => (
  <div className="mb-20">
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex items-center gap-4 mb-6"
    >
      <div className="h-px w-12 bg-gradient-to-r from-indigo-400 to-transparent" />
      <span className="text-indigo-500 font-bold tracking-widest uppercase text-xs">Explore</span>
    </motion.div>
    
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${gradient} leading-[1.1] tracking-tight`}
    >
      {title}
    </motion.h2>
    
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed"
    >
      {subtitle}
    </motion.p>
  </div>
);

const SafetyBadge = ({ icon: Icon, text }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-white/60 text-slate-600 text-sm font-medium"
  >
    <Icon size={16} className="text-indigo-500" />
    {text}
  </motion.div>
);

const HomePage = ({ setPage }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  
  // Smooth spring physics for floating elements
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set((e.clientX - rect.left - rect.width / 2) / 50);
      mouseY.set((e.clientY - rect.top - rect.height / 2) / 50);
    }
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative overflow-hidden">
      {/* Hero Section with Parallax */}
      <motion.section style={{ opacity, scale }} className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-20">
        {/* Floating ambient orbs following mouse */}
        <motion.div 
          style={{ x: mouseX, y: mouseY }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-purple-200/30 rounded-full blur-3xl pointer-events-none"
        />
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-16 bg-gradient-to-r from-indigo-500 to-transparent" />
              <span className="text-indigo-600 font-bold tracking-[0.2em] uppercase text-xs">A Digital Sanctuary</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold text-slate-900 leading-[0.9] mb-8 tracking-tight">
              Softly <br />
              <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Queer,</span> <br />
              Loudly <br />
              <span className="text-gradient-fluid block mt-2">
                Sapphire.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
              Find your reflection in a radical digital garden built for the LGBTQIA+ community. No noise, just you.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPage('guides')} 
                className="btn-primary"
              >
                <span>Start Exploring</span>
                <Sparkles className="w-5 h-5" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPage('forum')} 
                className="btn-secondary"
              >
                The Rant Room
              </motion.button>
            </div>

            {/* Safety Indicators */}
            <div className="flex flex-wrap gap-3">
              <SafetyBadge icon={Shield} text="Moderated Space" />
              <SafetyBadge icon={Users} text="500+ Community Members" />
              <SafetyBadge icon={MessageCircle} text="Anonymous Sharing" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative aspect-[4/5] hidden lg:block"
          >
            {/* Layered glass effect */}
            <motion.div 
              animate={{ 
                rotate: [12, 15, 12],
                scale: [0.95, 1, 0.95]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute inset-0 bg-gradient-to-tr from-rose-200 via-indigo-200 to-cyan-100 rounded-[4rem] opacity-40 blur-3xl" 
            />
            
            <motion.div 
              style={{ y }}
              className="relative h-full w-full glass-sanctuary overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-rose-50/50" />
              
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30"
              >
                <Rainbow className="w-96 h-96 text-indigo-300" />
              </motion.div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 2, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  <Heart className="w-32 h-32 text-rose-400/20 fill-rose-400/20" />
                </motion.div>
              </div>
              
              <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-700">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                    >
                      <Heart size={14} className="fill-rose-400 text-rose-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-slate-800 font-bold text-2xl italic leading-tight mb-2">
                  "A space that breathes with you."
                </p>
                <p className="text-slate-500 font-medium text-sm uppercase tracking-widest">
                  — Project Sapphire Alpha
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Feature Bento Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative">
        <SectionHeading 
          title="Designed for Safety."
          subtitle="Explore the pillars of Project Sapphire. Every corner of this site is built to celebrate your identity while keeping you safe."
          gradient="from-indigo-600 via-purple-500 to-cyan-500"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large Card - Guides */}
          <div className="md:col-span-7">
            <IridescentCard delay={0} className="h-full min-h-[500px]">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-200">
                <BookOpen size={28} />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-4 italic tracking-tight text-slate-900">
                Guided Discovery
              </h3>
              <p className="text-lg text-slate-600 max-w-md leading-relaxed mb-8">
                Curated paths through gender, sexuality, and community. We help you find the language for who you are without forcing labels.
              </p>
              <motion.button 
                onClick={() => setPage('guides')} 
                className="w-fit flex items-center gap-3 text-indigo-600 font-bold text-lg group/btn mt-auto"
                whileHover={{ x: 5 }}
              >
                Enter Library 
                <div className="w-10 h-10 rounded-full border-2 border-indigo-200 flex items-center justify-center group-hover/btn:bg-indigo-600 group-hover/btn:text-white transition-all duration-300">
                  <ChevronRight size={20} />
                </div>
              </motion.button>
            </IridescentCard>
          </div>

          {/* Dark Card - Pulse */}
          <div className="md:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -12 }}
              className="h-full min-h-[500px] bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col justify-end relative overflow-hidden group"
            >
              {/* Animated flame background */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="absolute -top-10 -right-10 w-96 h-96 opacity-10"
              >
                <Flame className="w-full h-full text-rose-500" />
              </motion.div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-rose-500/30">
                  <MessageCircle size={28} className="text-white" />
                </div>
                <h3 className="text-4xl font-bold mb-4 tracking-tight">The Pulse</h3>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  Venting is healing. Share your anonymous rants, celebrations, and questions with a community that actually gets it. No judgment, ever.
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage('forum')}
                  className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-rose-400 hover:text-white transition-all duration-300"
                >
                  Join the Pulse
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row - Additional Features */}
          <div className="md:col-span-6">
            <IridescentCard delay={0.3} className="h-full">
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Community First</h4>
              <p className="text-slate-600">Peer support networks and identity exploration circles</p>
            </IridescentCard>
          </div>
          
          <div className="md:col-span-6">
            <IridescentCard delay={0.4} className="h-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-[2.5rem]">
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Resource Library</h4>
              <p className="text-slate-600">Healthcare, legal aid, and crisis support directories</p>
            </IridescentCard>
          </div>
        </div>
      </section>

      {/* Trust Statement Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-sanctuary p-12 md:p-20"
          >
            <Shield className="w-16 h-16 text-indigo-500 mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Your Safety is Sacred
            </h3>
            <p className="text-xl text-slate-600 leading-relaxed">
              Project Sapphire is built on principles of consent, anonymity, and radical acceptance. 
              No data tracking. No judgment. Just a soft place to land when the world feels too hard.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;