import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        md: ["16px", "18px"],
      },
      fontFamily: {
        FK: ['"FK Grotesk Neue Trial"', "Helvetica", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        fira: ['"Fira Mono"', "monospace"],
        nunito: ["Nunito", "sans-serif"],
        poly: ["Poly", "serif"],
        poetsen: ["Poetsen One", "sans-serif"],
        "public-sans": ["Public Sans", 'serif'],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "morrie-background": "#F1EFE9",
        "morrie-primary": "#3C7167",
        "morrie-text": "#8C8C8C",
        secondary: "#7F7F7F",
        "neutral-10": "var(--neutral-10)",
        "neutral-100": "var(--neutral-100)",
        "neutral-20": "var(--neutral-20)",
        "neutral-40": "var(--neutral-40)",
        "neutral-60": "var(--neutral-60)",
        "neutral-80": "var(--neutral-80)",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
