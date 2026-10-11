/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lilac: {
          deep: '#3a2d4c',
          bg: '#4f4366',
          card: '#5e4e75',
          light: '#6e5f86',
        },
        rose: {
          DEFAULT: '#9a6f92',
          glow: 'rgba(154, 111, 146, 0.5)',
        },
        coral: {
          DEFAULT: '#f4a8a2',
          warm: '#ea8571',
          glow: 'rgba(244, 168, 162, 0.4)',
        },
        peach: {
          DEFAULT: '#ffd2b8',
          soft: 'rgba(255, 210, 184, 0.7)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Urbanist"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'float': 'float 6s infinite ease-in-out',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(79, 163, 224, 0.5))', transform: 'scale(1)' },
          '50%': { filter: 'drop-shadow(0 0 22px rgba(79, 163, 224, 0.9))', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(0.8)', opacity: '0.3' },
          '50%': { transform: 'translateY(-30px) scale(1.2)', opacity: '0.9' },
        }
      }
    },
  },
  plugins: [],
}
