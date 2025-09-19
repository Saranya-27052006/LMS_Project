/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       colors: {
      primary: "#6366F1",   // Indigo 500 (softer for dark mode)
      secondary: "#EC4899", // Pink 500
      background: "#111827", // Dark background (Gray 900)
      light: "#1F2937",   // Slightly lighter (Gray 800)
      text: {
        primary: "#F9FAFB", // White-ish (Gray 50)
        secondary: "#D1D5DB", // Gray 300
      },
    }
    },
  },
  plugins: [],
}
