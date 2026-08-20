import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Fuse from 'fuse.js';
import {
  Phone, Globe, Clock, Search, Sparkles, MapPin,
  Activity, Gavel, HandHeart, Heart, HeartPulse, Home, Users
} from 'lucide-react';
import { RESOURCES, RESOURCE_CATEGORIES } from '../content/resources';
import InfoDisclaimer from '../components/InfoDisclaimer';

const ICON_MAP = {
  Phone, HeartPulse, Activity, Home, Gavel, HandHeart, Users, Heart,
};

const LOCATION_BUCKETS = [
  { key: 'all', label: 'All regions' },
  { key: 'National', label: 'National' },
  { key: 'International', label: 'International' },
  { key: 'Western Cape', label: 'Western Cape' },
  { key: 'Gauteng', label: 'Gauteng' },
  { key: 'Eastern Cape', label: 'Eastern Cape' },
];

const regionOf = (location) => {
  if (!location) return 'Other';
  if (location === 'National') return 'National';
  if (location === 'International') return 'International';
  if (location.includes('Cape Town')) return 'Western Cape';
  if (location.includes('Gauteng') || location.includes('Pretoria') || location.includes('Johannesburg')) return 'Gauteng';
  if (location.includes('Eastern Cape')) return 'Eastern Cape';
  return 'Other';
};

const CATEGORY_STYLES = {
  rose: 'bg-rose-50 text-rose-600 border-rose-100',
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
  violet: 'bg-violet-50 text-violet-600 border-violet-100',
  sky: 'bg-sky-50 text-sky-600 border-sky-100',
  teal: 'bg-teal-50 text-teal-600 border-teal-100',
  fuchsia: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100',
};

const ResourcesPage = ({ setPage }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLocation, setActiveLocation] = useState('all');

  const fuse = useMemo(
    () => new Fuse(RESOURCES, {
      keys: ['name', 'description', 'type', 'location'],
      threshold: 0.35,
    }),
    []
  );

  const filtered = useMemo(() => {
    const results = query.trim()
      ? fuse.search(query).map((r) => r.item)
      : RESOURCES;

    const byCategory = activeCategory === 'all'
      ? results
      : results.filter((r) => r.category === activeCategory);

    return activeLocation === 'all'
      ? byCategory
      : byCategory.filter((r) => regionOf(r.location) === activeLocation);
  }, [fuse, query, activeCategory, activeLocation]);

  return (
    <div className="relative min-h-screen pt-32 pb-32 px-4 md:px-6 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-40 left-10 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-600 font-bold text-xs uppercase tracking-wider mb-6">
            <Sparkles size={14} /> Resource Directory
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
            Find Your <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-600">Support</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Every kind of help, in one place. Crisis lines, affirming therapists,
            shelters, legal aid, and community — searchable and judgment-free.
          </p>
        </motion.div>

        {/* Disclaimer + Cross-link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto mb-8 space-y-4"
        >
          <InfoDisclaimer />
          {setPage && (
            <div className="flex justify-center">
              <button
                onClick={() => setPage('connect')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-indigo-100 text-indigo-600 text-sm font-bold hover:border-indigo-300 hover:bg-indigo-50 transition-all"
              >
                <Users size={16} /> Looking for people, not services? Browse the Community Map
              </button>
            </div>
          )}
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-sanctuary rounded-[2.5rem] p-6 md:p-8 mb-12"
        >
          <div className="relative mb-6">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources, organizations, keywords..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-50 transition-all text-slate-700 placeholder:text-slate-500"
              aria-label="Search resources"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              All
            </button>
            {Object.entries(RESOURCE_CATEGORIES).map(([key, cat]) => {
              const Icon = ICON_MAP[cat.icon] || Sparkles;
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-bold transition-all ${
                    isActive
                      ? CATEGORY_STYLES[cat.color].replace('text-', 'bg-slate-900 text-') + ' bg-slate-900 border-slate-900 text-white'
                      : `bg-white border-slate-200 text-slate-600 hover:border-slate-300`
                  }`}
              >
                <Icon size={13} />
                {cat.label}
              </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mr-1">
              Region
            </span>
            {LOCATION_BUCKETS.map((loc) => (
              <button
                key={loc.key}
                onClick={() => setActiveLocation(loc.key)}
                className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                  activeLocation === loc.key
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300'
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <div className="space-y-4">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            {filtered.length} resource{filtered.length !== 1 ? 's' : ''} found
          </p>

          {filtered.length === 0 && (
            <div className="glass-sanctuary rounded-[2.5rem] p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-slate-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No matches found</h3>
              <p className="text-slate-500 text-sm">
                Try a different keyword, or clear the filters to browse everything.
              </p>
            </div>
          )}

          {filtered.map((resource, i) => {
            const cat = RESOURCE_CATEGORIES[resource.category];
            const Icon = ICON_MAP[cat.icon] || Sparkles;
            return (
              <motion.div
                key={resource.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="glass-sanctuary rounded-[2rem] p-6 md:p-8 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${CATEGORY_STYLES[cat.color]}`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg leading-tight">{resource.name}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${CATEGORY_STYLES[cat.color]}`}>
                          {cat.label}
                        </span>
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                          <MapPin size={12} /> {resource.location}
                        </span>
                        {resource.type && (
                          <span className="text-xs font-semibold text-slate-500">{resource.type}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed text-sm mb-5">{resource.description}</p>

                <div className="flex flex-wrap items-center gap-3">
                  {resource.phone && (
                    <a
                      href={`tel:${resource.phone.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-teal-600 transition-colors"
                    >
                      <Phone size={14} /> {resource.phone}
                    </a>
                  )}
                  {resource.hours && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Clock size={13} /> {resource.hours}
                    </span>
                  )}
                  {resource.website && (
                    <a
                      href={resource.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 text-xs font-bold hover:border-teal-300 hover:text-teal-600 transition-colors"
                    >
                      <Globe size={14} /> Visit Website
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;