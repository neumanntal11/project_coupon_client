import "./CompanyCoupons.css";
import { useEffect, useState } from "react";
import { Coupon } from "../../../Models/Coupon";
import { useNavigate } from "react-router-dom";
import companyService from "../../../services/CompanyService";
import { toast } from "react-toastify";
import { Fab, Grid2, useMediaQuery } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { CompanyCouponCard } from "../CompanyCouponCard/CompanyCouponCard";
import authFunctions from "../../AuthArea/AuthFunctions";
import authService from "../../../services/AuthService";

/**
 * CompanyCoupons Component
 *
 * - A React component that displays a list of coupons associated with a company.
 * - The component fetches the company's coupons from the backend and displays them in a grid.
 * - Includes a floating action button (FAB) for adding new coupons.
 * - Provides a callback to remove a coupon from the list after deletion.
 *
 * Key Features:
 * - Fetches a list of coupons associated with the company using `companyService`.
 * - Displays the coupons in a grid, each represented by a `CompanyCouponCard`.
 * - Includes a FAB button for navigating to the "Add Coupon" page.
 * - Updates the coupon list dynamically after a coupon is deleted.
 * - Handles user authentication to ensure only company users can access the page.
 */


export function CompanyCoupons(): JSX.Element {
    const isMobile = useMediaQuery("(max-width: 480px)");
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    const navigate = useNavigate();

    useEffect(()=>{
        companyService.getCompanyCoupons()
        .then(coupon =>{
            setCoupons(coupon)
            localStorage.lUpd = Date.now()
        })
        .catch(err=>{
            toast.error(err.response.data)
            authService.logout();
            navigate("/");})
    }, [])
       
    const handleCouponDeleted = (id: number) => {
        setCoupons((prevCoupons) => {
            const updatedCoupons = prevCoupons.filter((coupon) => coupon.id !== id);
            return updatedCoupons;
        }
    );
    };
        useEffect(() => {
            if(sessionStorage.getItem("loggedIn") === "true"){
                if (!authFunctions.isCompany())
                    navigate(authFunctions.unauthorizedMapper());
            }else
            navigate("/login");
        }, [navigate]);

   
    return (
        <div className="CompanyCoupons">
		<h2>Coupons</h2>
        <Fab
            size={isMobile ? "small" : "large"}
            sx={{
                position: "fixed",
                top: 95,
                right: 20,
                backgroundColor: "primary.main",
                color: "white",
                "& .MuiSvgIcon-root": { fontSize: isMobile ? "1rem" : "1.5rem" }, // Ensure the icon size is consistent
            }} color="primary" aria-label="add" className="addButton" onClick={()=>navigate("/coupon/add")}>
                <AddIcon className="addButton"/>
            </Fab>
            <Grid2 container>
            {coupons.length===0 ? <p>Please wait...</p> : coupons.map(c=><CompanyCouponCard key={c.id} coupon= {c} onCouponDeleted={handleCouponDeleted}/>)}
        </Grid2>	
        </div>
    );
}
