import plugin from 'tailwindcss/plugin'

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7f2a3c',
        secondary: '#c20000',
        tertiary: '#121212',
        creamson: '#fff0de',
        dim: '#f9f9f9',
        'dim-red': '#8b0000',
        'dim-white': '#ffffffb3',
        'gray-100': '#888888'
      }
    },
    fontFamily: {
      inter: ['Inter', 'Helvetica', 'sans-serif']
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px'
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({
        //
      })
      addComponents({
        //
      })
      addUtilities({
        //
      })
    })
  ]
}
export default config
