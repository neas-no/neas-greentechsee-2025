/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '1024px',
      // => @media (min-width: 768px) { ... }

      'lg': '1280px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1350px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      'mabry': ['Mabry'],
      'mabry-light': ['Mabry-Light'],
      'mabry-medium': ['Mabry-Medium'],
      'mabry-bold': ['Mabry-Bold'],
    },
    extend: {
      maxWidth: {
        '8xl': '96rem',
      },
      fontFamily: {      
        'mabry': ['Mabry'],
        'mabry-light': ['Mabry-Light'],
        'mabry-medium': ['Mabry-Medium'],
        'mabry-bold': ['Mabry-Bold']
      },
      colors: {
        'neas-new': {
          'primary': '#95C672',
          'secondary': '#B2E290',
          'green': '#0d3a2d',
          'green-product': '#E6F4E4',
          'green-400': '#0D3A2D',
          'green-300': '#1A4538',
          'green-200': '#204B3E',
          'green-100': '#225C4B',
          'green-95': '#134233',
          'green-90': '#1b483a',
          'green-80': '#335649',
          'green-70': '#496559',
          'green-60': '#61766b',
          'green-50': '#79897f',
          'green-40': '#919d95',
          'green-30': '#abb3ad',
          'green-20': '#c6cac7',
          'green-10': '#e2e4e3',
          'lightgreen': '#95c672',
          'lightgreen-95': '#9ac97a',
          'lightgreen-90': '#a1cc81',
          'lightgreen-80': '#acd290',
          'lightgreen-70': '#b8d8a0',
          'lightgreen-60': '#c3ddae',
          'lightgreen-50': '#cfe3bc',
          'lightgreen-40': '#d8e9cb',
          'lightgreen-30': '#ecf4e5',
          'lightgreen-20': '#ecf4e5',
          'lightgreen-10': '#f6faf3',
          'yellow': '#f1e967',
          'lightyellow': '#F5F1B1',
          'pink': '#eebbca',
          'gray': '#f1f6f5',
          'gray-50': '#eef4f3',
          'gray-100': '#e0f0ed',
          'gray-disabled': '#f2f2f2',
          'lightgray': '#ebebeb',
          'lightgray-200': '#EBEBEB',
          'lightgray-100': '#F1F6F5',
          'energy': '#FCF0F3',
          'internet': '#FAF8D6',
          'tv': '#E6F4E4',
        },
        'neas': {
          'gray-100': '#EFEFEF',
          'gray-200': '#edece6',
          'gray-300': '#CCCCCC',
          'gray-400': '#b3b3b3',
          'gray-new': '#E5E5E5',
          'yellow' : '#fbe970',
          'red': '#c02b46',
          'lightblue': '#c9e8f3',
          'lightblue50': '#b1e0e2',
          'lightblue-new': '#c9e8f3',
          'blue': '#385d76',
          'green-info': '#b1e0e3',
          'lightgreen': '#64c2c7',
          'lightgreen50': '#CDE7DF',
          'lightgreen-new': '#C0E1D7',
          'green-new': '#82C3B0',
          'green': '#22535b',
          'black': '#8A9595',
          'gray:': '#F2F2F2',
          900: '#22535b'
        },
        'vitnett': {
          'gray': '#dbdbdb',
          'gray-dark': '#4d4d4d',
          'gray-100': '#555555',
          'orange': '#f7b391',
          'orange-50':'#fce1d3',
          'orange-100':'#ef6724',
        } 
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  darkMode: 'class', // Enable class-based dark mode
}
