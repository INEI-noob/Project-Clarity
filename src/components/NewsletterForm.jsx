import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, Send } from 'lucide-react';
import { sendEmail, isEmailConfigured } from '../lib/email';
import { useToast } from '../context/ToastContext';

const STORAGE_KEY = 'clarity_newsletter';

const NewsletterForm = () => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    setStatus('sending');
    try {
      if (isEmailConfigured) {
        await sendEmail({
          to_name: email,
          to_email: email,
          message: 'Newsletter subscription from Project Clarity footer.',
        });
      } else {
        const existing = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...new Set([...existing, email])]));
      }
      setStatus('done');
      addToast("You're on the list. Welcome to the sanctuary.", 'success');
      setEmail('');
    } catch {
      setStatus('idle');
      addToast('Something went wrong. Please try again.', 'error');
    }
  };

  if (status === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-50 border border-emerald-100"
      >
        <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
        <p className="text-sm font-semibold text-emerald-700">
          Welcome to the sanctuary — watch your inbox for the next letter.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-3">
      <label className="sr-only" htmlFor="newsletter-email">Email address</label>
      <div className="relative flex-1">
        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 bg-white focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-50 transition-all text-sm"
          aria-label="Email address"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-teal-600 transition-colors disabled:opacity-50"
      >
        {status === 'sending' ? (
          'Signing up...'
        ) : (
          <>
            <Send size={14} /> Subscribe
          </>
        )}
      </button>
    </form>
  );
};

export default NewsletterForm;