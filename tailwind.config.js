/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      backgroundColor: {

        'bg-color': 'black',
        'bg-color-light': 'black',
        'blackGray': '#1F2937',

        'gray-light': 'black',
        "gray-dark": "#5F5F5F",
        "bg-left-bar": "#F6F8FD",
        "bg-blue": "#126fd6",
        "bg-purple": "#460073",
        "bg-hover-color": "#EAEAEA",
        "bg-gray-new": "#374151",
        "bg-purple-2": "#a100ff",
        "bg-navy-blue": "#111827",






      },

      textColor: {

        'text-color-blue': '#05294B',
        'text-gray-light': '#D9D9D9',
        'text-gray-nav': 'rgb(160, 160, 159)',
        "text-blue": "#126fd6",
        'text-white': "#ffffff",
        'text-gray-other': "#292929",
        "text-gray-official": "#5D7284",
        "text-black": "#303030",
        "text-brown-new": "#838383",
        "text-hover-color": "#EAEAEA",
        "text-gray-new": "#374151",
        "text-purple": "#460073"





      },
      borderColor: {
        'border-dark-color': "#e6e9ef",
        'border-purple-color': "#460073",

      },


      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'caromant': ['Cormorant Garamond', 'sans-serif'],
        'heebo': ['Heebo', 'sans-serif'],

        'lulo': ['lulo'],
        'proxima': ['proxima'],
      },
      backgroundImage: {
        'card-bg-image': "url('/assets/bg-pricing.svg')",
      }
    },
  },
  plugins: [],
}