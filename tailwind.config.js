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
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
