import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../layout/Navbar';  // Updated path to ensure resolution
import Footer from '../layout/Footer';  // Updated path to ensure resolution

export const Layout = React.memo(({ children, currentPage, setPage }) => {
  const containerRef = useRef(null);

  // Debounce mouse tracking to reduce main thread work
  const debouncedMouseMove = useCallback(() => {
    let timeoutId;
    return (e) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        containerRef.current.style.setProperty('--mouse-x', `${x}%`);
        containerRef.current.style.setProperty('--mouse-y', `${y}%`);
      }, 16); // ~60fps
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = debouncedMouseMove();
    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, [debouncedMouseMove]);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen w-full flex flex-col bg-slate-50 transition-colors duration-500"
    >
      {/* Ambient Background Layer - Fixed so it stays behind everything during scroll */}
      <div className="fixed inset-0 bg-aurora pointer-events-none" />
      
      {/* Organic Floating Blobs - Fixed background decoration with CSS animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="blob bg-gradient-to-br from-rose-200/40 to-purple-300/40 w-[500px] h-[500px] -top-20 -left-20 blur-3xl animate-float-1"
          style={{ willChange: 'transform' }}
        />
        <div
          className="blob bg-gradient-to-br from-cyan-200/40 to-blue-300/40 w-[400px] h-[400px] top-1/2 -right-20 blur-3xl animate-float-2"
          style={{ willChange: 'transform' }}
        />
        <div
          className="blob bg-gradient-to-br from-amber-100/40 to-pink-200/40 w-[600px] h-[600px] -bottom-40 left-1/3 blur-3xl animate-float-3"
          style={{ willChange: 'transform' }}
        />
      </div>

      <div className="fixed inset-0 texture-noise pointer-events-none opacity-20" />
      <div className="fixed inset-0 spotlight pointer-events-none" />

      {/* Navbar - Pass necessary props */}
      <Navbar currentPage={currentPage} setPage={setPage} />

      {/* Main Content - Flex-grow ensures footer is pushed down on short pages */}
      <main className="relative z-10 flex-grow pt-24 md:pt-28">
        {children}
      </main>

      {/* Footer - Stays at the bottom */}
      <Footer setPage={setPage} />
    </div>
  );
});

export default Layout;
