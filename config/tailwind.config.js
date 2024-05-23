/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jti',
  content: ['./**/*.{html,md}'],
  theme: {
    extend: {
      colors: {
        'daisy-bush': {
          DEFAULT: '#451ea1',
          50: '#f4f3ff',
          100: '#ebe9fe',
          200: '#d9d6fe',
          300: '#bdb4fe',
          400: '#9c8afb',
          500: '#7b5bf7',
          600: '#6b38ef',
          700: '#5c26db',
          800: '#4d20b7',
          900: '#451ea1',
          950: '#260f66',
        },
      },
      fontFamily: {
        poppins: [
          'Poppins',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
