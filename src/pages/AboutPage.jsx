// src/pages/AboutPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Users, Sparkles, Target, Globe } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: "Safety First",
      desc: "Every space we create prioritizes physical and emotional safety. No exceptions."
    },
    {
      icon: Heart,
      title: "Radical Acceptance",
      desc: "You are valid exactly as you are. No labels required, no boxes to check."
    },
    {
      icon: Users,
      title: "Community Led",
      desc: "Built by the community, for the community. Peer support is our foundation."
    },
    {
      icon: Globe,
      title: "Digital Accessibility",
      desc: "Reaching rural and remote areas through online spaces when physical isn't possible."
    }
  ];

  const team = [
    { name: "Alex Chen", role: "Founder", pronouns: "they/them", color: "indigo" },
    { name: "Samira Nkosi", role: "Community Lead", pronouns: "she/her", color: "rose" },
    { name: "Jordan Peters", role: "Safety Officer", pronouns: "he/him", color: "cyan" }
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-32 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
            Our <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Sanctuary</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Project Sapphire was born from a simple belief: everyone deserves a place to 
            discover themselves without fear. We're building that place, together.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-sanctuary rounded-[3rem] p-10 md:p-16 mb-20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400" />
          <Sparkles className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto italic">
            "To create digital and physical sanctuaries where queer individuals can explore identity, 
            find community, and access life-saving resources—regardless of where they are in their journey 
            or geography."
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-sanctuary p-8 rounded-[2.5rem] hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <value.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
              <p className="text-slate-600 leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Care Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-[2rem] glass-sanctuary"
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-${member.color}-100 flex items-center justify-center text-2xl font-bold text-${member.color}-600`}>
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{member.name}</h3>
                <p className="text-indigo-600 font-medium text-sm mb-1">{member.role}</p>
                <p className="text-slate-400 text-xs uppercase tracking-wider">{member.pronouns}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center p-12 rounded-[3rem] bg-gradient-to-r from-indigo-50 to-rose-50 border border-indigo-100/50"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Join Our Mission</h3>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            We're always looking for volunteers, moderators, and supporters to help grow the sanctuary.
          </p>
          <button className="btn-primary">
            Get Involved
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;