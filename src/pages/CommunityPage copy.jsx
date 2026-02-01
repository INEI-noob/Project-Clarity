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
  MessageCircle,
  Video,
  Calendar,
  ArrowRight,
  Globe,
  Zap
} from 'lucide-react';

const STATUS_CONFIG = {
  welcoming: { color: 'bg-indigo-50 text-indigo-700', label: 'Active', icon: Zap },
  nurturing: { color: 'bg-rose-50 text-rose-700', label: 'Established', icon: Heart },
  blooming: { color: 'bg-emerald-50 text-emerald-700', label: 'Growing', icon: Sparkles },
  emerging: { color: 'bg-amber-50 text-amber-700', label: 'New', icon: Wind },
  rooting: { color: 'bg-orange-50 text-orange-700', label: 'Developing', icon: Shield },
  digital: { color: 'bg-cyan-50 text-cyan-700', label: 'Online Only', icon: Video },
  awakening: { color: 'bg-purple-50 text-purple-700', label: 'Expanding', icon: Sparkles },
  growing: { color: 'bg-blue-50 text-blue-700', label: 'Building', icon: Users },
  connected: { color: 'bg-slate-100 text-slate-700', label: 'Remote', icon: Globe }
};

const PROVINCES = [
  { 
    id: 'gp', 
    name: "Gauteng", 
    hubs: 3, 
    members: "2.8k", 
    status: "welcoming", 
    gradient: "from-indigo-500 to-purple-500",
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
    gradient: "from-rose-400 to-rose-600", 
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
    gradient: "from-emerald-400 to-teal-500",
    description: "Durban warmth. Fast-growing community with tropical energy and new connections forming daily.",
    vibe: "Tropical Growth",
    tags: ["Support Groups", "Socials"],
    nextEvent: "Next Week"
  },
  { 
    id: 'lp', 
    name: "Limpopo", 
    hubs: 0, 
    members: "150", 
    status: "digital", 
    gradient: "from-cyan-400 to-blue-500",
    description: "Digital-first community. A warm online campfire while we establish physical safety.",
    vibe: "Virtual Gathering",
    tags: ["Discord", "Zoom", "Chat"],
    nextEvent: "Daily"
  },
  { 
    id: 'ec', 
    name: "Eastern Cape", 
    hubs: 1, 
    members: "450", 
    status: "emerging", 
    gradient: "from-amber-400 to-orange-500",
    description: "University towns building bridges. Young, fierce, and focused on student safety.",
    vibe: "Scholarly Hope",
    tags: ["Student Support", "Activism"],
    nextEvent: "Monthly"
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
    <div className="relative min-h-screen pt-32 pb-32 px-4 md:px-6 bg-white overflow-hidden">
      {/* Ambient Background Elements */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-50/50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-rose-50/40 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                  <Users size={24} />
                </div>
                <div>
                  <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs block">Community Directory</span>
                  <span className="text-slate-400 text-xs font-medium">Find your chosen family</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[0.95] mb-8 tracking-tight">
                Find Your <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500">
                  Sanctuary
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
                Connect with local hubs, digital circles, and peer networks across South Africa. 
                Every province holds a unique community ready to welcome you.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              {[
                { label: 'Provinces', val: '9', color: 'text-slate-900' },
                { label: 'Active Hubs', val: '12', color: 'text-indigo-600' },
                { label: 'Members', val: '7.5k', color: 'text-rose-500' }
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-slate-100 px-6 py-5 rounded-3xl min-w-[120px] text-center shadow-sm"
                >
                  <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.val}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
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
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-slate-700 shadow-sm"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-6 py-4 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
                  selectedStatus === 'all' 
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                All Spaces
              </button>
              <button
                onClick={() => setSelectedStatus('welcoming')}
                className={`px-6 py-4 rounded-2xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedStatus === 'welcoming' 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                }`}
              >
                <Zap size={16} /> Active
              </button>
              <button
                onClick={() => setSelectedStatus('digital')}
                className={`px-6 py-4 rounded-2xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedStatus === 'digital' 
                    ? 'bg-cyan-600 text-white shadow-lg' 
                    : 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100'
                }`}
              >
                <Video size={16} /> Online
              </button>
            </div>
          </div>
        </motion.div>

        {/* Physical Hubs Grid */}
        {hasPhysicalHubs.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-bold text-slate-900">Physical Sanctuaries</h2>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hasPhysicalHubs.map((prov, index) => {
                const StatusInfo = STATUS_CONFIG[prov.status];
                const StatusIcon = StatusInfo.icon;
                const isExpanded = expandedProvince === prov.id;
                
                return (
                  <motion.div
                    key={prov.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex flex-col bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-8 pb-4">
                      <div className="flex justify-between items-start mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${prov.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                          <MapPin size={24} />
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${StatusInfo.color}`}>
                          <StatusIcon size={12} />
                          {StatusInfo.label}
                        </span>
                      </div>

                      <h3 className="text-3xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {prov.name}
                      </h3>
                      <p className="text-xs text-indigo-500 font-bold mb-4 uppercase tracking-[0.15em]">{prov.vibe}</p>
                      
                      <p className="text-slate-600 text-lg leading-relaxed mb-6">
                        {prov.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {prov.tags.map(tag => (
                          <span key={tag} className="px-3 py-1.5 bg-slate-50 rounded-xl text-xs font-bold text-slate-500 border border-slate-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto px-8 pb-8 pt-4 border-t border-slate-50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 text-sm font-bold">
                          <span className="text-slate-900">{prov.members} members</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full" />
                          <span className="text-slate-500">{prov.hubs} hub{prov.hubs !== 1 ? 's' : ''}</span>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mb-4"
                          >
                            <div className="py-4 space-y-3">
                              <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-2xl">
                                <Calendar size={18} className="text-indigo-600" />
                                <div>
                                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">Next Gathering</span>
                                  <span className="text-sm font-bold text-slate-900">{prov.nextEvent}</span>
                                </div>
                              </div>
                              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-lg">
                                Join Community <ArrowRight size={18} />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button 
                        onClick={() => setExpandedProvince(isExpanded ? null : prov.id)}
                        className="w-full py-2 text-xs font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors"
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
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 border border-cyan-100">
                <Video size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">Digital Circles</h2>
                <p className="text-slate-500 text-sm font-medium">Safe online spaces spanning any distance</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {digitalOnly.map((prov, index) => (
                <motion.div
                  key={prov.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-slate-100 rounded-[2.5rem] p-8 flex items-center gap-8 group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-20 h-20 rounded-[1.5rem] bg-gradient-to-tr ${prov.gradient} flex items-center justify-center text-white text-3xl font-bold shrink-0 shadow-lg group-hover:scale-105 transition-transform`}>
                    {prov.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {prov.name}
                      </h3>
                      <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-[10px] font-black rounded-lg uppercase tracking-widest border border-cyan-100">
                        ONLINE
                      </span>
                    </div>
                    <p className="text-slate-600 text-lg mb-4 line-clamp-1">{prov.description}</p>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Users size={14} className="text-indigo-500" /> {prov.members} members
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MessageCircle size={14} className="text-emerald-500" /> Daily activity
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                    <ArrowRight size={20} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative text-center p-12 md:p-20 rounded-[4rem] bg-slate-900 text-white overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center mx-auto mb-10 text-indigo-400 shadow-2xl">
              <Sparkles size={36} />
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Start a Hub in Your Area</h3>
            <p className="text-slate-300 text-xl mb-12 leading-relaxed font-light">
              Don't see your province listed? We're always looking for community leaders to establish 
              new sanctuaries. We provide training, safety guidelines, and the backing of our whole network.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl active:scale-95">
                Apply to Lead
              </button>
              <button className="px-10 py-5 bg-slate-800 text-white border border-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-700 transition-all active:scale-95">
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