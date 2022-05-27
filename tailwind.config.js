const { borderRadius } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        loading: 'loading 1s linear infinite',
      },
      keyframes: {
        loading: {
          '50%': { transform: 'scale(0.7)' },
        },
      },
    },
  },
  darkMode: 'class',
  /**
   * media : 브라우저의 다크모드 설정에 따름 & 다크모드 media 쿼리 사용
   * class : js나 react 설정에 따름 & 부모요소의 클래스명에 "dark"를 찾음
   */
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-animation-delay'),
  ],
};
