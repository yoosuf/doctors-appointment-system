module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './widget/**/*.{js,ts,jsx,tsx}',
  ],
  // darkMode: false, // or 'media' or 'class'
  darkMode: 'class', // or 'media' based on your preference
  theme: {
    extend: {
      colors: {
        grayMid: '#27272A',
        grayLight: '#3F3F46',
        primary: '#18181B',
        yellowBg: '#FBD63c',
        greenBg: '#22C55E',
        blueBg: '#3CBDEE',
        darkYellow: '#FACC15',
        redAlert: '#EF4444',
        whiteMid: '#6b7280',
        darkGreen: '#15803D',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
