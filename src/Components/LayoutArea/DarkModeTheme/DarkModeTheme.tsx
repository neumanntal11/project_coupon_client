import { createTheme, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";

/**
 * useDarkModeTheme Hook
 *
 * - A custom React hook that provides the functionality to toggle between dark and light themes. It also respects the user's system preference for dark mode on initial load.
 * - The hook uses Material UI's `createTheme` to generate the theme configuration and `useState` to manage the dark mode state.
 *
 * Key Features:
 * - Detects the user's system preference for dark mode and initializes the theme accordingly.
 * - Provides a `toggleDarkMode` function to manually toggle between dark and light themes.
 * - Generates a theme configuration based on the current dark mode state using Material UI's `createTheme` function.
 */


export function useDarkModeTheme() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDarkMode);
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      ...(darkMode && {
        text: {
          primary: "#ffffff", // Set text color to white in dark mode
          secondary: "#cccccc", // Optional for secondary text
        },
      }),
    },
    typography: {
      fontFamily: "'Ubuntu', 'Arial', sans-serif", // Add your Google Font here
      allVariants: {
        color: darkMode ? "#ffffff" : "#000000", // Ensure all typography variants follow the color
      },
    },
  });

  return { theme, darkMode, toggleDarkMode };
}
