/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Quét các file trong thư mục app/
    './pages/**/*.{js,ts,jsx,tsx}', // Nếu có dùng Pages Router
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};