/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette based on provided colors
        burgundy: '#C42B59', // Rich burgundy
        blush: '#FFE1E7',    // Soft pink
        sage: '#D4E0C3',     // Light sage green
        charcoal: '#3C3C3C', // Dark charcoal
        gold: '#B88D4A',     // Warm gold/bronze
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
