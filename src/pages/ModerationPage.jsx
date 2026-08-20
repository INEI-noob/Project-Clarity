import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Trash2, Flag, Wind, User, Ghost, RefreshCw, AlertTriangle, KeyRound } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useToast } from '../context/ToastContext';

const MODERATOR_PASSWORD = import.meta.env.VITE_MODERATOR_PASSWORD;

const MOOD_LABELS = {
  rant: 'Venting',
  celebrate: 'Celebration',
  question: 'Question',
  support: 'Seeking Support'
};

const ModerationPage = () => {
  const { addToast } = useToast();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [reports, setReports] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(null);

  const load = async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [reportsRes, postsRes] = await Promise.all([
        supabase
          .from('reports')
          .select('*, pulses(id, content, mood, is_anonymous, user_name, is_deleted, created_at)')
          .order('created_at', { ascending: false })
          .limit(200),
        supabase
          .from('pulses')
          .select('id, content, mood, is_anonymous, user_name, is_deleted, created_at')
          .order('created_at', { ascending: false })
          .limit(50)
      ]);
      setReports(reportsRes.data || []);
      setRecentPosts(postsRes.data || []);
    } catch {
      addToast('Could not load the moderation queue', 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authed) {
      const timer = setTimeout(load, 0);
      return () => clearTimeout(timer);
    }
  }, [authed]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!password) {
      addToast('Enter your moderator password', 'error');
      return;
    }
    if (password === MODERATOR_PASSWORD) {
      setAuthed(true);
    } else {
      addToast('Incorrect password', 'error');
    }
  };

  const removePost = async (pulseId) => {
    setBusy(`remove-${pulseId}`);
    try {
      await supabase.from('pulses').update({ is_deleted: true }).eq('id', pulseId);
      await supabase.from('comments').update({ is_deleted: true }).eq('pulse_id', pulseId);
      await supabase.from('reports').delete().eq('pulse_id', pulseId);
      addToast('Post removed', 'success');
      load();
    } catch {
      addToast('Could not remove the post', 'error');
    }
    setBusy(null);
  };

  const dismissReports = async (pulseId) => {
    setBusy(`dismiss-${pulseId}`);
    try {
      await supabase.from('reports').delete().eq('pulse_id', pulseId);
      addToast('Reports dismissed', 'success');
      load();
    } catch {
      addToast('Could not dismiss the reports', 'error');
    }
    setBusy(null);
  };

  const groupedReports = reports.reduce((acc, report) => {
    const pid = report.pulse_id;
    if (!acc[pid]) acc[pid] = { pulse: report.pulses, items: [] };
    acc[pid].items.push(report);
    return acc;
  }, {});

  if (!MODERATOR_PASSWORD) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 mx-auto mb-6"><KeyRound size={36} /></div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Moderation isn't configured</h1>
        <p className="text-slate-600 leading-relaxed">Set <code className="px-2 py-1 bg-slate-100 rounded-lg text-sm">VITE_MODERATOR_PASSWORD</code> in your <code className="px-2 py-1 bg-slate-100 rounded-lg text-sm">.env.local</code> to unlock the moderation queue.</p>
      </div>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 mx-auto mb-6"><Shield size={36} /></div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Supabase isn't configured yet</h1>
        <p className="text-slate-600 leading-relaxed">Add <code className="px-2 py-1 bg-slate-100 rounded-lg text-sm">VITE_SUPABASE_URL</code> and a key to see the live queue.</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="max-w-md mx-auto py-20 text-center">
        <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto mb-6"><Lock size={36} /></div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Moderation</h1>
        <p className="text-slate-500 mb-8">Enter your moderator password to review reports and remove content.</p>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Moderator password"
            className="px-5 py-4 rounded-2xl border border-slate-200 text-slate-700 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50 outline-none"
          />
          <button type="submit" className="py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors">Unlock</button>
        </form>
      </div>
    );
  }

  const queueCount = Object.keys(groupedReports).length;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600"><Shield size={28} /></div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Moderation</h1>
            <p className="text-sm text-slate-500">Private queue — don't share this link.</p>
          </div>
        </div>
        <button onClick={load} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1.5"><RefreshCw size={14} /> Refresh</button>
      </div>

      <div className="flex items-start gap-3 mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
        <AlertTriangle size={18} className="shrink-0 mt-0.5" />
        <p>The password gate is obfuscation, not real security — the key ships in the browser bundle. If you need hardened moderation, protect the <code className="px-1.5 py-0.5 bg-amber-100 rounded">reports</code> and <code className="px-1.5 py-0.5 bg-amber-100 rounded">pulses</code> tables with Supabase Row Level Security later.</p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 text-sm">Loading the queue…</div>
      ) : (
        <>
          <section className="mb-12">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <Flag size={16} className="text-rose-400" /> Reported ({queueCount})
            </h2>

            {queueCount === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5 text-emerald-400"><Shield size={36} /></div>
                <p className="text-slate-600 font-semibold">Queue is clear</p>
                <p className="text-slate-400 text-sm mt-1">No reported pulses right now.</p>
              </div>
            )}

            <div className="space-y-4">
              {Object.values(groupedReports).map(({ pulse, items }) => (
                <motion.div key={pulse?.id || items[0]?.pulse_id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${pulse?.is_deleted ? 'bg-slate-100 text-slate-300' : (pulse?.is_anonymous ? 'bg-slate-100 text-slate-400' : 'bg-indigo-100 text-indigo-600')}`}>
                      {pulse?.is_deleted ? <Wind size={18} /> : (pulse?.is_anonymous ? <Ghost size={18} /> : <User size={18} />)}
                    </div>
                    <div className="flex-1">
                      <span className="block font-bold text-sm text-slate-900 mb-1">
                        {pulse?.is_deleted ? 'Deleted Post' : (pulse?.is_anonymous ? 'Anonymous' : pulse?.user_name)}
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        {pulse?.mood && <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">{MOOD_LABELS[pulse.mood] || pulse.mood}</span>}
                        {pulse?.created_at && <span className="text-xs text-slate-400">{new Date(pulse.created_at).toLocaleString()}</span>}
                        {pulse?.is_deleted && <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Already removed</span>}
                      </div>
                    </div>
                  </div>

                  <p className={`mb-4 leading-relaxed ${pulse?.is_deleted ? 'text-slate-400 italic' : 'text-slate-700'}`}>
                    {pulse ? `"${pulse.content}"` : '(pulse no longer exists)'}
                  </p>

                  <div className="space-y-2 mb-5">
                    {items.map((report, idx) => (
                      <div key={idx} className="rounded-2xl bg-rose-50/60 border border-rose-100 p-3 text-sm">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-bold text-rose-700">{report.reason}</span>
                          <span className="text-xs text-slate-400 shrink-0">{new Date(report.created_at).toLocaleString()}</span>
                        </div>
                        {report.details && <p className="text-slate-600 mt-1">{report.details}</p>}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => removePost(pulse?.id)}
                      disabled={busy === `remove-${pulse?.id}` || pulse?.is_deleted}
                      className="flex-1 py-3 px-4 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-500 transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                    >
                      <Trash2 size={15} /> {pulse?.is_deleted ? 'Removed' : 'Remove Post'}
                    </button>
                    <button
                      onClick={() => dismissReports(pulse?.id)}
                      disabled={busy === `dismiss-${pulse?.id}`}
                      className="flex-1 py-3 px-4 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors disabled:opacity-40"
                    >
                      Dismiss Reports
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <Wind size={16} className="text-indigo-400" /> Recent Pulses ({recentPosts.length})
            </h2>
            <div className="space-y-2">
              {recentPosts.map((post) => (
                <div key={post.id} className={`bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4 ${post.is_deleted ? 'opacity-50' : ''}`}>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${post.is_deleted ? 'text-slate-400 italic line-through' : 'text-slate-700'}`}>"{post.content}"</p>
                    <p className="text-xs text-slate-400 mt-1">{post.is_anonymous ? 'Anonymous' : post.user_name} · {new Date(post.created_at).toLocaleString()}</p>
                  </div>
                  {!post.is_deleted && (
                    <button onClick={() => removePost(post.id)} disabled={busy === `remove-${post.id}`} className="shrink-0 p-2.5 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 transition-colors disabled:opacity-40" title="Remove post">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              {recentPosts.length === 0 && <p className="text-center text-slate-400 text-sm py-8">No pulses yet.</p>}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ModerationPage;