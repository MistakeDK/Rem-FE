/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom': 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
      },
      backgroundColor: {
        'header': '#F7F9F2',
        'outlet-admin': "#F5F7F8"
      }
    },
  },
  plugins: [],
}

