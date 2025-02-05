import { useEffect, useState } from "react";
import "./Dashboard.css";
import { Coupon } from "../../../Models/Coupon";
import customerService from "../../../services/CustomerService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Slider from "react-slick";
import authFunctions from "../../AuthArea/AuthFunctions";
import authService from "../../../services/AuthService";

/**
 * Dashboard Component
 *
 * - The Dashboard component is responsible for displaying a list of coupons associated with a logged-in customer. It fetches the coupons from the server and displays them in a carousel format.
 * - If the user is not logged in or not a customer, they are redirected to the login page.
 * - The component uses `react-slick` for the carousel functionality, with different settings for mobile and desktop views.
 * - If there are no coupons, a message is displayed indicating that the user hasn't purchased any coupons yet.
 *
 * Key Features:
 * - Displays coupons in a carousel slider, with adjustments for mobile and desktop views.
 * - Fetches customer coupons on component mount.
 * - Handles user authentication and redirects unauthorized or logged-out users.
 *
 * State:
 * - `coupons`: An array of coupon objects associated with the customer.
 */


export function Dashboard(): JSX.Element {
    const isMobile = useMediaQuery("(max-width: 480px)");
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (authFunctions.isCustomer()) {
                    const customerCoupons = await customerService.getCustomerCoupons();
                    setCoupons(customerCoupons);
                    localStorage.lUpd = Date.now()
                }
            } catch (err) {
                toast.error("Failed to fetch coupons");
                authService.logout(); 
                navigate("/")
            }
        };

        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (authFunctions.loggedIn()) {
            if (!authFunctions.isCustomer()) {
                navigate(authFunctions.unauthorizedMapper());
            }
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: coupons.length > 2 && !isMobile, // Show arrows only if there are more than two coupons
    };

    return (
        <>
            {authFunctions.isCustomer() && (
                <div className="Dashboard">
                    {coupons.length == 0 ? <span>You didn't purchase any coupons yet</span> :
                    <Box className="carousel-container" sx={{paddingTop: isMobile? "23%" : "10%", width: isMobile? "100%" : "60%"}}>
                        <Typography sx={{paddingBottom: isMobile? "15%" : "10%"}} variant="h3" className="dashboard-title">My Coupons</Typography>
                        <Slider {...sliderSettings}>
                            {coupons.map((coupon) => (
                                <div
                                    className="coupon-card"
                                    key={coupon.id}
                                    onClick={() => navigate(`/coupon/${coupon.id}`)}
                                >
                                    <img
                                        className="card-image"
                                        src={coupon.image}
                                        alt={coupon.title}
                                    />
                                    <Typography className="card-title">
                                        {coupon.title}
                                    </Typography>
                                    <Typography className="card-description">
                                        {coupon.description}
                                    </Typography>
                                </div>
                            ))}
                        </Slider>
                    </Box>
                    }
                </div>
            )}
        </>
    );
}
