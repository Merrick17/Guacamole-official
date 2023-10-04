/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      fontFamily: {
        body: ["Kanit", "sans-serif"],
        bungee: ["Bungee", "monospace"],
      },
      boxShadow: {
        openMenuShadow: "0px 6px 18px 0px rgba(0, 0, 0, 0.04)",
        themeButtonShadow: "0px 2px 12px 0px var(--accent)",
      },
      backgroundImage: {
        "body-image": "url('/images/body-background.png')",
        "home-bg": "url('/images/home/GUAC_Home_BG.png')",
        "trade-bg": "url('/images/trade/Guac_Trading_BG.png')",
        "earn-bg": "url('/images/earn/Guac_Earn_BG.png')",
        "play-bg": "url('/images/play/Guac_Play_BG.png')",
        "tools-bg": "url('/images/tools/Guac_Tools_BG.png')",
        "launch-bg": "url('/images/launch/Guac_Launch_BG.png')",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "scroll-left": {
          from: {
            transform: "translateX(100%)",
          },
          to: {
            transform: "translateX(-100%)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scroll-left": "scroll-left 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
