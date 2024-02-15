import { createTheme } from "@mui/material/styles";

export default createTheme({
	typography: {
		useNextVariants: true,
	},
	palette: {
		common: { black: "#000", white: "#fff" },
		background: { paper: "#fff", default: "rgba(148, 179, 121, 0.86)" },
		primary: {
			light: "rgba(103, 214, 105, 1)",
			main: "rgba(0, 126, 5, 1)",
			dark: "rgba(0, 76, 2, 1)",
			contrastText: "rgba(255, 255, 255, 1)",
		},
		secondary: {
			light: "rgba(255, 252, 131, 1)",
			main: "rgba(251, 239, 0, 1)",
			dark: "rgba(191, 187, 50, 1)",
			contrastText: "rgba(138, 6, 6, 1)",
		},
		error: {
			light: "#e57373",
			main: "rgba(250, 0, 0, 1)",
			dark: "#d32f2f",
			contrastText: "#fff",
		},
		text: {
			primary: "rgba(0, 0, 0, 0.87)",
			secondary: "rgba(95, 93, 207, 1)",
			disabled: "rgba(169, 160, 180, 0.77)",
			hint: "rgba(0, 77, 211, 0.51)",
		},
	},
});
