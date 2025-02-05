import { useEffect, useState } from "react";
import "./Coupons.css";
import { Coupon } from "../../../Models/Coupon";
import { useNavigate } from "react-router-dom";
import companyService from "../../../services/CompanyService";
import { toast } from "react-toastify";
import { Grid2 } from "@mui/material";
import { CouponCard } from "../CouponCard/CouponCard";
import { SideBar } from "../../LayoutArea/SideBar/SideBar";
import authFunctions from "../../AuthArea/AuthFunctions";
import authService from "../../../services/AuthService";

/**
 * Coupons Component
 *
 * - Displays a list of available coupons for a customer, with options to filter by price and category.
 * - Ensures only authenticated and authorized users can access this functionality.
 *
 * Key Features:
 * - Fetches all coupons from the backend service and stores them in the state.
 * - Filters coupons based on selected price range and category.
 * - Renders a `SideBar` for filter controls and individual `CouponCard` components for each coupon.
 * - Displays a loading message when coupons are being fetched.
 * - Handles unauthorized access by redirecting users to appropriate pages.
 *
 * Props and State:
 * - `value`: Represents the price slider's maximum value (default: 100).
 * - `category`: Represents the selected coupon category for filtering.
 * - `coupons`: Array of all fetched coupons, filtered dynamically based on user input.
 *
 * Authentication and Authorization:
 * - Verifies the user's login status and role (must be a customer).
 * - Redirects to the login page or an unauthorized route for invalid sessions.
 *
 * Error Handling:
 * - Displays toast notifications for API errors.
 * - Logs the user out and redirects to the login page on critical errors.
 *
 */


export function Coupons(): JSX.Element {
    const [value, setValue] = useState(100); // For price slider
    const [category, setCategory] = useState<string>(""); // For category filter
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const navigate = useNavigate();

    useEffect(()=>{
        companyService.getAllCoupons()
        .then(coupon =>{
          setCoupons(coupon);
          localStorage.lUpd = Date.now()
        })
        .catch(err=>{
            toast.error(err.response.data)
            authService.logout();
            navigate("/");})
    }, [navigate])

        useEffect(() => {
            if(sessionStorage.getItem("loggedIn") === "true"){
                if (!authFunctions.isCustomer())
                    navigate(authFunctions.unauthorizedMapper());
            }else
            navigate("/login");
        }, [navigate]);

    return (
        <>
        <aside className="sidebar"><SideBar value={value} onChange={setValue} category={category} onSelect={setCategory}/></aside>
        <div className="Coupons">
		<h2>Coupons</h2>
            <Grid2 container>
            {coupons.length === 0 ? (
              <p>Please wait...</p>
            ) : (
              coupons
                .filter((c) => {
                  return (
                    c.price <= value &&
                    (category === "" || (c.category && c.category.name === category))
                  );
                })
                .map((c) => <CouponCard key={c.id} coupon={c} />)
            )}
        </Grid2>
        </div>
        </>
    );
}
