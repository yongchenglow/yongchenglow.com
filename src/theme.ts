import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { primaryFont } from "./font";

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: "#556cd6",
		},
		secondary: {
			main: "#19857b",
		},
		error: {
			main: red.A400,
		},
	},
	typography: {
		fontFamily: primaryFont.style.fontFamily,
	},
});

export default theme;
