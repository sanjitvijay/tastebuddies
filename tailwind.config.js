/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#FB3640",
                  
        "secondary": "#0A2463",
                  
        "accent": "#247BA0",
                  
        "neutral": "#000000",
                  
        "base-100": "#E2E2E2",
      }
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography')],
  daisyui: {
    themes: ["light", "dark", 
    {
      mytheme: {
        "primary": "#FB3640",
          
 "secondary": "#0A2463",
          
 "accent": "#247BA0",
          
 "neutral": "#000000",
          
 "base-100": "#E2E2E2",
          
 "info": "#00aeff",
          
 "success": "#44f600",
          
 "warning": "#efc100",
          
 "error": "#ff6c6c",
      }
    }]
  }
}

