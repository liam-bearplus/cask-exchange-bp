import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        fontSize: {
            xs: ["0.75rem", { lineHeight: "1.5" }], // 12px
            sm: ["0.875rem", { lineHeight: "1.4285" }], // 14px
            base: ["1rem", { lineHeight: "1.5" }], // 16px
            lg: ["1.125rem", { lineHeight: "1.55" }], // 18px
            xl: ["1.25rem", { lineHeight: "1.5" }], // 20px
            "2xl": ["1.5rem", { lineHeight: "1.333" }], // 24px
            "3xl": ["1.875rem", { lineHeight: "1.266" }], // 30px
            "4xl": ["2.25rem", { lineHeight: "1.22" }], // 36px
            "5xl": ["3rem", { lineHeight: "1.25" }], // 48px
            "6xl": ["3.75rem", { lineHeight: "1.2" }], // 60px
            "7xl": ["4.5rem", { lineHeight: "1.055" }], // 72px
        },

        colors: {
            transparent: "transparent",
            current: "currentColor",
            typo: {
                brand: "hsl(var(--brand))",
                disable: "hsl(var(--dark-400))",
                primary: "hsl(var(--dark-900))",
                body: "hsl(var(--dark-800))",
                sub: "hsl(var(--dark-600))",
                dark: {
                    brand: "hsl(var(--brand))",
                    disable: "hsl(var(--white-600))",
                    primary: "hsl(var(--white-900))",
                    body: "hsl(var(--white-800))",
                    sub: "hsl(var(--white-700))",
                },
            },
            bd: {
                disable: "hsl(var(--dark-200))",
                main: "hsl(var(--dark-300))",
                sf1: "hsl(var(--dark-300))",
                sf2: "hsl(var(--dark-400))",
                sf3: "hsl(var(--dark-500))",
                dark: {
                    disable: "hsl(var(--white-200))",
                    main: "hsl(var(--white-300))",
                    sf1: "hsl(var(--white-300))",
                    sf2: "hsl(var(--white-400))",
                    sf3: "hsl(var(--white-500))",
                },
            },
            bg: {
                main: "hsl(var(--white-900))",
                disable: "hsl(var(--dark-100))",
                sf1: "hsl(var(--dark-100))",
                sf2: "hsl(var(--dark-200))",
                sf3: "hsl(var(--dark-300))",
                dark: {
                    main: "hsl(var(--black))",
                    disable: "hsl(var(--white-100))",
                    sf1: "hsl(var(--white-100))",
                    sf2: "hsl(var(--white-200))",
                    sf3: "hsl(var(--white-300))",
                },
                darker: "hsl(var(--black-darker))",
            },
            white: {
                main: "hsl(var(--white))",
                100: "hsl(var(--white-100))",
                200: "hsl(var(--white-200))",
                300: "hsl(var(--white-300))",
                400: "hsl(var(--white-400))",
                500: "hsl(var(--white-500))",
                600: "hsl(var(--white-600))",
                700: "hsl(var(--white-700))",
                800: "hsl(var(--white-800))",
                900: "hsl(var(--white-900))",
            },
            dark: {
                100: "hsl(var(--dark-100))",
                200: "hsl(var(--dark-200))",
                300: "hsl(var(--dark-300))",
                400: "hsl(var(--dark-400))",
                500: "hsl(var(--dark-500))",
                600: "hsl(var(--dark-600))",
                700: "hsl(var(--dark-700))",
                800: "hsl(var(--dark-800))",
                900: "hsl(var(--dark-900))",
            },
            black: {
                DEFAULT: "hsl(var(--black))",
            },
            brand: {
                DEFAULT: "hsl(var(--brand))",
                darker: "hsl(var(--brand-darker))",
                darkest: "hsl(var(--brand-darkest))",
                lighter: "hsl(var(--brand-lighter))",
                lightest: "hsl(var(--brand-lightest))",
            },
            info: "hsl(var(--info))",
            error: {
                DEFAULT: "hsl(var(--error))",
                darker: "hsl(var(--error-darker))",
                darkest: "hsl(var(--error-darkest))",
                lighter: "hsl(var(--error-lighter))",
            },
            warn: {
                DEFAULT: "hsl(var(--warn))",
                darker: "hsl(var(--warn-darker))",
                darkest: "hsl(var(--warn-darkest))",
                lighter: "hsl(var(--warn-lighter))",
            },
            success: {
                DEFAULT: "hsl(var(--success))",
                darker: "hsl(var(--success-darker))",
                darkest: "hsl(var(--success-darkest))",
                lighter: "hsl(var(--success-lighter))",
            },
        },
        transitionDuration: {
            DEFAULT: "250ms",
        },
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
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
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
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
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            animation: {
                "spin-slow": "spin 3s linear infinite",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
