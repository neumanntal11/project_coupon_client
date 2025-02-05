import "./CouponCard.css";
import React, { useEffect, useState } from "react";
import { Coupon } from "../../../Models/Coupon";
import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogTitle, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import customerService from "../../../services/CustomerService";
import authFunctions from "../../AuthArea/AuthFunctions";
import authService from "../../../services/AuthService";

/**
 * CouponCard Component
 *
 * - A React component that displays the details of a coupon and allows customers to purchase it.
 * - Displays coupon details.
 * - Includes a button to navigate to the coupon's detail page and a button to initiate the purchase process.
 *
 * Key Features:
 * - Displays coupon information.
 * - Provides a button to open a dialog for confirming the purchase.
 * - If the user already owns the coupon, the purchase option is disabled.
 * - The dialog allows customers to confirm or cancel the purchase.
 * - Responsive design adapts to different screen sizes using Material-UI's `useMediaQuery`.
 * 
 * Props:
 * - `coupon` (Coupon): The coupon object containing the data to display, including details.
 *
 */

interface CouponProps{
    coupon:Coupon;
  }

export function CouponCard(props:CouponProps): JSX.Element {
    const isMobile = useMediaQuery("(max-width: 480px)");
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    const [customerCoupon, setCustomerCoupon] = useState<Coupon[]>([]);
    const [refresh, setRefresh] = useState(false); // Trigger for re-fetching
    const navigate = useNavigate();

    
    useEffect(()=>{
        customerService.getCustomerCoupons()
        .then(c=>{
            setCustomerCoupon(c)
        })
        .catch(err => {
            toast.error(err.response.data);
            authService.logout();
            navigate("/")
        })
    }, [refresh])

    function navigation(){
    navigate(`/coupon/${props.coupon.id}`) 
}

function purchaseCoupon(coupon:Coupon){
    customerService.PurchaseCoupon(coupon)
        .then(() => {
            handleClose();
            toast.success("Coupon: " + coupon.title + " successfully purchased!");
            // Fetch the updated list of customer coupons directly
            customerService.getCustomerCoupons()
                .then(c => {
                    setCustomerCoupon(c)
                    localStorage.lUpd = Date.now()
                })
                .catch(err => {
                    toast.error(err.response.data)
                    authService.logout();
                    navigate("/");
                });
        })
        .catch(err => {
            toast.error(err.response.data);
            authService.logout();
                navigate("/");
        });
}
    
    function couponNotExist(id: number | undefined): boolean {
        if (!id) return true; // If the coupon ID is undefined, consider it as not existing
        return !customerCoupon.some((c) => c.id === id);
    }

    return (
		<Card className="coupons-container" sx={{paddingLeft: "1%", marginTop: "2%", marginBottom:"1%", boxShadow: 3, flexBasis: isMobile ?  'calc(100% - 53%)' : 'calc(33.333% - 250px)', marginLeft: isMobile ? "25%" : "7%"}}>
      <div onClick={navigation}>
      <CardMedia 
        sx={{height: 140, borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center"}}
        image={props.coupon.image || "/images/coupons/noImage.jpeg"}
        title={props.coupon.title}
      />
      <CardContent >
        <Typography gutterBottom variant="h5" component="div" sx={{fontSize: isMobile ? '15px' : "24px", textAlign: "center"}}>
          {props.coupon.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: isMobile ? ' 8px' : "14px", textAlign: "center"}}>
          {props.coupon.description}
        </Typography>
        <Typography sx={{fontSize: isMobile ? '7px' : "13px", paddingTop: "10px", textAlign: "right" }}>
            {props.coupon.price}$
        </Typography>
      </CardContent>
      </div>
      <CardActions sx={{ paddingBottom: "0px", borderTop: 'none', marginTop: "-15%", bottom: "0"}}>
        {authFunctions.isCustomer() && couponNotExist(props.coupon.id) && (
       <>
        <IconButton aria-label="buy" size= {isMobile ? "small" : "medium"} onClick={handleClickOpen}>
            <ShoppingCartOutlinedIcon sx={{fontSize: isMobile ? "16px" : "24px"}}/>
        </IconButton>
        <Dialog fullScreen= {!isMobile && fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"Are you sure you want to buy: " + props.coupon.title + " coupon?"}</DialogTitle>
            <DialogActions>
            <Button autoFocus onClick={handleClose}>
                Cancel
            </Button>
            <Button  onClick={()=>{purchaseCoupon(props.coupon)}} autoFocus>
                Buy
            </Button>
            </DialogActions>
      </Dialog>
      </>
    )}
            <Button sx={{fontSize: isMobile ? "12px" : "14px"}} onClick={navigation}>Learn More</Button>
        </CardActions>
    </Card>
    );
}
