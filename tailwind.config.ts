import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#efc27e', // gold500
          200: '#f9f3eb',    // gold200
          400: '#f2d6ac',    // gold400
          500: '#efc27e',    // gold500
          700: '#b4843b',    // gold700
          800: '#856432',    // gold800
        },
        grey: {
          50: '#ffffff',     // grey000
          100: '#f8f7f7',    // grey100
          200: '#ecebea',    // grey200
          300: '#d9d6d2',    // grey300
          400: '#bdb9b3',    // grey400
          500: '#989591',    // grey500
          600: '#726f6b',    // grey600
          700: '#585450',    // grey700
          800: '#2f2e2c',    // grey800
          900: '#1e1e1e',    // grey900
          1000: '#171717',   // grey1000
        },
        text: {
          primary: '#1e1e1e',
          secondary: '#726f6b',
          alternate: '#ffffff',
        },
        background: {
          primary: '#f8f7f7',
          white: '#ffffff',
          black: '#171717',
        },
        border: {
          primary: '#1e1e1e26',
        },
      },
      fontFamily: {
        sans: ['"PP Fragment Sans"', 'Arial', 'system-ui', 'sans-serif'],
        serif: ['"PP Fragment Serif"', 'serif'],
      },
      borderRadius: {
        'main': '0.25rem',
        'large': '0.5rem',
      },
      boxShadow: {
        'light-soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'dark-strong': '0 4px 20px -2px rgba(0, 0, 0, 0.2)',
      },
      fontSize: {
        'h1': ['4rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h2': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h3': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h4': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'h5': ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h6': ['1.125rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      spacing: {
        'tiny': '0.25rem',
        'xsmall': '1rem',
        'small': '1.5rem',
        'medium': '2rem',
        'large': '3rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
