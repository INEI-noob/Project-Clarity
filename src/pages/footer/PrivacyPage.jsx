import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  EyeOff, 
  Trash2, 
  Search, 
  UserPlus, 
  Heart,
  Lock,
  Ghost,
  DatabaseZap
} from 'lucide-react';

const PrivacyPage = () => {
  const promises = [
    {
      icon: <Ghost className="text-purple-500" />,
      title: "No Hidden Tracking",
      desc: "We don't use invasive tracking cookies or fingerprinting. We don't want to follow you across the web; we just want to be here when you need us."
    },
    {
      icon: <DatabaseZap className="text-amber-500" />,
      title: "Zero Data Retention",
      desc: "Crisis resources viewed and search queries made on this site are not saved to our database. Your path through this site is your business alone."
    },
    {
      icon: <EyeOff className="text-rose-500" />,
      title: "No Data Sales",
      desc: "We will never sell your information to advertisers or third parties. Our 'product' is safety, not your personal identity."
    }
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-32 px-4 md:px-6 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-widest mb-6">
            <Lock size={14} /> Trust & Transparency
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Privacy Promise</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Privacy isn't a "feature" for us—it's the foundation of everything we build. 
            Here is how we protect you, in plain English.
          </p>
        </motion.div>

        {/* The Promises Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {promises.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Breakdown Section */}
        <div className="space-y-12">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">What we <span className="italic text-emerald-600">don't</span> know about you</h2>
              <ul className="space-y-4">
                {[
                  { icon: <UserPlus />, text: "We don't know your name or gender unless you tell us." },
                  { icon: <Search />, text: "We don't know what you searched for 5 minutes ago." },
                  { icon: <Trash2 />, text: "We don't keep logs of your IP address in our analytics." }
                ].map((li, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-600">
                    <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">{li.icon}</span>
                    {li.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
               <ShieldCheck className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5" />
               <h3 className="text-2xl font-bold mb-4">Encryption by Default</h3>
               <p className="text-slate-400 leading-relaxed mb-6">
                 Every connection to our sanctuary is encrypted via SSL. This means even if you're on a public network, the "tunnel" between you and our resources is locked from the outside.
               </p>
               <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
            </div>
          </motion.div>

          {/* Simple Choice Callout */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-12 rounded-[3.5rem] bg-gradient-to-br from-emerald-600 to-teal-700 text-white text-center"
          >
            <Heart className="w-12 h-12 mx-auto mb-6 text-emerald-300 fill-emerald-300/20" />
            <h2 className="text-3xl font-bold mb-4">Your safety is our only metric.</h2>
            <p className="text-emerald-50 max-w-xl mx-auto leading-relaxed mb-8">
              We measure our success by how many people we help find peace, not by how many data points we can collect. If you ever have questions about your data, our team is here to talk.
            </p>
            <button className="px-8 py-4 bg-white text-emerald-700 rounded-full font-bold hover:bg-emerald-50 transition-colors shadow-lg shadow-emerald-900/20">
              Contact Privacy Team
            </button>
          </motion.div>
        </div>

        {/* Legal Footer Mini */}
        <div className="mt-20 text-center text-slate-400 text-sm">
          <p>© 2024 Your Sanctuary Project • Last updated June 2024</p>
          <div className="flex justify-center gap-6 mt-4 font-medium underline underline-offset-4 decoration-slate-200">
            <a href="#" className="hover:text-slate-600">Full Legal Terms</a>
            <a href="#" className="hover:text-slate-600">Cookie Policy</a>
            <a href="#" className="hover:text-slate-600">GDPR Compliance</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;