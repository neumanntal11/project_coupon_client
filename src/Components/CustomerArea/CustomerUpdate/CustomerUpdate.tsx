import { useNavigate, useParams } from "react-router-dom";
import "./CustomerUpdate.css";
import { Customer } from "../../../Models/Customer";
import { useEffect } from "react";
import adminService from "../../../services/AdminService";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import authFunctions from "../../AuthArea/AuthFunctions";
import authService from "../../../services/AuthService";

/**
 * CustomerUpdate Component
 *
 * - A React component for updating customer details in an admin dashboard.
 * - Provides a form to edit customer information and handles form validation.
 * - Fetches customer data by `customerId` from the URL and pre-fills the form.
 * - Updates customer details through the `AdminService`.
 * - Includes error handling for invalid data or unauthorized access.
 *
 * Key Features:
 * - Prefills form fields with customer data retrieved from the server.
 * - Validates form inputs for required fields and minimum character lengths.
 * - Displays error messages for validation issues.
 * - Redirects users based on authentication and authorization status.
 *
 */

export function CustomerUpdate(): JSX.Element {
    const params = useParams();
    const customerId = +params.customerId!;
    const navigate = useNavigate();
    const { register, handleSubmit, formState, setValue } = useForm<Customer>({ mode: "onSubmit" });

    useEffect(() => {
        adminService
            .getOneCustomer(customerId)
            .then(cust => {
                setValue("firstName", cust.firstName);
                setValue("lastName", cust.lastName);
                setValue("email", cust.email);
                setValue("password", cust.password);
            })
            .catch(err => {
                toast.error(err.response.data); 
                authService.logout();
                navigate("/");
            });
    }, [customerId, setValue, navigate]);

    function sendCustomer(customer: Customer) {
        customer.id = customerId;
        adminService.updateCustomer(customer)
            .then(res => {
                toast.success(res);
                navigate("/customers/");
                localStorage.lUpd = Date.now()
            })
            .catch(err =>{
                toast.error(err.response.data);
                authService.logout();
                navigate("/");

            });
    }

    useEffect(() => {
        if(sessionStorage.getItem("loggedIn") === "true"){
            if (!authFunctions.isAdmin())
                navigate(authFunctions.unauthorizedMapper());
        }else
        navigate("/login");
    }, [navigate]);

    return (
        <>
                <div className="CustomerUpdate">
                    <Box className="update-form-container">
                        <Typography variant="h4" className="form-title">
                            Update Customer
                        </Typography>
                        <form onSubmit={handleSubmit(sendCustomer)} className="form-content">
                            <TextField
                                fullWidth
                                label="First Name"
                                variant="outlined"
                                autoComplete="current-firstName"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                {...register("firstName", {
                                    required: { value: true, message: "You must enter a first name!" },
                                    minLength: { value: 2, message: "First name must be at least 2 characters!" },
                                })}
                            />
                            {formState.errors.firstName && <span className="error">{formState.errors.firstName.message}</span>}

                            <TextField
                                fullWidth
                                label="Last Name"
                                variant="outlined"
                                autoComplete="current-lastName"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                {...register("lastName", {
                                    required: { value: true, message: "You must enter a last name!" },
                                    minLength: { value: 2, message: "Last name must be at least 2 characters!" },
                                })}
                            />
                            {formState.errors.lastName && <span className="error">{formState.errors.lastName.message}</span>}

                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                variant="outlined"
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
                                type="password"
                                variant="outlined"
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
                                Update Customer
                            </Button>
                        </form>
                    </Box>
                </div>
        </>
    );
}
