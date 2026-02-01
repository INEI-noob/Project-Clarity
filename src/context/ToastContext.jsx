// src/context/ToastContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 5000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-3 w-full max-w-sm px-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className={`
                glass-sanctuary px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border-l-4 pointer-events-auto
                ${toast.type === 'success' ? 'border-l-emerald-400' : ''}
                ${toast.type === 'error' ? 'border-l-rose-400' : ''}
                ${toast.type === 'info' ? 'border-l-indigo-400' : ''}
              `}
            >
              {toast.type === 'success' && <CheckCircle className="text-emerald-500 shrink-0" size={20} />}
              {toast.type === 'error' && <AlertCircle className="text-rose-500 shrink-0" size={20} />}
              {toast.type === 'info' && <Info className="text-indigo-500 shrink-0" size={20} />}
              <p className="text-sm font-semibold text-slate-800 flex-1">{toast.message}</p>
              <button 
                onClick={() => removeToast(toast.id)} 
                className="text-slate-400 hover:text-slate-600 pointer-events-auto"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};