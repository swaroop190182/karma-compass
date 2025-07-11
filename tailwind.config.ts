
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        body: ['PT Sans', 'sans-serif'],
        headline: ['PT Sans', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0) scale(1.05)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px) scale(1.05)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px) scale(1.05)' },
        },
        'fly-to-wallet': {
          '0%': {
            top: 'var(--start-top, 50%)',
            left: 'var(--start-left, 50%)',
            transform: 'translate(-50%, -50%) scale(1.5)',
            opacity: '1',
          },
          '40%': {
            transform: 'translate(-50%, -50%) scale(1.75)',
            opacity: '1',
          },
          '100%': {
            top: 'var(--end-top, 0)',
            left: 'var(--end-left, 0)',
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: '0.5',
          },
        },
        'coin-spin': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        'reaction-pop-up': {
          '0%': { transform: 'translate(-50%, 0) scale(0.5)', opacity: '0' },
          '50%': { transform: 'translate(-50%, -80px) scale(1.2)', opacity: '1' },
          '100%': { transform: 'translate(-50%, -120px) scale(1)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pop-in': 'pop-in 0.3s ease-out',
        'shake': 'shake 0.4s ease-in-out',
        'fly-to-wallet': 'fly-to-wallet 1.5s ease-in-out forwards',
        'coin-spin': 'coin-spin 2s linear infinite',
        'reaction-pop-up': 'reaction-pop-up 1s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
