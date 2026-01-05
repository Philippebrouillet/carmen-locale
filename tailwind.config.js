import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: ["dark", "pink", "blue", "#00D4AA", "#0073FF", "bg-[#C7E0FF]", "#C7E0FF"],
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
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        "dynamic-green": {
          DEFAULT: "hsl(var(--dynamic-green) / <alpha-value>)",
          foreground: "hsl(var(--dynamic-green-foreground) / <alpha-value>)",
        },
        pink: {
          DEFAULT: "hsl(var(--pink) / <alpha-value>)",
          foreground: "hsl(var(--pink-foreground) / <alpha-value>)",
        },
        "pale-pink": {
          DEFAULT: "hsl(var(--pale-pink) / <alpha-value>)",
          foreground: "hsl(var(--pale-pink-foreground) / <alpha-value>)",
        },
        "pale-blue": {
          DEFAULT: "hsl(var(--pale-blue) / <alpha-value>)",
          foreground: "hsl(var(--pale-blue-foreground) / <alpha-value>)",
        },
        blue: {
          DEFAULT: "hsl(var(--blue) / <alpha-value>)",
          foreground: "hsl(var(--blue-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        inter: ["Inter"],
      },
    },
  },
};

export default config;
