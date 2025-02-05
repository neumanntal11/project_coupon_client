import "./MenuBar.css";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { jwtUser } from "../../AuthArea/Login/Login";
import authService from "../../../services/AuthService";
import { useEffect, useState } from "react";
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Icon } from "@mui/material";
import { Image } from "@mui/icons-material";
import { toast } from "react-toastify";
import authFunctions from "../../AuthArea/AuthFunctions";

/**
 * MenuBar Component
 *
 * - A navigation bar that dynamically adjusts its options based on the user's authentication status and role.
 * - Displays different pages and settings options for Admin, Company, and Customer users.
 * - Features a responsive design that adapts for mobile and desktop views using Material-UI's.
 *
 * Key Features:
 * - Displays navigation items such as "companies," "customers," and "coupons," with dynamic updates based on user roles.
 * - Includes a user settings menu with options like "Profile," "Dashboard," and "Logout."
 * - Includes responsive behavior with a collapsible menu for smaller screens.
 * - Handles user logout and redirects to the login page.
 *
 * State:
 * - `pages` (string[]): An array of pages to display in the navigation menu, depending on the user role.
 * - `settings` (string[]): An array of settings options to display for the logged-in user.
 *
 * Event Handlers:
 * - `handleOpenNavMenu`: Opens the navigation menu for mobile view.
 * - `handleOpenUserMenu`: Opens the user settings menu.
 * - `handleCloseNavMenu`: Closes the navigation menu.
 * - `handleCloseUserMenu`: Closes the user settings menu.
 *
 */


export function MenuBar(): JSX.Element {   
  const [pages , setPages] = useState<string[]>([]);
  const [settings, setSettings] = useState<string[]>([]);

  //Menu setting
  useEffect(()=>{
    if(localStorage.token != null || ""){
      if(authFunctions.isAdmin()){
        setPages(['companies', 'customers']);
      } else if(authFunctions.isCompany()){
        setPages(['our_coupons']);
      }else{
        setPages(['coupons', 'about_us']);
      } 
    }else
      setPages(['signup', 'about_us', "login"]);
  }, [localStorage.token]);

  //setting option
  useEffect(()=>{
    if(localStorage.token != null || ""){
      if(authFunctions.isAdmin()){
        setSettings(['Init','Logout']);
      } else if(authFunctions.isCompany()){
        setSettings(['Profile', 'Logout']);
      }else{
        setSettings(['Profile','Dashboard', 'Logout']);
      } 
    }else
      setSettings([]);
  }, [localStorage.token])
  
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StorefrontIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
          <Typography variant="h6" noWrap component="a" onClick={()=>navigate("/"+ pages[0])}
            sx={{mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700,
            letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none'}}>
            JOHN_COUPON'S
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar"
              aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            
            <Menu id="menu-appbar" anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (                
                <MenuItem key={page} onClick={()=>{
                  navigate(`/${page}`);
                  handleCloseNavMenu();
                  }}>
                  <Typography sx={{textAlign: 'center', textTransform: "capitalize"}}>{page.replace("_", " ")}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <StorefrontIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 4,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            JOHN_COUPON'S
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>navigate(`/${page}`)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.replace("_", " ")}
              </Button>
            ))}
          </Box>
          {localStorage.token && (
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                
                {authFunctions.isAdmin() ?
                    <Avatar alt="Administrator" src="/static/images/avatar/2.jpg" /> :
                authFunctions.isCustomer() ?
                    <Avatar alt= "Customer" src="/static/images/avatar/2.jpg" /> :
                    <Avatar alt="Company" src="/static/images/avatar/2.jpg" />
                  } 
              </IconButton>
              
            </Tooltip>
            <Menu
              disableScrollLock={true}
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (  
                <MenuItem key={setting} onClick={()=>{
                  if(setting === "Logout"){
                      authService.logout().then(()=>{
                        navigate("/login"); // Navigate after logout
                        toast.success("You have successfully logged out!");
                      })
                    navigate("/login")
                    handleCloseUserMenu();
                  }else{
                  navigate(`/${setting}`)
                  handleCloseUserMenu();
                  }
                  }}>
                  <Typography sx={{ textAlign: 'center', textTransform: "uppercase"}}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          )}
          
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  );
}
export default MenuBar;