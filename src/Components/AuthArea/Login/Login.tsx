import React, { useEffect, useState } from "react";
import { Button, Card, FormControl, InputLabel, MenuItem, Select, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material";
import { toast } from "react-toastify";
import authService from "../../../services/AuthService";
import "./Login.css";
import { jwtDecode } from "jwt-decode";

/**
 * Login Component
 *
 * - A component that handles user login by collecting email, password, and client type.
 * - It verifies the user's credentials and redirects based on their role (Administrator, Company, or Customer).
 *
 * Features:
 * - Email and password input fields for user login.
 * - A dropdown to select the client type (Administrator, Company, or Customer).
 * - Redirects to different routes based on the user type upon successful login.
 * - Displays error messages using `react-toastify` if the login fails.
 *
 */


// JWT User Type definition
export interface jwtUser {
  email: string;
  type: string;
  id: number;
  iat: number;
  iss: number;
  exp: number;
  name?: string;
  firstName?: string;
  lastName?: string;
}

export function Login(): JSX.Element {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [clientType, setClientType] = useState<string>("");

  // Redirect if the user is already logged in
  useEffect(() => {
    try{
    if (sessionStorage.getItem("loggedIn") === "true") {
      const token = localStorage.token;
      const user = jwtDecode<jwtUser>(token);
      if (user.type === "Administrator") {
        navigate("/companies");
        localStorage.lUpd = Date.now()
      } else if (user.type === "Company") {
        navigate("/our_coupons");
        localStorage.lUpd = Date.now()
      } else {
        navigate("/coupons");
        localStorage.lUpd = Date.now()
      }
    }
  }catch (error){
    authService.logout(); 
    navigate("/login")
  }
  }, [navigate]);

  // Handle email input change
  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value);
  }

  // Handle password input change
  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value);
  }

  // Handle client type selection change
  function handleClientType(event: SelectChangeEvent) {
    setClientType(event.target.value);
  }

  // Submit login form
  function submitLogin(event: React.FormEvent) {
    event.preventDefault();
    authService.login(email, password, clientType)
      .then(res => {
        localStorage.token = res;
        localStorage.lUpd = Date.now()
        sessionStorage.setItem("loggedIn", "true");
        if(jwtDecode<jwtUser>(res).type === "Administrator")
          navigate("/companies");
        else if(jwtDecode<jwtUser>(res).type === "Company")
          navigate("/our_coupons")
        else
        navigate("/coupons");
      })
      .catch(err => {
        const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
      });
  }
return (
    <Box className="Login" sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ width: 400, padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <h2 className="login-title" style={{ textAlign: "center", marginBottom: "20px" }}>Please Log In</h2>
        <form onSubmit={submitLogin}>

          {/* Username Field */}
          <TextField
            label="Email"
            variant="outlined"
            autoComplete="current-Email"
            fullWidth
            required
            onChange={handleEmail}
            sx={{ marginBottom: 2 }}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            autoComplete="current-password"
            fullWidth
            required
            onChange={handlePassword}
            sx={{ marginBottom: 2 }}
          />

          {/* Client Type Selector */}
          <FormControl fullWidth required sx={{ marginBottom: 2 }}>
            <InputLabel id="clientTypeLabel">Client Type</InputLabel>
            <Select
              labelId="clientTypeLabel"
              value={clientType}
              label="Client Type"
              onChange={handleClientType}
            >
              <MenuItem value={"Administrator"}>Administrator</MenuItem>
              <MenuItem value={"Company"}>Company</MenuItem>
              <MenuItem value={"Customer"}>Customer</MenuItem>
            </Select>
          </FormControl>

          {/* Login Button */}
          <Button variant="contained" type="submit" fullWidth>
            Login
          </Button>

        </form>
      </Card>
    </Box>
  );
}
