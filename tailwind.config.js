/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#f3f4fb",
					100: "#e6e9f7",
					200: "#d1d7f0",
					300: "#b2bde6",
					400: "#8e9dd9",
					500: "#556cd6", // MUI primary color
					600: "#4a60c2",
					700: "#3f53b0",
					800: "#364790",
					900: "#2d3c75",
					950: "#1e2749",
				},
				secondary: {
					50: "#f0fdfa",
					100: "#ccfbf1",
					200: "#99f6e4",
					300: "#5eead4",
					400: "#2dd4bf",
					500: "#19857b", // MUI secondary color
					600: "#0d9488",
					700: "#0f766e",
					800: "#115e59",
					900: "#134e4a",
					950: "#042f2e",
				},
				error: {
					50: "#fef2f2",
					100: "#fee2e2",
					200: "#fecaca",
					300: "#fca5a5",
					400: "#ff1744", // MUI red.A400 equivalent
					500: "#ef4444",
					600: "#dc2626",
					700: "#b91c1c",
					800: "#991b1b",
					900: "#7f1d1d",
					950: "#450a0a",
				},
			},
			fontFamily: {
				sans: ["Roboto", "Helvetica", "Arial", "sans-serif"], // Matching MUI font
			},
			spacing: {
				4.5: "1.125rem", // 18px - matching MUI spacing
				18: "4.5rem", // 72px
				0.5: "0.125rem", // 2px
				1.5: "0.375rem", // 6px
				2.5: "0.625rem", // 10px
				3.5: "0.875rem", // 14px
			},
			fontSize: {
				xs: "0.75rem", // 12px - matching MUI typography
				sm: "0.875rem", // 14px
				base: "1rem", // 16px
				lg: "1.125rem", // 18px
				xl: "1.25rem", // 20px
				"2xl": "1.5rem", // 24px
				"3xl": "1.875rem", // 30px
				"4xl": "2.25rem", // 36px
				"5xl": "3rem", // 48px
			},
			breakpoints: {
				xs: "0px",
				sm: "600px", // MUI sm
				md: "900px", // MUI md
				lg: "1200px", // MUI lg
				xl: "1536px", // MUI xl
			},
		},
	},
	plugins: [],
};
