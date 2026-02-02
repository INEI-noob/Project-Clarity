// src/pages/CrisisPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Globe, 
  MessageCircle, 
  Heart, 
  Shield, 
  AlertTriangle, 
  Clock,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  MapPin
} from 'lucide-react';

const CrisisPage = () => {
  const [copiedNumber, setCopiedNumber] = useState(null);
  const [expandedSection, setExpandedSection] = useState('south-africa');

  const handleCopy = (number, id) => {
    navigator.clipboard.writeText(number.replace(/\s/g, ''));
    setCopiedNumber(id);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const resources = {
    'south-africa': {
      name: "South Africa",
      flag: "🇿🇦",
      emergency: {
        name: "Triangle Project Crisis Line",
        number: "021 712 6699",
        hours: "24/7",
        type: "LGBTQ+ Specific"
      },
      services: [
        { name: "Lifeline SA", number: "011 715 2000", type: "Suicide Prevention", hours: "24/7" },
        { name: "LoveLife Call Centre", number: "0800 121 900", type: "Youth Support", hours: "Mon-Sat 9AM-6PM" },
        { name: "SADAG Mental Health", number: "0800 567 567", type: "Counseling", hours: "8AM-8PM" },
        { name: "Gender Dynamix", number: "021 447 4797", type: "Transgender Support", hours: "Office Hours" }
      ]
    },
    'international': {
      name: "International",
      flag: "🌍",
      services: [
        { name: "The Trevor Project (US)", number: "1-866-488-7386", type: "LGBTQ+ Youth", hours: "24/7" },
        { name: "Switchboard (UK)", number: "0800 0119 100", type: "LGBTQ+ Support", hours: "10AM-10PM" },
        { name: "QLife (Australia)", number: "1800 184 527", type: "Counseling", hours: "3PM-Midnight" }
      ]
    }
  };

  const safetyTips = [
    "You don't have to give your real name",
    "You can hang up and call back anytime",
    "All calls are confidential and judgment-free",
    "If busy, try texting or web chat options"
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-32 px-4 md:px-6 bg-gradient-to-b from-rose-50/30 via-white to-indigo-50/30">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-10 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Emergency Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-700 font-bold text-xs uppercase tracking-wider mb-6"
          >
            <AlertTriangle size={14} className="animate-pulse" /> 
            Immediate Help Available
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
            You Are <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-500">Not Alone</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            If you're in crisis, please reach out. These resources are here for you—
            judgment-free, confidential, and staffed by people who understand.
          </p>
        </motion.div>

        {/* Primary Crisis Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-sanctuary rounded-[3rem] p-8 md:p-12 mb-8 border-2 border-rose-200/50 shadow-2xl shadow-rose-100/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-100/50 to-transparent rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 text-white flex items-center justify-center shrink-0 shadow-xl shadow-rose-200">
                <Phone size={32} />
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-1 block">Emergency Line</span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Triangle Project</h2>
                <p className="text-slate-600 mb-4">LGBTQ+ specific crisis support. Trained counselors who understand.</p>
                
                <div className="flex items-center gap-3 mb-2">
                  <a 
                    href="tel:021 712 6699" 
                    className="text-4xl md:text-5xl font-bold text-rose-600 hover:text-rose-700 transition-colors tracking-tight"
                  >
                    021 712 6699
                  </a>
                  <button 
                    onClick={() => handleCopy('021 712 6699', 'main')}
                    className="p-3 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                    title="Copy number"
                  >
                    {copiedNumber === 'main' ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock size={14} />
                  <span>Available 24 hours, 7 days a week • Free call</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://wa.me/27871632050"
                className="p-4 rounded-2xl bg-white/60 border border-rose-100 text-rose-700 font-bold hover:bg-rose-50 transition-all flex items-center justify-center gap-2 group"
              >
                <MessageCircle size={18} className="group-hover:scale-110 transition-transform" /> 
                WhatsApp Chat
              </a>
              <button className="p-4 rounded-2xl bg-white/60 border border-rose-100 text-rose-700 font-bold hover:bg-rose-50 transition-all flex items-center justify-center gap-2">
                <Globe size={18} /> Web Chat (Coming Soon)
              </button>
            </div>
          </div>
        </motion.div>

        {/* Safety Tips */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
        >
          {safetyTips.map((tip, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl glass-sanctuary">
              <Shield size={18} className="text-indigo-500 shrink-0" />
              <span className="text-sm font-medium text-slate-700">{tip}</span>
            </div>
          ))}
        </motion.div>

        {/* Accordion Resources */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <MapPin size={20} className="text-indigo-500" />
            More Resources
          </h3>

          {Object.entries(resources).map(([key, region]) => (
            <motion.div 
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-sanctuary rounded-[2.5rem] overflow-hidden"
            >
              <button
                onClick={() => setExpandedSection(expandedSection === key ? null : key)}
                className="w-full p-6 flex items-center justify-between hover:bg-white/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{region.flag}</span>
                  <span className="font-bold text-slate-900">{region.name}</span>
                </div>
                {expandedSection === key ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
              </button>

              <AnimatePresence>
                {expandedSection === key && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 space-y-3">
                      {region.emergency && (
                        <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 mb-4">
                          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1">Primary Crisis Line</span>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold text-slate-900 block">{region.emergency.name}</span>
                              <span className="text-xs text-slate-500">{region.emergency.type} • {region.emergency.hours}</span>
                            </div>
                            <a 
                              href={`tel:${region.emergency.number.replace(/\s/g, '')}`}
                              className="px-4 py-2 bg-rose-500 text-white rounded-xl font-bold text-sm hover:bg-rose-600 transition-colors"
                            >
                              {region.emergency.number}
                            </a>
                          </div>
                        </div>
                      )}
                      
                      {region.services.map((service) => (
                        <div key={service.name} className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/60">
                          <div>
                            <span className="font-bold text-slate-900 block">{service.name}</span>
                            <span className="text-xs text-slate-500 uppercase tracking-wider">{service.type} • {service.hours}</span>
                          </div>
                          <button 
                            onClick={() => handleCopy(service.number, service.name)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-indigo-600 transition-colors"
                          >
                            {copiedNumber === service.name ? <Check size={16} /> : <Copy size={16} />}
                            {service.number}
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom Reassurance */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-8 rounded-[3rem] bg-gradient-to-r from-indigo-50 via-white to-purple-50 border border-indigo-100/50"
        >
          <Heart className="w-12 h-12 text-rose-400 fill-rose-200 mx-auto mb-4 animate-pulse" />
          <h3 className="text-2xl font-bold text-slate-900 mb-3">This is a Safe Moment</h3>
          <p className="text-slate-600 max-w-lg mx-auto leading-relaxed">
            Whatever you're feeling right now is valid. You don't have to go through it alone. 
            Take a breath. Reach out when you're ready. We believe you, we see you, and we care.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CrisisPage;