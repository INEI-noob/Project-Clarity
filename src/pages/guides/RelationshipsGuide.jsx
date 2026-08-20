import React from 'react';
import { motion } from 'framer-motion';
import GuideFeedback from '../../components/GuideFeedback';
import { 
  Heart, 
  ShieldCheck, 
  AlertCircle, 
  MessageCircle, 
  ArrowLeft, 
  Sparkles,
  MapPin,
  Phone,
  Users,
  Lock,
  CheckCircle2,
  Info
} from 'lucide-react';

/**
 * Relationships Guide - Love in a small pool
 * Location: src/pages/RelationshipsGuide.jsx
 */

const Section = ({ title, icon: Icon, children, color = "rose" }) => (
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

const QuoteBlock = ({ children, author }) => (
  <div className="my-8 p-6 rounded-2xl bg-rose-50 border-l-4 border-rose-400 italic text-slate-700 font-medium">
    "{children}"
    {author && <span className="block mt-3 text-sm text-slate-500 not-italic">— {author}</span>}
  </div>
);

const RelationshipsGuide = () => {
  return (
    <div className="min-h-screen pt-32 pb-32 px-6 bg-gradient-to-b from-white to-rose-50/20">
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
            <span className="px-4 py-2 rounded-full bg-rose-50 text-rose-500 font-black text-[10px] uppercase tracking-widest mb-6 inline-block">
              Connection & Intimacy
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[0.95] mb-8">
              Love in the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-600">Margins.</span>
            </h1>
            <div className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl space-y-6">
              <p>
                Maybe you've scrolled through every dating app within 50km and recognize the same 12 people. Maybe you're terrified that a date could lead to being outed, or worse, assaulted. Maybe you're wondering if you'll have to choose between staying safe and being loved.
              </p>
              <p className="text-slate-500">
                Queer dating in South Africa is complicated by small pools, safety concerns, and the fact that everyone has dated everyone. But it's also where we build our chosen families, find our mirrors, and learn that we deserve pleasure and partnership. <strong>You don't have to figure it out perfectly. You just have to stay safe and stay open.</strong>
              </p>
            </div>
          </motion.div>
        </header>

        {/* The Small Pool Reality */}
        <div className="mb-16 p-8 rounded-3xl bg-amber-50 border border-amber-100">
          <div className="flex items-start gap-4">
            <MapPin className="text-amber-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-black text-amber-900 mb-2">The Geography Problem</h4>
              <p className="text-amber-900/80 font-medium leading-relaxed text-sm mb-3">
                In Durban, the queer community is intimate—in both good and challenging ways. In Joburg, it's spread across the Northern Suburbs vs. Townships. In Cape Town, it's visible but can feel cliquey. 
              </p>
              <p className="text-amber-900 font-bold text-sm">
                If you're in a rural area or small town, digital connection might be your only option. That's not "settling"—that's adaptation. Long-distance relationships, online-only dynamics, and visiting-partner arrangements are valid ways to love.
              </p>
            </div>
          </div>
        </div>

        {/* Safety That Isn't Fear-Mongering */}
        <Section title="Protecting Your Body & Heart" icon={ShieldCheck} color="indigo">
          <div className="prose prose-lg text-slate-600 font-medium leading-relaxed mb-8">
            <p>
              South Africa has high rates of gender-based violence, and LGBTQ+ people—especially trans women and gender non-conforming folks—face specific risks including "corrective" rape and robbery via dating apps. Safety isn't paranoia; it's non-negotiable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-8 rounded-[3rem] bg-indigo-600 text-white relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h4 className="text-2xl font-black mb-6 italic">Before You Meet</h4>
                <ul className="space-y-4 text-sm font-medium text-indigo-100">
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" />
                    <span>Video call first. If they refuse, they don't meet you. Full stop.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" />
                    <span>Reverse image search their photos (scammers steal images).</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" />
                    <span>Share the person's name, photo, and meeting location with a trusted friend.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" />
                    <span>Use a Google Voice or Skype number, not your real phone number, until trust is established.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                <h5 className="font-black text-slate-900 mb-2 flex items-center gap-2">
                  <Users size={18} className="text-indigo-500" /> Public & Busy
                </h5>
                <p className="text-slate-600 text-sm font-medium">
                  First meetings: busy malls (Gateway, Sandton City, Canal Walk), Woolies cafes, or during daytime market events. Never at their home. Never in secluded parks.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                <h5 className="font-black text-slate-900 mb-2 flex items-center gap-2">
                  <Phone size={18} className="text-indigo-500" /> The Check-In System
                </h5>
                <p className="text-slate-600 text-sm font-medium">
                  Tell your safety person: "If I don't text by 8 PM, call me. If I don't answer, something's wrong." Set a code word ("The movie was boring") that means "call me with an emergency to get me out."
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-rose-50 border border-rose-100">
                <h5 className="font-black text-rose-900 mb-2 flex items-center gap-2">
                  <AlertCircle size={18} /> Trust Your Gut
                </h5>
                <p className="text-rose-900/80 text-sm font-medium">
                  If they get angry that you have safety protocols, that's a red flag. Anyone worth dating will respect your caution in a country where queer people are targeted.
                </p>
              </div>
            </div>
          </div>

          <QuoteBlock author="Someone who learned the hard way">
            He seemed perfect on text. Refused video call because he was 'shy.' I went anyway because I was lonely. He wasn't the person in the photos, and he got aggressive when I tried to leave. Always video call. Always.
          </QuoteBlock>
        </Section>

        {/* Dating While Closeted */}
        <Section title="Dating in the Shadows" icon={Lock} color="slate">
          <div className="prose prose-lg text-slate-600 font-medium leading-relaxed mb-8">
            <p>
              If you're not out, dating feels impossible. How do you explain disappearing for three hours? How do you bring someone home? How do you handle the "so when are you getting a girlfriend/boyfriend?" questions at family braais?
            </p>
            <p>
              You're not deceitful for dating discreetly. You're surviving. Here are strategies that don't require a full coming out:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
              <h4 className="font-black text-slate-900 mb-4">The Cover Story</h4>
              <ul className="space-y-3 text-sm text-slate-600 font-medium">
                <li className="flex gap-3 items-start">
                  <span className="text-slate-400">•</span>
                  "I'm meeting a friend from varsity" (works for any gender)
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-slate-400">•</span>
                  Set up a "study group" cover story with your date—powerpoints on laptops look innocent
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-slate-400">•</span>
                  Daytime dates labeled as "work errands"
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 text-white">
              <h4 className="font-black text-xl mb-4">Discretion Agreements</h4>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                It's okay to tell a date: "I'm not out to my family/work, so please don't tag me on social media or mention me to mutuals." If they're also closeted, you have built-in OPSEC. If they're out, they need to respect your timeline.
              </p>
              <p className="text-xs text-slate-500 italic">
                Anyone who outshames you ("I'm not going back in the closet for anyone") isn't safe to date. Your safety comes first.
              </p>
            </div>
          </div>
        </Section>

        {/* Green vs Red Flags - More nuanced */}
        <Section title="Reading the Signs" icon={Sparkles} color="emerald">
          <p className="text-slate-600 font-medium mb-8 leading-relaxed">
            Queer relationships move fast. The "U-Haul" stereotype exists for a reason—when you find someone who sees you, the urge to merge is intense. But intensity isn't always intimacy.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-[3rem] bg-emerald-50 border border-emerald-100">
              <h4 className="text-xl font-black mb-6 text-emerald-700 flex items-center gap-2">
                <Heart size={20} className="fill-emerald-600 text-emerald-600" /> 
                Green Flags
              </h4>
              <ul className="space-y-4">
                {[
                  "They ask about your boundaries before assuming intimacy",
                  "They respect your 'no' without pouting or punishing you",
                  "They have queer friends (not just romantic interests—they can do platonic)",
                  "They're honest about their coming-out status and don't shame yours",
                  "They ask about pronouns and correct themselves when they mess up",
                  "They introduce you to their community (when you're ready)"
                ].map((item, i) => (
                  <li key={i} className="text-sm font-medium text-emerald-800/80 flex gap-3 items-start">
                    <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-[3rem] bg-rose-50 border border-rose-100">
              <h4 className="text-xl font-black mb-6 text-rose-700 flex items-center gap-2">
                <AlertCircle size={20} className="text-rose-600" /> 
                Red Flags
              </h4>
              <ul className="space-y-4">
                {[
                  "Secretive about basic life details (job, where they live) beyond normal discretion",
                  "All their exes are 'crazy' or 'toxic'—every single one",
                  "Moving too fast: 'I love you' on the second date, wanting to move in immediately",
                  "Guilting you for your level of closetedness or outness",
                  "Refusing to use protection or discuss STI status",
                  "Isolating you from your friends ('they're just jealous of us')",
                  "Using your trans status as a fetish or secret kink"
                ].map((item, i) => (
                  <li key={i} className="text-sm font-medium text-rose-800/80 flex gap-3 items-start">
                    <span className="text-rose-400 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-amber-50 border border-amber-100">
            <p className="text-amber-900 font-medium text-sm">
              <strong>Note on "love bombing":</strong> In a community where many of us were starved of affection, intense early romance feels like healing. But fast intensity often masks control. Healthy love builds; it doesn't explode.
            </p>
          </div>
        </Section>

        {/* Specific Conversations */}
        <Section title="The Talks We Avoid (But Shouldn't)" icon={MessageCircle} color="purple">
          <div className="space-y-6">
            <div className="p-8 bg-white border border-slate-100 rounded-[3rem] hover:border-purple-200 transition-colors shadow-sm">
              <h5 className="font-black text-lg mb-3 text-slate-900">Safer Sex & Boundaries</h5>
              <p className="text-slate-600 font-medium text-sm leading-relaxed mb-4">
                "What are we comfortable with?" "When were you last tested?" "Do we need PrEP?" These conversations are awkward but non-negotiable. In queer sex, risks vary by configuration—trans women on estrogen and cis men have different HIV transmission risks than cis gay men, for example. Know your status, know theirs, don't assume.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold">PrEP for HIV prevention</span>
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold">Dental dams for oral</span>
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold">Condoms on toys</span>
              </div>
            </div>

            <div className="p-8 bg-white border border-slate-100 rounded-[3rem] hover:border-purple-200 transition-colors shadow-sm">
              <h5 className="font-black text-lg mb-3 text-slate-900">Monogamy, Polyamory & Everything Between</h5>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">
                Define this early. "Assuming" exclusivity in queer dating is dangerous—our relationship structures are diverse. Whether you're monogamous, hierarchical poly, relationship anarchist, or just 'seeing where it goes,' say it out loud. Jealousy is normal; secrecy is toxic.
              </p>
            </div>

            <div className="p-8 bg-white border border-slate-100 rounded-[3rem] hover:border-purple-200 transition-colors shadow-sm">
              <h5 className="font-black text-lg mb-3 text-slate-900">The Trans Conversation (If Applicable)</h5>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">
                If you're trans or dating someone trans: "What pronouns do we use in public vs. private?" "Are there areas of your body that are off-limits for touch?" "How do you like to be affirmed during intimacy?" These conversations are vulnerable but create safety. And if someone refuses to have them, they don't get access to your body.
              </p>
            </div>

            <div className="p-8 bg-white border border-slate-100 rounded-[3rem] hover:border-purple-200 transition-colors shadow-sm">
              <h5 className="font-black text-lg mb-3 text-slate-900">The Ex Factor</h5>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">
                In small queer communities, you will have mutual exes. You will bump into them at the one gay bar. Transparency prevents drama: "Just so you know, I dated X two years ago." "I'm still friends with my ex, is that okay with you?" Secrets become earthquakes in small communities.
              </p>
            </div>
          </div>
        </Section>

        {/* Abuse in Queer Relationships - Critical inclusion */}
        <div className="mb-20 p-8 md:p-12 rounded-[3rem] bg-rose-900 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black mb-6">When Love Hurts</h3>
            <div className="space-y-4 text-rose-100 font-medium leading-relaxed">
              <p>
                Domestic violence happens in queer relationships too. It's not just a straight problem. In fact, it can be harder to spot or admit because we fear confirming stereotypes, or we think "women can't abuse women" or "trans people are just grateful for any love."
              </p>
              <p className="text-white font-bold">
                Abuse isn't just physical. It's control: checking your phone, isolating you from friends, gaslighting you about your gender identity, threatening to out you if you leave.
              </p>
              <div className="p-4 rounded-2xl bg-white/10 border border-white/20 mt-6">
                <p className="text-sm">
                  <strong>If you're experiencing abuse:</strong> Triangle Project has specific LGBTQ+ domestic violence support. You don't have to go to a straight shelter where they might misgender you or minimize your relationship.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl" />
        </div>

        {/* Heartbreak & Hope */}
        <div className="p-12 rounded-[3rem] bg-gradient-to-br from-rose-50 to-purple-50 border border-rose-100 text-center mb-16">
          <Heart className="text-rose-400 mx-auto mb-6" size={48} />
          <h3 className="text-3xl font-black italic tracking-tight text-slate-900 mb-6">The Heartbreak is Worth It</h3>
          <p className="text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed mb-8">
            Yes, the pool is small. Yes, you'll probably date your ex's ex. Yes, you'll have to hide relationships sometimes. Yes, heartbreak hurts extra because "where will I find another queer person who gets me?"
          </p>
          <p className="text-slate-900 font-bold text-xl mb-8">
            But also: The joy of being seen. The relief of not explaining pronouns. The safety of holding hands with someone who understands. The family you build.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm text-rose-600 font-bold text-sm">
            <Sparkles size={18} />
            You are worthy of love exactly as you are
          </div>
        </div>

        {/* Final Word */}
        <div className="text-center text-slate-500 font-medium italic leading-relaxed max-w-xl mx-auto">
          "The right person won't ask you to choose between your safety and your authenticity. They'll hold your hand in the dark until you're both ready for the light."
        </div>
      </div>

        <GuideFeedback guideId="relationships" guideTitle="LGBTQ+ Relationships" />
    </div>
  );
};

export default RelationshipsGuide;