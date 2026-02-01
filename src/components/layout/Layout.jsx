// src/components/layout/Layout.jsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';  // Your existing navbar
import Footer from './Footer';  // Your existing footer

export const Layout = ({ children, currentPage, setPage }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      containerRef.current.style.setProperty('--mouse-x', `${x}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-slate-50">
      {/* Ambient Background Layer */}
      <div className="fixed inset-0 bg-aurora pointer-events-none" />
      
      {/* Organic Floating Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="blob bg-gradient-to-br from-rose-300 to-purple-300 w-[500px] h-[500px] -top-20 -left-20 blob-1"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="blob bg-gradient-to-br from-cyan-300 to-blue-300 w-[400px] h-[400px] top-1/2 -right-20 blob-2"
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="blob bg-gradient-to-br from-amber-200 to-pink-300 w-[600px] h-[600px] -bottom-40 left-1/3 blob-3"
          animate={{ y: [0, -50, 0], x: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="fixed inset-0 texture-noise pointer-events-none opacity-40" />
      <div className="fixed inset-0 spotlight pointer-events-none" />

      {/* Your existing Navbar */}
      <Navbar currentPage={currentPage} setPage={setPage} />

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Your existing Footer */}
      <Footer setPage={setPage} />
    </div>
  );
};