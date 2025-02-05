import { BrowserRouter, NavLink, useNavigate } from "react-router-dom";
import "./Layout.css";
import { Routing } from "../Routing/Routing";
import { MenuBar } from "../MenuBar/MenuBar";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { jwtUser } from "../../AuthArea/Login/Login";
import authService from "../../../services/AuthService";
import { useDarkModeTheme} from "../DarkModeTheme/DarkModeTheme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Box, Button } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import LightModeIcon from '@mui/icons-material/LightMode';

/**
 * Layout Component
 *
 * - The Layout component provides the overall structure for the application, including routing, the navigation bar, dark mode functionality, and global toast notifications.
 * - It uses `BrowserRouter` for client-side routing and includes the `MenuBar` for navigation and `Routing` for managing routes.
 * - A dark mode toggle button is available globally to switch between dark and light themes.
 *
 * State:
 * - `theme`: The current theme (light or dark) applied to the application.
 * - `darkMode`: A boolean indicating whether dark mode is enabled or not.
 * - `toggleDarkMode`: A function that toggles between dark and light modes.
 *
 * Event Handlers:
 * - `toggleDarkMode`: Toggles between dark and light modes when the button is clicked.
 */


export function Layout(): JSX.Element {
    const { theme, darkMode, toggleDarkMode } = useDarkModeTheme();
    
    useEffect(() => {
      if (darkMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    }, [darkMode]);

    return (
        <div className="Layout">
		<BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {/* Global Button for Dark Mode */}
        <Box sx={{ position: "fixed", bottom: 15, right: 15, zIndex: 2000 }}>
          <Button
            onClick={toggleDarkMode}
            sx={{
              minWidth: "40px",
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              padding: "0",
              color: darkMode ? "black" : "white",
              backgroundColor: darkMode ? "white" : "black",
              border: "none",
            }}
          >
            {darkMode ? <LightModeIcon /> : <NightlightRoundIcon />}
          </Button>
        </Box>
            <MenuBar />
            <Routing />
            <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}
                            pauseOnFocusLoss draggable pauseOnHover theme="light" transition={Bounce}/>
            </div>
            </ThemeProvider>
            </BrowserRouter>	
        </div>
    );
}
