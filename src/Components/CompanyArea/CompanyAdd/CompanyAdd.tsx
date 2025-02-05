import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Company } from "../../../Models/Company";
import adminService from "../../../services/AdminService";
import { Button, TextField, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect } from "react";
import authFunctions from "../../AuthArea/AuthFunctions";
import "./CompanyAdd.css";
import authService from "../../../services/AuthService";

/**
 * CompanyAdd Component
 *
 * - A React component that provides a form for adding a new company.
 * - The form captures the company's name, email, and password.
 * - Upon submission, the company data is sent to the backend service to be added.
 * - If the company is added successfully, the user is redirected to the list of companies.
 * - The component also ensures that only admin users can access the page, and non-admin users will be redirected.
 *
 * Key Features:
 * - Form inputs for the company's name, email, and password.
 * - Validation for required fields and minimum length for the company name.
 * - Redirects the user upon success or failure of the company addition.
 * - Admin-only access, with redirection to login or unauthorized page if the user is not an admin.
 *
 */


export function CompanyAdd(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<Company>({ mode: "onSubmit" });

    function sendCompany(company: Company) {
        adminService.addCompany(company)
            .then(res => {
                toast.success(res);
                navigate("/companies/");
                localStorage.lUpd = Date.now()
            })
            .catch(err => {
                toast.error(err.response.data);
                authService.logout(); 
                navigate("/")})
    }

    useEffect(() => {
        if (sessionStorage.getItem("loggedIn") === "true") {
            if (!authFunctions.isAdmin())
                navigate(authFunctions.unauthorizedMapper());
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return (
                <div className="CompanyAdd">
                    <Box className="add-form-container">
                        <Typography variant="h4" className="form-title">
                            Add Company
                        </Typography>
                        <form onSubmit={handleSubmit(sendCompany)} className="form-content">
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
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
                                autoComplete="new-email"
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
                                autoComplete="new-password"
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
                                Add Company
                            </Button>
                        </form>
                    </Box>
                </div>
    );
}
