import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogTitle,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Company } from "../../../Models/Company";
import "./CompanyCard.css";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import adminService from "../../../services/AdminService";
import { toast } from "react-toastify";
import authService from "../../../services/AuthService";

/**
 * CompanyCard Component
 *
 * - A React component that displays a card for a company with its name and email.
 * - The card provides options to edit or delete the company. The delete action triggers a confirmation dialog.
 *
 * Key Features:
 * - Displays the company's name and email in a card layout.
 * - Provides options to edit or delete the company.
 * - Displays a confirmation dialog before deleting the company.
 * - Ensures responsive layout for mobile and desktop views.
 *
 */


interface CompanyProps{
    company:Company;
  }

export function CompanyCard(props:CompanyProps): JSX.Element {
    const isMobile = useMediaQuery("(max-width: 480px)");
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    const navigate = useNavigate();


function editCompany(id:number){
    navigate("/company/edit/" + id);
}

function deleteCompany(id:number, compName:string){
    adminService.deleteCompany(id)
    .then(()=> {
      handleClose();
      toast.success(compName + " succecfully deleted!");
      localStorage.lUpd = Date.now()
      })
      .catch(err=>{
        toast.error(err.response.data);
            authService.logout(); 
            navigate("/")
      }) 
}

return (
       <Card className="company-container" sx={{paddingLeft: "2%", marginTop: "2%", marginBottom:"1%", boxShadow: 3, flexBasis: isMobile ?  'calc(100% - 50%)' : 'calc(33.333% - 10%)', marginLeft: isMobile ? "25%" : "7%"}}>
       <CardContent >
         <Typography gutterBottom variant="h5" component="div" sx={{fontSize: isMobile ? '15px' : "24px", textAlign: "center"}}>
           {props.company.name}
         </Typography>
         <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: isMobile ? ' 8px' : "14px", textAlign: "center"}}>
           {props.company.email}
         </Typography>
       </CardContent>
       
       <CardActions sx={{ padding: 0, borderTop: 'none', marginTop: "-8%", paddingLeft: isMobile ? "32%" : "27%"}}>
       <IconButton aria-label="edit" size= {isMobile ? "small" : "large"} onClick={()=>{
            editCompany(props.company.id)
        }}>
                <EditIcon sx={{fontSize: isMobile ? "16px" : "24px"}} />
            </IconButton>
            <IconButton aria-label="delete" size= {isMobile ? "small" : "large"} onClick={handleClickOpen}>
                <DeleteIcon sx={{fontSize: isMobile ? "16px" : "24px"}}/>
            </IconButton>
        <Dialog fullScreen= {!isMobile && fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"Are you sure you want to delete: " + props.company.name}</DialogTitle>
            <DialogActions>
            <Button autoFocus onClick={handleClose}>
                Cancel
            </Button>
            <Button onClick={()=>{deleteCompany(props.company.id, props.company.name)}} autoFocus>
                Delete
            </Button>
            </DialogActions>
      </Dialog>
       </CardActions>
     </Card>
    );
}
