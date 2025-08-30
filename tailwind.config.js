/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        manrope: ['var(--font-manrope)', 'Manrope', 'sans-serif'],
      },
      colors: {
        // CLAUDE.md Brand Color Palette
        forest: '#3c4b33',   // FOREST - for headers, footers, luxury base
        earth: '#000000',    // EARTH - for headers, footers, luxury base  
        sunflower: '#e9c770', // SUNFLOWER - for buttons with dark text
        fern: '#6f8d5e',     // FERN - for buttons with light text
        mist: '#eeeced',     // MIST - for content blocks, button text
        peachtree: '#f5e6d3', // PEACHTREE - for callout sections
        
        // Legacy colors for backwards compatibility
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
