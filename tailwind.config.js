/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },



      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },



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
  plugins: [require("tailwindcss-animate")],
}