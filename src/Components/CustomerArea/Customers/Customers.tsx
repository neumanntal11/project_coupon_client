import { useNavigate } from "react-router-dom";
import "./Customers.css";
import { useEffect, useState } from "react";
import { Customer } from "../../../Models/Customer";
import adminService from "../../../services/AdminService";
import { Fab, Grid2,useMediaQuery } from "@mui/material";
import { CustomerCard } from "../CustomerCard/CustomerCard";
import AddIcon from '@mui/icons-material/Add';
import { toast } from "react-toastify";
import authFunctions from "../../AuthArea/AuthFunctions";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import authService from "../../../services/AuthService";

/**
 * Customers Component
 *
 * - A React component for displaying a list of customers.
 * - Fetches customer data from the server and displays it in a grid of `CustomerCard` components.
 * - Includes functionality to add a new customer through a floating action button.
 * - Handles authentication and authorization to restrict access.
 *
 * Key Features:
 * - Displays a loading message ("Please wait...") while customer data is being fetched.
 * - Shows customer details in a responsive grid layout.
 * - Allows navigation to the "Add Customer" page using a floating action button.
 * - Implements error handling for API failures and unauthorized access.
 */


export function Customers(): JSX.Element {
    const isMobile = useMediaQuery("(max-width: 480px)");
    const [customers, setCustomers] = useState<Customer[]>([]);
    const navigate = useNavigate();
    const customersCache = useSelector((state: RootState) => state.customers.customers);
    const customersLength = customersCache.length;

    useEffect(()=>{
        adminService.getAllCustomers()
        .then(customers =>{
            setCustomers(customers)
        })
        .catch(err=>{
            toast.error(err.response.data)
            authService.logout();
            navigate("/");
            })
    }, [customersLength, navigate])

        useEffect(() => {
            if(sessionStorage.getItem("loggedIn") === "true"){
                if (!authFunctions.isAdmin())
                    navigate(authFunctions.unauthorizedMapper());
            }else
            navigate("/");
        }, [navigate]);

    return (
        <div className="Customers">
			<h2>Customers</h2>
            <Fab
            size={isMobile ? "small" : "large"}
            sx={{
                position: "fixed",
                top: 95,
                right: 20,
                backgroundColor: "primary.main",
                color: "white",
                "& .MuiSvgIcon-root": { fontSize: isMobile ? "1rem" : "1.5rem" }, // Ensure the icon size is consistent
            }} aria-label="add" className="addButton" onClick={()=>navigate("/customer/add")}>
                <AddIcon className="addButton"/>
            </Fab>
            <Grid2 container>
            {customers.length===0 ? <p>Please wait...</p> : customers.map(c=><CustomerCard key={c.id} customer= {c}/>)}
        </Grid2>   
        </div>
    );
}
