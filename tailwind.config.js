module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  /**
   * media : 브라우저의 다크모드 설정에 따름 & 다크모드 media 쿼리 사용
   * class : js나 react 설정에 따름 & 부모요소의 클래스명에 "dark"를 찾음
   */
  plugins: [],
};
