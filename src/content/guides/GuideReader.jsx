import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const GuideReader = ({ guide, content, onBack }) => {
  const { addToast } = useToast();

  if (!guide || !content) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <p className="text-slate-500">Guide not found</p>
      </div>
    );
  }

  const colorMap = {
    indigo: 'from-indigo-400 to-purple-500',
    purple: 'from-purple-400 to-pink-500',
    rose: 'from-rose-400 to-pink-500',
    teal: 'from-teal-400 to-cyan-500',
    cyan: 'from-cyan-400 to-blue-500'
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      addToast('Link copied to clipboard', 'success');
    } catch {
      addToast('Failed to copy link', 'error');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Library
        </motion.button>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{guide.icon}</span>
            <div className={`h-px flex-1 bg-gradient-to-r ${colorMap[guide.color]} opacity-30`} />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
            {guide.title}
          </h1>
          <p className="text-xl text-slate-600 mb-6">{guide.subtitle}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Clock size={16} /> {guide.readTime}
            </span>
            <span className={`px-3 py-1 rounded-full bg-${guide.color}-100 text-${guide.color}-700 font-medium text-xs uppercase tracking-wider`}>
              {guide.difficulty}
            </span>
            <button 
              onClick={handleCopyLink}
              className="text-indigo-600 hover:text-indigo-700 font-medium underline"
            >
              Copy link to share
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg prose-slate max-w-none
            prose-headings:font-bold prose-headings:text-slate-900
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-slate-600 prose-p:leading-relaxed
            prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900
            prose-blockquote:border-l-indigo-500 prose-blockquote:bg-indigo-50/50 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic
            prose-ul:my-6 prose-li:my-2
            prose-hr:border-slate-200"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </motion.div>

        {/* Simple Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-slate-200 text-center"
        >
          <p className="text-slate-500 text-sm">
            Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long' })}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default GuideReader;