import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  ArrowUpRight, 
  Heart,
  Shield,
  Wind,
  Sparkles,
  Search,
  Filter,
  MessageCircle,
  Video,
  Calendar,
  ArrowRight,
  Globe,
  Zap
} from 'lucide-react';

/**
 * COMMUNITY PAGE - Directory Style (No Map)
 * Focus on human connections rather than geography
 */

const STATUS_CONFIG = {
  welcoming: { color: 'indigo', label: 'Active', icon: Zap },
  nurturing: { color: 'cyan', label: 'Established', icon: Heart },
  blooming: { color: 'teal', label: 'Growing', icon: Sparkles },
  emerging: { color: 'amber', label: 'New', icon: Wind },
  rooting: { color: 'orange', label: 'Developing', icon: Shield },
  digital: { color: 'emerald', label: 'Online Only', icon: Video },
  awakening: { color: 'purple', label: 'Expanding', icon: Sparkles },
  growing: { color: 'blue', label: 'Building', icon: Users },
  connected: { color: 'slate', label: 'Remote', icon: Globe }
};

const PROVINCES = [
  { 
    id: 'gp', 
    name: "Gauteng", 
    hubs: 3, 
    members: "2.8k", 
    status: "welcoming", 
    gradient: "from-indigo-400 to-purple-500",
    bgGradient: "from-indigo-50 to-purple-50",
    description: "Johannesburg & Pretoria. The beating heart with vibrant meetups and established safe-spaces.",
    vibe: "Urban Energy",
    tags: ["Meetups", "Youth", "Healthcare"],
    nextEvent: "Tomorrow, 6PM"
  },
  { 
    id: 'wc', 
    name: "Western Cape", 
    hubs: 2, 
    members: "2.1k", 
    status: "nurturing", 
    gradient: "from-cyan-400 to-blue-500", 
    bgGradient: "from-cyan-50 to-blue-50",
    description: "Cape Town coastal community. Deep roots, ocean calm, and strong chosen family networks.",
    vibe: "Ocean Calm",
    tags: ["Beach Walks", "Therapy", "Arts"],
    nextEvent: "Saturday, 2PM"
  },
  { 
    id: 'kzn', 
    name: "KwaZulu-Natal", 
    hubs: 2, 
    members: "1.2k", 
    status: "blooming", 
    gradient: "from-teal-400 to-emerald-500",
    bgGradient: "from-teal-50 to-emerald-50",
    description: "Durban warmth. Fast-growing community with tropical energy and new connections forming daily.",
    vibe: "Tropical Growth",
    tags: ["Support Groups", "Socials"],
    nextEvent: "Next Week"
  },
  { 
    id: 'ec', 
    name: "Eastern Cape", 
    hubs: 1, 
    members: "450", 
    status: "emerging", 
    gradient: "from-amber-400 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
    description: "University towns building bridges. Young, fierce, and focused on student safety.",
    vibe: "Scholarly Hope",
    tags: ["Student Support", "Activism"],
    nextEvent: "Monthly"
  },
  { 
    id: 'fs', 
    name: "Free State", 
    hubs: 1, 
    members: "300", 
    status: "rooting", 
    gradient: "from-orange-400 to-rose-500",
    bgGradient: "from-orange-50 to-rose-50",
    description: "Central heartland. Focusing on rural outreach and accessibility. Small but mighty.",
    vibe: "Heartland",
    tags: ["Rural Outreach"],
    nextEvent: "Bi-weekly"
  },
  { 
    id: 'lp', 
    name: "Limpopo", 
    hubs: 0, 
    members: "150", 
    status: "digital", 
    gradient: "from-emerald-400 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
    description: "Digital-first community. A warm online campfire while we establish physical safety.",
    vibe: "Virtual Gathering",
    tags: ["Discord", "Zoom", "Chat"],
    nextEvent: "Daily"
  },
  { 
    id: 'mp', 
    name: "Mpumalanga", 
    hubs: 1, 
    members: "200", 
    status: "awakening", 
    gradient: "from-purple-400 to-indigo-500",
    bgGradient: "from-purple-50 to-indigo-50",
    description: "The east is rising. Misty mountains and emerging chapters in the lowveld.",
    vibe: "Mountain Mystery",
    tags: ["Nature Walks", "Support"],
    nextEvent: "Monthly"
  },
  { 
    id: 'nw', 
    name: "North West", 
    hubs: 1, 
    members: "250", 
    status: "growing", 
    gradient: "from-blue-400 to-indigo-400",
    bgGradient: "from-blue-50 to-indigo-50",
    description: "Student-focused protection and healthcare access. A shield for the vulnerable.",
    vibe: "Protective",
    tags: ["Healthcare", "Safety"],
    nextEvent: "Weekly"
  },
  { 
    id: 'nc', 
    name: "Northern Cape", 
    hubs: 0, 
    members: "100", 
    status: "connected", 
    gradient: "from-slate-400 to-slate-600",
    bgGradient: "from-slate-50 to-gray-50",
    description: "Wide spaces, close hearts. Digital support spanning the vast Karoo distances.",
    vibe: "Wide & Wild",
    tags: ["Remote Support", "Chat"],
    nextEvent: "Weekly"
  }
];

const CommunityPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [expandedProvince, setExpandedProvince] = useState(null);

  const filteredProvinces = useMemo(() => {
    return PROVINCES.filter(prov => {
      const matchesSearch = prov.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           prov.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           prov.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = selectedStatus === 'all' || prov.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, selectedStatus]);

  const hasPhysicalHubs = filteredProvinces.filter(p => p.hubs > 0);
  const digitalOnly = filteredProvinces.filter(p => p.hubs === 0);

  return (
    <div className="relative min-h-screen pt-32 pb-32 px-4 md:px-6">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-50 flex items-center justify-center text-indigo-600 shadow-lg">
                  <Users size={24} />
                </div>
                <div>
                  <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs block">Community Directory</span>
                  <span className="text-slate-400 text-xs">Find your circle</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[0.95] mb-6 tracking-tight">
                Find Your <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500">
                  Sanctuary
                </span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                Connect with local hubs, digital circles, and chosen family across South Africa. 
                Every province holds unique communities ready to welcome you.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              <motion.div 
                whileHover={{ y: -4 }}
                className="glass-sanctuary px-6 py-4 rounded-2xl min-w-[140px] text-center"
              >
                <div className="text-3xl font-bold text-slate-900 mb-1">9</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Provinces</div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -4 }}
                className="glass-sanctuary px-6 py-4 rounded-2xl min-w-[140px] text-center"
              >
                <div className="text-3xl font-bold text-indigo-600 mb-1">12</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Hubs</div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -4 }}
                className="glass-sanctuary px-6 py-4 rounded-2xl min-w-[140px] text-center hidden sm:block"
              >
                <div className="text-3xl font-bold text-rose-500 mb-1">7.5k</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Members</div>
              </motion.div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text"
                placeholder="Search by province, vibe, or interest..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/80 border border-slate-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-slate-700 placeholder:text-slate-400"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  selectedStatus === 'all' 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-white/60 text-slate-600 hover:bg-white'
                }`}
              >
                All Spaces
              </button>
              <button
                onClick={() => setSelectedStatus('welcoming')}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedStatus === 'welcoming' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white/60 text-slate-600 hover:bg-white'
                }`}
              >
                <Zap size={14} /> Active
              </button>
              <button
                onClick={() => setSelectedStatus('digital')}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedStatus === 'digital' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-white/60 text-slate-600 hover:bg-white'
                }`}
              >
                <Video size={14} /> Online
              </button>
            </div>
          </div>
        </motion.div>

        {/* Featured Section - Physical Hubs */}
        {hasPhysicalHubs.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Physical Sanctuaries</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
              <span className="text-sm text-slate-500 font-medium">{hasPhysicalHubs.length} provinces with hubs</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hasPhysicalHubs.map((prov, index) => {
                const StatusIcon = STATUS_CONFIG[prov.status].icon;
                const isExpanded = expandedProvince === prov.id;
                
                return (
                  <motion.div
                    key={prov.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    layout
                    className="group relative"
                  >
                    <div className={`absolute -inset-[1px] bg-gradient-to-r ${prov.gradient} rounded-[2rem] opacity-0 group-hover:opacity-70 transition-opacity duration-500 blur-sm`} />
                    
                    <div className="relative glass-sanctuary rounded-[1.8rem] p-6 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${prov.gradient} flex items-center justify-center text-white shadow-lg`}>
                          <MapPin size={20} />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-${STATUS_CONFIG[prov.status].color}-100 text-${STATUS_CONFIG[prov.status].color}-700`}>
                            <StatusIcon size={12} />
                            {STATUS_CONFIG[prov.status].label}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-indigo-700 transition-colors">
                        {prov.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium mb-4 uppercase tracking-wider">{prov.vibe}</p>
                      
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                        {prov.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {prov.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-white/60 rounded-lg text-xs font-medium text-slate-600 border border-slate-100">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats Row */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mb-4">
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <span className="font-bold text-slate-900">{prov.members}</span>
                          <span className="text-slate-400">•</span>
                          <span>{prov.hubs} hub{prov.hubs !== 1 ? 's' : ''}</span>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                      </div>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 pb-2 space-y-3">
                              <div className="flex items-center gap-3 p-3 bg-indigo-50/50 rounded-xl">
                                <Calendar size={16} className="text-indigo-600" />
                                <div>
                                  <span className="text-xs text-slate-500 block">Next Gathering</span>
                                  <span className="text-sm font-bold text-slate-900">{prov.nextEvent}</span>
                                </div>
                              </div>
                              <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
                                Join Community <ArrowRight size={16} />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button 
                        onClick={() => setExpandedProvince(isExpanded ? null : prov.id)}
                        className="w-full mt-auto py-2 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors"
                      >
                        {isExpanded ? 'Show Less' : 'View Details'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Digital Communities Section */}
        {digitalOnly.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Video size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900">Digital Circles</h2>
                <p className="text-slate-500 text-sm">Online communities for areas without physical hubs yet</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {digitalOnly.map((prov, index) => (
                <motion.div
                  key={prov.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass-sanctuary rounded-[2rem] p-6 flex items-center gap-6 group cursor-pointer"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${prov.gradient} flex items-center justify-center text-white text-2xl shrink-0`}>
                    {prov.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                        {prov.name}
                      </h3>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                        ONLINE
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm mb-3 line-clamp-2">{prov.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Users size={12} /> {prov.members} members
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={12} /> Daily chats
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <ArrowRight size={18} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProvinces.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No communities found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your search or filters</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedStatus('all');}}
              className="px-6 py-3 bg-slate-900 text-white rounded-full font-bold"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-indigo-50 via-white to-rose-50 border border-indigo-100/50 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center mx-auto mb-6 text-indigo-600">
              <Sparkles size={28} />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Start a Hub in Your Area</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Don't see your province listed? We're always looking for community leaders to establish 
              new sanctuaries. We provide training, safety guidelines, and ongoing support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-indigo-600 transition-all shadow-lg">
                Apply to Lead
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold hover:border-indigo-300 hover:text-indigo-700 transition-all">
                Learn About Safety
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityPage;