export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        error_shade: {
          '0%': { backgroundColor: 'rgba(183,6,6, 1)' },
          '100%': { backgroundColor: 'rgba(183,6,6, 0)' }
        }
      },
      animation: {
        'error-pulse': 'error_shade 1s; '
      },
      boxShadow: {
        brick: 'inset 0 2px 3px 0 rgba(255,255,255,0.8)'
      },
      maxWidth: {
        container: '1200px'
      },
      width: {
        container: '1200px'
      }
    }
  },
  plugins: []
}
