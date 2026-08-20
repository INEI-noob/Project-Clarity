import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, 
  Clock, 
  ChevronLeft, 
  Heart,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Search,
  Compass,
  Users,
  Lock,
  Stethoscope,
  Scale,
  Flame,
  MessageCircle,
  Plus
} from 'lucide-react';
import PageShell from '../components/layout/PageShell';

const INITIAL_GUIDES = [
  { id: 'guide-coming-out', title: 'Coming Out', subtitle: 'On your own terms', description: 'Navigate the when, who, and how of sharing your identity safely in the South African context.', icon: Compass, color: 'indigo', readTime: '12 min', difficulty: 'Gentle', featured: true },
  { id: 'guide-gender-identity', title: 'Understanding Gender', subtitle: 'Beyond the binary', description: 'Explore the spectrum of gender identity without pressure or labels. You are already enough.', icon: Sparkles, color: 'purple', readTime: '15 min', difficulty: 'Gentle', featured: true },
  { id: 'guide-finding-community', title: 'Finding Community', subtitle: 'You are not alone', description: 'Discover safe spaces in Cape Town, Joburg, and beyond. Build your chosen family.', icon: Users, color: 'rose', readTime: '10 min', difficulty: 'Moderate', featured: true },
  { id: 'guide-digital-safety', title: 'Digital Safety', subtitle: 'Protect your peace', description: 'Keep your online life private in a country where phones are shared and privacy is survival.', icon: Lock, color: 'cyan', readTime: '8 min', difficulty: 'Essential', featured: false },
  { id: 'guide-healthcare', title: 'Healthcare', subtitle: 'Affirming care in SA', description: 'Navigate public waiting lists, find private providers, and know your rights with medical aid.', icon: Stethoscope, color: 'teal', readTime: '12 min', difficulty: 'Moderate', featured: false },
  { id: 'guide-legal-rights', title: 'Legal Rights', subtitle: 'The law vs. reality', description: 'Know your constitutional protections and how to enforce them when officials refuse.', icon: Scale, color: 'amber', readTime: '10 min', difficulty: 'Moderate', featured: false },
  { id: 'guide-relationships', title: 'Relationships', subtitle: 'Love in the margins', description: 'Dating when the pool is small, safety concerns are real, and everyone knows everyone.', icon: Heart, color: 'pink', readTime: '11 min', difficulty: 'Gentle', featured: false },
  { id: 'guide-spirituality', title: 'Spirituality & Faith', subtitle: 'God, ancestors, you', description: 'Heal the wound between religion and identity. Affirming theology for SA contexts.', icon: Flame, color: 'violet', readTime: '9 min', difficulty: 'Gentle', featured: false },
  { id: 'guide-additional', title: 'Extended Guides', subtitle: 'Money, work, exits', description: 'Queer finance, workplace navigation, and strategies for leaving unsafe homes.', icon: Plus, color: 'slate', readTime: '20 min', difficulty: 'Advanced', featured: false }
];

const getColorClasses = (color) => {
  const map = {
    indigo: 'from-indigo-400 to-purple-500 bg-indigo-50 text-indigo-700 border-indigo-200',
    purple: 'from-purple-400 to-pink-500 bg-purple-50 text-purple-700 border-purple-200',
    rose: 'from-rose-400 to-pink-500 bg-rose-50 text-rose-700 border-rose-200',
    cyan: 'from-cyan-400 to-blue-500 bg-cyan-50 text-cyan-700 border-cyan-200',
    teal: 'from-teal-400 to-emerald-500 bg-teal-50 text-teal-700 border-teal-200',
    amber: 'from-amber-400 to-orange-500 bg-amber-50 text-amber-700 border-amber-200',
    pink: 'from-pink-400 to-rose-500 bg-pink-50 text-pink-700 border-pink-200',
    violet: 'from-violet-400 to-purple-500 bg-violet-50 text-violet-700 border-violet-200',
    slate: 'from-slate-400 to-slate-600 bg-slate-50 text-slate-700 border-slate-200'
  };
  return map[color] || map.indigo;
};

const GuideCard = ({ guide, index, onClick }) => {
  const colors = getColorClasses(guide.color);
  const colorArray = colors.split(' ');
  const IconComponent = guide.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onClick={() => onClick(guide.id)}
      className="group relative cursor-pointer"
    >
      <div className={`absolute -inset-[1px] bg-gradient-to-r ${colorArray[0]} ${colorArray[1]} rounded-[2.5rem] opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-sm`} />
      <div className="relative bg-white/90 backdrop-blur-xl border border-white/20 rounded-[2.4rem] p-8 h-full flex flex-col hover:shadow-2xl transition-all duration-500">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-4 rounded-2xl ${colorArray[2]} ${colorArray[3]} group-hover:scale-110 transition-transform duration-500`}>
            <IconComponent size={24} />
          </div>
          <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${colorArray[2]} ${colorArray[3]}`}>
            {guide.difficulty}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{guide.title}</h3>
          <p className="text-xs text-slate-500 font-bold mb-3 uppercase tracking-wider">{guide.subtitle}</p>
          <p className="text-slate-600 leading-relaxed text-sm mb-6 line-clamp-3">{guide.description}</p>
        </div>
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Clock size={14} /> {guide.readTime}
          </div>
          <div className="text-sm font-bold text-indigo-600 flex items-center gap-2 group-hover:gap-3 transition-all">
            Read <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const GuidesPage = ({ setPage }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = INITIAL_GUIDES.filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredGuides = filteredGuides.filter(g => g.featured);
  const otherGuides = filteredGuides.filter(g => !g.featured);

  return (
    <PageShell maxWidth="max-w-7xl" tone="indigo">
      {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight"
            >
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Library</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 font-medium leading-relaxed"
            >
              Curated wisdom for your journey in South Africa. <br className="hidden md:block" />
              No judgment, no pressure—just survival and thriving.
            </motion.p>
          </div>
          
          {/* Search Input - FIXED */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative w-full md:w-96"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-slate-500" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all"
            />
          </motion.div>
        </div>

        {/* Featured Guides */}
        {featuredGuides.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Sparkles size={14} /> Start Here
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredGuides.map((guide, i) => (
                <GuideCard key={guide.id} guide={guide} index={i} onClick={setPage} />
              ))}
            </div>
          </div>
        )}

        {/* All Guides */}
        <div>
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">
            {searchQuery ? 'Search Results' : 'All Guides'}
          </h2>
          {filteredGuides.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherGuides.map((guide, i) => (
                <GuideCard key={guide.id} guide={guide} index={i + featuredGuides.length} onClick={setPage} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-block p-4 bg-slate-50 rounded-2xl mb-4">
                <Search className="text-slate-300" size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No guides found</h3>
              <p className="text-slate-500">Try a different search term</p>
            </div>
          )}
        </div>

        {/* Help Box */}
        <div className="mt-24 p-8 md:p-12 rounded-[3rem] bg-indigo-50 border border-indigo-100 flex flex-col md:flex-row items-center gap-8">
          <div className="p-4 bg-white rounded-2xl shadow-sm text-indigo-600">
            <ShieldCheck size={32} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Can't find what you need?</h3>
            <p className="text-slate-600 mb-4">
              Our guides are living documents. If you need specific help with something not covered here, reach out to Triangle Project or check The Pulse for community wisdom.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors">
                Visit The Pulse
              </button>
              <button className="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-sm hover:border-indigo-300 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
    </PageShell>
  );
};

export default GuidesPage;