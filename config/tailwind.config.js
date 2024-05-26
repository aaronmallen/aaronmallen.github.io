/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jti',
  content: [
    './_drafts/**/*.{html,md}',
    './_includes/**/*.{html,md}',
    './_layouts/**/*.{html,md}',
    './_posts/*.{html,md}',
    './assets/**/*',
    './**/*.{html,md}',
    '!./node_modules/**',
  ],
  safelist: ['fill-white'],
  theme: {
    extend: {
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
        'fira-code': [
          'Fira Code',
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
