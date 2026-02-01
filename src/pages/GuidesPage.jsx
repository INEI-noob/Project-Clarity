import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Search, ArrowRight, Clock, BookOpen } from 'lucide-react';

const GuidesPage = ({ setPage }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const guides = [
    {
      id: 'guide-coming-out',
      title: 'Coming Out',
      subtitle: 'On your own terms, in your own time',
      description: 'Navigate the when, who, and how of sharing your identity—while prioritizing your safety and wellbeing.',
      icon: '🌱',
      color: 'indigo',
      readTime: '12 min',
      difficulty: 'Gentle',
      featured: true
    },
    {
      id: 'guide-gender-identity',
      title: 'Understanding Gender',
      subtitle: 'Beyond the binary',
      description: 'Explore the beautiful spectrum of gender identity. No pressure, no labels required—just space to discover.',
      icon: '🦋',
      color: 'purple',
      readTime: '15 min',
      difficulty: 'Gentle',
      featured: true
    },
    {
      id: 'guide-finding-community',
      title: 'Finding Community',
      subtitle: 'Building chosen family',
      description: 'Discover how to find safe spaces, online and offline, and build relationships that affirm and support you.',
      icon: '🤝',
      color: 'rose',
      readTime: '10 min',
      difficulty: 'Moderate',
      featured: false
    },
    {
      id: 'guide-digital-safety',
      title: 'Digital Safety',
      subtitle: 'Protecting yourself online',
      description: 'Keep your privacy secure while finding community. Tips for anonymity, security, and peace of mind.',
      icon: '🔒',
      color: 'cyan',
      readTime: '8 min',
      difficulty: 'Essential',
      featured: false
    },
    {
      id: 'guide-healthcare',
      title: 'Healthcare',
      subtitle: 'Affirming care in South Africa',
      description: 'Find LGBTQ+-friendly healthcare providers, understand HRT options, and navigate medical aid.',
      icon: '🏥',
      color: 'teal',
      readTime: '12 min',
      difficulty: 'Moderate',
      featured: false
    },
    {
      id: 'guide-legal-rights',
      title: 'Legal Rights',
      subtitle: 'Know your protections',
      description: 'Understanding your rights under South African law, from marriage equality to discrimination protection.',
      icon: '⚖️',
      color: 'amber',
      readTime: '10 min',
      difficulty: 'Moderate',
      featured: false
    },
    {
      id: 'guide-relationships',
      title: 'Relationships',
      subtitle: 'Queer love and connection',
      description: 'Navigating dating, partnership, and love as an LGBTQ+ person in South Africa.',
      icon: '💕',
      color: 'pink',
      readTime: '11 min',
      difficulty: 'Gentle',
      featured: false
    },
    {
      id: 'guide-spirituality',
      title: 'Spirituality & Faith',
      subtitle: 'Your faith journey matters',
      description: 'Reconciling faith with identity. Finding affirming religious communities and spiritual practices.',
      icon: '🕊️',
      color: 'violet',
      readTime: '9 min',
      difficulty: 'Gentle',
      featured: false
    },
    {
      id: 'guide-additional',
      title: 'More Resources',
      subtitle: 'External links and further reading',
      description: 'Books, podcasts, organizations, and crisis resources for continued support.',
      icon: '📚',
      color: 'slate',
      readTime: '5 min',
      difficulty: 'Easy',
      featured: false
    }
  ];

  const filteredGuides = guides.filter(guide => 
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredGuides = filteredGuides.filter(g => g.featured);
  const regularGuides = filteredGuides.filter(g => !g.featured);

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

  return (
    <div className="relative min-h-screen pt-32 pb-32 px-4 md:px-6">
      {/* Background Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-40 left-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-50 flex items-center justify-center text-indigo-600 shadow-lg">
                  <Compass size={24} />
                </div>
                <div>
                  <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs block">The Library</span>
                  <span className="text-slate-400 text-xs">Guidance for every step</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[0.95] mb-6 tracking-tight">
                Resources & <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500">Guides</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                Curated wisdom to help you navigate identity, community, and life in South Africa. 
                Take what you need, leave what you don't.
              </p>
            </div>

            {/* Search */}
            <div className="lg:w-96">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text"
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 border border-slate-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-slate-700 placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Guides */}
        {!searchQuery && featuredGuides.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Featured Paths</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
              <Sparkles className="text-amber-400" size={20} />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredGuides.map((guide, i) => (
                <GuideCard key={guide.id} guide={guide} index={i} onClick={() => setPage(guide.id)} getColorClasses={getColorClasses} featured />
              ))}
            </div>
          </div>
        )}

        {/* All Guides Grid */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            {searchQuery ? `Results for "${searchQuery}"` : 'All Guides'}
          </h2>
          
          {filteredGuides.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide, i) => (
                <GuideCard key={guide.id} guide={guide} index={i} onClick={() => setPage(guide.id)} getColorClasses={getColorClasses} />
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 glass-sanctuary rounded-[3rem]">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No guides found</h3>
              <p className="text-slate-500 mb-6">Try a different search term</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const GuideCard = ({ guide, index, onClick, getColorClasses, featured }) => {
  const colors = getColorClasses(guide.color);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className={`group relative cursor-pointer ${featured ? 'md:col-span-1' : ''}`}
    >
      {/* Hover Gradient Border */}
      <div className={`absolute -inset-[1px] bg-gradient-to-r ${colors.split(' ')[0]} ${colors.split(' ')[2]} rounded-[2.5rem] opacity-0 group-hover:opacity-70 transition-opacity duration-500 blur-sm`} />
      
      <div className={`relative glass-sanctuary rounded-[2.4rem] p-8 h-full flex flex-col hover:shadow-2xl transition-all duration-300 ${featured ? 'min-h-[320px]' : ''}`}>
        {/* Top Color Line */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.split(' ')[0]} ${colors.split(' ')[2]} opacity-0 group-hover:opacity-100 transition-opacity rounded-t-[2.4rem]`} />
        
        {/* Icon & Difficulty */}
        <div className="flex justify-between items-start mb-6">
          <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{guide.icon}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${colors.split(' ').slice(3).join(' ')}`}>
            {guide.difficulty}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className={`${featured ? 'text-3xl' : 'text-2xl'} font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors`}>
            {guide.title}
          </h3>
          <p className="text-sm text-slate-500 font-medium mb-4">{guide.subtitle}</p>
          <p className="text-slate-600 leading-relaxed text-sm mb-6">
            {guide.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Clock size={14} />
            {guide.readTime}
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 group-hover:gap-3 transition-all">
            Read <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GuidesPage;