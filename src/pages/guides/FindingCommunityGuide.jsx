import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  Globe, 
  Heart, 
  ArrowLeft, 
  MessageSquare, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Coffee,
  Home,
  Wifi,
  AlertCircle,
  Phone
} from 'lucide-react';

/**
 * Finding Community Guide - You don't have to do this alone
 * Location: src/pages/FindingCommunityGuide.jsx
 */

const CommunityTier = ({ title, subtitle, items, icon: Icon, colorClass, description }) => (
  <div className={`bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-sm mb-8 relative overflow-hidden group hover:shadow-lg transition-all`}>
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClass} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity`} />
    <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50 text-slate-900 group-hover:scale-110 transition-transform duration-500 flex-shrink-0`}>
        <Icon size={28} />
      </div>
      <div className="flex-1">
        <h4 className="text-2xl font-black mb-1 text-slate-900">{title}</h4>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">{subtitle}</p>
        <p className="text-slate-600 font-medium mb-6 leading-relaxed text-sm">
          {description}
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-transparent hover:border-slate-200 transition-colors">
              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colorClass}`} />
              <span className="text-slate-700 font-medium text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const FindingCommunityGuide = () => {
  return (
    <div className="min-h-screen pt-32 pb-32 px-6 bg-gradient-to-b from-white to-slate-50/30">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold uppercase text-[11px] tracking-widest mb-12 transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Guides
        </button>

        {/* Header */}
        <header className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-4 py-2 rounded-full bg-cyan-50 text-cyan-600 font-black text-[10px] uppercase tracking-widest mb-6 inline-block">
              You Are Not Alone
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[0.95] mb-8">
              Finding Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600">People.</span>
            </h1>
            <div className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl space-y-6">
              <p>
                There's a specific kind of loneliness that comes from being surrounded by people who don't know the real you. From laughing at jokes you don't find funny, from being misgendered by family at dinner and feeling your stomach drop, from thinking <em>"I must be the only one like me in this whole country."</em>
              </p>
              <p className="text-slate-500">
                You're not. We're here. Sometimes we're just hard to find because we're also protecting ourselves. This guide is a map to us.
              </p>
            </div>
          </motion.div>
        </header>

        {/* The Fear Section - Important validation */}
        <div className="mb-20 p-8 md:p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black mb-6 italic text-blue-800/60">"But what if they're weird? What if I'm not [gay/trans/bi] enough?"</h3>
            <div className="space-y-4 text-slate-300 font-medium leading-relaxed max-w-3xl">
              <p>
                Every queer person has this anxiety before entering a community space. The fear that you'll be judged for not knowing the lingo, for being "too straight-presenting," for being too old, too young, too precautions, too something.
              </p>
              <p className="text-white">
                <strong>Listen:</strong> Community isn't about perfection. It's about finding people who understand that specific ache of hiding. You don't need to have your identity figured out. You don't need to be "out" to everyone. You just need to be respectful and open.
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        {/* Geography Reality Check */}
        <div className="mb-16 p-8 rounded-3xl bg-amber-50 border border-amber-100">
          <div className="flex items-start gap-4">
            <MapPin className="text-amber-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-black text-amber-900 mb-2">A note on South African geography</h4>
              <p className="text-amber-900/80 font-medium leading-relaxed text-sm">
                Yes, Cape Town has the visible rainbow crosswalks and the nightlife. But Joburg has FEW (Forum for the Empowerment of Women) and fierce activism. Durban has the KZN Pride. Even smaller towns have WhatsApp groups you can find through Triangle Project. <strong>Don't let "I don't live in Cape Town" stop you.</strong> And if you are rural—digital community is real community. Full stop.
              </p>
            </div>
          </div>
        </div>

        {/* Levels of Connection */}
        <section className="mb-24">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-12 text-center">Three Doorways In</h3>
          
          <CommunityTier 
            title="Start Where You Are"
            subtitle="Digital Spaces (Safest)"
            icon={Wifi}
            colorClass="from-cyan-400 to-blue-500"
            description="If you can't be out, if you live in a small town, if the idea of walking into a room of strangers makes you nauseous—start here. Online community is valid, full stop. It's where many of us found our first 'me too.'"
            items={[
              "Triangle Project Discord/WhatsApp groups",
              "r/LGBTSouthAfrica (Reddit)",
              "Lex app (text-based, no photos)",
              "Taimi or Grindr (for friends mode, not dating)",
              "Trans Girl South Africa (Facebook, private)"
            ]}
          />

          <CommunityTier 
            title="Meet in the Middle"
            subtitle="Organized Groups & NGOs"
            icon={Users}
            colorClass="from-indigo-400 to-purple-500"
            description="These are safer than bars or clubs because they have codes of conduct and facilitators. They're usually free or low-cost. You don't have to be 'fun' or 'on'—you can just sit and listen."
            items={[
              "Triangle Project (Cape Town - support groups)",
              "Gender DynamiX (trans-specific support)",
              "FEW (Forum for the Empowerment of Women, Joburg)",
              "Pride Shelter Trust (community dinners)",
              "OUT Well-being (Pretoria - youth groups)"
            ]}
          />

          <CommunityTier 
            title="Beyond Identity"
            subtitle="Interest-Based Gathering"
            icon={Coffee}
            colorClass="from-amber-400 to-orange-500"
            description="Sometimes you don't want to talk about gender or sexuality—you just want to exist in a room where you know everyone gets it. These spaces let you connect over shared hobbies, not just shared marginalization."
            items={[
              "Queer book clubs (check Exclusive Books events)",
              "Gaymers SA (gaming groups)",
              "LGBTQ+ hiking clubs (Cape Town/Joburg)",
              "Drag nights (18+ venues, but community-focused)",
              "Queer art markets and zine fests"
            ]}
          />
        </section>

        {/* The Money/Race Reality */}
        <div className="mb-20 p-8 rounded-3xl bg-rose-50 border border-rose-100">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-rose-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-black text-rose-900 mb-2">The access problem</h4>
              <p className="text-rose-900/80 font-medium leading-relaxed mb-4 text-sm">
                Let's be real: many LGBTQ+ spaces in South Africa charge entrance fees, meet in gentrified areas, or require transport money. And some spaces are predominantly white or male, which can feel isolating if you're not.
              </p>
              <p className="text-rose-900 font-bold text-sm">
                Don't let money or race dynamics stop you from reaching out. Mensches exist in all spaces, and many organizers will help with transport costs if you ask privately. Your presence matters.
              </p>
            </div>
          </div>
        </div>

        {/* Safety Protocol - Warm but serious */}
        <section className="mb-24 p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-2 italic flex items-center gap-3">
               <ShieldCheck size={32} /> Meeting Safely in Mzansi
            </h3>
            <p className="text-indigo-200 font-medium mb-8 max-w-2xl">
              South Africa has specific safety concerns—GBV rates, crime, and the reality that not everyone online is who they say. Protect yourself without becoming paranoid.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                <h5 className="font-bold mb-3 flex items-center gap-2">
                  <Phone size={16} /> The Video Verify
                </h5>
                <p className="text-sm text-indigo-100 leading-relaxed">
                  Before meeting anyone from an app or Discord, do a video call. Not just for catfishing, but to vibe-check. If they refuse video, they don't get to meet you.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                <h5 className="font-bold mb-3 flex items-center gap-2">
                  <MapPin size={16} /> Public & Busy
                </h5>
                <p className="text-sm text-indigo-100 leading-relaxed">
                  First meetings: malls (Sandton, Cavendish, Gateway), busy coffee shops (Woolies Cafe, Starbucks), or during community events. Never at their home or yours.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                <h5 className="font-bold mb-3 flex items-center gap-2">
                  <Users size={16} /> The Anchor Friend
                </h5>
                <p className="text-sm text-indigo-100 leading-relaxed">
                  Tell one person where you're going, who you're meeting, and when you'll check in. Set a code word ("The movie was boring") that means "call me with an emergency to get me out."
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                <h5 className="font-bold mb-3 flex items-center gap-2">
                  <Home size={16} /> Exit Plan
                </h5>
                <p className="text-sm text-indigo-100 leading-relaxed">
                  Have your own transport money (Uber cash or petrol). Don't let them pick you up. You need to be able to leave immediately if the vibe shifts.
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-rose-500/20 border border-rose-400/30">
              <p className="text-sm text-rose-100 font-medium">
                <strong>If something feels off, leave.</strong> You don't owe anyone politeness. You don't have to finish the coffee. "I have to take this call" is a complete sentence.
              </p>
            </div>
          </div>
        </section>

        {/* Emotional Safety */}
        <div className="mb-20 p-8 md:p-12 rounded-[3rem] bg-slate-50 border border-slate-100">
          <h3 className="text-2xl font-black text-slate-900 mb-6">Protecting Your Heart in Community</h3>
          <div className="space-y-4 text-slate-600 font-medium">
            <p>
              Sometimes you find community and realize... these people also have trauma. There can be drama, cliques, burnout. That's normal in marginalized communities because we're all carrying heavy loads.
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 mt-1">•</span>
                It's okay to take breaks from community. You don't have to attend every protest or drag brunch.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 mt-1">•</span>
                Not every queer person will be your friend, and that's fine. Keep looking for your specific people.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 mt-1">•</span>
                If you encounter racism, transphobia, or ableism in queer spaces—report it to organizers. If they don't act, leave. You deserve safety even in "safe spaces."
              </li>
            </ul>
          </div>
        </div>

        {/* Intersectionality - Warmer */}
        <div className="flex flex-col items-center text-center mb-20 p-12 rounded-[3rem] bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100">
          <div className="p-4 rounded-full bg-white shadow-sm mb-6">
            <Heart className="text-rose-400" size={32} />
          </div>
          <h3 className="text-3xl font-black mb-4 tracking-tight text-slate-900">Lift as We Climb</h3>
          <p className="text-slate-600 font-medium max-w-xl leading-relaxed mb-6">
            Queer community in South Africa is strongest when we center those at the margins—black trans women, disabled queers, undocumented LGBTQ+ folk, sex workers, and our elders who fought during Apartheid.
          </p>
          <p className="text-sm text-slate-500 font-medium italic">
            If you find community, look around and ask: "Who's not here, and why?" Then work to bring them in.
          </p>
        </div>

        {/* Footer Resource */}
        <div className="p-8 md:p-12 rounded-[3rem] bg-indigo-50 border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="md:text-left text-center">
              <h4 className="text-2xl font-black text-indigo-900 mb-2">Too nervous to go alone?</h4>
              <p className="text-indigo-700 font-medium">
                Post on <span className="font-black italic">The Pulse</span>. Ask if anyone wants to go to that meetup with you. Someone else is probably nervous too.
              </p>
           </div>
           <button 
             className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black flex items-center gap-2 hover:bg-indigo-700 transition-all hover:scale-105"
           >
             Open Pulse <MessageSquare size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default FindingCommunityGuide;