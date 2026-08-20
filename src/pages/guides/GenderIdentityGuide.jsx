import { motion } from 'framer-motion';
import GuideFeedback from '../../components/GuideFeedback';
import { 
  User, 
  Sparkles, 
  HelpCircle, 
  Stethoscope, 
  ArrowLeft, 
  Heart,
  Palette,
  ShieldCheck,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Info,
  ExternalLink  // <-- ADD THIS
} from 'lucide-react';

/**
 * Gender Identity Guide - There is no wrong way to be you
 * Location: src/pages/GenderIdentityGuide.jsx
 */

const Section = ({ title, icon: Icon, children, color = "indigo" }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-24"
  >
    <div className="flex items-center gap-4 mb-10">
      <div className={`p-4 rounded-2xl bg-${color}-50 text-${color}-600`}>
        <Icon size={24} />
      </div>
      <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">{title}</h3>
    </div>
    {children}
  </motion.section>
);

const QuoteBlock = ({ children, author, context }) => (
  <div className="my-12 p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-rose-50 to-purple-50 border border-rose-100 relative overflow-hidden">
    <div className="absolute top-6 left-8 text-6xl text-rose-200 font-serif leading-none">"</div>
    <blockquote className="relative z-10 text-xl md:text-2xl text-slate-800 font-medium italic leading-relaxed mb-6">
      {children}
    </blockquote>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold">
        {author.charAt(0)}
      </div>
      <div>
        <p className="font-bold text-slate-900">{author}</p>
        <p className="text-sm text-slate-500">{context}</p>
      </div>
    </div>
  </div>
);

const GenderIdentityGuide = ({ setPage }) => {
  return (
    <div className="min-h-screen pt-32 pb-32 px-6 bg-white">
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
            <span className="px-4 py-2 rounded-full bg-rose-50 text-rose-600 font-black text-[10px] uppercase tracking-widest mb-6 inline-block">
              questioning & discovery
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[0.95] mb-8">
              Who You Are Is <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-500 to-cyan-400">Already True.</span>
            </h1>
            <div className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl space-y-6">
              <p>
                Maybe you clicked on this guide because something's been nudging at you—a discomfort you can't name, a jealousy when you see someone living freely, a quiet curiosity about what it would be like to be called "he" instead of "she," or to have no gender at all.
              </p>
              <p className="text-slate-500">
                Or maybe you know exactly who you are, but the world keeps demanding explanations you don't owe. Either way: <strong>there is no wrong way to be trans, non-binary, genderqueer, or questioning.</strong>
              </p>
            </div>
          </motion.div>
        </header>

        {/* Validation Section */}
        <QuoteBlock author="A gender non-conforming person" context="Johannesburg">
          I spent years thinking I needed a diagnosis to be "really" trans. I thought I needed to hate my body. Turns out, I just needed to like the idea of being called "they" more than "she." That was enough. That was the only proof required.
        </QuoteBlock>

        {/* The Basics - Reframed */}
        <div className="mb-24 p-8 md:p-12 rounded-[3rem] bg-slate-50 border border-slate-100">
          <h3 className="text-2xl font-black mb-8 text-slate-900">Untangling the Knot</h3>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 md:items-center">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                <User className="text-slate-500" size={28} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Sex is not Gender</h4>
                <p className="text-slate-600 font-medium leading-relaxed">
                  What the doctor declared when you were born (based on body parts) is just one fact about your biology. It doesn't dictate who you are inside. <strong>Your body is yours to define,</strong> regardless of what anyone assumed at your birth.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 md:items-center">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center flex-shrink-0">
                <Heart className="text-rose-500" size={28} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Identity is Internal</h4>
                <p className="text-slate-600 font-medium leading-relaxed">
                  It's not about who you're attracted to (that's sexuality). It's about <em>who you are</em> when you're alone. Girl, boy, neither, both, something that shifts day-to-day—if it feels true to you, it is true.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:items-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center flex-shrink-0">
                <Palette className="text-purple-500" size={28} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Expression is External</h4>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Long hair, short hair, dresses, suits, makeup, bare face—none of these determine your gender. A man can wear glitter. A woman can have a shaved head. A non-binary person can present however they choose. <strong>Clothes don't make the gender; you do.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Euphoria vs Dysphoria - Warmer presentation */}
        <Section title="Following the Joy" icon={Sparkles} color="rose">
          <div className="prose prose-lg text-slate-600 font-medium leading-relaxed mb-8">
            <p>
              You might have heard that being trans requires "gender dysphoria"—a deep discomfort with your body or social role. But many trans people don't experience crushing dysphoria. Instead, they experience <strong>gender euphoria</strong>: a lightness, a rightness, a "finally" feeling when they're seen correctly.
            </p>
            <p>
              If binding your chest feels like relief, if hearing "sir" makes you smile, if cutting your hair short made you recognize yourself in the mirror—that's valid data. You don't need to suffer to be trans.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-[3rem] bg-rose-50 border border-rose-100">
              <h4 className="text-xl font-black text-rose-700 mb-6 flex items-center gap-2">
                <Sparkles size={20} /> Signs of Euphoria
              </h4>
              <ul className="space-y-4">
                {[
                  "A flutter of joy when someone uses a new name or pronoun",
                  "Feeling 'seen' or recognized when dressed a certain way",
                  "Relief when correcting someone on your gender (even if scary)",
                  "Jealousy of people living as your true gender (envy = information)",
                  "Comfort in your reflection when you try something new"
                ].map((text, i) => (
                  <li key={i} className="flex gap-3 text-rose-800/80 font-medium text-sm leading-relaxed">
                    <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-rose-400" /> 
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-8 rounded-[3rem] bg-slate-900 text-white flex flex-col justify-center">
              <h4 className="text-2xl font-black mb-4 italic">There is no "Trans Enough."</h4>
              <p className="text-slate-300 mb-4 leading-relaxed">
                You don't need to:
              </p>
              <ul className="space-y-2 text-slate-400 text-sm mb-6">
                <li>• Hate your body</li>
                <li>• Want surgery</li>
                <li>• Have known since childhood</li>
                <li>• Be 100% certain</li>
                <li>• Fit into "male" or "female" boxes</li>
              </ul>
              <p className="text-white font-bold">
                You just need to be curious about living more authentically. That's the only entrance fee.
              </p>
            </div>
          </div>
        </Section>

        {/* Exploration - Less "lab" more "play" */}
        <Section title="Safe Experiments" icon={Palette} color="purple">
          <p className="text-slate-600 font-medium mb-8 leading-relaxed">
            You don't need to announce anything to explore. Gender is try-before-you-buy. Here are low-stakes ways to test what feels right:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Info size={24} />
              </div>
              <h5 className="font-black text-lg mb-2 text-slate-900">The Name Test</h5>
              <p className="text-slate-600 text-sm font-medium leading-relaxed mb-3">
                Order coffee using a different name. Create a gaming account with different pronouns. See how it feels in your body when the barista calls out "Michael" or "Zoe" or "Alex."
              </p>
              <p className="text-xs text-slate-500 italic">
                Pro tip: Online spaces like Reddit or Discord are great for this—low stakes, immediate feedback.
              </p>
            </div>

            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
                <User size={24} />
              </div>
              <h5 className="font-black text-lg mb-2 text-slate-900">The Mirror Test</h5>
              <p className="text-slate-600 text-sm font-medium leading-relaxed mb-3">
                In the safety of your room, try different clothing. Tuck or bind (safely). Style your hair differently. Take photos just for you—no posting required. Notice what makes you smile.
              </p>
              <p className="text-xs text-slate-500 italic">
                This is private. This belongs only to you until you decide otherwise.
              </p>
            </div>

            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Heart size={24} />
              </div>
              <h5 className="font-black text-lg mb-2 text-slate-900">The Trusted One</h5>
              <p className="text-slate-600 text-sm font-medium leading-relaxed mb-3">
                Ask one safe person—a friend online, a cousin, a counselor—to use different pronouns for a day or a week. See if it fits like an old sweater or an itchy tag.
              </p>
              <p className="text-xs text-slate-500 italic">
                It's okay if it feels weird at first. New shoes take time to break in.
              </p>
            </div>

            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                <Clock size={24} />
              </div>
              <h5 className="font-black text-lg mb-2 text-slate-900">The No-Labels Option</h5>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                You don't have to pick a label today. "Questioning" is a valid identity. "Non-binary but figuring it out" is valid. "Trans femme some days, masc others" is valid. You can describe yourself without boxing yourself in.
              </p>
            </div>
          </div>
        </Section>

        {/* Transition in SA - Realistic and supportive */}
        <Section title="Navigating South Africa" icon={MapPin} color="amber">
          <div className="prose prose-lg text-slate-600 font-medium leading-relaxed mb-8">
            <p>
              South Africa has incredible legal protections for trans people (the constitution protects gender identity), but the healthcare system is... complicated. Long waiting lists at public hospitals, expensive private care, and gatekeeping doctors who think they know your gender better than you do.
            </p>
            <p>
              Here's how to move forward in this specific context:
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-[3rem] p-8 md:p-12 mb-8">
            <h4 className="text-2xl font-black mb-8 text-amber-900 text-center">Three Paths (Pick Any or All)</h4>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-amber-100">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-4 font-black">
                  1
                </div>
                <h5 className="font-black text-amber-900 mb-3">Social Transition</h5>
                <p className="text-sm text-slate-600 mb-4">
                  New name, new pronouns, new clothes. Coming out to friends. This is real transition and it costs nothing.
                </p>
                <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-800 font-medium">
                  You can do this immediately. No doctor required.
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-amber-100">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-4 font-black">
                  2
                </div>
                <h5 className="font-black text-amber-900 mb-3">Medical Transition</h5>
                <p className="text-sm text-slate-600 mb-4">
                  Hormones (HRT), surgeries, voice training. Available through public healthcare but expect long waits (Groote Schuur, Wits, Steve Biko). Private is faster but expensive (R1,000+ per endocrinologist visit).
                </p>
                <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-800 font-medium">
                  Gender DynamiX can help navigate the system.
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-amber-100">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-4 font-black">
                  3
                </div>
                <h5 className="font-black text-amber-900 mb-3">Legal Transition</h5>
                <p className="text-sm text-slate-600 mb-4">
                  Changing your gender marker and name on your ID. Formerly difficult, now more streamlined but requires medical letters and Home Office visits.
                </p>
                <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-800 font-medium">
                  Do this when you're ready. You don't need "correct" ID to be valid.
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-amber-100/50 border border-amber-200">
              <div className="flex items-start gap-4">
                <AlertCircle className="text-amber-700 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h5 className="font-bold text-amber-900 mb-1">The Reality Check</h5>
                  <p className="text-sm text-amber-900/80 leading-relaxed">
                    Many trans South Africans socially transition for years before accessing hormones due to costs or gatekeeping. This doesn't make you "less trans." Medical care is a logistics issue, not a legitimacy issue. <strong>You are valid regardless of what care you can access.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="http://www.genderdynamix.org.za" 
                target="_blank" 
                rel="noreferrer" 
               className="px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
              >
               Gender DynamiX <span className="text-lg">↗</span>  {/* Use text arrow instead */}
            </a>
            <button 
              onClick={() => setPage && setPage('resources')} 
              className="px-6 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-bold hover:border-slate-400 transition-all flex items-center gap-2"
            >
              Find Trans-friendly Doctors
            </button>
          </div>
        </Section>

        {/* You Are Valid section */}
        <div className="mt-20 p-12 rounded-[3rem] bg-gradient-to-br from-purple-600 to-rose-600 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-black mb-6 italic">You Don't Need Permission</h3>
            <p className="text-lg text-white/90 font-medium leading-relaxed mb-8">
              Not from a doctor. Not from a parent. Not from the trans community on Twitter. Not from a guide like this one. 
            </p>
            <p className="text-xl font-bold mb-8">
              If you feel it, it's real. If you want it, you deserve it. If you're questioning, you belong here.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm text-sm font-bold">
              <Heart size={16} className="fill-white" />
              You are already enough
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 font-medium italic text-sm">
            Gender is a journey, not a destination. It's okay to take your time. It's okay to change your mind. 
            It's okay to just be.
          </p>
        </div>

        <GuideFeedback guideId="gender-identity" guideTitle="Gender Identity" />
      </div>
    </div>
  );
};

export default GenderIdentityGuide;