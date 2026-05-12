/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },

      colors: {
        content: {
          primary: "#e8eaf0",
          secondary: "#8b90a0",
          tertiary: "#555b6e",
          light: "#e8eaf0",
        },
        brand: {
          primary: "#f0a500",
          secondary: "#e8c46a",
        },
        surface: {
          primary: "#13151a",
          secondary: "#1c1f27",
          tertiary: "#252933",
        },
        border: {
          primary: "#2a2e3a",
          secondary: "#353a4a",
        },
        auth: {
          primary: "#0b0c0f",
          app: "#07080a",
        },
        admin: {
          shell: "#06070a",
          canvas: "#080a0f",
          panel: "#0c0e14",
          inset: "#10131c",
          accent: "#06b6d4",
          "accent-hi": "#67e8f9",
          "accent-lo": "#22d3ee",
          primary: "#06b6d4",
          secondary: "#22d3ee",
          tertiary: "#67e8f9",
          success: "#22d3ee",
          warning: "#06b6d4",
          info: "#38bdf8",
          danger: "#fb7185",
        },
      },

      backgroundImage: {
        "admin-radial-accent":
          "radial-gradient(ellipse at top right, rgb(6 182 212 / 0.15), transparent 50%)",
      },

      boxShadow: {
        "admin-accent": "0 0 20px rgb(6 182 212 / 0.1)",
        "admin-accent-lg": "0 0 20px rgb(6 182 212 / 0.12)",
      },

      dropShadow: {
        "admin-chart": "0 0 10px rgb(6 182 212 / 0.45)",
      },

      keyframes: {
        bvMarquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        bvCatFadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bvBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        bvFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        bvPulseSoft: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(0.95)" },
        },
        bvShimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },

      animation: {
        bvMarquee: "bvMarquee 15s linear infinite",
        bvCatFadeUp: "bvCatFadeUp 0.5s ease both",
        bvBlink: "bvBlink 1.4s ease-in-out infinite",
        bvFloat: "bvFloat 3s ease-in-out infinite",
        bvPulseSoft: "bvPulseSoft 2s ease-in-out infinite",
        bvShimmer: "bvShimmer 2s infinite",
        shimmer: "shimmer 3s ease infinite",
      },
    },
  },
  plugins: [],
};