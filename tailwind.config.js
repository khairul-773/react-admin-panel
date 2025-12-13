/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.125rem', letterSpacing: '0.01em', fontWeight: '500' }],
        'sm': ['0.875rem', { lineHeight: '1.375rem', letterSpacing: '0.005em', fontWeight: '500' }],
        'base': ['1rem', { lineHeight: '1.625rem', letterSpacing: '0', fontWeight: '400' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em', fontWeight: '600' }],
        'xl': ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.015em', fontWeight: '700' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em', fontWeight: '700' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em', fontWeight: '800' }],
        '4xl': ['2.25rem', { lineHeight: '2.625rem', letterSpacing: '-0.03em', fontWeight: '800' }],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0',
        wide: '0.005em',
        wider: '0.01em',
        widest: '0.02em',
      },
      lineHeight: {
        'relaxed': '1.625',
        'loose': '1.75',
      },
    },
  },
  plugins: [],
}