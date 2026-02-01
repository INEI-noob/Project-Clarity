import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  ArrowUpRight, 
  Sparkles, 
  ChevronRight, 
  RefreshCcw, 
  Heart, 
  Shield, 
  Compass,
  Clock,
  Bookmark,
  Wind,
  Star,
  Search,
  Filter,
  X,
  ChevronDown
} from 'lucide-react';

/**
 * ENHANCED GUIDES PAGE - The Sapphire Library
 * A sacred space for knowledge discovery
 */

const CATEGORIES = [
  { id: 'all', label: 'All Paths', icon: Compass, color: 'from-slate-400 to-slate-600' },
  { id: 'identity', label: 'Identity', icon: Sparkles, color: 'from-indigo-400 to-purple-600' },
  { id: 'social', label: 'Connection', icon: Heart, color: 'from-rose-400 to-pink-600' },
  { id: 'safety', label: 'Safety', icon: Shield, color: 'from-cyan-400 to-blue-600' },
  { id: 'spirit', label: 'Wellbeing', icon: Wind, color: 'from-amber-400 to-orange-600' }
];

const GUIDES = [
  { 
    id: 1,
    title: "Gender Fluidity", 
    desc: "Understanding the spectrum of identity beyond the binary. A gentle exploration of self.", 
    tag: "Identity", 
    color: "indigo",
    readTime: "12 min",
    difficulty: "Gentle",
    saved: false,
    featured: true
  },
  { 
    id: 2,
    title: "Chosen Family", 
    desc: "Building nourishing support systems outside traditional structures. You are not alone.", 
    tag: "Social", 
    color: "rose",
    readTime: "15 min",
    difficulty: "Moderate",
    saved: true,
    featured: false
  },
  { 
    id: 3,
    title: "Digital Safety", 
    desc: "Protecting your privacy and mental health in online queer spaces. Safety first.", 
    tag: "Safety", 
    color: "cyan",
    readTime: "8 min",
    difficulty: "Essential",
    saved: false,
    featured: false
  },
  { 
    id: 4,
    title: "Queer Joy", 
    desc: "Finding and celebrating happiness in the everyday journey. You deserve delight.", 
    tag: "Spirit", 
    color: "amber",
    readTime: "10 min",
    difficulty: "Gentle",
    saved: false,
    featured: true
  },
  { 
    id: 5,
    title: "Coming Out", 
    desc: "Navigating the journey of sharing your truth. On your own terms, in your own time.", 
    tag: "Identity", 
    color: "indigo",
    readTime: "20 min",
    difficulty: "Intense",
    saved: false,
    featured: false
  },
  { 
    id: 6,
    title: "Allyship", 
    desc: "How to support the community and be a true accomplice in liberation.", 
    tag: "Social", 
    color: "rose",
    readTime: "14 min",
    difficulty: "Moderate",
    saved: false,
    featured: false
  }
];

const PathFinder = ({ isOpen, onClose, guides }) => {
  const [step, setStep] = useState(0);
  const [recommendation, setRecommendation] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const questions = [
    { 
      q: "What brought you here today?", 
      subtitle: "Choose what resonates most",
      options: [
        { label: "I'm questioning", icon: "🌱", vibe: "gentle" },
        { label: "I need support", icon: "🤝", vibe: "support" },
        { label: "I'm celebrating", icon: "✨", vibe: "joy" },
        { label: "I'm worried", icon: "🌧️", vibe: "safety" }
      ]
    },
    { 
      q: "What area calls to you?", 
      subtitle: "Select your focus",
      options: [
        { label: "Myself", desc: "Identity & Internal", icon: "🦋" },
        { label: "Others", desc: "Relationships & Community", icon: "🌉" },
        { label: "Safety", desc: "Protection & Privacy", icon: "🛡️" },
        { label: "Spirit", desc: "Joy & Mindfulness", icon: "🔥" }
      ]
    }
  ];

  const handleSelect = (index) => {
    const newSelections = [...selectedOptions, index];
    setSelectedOptions(newSelections);
    
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 400);
    } else {
      // Match logic based on selections
      const match = guides.find(g => {
        if (newSelections[0] === 0 && g.tag === 'Identity') return true;
        if (newSelections[0] === 1 && g.tag === 'Social') return true;
        if (newSelections[0] === 2 && g.tag === 'Spirit') return true;
        if (newSelections[0] === 3 && g.tag === 'Safety') return true;
        return g.id === 1; // Default
      }) || guides[0];
      
      setTimeout(() => setRecommendation(match), 600);
    }
  };

  const reset = () => {
    setStep(0);
    setRecommendation(null);
    setSelectedOptions([]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-xl flex items-center justify-center p-4"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 30, opacity: 0 }} 
          animate={{ scale: 1, y: 0, opacity: 1 }} 
          exit={{ scale: 0.9, y: 30, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto"
        >
          {/* Ambient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-rose-50/50 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-200/30 to-transparent rounded-full blur-3xl" />
          
          <div className="relative p-8 md:p-12">
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors z-20"
            >
              <X size={20} className="text-slate-600" />
            </button>

            {!recommendation ? (
              <div className="relative z-10">
                {/* Progress */}
                <div className="flex gap-2 mb-8">
                  {questions.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                        i <= step ? 'bg-indigo-500' : 'bg-slate-200'
                      }`} 
                    />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2 block">
                      Question {step + 1} of {questions.length}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                      {questions[step].q}
                    </h3>
                    <p className="text-slate-500 mb-8">{questions[step].subtitle}</p>

                    <div className="grid gap-3">
                      {questions[step].options.map((opt, i) => (
                        <motion.button 
                          key={i}
                          onClick={() => handleSelect(i)}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className="p-5 rounded-2xl border-2 border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/30 text-left transition-all flex items-center gap-4 group bg-white/60 backdrop-blur-sm"
                        >
                          <span className="text-2xl">{opt.icon}</span>
                          <div className="flex-1">
                            <span className="block font-bold text-lg text-slate-900">{opt.label}</span>
                            {opt.desc && <span className="text-sm text-slate-500">{opt.desc}</span>}
                          </div>
                          <ChevronRight className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 text-center py-8"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-200"
                >
                  <Sparkles size={32} />
                </motion.div>
                
                <h3 className="text-3xl font-bold text-slate-900 mb-2">Your path awaits</h3>
                <p className="text-slate-500 mb-8">Based on your energy, we recommend:</p>
                
                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-slate-50 to-white border border-slate-100 text-left mb-8 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-shadow">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${CATEGORIES.find(c => c.id === recommendation.color)?.color || 'from-indigo-400 to-purple-400'}`} />
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-${recommendation.color}-100 text-${recommendation.color}-600`}>
                      {recommendation.tag}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock size={12} />
                      {recommendation.readTime}
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold mb-3 text-slate-900">{recommendation.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{recommendation.desc}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={onClose} 
                    className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Begin Reading
                  </button>
                  <button 
                    onClick={reset} 
                    className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                  >
                    <RefreshCcw size={18} /> Find Another
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const GuideCard = ({ guide, index }) => {
  const colorMap = {
    indigo: 'from-indigo-400 to-purple-500',
    rose: 'from-rose-400 to-pink-500',
    cyan: 'from-cyan-400 to-blue-500',
    amber: 'from-amber-400 to-orange-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      {/* Iridescent border effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-rose-200 via-indigo-200 to-cyan-200 rounded-[2.5rem] opacity-0 group-hover:opacity-70 transition-opacity duration-500 blur-sm" />
      
      <div className="relative glass-sanctuary p-8 h-full flex flex-col rounded-[2.4rem] overflow-hidden">
        {/* Top gradient line */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colorMap[guide.color]} opacity-0 group-hover:opacity-100 transition-opacity`} />
        
        <div className="flex justify-between items-start mb-6">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-${guide.color}-50 text-${guide.color}-600 border border-${guide.color}-100`}>
            {guide.tag}
          </span>
          <button className={`p-2 rounded-full transition-colors ${guide.saved ? 'text-rose-500 bg-rose-50' : 'text-slate-300 hover:text-rose-400 hover:bg-rose-50'}`}>
            <Heart size={18} className={guide.saved ? 'fill-current' : ''} />
          </button>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900 tracking-tight group-hover:text-indigo-900 transition-colors">
          {guide.title}
        </h3>
        
        <p className="text-slate-600 leading-relaxed mb-6 flex-1">
          {guide.desc}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100/60">
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Clock size={12} /> {guide.readTime}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>{guide.difficulty}</span>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 45 }}
            className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-colors cursor-pointer"
          >
            <ArrowUpRight size={18} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const GuidesPage = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = GUIDES.filter(guide => {
    const matchesCategory = activeCategory === 'all' || guide.tag.toLowerCase() === activeCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         guide.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredGuides = GUIDES.filter(g => g.featured);

  return (
    <div className="relative min-h-screen pt-32 pb-32 px-4 md:px-6">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-16 md:flex justify-between items-end gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <BookOpen size={24} />
              </div>
              <div>
                <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs block">The Library</span>
                <span className="text-slate-400 text-xs">Sacred Knowledge</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-4 tracking-tight">
              Resources & <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Guides</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
              Curated paths to help you navigate your journey with confidence, care, and community wisdom.
            </p>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => setShowQuiz(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-slate-900 text-white rounded-full font-bold overflow-hidden flex items-center gap-3 shadow-xl shadow-slate-900/20 hover:shadow-2xl transition-all mt-8 md:mt-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Compass className="relative z-10 group-hover:rotate-45 transition-transform duration-500" size={20} />
            <span className="relative z-10">Find My Path</span>
          </motion.button>
        </div>

        {/* Search and Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 space-y-6"
        >
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-slate-700 placeholder:text-slate-400"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat.id 
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <cat.icon size={16} />
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Section (if no search/filter) */}
        {!searchQuery && activeCategory === 'all' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-16"
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <Star size={16} /> Featured Paths
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredGuides.map((guide, i) => (
                <div key={guide.id} className="md:col-span-1">
                  <GuideCard guide={guide} index={i} />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Main Grid */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">
            {searchQuery ? 'Search Results' : 'All Guides'}
          </h2>
          
          {filteredGuides.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide, i) => (
                <GuideCard key={guide.id} guide={guide} index={i} />
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white/50 rounded-[3rem] border border-slate-100"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No guides found</h3>
              <p className="text-slate-500">Try adjusting your search or category filter</p>
            </motion.div>
          )}
        </div>

        {/* Daily Wisdom Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-indigo-50 via-white to-rose-50 border border-indigo-100/50 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400" />
          <Wind className="w-8 h-8 text-indigo-400 mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-bold text-slate-900 mb-3 italic">"Knowledge is the beginning of self-love."</h3>
          <p className="text-slate-600">Take your time exploring. There's no rush to understand everything at once.</p>
        </motion.div>
      </div>

      {/* Path Finder Modal */}
      <PathFinder isOpen={showQuiz} onClose={() => setShowQuiz(false)} guides={GUIDES} />
    </div>
  );
};

export default GuidesPage;