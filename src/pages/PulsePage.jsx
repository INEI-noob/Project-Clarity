import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Heart, 
  MessageSquare, 
  Send, 
  MoreHorizontal, 
  TrendingUp, 
  Zap,
  Ghost,
  Star,
  User,
  EyeOff,
  Eye
} from 'lucide-react';

/**
 * PROJECT SAPPHIRE - PULSE (THE RANT ROOM)
 * Updated with Identity Toggle (Anonymous vs Named)
 */

// --- [ CARD PRIMITIVES ] ---

const Card = ({ 
  children, 
  className = "", 
  variant = "default", 
  hover = true 
}) => {
  const variants = {
    default: "bg-white border border-slate-100",
    glass: "bg-white/60 backdrop-blur-xl border border-white/20",
    dark: "bg-slate-900 text-white border-slate-800",
    iridescent: "bg-white shadow-2xl shadow-indigo-100/50"
  };

  return (
    <motion.div
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={`relative p-8 rounded-[3rem] flex flex-col overflow-hidden transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- [ MAIN PAGE ] ---

const PulsePage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Stardust",
      content: "Just had my first 'chosen family' dinner and I've never felt more seen. There is hope, I promise.",
      likes: 124,
      replies: 12,
      type: "joy",
      time: "2m ago"
    },
    {
      id: 2,
      user: "Neon_Ghost",
      content: "Why is it so hard to find queer-coded spaces that aren't just loud bars? I just want a quiet iridescent library.",
      likes: 89,
      replies: 45,
      type: "rant",
      time: "15m ago"
    }
  ]);

  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const displayName = isAnonymous ? "Anonymous" : (userName.trim() || "Sapphire User");
    
    const newPost = {
      id: Date.now(),
      user: displayName,
      content: input,
      likes: 0,
      replies: 0,
      type: "new",
      time: "Just now"
    };
    setPosts([newPost, ...posts]);
    setInput("");
    setUserName("");
  };

  return (
    <div className="pt-40 pb-32 px-6 max-w-4xl mx-auto">
      <div className="mb-16">
        <div className="flex items-center gap-2 text-rose-500 font-black text-xs uppercase tracking-[0.3em] mb-4">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" /> Live Pulse
        </div>
        <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter text-slate-900 mb-8">Pulse.</h2>
        <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl">
          The Rant Room. Anonymous, raw, and real. Share what's on your heart.
        </p>
      </div>

      {/* Post Input Container */}
      <div className="mb-16 p-1 rounded-[3rem] bg-gradient-to-r from-rose-200 via-purple-100 to-indigo-200 shadow-2xl">
        <div className="bg-white rounded-[2.8rem] p-6 space-y-4">
          
          {/* Identity Toggle */}
          <div className="flex items-center justify-between px-6 py-3 bg-slate-50 rounded-2xl">
             <div className="flex items-center gap-3">
               {isAnonymous ? <EyeOff size={18} className="text-slate-400" /> : <Eye size={18} className="text-indigo-600" />}
               <span className="text-xs font-black uppercase tracking-widest text-slate-600">
                 Posting as {isAnonymous ? 'Anonymous' : 'Yourself'}
               </span>
             </div>
             <button 
               type="button"
               onClick={() => setIsAnonymous(!isAnonymous)}
               className={`w-12 h-6 rounded-full transition-colors relative ${isAnonymous ? 'bg-slate-300' : 'bg-indigo-600'}`}
             >
               <motion.div 
                 animate={{ x: isAnonymous ? 4 : 28 }}
                 className="w-4 h-4 bg-white rounded-full absolute top-1"
               />
             </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Conditional Name Field */}
            <AnimatePresence>
              {!isAnonymous && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-4 bg-indigo-50/50 rounded-2xl px-6 py-3 border border-indigo-100">
                    <User size={18} className="text-indigo-400" />
                    <input 
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your name or handle..."
                      className="bg-transparent border-none outline-none font-bold text-slate-700 placeholder:text-slate-300 w-full"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Content Input */}
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-[2rem]">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                {isAnonymous ? <Ghost size={20} /> : <User size={20} className="text-indigo-400" />}
              </div>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Vent, celebrate, or just breathe..."
                className="flex-1 bg-transparent border-none outline-none font-bold text-lg text-slate-700 placeholder:text-slate-300 min-h-[100px] py-2"
              />
            </div>

            <div className="flex justify-end">
              <button 
                type="submit" 
                className="px-10 py-4 rounded-2xl bg-slate-900 text-white font-black flex items-center gap-3 hover:bg-rose-500 transition-all group shadow-lg"
              >
                Pulse It <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-8">
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className={`border-l-8 group ${post.user === 'Anonymous' ? 'border-l-slate-300' : 'border-l-rose-400'}`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      post.user === 'Anonymous' ? 'bg-slate-50 text-slate-400' : 'bg-rose-50 text-rose-500'
                    }`}>
                      {post.user === 'Anonymous' ? <Ghost size={18} /> : <User size={18} />}
                    </div>
                    <div>
                      <span className="block font-black text-xs uppercase tracking-widest text-slate-900">{post.user}</span>
                      <span className="text-[10px] font-bold text-slate-300 uppercase">{post.time}</span>
                    </div>
                  </div>
                  <MoreHorizontal className="text-slate-200" />
                </div>
                <p className="text-2xl md:text-3xl font-medium text-slate-700 italic leading-tight mb-8">"{post.content}"</p>
                <div className="mt-auto pt-6 border-t border-slate-50 flex gap-8 items-center">
                  <button className="flex items-center gap-2 text-slate-400 hover:text-rose-500 font-black text-xs transition-colors">
                    <Heart size={18} /> {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-500 font-black text-xs transition-colors">
                    <MessageSquare size={18} /> {post.replies}
                  </button>
                  <div className="ml-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-200">
                    <TrendingUp size={14} /> Trending
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PulsePage;