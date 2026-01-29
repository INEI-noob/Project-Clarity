import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  ArrowUpRight, 
  Globe, 
  ChevronRight,
  Info,
  Activity
} from 'lucide-react';

/**
 * PROJECT SAPPHIRE - COMMUNITY PAGE (PREMIUM GEOGRAPHIC ZA)
 * Features a high-detail SVG map of South Africa with localized interaction.
 */

const CommunityPage = () => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [hoveredProvince, setHoveredProvince] = useState(null);

  // South African Provinces Data
  const provinces = [
    { id: 'gp', name: "Gauteng", hubs: 3, members: "2.8k", status: "High Activity", color: "from-indigo-500 to-blue-600", description: "The economic heartland. High density of safe-spaces in Jo'burg and Pretoria." },
    { id: 'wc', name: "Western Cape", hubs: 2, members: "2.1k", status: "Active", color: "from-cyan-500 to-blue-500", description: "Vibrant coastal community with established support networks and cultural hubs." },
    { id: 'kzn', name: "KwaZulu-Natal", hubs: 2, members: "1.2k", status: "Growing", color: "from-teal-500 to-emerald-500", description: "Fast-growing community nodes in Durban and the Midlands." },
    { id: 'ec', name: "Eastern Cape", hubs: 1, members: "450", status: "Vetting", color: "from-rose-500 to-orange-500", description: "Developing network focusing on university-town safe zones." },
    { id: 'fs', name: "Free State", hubs: 1, members: "300", status: "Forming", color: "from-amber-500 to-orange-500", description: "Central hub connectivity focusing on rural outreach and safety." },
    { id: 'lp', name: "Limpopo", hubs: 0, members: "150", status: "Digital Only", color: "from-emerald-500 to-teal-600", description: "Currently operating as a digital-first network for safety and vetting." },
    { id: 'mp', name: "Mpumalanga", hubs: 1, members: "200", status: "Vetting", color: "from-purple-500 to-indigo-600", description: "Emerging local chapters providing essential support in the North East." },
    { id: 'nw', name: "North West", hubs: 1, members: "250", status: "Forming", color: "from-blue-400 to-indigo-400", description: "Focused on student safety and regional healthcare access." },
    { id: 'nc', name: "Northern Cape", hubs: 0, members: "100", status: "Digital Only", color: "from-slate-400 to-slate-600", description: "Wide-range digital support for remote members across the region." }
  ];

  // Geographically Accurate SVG Paths for South Africa
  const provincePaths = {
    lp: "M328.6,35.7c-5.1,0.6-10.2,1.2-15.3,1.8l-1.9,6l-12.8,1.4l-6.4,8.9l-14.7,0l-5.3,6l10,30.8l5.3,21.5l14,35.2l20.4,14l39,12.2l31.4,14l31.4-1.4l15.3-26.4l-11.5-35.8l-37-29.4l-20.4-33.1L328.6,35.7z",
    mp: "M430,154.9l-31.4,1.4l-31.4-14l-14-10.8l-12.7,2.2l-3.8,13.6l10.8,17.2l2.5,30.5l14.6,14.6l54,5.1l36.9-10.2l7.6-54.7L430,154.9z",
    gp: "M353.3,158.7l-2.5,14l10.2,25.4l17.8,7.6l21.6-10.2l-2.5-30.5l-10.8-17.2l-21.6-1.3L353.3,158.7z",
    nw: "M195.4,127.3l-20.4,26.7l14.6,56.6l124.6,51.5l39.4-60.4l-10.2-25.4l2.5-14l-12.7,2.2l-3.8-13.6l-39-12.2l-20.4-14L195.4,127.3z",
    fs: "M276.1,262.1l-14.6,26.7l21.6,71.2l61.7,7l63-31.1l23.5-50.9l-46.4-34.4l-54.7-5.1l-14.6-14.6L276.1,262.1z",
    kzn: "M430.7,285.6l46.4,34.4l21.6,62.3l-31.8,42l-78.9-24.8l-14.6-46.4l33.7-36.3L430.7,285.6z",
    nc: "M45.1,188.4L1.9,252l24.2,50.9l145,67.4l70.6,3.8l21.6-71.2l14.6-26.7l-124.6-51.5l-14.6-56.6L45.1,188.4z",
    wc: "M26,303l-14,78.9l35,56l187.1,3.1l-3.1-40.7l-60.5-29.3L26,303z",
    ec: "M171.1,370.4l3.1,40.7l60.5,29.3l80.1,5.1l73.8-44.5l14.6,46.4l-14.6-3.8L171.1,370.4z"
  };

  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-indigo-50 rounded-xl">
              <Activity className="text-indigo-600" size={24} />
            </div>
            <span className="text-indigo-600 font-black tracking-[0.3em] uppercase text-sm">Provincial Mesh v4.0</span>
          </div>
          <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter text-slate-900 leading-[0.85]">
            Regional <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">Sanctuaries.</span>
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="max-w-sm"
        >
          <p className="text-xl text-slate-500 font-medium leading-relaxed mb-8">
            Navigate the map to connect with localized queer safety networks and verified community hubs.
          </p>
          <div className="flex gap-4">
             <div className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 flex-1">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Members</p>
                <p className="text-2xl font-black text-slate-900">7.5k+</p>
             </div>
             <div className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 flex-1">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Hubs</p>
                <p className="text-2xl font-black text-slate-900">12</p>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Map Control Center */}
      <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-slate-950 rounded-[4rem] overflow-hidden mb-8 group shadow-2xl border border-slate-800">
        
        {/* Geographic Grid Background */}
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px' 
        }} />

        {/* Real South Africa SVG Map */}
        <div className="absolute inset-0 flex items-center justify-center p-12 md:p-20">
          <svg 
            viewBox="0 0 520 460" 
            className="h-full w-auto drop-shadow-[0_0_50px_rgba(79,70,229,0.15)]"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {provinces.map((prov) => (
              <motion.path
                key={prov.id}
                d={provincePaths[prov.id]}
                initial={{ fill: "rgba(255,255,255,0.02)", stroke: "rgba(255,255,255,0.1)" }}
                animate={{ 
                  fill: hoveredProvince === prov.id || selectedProvince?.id === prov.id 
                    ? "rgba(99, 102, 241, 0.25)" 
                    : "rgba(255,255,255,0.02)",
                  stroke: hoveredProvince === prov.id || selectedProvince?.id === prov.id 
                    ? "rgba(99, 102, 241, 0.8)" 
                    : "rgba(255,255,255,0.12)",
                }}
                whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
                className="cursor-pointer transition-colors duration-300 outline-none"
                strokeWidth="1.2"
                onMouseEnter={() => setHoveredProvince(prov.id)}
                onMouseLeave={() => setHoveredProvince(null)}
                onClick={() => setSelectedProvince(prov)}
              />
            ))}
          </svg>
        </div>

        {/* Interactive UI Overlays */}
        <div className="absolute top-12 left-12 flex items-center gap-4 text-white/40">
          <Globe size={18} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Sapphire GIS: South Africa</span>
        </div>

        {/* Floating Instruction */}
        <AnimatePresence>
          {!selectedProvince && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-12 left-12 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black text-white/60 uppercase tracking-[0.2em]"
            >
              Select a province to explore local mesh
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Detail Sidebar */}
        <AnimatePresence>
          {selectedProvince && (
            <motion.div 
              initial={{ x: 300, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-6 right-6 bottom-6 w-[22rem] bg-white/95 backdrop-blur-2xl rounded-[3rem] p-10 flex flex-col z-20 shadow-2xl border border-white/20"
            >
              <button 
                onClick={() => setSelectedProvince(null)} 
                className="mb-10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 self-start transition-colors"
              >
                ← Back to Country View
              </button>

              <div className={`w-16 h-16 rounded-3xl bg-gradient-to-tr ${selectedProvince.color} text-white flex items-center justify-center mb-6 shadow-xl ring-8 ring-indigo-50`}>
                <MapPin size={32} />
              </div>

              <h4 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">{selectedProvince.name}</h4>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {selectedProvince.status}
              </p>

              <p className="text-slate-600 font-medium leading-relaxed mb-10">
                {selectedProvince.description}
              </p>

              <div className="space-y-3 mb-10">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                   <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Active Chapters</span>
                   <span className="text-lg font-black text-indigo-600">{selectedProvince.hubs}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                   <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Verified Members</span>
                   <span className="text-lg font-black text-slate-900">{selectedProvince.members}</span>
                </div>
              </div>

              <button className="mt-auto w-full py-5 bg-slate-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all group active:scale-95">
                Explore local hubs <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Access List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {provinces.map((prov) => (
          <motion.div 
            key={prov.id}
            whileHover={{ y: -8 }}
            onClick={() => setSelectedProvince(prov)}
            className={`p-8 rounded-[3rem] bg-white border cursor-pointer transition-all group shadow-sm hover:shadow-2xl ${selectedProvince?.id === prov.id ? 'border-indigo-500 ring-4 ring-indigo-50' : 'border-slate-100'}`}
          >
            <div className="flex justify-between items-start mb-6">
               <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${prov.color} shadow-lg shadow-indigo-100/50 flex items-center justify-center text-white`}>
                  <MapPin size={20} />
               </div>
               <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Status</span>
                  <span className={`text-[9px] font-black px-3 py-1 rounded-full border ${prov.hubs > 0 ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                    {prov.status}
                  </span>
               </div>
            </div>
            
            <h5 className="text-2xl font-black mb-2 text-slate-900 group-hover:text-indigo-600 transition-colors">{prov.name}</h5>
            <p className="text-slate-500 font-medium text-sm mb-8 line-clamp-2">
              {prov.description}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
               <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Members</span>
                    <span className="text-sm font-black text-slate-900">{prov.members}</span>
                  </div>
               </div>
               <ArrowUpRight className="text-slate-300 group-hover:text-indigo-600 transition-colors" size={20} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;