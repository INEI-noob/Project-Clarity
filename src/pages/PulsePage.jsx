import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Heart, MessageSquare, Send, 
  Ghost, User, EyeOff, Eye, Sparkles, Wind, Shield, 
  Flag, HandHeart, RefreshCw, X, HelpCircle, Loader2,
  ChevronDown, ChevronUp, Trash2, Edit2, Download
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useToast } from '../context/ToastContext';

const MOODS = {
  rant: { color: 'rose', icon: Flame, label: 'Venting', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', placeholder: "What's heavy on your heart? Let it out..." },
  celebrate: { color: 'amber', icon: Sparkles, label: 'Celebration', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', placeholder: "What joy are you carrying? Share your win..." },
  question: { color: 'indigo', icon: HelpCircle, label: 'Question', bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', placeholder: "What are you trying to understand? Ask anything..." },
  support: { color: 'teal', icon: HandHeart, label: 'Seeking Support', bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', placeholder: "How can the community hold you?" }
};

const PULSE_REACTIONS = [
  { type: 'hug', icon: '🫂', label: 'Hug', color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { type: 'same', icon: '💙', label: 'Same', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { type: 'love', icon: '🫶', label: 'Love', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { type: 'here', icon: '🌈', label: 'Here', color: 'bg-amber-100 text-amber-700 border-amber-200' }
];

const COMMENT_REACTIONS = [
  { type: 'heart', icon: '❤️', label: 'Heart' },
  { type: 'agree', icon: '👍', label: 'Agree' }
];

// Edit window duration (15 minutes)
const EDIT_WINDOW_MS = 15 * 60 * 1000;

const REPORT_REASONS = [
  'Harassment or abuse',
  'Self-harm concern',
  'Spam',
  'Sexual content',
  'Outing or doxxing',
  'Something else'
];

const PulsePage = ({ setPage }) => {
  const { addToast } = useToast();
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState(() => {
    const saved = localStorage.getItem('clarity_my_posts');
    return saved ? JSON.parse(saved) : [];
  });
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [selectedMood, setSelectedMood] = useState('support');
  const [isTyping, setIsTyping] = useState(false);
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [pendingPost, setPendingPost] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [reportingPost, setReportingPost] = useState(null);
  const [reportReason, setReportReason] = useState(REPORT_REASONS[0]);
  const [reportDetails, setReportDetails] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    fetchPosts();
    
    const pulsesSubscription = supabase
      .channel('pulses')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pulses' }, handlePulseChange)
      .subscribe();

    const commentsSubscription = supabase
      .channel('comments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, handleCommentChange)
      .subscribe();

    return () => {
      pulsesSubscription.unsubscribe();
      commentsSubscription.unsubscribe();
    };
  }, []);

  const handlePulseChange = (payload) => {
    if (payload.eventType === 'INSERT') {
      setPosts(current => [payload.new, ...current]);
    } else if (payload.eventType === 'UPDATE') {
      setPosts(current => current.map(post => post.id === payload.new.id ? payload.new : post));
    }
  };

  const handleCommentChange = (payload) => {
    if (payload.eventType === 'INSERT') {
      const newComment = payload.new;
      setComments(current => ({
        ...current,
        [newComment.pulse_id]: [...(current[newComment.pulse_id] || []), newComment]
      }));
    } else if (payload.eventType === 'UPDATE') {
      setComments(current => {
        const pulseComments = current[payload.new.pulse_id] || [];
        return {
          ...current,
          [payload.new.pulse_id]: pulseComments.map(c => c.id === payload.new.id ? payload.new : c)
        };
      });
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data: pulses, error: pulsesError } = await supabase
        .from('pulses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (pulsesError) throw pulsesError;
      
      const pulseIds = pulses.map(p => p.id);
      const { data: allComments, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .in('pulse_id', pulseIds)
        .order('created_at', { ascending: true });
      
      if (commentsError) throw commentsError;

      const groupedComments = allComments.reduce((acc, comment) => {
        if (!acc[comment.pulse_id]) acc[comment.pulse_id] = [];
        acc[comment.pulse_id].push(comment);
        return acc;
      }, {});

      setPosts(pulses.map(post => ({
        ...post,
        time: getTimeAgo(new Date(post.created_at).getTime())
      })));
      setComments(groupedComments);
    } catch {
      addToast('Failed to load pulses', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleComments = async (postId) => {
    if (expandedPost === postId) {
      setExpandedPost(null);
    } else {
      setExpandedPost(postId);
      if (!comments[postId]) {
        const { data } = await supabase
          .from('comments')
          .select('*')
          .eq('pulse_id', postId)
          .order('created_at', { ascending: true });
        setComments(current => ({ ...current, [postId]: data || [] }));
      }
    }
  };

  const submitComment = async (pulseId, parentId = null) => {
    const content = commentInputs[pulseId];
    if (!content?.trim()) return;

    try {
      const newComment = {
        pulse_id: pulseId,
        parent_id: parentId,
        content: content.trim(),
        is_anonymous: isAnonymous,
        user_name: isAnonymous ? null : (userName.trim() || "Clarity Soul"),
        reactions: { heart: 0, agree: 0 }
      };

      const { error } = await supabase.from('comments').insert([newComment]);
      
      if (error) throw error;

      setCommentInputs(current => ({ ...current, [pulseId]: '' }));
      setReplyingTo(null);
      addToast('Reply shared', 'success');
    } catch {
      addToast('Failed to post reply', 'error');
    }
  };

  const handleCommentReaction = async (pulseId, commentId, reactionType) => {
    try {
      setComments(current => {
        const pulseComments = current[pulseId] || [];
        return {
          ...current,
          [pulseId]: pulseComments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                reactions: {
                  ...comment.reactions,
                  [reactionType]: (comment.reactions?.[reactionType] || 0) + 1
                }
              };
            }
            return comment;
          })
        };
      });

      const { data } = await supabase.from('comments').select('reactions').eq('id', commentId).single();
      const current = data?.reactions || {};
      const newReactions = { ...current, [reactionType]: (current[reactionType] || 0) + 1 };
      
      await supabase.from('comments').update({ reactions: newReactions }).eq('id', commentId);
    } catch {
      addToast('Failed to react', 'error');
    }
  };

  const checkHeavyContent = (text) => {
    const indicators = ['suicide', 'kill myself', 'end it', 'want to die', 'hurt myself'];
    return indicators.some(i => text.toLowerCase().includes(i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      addToast('Please share something before posting', 'error');
      return;
    }

    if (checkHeavyContent(input) && !showSafetyModal) {
      setPendingPost({ input, userName, isAnonymous, selectedMood });
      setShowSafetyModal(true);
      return;
    }

    await createPost(input, userName, isAnonymous, selectedMood);
  };

  const createPost = async (content, name, anonymous, mood) => {
    try {
      const deleteToken = crypto.randomUUID();
      
      const newPost = {
        content: content.trim(),
        mood,
        is_anonymous: anonymous,
        user_name: anonymous ? null : (name.trim() || "Clarity Soul"),
        reactions: { hug: 0, same: 0, love: 0, here: 0 },
        reply_count: 0,
        delete_token: deleteToken,
        is_deleted: false
      };

      const { data, error } = await supabase.from('pulses').insert([newPost]).select().single();
      
      if (error) throw error;
      
      const myPostRecord = { 
        id: data.id, 
        token: deleteToken, 
        created_at: new Date().toISOString(),
        preview: content.slice(0, 50) + (content.length > 50 ? '...' : '')
      };
      
      const updatedMyPosts = [myPostRecord, ...myPosts];
      setMyPosts(updatedMyPosts);
      localStorage.setItem('clarity_my_posts', JSON.stringify(updatedMyPosts));
      
      setInput("");
      setUserName("");
      setShowSafetyModal(false);
      setPendingPost(null);
      addToast('Your pulse has been shared. Tap the menu to delete anytime.', 'success');
      
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    } catch (error) {
      addToast('Failed to post', 'error');
      console.error(error);
    }
  };

  const handleDelete = async (post) => {
    const myPost = myPosts.find(p => p.id === post.id);
    if (!myPost) {
      addToast('You can only delete your own posts', 'error');
      return;
    }

    if (!window.confirm('Delete this post permanently? This cannot be undone.')) return;
    
    try {
      const { error } = await supabase
        .from('pulses')
        .update({ 
          is_deleted: true, 
          content: '[deleted by author]',
          user_name: null
        })
        .eq('id', post.id)
        .eq('delete_token', myPost.token);

      if (error) throw error;
      
      const updated = myPosts.filter(p => p.id !== post.id);
      setMyPosts(updated);
      localStorage.setItem('clarity_my_posts', JSON.stringify(updated));
      
      addToast('Post deleted', 'info');
    } catch {
      addToast('Could not delete post', 'error');
    }
  };

  const canEdit = (post) => {
    if (post.is_deleted) return false;
    const myPost = myPosts.find(p => p.id === post.id);
    if (!myPost) return false;
    
    const createdAt = new Date(post.created_at).getTime();
    const now = Date.now();
    return (now - createdAt) < EDIT_WINDOW_MS;
  };

  const startEdit = (post) => {
    if (!canEdit(post)) {
      addToast('Edit window expired (15 minutes)', 'error');
      return;
    }
    setEditingPost(post.id);
    setEditContent(post.content);
  };

  const saveEdit = async (post) => {
    const myPost = myPosts.find(p => p.id === post.id);
    if (!myPost) return;

    try {
      const { error } = await supabase
        .from('pulses')
        .update({ content: editContent.trim() })
        .eq('id', post.id)
        .eq('delete_token', myPost.token);

      if (error) throw error;
      
      setEditingPost(null);
      setEditContent("");
      addToast('Post updated', 'success');
    } catch {
      addToast('Failed to update', 'error');
    }
  };

  const exportMyPosts = () => {
    if (myPosts.length === 0) {
      addToast('No posts to export', 'info');
      return;
    }
    
    const data = {
      exportDate: new Date().toISOString(),
      posts: myPosts,
      warning: "Keep this file safe. Anyone with these tokens can delete your posts."
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clarity-my-posts-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addToast('Posts exported. Keep this file safe!', 'info', 4000);
  };

  const importMyPosts = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.posts || !Array.isArray(data.posts)) {
          throw new Error('Invalid file format');
        }
        
        // Merge with existing, avoiding duplicates
        const existingIds = new Set(myPosts.map(p => p.id));
        const newPosts = data.posts.filter(p => !existingIds.has(p.id));
        
        const merged = [...newPosts, ...myPosts];
        setMyPosts(merged);
        localStorage.setItem('clarity_my_posts', JSON.stringify(merged));
        
        addToast(`Restored ${newPosts.length} posts`, 'success');
      } catch {
        addToast('Invalid backup file', 'error');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  const handleConfirmPost = () => {
    if (pendingPost) {
      createPost(pendingPost.input, pendingPost.userName, pendingPost.isAnonymous, pendingPost.selectedMood);
    }
  };

  const handleReaction = async (postId, reactionType, e) => {
    e.stopPropagation();
    try {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return { ...post, reactions: { ...(post.reactions || {}), [reactionType]: ((post.reactions?.[reactionType]) || 0) + 1 }};
        }
        return post;
      }));

      const post = posts.find(p => p.id === postId);
      const current = post.reactions || {};
      const newReactions = { ...current, [reactionType]: (current[reactionType] || 0) + 1 };
      
      await supabase.from('pulses').update({ reactions: newReactions }).eq('id', postId);
      
      const reaction = PULSE_REACTIONS.find(r => r.type === reactionType);
      addToast(`Sent ${reaction.label.toLowerCase()}`, 'info', 2000);
    } catch {
      addToast('Failed to react', 'error');
    }
  };

  const openReport = (postId) => {
    setReportingPost(postId);
    setReportReason(REPORT_REASONS[0]);
    setReportDetails("");
  };

  const submitReport = async () => {
    if (!reportingPost) return;
    try {
      await supabase.from('reports').insert({
        pulse_id: reportingPost,
        reason: reportReason,
        details: reportDetails.trim() || null,
        created_at: new Date().toISOString()
      });
      addToast('Report received. Thank you.', 'success', 3000);
    } catch {
      addToast('Could not save the report — please try again.', 'error');
    }
    setReportingPost(null);
  };

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPosts(current => current.map(post => ({
        ...post,
        time: getTimeAgo(new Date(post.created_at).getTime())
      })));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (input.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [input]);

  const renderComment = (comment, pulseId, depth = 0) => {
    if (comment.is_deleted) return null;
    
    const childComments = (comments[pulseId] || []).filter(c => c.parent_id === comment.id);
    const isReplying = replyingTo?.commentId === comment.id && replyingTo?.pulseId === pulseId;
    
    return (
      <div key={comment.id} className={`${depth > 0 ? 'ml-8 border-l-2 border-slate-100 pl-4' : ''}`}>
        <div className="py-4">
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${comment.is_anonymous ? 'bg-slate-100 text-slate-400' : 'bg-indigo-100 text-indigo-600'}`}>
              {comment.is_anonymous ? <Ghost size={14} /> : <User size={14} />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm text-slate-900">
                  {comment.is_anonymous ? 'Anonymous' : comment.user_name}
                </span>
                <span className="text-xs text-slate-400">{getTimeAgo(new Date(comment.created_at).getTime())}</span>
              </div>
              <p className="text-slate-700 text-sm mb-3 leading-relaxed">{comment.content}</p>
              
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {COMMENT_REACTIONS.map(reaction => (
                    <button
                      key={reaction.type}
                      onClick={() => handleCommentReaction(pulseId, comment.id, reaction.type)}
                      className="flex items-center gap-1 text-xs bg-white border border-slate-100 rounded-full px-2 py-1 hover:bg-slate-50 transition-colors"
                    >
                      <span>{reaction.icon}</span>
                      <span className="text-slate-500">{(comment.reactions?.[reaction.type] || 0)}</span>
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setReplyingTo(isReplying ? null : { pulseId, commentId: comment.id, userName: comment.user_name })}
                  className="text-xs text-indigo-600 font-medium hover:text-indigo-700"
                >
                  {isReplying ? 'Cancel' : 'Reply'}
                </button>
              </div>

              {isReplying && (
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={commentInputs[pulseId] || ''}
                    onChange={(e) => setCommentInputs(current => ({ ...current, [pulseId]: e.target.value }))}
                    placeholder={`Reply to ${comment.user_name || 'Anonymous'}...`}
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50 outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        submitComment(pulseId, comment.id);
                      }
                    }}
                    autoFocus
                  />
                  <button 
                    onClick={() => submitComment(pulseId, comment.id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors"
                  >
                    <Send size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {childComments.map(child => renderComment(child, pulseId, depth + 1))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-32 pb-32 px-4 md:px-6">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-40 left-10 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl" />
        <motion.div animate={{ y: [0, 30, 0], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 12, repeat: Infinity, delay: 2 }} className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Your Posts Manager */}
        {myPosts.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-end">
            <div className="glass-sanctuary rounded-2xl p-3 flex items-center gap-3">
              <span className="text-xs font-medium text-slate-500">{myPosts.length} post{myPosts.length !== 1 ? 's' : ''} by you</span>
              <button 
                onClick={exportMyPosts}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-bold hover:bg-indigo-100 transition-colors"
              >
                <Download size={12} /> Export Keys
              </button>
              <label className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer">
                <Edit2 size={12} /> Import
                <input type="file" accept=".json" onChange={importMyPosts} className="hidden" />
              </label>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-100 text-rose-600 font-bold text-xs uppercase tracking-wider mb-6">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> Live Pulse
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
            The <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-600">Pulse</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
            A breathing space for your thoughts. Anonymous, raw, and wrapped in community care.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12">
          <div className="glass-sanctuary p-2 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50">
            <div className="bg-white/50 rounded-[2.3rem] p-6 md:p-8 space-y-6">
              {/* Mood Selector */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {Object.entries(MOODS).map(([key, mood]) => (
                  <button key={key} onClick={() => setSelectedMood(key)} className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap ${selectedMood === key ? `${mood.bg} ${mood.border} ${mood.text} border-current shadow-sm` : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                    <mood.icon size={16} />
                    <span className="text-sm font-semibold">{mood.label}</span>
                  </button>
                ))}
              </div>

              {/* Identity Toggle */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/60 rounded-2xl border border-white/60">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors ${isAnonymous ? 'bg-slate-100 text-slate-400' : 'bg-indigo-100 text-indigo-600'}`}>
                    {isAnonymous ? <EyeOff size={18} /> : <Eye size={18} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900">{isAnonymous ? 'Anonymous Mode' : 'Named Post'}</span>
                    <span className="text-[10px] text-slate-500">{isAnonymous ? 'Your identity is hidden' : 'Show my name to community'}</span>
                  </div>
                </div>
                <button onClick={() => setIsAnonymous(!isAnonymous)} className={`w-12 h-6 rounded-full transition-colors relative ${isAnonymous ? 'bg-slate-300' : 'bg-indigo-600'}`}>
                  <motion.div animate={{ x: isAnonymous ? 4 : 28 }} className="w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence>
                  {!isAnonymous && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-slate-200 focus-within:border-indigo-300 transition-colors">
                        <User size={18} className="text-indigo-400" />
                        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Your name or handle..." className="bg-transparent border-none outline-none text-sm font-semibold text-slate-700 placeholder:text-slate-400 w-full" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative">
                  <textarea ref={textareaRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder={MOODS[selectedMood].placeholder} className="w-full bg-white rounded-2xl p-5 border border-slate-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 outline-none transition-all resize-none text-slate-700 placeholder:text-slate-400 min-h-[140px] text-lg leading-relaxed" style={{ height: 'auto', minHeight: '140px' }} onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }} maxLength={1000} />
                  <div className="absolute bottom-4 right-4 text-xs font-medium text-slate-400">{input.length}/1000</div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Wind size={14} /> Take a breath before posting
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={!input.trim()} className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-900/20">
                    Share to Pulse <Send size={16} className={isTyping ? "translate-x-1 transition-transform" : ""} />
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Safety Modal */}
        <AnimatePresence>
          {showSafetyModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSafetyModal(false)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowSafetyModal(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"><X size={18} className="text-slate-500" /></button>
                <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 mb-6"><Heart size={32} className="fill-rose-200" /></div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">We noticed this is heavy</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">Your post suggests you might be going through a difficult time. Would you like to see crisis resources first?</p>
                <div className="space-y-3">
                  <button onClick={() => setPage && setPage('crisis')} className="w-full py-4 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-500 transition-colors">See Crisis Resources</button>
                  <button onClick={handleConfirmPost} className="w-full py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-colors">Post Anyway</button>
                  <button onClick={() => setShowSafetyModal(false)} className="w-full py-3 text-slate-500 text-sm font-medium hover:text-slate-700 transition-colors">Go Back to Editing</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Report Modal */}
        <AnimatePresence>
          {reportingPost && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setReportingPost(null)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <button onClick={() => setReportingPost(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"><X size={18} className="text-slate-500" /></button>
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 mb-6"><Flag size={32} /></div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Report this pulse</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">Reports are anonymous and go straight to the moderation queue. Please tell us why this post concerns you.</p>
                <div className="space-y-2 mb-4" role="radiogroup" aria-label="Report reason">
                  {REPORT_REASONS.map(reason => (
                    <label key={reason} className={`flex items-center gap-3 px-4 py-3 rounded-2xl border cursor-pointer transition-colors ${reportReason === reason ? 'border-indigo-400 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`}>
                      <input type="radio" name="report-reason" value={reason} checked={reportReason === reason} onChange={() => setReportReason(reason)} className="accent-indigo-600" />
                      <span className="text-sm font-semibold text-slate-700">{reason}</span>
                    </label>
                  ))}
                </div>
                <textarea
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="Optional details (e.g. what happened)…"
                  rows={3}
                  className="w-full mb-6 px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50 outline-none resize-none"
                />
                <div className="space-y-3">
                  <button onClick={submitReport} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors">Submit Report</button>
                  <button onClick={() => setReportingPost(null)} className="w-full py-3 text-slate-500 text-sm font-medium hover:text-slate-700 transition-colors">Cancel</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feed */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"><Sparkles size={16} className="text-amber-400" /> Recent Pulses</h2>
            <button onClick={fetchPosts} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1"><RefreshCw size={12} /> Refresh</button>
          </div>

          <AnimatePresence mode="popLayout">
            {posts.map((post, index) => {
              const moodConfig = MOODS[post.mood] || MOODS.support;
              const isExpanded = expandedPost === post.id;
              const postComments = comments[post.id] || [];
              const topLevelComments = postComments.filter(c => !c.parent_id).slice(0, isExpanded ? undefined : 2);
              const isMyPost = myPosts.some(p => p.id === post.id);
              const canEditPost = canEdit(post) && isMyPost;
              const isEditing = editingPost === post.id;
              
              return (
                <motion.article key={post.id} layout initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, delay: index * 0.05 }} className="group">
                  <div className={`glass-sanctuary p-6 md:p-8 rounded-[2.5rem] transition-all duration-500 border-l-[6px] ${post.is_deleted ? 'opacity-60' : 'hover:shadow-2xl'}`} style={{ borderLeftColor: post.is_deleted ? '#cbd5e1' : `var(--${moodConfig.color}-400)` }}>
                    
                    {/* Post Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${post.is_deleted ? 'bg-slate-100 text-slate-300' : (post.is_anonymous ? 'bg-slate-100 text-slate-400' : 'bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600')}`}>
                          {post.is_deleted ? <Wind size={20} /> : (post.is_anonymous ? <Ghost size={20} /> : <User size={20} />)}
                        </div>
                        <div>
                          <span className="block font-bold text-sm text-slate-900">
                            {post.is_deleted ? 'Deleted Post' : (post.is_anonymous ? 'Anonymous Soul' : post.user_name)}
                          </span>
                          {!post.is_deleted && (
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-slate-400 font-medium">{post.time}</span>
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${moodConfig.bg} ${moodConfig.text}`}>
                                {moodConfig.label}
                              </span>
                              {canEditPost && (
                                <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">
                                  Editable
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      {!post.is_deleted && (
                        <div className="flex items-center gap-1">
                          {isMyPost && (
                            <>
                              {canEditPost && (
                                <button 
                                  onClick={() => startEdit(post)}
                                  className="p-2 hover:bg-amber-50 rounded-full transition-colors text-slate-400 hover:text-amber-600"
                                  title="Edit (15min window)"
                                >
                                  <Edit2 size={16} />
                                </button>
                              )}
                              <button 
                                onClick={() => handleDelete(post)}
                                className="p-2 hover:bg-rose-50 rounded-full transition-colors text-slate-400 hover:text-rose-500"
                                title="Delete your post"
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                          <button 
                            onClick={() => openReport(post.id)}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-300 hover:text-slate-600"
                          >
                            <Flag size={16} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <>
                      {isEditing ? (
                        <div className="mb-6 space-y-3">
                          <textarea 
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full bg-white rounded-2xl p-4 border border-indigo-200 focus:border-indigo-400 outline-none resize-none text-slate-700"
                            rows={3}
                          />
                          <div className="flex gap-2 justify-end">
                            <button 
                              onClick={() => { setEditingPost(null); setEditContent(""); }}
                              className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700"
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={() => saveEdit(post)}
                              className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-6">
                          <p className={`text-xl md:text-2xl leading-relaxed font-medium ${post.is_deleted ? 'text-slate-400 italic' : 'text-slate-700'}`}>
                            "{post.content}"
                          </p>
                        </div>
                      )}

                      {/* Reactions */}
                      {!post.is_deleted && (
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex flex-wrap gap-2">
                            {PULSE_REACTIONS.map((reaction) => (
                              <motion.button key={reaction.type} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => handleReaction(post.id, reaction.type, e)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all hover:shadow-md ${reaction.color}`}>
                                <span>{reaction.icon}</span>
                                <span>{reaction.label}</span>
                                {(post.reactions?.[reaction.type] || 0) > 0 && <span className="ml-1 opacity-60">{post.reactions[reaction.type]}</span>}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Comments Section */}
                      {!post.is_deleted && (
                        <div className="pt-6 border-t border-slate-100">
                          <button 
                            onClick={() => toggleComments(post.id)}
                            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-4"
                          >
                            <MessageSquare size={16} />
                            {(post.reply_count || 0) + postComments.length} replies
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <div className="space-y-2 mb-4">
                                  {topLevelComments.map(comment => renderComment(comment, post.id))}
                                </div>

                                {postComments.filter(c => !c.parent_id).length > 2 && !isExpanded && (
                                  <button className="text-xs text-indigo-600 font-medium mb-4 hover:text-indigo-700">Load more replies...</button>
                                )}

                                <div className="flex gap-3 mt-4 pt-4 border-t border-slate-100">
                                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${isAnonymous ? 'bg-slate-100 text-slate-400' : 'bg-indigo-100 text-indigo-600'}`}>
                                    {isAnonymous ? <Ghost size={14} /> : <User size={14} />}
                                  </div>
                                  <div className="flex-1 flex gap-2">
                                    <input
                                      type="text"
                                      value={commentInputs[post.id] || ''}
                                      onChange={(e) => setCommentInputs(current => ({ ...current, [post.id]: e.target.value }))}
                                      placeholder="Add to the conversation..."
                                      className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50 outline-none"
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                          e.preventDefault();
                                          submitComment(post.id);
                                        }
                                      }}
                                    />
                                    <button 
                                      onClick={() => submitComment(post.id)}
                                      disabled={!commentInputs[post.id]?.trim()}
                                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                                    >
                                      <Send size={16} />
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {posts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300"><Wind size={40} /></div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">The Pulse is quiet</h3>
            <p className="text-slate-500">Be the first to share your thoughts today.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PulsePage;