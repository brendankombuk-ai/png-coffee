/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ember: {
          50: "#fff1ed",
          100: "#ffe1d6",
          200: "#ffbfab",
          300: "#ff9270",
          400: "#fc5f3c",
          500: "#e8341c", // primary PNG Coffee red
          600: "#c11f13",
          700: "#9c1712",
          800: "#7a1512",
          900: "#4a0d0c",
          950: "#1f0605",
        },
        void: {
          900: "#050303",
          950: "#020101",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "nebula-red": "url('/backgrounds/nebula-red.jpg')",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1) translate3d(0, 0, 0)" },
          "50%": { transform: "scale(1.09) translate3d(-1.4%, -1%, 0)" },
          "100%": { transform: "scale(1.14) translate3d(1%, 0.6%, 0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        "slow-zoom": "slow-zoom 24s ease-in-out infinite alternate",
        twinkle: "twinkle 3s ease-in-out infinite",
        "ken-burns": "ken-burns 32s ease-in-out infinite alternate",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};
