import React from 'react';
import { motion } from 'framer-motion';
import GuideFeedback from '../../components/GuideFeedback';
import { 
  Scale, 
  ShieldCheck, 
  Briefcase, 
  Home, 
  Fingerprint, 
  Heart, 
  Gavel,
  ArrowLeft,
  FileText,
  AlertTriangle,
  ExternalLink,
  Clock,
  Users,
  Phone,
  MapPin
} from 'lucide-react';

/**
 * Legal Rights Guide - The law says one thing, reality says another
 * Location: src/pages/LegalRightsGuide.jsx
 */

const RightsCard = ({ title, icon: Icon, children, status = "Protected" }) => (
  <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
        <Icon size={24} />
      </div>
      <span className="text-[10px] font-black uppercase px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full tracking-widest">
        {status}
      </span>
    </div>
    <h4 className="font-black text-xl text-slate-900 mb-3 tracking-tight">{title}</h4>
    <div className="text-slate-600 text-sm font-medium leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

const QuoteBlock = ({ children, author }) => (
  <div className="my-8 p-6 rounded-2xl bg-slate-50 border-l-4 border-indigo-400 italic text-slate-700 font-medium">
    "{children}"
    {author && <span className="block mt-3 text-sm text-slate-500 not-italic">— {author}</span>}
  </div>
);

const LegalRightsGuide = ({ setPage }) => {
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
            <span className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-6 inline-block">
              Know Your Power
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[0.95] mb-8">
              The Law vs. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-slate-500">The Queue.</span>
            </h1>
            <div className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl space-y-6">
              <p>
                South Africa has one of the most progressive constitutions in the world. On paper, you are fully protected. In practice? You might still face the cop who laughs when you report your abusive partner, the Home Affairs official who "loses" your gender marker change paperwork three times, or the boss who fires you for being "difficult" while finding a "legal" excuse.
              </p>
              <p className="text-slate-500">
                This guide is about bridging that gap—knowing what should happen, and having the tools to demand it when reality falls short. <strong>You don't have to be a lawyer to claim your rights. You just need to know they're yours.</strong>
              </p>
            </div>
          </motion.div>
        </header>

        {/* The Reality Gap */}
        <div className="mb-16 p-8 rounded-3xl bg-amber-50 border border-amber-100">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-black text-amber-900 mb-2">The Exhaustion is Real</h4>
              <p className="text-amber-900/80 font-medium leading-relaxed text-sm">
                Fighting for your rights takes energy most of us don't have when we're also just trying to survive. You don't have to sue every bigot. You don't have to correct every official. <strong>Survival is the priority.</strong> Use this guide for the battles you have capacity for, and know that opting out of a fight doesn't mean the discrimination was okay.
              </p>
            </div>
          </div>
        </div>

        {/* The Constitutional Core - Honest version */}
        <section className="mb-24 p-8 md:p-12 rounded-[3rem] bg-indigo-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">What's Actually Protected</h3>
            <p className="text-indigo-100 text-lg font-medium leading-relaxed mb-10 max-w-2xl">
              The Constitution (Section 9) and the Promotion of Equality and Prevention of Unfair Discrimination Act (PEPUDA) make it illegal to discriminate based on sexual orientation and gender identity. But laws only work when we enforce them.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {['Same-sex Marriage', 'Joint Adoption', 'Gender ID Change', 'Workplace Protections'].map(item => (
                <div key={item} className="px-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-xs font-black uppercase tracking-wider text-center backdrop-blur-sm">
                  {item}
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-indigo-200 text-sm font-medium">
                <strong>The catch:</strong> "Illegal" doesn't mean "doesn't happen." It means you have recourse after it happens—which requires documentation, support, and often money.
              </p>
            </div>
          </div>
        </section>

        {/* Rights Grid - With reality checks */}
        <section className="grid md:grid-cols-2 gap-8 mb-24">
          <RightsCard title="At Work" icon={Briefcase} status="Protected by Law">
            <p className="mb-3">You cannot be fired, demoted, or harassed for being LGBTQ+. If you're misgendered at work after asking for correct pronouns, that's harassment.</p>
            <p className="text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">Your Move:</p>
            <p className="text-xs text-slate-500">Document incidents (dates, witnesses, emails). The CCMA handles unfair dismissal cases for free if you act within 30 days.</p>
          </RightsCard>

          <RightsCard title="At Home" icon={Home} status="Know Your Rights">
            <p className="mb-3">Evicting a tenant or refusing to rent to someone based on their sexuality/gender is illegal. But "we're looking for a family" is often code.</p>
            <p className="text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">Your Move:</p>
            <p className="text-xs text-slate-500">Keep all communications. If you're being illegally evicted, contact the Rental Housing Tribunal or Triangle Project for emergency accommodation.</p>
          </RightsCard>

          <RightsCard title="Your ID Documents" icon={Fingerprint} status="Possible but Bureaucratic">
            <p className="mb-3">You can change your gender marker (to M, F, or X) and name at Home Affairs. In theory. In practice, officials often demand "proof" they aren't entitled to.</p>
            <p className="text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">Your Move:</p>
            <p className="text-xs text-slate-500">Bring the court order (Justice Alliance case). Don't accept "no." Ask for the supervisor. Go with an advocate if possible.</p>
          </RightsCard>

          <RightsCard title="Marriage & Partnerships" icon={Heart} status="Fully Legal">
            <p className="mb-3">Civil unions are fully legal and equal to marriage. You can adopt jointly. You can be listed as "spouse" on medical aid and insurance.</p>
            <p className="text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">Note:</p>
            <p className="text-xs text-slate-500">Customary marriages are also recognized for same-sex couples under the Recognition of Customary Marriages Act.</p>
          </RightsCard>
        </section>

        {/* When Rights Are Violated - The Real Talk Version */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 rounded-2xl bg-rose-50 text-rose-600">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">When They Don't Listen</h3>
          </div>

          <div className="prose prose-lg text-slate-600 font-medium leading-relaxed mb-8">
            <p>
              Knowing your rights is one thing. Getting a police officer at a rural station to take your report of anti-gay violence is another. Here's how to navigate hostility:
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-4">1</div>
                <h5 className="font-black text-slate-900 mb-2">Make Yourself Unignorable</h5>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Don't go alone. Bring a friend, an advocate from Triangle Project, or even just a confident ally. There is power in numbers. If they see you have support, they're less likely to dismiss you.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-4">2</div>
                <h5 className="font-black text-slate-900 mb-2">Quote the Act</h5>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Yes, it's exhausting to have to educate people who should know better. But saying <em>"This violates Section 9 of the Constitution and PEPUDA"</em> often shocks officials into compliance. Write it down. Show them.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-4">3</div>
                <h5 className="font-black text-slate-900 mb-2">Get It In Writing</h5>
                <p className="text-slate-600 text-sm leading-relaxed">
                  If a police officer refuses to take your report, ask for their name and badge number. Ask for a refusal in writing. They usually won't give it, which signals you know the system. Record audio if legal (SA is one-party consent for recordings).
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                <FileText size={20} className="text-indigo-500" />
                The Documentation Habit
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Create a "Evidence" folder on your phone. Screenshot every inappropriate comment, save every discriminatory email, photograph injuries after assaults, write down dates and times immediately after incidents. <strong>The queer community loses cases because we don't document.</strong> Your memory will fade; the paper trail won't.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600">Screenshots</span>
                <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600">Voice Notes</span>
                <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600">BCC'd Emails</span>
                <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600">Medical Records</span>
                <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600">Witness Names</span>
              </div>
            </div>

            <QuoteBlock author="A lawyer who works with LGBTQ+ clients">
              We lose 80% of potential cases not because the law isn't on our side, but because there's no documentation. The other side knows this. They count on us being too traumatized or too busy surviving to keep records. Change that pattern.
            </QuoteBlock>
          </div>
        </section>

        {/* Specific Scenarios */}
        <section className="mb-24">
          <h3 className="text-2xl font-black mb-8 text-slate-900">Common Battlegrounds</h3>
          
          <div className="space-y-6">
            <div className="p-8 rounded-[3rem] bg-white border border-slate-100 shadow-sm">
              <h4 className="font-black text-lg mb-3 text-slate-900">The Police Station</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                You're reporting intimate partner violence in a same-sex relationship, or a hate crime. The officer smirks, says "that's not real," or asks invasive sexual questions.
              </p>
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-900 text-sm font-medium">
                <strong>Your script:</strong> "I am reporting a crime under the Domestic Violence Act / Prevention of Combatting Hate Crimes Act. If you refuse to open a case, I need your name and your supervisor." Call Triangle Project immediately—they can send an advocate or call the station commander.
              </div>
            </div>

            <div className="p-8 rounded-[3rem] bg-white border border-slate-100 shadow-sm">
              <h4 className="font-black text-lg mb-3 text-slate-900">Home Affairs</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                You're trying to change your gender marker. The official says you need "medical proof" you don't have, or claims the system is down, or keeps "losing" your paperwork.
              </p>
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-900 text-sm font-medium">
                <strong>Your script:</strong> "According to the Alteration of Sex Description and Sex Status Act 49 of 2003 and Justice Alliance v. Home Affairs, I do not need surgery to change my marker. Please provide the application form or escalate to your supervisor." Bring a printed copy of the Act.
              </div>
            </div>

            <div className="p-8 rounded-[3rem] bg-white border border-slate-100 shadow-sm">
              <h4 className="font-black text-lg mb-3 text-slate-900">The Workplace</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                You're being deadnamed despite asking for your correct name. You're passed over for promotion after coming out. HR says "we're a family company" and ignores your complaints.
              </p>
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-900 text-sm font-medium">
                <strong>Your script:</strong> "This constitutes unfair discrimination under PEPUDA and the Employment Equity Act. I am requesting this be addressed in writing." Email everything. CC your personal email. If they fire you, you have 30 days to file with the CCMA (it's free).
              </div>
            </div>
          </div>
        </section>

        {/* Asylum & Refugees */}
        <section className="mb-24 p-8 md:p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center flex-shrink-0">
              <Gavel size={32} className="text-emerald-400" />
            </div>
            <div>
              <h4 className="text-2xl font-black mb-4 tracking-tight">Fleeing Persecution?</h4>
              <p className="text-slate-300 font-medium leading-relaxed mb-6">
                If you're from a country that criminalizes LGBTQ+ existence (Zimbabwe, Nigeria, Uganda, etc.), you may qualify for asylum in South Africa. This is a long, bureaucratic process with many pitfalls—but it is possible.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://www.passop.co.za" target="_blank" rel="noreferrer" className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-500 transition-colors">
                  Contact PASSOP
                </a>
                <button onClick={() => setPage && setPage('resources')} className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-colors">
                  Legal Aid Resources
                </button>
              </div>
              <p className="mt-6 text-sm text-slate-400">
                Do not mention your asylum application on social media. Do not return to your home country while the process is ongoing. Get legal representation immediately—don't navigate Home Affairs alone.
              </p>
            </div>
          </div>
        </section>

        {/* Help Resources */}
        <section className="mb-24">
          <h3 className="text-2xl font-black mb-8 text-slate-900">When You Need Backup</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm">
              <h4 className="font-black text-slate-900 mb-2">Legal Aid South Africa</h4>
              <p className="text-slate-600 text-sm mb-4">Free legal services if you earn under a certain threshold. Can represent you in civil and criminal matters.</p>
              <a href="https://www.legal-aid.co.za" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                Find Local Office <ExternalLink size={14} />
              </a>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm">
              <h4 className="font-black text-slate-900 mb-2">Triangle Project</h4>
              <p className="text-slate-600 text-sm mb-4">Specialized LGBTQ+ legal advocacy, police accompaniment, and litigation support. They know the system and the shortcuts.</p>
              <a href="tel:021 712 6699" className="text-indigo-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                021 712 6699 <Phone size={14} />
              </a>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm">
              <h4 className="font-black text-slate-900 mb-2">Gender DynamiX</h4>
              <p className="text-slate-600 text-sm mb-4">Legal support specifically for trans and gender diverse individuals navigating Home Affairs and healthcare discrimination.</p>
              <a href="https://www.genderdynamix.org.za" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                Visit Website <ExternalLink size={14} />
              </a>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm">
              <h4 className="font-black text-slate-900 mb-2">OUT LGBT Well-being</h4>
              <p className="text-slate-600 text-sm mb-4">Legal support, hate crime reporting assistance, and policy advocacy based in Pretoria but operating nationally.</p>
              <a href="https://www.out.org.za" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                Get Support <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* Final Word */}
        <div className="text-center p-12 rounded-[3rem] bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
          <Scale className="mx-auto text-indigo-400 mb-6" size={48} />
          <h3 className="text-2xl font-black text-slate-900 mb-4">Justice is Slow, But Possible</h3>
          <p className="text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed">
            The system is exhausting by design—it hopes you'll give up. Rest when you need to. Choose your battles. But know that every time you demand your rights, you make it easier for the next person. The law is a tool, and you are allowed to use it.
          </p>
        </div>

        <GuideFeedback guideId="legal-rights" guideTitle="Legal Rights & Safety" />
      </div>
    </div>
  );
};

export default LegalRightsGuide;