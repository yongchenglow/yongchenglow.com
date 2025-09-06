import { primaryFont } from "./font";

// Design tokens for Tailwind CSS integration
export const designTokens = {
	colors: {
		primary: {
			50: "#f3f4fb",
			100: "#e6e9f7",
			200: "#d1d7f0",
			300: "#b2bde6",
			400: "#8e9dd9",
			500: "#556cd6", // Main primary color
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
			500: "#19857b", // Main secondary color
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
	typography: {
		fontFamily: primaryFont.style.fontFamily,
	},
	spacing: {
		xs: "0.125rem", // 2px
		sm: "0.375rem", // 6px
		md: "0.625rem", // 10px
		lg: "0.875rem", // 14px
		xl: "1.125rem", // 18px
		"2xl": "4.5rem", // 72px
	},
	breakpoints: {
		xs: "0px",
		sm: "600px",
		md: "900px",
		lg: "1200px",
		xl: "1536px",
	},
};

// Legacy exports for backward compatibility during migration
export const theme = {
	palette: {
		primary: {
			main: designTokens.colors.primary[500],
		},
		secondary: {
			main: designTokens.colors.secondary[500],
		},
		error: {
			main: designTokens.colors.error[400],
		},
	},
	typography: {
		fontFamily: designTokens.typography.fontFamily,
		h6: {
			fontSize: "0.875rem",
		},
		caption: {
			fontSize: "0.75rem",
		},
	},
	spacing: (value: number) => `${value * 8}px`,
};

export default theme;
