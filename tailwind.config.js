// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }, // slide left by half since we duplicated items
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite", // speed = 20s
      },
    },
  },
  plugins: [],
}
