import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GuideFeedback from '../../components/GuideFeedback';
import { 
  ShieldCheck, 
  Heart, 
  AlertTriangle, 
  MessageCircle, 
  CheckCircle2, 
  ArrowLeft, 
  ExternalLink,
  Users,
  Lightbulb,
  Sparkles,
  Circle,
  ArrowRight,
  Phone,
  Home,
  Umbrella
} from 'lucide-react';

/**
 * Coming Out Guide - A love letter to those standing at the threshold
 * Location: src/pages/ComingOutGuide.jsx
 * Tone: Warm, validating, non-prescriptive, trauma-informed
 */

const Section = ({ title, icon: Icon, children, color = "indigo" }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-20"
  >
    <div className="flex items-center gap-4 mb-8">
      <div className={`p-3 rounded-2xl bg-${color}-50 text-${color}-600`}>
        <Icon size={28} />
      </div>
      <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">{title}</h3>
    </div>
    <div className="pl-2 md:border-l-2 border-slate-100 md:ml-6">
      {children}
    </div>
  </motion.section>
);

const SafetyCard = ({ title, items, type = "success" }) => (
  <div className={`p-8 rounded-[2rem] mb-6 ${
    type === "warning" ? 'bg-rose-50/80 border border-rose-100' : 'bg-emerald-50/50 border border-emerald-100'
  }`}>
    <h4 className={`text-xl font-black mb-4 flex items-center gap-2 ${
      type === "warning" ? 'text-rose-700' : 'text-emerald-700'
    }`}>
      {type === "warning" ? <AlertTriangle size={20} /> : <Umbrella size={20} />}
      {title}
    </h4>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-slate-700 font-medium leading-relaxed">
          <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            type === "warning" ? 'bg-rose-400' : 'bg-emerald-400'
          }`} />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const QuoteBlock = ({ children, author, context }) => (
  <div className="my-12 p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 relative overflow-hidden">
    <div className="absolute top-6 left-8 text-6xl text-indigo-200 font-serif leading-none">"</div>
    <blockquote className="relative z-10 text-xl md:text-2xl text-slate-800 font-medium italic leading-relaxed mb-6">
      {children}
    </blockquote>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold">
        {author.charAt(0)}
      </div>
      <div>
        <p className="font-bold text-slate-900">{author}</p>
        <p className="text-sm text-slate-500">{context}</p>
      </div>
    </div>
  </div>
);

const ComingOutGuide = () => {
  return (
    <div className="min-h-screen pt-32 pb-32 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs / Back */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold uppercase text-[11px] tracking-[0.2em] mb-12 transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Guides
        </button>

        {/* Hero Header */}
        <header className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-6 inline-block">
              Personal Reflections
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[0.95] mb-8">
              The Door Is <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">Already Open.</span>
            </h1>
            <div className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl space-y-6">
              <p>
                If you're here, reading this, you might be feeling that tightness in your chest. The one that comes from carrying something beautiful but heavy. 
              </p>
              <p className="text-slate-500">
                Take a breath. There's no rush. This page will wait for you.
              </p>
            </div>
          </motion.div>
        </header>

        {/* Validation Section */}
        <QuoteBlock author="A community member" context="Cape Town, 2024">
          I thought coming out would be a single moment—big, dramatic, final. But it turned out to be a thousand small conversations, some easy, some hard, some that went wrong and some that surprised me with their gentleness. There's no 'finish line.' Just living more honestly, day by day.
        </QuoteBlock>

        {/* Core Principles - Reframed as Warnings/Comfort */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            { 
              title: "You Don't Owe Anyone", 
              text: "Your truth is a gift, not a debt. You get to choose who receives it and when.", 
              icon: Heart,
              color: "text-rose-500"
            },
            { 
              title: "Your Pace Is Sacred", 
              text: "Some people know at 12 and speak at 30. Some never speak it aloud. All are valid.", 
              icon: Sparkles,
              color: "text-amber-500"
            },
            { 
              title: "You Can Take It Back", 
              text: "If you come out and realize it wasn't safe, you can return to the closet. Survival first.", 
              icon: Umbrella,
              color: "text-cyan-500"
            },
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all group">
              <item.icon className={`${item.color} mb-5 group-hover:scale-110 transition-transform`} size={28} />
              <h4 className="font-black text-lg mb-3 text-slate-900">{item.title}</h4>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Safety First - Reframed as Caring, Not Clinical */}
        <Section title="Protecting Your Heart" icon={ShieldCheck} color="emerald">
          <div className="prose prose-lg text-slate-600 mb-10 font-medium leading-relaxed">
            <p className="mb-4">
              Before we talk about the words you'll use, let's talk about your safety. Not because coming out is dangerous—though sometimes it is—but because <strong>you are precious</strong>, and protecting yourself isn't paranoia; it's wisdom.
            </p>
            <p>
              You don't need to be "brave" right now. You need to be safe.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <SafetyCard 
              title="Soft Landings"
              items={[
                "One person who already knows and has your back (even if it's an online friend)",
                "A plan for where you can go if you need air (a friend's couch, a coffee shop, a park)",
                "Your important documents and some cash somewhere accessible, just in case",
                "The number of someone you can call if the conversation goes sideways"
              ]}
            />
            <SafetyCard 
              type="warning"
              title="Maybe Wait If..."
              items={[
                "You're currently dependent on someone who reacts to news with violence or punishment",
                "You're in the middle of a mental health crisis and couldn't handle a bad reaction right now",
                "You don't have anywhere else to sleep tonight if things go poorly",
                "You feel pressured to come out by a deadline that isn't yours"
              ]}
            />
          </div>
          
          <div className="mt-8 p-6 rounded-2xl bg-amber-50 border border-amber-100 text-amber-800 text-sm font-medium">
            <strong>Remember:</strong> Coming out isn't a confession. It's an invitation to know you better. You don't have to accept every reaction as valid, especially if it's cruel.
          </div>
        </Section>

        {/* The Strategy - Warmer Approach */}
        <Section title="Finding Your Words" icon={MessageCircle} color="indigo">
          <div className="space-y-8">
            <div className="p-8 md:p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
              <div className="relative z-10">
                <h4 className="text-2xl font-black mb-6 italic">Start With The Softest Landing</h4>
                <p className="text-slate-300 mb-8 font-medium leading-relaxed">
                  You don't have to start with the person who scares you most. Practice with the mirror, then the cat, then that one friend who makes you feel like sunshine. Build your confidence in safe soil before you transplant to rockier ground.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['A favorite teacher', 'Online friends who get it', 'A cousin or distant relative', 'A counselor or doctor', 'The family pet (seriously, practice matters)'].map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-full bg-white/10 text-white text-[11px] font-bold uppercase tracking-wider border border-white/10 backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[3rem] shadow-sm">
              <h4 className="text-2xl font-black mb-6 flex items-center gap-3 text-slate-900">
                <Lightbulb className="text-amber-500" size={28} /> What You Might Say
              </h4>
              <p className="text-slate-600 mb-8 font-medium leading-relaxed">
                There's no perfect script. But here are some starting points that feel less like announcements and more like conversations:
              </p>
              
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-indigo-400 italic text-slate-700 font-medium relative overflow-hidden">
                  <Sparkles className="absolute right-4 top-4 text-indigo-200" size={24} />
                  "I've been learning something important about myself, and I want to share it with you because you're important to me. I'm [identity/label], and I'm still figuring out what that means for me."
                </div>
                
                <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-purple-400 italic text-slate-700 font-medium">
                  "I need you to know that I'm not the [straight/cis] person you thought I was. I'm [identity]. I'm telling you because I want us to be closer, not because I'm looking for debate."
                </div>
                
                <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-pink-400 italic text-slate-700 font-medium">
                  "I don't have everything figured out yet, but I know I'm not [previous assumption]. Can I trust you with that while I explore what it means?"
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-slate-600 font-medium flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-1" size={20} />
                  <span>
                    <strong className="text-slate-900">You don't need a label.</strong> "I like who I like" or "I'm questioning" or "I'm not straight" are complete sentences. You don't need a PhD in yourself to be valid.
                  </span>
                </p>
              </div>
            </div>

            {/* The Bad Reaction Section - Crucial inclusion */}
            <div className="p-8 md:p-10 rounded-[3rem] bg-rose-50 border border-rose-100">
              <h4 className="text-2xl font-black mb-4 text-rose-900 flex items-center gap-3">
                <Heart className="fill-rose-500 text-rose-500" /> If They Don't Respond With Love
              </h4>
              <div className="space-y-4 text-rose-900/80 font-medium leading-relaxed">
                <p>
                  Sometimes, the people we love don't rise to the occasion. Sometimes they cry, or rage, or say "it's just a phase," or ask invasive questions, or freeze up completely.
                </p>
                <p className="text-rose-900 font-bold">
                  Their reaction is not a verdict on your worth.
                </p>
                <p>
                  If it goes badly:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-rose-400">
                  <li>You can leave the room. You don't have to stay and absorb it.</li>
                  <li>You can say, "I can see you need time to process. I'm going to go now."</li>
                  <li>You can call that backup person we talked about earlier.</li>
                  <li>You can cry. You're allowed to grieve the reaction you hoped for.</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Aftercare - New Section */}
        <Section title="After The Words Leave Your Mouth" icon={Home} color="purple">
          <div className="prose prose-lg text-slate-600 font-medium leading-relaxed mb-8">
            <p>
              Whether it went beautifully or painfully, coming out is an emotional earthquake. You might feel elated, exhausted, nauseous, or curiously numb. All of it is normal.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-[2.5rem] bg-purple-50 border border-purple-100">
              <h4 className="font-black text-xl mb-4 text-purple-900">Right After</h4>
              <ul className="space-y-3 text-slate-700 font-medium">
                <li className="flex items-start gap-3"><span className="text-purple-400 mt-1">◦</span> Drink water. Shock dehydrates.</li>
                <li className="flex items-start gap-3"><span className="text-purple-400 mt-1">◦</span> Text someone who knows, even if just to say "I did it."</li>
                <li className="flex items-start gap-3"><span className="text-purple-400 mt-1">◦</span> You don't have to answer follow-up questions immediately.</li>
                <li className="flex items-start gap-3"><span className="text-purple-400 mt-1">◦</span> Sleep. Eat something comforting.</li>
              </ul>
            </div>
            <div className="p-8 rounded-[2.5rem] bg-indigo-50 border border-indigo-100">
              <h4 className="font-black text-xl mb-4 text-indigo-900">The Coming Weeks</h4>
              <ul className="space-y-3 text-slate-700 font-medium">
                <li className="flex items-start gap-3"><span className="text-indigo-400 mt-1">◦</span> People may "forget" or test boundaries. This is their work, not yours.</li>
                <li className="flex items-start gap-3"><span className="text-indigo-400 mt-1">◦</span> You might feel "post-coming-out depression" even after good reactions. It's the adrenaline crashing.</li>
                <li className="flex items-start gap-3"><span className="text-indigo-400 mt-1">◦</span> You get to change your mind about labels. Identity is fluid.</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* South Africa Resources - Warmer Presentation */}
        <div className="mt-32 p-8 md:p-16 rounded-[4rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-black mb-4 italic">You're Not Alone Here.</h3>
            <p className="text-indigo-100 font-medium text-lg mb-12 max-w-2xl">
              South Africa has one of the most progressive constitutions in the world, but that doesn't always translate to your dining room table. When you need to talk to someone who gets it:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <a href="tel:021 712 6699" className="group p-8 rounded-3xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm">
                <div className="flex items-start justify-between mb-4">
                  <Phone className="text-indigo-200" size={24} />
                  <ExternalLink size={20} className="text-white/50 group-hover:text-white transition-colors" />
                </div>
                <p className="text-[11px] font-black uppercase tracking-widest opacity-70 mb-2">Triangle Project (Cape Town)</p>
                <p className="text-3xl font-black">021 712 6699</p>
                <p className="mt-2 text-sm text-indigo-100">Mon-Fri 10am-6pm. They listen. They understand.</p>
              </a>
              
              <div className="p-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-4">
                  <Users className="text-pink-200" size={24} />
                </div>
                <p className="text-[11px] font-black uppercase tracking-widest opacity-70 mb-2">The Rant Room</p>
                <p className="text-2xl font-black italic">Community Hub</p>
                <p className="mt-2 text-sm text-indigo-100">Sometimes you don't need a hotline. You need people who are walking the same road.</p>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-xl md:text-2xl font-medium italic text-white/90">
                "You are already brave for existing in a world that asks you to shrink. 
                <span className="block mt-2 text-white font-bold">You don't have to be brave alone."</span>
              </p>
            </div>
          </div>
        </div>

        {/* Final Affirmation */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <p className="text-slate-500 font-medium italic">
            This guide was written with love by and for the queer community of South Africa. 
            It is a living document—just like your identity.
          </p>
        </motion.div>

        <GuideFeedback guideId="coming-out" guideTitle="Coming Out" />
      </div>
    </div>
  );
};

export default ComingOutGuide;