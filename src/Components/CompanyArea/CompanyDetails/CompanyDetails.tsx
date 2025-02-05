import { useEffect, useState } from "react";
import "./CompanyDetails.css";
import { Company } from "../../../Models/Company";
import { useNavigate, useParams } from "react-router-dom";
import adminService from "../../../services/AdminService";
import { toast } from "react-toastify";
import authFunctions from "../../AuthArea/AuthFunctions";
import authService from "../../../services/AuthService";

/**
 * CompanyDetails Component
 *
 * - A React component that fetches and displays the details of a specific company based on the company ID.
 * - It retrieves the company data from the API and displays the company's name and email.
 * - If the company data is still loading, it shows a loading message.
 * - The component ensures that only authorized users (non-companies) can view the details. If an unauthorized user tries to access, they are redirected.
 * 
 * Key Features:
 * - Fetches the company's details using the company ID from the URL.
 * - Displays the company's name and email.
 * - Handles loading states and shows a loading message until the company data is fetched.
 * - Redirects users who are not authorized to view the page.
 */


export function CompanyDetails(): JSX.Element {
    const navigate = useNavigate();
    const [company, setCompany] = useState<Company>();
    const params = useParams();
    const companyId = +params.companyId!;

    useEffect(()=>{
        adminService.getOneCompany(companyId)
        .then(c=>{
            setCompany(c)
        })
        .catch(err => {
            toast.error(err.response.data);
            authService.logout(); 
            navigate("/")
        })
    }, [])
        
        useEffect(() => {
            if(sessionStorage.getItem("loggedIn") === "true"){
                if (authFunctions.isCompany())
                    navigate(authFunctions.unauthorizedMapper());
            }else
            navigate("/login");
        }, [navigate]);    
    
    return (
        <div className="CompanyDetails">
		{!company && <span>Please wait...</span>}
        <h2>{company?.name}</h2>
        <h3>{company?.email}</h3>
        </div>
    );
}
