import React from "react";
import { Coupon } from "../../../Models/Coupon";
import "./CompanyCouponCard.css";
import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogTitle, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import companyService from "../../../services/CompanyService";
import authService from "../../../services/AuthService";

/**
 * CompanyCouponCard Component
 *
 * - A React component that displays company coupon details in a card format.
 * - The component includes options to edit or delete the coupon.
 * - A confirmation dialog appears before deletion to ensure user intent.
 * 
 * Key Features:
 * - Displays coupon information.
 * - Provides an "Edit" button for navigating to the coupon's edit page.
 * - Provides a "Delete" button that opens a confirmation dialog before deletion.
 * - The component supports dynamic styling, with adjustments for mobile and desktop views.
 * 
 * Props:
 * - `coupon`: The coupon object to be displayed.
 * - `onCouponDeleted`: A callback function that is called when a coupon is successfully deleted.
 *
 */


interface CouponProps{
    coupon:Coupon;
    onCouponDeleted: (id: number) => void;
  }

export function CompanyCouponCard(props:CouponProps): JSX.Element {
    const isMobile = useMediaQuery("(max-width: 480px)");  
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    const navigate = useNavigate();
    

function editCoupon(id:number){
    navigate("/coupon/edit/" + id); 
}

function deleteCoupon(id:number, title:string){
    companyService.deleteCoupon(id)
    .then(s=>{
      handleClose();
      toast.success("Coupon: " + title + " succecfully deleted!");
      props.onCouponDeleted(id);
      localStorage.lUpd = Date.now()
    })
    .catch(err=>{
        toast.error(err.response.data)
        authService.logout();
        navigate("/");
    }) 
    
}

    return (
    <Card className="company-coupons-container" sx={{paddingLeft: "2%", marginTop: "2%", marginBottom:"1%", boxShadow: 3, flexBasis: isMobile ?  'calc(100% - 50%)' : 'calc(33.333% - 10%)', marginLeft: isMobile ? "25%" : "7%"}}>
      <CardMedia
        sx={{height: 140, borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center"}}
        image={props.coupon?.image || "/images/coupons/noImage.jpeg"}
        title={props.coupon.title}
      />
      <CardContent >
        <Typography sx={{fontSize: isMobile ? '15px' : "24px", textAlign: "center"}} gutterBottom variant="h5" component="div">
          {props.coupon.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: isMobile ? ' 8px' : "14px", textAlign: "center" }}>
          {props.coupon.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ padding: 0, borderTop: 'none', marginTop: "-8%", paddingLeft: isMobile ? "32%" : "27%", paddingTop: "4%"}}>
      <IconButton aria-label="edit" size= {isMobile ? "small" : "large"} onClick={()=>{ 
            editCoupon(props.coupon.id)
        }}>
                <EditIcon sx={{fontSize: isMobile ? "16px" : "24px"}} />
            </IconButton>
        
            <IconButton aria-label="delete" size= {isMobile ? "small" : "large"} onClick={handleClickOpen}>
              <DeleteIcon sx={{fontSize: isMobile ? "16px" : "24px"}}/>
            </IconButton>
        <Dialog fullScreen={!isMobile && fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"Are you sure you want to delete: " + props.coupon.title}</DialogTitle>
            <DialogActions>
            <Button autoFocus onClick={handleClose}>
                Cancel
            </Button>
            <Button onClick={()=>{deleteCoupon(props.coupon.id, props.coupon.title); navigate("/our_coupons")}} autoFocus>
                Delete
            </Button>
            </DialogActions>
      </Dialog>	
      </CardActions>
    </Card>
    );
}
