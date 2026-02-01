import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Flame, 
  ArrowLeft, 
  Heart, 
  Users, 
  Book, 
  Home,
  Wind,
  Sparkles,
  AlertCircle
} from 'lucide-react';

/**
 * Spirituality Guide - Healing the wound between queerness and the divine
 * Location: src/pages/SpiritualityGuide.jsx
 */

const TabButton = ({ active, onClick, label, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
      active 
        ? 'bg-slate-900 text-white shadow-xl scale-105' 
        : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

const SpiritualCard = ({ title, children, source }) => (
  <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
    <h4 className="font-black text-xl text-slate-900 mb-4 tracking-tight">{title}</h4>
    <div className="text-slate-600 text-sm font-medium leading-relaxed space-y-4">
      {children}
    </div>
    {source && (
      <div className="mt-6 pt-6 border-t border-slate-100 text-[10px] font-black uppercase tracking-widest text-amber-600">
        {source}
      </div>
    )}
  </div>
);

const QuoteBlock = ({ children, author }) => (
  <div className="my-8 p-6 rounded-2xl bg-amber-50 border-l-4 border-amber-400 italic text-slate-700 font-medium">
    "{children}"
    {author && <span className="block mt-3 text-sm text-slate-500 not-italic">— {author}</span>}
  </div>
);

const SpiritualityGuide = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('christianity');

  const content = {
    christianity: {
      title: "Reclaiming Christianity",
      subtitle: "God is not the church that hurt you",
      desc: "You don't have to throw away your entire spiritual foundation because it was used as a weapon. Progressive theology argues that the Bible has been mistranslated and misused to serve patriarchy, not God's love.",
      cards: [
        {
          title: "The Methodists Said Yes",
          body: "In 2020, the Methodist Church of Southern Africa officially allowed same-sex marriage and queer clergy. Many Anglican parishes in Cape Town and Joburg are also moving toward full inclusion. There are churches where you can be fully yourself.",
          source: "IAM (Inclusive & Affirming Ministries) SA"
        },
        {
          title: "The 'Clobber Passages' Debunked",
          body: "The verses used to condemn homosexuality (Leviticus, Romans, Corinthians) were addressing very specific cultural contexts—temple prostitution, rape, pederasty—not loving, consensual relationships. Scholars like Matthew Vines and Rev. Dr. Cheryl Townsend Gillespie have rigorous theological frameworks showing LGBTQ+ inclusion is biblical.",
          source: "God and the Gay Christian; Queer Bible Hermeneutics"
        },
        {
          title: "Find Your Congregation",
          body: "Look for congregations affiliated with IAM (Inclusive & Affirming Ministries). They undergo specific training to be safe for LGBTQ+ people. In Cape Town: St. George's Cathedral. In Joburg: Christ Church Mayfair. Many more exist—you just have to look for the rainbow flag or the IAM sticker.",
          source: "iam.org.za"
        }
      ]
    },
    islam: {
      title: "Islam & Queerness",
      subtitle: "Allah created diversity",
      desc: "The Quran says Allah created nations and tribes so that we might know one another (49:13), and that Allah does not burden a soul beyond its capacity. Progressive Muslim scholars argue that heteronormativity is cultural, not divine.",
      cards: [
        {
          title: "Reinterpreting Lut",
          body: "The story of Lut (or Lot) is traditionally used to condemn homosexuality. But progressive scholars point out that the story is about rape, inhospitality, and abuse of power—not consensual love between adults. The 'sin' was violence and violation of guest rights, not queerness.",
          source: "Muslims for Progressive Values"
        },
        {
          title: "Cape Town's Queer Muslims",
          body: "Cape Town has a vibrant, if discreet, queer Muslim community. Progressive iftars, LGBTQ+-inclusive study circles, and advocacy groups exist. You don't have to choose between your faith and your identity—you may just need to find your specific community within the ummah.",
          source: "The Inner Circle; Muslims for Progressive Values Cape Town"
        },
        {
          title: "The Divine Doesn't Make Mistakes",
          body: "If Allah made you—with your specific desires, your specific gender, your specific heart—then that creation is intentional, not fallen. Theological frameworks of 'fitrah' (innate nature) support that your authentic self is your spiritual self.",
          source: "Progressive Islamic Theology"
        }
      ]
    },
    traditional: {
      title: "African Traditional Spirituality",
      subtitle: "Your ancestors are not ashamed of you",
      desc: "Before colonialism imposed Victorian Christian morality, many African cultures recognized gender diversity and same-sex relationships. Sangomas and traditional healers often view queer people as having special spiritual gifts or callings.",
      cards: [
        {
          title: "Pre-Colonial Reality",
          body: "The Zungu, the Sekoati, the 'moffie' sangomas—these were recognized roles in various African societies. Same-sex marriage existed in many pre-colonial African cultures. The idea that 'homosexuality is un-African' is a colonial import used to divide and control.",
          source: "Marc Epprecht; Sylvia Tamale"
        },
        {
          title: "Sangoma Acceptance",
          body: "Many queer South Africans report that when they consulted sangomas or ancestors about their sexuality, the spiritual response was acceptance—or even that their queerness was part of their spiritual calling. Lineage isn't about conforming to colonial gender norms; it's about spiritual connection.",
          source: "Indigenous Knowledge Systems; Queer African Studies"
        },
        {
          title: "Ancestors Want Wholeness",
          body: "Your ancestors want you to be whole, happy, and able to contribute to the family and community. They do not want you suffering in the closet or living a lie. Many traditional healers will tell you: the ancestors know who you are, and they're waiting for you to accept yourself.",
          source: "Traditional healing practitioners"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-32 px-6 bg-gradient-to-b from-white to-amber-50/20">
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
            <span className="px-4 py-2 rounded-full bg-amber-50 text-amber-600 font-black text-[10px] uppercase tracking-widest mb-6 inline-block">
              Soul & Spirit
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[0.95] mb-8">
              God, Ancestors, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600">And You.</span>
            </h1>
            <div className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl space-y-6">
              <p>
                Maybe you used to pray every night until the prayers started sounding like begging—begging God to make you straight, to make you cis, to make you acceptable. Maybe you were told your queerness was "demonic" or that your ancestors were turning their backs on you. Maybe you watched your family choose their church over their child.
              </p>
              <p className="text-slate-500">
                The wound between spirituality and queerness runs deep in South Africa, where religion is often weaponized by family and community. But here's the truth: <strong>whatever divine force exists in this universe made you exactly as you are.</strong> And there are ways to heal that wound—whether that means reclaiming your faith, finding a new one, or building a meaningful life without organized religion at all.
              </p>
            </div>
          </motion.div>
        </header>

        {/* The Wound Section - More validating */}
        <section className="mb-24 p-8 md:p-12 rounded-[3rem] bg-rose-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">You Are Not Going to Hell</h3>
            <div className="space-y-4 text-rose-100 font-medium leading-relaxed mb-8">
              <p>
                Let's address the anxiety directly: the constant fear that maybe they're right, maybe you are "against God's plan," maybe the afterlife holds punishment for living authentically.
              </p>
              <p className="text-white font-bold text-lg">
                If God is love, and your love is real, then God is in your love. If God is truth, and you are living your truth, then God is in your truth.
              </p>
              <p>
                Any theology that requires you to hate yourself is not divine—it's human prejudice wearing God's clothes.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle size={20} /> Spiritual Abuse is Real
              </h4>
              <p className="text-rose-200 text-sm leading-relaxed">
                Being told you're possessed, being subjected to "conversion prayer," being shunned by your religious community—these are forms of abuse. It's okay to grieve them. It's also okay to walk away completely. You don't owe your abuser your continued presence, even if that abuser is your childhood church.
              </p>
            </div>
          </div>
        </section>

        <QuoteBlock author="A queer pastor in Cape Town">
          I spent ten years trying to pray the gay away. I starved myself, I flagellated myself, I begged. And then one day I realized: if God made me, and God doesn't make mistakes, then who am I to call God's creation 'abomination'? The only sin was my self-hatred.
        </QuoteBlock>

        {/* Leaving is Valid Section */}
        <div className="mb-24 p-8 md:p-12 rounded-[3rem] bg-slate-900 text-white">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <Wind size={40} className="text-slate-300" />
            </div>
            <div>
              <h3 className="text-2xl font-black mb-4">Leaving Religion is Also Holy</h3>
              <p className="text-slate-300 font-medium leading-relaxed">
                If you cannot step back into a church, mosque, or temple without shaking; if every prayer feels tainted by the memory of condemnation; if you need to be free of organized religion to heal—that is valid. Secular spirituality, atheism, agnosticism, or simply "I don't know" are all legitimate ways to move through the world. You don't have to replace one dogma with another. You just have to find your peace.
              </p>
            </div>
          </div>
        </div>

        {/* Faith Reclaiming Toggle */}
        <section className="mb-24">
          <h3 className="text-2xl font-black mb-8 text-slate-900">If You Want to Stay</h3>
          <p className="text-slate-600 font-medium mb-8 leading-relaxed">
            Many queer South Africans deeply miss their faith communities but don't know where to find safe ones. Here are affirming theological frameworks for the major traditions:
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <TabButton 
              active={activeTab === 'christianity'} 
              onClick={() => setActiveTab('christianity')} 
              label="Christianity" 
              icon={Book}
            />
            <TabButton 
              active={activeTab === 'islam'} 
              onClick={() => setActiveTab('islam')} 
              label="Islam" 
              icon={Moon}
            />
            <TabButton 
              active={activeTab === 'traditional'} 
              onClick={() => setActiveTab('traditional')} 
              label="Traditional African" 
              icon={Flame}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-3">{content[activeTab].title}</h3>
                <p className="text-lg text-amber-600 font-medium mb-4">{content[activeTab].subtitle}</p>
                <p className="text-lg text-slate-600 font-medium max-w-2xl">{content[activeTab].desc}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content[activeTab].cards.map((card, i) => (
                  <SpiritualCard key={i} title={card.title} source={card.source}>
                    <p>{card.body}</p>
                  </SpiritualCard>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Family & Boundaries */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-4 rounded-2xl bg-rose-50 text-rose-600">
              <Home size={24} />
            </div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">When Family Uses God Against You</h3>
          </div>

          <div className="prose prose-lg text-slate-600 font-medium leading-relaxed mb-8">
            <p>
              The most painful religious rejection often comes from family. "The Bible says" becomes a shield for their discomfort. "What will people say at church?" becomes more important than your happiness. "We're praying for you" becomes a weapon.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-rose-50 border border-rose-100">
              <h4 className="font-black text-rose-900 mb-4">Setting Boundaries</h4>
              <p className="text-rose-900/80 text-sm font-medium leading-relaxed mb-4">
                It's okay to say: <strong>"I love you, but I won't discuss my sexuality/spirituality with you if it leads to condemnation. If you bring this up, I will leave the room/end the call."</strong>
              </p>
              <p className="text-rose-900/80 text-sm font-medium leading-relaxed">
                You don't have to attend family prayer sessions where you're the "special intention." You don't have to listen to sermons about "sin" while they stare at you. You can opt out of spiritual abuse, even from parents.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100">
              <h4 className="font-black text-indigo-900 mb-4">The "Love the Sinner" Lie</h4>
              <p className="text-indigo-900/80 text-sm font-medium leading-relaxed mb-4">
                When family says "love the sinner, hate the sin," what they mean is they hate a fundamental part of who you are but want to feel virtuous about it. This is not love. Love does not require you to carve off pieces of yourself.
              </p>
              <p className="text-indigo-900/80 text-sm font-medium leading-relaxed">
                <strong>You are not a sinner for existing. You are not a project to be fixed. You are a whole, divine human.</strong>
              </p>
            </div>
          </div>

          <QuoteBlock author="Someone who walked away from toxic faith">
            My mother chose her church over me for three years. When she finally came around—when she saw I was thriving, not "demon-possessed"—she told me she realized God wouldn't want her to lose her child. I forgave her, but I don't forget that the theology she followed required her to abuse me first.
          </QuoteBlock>
        </section>

        {/* Building New Spiritual Practice */}
        <div className="mb-24 p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-amber-100 to-rose-50 border border-amber-200">
          <h3 className="text-2xl font-black mb-6 text-slate-900 flex items-center gap-3">
            <Sparkles size={28} className="text-amber-500" />
            Creating Your Own Sacred
          </h3>
          <p className="text-slate-700 font-medium leading-relaxed mb-6">
            If organized religion is too damaged for you, you can still have a rich spiritual life:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-amber-100">
              <h5 className="font-bold text-slate-900 mb-2">Nature as Church</h5>
              <p className="text-sm text-slate-600">The ocean, the karoo, the Drakensberg—many queer South Africans find the divine in nature when human-made religion failed them.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-amber-100">
              <h5 className="font-bold text-slate-900 mb-2">Ethics as Worship</h5>
              <p className="text-sm text-slate-600">Living with integrity, consent, and compassion is a spiritual practice. You don't need a scripture to be holy.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-amber-100">
              <h5 className="font-bold text-slate-900 mb-2">Community as Communion</h5>
              <p className="text-sm text-slate-600">Your chosen family, your queer friends, The Pulse community—these can be your congregation.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-amber-100">
              <h5 className="font-bold text-slate-900 mb-2">Silence as Prayer</h5>
              <p className="text-sm text-slate-600">Meditation, breathwork, or simply sitting with yourself can be deeper than any liturgy.</p>
            </div>
          </div>
        </div>

        {/* Resources Footer */}
        <div className="p-8 md:p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-8">Find Your People</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-bold mb-2 text-amber-300">IAM (Inclusive & Affirming Ministries)</h4>
                <p className="text-slate-400 text-sm mb-3">Find affirming churches across SA, theological resources, and community</p>
                <span className="text-xs font-mono text-slate-500">iam.org.za</span>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-bold mb-2 text-amber-300">The Inner Circle</h4>
                <p className="text-slate-400 text-sm mb-3">Support for LGBTQ+ Muslims in Cape Town and beyond</p>
                <span className="text-xs font-mono text-slate-500">theinnercircle.org.za</span>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-bold mb-2 text-amber-300">Queer Theology Project</h4>
                <p className="text-slate-400 text-sm mb-3">Academic and accessible resources for reconciling faith and queerness</p>
                <span className="text-xs font-mono text-slate-500">queertheology.com</span>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-bold mb-2 text-amber-300">Traditional Healers Connect</h4>
                <p className="text-slate-400 text-sm mb-3">Find sangomas who welcome and affirm LGBTQ+ clients</p>
                <span className="text-xs font-mono text-slate-500">Ask in community group chats</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        {/* Final Quote */}
        <div className="mt-20 text-center">
          <p className="text-3xl font-black italic text-slate-900 max-w-3xl mx-auto leading-tight mb-6">
            "Your queerness is not a test from God. It is not a sin. It is not a demon. It is part of the wild, beautiful diversity of creation."
          </p>
          <p className="text-slate-500 font-medium">
            However you pray, or don't—may you find peace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpiritualityGuide;