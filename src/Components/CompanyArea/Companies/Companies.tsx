import { useEffect, useState } from "react";
import "./Companies.css";
import { Company } from "../../../Models/Company";
import adminService from "../../../services/AdminService";
import { useNavigate } from "react-router-dom";
import { Fab, Grid2, useMediaQuery } from "@mui/material";
import { CompanyCard } from "../CompanyCard/CompanyCard";
import AddIcon from '@mui/icons-material/Add';
import { toast } from "react-toastify";
import authFunctions from "../../AuthArea/AuthFunctions";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import authService from "../../../services/AuthService";

/**
 * Companies Component
 *
 * - A React component that displays a list of companies fetched from the backend.
 * - Each company is shown using the `CompanyCard` component.
 * - A floating action button (FAB) is available to navigate to the company addition page.
 * - The component ensures only admin users can access the list of companies and redirects non-admin users.
 *
 * Key Features:
 * - Displays a list of companies fetched from the backend.
 * - Shows a loading message when companies are being fetched.
 * - A floating action button for adding new companies.
 * - Admin-only access with redirection for unauthorized users.
 *
 */


export function Companies(): JSX.Element { 
    const isMobile = useMediaQuery("(max-width: 480px)");
    const [companies, setCompanies] = useState<Company[]>([]);
    const navigate = useNavigate();
    const companiesCache = useSelector((state: RootState) => state.companies.companies);
    const companiesLength = companiesCache.length;
        
    useEffect(()=>{
        adminService.getAllCompanies()
        .then(companies =>{
            setCompanies(companies)
        })
        .catch(err=>{
            toast.error(err.response.data);
            authService.logout();
            navigate("/");
        })
    }, [companiesLength, navigate])
    
        useEffect(() => {
            if(sessionStorage.getItem("loggedIn") === "true"){
                if (!authFunctions.isAdmin())
                    navigate(authFunctions.unauthorizedMapper());
            }else
            navigate("/login");
        }, [navigate]);    

    return (
        <div className="Companies">
         <h2>Companies</h2>
         <Fab
            size={isMobile ? "small" : "large"}
            sx={{   
                position: "fixed",
                top: 95,
                right: 20,
                backgroundColor: "primary.main",
                color: "white",
                "& .MuiSvgIcon-root": { fontSize: isMobile ? "1rem" : "1.5rem" }, // Ensure the icon size is consistent
            }} color="primary" aria-label="add" className="addButton" onClick={()=>navigate("/company/add")}>
                <AddIcon className="addButton"/>
            </Fab>
         <Grid2 container>
            {companies.length===0 ? <p>Please wait...</p> : companies.map((c)=><CompanyCard key={c.id} company={c}/>)}
        </Grid2>   
        </div>
    );
}
