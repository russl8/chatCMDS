/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background':'#232946',
        'highlight':'#eebbc3',
        'darkText':'#232946',
        'secondaryText':"#b8c1ec",
        'outline':"#121629",
        'mainText':"#fffffe",
        'backgroundLight':"#343d68",
        'backgroundMedium':"#282f51",
        'main':'#b8c1ec'
      }
    },
  },
  plugins: [],
}