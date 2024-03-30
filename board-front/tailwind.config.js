/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {},
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '100%': '100% 100%',
      '16': '4rem',
    },
    backgroundImage: {
      'eye-off-icon': "url(assets/image/eye-off.png)",
      'eye-on-icon': "url(assets/image/eye-on.png)",
      'logo-color-icon': "url(assets/image/logo-color.png)",
      'github-icon': "url(assets/image/github.png)",
      'search-icon': "url(assets/image/search.png)",
      'expand-right-icon': "url(assets/image/right-icon.png)",
      'left-icon': "url(assets/image/back-icon.png)",
      'right-icon': "url(assets/image/next-icon.png)"
    },
    lineHeight: {
      '140%': '140%',
    },
    borderRadius: {
      '50%': '50% 50%',
      '20': '20px'
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '14': '14px'
    },
    backgroundPosition: {
      bottom: 'bottom',
      'bottom-4': 'center bottom 1rem',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
      'top-4': 'center top 1rem',
      '50%': '50% 50%'
    },
  },
  plugins: [],
}

