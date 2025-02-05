import { useEffect, useState } from "react";
import "./CouponDetails.css";
import { Coupon } from "../../../Models/Coupon";
import { useNavigate, useParams } from "react-router-dom";
import companyService from "../../../services/CompanyService";
import { toast } from "react-toastify";
import {Button,Card,CardMedia,Container,Dialog,DialogActions,DialogTitle,Typography,useMediaQuery,useTheme} from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import customerService from "../../../services/CustomerService";
import authFunctions from "../../AuthArea/AuthFunctions";
import authService from "../../../services/AuthService";

/**
 * CouponDetails Component
 *
 * - Displays detailed information about a specific coupon, allowing authenticated customers to purchase it.
 * - Handles mobile responsiveness and provides interactive features like a dialog for confirming purchases.
 * - Integrates with customer and authentication services for data retrieval and user authorization.
 *
 * Key Features:
 * - Fetches coupon details by ID and the customer's purchased coupons.
 * - Displays coupon details.
 * - Allows customers to purchase coupons, with validation for stock availability and ownership.
 *
 * Props and State:
 * - `coupon`: The detailed information of the selected coupon.
 * - `customerCoupon`: List of coupons already purchased by the customer.
 * - `open`: Controls the visibility of the purchase confirmation dialog.
 *
 * Authentication and Authorization:
 * - Verifies that the user is logged in and not an admin.
 * - Redirects unauthorized users to appropriate routes.
 *
 * Responsiveness:
 * - Adjusts layout for mobile screens using Material-UI's `useMediaQuery`.
 *
 * Error Handling:
 * - Displays toast notifications for errors during API calls.
 * - Logs the user out and redirects to the login page on critical errors.
 *
 */


export function CouponDetails(): JSX.Element {
    const isMobile = useMediaQuery("(max-width: 480px)");
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    const [coupon, setCoupon] = useState<Coupon | undefined>(undefined);
    const [customerCoupon, setCustomerCoupon] = useState<Coupon[]>([]);
    const params = useParams();
    const couponId = +params.couponId!;
    const navigate = useNavigate();

    useEffect(()=>{
        customerService.getOneCoupon(couponId)
        .then(c=>{
            setCoupon(c)
        })
        .catch(err => {
            toast.error(err.response.data);
            authService.logout();
            navigate("/")
        })
    }, [couponId, navigate])

    useEffect(()=>{
        customerService.getCustomerCoupons()
        .then(c=>{
            setCustomerCoupon(c)
            localStorage.lUpd = Date.now()
        })
        .catch(err =>{
            toast.error(err.response.data);
            authService.logout();
            navigate("/")
        })
    }, [couponId, navigate])

        function purchaseCoupon(){
            if(coupon){
            customerService.PurchaseCoupon(coupon)
            .then(p=>{
                handleClose(); 
                toast.success("Coupon: " + coupon.title + " succecfully purchased!");
                navigate("/coupons")
                localStorage.lUpd = Date.now()
            })
            .catch(err=>{toast.error(err.response.data);
            authService.logout();
            navigate("/")})
            }
        }

        function couponNotExist(id: number | undefined): boolean {
            if (!id) return true; // If the coupon ID is undefined, consider it as not existing
            return !customerCoupon.some((c) => c.id === id);
        }

        useEffect(() => {
            if(sessionStorage.getItem("loggedIn") === "true"){
                if (authFunctions.isAdmin())
                    navigate(authFunctions.unauthorizedMapper());
            }else
            navigate("/login");
        }, [navigate]);

        return (
                    <div className="CouponDetails"
                        style={{ display: "flex", justifyContent: "center",  alignItems: "center", height: isMobile ? "120vh" : "110vh"}}>
                        {!coupon && <span>Please wait...</span>}
                        <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 2, boxShadow: 3 }}>
                            <Typography sx={{ fontSize: "55px", textAlign: "center" }} variant="h1">
                                {coupon?.title}
                            </Typography>
                            <Typography sx={{ fontSize: "24px", textAlign: "center", marginTop: "10px" }} variant="h3">
                                {coupon?.description}
                            </Typography>
                            <CardMedia
                                sx={{
                                    width: 500,
                                    height: 350,
                                    borderRadius: "10px",
                                    marginTop: "20px",
                                }}
                                image={coupon?.image || "/images/coupons/noImage.jpeg"}
                            />
                            <Container
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginTop: "20px",
                                    width: "100%",
                                    maxWidth: "400px",
                                }}
                            >
                                <Typography sx={{ fontSize: "16px" }}>
                                    {couponNotExist(coupon?.id) ?
                                    coupon?.amount === undefined || coupon?.amount < 1 ? (
                                        <span>Out of Stock</span>
                                    ) : (
                                        <Button onClick={handleClickOpen}>Buy It Now!      
                                        <ShoppingCartOutlinedIcon sx={{marginLeft: "10px"}}/></Button>
                                    ) : 
                                    <span>You Alreay Bought This Coupon!</span>}
                                </Typography>
                                {authFunctions.isCustomer() && couponNotExist(coupon?.id) && (
                            <>
                                <Dialog
                                    fullScreen= {!isMobile && fullScreen}
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="responsive-dialog-title"
                                    aria-hidden="false"
                                >
                                    <DialogTitle id="responsive-dialog-title">
                                        {"Are you sure yo want to buy: " + coupon?.title + " coupon?"}
                                    </DialogTitle>
                                    <DialogActions>
                                        <Button autoFocus onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button autoFocus onClick={() => purchaseCoupon()}>
                                            Buy
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </>
                        )}
                                <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                                    {coupon?.price}$
                                </Typography>
                            </Container>
                        </Card>
                    </div>  
        );
}
