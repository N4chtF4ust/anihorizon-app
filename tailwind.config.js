/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {


       colors: {
        brand: {
          dark: '#0B1D51',     // Primary Dark
          primary: '#725CAD',  // Primary
          light: '#8CCDEB',    // Accent / Secondary
          pale: '#FFE3A9',     // Background / Highlight
        }
      }
    },
  },
  plugins: [],
}