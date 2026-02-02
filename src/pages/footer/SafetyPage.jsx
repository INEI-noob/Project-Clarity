import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  EyeOff, 
  Lock, 
  Wifi, 
  Smartphone, 
  Home, 
  X, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

const SafetyPage = () => {
  const [activeTab, setActiveTab] = useState('digital');

  // Quick Exit functionality (redirects to Google immediately)
  const quickExit = () => {
    window.location.href = 'https://www.google.com';
  };

  const digitalTips = [
    {
      icon: <EyeOff className="text-indigo-500" />,
      title: "Incognito Browsing",
      desc: "Use private/incognito mode to prevent your browser from saving your history or search terms locally.",
      action: "Command+Shift+N (Mac) or Ctrl+Shift+N (PC)"
    },
    {
      icon: <Lock className="text-rose-500" />,
      title: "Clear Your History",
      desc: "If you weren't in private mode, remember to clear your history, cookies, and cache manually after your session.",
      action: "Settings > Privacy > Clear Browsing Data"
    },
    {
      icon: <Smartphone className="text-amber-500" />,
      title: "App Privacy",
      desc: "Check if your mobile apps have 'App Lock' features or use biological authentication (FaceID/Fingerprint).",
      action: "Check Device Settings"
    }
  ];

  const physicalTips = [
    {
      icon: <Home className="text-emerald-500" />,
      title: "Safety at Home",
      desc: "If you share a device, consider using a separate guest profile that is password protected.",
    },
    {
      icon: <Wifi className="text-blue-500" />,
      title: "Public Networks",
      desc: "Be cautious on public Wi-Fi. Avoid accessing sensitive accounts or identifying information on open networks.",
    },
    {
      icon: <AlertCircle className="text-orange-500" />,
      title: "Location Privacy",
      desc: "Turn off location services for social media apps if you are in an environment that feels unsafe.",
    }
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-32 px-4 md:px-6 bg-slate-50">
      {/* Floating Quick Exit Button */}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-6">
            <ShieldCheck size={14} /> Your Privacy Matters
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Safety & <span className="text-indigo-600">Privacy Guide</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Protecting your digital footprint is a vital part of self-care. Use these guidelines to browse safely and keep your information private.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-200/50 rounded-2xl mb-8 max-w-sm">
          <button 
            onClick={() => setActiveTab('digital')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'digital' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Digital Safety
          </button>
          <button 
            onClick={() => setActiveTab('physical')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'physical' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Physical Safety
          </button>
        </div>

        {/* Content Cards */}
        <div className="grid gap-6">
          <AnimatePresence mode="wait">
            {activeTab === 'digital' ? (
              <motion.div 
                key="digital"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {digitalTips.map((tip, i) => (
                  <div key={i} className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-5">
                      <div className="p-3 rounded-2xl bg-slate-50">
                        {tip.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{tip.title}</h3>
                        <p className="text-slate-600 mb-4 leading-relaxed">{tip.desc}</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-mono text-slate-500">
                          <Info size={12} /> {tip.action}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="physical"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid md:grid-cols-2 gap-4"
              >
                {physicalTips.map((tip, i) => (
                  <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 flex flex-col">
                    <div className="mb-4">{tip.icon}</div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{tip.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                      {tip.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Warning Callout */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 p-8 rounded-[2.5rem] bg-indigo-900 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldCheck size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">No tool is 100% hidden</h3>
            <p className="text-indigo-100 leading-relaxed mb-6">
              While these tips help, the most secure way to browse is on a personal device that you do not share. 
              If you believe someone is monitoring your device, seek help from a trusted professional or use a public computer (like a library).
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SafetyPage;