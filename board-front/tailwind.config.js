/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {},
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '50%': '50%',
      '100%': '100%',
      '16': '4rem',
    },
    backgroundImage: {
      'eye-off-icon': "url(assets/image/eye-off.png)",
      'eye-on-icon': "url(assets/image/eye-on.png)",
      'logo-color-icon': "url(assets/image/logo-color.png)",
      'github-icon': "url(assets/image/github.png)"
    },
    lineHeight: {
      '140%': '140%',
    },
    borderRadius: {
      '50%': '50%',
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
    }
  },
  plugins: [],
}

