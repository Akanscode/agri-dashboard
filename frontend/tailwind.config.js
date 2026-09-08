/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1F3B57',
        'navy-light': '#2E5372',
        parchment: '#F7F4EE',
        cream: '#FFFDF9',
        ink: '#2B2B2B',
        muted: '#6B7280',
        border: '#E3DDD0',
        accent: '#8C6A4A',
        success: '#3F6B4A',
        danger: '#8B3A3A',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      boxShadow: {
        classic:
          '0 1px 3px rgba(43, 43, 43, 0.08), 0 1px 2px rgba(43, 43, 43, 0.06)',
      },
    },
  },
  plugins: [],
};