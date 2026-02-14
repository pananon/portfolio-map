/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Monochromatic Palette
        black: '#000000',
        white: '#ffffff',
        // Semantic Application Colors
        bg: {
          primary: '#050505', // Deep smooth black
          secondary: '#111111', // Slightly lighter for cards/sections
          tertiary: '#1a1a1a',
        },
        text: {
          primary: '#ffffff',
          secondary: '#888888', // Muted gray for subtitles
          accent: '#333333', // Dark gray for subtle text
        },
        accent: {
          light: '#ffffff',
          DEFAULT: '#333333',
          dark: '#111111',
        },
        // Keeping legacy names mapped to new theme to prevent immediate crashes, 
        // but we should refactor components to use new names.
        primary: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        secondary: {
          50: '#000000', // Was light, now mapping to dark for "bg-secondary-50" usage
          100: '#111111',
          200: '#222222',
          300: '#333333',
          400: '#444444',
          500: '#555555',
          600: '#666666',
          700: '#777777',
          800: '#888888',
          900: '#ffffff', // Was dark, now white for "text-secondary-900" usage
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal': 'reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        reveal: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      width: {
        'container': '92%',
      }
    },
  },
  plugins: [],
} 