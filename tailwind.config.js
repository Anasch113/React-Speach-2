/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      backgroundColor: {
        
        'bg-color' : '#ffffff',
        'bg-color-light': '#FBFBFE',
        'offWhite' : 'hsl(216, 20%, 97%)',
      
        'gray-light': '#D9D9D9',
        "gray-dark": "#5F5F5F",
        "bg-left-bar": "#F6F8FD",
        "bg-blue": "#126fd6",
        "bg-dark-blue" : "#05294B",
        "bg-hover-color": "#EAEAEA"
       

        
        
        
      },

      textColor: {
       
        'text-color-blue': '#05294B',
        'text-gray-light': '#D9D9D9',
        'text-gray-nav': 'rgb(160, 160, 159)',
        "text-blue": "#126fd6",
        'text-white': "#ffffff",
        'text-gray-other': "#292929",
        "text-gray-official" : "#5D7284",
        "text-black": "#303030",
        "text-brown-new": "#838383",
        "text-hover-color": "#EAEAEA"


        
        
        
      },
      borderColor:{
        'border-dark-color': "#e6e9ef",
      },
     

      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'caromant': ['Cormorant Garamond', 'sans-serif'],
        'heebo': ['Heebo', 'sans-serif'],
      
        'lulo': ['lulo'],
        'proxima': ['proxima'],
      },
      backgroundImage:{
        'card-bg-image': "url('/assets/bg-pricing.svg')",
      }
    },
  },
  plugins: [],
}