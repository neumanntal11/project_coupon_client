import { useEffect, useState } from "react";
import "./CustomerDetails.css";
import { Customer } from "../../../Models/Customer";
import { useNavigate, useParams } from "react-router-dom";
import adminService from "../../../services/AdminService";
import { toast } from "react-toastify";
import authFunctions from "../../AuthArea/AuthFunctions";
import authService from "../../../services/AuthService";

/**
 * CustomerDetails Component
 *
 * - Displays detailed information about a specific customer.
 * - Fetches customer data from the server based on the customer ID obtained from the URL parameters.
 * - Handles authentication and authorization to restrict access to the component.
 * - Shows a loading message ("Please wait...") while customer data is being fetched.
 *
 * Key Features:
 * - Displays customer's details.
 * - Implements error handling for API failures and unauthorized access.
 * - Redirects to the login page if the user is not authenticated or authorized.
 *
 * Props:
 * None
 */


export function CustomerDetails(): JSX.Element {

    const [customer, setCustomer] = useState<Customer>();
    const params = useParams();
    const customerId = +params.customerId!;
    const navigate = useNavigate();

    useEffect(()=>{
        adminService.getOneCustomer(customerId)
        .then(c=>{
            setCustomer(c)
        })
        .catch(err => {
            toast.error(err.response.data); 
            authService.logout();
            navigate("/")
        })
    }, [])
        
        useEffect(() => {
            if(sessionStorage.getItem("loggedIn") === "true"){
                if (!authFunctions.isAdmin())
                    navigate(authFunctions.unauthorizedMapper());
            }else
            navigate("/login");
        }, []);

    return (
        <div className="CustomerDetails">
		{!customer && <span>Please wait...</span>}
        <h2>{customer?.firstName} {customer?.lastName}</h2>
        <h3>{customer?.email}</h3>
        </div>    
    );
}
