import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, Send, ThumbsDown, ThumbsUp } from 'lucide-react';
import { sendEmail, isEmailConfigured } from '../lib/email';
import { useToast } from '../context/ToastContext';

const BOOKMARK_KEY = 'clarity_saved_guides';

const GuideFeedback = ({ guideId, guideTitle }) => {
  const { addToast } = useToast();
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [sending, setSending] = useState(false);
  const [saved, setSaved] = useState(() =>
    (JSON.parse(window.localStorage.getItem(BOOKMARK_KEY) || '[]')).includes(guideId)
  );

  const toggleSave = () => {
    const current = JSON.parse(window.localStorage.getItem(BOOKMARK_KEY) || '[]');
    const next = saved
      ? current.filter((id) => id !== guideId)
      : [...new Set([...current, guideId])];
    window.localStorage.setItem(BOOKMARK_KEY, JSON.stringify(next));
    setSaved(!saved);
    addToast(saved ? 'Removed from your saved guides.' : 'Saved to your guides. This tab closes and clears nothing — all private.', 'success');
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSending(true);
    try {
      if (isEmailConfigured) {
        await sendEmail({
          to_name: 'Project Clarity',
          to_email: 'feedback',
          message: `Guide feedback for "${guideTitle}": ${feedback.trim()}`,
        });
      }
      addToast('Thank you — your feedback helps shape future guides.', 'success');
      setRating(null);
      setFeedback('');
    } catch {
      addToast('Something went wrong. Please try again.', 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-24 p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
        <div>
          <h3 className="font-black text-slate-900 text-lg mb-1">Was this guide helpful?</h3>
          <p className="text-sm text-slate-500">
            One tap is enough. Your voice keeps the library growing in the right direction.
          </p>
        </div>
        <button
          onClick={toggleSave}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold transition-all ${
            saved
              ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
              : 'border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600'
          }`}
        >
          {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
          {saved ? 'Saved to your guides' : 'Save this guide'}
        </button>
      </div>

      {rating === null ? (
        <div className="flex gap-3">
          <button
            onClick={() => setRating('helpful')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold hover:bg-emerald-100 transition-colors"
          >
            <ThumbsUp size={16} /> Yes, it helped
          </button>
          <button
            onClick={() => setRating('not-helpful')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-50 text-rose-600 text-sm font-bold hover:bg-rose-100 transition-colors"
          >
            <ThumbsDown size={16} /> Not quite
          </button>
        </div>
      ) : rating === 'helpful' ? (
        <p className="text-sm font-semibold text-slate-600">
          We're so glad it helped. Know someone who needs this too? Share it — that's how the sanctuary grows.
        </p>
      ) : (
        <form onSubmit={submitFeedback} className="space-y-4">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            placeholder="What was missing? What could be clearer? (Optional, anonymous)"
            className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-50 transition-all text-sm text-slate-700"
            aria-label="Optional feedback"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={sending || !feedback.trim()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-teal-600 transition-colors disabled:opacity-40"
            >
              <Send size={14} /> {sending ? 'Sending...' : 'Send feedback'}
            </button>
            <button
              type="button"
              onClick={() => setRating(null)}
              className="px-6 py-3 rounded-full border border-slate-200 text-slate-500 text-sm font-bold hover:border-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default GuideFeedback;