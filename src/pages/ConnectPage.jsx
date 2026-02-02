import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Users, 
  X,
  ExternalLink, 
  Search,
  Shield,
  ChevronRight,
  Heart,
  MessageCircle,
  Globe
} from 'lucide-react';

const nationalGroups = {
  id: 'national',
  name: 'National',
  description: 'South Africa-wide groups connecting queer folks across all provinces',
  color: 'slate',
  memberCount: 1250,
  groupCount: 4,
  groups: [
    {
      id: 'nat-1',
      name: 'SA Queer Book Club',
      description: 'Monthly virtual book discussions with members from all over SA. Genre rotates monthly.',
      members: 340,
      link: 'https://chat.whatsapp.com/example-national-1',
      tags: ['social', 'virtual', '21+']
    },
    {
      id: 'nat-2',
      name: 'TransSA Support Network',
      description: 'Nationwide support for trans folks. Resources, advice, and community connection.',
      members: 567,
      link: 'https://chat.whatsapp.com/example-national-2',
      tags: ['trans', 'support', 'resources']
    },
    {
      id: 'nat-3',
      name: 'Queer Professionals SA',
      description: 'Career networking, job postings, and workplace advice across all industries.',
      members: 890,
      link: 'https://chat.whatsapp.com/example-national-3',
      tags: ['career', 'networking', '21+']
    },
    {
      id: 'nat-4',
      name: 'SA Rainbow Parents',
      description: 'For LGBTQIA+ parents and those trying to conceive. Share experiences and advice.',
      members: 234,
      link: 'https://chat.whatsapp.com/example-national-4',
      tags: ['family', 'parenting', 'support']
    }
  ]
};

const provinces = [
  {
    id: 'gauteng',
    name: 'Gauteng',
    description: 'Johannesburg, Pretoria, Soweto, and the economic heart of SA',
    color: 'rose',
    memberCount: 523,
    groupCount: 3,
    groups: [
      {
        id: 1,
        name: 'Gauteng Queer Social',
        description: 'Casual hangouts, coffee meetups, and events in Jozi and Pretoria',
        members: 234,
        link: 'https://chat.whatsapp.com/example1',
        tags: ['social', '18+', 'events']
      },
      {
        id: 2,
        name: 'Trans Femme JHB',
        description: 'Support and sisterhood for trans feminine folks in Gauteng',
        members: 89,
        link: 'https://chat.whatsapp.com/example2',
        tags: ['trans', 'support', 'safe-space']
      },
      {
        id: 3,
        name: 'Gauteng Youth (16-21)',
        description: 'For queer teens and young adults navigating school and family',
        members: 200,
        link: 'https://chat.whatsapp.com/example3',
        tags: ['youth', 'support', 'under-21']
      }
    ]
  },
  {
    id: 'westerncape',
    name: 'Western Cape',
    description: 'Cape Town, Stellenbosch, and the scenic Mother City',
    color: 'indigo',
    memberCount: 612,
    groupCount: 3,
    groups: [
      {
        id: 4,
        name: 'Cape Town Queer Hikers',
        description: 'Monthly hikes, beach days, and outdoor adventures',
        members: 312,
        link: 'https://chat.whatsapp.com/example4',
        tags: ['outdoors', 'social', 'active']
      },
      {
        id: 5,
        name: 'Non-Binary Cape',
        description: 'For non-binary, genderqueer, and questioning folks in the Mother City',
        members: 67,
        link: 'https://chat.whatsapp.com/example5',
        tags: ['enby', 'support', 'discussion']
      },
      {
        id: 6,
        name: 'Queer Professionals CT',
        description: 'Networking, career advice, and workplace support',
        members: 233,
        link: 'https://chat.whatsapp.com/example6',
        tags: ['career', 'networking', '21+']
      }
    ]
  },
  {
    id: 'kwazulunatal',
    name: 'KwaZulu-Natal',
    description: 'Durban, Pietermaritzburg, and the tropical east coast',
    color: 'amber',
    memberCount: 578,
    groupCount: 2,
    groups: [
      {
        id: 7,
        name: 'Durban Queer Collective',
        description: 'The main hub for queer folks in Durban - events, support, vibes',
        members: 445,
        link: 'https://chat.whatsapp.com/example7',
        tags: ['general', 'social', 'events']
      },
      {
        id: 8,
        name: 'KZN Rural Connect',
        description: 'For those outside Durban - Pietermaritzburg, rural areas, small towns',
        members: 133,
        link: 'https://chat.whatsapp.com/example8',
        tags: ['rural', 'support', 'community']
      }
    ]
  },
  {
    id: 'easterncape',
    name: 'Eastern Cape',
    description: 'Gqeberha, East London, and the wild coast',
    color: 'cyan',
    memberCount: 156,
    groupCount: 2,
    groups: [
      {
        id: 9,
        name: 'Gqeberha Pride',
        description: 'Social group for Nelson Mandela Bay area',
        members: 78,
        link: 'https://chat.whatsapp.com/example9',
        tags: ['social', 'events', 'gqeberha']
      },
      {
        id: 10,
        name: 'EC Trans Masculine',
        description: 'Support for trans men and transmasculine people in the Eastern Cape',
        members: 78,
        link: 'https://chat.whatsapp.com/example10',
        tags: ['trans-masc', 'support', 'small-group']
      }
    ]
  },
  {
    id: 'freestate',
    name: 'Free State',
    description: 'Bloemfontein and the heart of the country',
    color: 'orange',
    memberCount: 89,
    groupCount: 1,
    groups: [
      {
        id: 11,
        name: 'Bloemfontein Queers',
        description: 'The main group for Bloem - socials, support, and connection',
        members: 89,
        link: 'https://chat.whatsapp.com/example11',
        tags: ['general', 'bloemfontein']
      }
    ]
  },
  {
    id: 'limpopo',
    name: 'Limpopo',
    description: 'Polokwane and the northern reaches',
    color: 'emerald',
    memberCount: 67,
    groupCount: 1,
    groups: [
      {
        id: 12,
        name: 'Limpopo Rainbow',
        description: 'For Polokwane and surrounding areas - you are not alone out there',
        members: 67,
        link: 'https://chat.whatsapp.com/example12',
        tags: ['general', 'rural', 'support']
      }
    ]
  },
  {
    id: 'mpumalanga',
    name: 'Mpumalanga',
    description: 'Mbombela and the scenic east',
    color: 'teal',
    memberCount: 52,
    groupCount: 1,
    groups: [
      {
        id: 13,
        name: 'Mpumalanga Connect',
        description: 'Mbombela and beyond - connecting the queer community in Mpumalanga',
        members: 52,
        link: 'https://chat.whatsapp.com/example13',
        tags: ['general', 'mbombela']
      }
    ]
  },
  {
    id: 'northwest',
    name: 'North West',
    description: 'Rustenburg, Mahikeng, and the platinum belt',
    color: 'violet',
    memberCount: 45,
    groupCount: 1,
    groups: [
      {
        id: 14,
        name: 'NW Queer Network',
        description: 'Rustenburg, Mahikeng, and surrounding areas',
        members: 45,
        link: 'https://chat.whatsapp.com/example14',
        tags: ['general', 'support']
      }
    ]
  },
  {
    id: 'northerncape',
    name: 'Northern Cape',
    description: 'Kimberley and the vast open spaces',
    color: 'pink',
    memberCount: 34,
    groupCount: 1,
    groups: [
      {
        id: 15,
        name: 'NC Solidarity',
        description: 'For Kimberley and the vast Northern Cape - distance is just numbers',
        members: 34,
        link: 'https://chat.whatsapp.com/example15',
        tags: ['general', 'support', 'rural']
      }
    ]
  }
];

const tagColors = {
  'social': 'bg-blue-100 text-blue-700',
  'support': 'bg-rose-100 text-rose-700',
  'events': 'bg-purple-100 text-purple-700',
  'youth': 'bg-green-100 text-green-700',
  'trans': 'bg-pink-100 text-pink-700',
  'enby': 'bg-indigo-100 text-indigo-700',
  'career': 'bg-amber-100 text-amber-700',
  'outdoors': 'bg-emerald-100 text-emerald-700',
  'general': 'bg-slate-100 text-slate-700',
  'rural': 'bg-orange-100 text-orange-700',
  'safe-space': 'bg-red-100 text-red-700',
  '18+': 'bg-slate-800 text-white',
  '21+': 'bg-slate-800 text-white',
  'under-21': 'bg-cyan-100 text-cyan-700',
  'small-group': 'bg-violet-100 text-violet-700',
  'active': 'bg-lime-100 text-lime-700',
  'discussion': 'bg-fuchsia-100 text-fuchsia-700',
  'community': 'bg-sky-100 text-sky-700',
  'bloemfontein': 'bg-orange-100 text-orange-700',
  'mbombela': 'bg-teal-100 text-teal-700',
  'gqeberha': 'bg-cyan-100 text-cyan-700',
  'trans-masc': 'bg-blue-100 text-blue-700',
  'virtual': 'bg-purple-100 text-purple-700',
  'resources': 'bg-amber-100 text-amber-700',
  'family': 'bg-rose-100 text-rose-700',
  'parenting': 'bg-pink-100 text-pink-700'
};

const ProvinceCard = ({ province, onClick, isNational = false }) => {
  const colorClasses = {
    rose: 'from-rose-500 to-pink-600',
    indigo: 'from-indigo-500 to-purple-600',
    amber: 'from-amber-500 to-orange-600',
    cyan: 'from-cyan-500 to-blue-600',
    orange: 'from-orange-500 to-red-600',
    emerald: 'from-emerald-500 to-green-600',
    teal: 'from-teal-500 to-cyan-600',
    violet: 'from-violet-500 to-purple-600',
    pink: 'from-pink-500 to-rose-600',
    slate: 'from-slate-600 to-slate-800'
  };

  return (
    <motion.div
      layoutId={`province-${province.id}`}
      onClick={() => onClick(province)}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-2xl transition-all cursor-pointer group ${isNational ? 'md:col-span-2 lg:col-span-3 ring-2 ring-indigo-100' : ''}`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[province.color]} opacity-0 group-hover:opacity-5 transition-opacity`} />
      
      {/* National Badge */}
      {isNational && (
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          Nationwide
        </div>
      )}
      
      {/* Content */}
      <div className="relative p-8">
        <div className="flex justify-between items-start mb-6">
          <div className={`w-14 h-14 rounded-2xl bg-${province.color}-100 text-${province.color}-600 flex items-center justify-center`}>
            {isNational ? <Globe size={28} /> : <MapPin size={28} />}
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-sm font-medium">
            <Users size={16} />
            {province.memberCount}
          </div>
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-2">{province.name}</h3>
        <p className={`text-slate-500 text-sm leading-relaxed mb-6 ${isNational ? 'max-w-2xl' : ''}`}>
          {province.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {province.groupCount} group{province.groupCount !== 1 ? 's' : ''}
          </span>
          <div className={`w-10 h-10 rounded-full bg-${province.color}-50 text-${province.color}-600 flex items-center justify-center group-hover:bg-${province.color}-600 group-hover:text-white transition-all`}>
            <ChevronRight size={20} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProvinceModal = ({ province, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const isNational = province.id === 'national';

  const filteredGroups = province.groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleJoinGroup = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        layoutId={`province-${province.id}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Modal Header */}
        <div className={`relative p-8 bg-gradient-to-r from-${province.color}-500 to-${province.color}-600 text-white`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-white" />
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              {isNational ? <Globe size={32} className="text-white" /> : <MapPin size={32} className="text-white" />}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-3xl font-black">{province.name}</h2>
                {isNational && (
                  <span className="px-2 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                    All of SA
                  </span>
                )}
              </div>
              <p className="text-white/80 text-sm">{province.description}</p>
            </div>
          </div>

          <div className="flex gap-6 text-sm font-medium">
            <span className="flex items-center gap-2">
              <Users size={16} /> {province.memberCount} members total
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle size={16} /> {province.groupCount} WhatsApp groups
            </span>
          </div>
        </div>

        {/* Search in Modal */}
        <div className="p-6 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder={`Search groups in ${province.name}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Groups List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-4">
            {filteredGroups.map((group) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-slate-900">{group.name}</h3>
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                    <Heart size={12} className="fill-current" /> {group.members}
                  </span>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {group.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {group.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tagColors[tag] || 'bg-slate-100 text-slate-600'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleJoinGroup(group.link)}
                  className={`w-full py-3 rounded-xl bg-${province.color}-600 text-white font-bold hover:bg-${province.color}-700 transition-all flex items-center justify-center gap-2 group`}
                >
                  Join WhatsApp Group
                  <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>

          {filteredGroups.length === 0 && (
            <div className="text-center py-12">
              <Search className="mx-auto mb-4 text-slate-300" size={48} />
              <p className="text-slate-500">No groups match your search</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ConnectPage = ({ setPage }) => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const allLocations = [nationalGroups, ...provinces];

  const filteredLocations = allLocations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-32 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-6 inline-block">
            Find Your People
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[0.95] mb-6">
            Connect Locally.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Belong Globally.
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Click on your province to discover WhatsApp groups in your area, 
            or browse national groups for SA-wide community.
          </p>
        </motion.header>

        {/* Safety Notice */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 p-6 rounded-3xl bg-amber-50 border border-amber-100 flex items-start gap-4 max-w-3xl mx-auto"
        >
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Shield className="text-amber-600" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-amber-900 mb-1">Safety First</h3>
            <p className="text-sm text-amber-800/80 leading-relaxed">
              All groups are vetted by our team. Never share personal banking info, 
              home address, or other sensitive details. Report suspicious behavior immediately.
            </p>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-12 max-w-md mx-auto"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Find your province or browse national..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-center"
          />
        </motion.div>

        {/* Locations Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredLocations.map((location, index) => (
            <ProvinceCard 
              key={location.id} 
              province={location} 
              onClick={setSelectedProvince}
              isNational={location.id === 'national'}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredLocations.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Search className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No locations found</h3>
            <p className="text-slate-500">Try adjusting your search</p>
          </motion.div>
        )}

        {/* Submit Group CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-black mb-4">Have a group to share?</h3>
          <p className="text-indigo-100 mb-8 max-w-md mx-auto">
            If you moderate a WhatsApp group for your local queer community, 
            submit it for review and we'll add it to the directory.
          </p>
          <button 
            onClick={() => setPage('contact')}
            className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all"
          >
            Submit a Group
          </button>
        </motion.div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProvince && (
          <ProvinceModal 
            province={selectedProvince} 
            onClose={() => setSelectedProvince(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConnectPage;