const config = {
  theme: {
    extend: {
      keyframes: {
        rotateOrbital: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(60deg)" },
        },
        botAnimate: {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "100%": { transform: "scale(1.1) rotate(-5deg)" },
        },
      },
      animation: {
        "rotate-orbital-100s": "100s linear infinite rotateOrbital",
        "bot-animate-3s": "3s ease-in-out infinite alternate botAnimate",
      },
    },
  },
  plugins: [],
};

export default config;
