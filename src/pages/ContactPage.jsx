import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Heart, AlertCircle } from 'lucide-react';
import PageShell from '../components/layout/PageShell';
import { sendEmail, isEmailConfigured } from '../lib/email';
import { useToast } from '../context/ToastContext';

const STORAGE_KEY = 'clarity_messages';

const ContactPage = ({ setPage }) => {
  const { addToast } = useToast();
  const [topic, setTopic] = useState('general');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    try {
      if (isEmailConfigured) {
        await sendEmail({
          to_name: name.trim() || 'Anonymous',
          to_email: email.trim() || 'reply',
          message: `Topic: ${topic}\n\n${message.trim()}`,
        });
      } else {
        const existing = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
        existing.push({
          topic,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          createdAt: Date.now(),
        });
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      }
      addToast('Message received. We read everything that reaches us.', 'success');
      setTopic('general');
      setMessage('');
    } catch {
      addToast('Something went wrong. Please try again.', 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <PageShell maxWidth="max-w-3xl" tone="indigo">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-6">
          <Mail size={14} /> Contact Us
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
          Reach the <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Sanctuary</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          Questions, feedback, a group to submit, or a helping hand to offer? We read everything — and it stays between us.
        </p>
      </div>

      {/* Crisis redirect */}
      <div className="mb-8 p-5 rounded-2xl bg-rose-50 border border-rose-100 flex items-start gap-3">
        <AlertCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
        <p className="text-sm text-rose-800/90 leading-relaxed">
          In crisis right now? This form isn't monitored 24/7.{' '}
          {setPage && (
            <button onClick={() => setPage('crisis')} className="font-bold underline underline-offset-2">
              See all crisis lines
            </button>
          )}
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        noValidate
        className="glass-sanctuary rounded-[2.5rem] p-8 md:p-10 space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Name (optional)
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all text-sm"
              placeholder="Anonymous is fine"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Email (optional)
            </label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all text-sm"
              placeholder="Only if you want a reply"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-topic" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            What's this about?
          </label>
          <select
            id="contact-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all text-sm"
          >
            <option value="general">General question</option>
            <option value="feedback">Feedback on a guide or page</option>
            <option value="group">Submit a community group</option>
            <option value="volunteer">Volunteering / getting involved</option>
            <option value="technical">Something isn't working</option>
            <option value="other">Something else</option>
          </select>
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Message
          </label>
          <textarea
            id="contact-message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all text-sm"
            placeholder="Tell us what's on your mind..."
            aria-label="Message"
          />
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <Heart size={14} className="text-rose-400" /> No account needed. Everything stays private.
          </p>
          <button
            type="submit"
            disabled={sending || !message.trim()}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-indigo-600 transition-colors disabled:opacity-40"
          >
            <Send size={14} /> {sending ? 'Sending...' : 'Send message'}
          </button>
        </div>
      </motion.form>
    </PageShell>
  );
};

export default ContactPage;