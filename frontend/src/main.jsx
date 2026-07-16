import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";

const config = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

const theme = extendTheme({
	config,
	fonts: {
		heading: "'Space Grotesk', sans-serif",
		body: "'Inter', sans-serif",
		mono: "'IBM Plex Mono', monospace",
	},
	colors: {
		ink: {
			50: "#F5F6F8",
			100: "#E7E9ED",
			300: "#9AA1AC",
			500: "#5B616D",
			700: "#2B2F38",
			900: "#101423",
		},
		paper: {
			50: "#FDFCFA",
			100: "#FAF8F3",
			200: "#F2EFE7",
		},
		signal: {
			50: "#EAF0FF",
			100: "#CBD8FF",
			300: "#7F98FF",
			500: "#2454FF",
			600: "#1B41D6",
			700: "#1533A8",
		},
		tag: {
			50: "#FDF3E3",
			300: "#F0C27F",
			500: "#E8A33D",
			600: "#C7822A",
		},
	},
	styles: {
		global: (props) => ({
			body: {
				bg: props.colorMode === "light" ? "paper.100" : "ink.900",
				color: props.colorMode === "light" ? "ink.900" : "paper.100",
			},
		}),
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>
);