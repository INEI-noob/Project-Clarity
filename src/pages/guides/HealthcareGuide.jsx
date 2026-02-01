import React from 'react';
import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  ShieldAlert, 
  Brain, 
  Activity, 
  ArrowLeft, 
  Search, 
  AlertCircle,
  Clock,
  Heart,
  UserCheck,
  Phone,
  MapPin,
  Wallet,
  FileText,
  Sparkles
} from 'lucide-react';

/**
 * Healthcare Guide - Because you deserve better than "just deal with it"
 * Location: src/pages/HealthcareGuide.jsx
 */

const Section = ({ title, icon: Icon, children, color = "emerald" }) => (
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
  <div className="my-8 p-6 rounded-2xl bg-slate-50 border-l-4 border-emerald-400 italic text-slate-700 font-medium">
    "{children}"
    {author && <span className="block mt-3 text-sm text-slate-500 not-italic">— {author}</span>}
  </div>
);

const HealthcareGuide = ({ onBack }) => {
  return (
    <div className="min-h-screen pt-32 pb-32 px-6 bg-gradient-to-b from-white to-slate-50/30">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold uppercase text-[11px] tracking-widest mb-12 transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Guides
        </button>

        {/* Header */}
        <header className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-6 inline-block">
              You Deserve Dignity
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[0.95] mb-8">
              Care That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Sees All of You.</span>
            </h1>
            <div className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl space-y-6">
              <p>
                If you've ever been misgendered by a nurse while in a hospital gown, or had a doctor refuse to treat your flu because they were "uncomfortable" with your trans status, or been told your depression is "just because you're gay"—you know that healthcare in South Africa isn't always safe for us.
              </p>
              <p className="text-slate-500">
                This guide is for finding the good ones, surviving the bad ones, and knowing your rights when the system fails you. <strong>Your body is yours, and you deserve competence, not just tolerance.</strong>
              </p>
            </div>
          </motion.div>
        </header>

        {/* The Reality Check */}
        <div className="mb-16 p-8 rounded-3xl bg-amber-50 border border-amber-100">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-black text-amber-900 mb-2">The South African Context</h4>
              <p className="text-amber-900/80 font-medium leading-relaxed text-sm">
                We have excellent constitutional protections (Section 9 of the Bill of Rights prohibits discrimination based on gender identity and sexual orientation). But reality? Public hospitals have waiting lists of 18+ months for gender-affirming care. Private care is excellent but costs R1,500+ per specialist visit. Many LGBTQ+ South Africans fall through these cracks. <strong>This isn't your fault—it's systemic failure.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Finding Your Team */}
        <Section title="Finding Safe Providers" icon={Search} color="emerald">
          <p className="text-slate-600 font-medium mb-8 leading-relaxed">
            Affirming providers often don't advertise (protecting themselves from backlash). You find them through community networks, and you vet them carefully.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-8 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <MapPin size={20} />
                </div>
                <h4 className="font-black text-slate-900">Public Healthcare</h4>
              </div>
              <ul className="space-y-3 text-sm text-slate-600 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span><strong>Groote Schuur Hospital</strong> (Cape Town) - Gender Clinic, long wait but free</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span><strong>Steve Biko Academic</strong> (Pretoria) - Trans-specific care available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span><strong>Charlotte Maxeke</strong> (Joburg) - Endocrinology referrals</span>
                </li>
              </ul>
              <div className="mt-6 p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-medium">
                <strong>Reality check:</strong> Expect 12-24 month waits. Bring a book, bring your patience, bring your own support person if allowed.
              </div>
            </div>

            <div className="p-8 rounded-[3rem] bg-slate-900 text-white shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-white/10 text-emerald-400">
                  <Wallet size={20} />
                </div>
                <h4 className="font-black">Private Healthcare</h4>
              </div>
              <ul className="space-y-3 text-sm text-slate-300 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Faster access but expensive (R1,000-R2,500 per consult)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Check if your medical aid covers "endocrinology" or "hormone therapy"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Gender DynamiX maintains a list of private affirming doctors</span>
                </li>
              </ul>
              <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300">
                <strong>If you can't afford this:</strong> You're not less trans. Social transition is complete and valid transition.
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[2.5rem]">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Phone size={24} />
              </div>
              <div>
                <h5 className="font-black text-lg mb-2 text-slate-900">The "Call Ahead" Test</h5>
                <p className="text-slate-600 font-medium text-sm mb-4 leading-relaxed">
                  Before booking, call and ask reception: <span className="font-bold text-slate-900">"Does Dr. [Name] have experience treating LGBTQ+ patients?"</span>
                </p>
                <div className="space-y-2 text-sm text-slate-600">
                  <p className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> 
                    <strong>Good sign:</strong> "Yes, we see many trans patients" or confident "All are welcome here"
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-red-500">✗</span> 
                    <strong>Red flag:</strong> Long pause, "What do you mean?", laughter, or "We treat everyone the same" (often means they ignore specific needs)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <QuoteBlock author="A trans woman in Cape Town">
            I called five GPs before I found one who didn't stutter when I asked about trans care. The sixth one said, 'Yes, I have several trans patients, when would you like to come in?' I cried in my car after that call.
          </QuoteBlock>
        </Section>

        {/* Surviving Bad Care - Trauma informed */}
        <Section title="When Healthcare Hurts" icon={ShieldAlert} color="rose">
          <div className="prose prose-lg text-slate-600 font-medium leading-relaxed mb-8">
            <p>
              Medical trauma is real. Being misgendered during a pap smear, having a nurse "out" you to the waiting room, being denied estrogen because "you're not trans enough"—these experiences make us avoid care we need.
            </p>
            <p>
              <strong>You have the right to:</strong> Correct pronouns, privacy, treatment for the issue you came in for (not a lecture on your identity), and to leave a provider who harms you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-8 rounded-[3rem] bg-rose-50 border border-rose-100">
              <h4 className="text-rose-700 font-black text-xl mb-4 flex items-center gap-2">
                <AlertCircle size={20} /> If You're Refused Care
              </h4>
              <ul className="space-y-4 text-sm font-medium text-rose-800/80">
                <li className="flex gap-3 items-start">
                  <span className="font-bold text-rose-400">1.</span>
                  <span>Ask for the refusal in writing. They usually won't give it, which shows they know they're in the wrong.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="font-bold text-rose-400">2.</span>
                  <span>You can report to the <strong>HPCSA</strong> (Health Professions Council of SA), but know the process is slow. Protect your immediate safety first.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="font-bold text-rose-400">3.</span>
                  <span>If it's an emergency, go to a different hospital. Don't waste energy educating during crisis.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-[3rem] bg-slate-900 text-white">
              <h4 className="text-xl font-black mb-4 italic flex items-center gap-2">
                <ShieldAlert size={20} /> Conversion Therapy Red Flags
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Any provider who suggests they can "cure" your queerness or transness, who frames your identity as trauma-based, or who insists you need to "explore other options" before affirming your gender:
              </p>
              <p className="text-rose-400 font-bold text-lg mb-4">
                Leave immediately. This is illegal in South Africa and dangerous to your mental health.
              </p>
              <p className="text-xs text-slate-500">
                Document everything and report to the HPCSA and Triangle Project.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 text-amber-900 text-sm font-medium">
            <strong>Survival tip:</strong> If you need medical care but fear discrimination, bring a friend who can advocate for you when you're vulnerable. Sometimes having someone else say "Her pronouns are she/her" is easier than saying it yourself when you're in pain.
          </div>
        </Section>

        {/* Mental Health - Specific section */}
        <Section title="Mental Health Matters" icon={Brain} color="purple">
          <div className="mb-8 text-slate-600 font-medium leading-relaxed">
            <p className="mb-4">
              LGBTQ+ South Africans experience higher rates of depression, anxiety, and suicide ideation—not because of who we are, but because of how we're treated. If you're struggling, it's not weakness. It's a rational response to an irrational world.
            </p>
            <p>
              You deserve therapy that affirms you, doesn't try to "fix" you, and understands intersectionality (how being black and trans, or poor and queer, creates specific pressures).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-[3rem] bg-purple-50 border border-purple-100">
              <h4 className="font-black text-purple-900 mb-4 flex items-center gap-2">
                <Sparkles size={20} /> Finding a Queer-Affirming Therapist
              </h4>
              <ul className="space-y-3 text-sm text-slate-700 font-medium">
                <li>• Psychology Today has an "LGBTQ+" filter for South Africa</li>
                <li>• Ask potential therapists: "Have you worked with trans/gay patients before?"</li>
                <li>• It's okay to "interview" them in a first session. You're hiring them.</li>
                <li>• If you can't afford therapy: Triangle Project offers free counseling</li>
              </ul>
            </div>

            <div className="p-8 rounded-[3rem] bg-white border border-slate-200 shadow-sm">
              <h4 className="font-black text-slate-900 mb-4">Crisis Moments</h4>
              <p className="text-sm text-slate-600 mb-4">
                If you're in active suicidal crisis:
              </p>
              <div className="space-y-3">
                <a href="tel:0800121314" className="block p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-900 font-bold hover:bg-rose-100 transition-colors">
                  <Phone size={16} className="inline mr-2" />
                  SADAG: 0800 12 13 14 (24/7)
                </a>
                <a href="tel:0217126699" className="block p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-900 font-bold hover:bg-indigo-100 transition-colors">
                  <Phone size={16} className="inline mr-2" />
                  Triangle Project Crisis: 021 712 6699
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* Sexual Health - Honest and non-judgmental */}
        <Section title="Sexual Health Without Shame" icon={Activity} color="indigo">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="p-8 rounded-[3rem] bg-white border border-slate-100 shadow-sm">
              <h4 className="text-xl font-black mb-4 text-slate-900">Testing & Prevention</h4>
              <p className="text-slate-600 text-sm font-medium mb-6 leading-relaxed">
                You can get tested at Dis-Chem or Clicks clinics (usually R50-100), or free at local clinics. For LGBTQ+ folks, aim for every 3-6 months if sexually active with multiple partners.
              </p>
              <div className="flex flex-wrap gap-2">
                {["HIV (4th Gen)", "Syphilis", "Chlamydia", "Gonorrhea", "Hepatitis"].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[3rem] bg-indigo-600 text-white">
              <h4 className="text-xl font-black mb-4">PrEP & PEP</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-bold text-indigo-200 text-xs uppercase tracking-widest mb-1">PrEP (Pre-Exposure)</p>
                  <p className="text-indigo-100">Daily pill to prevent HIV. Available free at government clinics—ask for "PrEP" at your local clinic.</p>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <p className="font-bold text-rose-300 text-xs uppercase tracking-widest mb-1">PEP (Post-Exposure)</p>
                  <p className="text-white">If exposed to HIV (condom broke, assault, etc.), you have <strong>72 hours</strong> to start PEP. Go to ER immediately—don't wait.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-pink-50 border border-pink-100">
            <h5 className="font-bold text-pink-900 mb-2">For Trans Women on HRT</h5>
            <p className="text-sm text-pink-800/80 font-medium leading-relaxed">
              Estrogen can affect liver function. If you're DIYing hormones (we know access is hard), please get liver function tests every 6 months. GPs can order these even if they won't prescribe HRT. High estrogen + smoking increases blood clot risk—consider vaping or cessation support if you smoke.
            </p>
          </div>
        </Section>

        {/* DIY Harm Reduction - Critical reality */}
        <div className="mb-20 p-8 md:p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-3">
              <FileText size={28} /> If You're Doing It Yourself
            </h3>
            <p className="text-slate-300 font-medium leading-relaxed mb-6">
              Let's be real: due to gatekeeping, costs, and waiting lists, many trans South Africans self-medicate with hormones bought online or shared in community. We don't judge you for surviving in a broken system. But we want you to survive safely.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-bold text-rose-400 mb-3">Monitor These</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Liver function (blood test every 6 months)</li>
                  <li>• Blood pressure monthly</li>
                  <li>• Mood changes (estrogen/testosterone affects mental health)</li>
                  <li>• Blood clot signs: Leg pain, chest pain, sudden shortness of breath</li>
                </ul>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-bold text-emerald-400 mb-3">Emergency Signs</h4>
                <p className="text-sm text-slate-300 mb-3">Go to ER immediately if you experience:</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="text-rose-300">• Severe calf pain or swelling (DVT)</li>
                  <li className="text-rose-300">• Chest pain or difficulty breathing</li>
                  <li className="text-rose-300">• Yellowing skin/eyes (liver distress)</li>
                  <li className="text-rose-300">• Severe headaches with visual changes</li>
                </ul>
              </div>
            </div>

            <p className="text-slate-400 text-sm italic border-t border-white/10 pt-6">
              <strong>We want you alive.</strong> If you can't access "official" care, harm reduction keeps you here. But if you can get medical monitoring (even without prescription), please do.
            </p>
          </div>
        </div>

        {/* Your Rights */}
        <div className="mb-20 p-8 md:p-12 rounded-[3rem] bg-emerald-50 border border-emerald-100">
          <div className="flex items-center gap-4 mb-8">
            <UserCheck className="text-emerald-600" size={32} />
            <h3 className="text-3xl font-black tracking-tight text-slate-900">Your Legal Rights (ZA)</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h5 className="font-black text-lg mb-2 text-slate-900">Age of Medical Consent</h5>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">
                If you are <strong>16 or older</strong>, you do not need parental consent for medical treatment. Your medical records cannot be shared with parents or spouses without your written permission (POPIA and National Health Act).
              </p>
            </div>
            <div>
              <h5 className="font-black text-lg mb-2 text-slate-900">Medical Aid Privacy</h5>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">
                Medical aids often send statements to the "principal member" (usually the parent or spouse paying). If this outs you, you have the right to request confidential communication (though admin can be difficult). Consider paying cash for sensitive visits if safety is at risk.
              </p>
            </div>
          </div>
        </div>

        {/* Final Affirmation */}
        <div className="text-center p-12 rounded-[3rem] bg-gradient-to-br from-emerald-100 to-cyan-50 border border-emerald-200">
          <Heart className="mx-auto text-emerald-500 mb-6" size={48} />
          <h3 className="text-2xl font-black text-slate-900 mb-4">You Are Worth the Care</h3>
          <p className="text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed">
            Even when the system makes you feel like a burden, even when doctors are ignorant, even when the wait is long—you deserve to be healthy. You deserve to be here. Keep searching for the providers who see your humanity. We're fighting to make this better.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthcareGuide;