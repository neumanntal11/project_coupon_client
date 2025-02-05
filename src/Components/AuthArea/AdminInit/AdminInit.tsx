import { Button, Checkbox, Typography, Box, Grid, useMediaQuery } from "@mui/material";
import "./AdminInit.css";
import adminService from "../../../services/AdminService";
import { toast } from "react-toastify";
import { useEffect } from "react";
import authFunctions from "../AuthFunctions";
import { useNavigate } from "react-router-dom";

/**
 * AdminInit Component
 *
 * - A component that allows an admin user to initialize various parts of the system.
 * - It provides checkboxes to toggle the initialization of Categories, Companies, Customers, and Coupons.
 * - Upon clicking the "Initialize" button, it sends the selected initialization parameters to the backend.
 * - Only accessible by an admin user, otherwise redirects to login or unauthorized access page.
 *
 * Features:
 * - Checkbox selections to toggle which areas of the system to initialize.
 * - Button to trigger initialization based on selected options.
 * - Redirection to login or unauthorized access page if the user is not logged in or is not an admin.
 * - Success and error notifications using `react-toastify`.
 *
 */


export function AdminInit(): JSX.Element {
    const isMobile = useMediaQuery("(max-width: 480px)");
    const navigate = useNavigate();
    let categories: boolean = true;
    let companies: boolean = true;
    let customers: boolean = true;
    let coupons: boolean = true;

        useEffect(() => {
            if(sessionStorage.getItem("loggedIn") === "true"){
                if (!authFunctions.isAdmin())
                    navigate(authFunctions.unauthorizedMapper());
            }else
            navigate("/login");
        }, [navigate]);    
        
    return (
        <Box
            className="AdminInit"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <Typography variant="h4" sx={{ marginBottom: "2%", fontSize: isMobile ? "28px" : "40px" }}>
                Admin Initialization
            </Typography>
            <Grid
                container
                sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "300px",
                marginBottom: "10px",
                marginTop: "10px",
                justifyContent: "center",
                }}
            >
                <Grid item xs={6}>
                    <Typography component="div" sx={{ display: "flex", alignItems: "center"}}>
                        Categories
                        <Checkbox defaultChecked
                            onChange={() => (categories = !categories)}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography component="div" sx={{ display: "flex", alignItems: "center" }}>
                        Companies
                        <Checkbox defaultChecked
                            onChange={() => (companies = !companies)
                            }
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </Typography>
                </Grid>
                <Grid  item xs={6}>
                    <Typography component="div" sx={{ display: "flex", alignItems: "center" }}>
                        Customers
                        <Checkbox defaultChecked
                            onChange={() => (customers = !customers)}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography component="div" sx={{ display: "flex", alignItems: "center" }}>
                        Coupons
                        <Checkbox defaultChecked
                            onChange={() => (coupons = !coupons)}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </Typography>
                </Grid>
            </Grid>
            <Button
                onClick={()=>adminService.initialize(categories,companies,customers,coupons).then(res=>toast.success(res)).catch(err=>toast.error("Something went wrong!"))}
                variant="contained"
                color="primary"
                sx={{ width: "200px", height: "50px" }}
            >
                Initialize
            </Button>
            <br/>
            <br/>
        </Box>
    );
}
