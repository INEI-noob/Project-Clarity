// src/components/Hero.jsx
import React from 'react';

export const Hero = React.memo(() => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="animate-hero-fade-in"
          style={{ willChange: 'transform, opacity' }}
        >
          <span className="tag-queer mb-6 inline-block">
            Welcome to your safe space
          </span>

          <h1 className="text-fluid-xl font-bold mb-6 text-slate-900">
            Discover Your
            <span className="text-gradient-fluid block mt-2">True Colors</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Project Clarity is a sanctuary for questioning, understanding, and celebrating
            your identity. Find guides, community, and support—no labels required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-primary w-full sm:w-auto">
              <span>Start Exploring</span>
            </button>
            <button className="btn-secondary w-full sm:w-auto">
              Join the Forum
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});
