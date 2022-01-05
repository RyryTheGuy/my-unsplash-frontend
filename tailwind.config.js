module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{ts,tsx}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'noto': ['Noto Sans', 'sans-serif'],
    },
    screens: {
      '2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'},
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
