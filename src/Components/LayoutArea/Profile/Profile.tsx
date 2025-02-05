import {jwtDecode} from "jwt-decode";
import { useState, useEffect } from "react";
import { Company } from "../../../Models/Company";
import { Customer } from "../../../Models/Customer";
import { jwtUser } from "../../AuthArea/Login/Login";
import "./Profile.css";
import companyService from "../../../services/CompanyService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import customerService from "../../../services/CustomerService";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Coupon } from "../../../Models/Coupon";
import { CouponCard } from "../../CouponsArea/CouponCard/CouponCard";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Card, CardContent, CardMedia, ImageList, ImageListItem, ImageListItemBar, makeStyles, Typography } from "@mui/material";
import Slider from "react-slick";
import authFunctions from "../../AuthArea/AuthFunctions";
import authService from "../../../services/AuthService";

/**
 * Profile Component
 * 
 * - Displays profile details of the currently logged-in user (Company or Customer).
 * - Redirects users based on their role and authentication status.
 * 
 * Key Features:
 * - Handles authentication and redirects unauthenticated users to the login page.
 * - Renders different views for Company and Customer users. Admin users are redirected.
 * 
 * Hooks and Dependencies:
 * - `useState` for managing company and customer data.
 * - `useEffect` for fetching user details and handling role-based navigation.
 * - `jwtDecode` for decoding JWT tokens stored in `localStorage`.
 * - `toast` for displaying error messages.
 * - `useNavigate` for navigation and redirects.
 * - Services (`companyService`, `customerService`, `authService`) for fetching data and managing authentication.
 * - Utility functions (`authFunctions`) for role checking and handling user permissions.
 * 
 * Usage:
 * - Render this component in the routing configuration for the `/profile` path.
 * - Ensure `localStorage` contains the JWT token for fetching user details.
 */


export function Profile(): JSX.Element {
    const [company, setCompany] = useState<Company | null>(null);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const navigate = useNavigate();      
    
    useEffect(() => {
        const fetchUserDetails = async () => {
            try { const decodedToken = jwtDecode<jwtUser>(localStorage.token);
                if(authFunctions.isCompany()){
                    const company = await companyService.getCompanyDetails(decodedToken.id);
                    setCompany(company);
                    localStorage.lUpd = Date.now()
                }else if(authFunctions.isCustomer()){
                    const customer = await customerService.getCustomerDetails();
                    setCustomer(customer);
                    localStorage.lUpd = Date.now()}
            }catch (err) {
                toast.error("Please log in!");
                authService.logout(); 
                navigate("/")
            }};
        fetchUserDetails();
    }, []);

    useEffect(() => {
        if(authFunctions.loggedIn()){
            if (authFunctions.isAdmin())
                navigate(authFunctions.unauthorizedMapper());
        }else
        navigate("/login");
    }, [navigate]);
      
        return (
            <>
                {(!authFunctions.isAdmin()) && (
                            <div className="CompanyProfile" style={{ display: "flex", flexDirection: "column", paddingBottom: "10000px",
                                alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#f5f5f5", padding: "20px",
                                borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"}}>
                            <h2 style={{ fontSize: "2rem", color: "#333", marginBottom: "10px"}}>
                                {company?.name} {customer?.firstName} {customer?.lastName}
                            </h2>
                            <h2 style={{ fontSize: "1.5rem", color: "#555"}}>
                                {company?.email}{customer?.email}
                            </h2>
                            </div>
                )}
            </>
        );
    }
