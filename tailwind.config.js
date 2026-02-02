/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'jakarta': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        sapphire: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          900: '#312e81',
        },
        aurora: {
          rose: '#fda4af',
          lavender: '#c4b5fd',
          mint: '#6ee7b7',
          peach: '#fdba74',
          cyan: '#67e8f9',
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'aurora-flow': 'aurora-flow 15s ease infinite',
        'blob-bounce': 'blob-bounce 20s ease-in-out infinite',
        'float': 'float-gentle 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'aurora-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '25%': { backgroundPosition: '50% 100%' },
          '50%': { backgroundPosition: '100% 50%' },
          '75%': { backgroundPosition: '50% 0%' },
        },
        'blob-bounce': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(20px, -30px) scale(1.1)' },
          '50%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '75%': { transform: 'translate(-30px, -20px) scale(1.05)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
      },
      boxShadow: {
        'soft': '0 8px 32px -8px rgba(99, 102, 241, 0.15)',
        'glow': '0 0 40px -10px rgba(199, 210, 254, 0.6)',
      },
    },
  },
  plugins: [],
  // Performance optimizations
  future: {
    hoverOnlyWhenSupported: true,
  },
  experimental: {
    optimizeUniversalDefaults: true,
  },
}