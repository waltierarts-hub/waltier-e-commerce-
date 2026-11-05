/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#EF171C',
          ink: '#101010',
          paper: '#F4F2EC',
          pureWhite: '#FFFFFF',
          muted: '#77736E',
          divider: '#D8D4CC',
          darkPaper: '#E8E4DA'
        }
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', 'Impact', '"Arial Black"', 'sans-serif'],
        sans: ['"General Sans"', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px #101010',
        'brutal-lg': '8px 8px 0px #101010',
        'brutal-red': '4px 4px 0px #EF171C',
        'brutal-sm': '2px 2px 0px #101010',
      }
    },
  },
  plugins: [],
}
