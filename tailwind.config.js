const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: colors.cyan,
      secondary: colors.emerald,
      gray: colors.gray,
      white: colors.white,
      transparent: "transparent",
      current: "currentColor",
      smoke: "#3a3a3c",
    },
    extend: {
      keyframes: {
        bang: {
          "0%, 100%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.07)" },
        },
        shake: {
          "0%, 50%": { transform: "translateX(-4px)" },
          "30%, 70%": { transform: "translateX(4px)" },
          "100%": { transform: "translateX(0px)" },
        },
        "bg-fade-in": {
          "0%": { background: "#ffffff00" },
          "100%": { background: "#ffffff05" },
        },
        "slide-up": {
          "0%": {
            opacity: 0,
            transform: " translateY(40px)",
          },
          "100%": {
            opacity: 1,
            transform: " translateY(0px)",
          },
        },
      },
      animation: {
        bang: "bang 0.25s",
        shake: "shake 0.25s;",
        bgFadeIn: "bg-fade-in 0.35s ease-in-out",
        slideUp: "slide-up 0.45s ease-in-out",
      },
    },
  },
  plugins: [],
};
