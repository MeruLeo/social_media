import { nextui } from "@nextui-org/theme";
const flattenColors = (colors, prefix = "") => {
    const result = {};
    for (const key in colors) {
        if (typeof colors[key] === "string") {
            result[prefix + key] = colors[key];
        } else {
            Object.assign(
                result,
                flattenColors(colors[key], `${prefix}${key}-`),
            );
        }
    }
    return result;
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sfLight: ["var(--font-sf-light)"],
                sfMedium: ["var(--font-sf-medium)"],
                sfBlack: ["var(--font-sf-black)"],
            },
            colors: {
                primary: {
                    "rich-black": "#002F15",
                    "dark-green": "#022221",
                    "bangladesh-green": "#00624C",
                    "mountain-meadow": "#2CC295",
                    "caribbean-green": "#00FF81",
                    "anti-flash-white": "#F1FFF5",
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    pine: "#003B28",
                    basil: "#084532",
                    forest: "#095544",
                    frog: "#178D69",
                    mint: "#24B68C",
                    stone: "#707D7B",
                    pistachio: "#ACE6C4",
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
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
                    1: "hsl(var(--chart-1))",
                    2: "hsl(var(--chart-2))",
                    3: "hsl(var(--chart-3))",
                    4: "hsl(var(--chart-4))",
                    5: "hsl(var(--chart-5))",
                },
            },
            backgroundImage: {
                "gradient-black-meadow":
                    "linear-gradient(90deg, #002F15, #2CC295)",
                "gradient-dark-caribbean":
                    "linear-gradient(135deg, #022221, #00FF81)",
                "gradient-bangladesh-white":
                    "linear-gradient(180deg, #00624C, #F1FFF5)",
                "gradient-pine-basil":
                    "linear-gradient(45deg, #003B28, #084532)",
                "gradient-forest-frog":
                    "linear-gradient(120deg, #095544, #178D69)",
                "gradient-mint-pistachio":
                    "linear-gradient(90deg, #24B68C, #ACE6C4)",
                "gradient-stone-white":
                    "linear-gradient(180deg, #707D7B, #F1FFF5)",
                "gradient-black-caribbean-white":
                    "linear-gradient(90deg, #002F15, #00FF81, #F1FFF5)",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            boxShadow: {
                input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
            },
        },
    },
    darkMode: ["class", "class"],
    plugins: [nextui(), require("tailwindcss-animate"), addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
    const allColors = flattenColors(theme("colors"));
    const newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
    );

    addBase({
        ":root": newVars,
    });
}
