/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    // 820px is the design's desktop/mobile switch; the rest are the QA widths.
    screens: { sm: '640px', md: '820px', lg: '1024px', xl: '1440px' },
    extend: {
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        plate: 'rgb(var(--plate) / <alpha-value>)',
        doc: 'rgb(var(--doc) / <alpha-value>)',
        'doc-ink': 'rgb(var(--doc-ink) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        sans: ['"Inter Variable"', 'system-ui', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(.22, 1, .36, 1)',
      },
      maxWidth: {
        frame: '1680px',
      },
    },
  },
  plugins: [],
}
