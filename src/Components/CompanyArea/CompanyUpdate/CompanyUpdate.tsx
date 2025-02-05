import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Company } from "../../../Models/Company";
import "./CompanyUpdate.css";
import { useEffect } from "react";
import adminService from "../../../services/AdminService";
import { Button, TextField, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import authFunctions from "../../AuthArea/AuthFunctions";
import authService from "../../../services/AuthService";

/**
 * CompanyUpdate Component
 *
 * - A React component that allows an admin to update the details of a specific company.
 * - It fetches the current company's data, populates the form fields, and allows modifications.
 * - Form validation is handled using `react-hook-form`.
 * - On successful form submission, the company details are updated via an API call.
 * 
 * Key Features:
 * - Fetches the company data based on the provided company ID from the route parameters.
 * - Pre-populates the form fields (name, email, password) with the company's current information.
 * - Validates the form fields to ensure they meet the required criteria.
 * - Sends the updated company data to the backend and handles success or failure accordingly.
 * - If the user is not logged in or lacks the proper role, they are redirected to the login page or unauthorized page.
 * 
 */


export function CompanyUpdate(): JSX.Element {
    const params = useParams();
    const companyId = +params.companyId!;
    const navigate = useNavigate();
    const { register, handleSubmit, formState, setValue } = useForm<Company>({ mode: "onSubmit" });

    useEffect(() => {
        adminService.getOneCompany(companyId)
            .then(comp => {
                setValue("name", comp.name);
                setValue("email", comp.email);
                setValue("password", comp.password);
            })
            .catch(err => {
                toast.error(err.response.data);
                authService.logout(); 
                navigate("/")
            })
    }, [companyId, setValue]);

    function sendCompany(company: Company) {
        company.id = companyId;
        adminService.updateCompany(company)
            .then(res => {
                toast.success(res);
                localStorage.lUpd = Date.now();
                navigate("/companies/");

            })
            .catch(err => {
                toast.error(err.response.data);
                authService.logout();
                navigate("/")});
    }

    useEffect(() => {
        if(sessionStorage.getItem("loggedIn") === "true"){
            if (!authFunctions.isAdmin())
                navigate(authFunctions.unauthorizedMapper());
        }else
        navigate("/login");
    }, [navigate]);


    return (
                <div className="CompanyUpdate">
                    <Box className="update-form-container">
                        <Typography variant="h4" className="form-title">
                            Update Company
                        </Typography>
                        <form onSubmit={handleSubmit(sendCompany)} className="form-content">
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                autoComplete="current-name"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                {...register("name", {
                                    required: { value: true, message: "You must enter a name!" },
                                    minLength: { value: 2, message: "Name must be at least 2 characters!" },
                                })}
                            />
                            {formState.errors.name && <span className="error">{formState.errors.name.message}</span>}

                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                type="email"
                                autoComplete="current-email"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                {...register("email", {
                                    required: { value: true, message: "You must enter an email!" },
                                })}
                            />
                            {formState.errors.email && <span className="error">{formState.errors.email.message}</span>}

                            <TextField
                                fullWidth
                                label="Password"
                                variant="outlined"
                                type="password"
                                autoComplete="current-password"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                {...register("password", {
                                    required: { value: true, message: "You must enter a password!" },
                                })}
                            />
                            {formState.errors.password && <span className="error">{formState.errors.password.message}</span>}

                            <Button type="submit" variant="contained" className="submit-button">
                                Update Company
                            </Button>
                        </form>
                    </Box>
                </div>
    );
}
