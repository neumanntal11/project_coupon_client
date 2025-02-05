import { useNavigate } from "react-router-dom";
import { Customer } from "../../../Models/Customer";
import "./CustomerCard.css";
import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogTitle, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import adminService from "../../../services/AdminService";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import { toast } from "react-toastify";

interface CustomerProps{
    customer:Customer;
  }

/**
 * CustomerCard Component
 *
 * - Displays individual customer information in a card format.
 * - Provides options to edit or delete a customer.
 * - Responsive design adjusts the layout and font size for mobile devices.
 * - Includes a confirmation dialog before deleting a customer.
 *
 * Key Features:
 * - Displays customer's details.
 * - Edit button navigates to the customer update page.
 * - Delete button triggers a confirmation dialog and deletes the customer upon confirmation.
 * - Handles API integration for deleting customers.
 *
 * Props:
 * - `customer`: A `Customer` object containing the details of the customer.
 */


export function CustomerCard(props:CustomerProps): JSX.Element {
    const isMobile = useMediaQuery("(max-width: 480px)");
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    const navigate = useNavigate();
    
function editCustomer(id:number){
    navigate("/customer/edit/" + id); 
}

function deleteCustomer(id:number, custFirstName:string, custLastName:string){
    adminService.deleteCustomer(id); 
    handleClose();
    toast.success(custFirstName + " " + custLastName + " succecfully deleted!");
}
    
    return (
        <>
       <Card className="customer-container" sx={{paddingLeft: "2%", marginTop: "2%", marginBottom:"1%", boxShadow: 3, flexBasis: isMobile ?  'calc(100% - 50%)' : 'calc(33.333% - 10%)', marginLeft: isMobile ? "25%" : "7%"}}>
      <CardContent >
        <Typography gutterBottom variant="h5" component="div" sx={{fontSize: isMobile ? '15px' : "24px", textAlign: "center"}}>
          {props.customer.firstName} {props.customer.lastName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: isMobile ? ' 8px' : "14px", textAlign: "center"}}>
          {props.customer.email}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: 0, borderTop: 'none', marginTop: "-8%", paddingLeft: isMobile ? "32%" : "27%"}}>
      <IconButton aria-label="edit" size= {isMobile ? "small" : "large"} onClick={()=>{ 
            editCustomer(props.customer.id)
        }}>
                <EditIcon sx={{fontSize: isMobile ? "16px" : "24px"}}/>
            </IconButton>
            <IconButton aria-label="delete" size= {isMobile ? "small" : "large"} onClick={handleClickOpen}>
                <DeleteIcon sx={{fontSize: isMobile ? "16px" : "24px"}} />
            </IconButton>
        <Dialog fullScreen= {!isMobile && fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"Are you sure you want to delete: " + props.customer.firstName + " " + props.customer.lastName}</DialogTitle>
            <DialogActions>
            <Button autoFocus onClick={handleClose}>
                Cancel
            </Button>
            <Button onClick={()=>{deleteCustomer(props.customer.id, props.customer.firstName, props.customer.lastName)}} autoFocus>
                Delete
            </Button>
            </DialogActions>
      </Dialog>
      </CardActions>
    </Card>
        </>
    );
}
