import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowUpRight, Sparkles, ChevronRight, RefreshCcw, Heart, Shield, Compass } from 'lucide-react';

const Card = ({ children, className = "" }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className={`relative group p-10 rounded-[3rem] bg-white border border-slate-100 flex flex-col justify-between overflow-hidden transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const GuidesPage = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [recommendation, setRecommendation] = useState(null);

  const guides = [
    { title: "Gender Fluidity", desc: "Understanding the spectrum of identity in the modern digital age.", tag: "Identity", color: "bg-indigo-50 text-indigo-600" },
    { title: "Chosen Family", d: "How to build and nurture support systems outside traditional structures.", tag: "Social", color: "bg-rose-50 text-rose-600" },
    { title: "Digital Safety", desc: "Protecting your privacy and mental health in online queer spaces.", tag: "Safety", color: "bg-cyan-50 text-cyan-600" },
    { title: "Queer Joy", desc: "Finding and celebrating happiness in the everyday journey.", tag: "Spirit", color: "bg-amber-50 text-amber-600" }
  ];

  const quizQuestions = [
    { q: "How are you feeling today?", options: ["Exploring", "In need of support", "Curious", "Vulnerable"] },
    { q: "What's your primary focus?", options: ["Identity", "Connection", "Protection", "Mindset"] }
  ];

  const handleQuizFinish = () => {
    // Mock logic for recommendation
    setRecommendation(guides[Math.floor(Math.random() * guides.length)]);
  };

  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <BookOpen className="text-indigo-600" size={32} />
            <span className="text-indigo-600 font-black tracking-[0.3em] uppercase text-sm">The Library</span>
          </div>
          <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter text-slate-900 mb-4 leading-none">Resources.</h2>
          <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl">
            Curated knowledge to help you navigate your journey with confidence.
          </p>
        </div>
        
        <button 
          onClick={() => setShowQuiz(true)}
          className="group relative px-8 py-5 bg-slate-900 text-white rounded-full font-black text-lg overflow-hidden flex items-center gap-3 transition-transform hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10">Start My Path</span>
          <Compass className="relative z-10 group-hover:rotate-45 transition-transform duration-500" />
        </button>
      </div>

      {/* Discovery Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="max-w-2xl w-full bg-white border border-slate-100 shadow-2xl rounded-[4rem] p-12 md:p-20 relative overflow-hidden"
            >
              {!recommendation ? (
                <div className="relative z-10">
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-8 block">Step {quizStep + 1} of 2</span>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-12 italic leading-tight">
                    {quizQuestions[quizStep].q}
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {quizQuestions[quizStep].options.map((opt, i) => (
                      <button 
                        key={i}
                        onClick={() => quizStep === 0 ? setQuizStep(1) : handleQuizFinish()}
                        className="p-6 rounded-3xl border-2 border-slate-50 hover:border-indigo-200 hover:bg-indigo-50/50 text-left font-black text-xl text-slate-700 transition-all flex justify-between items-center group"
                      >
                        {opt}
                        <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <Sparkles size={32} />
                  </div>
                  <h3 className="text-4xl font-black tracking-tighter text-slate-900 mb-4">We found a path for you.</h3>
                  <p className="text-slate-500 font-medium mb-10">Based on your energy, we recommend starting here:</p>
                  
                  <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-left mb-10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2 block">{recommendation.tag}</span>
                    <h4 className="text-3xl font-black mb-3">{recommendation.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">{recommendation.desc}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => setShowQuiz(false)} className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-indigo-600 transition-colors">Read Now</button>
                    <button onClick={() => { setRecommendation(null); setQuizStep(0); }} className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                      <RefreshCcw size={18} /> Restart
                    </button>
                  </div>
                </div>
              )}
              
              <button 
                onClick={() => setShowQuiz(false)}
                className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors font-black uppercase text-[10px] tracking-widest"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map((guide, i) => (
          <Card key={i}>
            <div>
              <span className={`inline-block px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 ${guide.color}`}>
                {guide.tag}
              </span>
              <h3 className="text-4xl font-black mb-4 tracking-tight">{guide.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{guide.desc}</p>
            </div>
            <div className="mt-12 flex justify-end">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-all duration-300">
                <ArrowUpRight size={24} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GuidesPage;