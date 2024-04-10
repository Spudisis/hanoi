export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
