import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Sparkles, 
  Search, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  ChevronLeft, 
  Share2, 
  Bookmark,
  Heart,
  ShieldCheck,
  Scale,
  Stethoscope,
  Users,
  Eye,
  MessageCircle,
  AlertCircle,
  Lock,
  Globe,
  Gavel,
  Church,
  Library
} from 'lucide-react';

// --- EXPANDED DATABASE ---

const GUIDES_CONTENT = {
  'guide-coming-out': {
    title: 'Coming Out',
    sections: [
      {
        title: "On Your Own Terms",
        content: "Coming out is not a single event, but a lifelong process. In South Africa, while our constitution protects you, social realities vary. There is no 'right' way—only the way that feels safest for you."
      },
      {
        title: "Safety First",
        content: "Assess your environment. Are you financially dependent? Do you have a 'Plan B' (a friend's house or savings)? Your safety is more important than being 'out'."
      }
    ]
  },
  'guide-gender-identity': {
    title: 'Understanding Gender',
    sections: [
      {
        title: "Beyond the Binary",
        content: "Gender identity is your internal sense of being. It is different from biological sex and sexual orientation. You might identify as Transgender, Non-binary, Genderqueer, or Agender."
      },
      {
        title: "Self-Discovery",
        content: "Experiment with pronouns or names in safe spaces. Listen to your 'gender euphoria'—what makes you feel most like yourself?"
      }
    ]
  },
  'guide-finding-community': {
    title: 'Finding Community',
    sections: [
      {
        title: "Building Chosen Family",
        content: "In South Africa, community can be found in physical spaces like the Pride Shelter Trust in Cape Town or online groups. Chosen family are those who support you when biological family may not."
      },
      {
        title: "Safe Spaces",
        content: "Look for 'Pink Spots' or LGBTQ+ friendly cafes and bookstores. Universities often have queer societies (like activateWits or UCT Queer Alliance) that provide a safe entry point."
      }
    ]
  },
  'guide-digital-safety': {
    title: 'Digital Safety',
    sections: [
      {
        title: "Anonymity Online",
        content: "Use VPNs if you're browsing sensitive topics on public Wi-Fi. Be cautious of 'catfishing' on dating apps. Never share your home address with someone you haven't met in a public, safe space."
      },
      {
        title: "Social Media Privacy",
        content: "Check your 'Audience' settings on Facebook and Instagram. Use 'Close Friends' lists to share identity-related updates if you aren't fully out to all your contacts."
      }
    ]
  },
  'guide-healthcare': {
    title: 'Healthcare',
    sections: [
      {
        title: "Affirming Care",
        content: "Seek out 'Kink-aware' or LGBTQ+ affirming doctors. Organizations like PATHSA (Professional Association for Transgender Health South Africa) maintain lists of providers."
      },
      {
        title: "Medical Aid",
        content: "Some South African medical aids now cover gender-affirming surgeries and HRT, though they may require a formal diagnosis of gender dysphoria. Check your specific plan benefits."
      }
    ]
  },
  'guide-legal-rights': {
    title: 'Legal Rights',
    sections: [
      {
        title: "Constitutional Protection",
        content: "Section 9 of the Constitution prohibits discrimination. You have the right to marry (Civil Unions Act) and the right to change your gender marker (Act 49 of 2003)."
      },
      {
        title: "Workplace Rights",
        content: "The Employment Equity Act protects you from unfair dismissal based on your sexual orientation or gender identity. You cannot be fired for 'being queer'."
      }
    ]
  },
  'guide-relationships': {
    title: 'Relationships',
    sections: [
      {
        title: "Queer Love",
        content: "Navigating dating apps as a queer person in SA requires patience. Focus on communication and boundaries. Understand the difference between 'monogamy' and 'polyamory' if you are exploring non-traditional structures."
      },
      {
        title: "Domestic Partnerships",
        content: "Even if you aren't married, the law recognizes certain rights for domestic partners in South Africa, including medical aid dependency and inheritance in some cases."
      }
    ]
  },
  'guide-spirituality': {
    title: 'Spirituality & Faith',
    sections: [
      {
        title: "Affirming Faith",
        content: "Many South Africans find it hard to reconcile religion with identity. However, there are affirming churches (like the MCC) and inclusive mosques and synagogues that welcome LGBTQ+ members."
      },
      {
        title: "Inner Peace",
        content: "If organized religion isn't for you, explore secular spirituality, meditation, or ancestral practices that honor your full self."
      }
    ]
  },
  'guide-additional': {
    title: 'More Resources',
    sections: [
      {
        title: "Crisis Helplines",
        content: "SADAG (0800 567 567) and Triangle Project (021 712 6699). Keep these numbers saved in your phone for emergencies."
      },
      {
        title: "Further Reading",
        content: "Books like 'The Pink Line' by Mark Gevisser offer great insight into the global and local queer struggle."
      }
    ]
  }
};

const INITIAL_GUIDES = [
  { id: 'guide-coming-out', title: 'Coming Out', subtitle: 'On your own terms', description: 'Navigate the when, who, and how of sharing your identity safely.', icon: '🌱', color: 'indigo', readTime: '12 min', difficulty: 'Gentle', featured: true },
  { id: 'guide-gender-identity', title: 'Understanding Gender', subtitle: 'Beyond the binary', description: 'Explore the spectrum of gender identity without pressure or labels.', icon: '🦋', color: 'purple', readTime: '15 min', difficulty: 'Gentle', featured: true },
  { id: 'guide-finding-community', title: 'Finding Community', subtitle: 'Building chosen family', description: 'Discover safe spaces and build relationships that support you.', icon: '🤝', color: 'rose', readTime: '10 min', difficulty: 'Moderate', featured: false },
  { id: 'guide-digital-safety', title: 'Digital Safety', subtitle: 'Protecting yourself online', description: 'Tips for anonymity, security, and peace of mind on the web.', icon: '🔒', color: 'cyan', readTime: '8 min', difficulty: 'Essential', featured: false },
  { id: 'guide-healthcare', title: 'Healthcare', subtitle: 'Affirming care in SA', description: 'Find friendly providers and understand HRT options in South Africa.', icon: '🏥', color: 'teal', readTime: '12 min', difficulty: 'Moderate', featured: false },
  { id: 'guide-legal-rights', title: 'Legal Rights', subtitle: 'Know your protections', description: 'Understanding your rights under SA law, from marriage to work.', icon: '⚖️', color: 'amber', readTime: '10 min', difficulty: 'Moderate', featured: false },
  { id: 'guide-relationships', title: 'Relationships', subtitle: 'Queer love and connection', description: 'Navigating dating, partnership, and love as an LGBTQ+ person.', icon: '💕', color: 'pink', readTime: '11 min', difficulty: 'Gentle', featured: false },
  { id: 'guide-spirituality', title: 'Spirituality & Faith', subtitle: 'Your journey matters', description: 'Reconciling faith with identity and finding affirming spaces.', icon: '🕊️', color: 'violet', readTime: '9 min', difficulty: 'Gentle', featured: false },
  { id: 'guide-additional', title: 'More Resources', subtitle: 'Further reading', description: 'Books, podcasts, and crisis resources for continued support.', icon: '📚', color: 'slate', readTime: '5 min', difficulty: 'Easy', featured: false }
];

// --- STYLES & COMPONENTS ---

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

const GuideCard = ({ guide, index, onClick, featured }) => {
  const colors = getColorClasses(guide.color);
  const colorArray = colors.split(' ');
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onClick={() => onClick(guide.id)}
      className="group relative cursor-pointer"
    >
      <div className={`absolute -inset-[1px] bg-gradient-to-r ${colorArray[0]} ${colorArray[1]} rounded-[2.5rem] opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-sm`} />
      <div className="relative bg-white/90 backdrop-blur-xl border border-white/20 rounded-[2.4rem] p-8 h-full flex flex-col hover:shadow-2xl transition-all duration-500">
        <div className="flex justify-between items-start mb-6">
          <div className="text-4xl group-hover:scale-110 transition-transform duration-500">{guide.icon}</div>
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${colorArray[2]} ${colorArray[3]}`}>
            {guide.difficulty}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{guide.title}</h3>
          <p className="text-xs text-indigo-500 font-bold mb-4 uppercase">{guide.subtitle}</p>
          <p className="text-slate-600 leading-relaxed text-sm mb-6 line-clamp-3">{guide.description}</p>
        </div>
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Clock size={14} /> {guide.readTime}
          </div>
          <div className="text-sm font-bold text-indigo-600 flex items-center gap-2 group-hover:gap-4 transition-all">
            Read <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const GuideReader = ({ guideId, onBack }) => {
  const guide = INITIAL_GUIDES.find(g => g.id === guideId);
  const content = GUIDES_CONTENT[guideId];
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-100">
        <div className="h-full bg-indigo-600 transition-all duration-100" style={{ width: `${scrollProgress}%` }} />
      </div>
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 border-b border-slate-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-bold transition-colors">
            <ChevronLeft size={20} /> Back to Library
          </button>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><Heart size={20} /></button>
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Share2 size={20} /></button>
          </div>
        </div>
      </nav>
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block p-6 bg-slate-50 rounded-[2rem] shadow-sm mb-8 text-6xl">{guide?.icon}</div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">{guide?.title}</h1>
          <p className="text-xl text-indigo-600 font-bold mb-8 italic">{guide?.subtitle}</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 pb-32">
        <div className="prose prose-slate max-w-none">
          {content.sections.map((section, idx) => (
            <div key={idx} className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{section.title}</h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">{section.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-indigo-50 rounded-3xl p-8 border border-indigo-100 flex items-start gap-4">
          <div className="p-3 bg-white rounded-2xl text-indigo-600 shadow-sm"><ShieldCheck size={24} /></div>
          <div>
            <h3 className="text-indigo-900 font-bold text-lg mb-2">South African Context</h3>
            <p className="text-indigo-800/70 text-sm leading-relaxed">
              This guide is tailored for the South African legal and social landscape. Always consult local organizations like the <strong>Triangle Project</strong> or <strong>Gender DynamiX</strong> for the latest localized support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState('library');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = INITIAL_GUIDES.filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    g.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fafbff]">
      <AnimatePresence mode="wait">
        {activePage === 'library' ? (
          <motion.div key="library" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-32 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="max-w-2xl">
                  <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter">The <span className="text-indigo-600">Library</span></h1>
                  <p className="text-xl text-slate-500 font-medium">Curated wisdom for your journey in South Africa.</p>
                </div>
                <div className="relative w-full md:w-80">                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGuides.map((guide, i) => (
                  <GuideCard key={guide.id} guide={guide} index={i} onClick={setActivePage} />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="reader" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <GuideReader guideId={activePage} onBack={() => setActivePage('library')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}