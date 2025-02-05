import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Customer } from "../../../Models/Customer";
import adminService from "../../../services/AdminService";
import { TextField, Button, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect } from "react";
import authFunctions from "../../AuthArea/AuthFunctions";
import "./CustomerAdd.css";
import authService from "../../../services/AuthService";

/**
 * CustomerAdd Component
 *
 * - Provides a form to add a new customer.
 * - Includes validation for first name, last name, email, and password.
 * - Integrates with the admin service to submit customer details to the backend.
 *
 * Key Features:
 * - Real-time validation for form fields (On Submit).
 * - Displays error messages for invalid inputs.
 * - Redirects the user to the customers list on successful submission.
 * - Handles API errors gracefully with notifications and user logout if necessary.
 * - Ensures only authorized admin users can access the component.
 *
 * Validation Rules:
 * - `firstName`: Required, minimum length of 2 characters.
 * - `lastName`: Required, minimum length of 2 characters.
 * - `email`: Required, valid email format.
 * - `password`: Required.
 */


export function CustomerAdd(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<Customer>({ mode: "onSubmit" });

    function sendCustomer(customer: Customer) {
        adminService.addCutomer(customer)
            .then(res => {
                toast.success(res);
                navigate("/customers/");
                localStorage.lUpd = Date.now()
            })
            .catch(err => {
                toast.error(err.response.data)
                authService.logout();
                navigate("/");
            });
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
                <div className="CustomerAdd">
                    <Box className="add-form-container">
                        <Typography variant="h4" className="form-title">
                            Add Customer
                        </Typography>
                        <form onSubmit={handleSubmit(sendCustomer)} className="form-content">
                            <TextField
                                fullWidth
                                label="First Name"
                                variant="outlined"
                                autoComplete="new-firstName"
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
                                autoComplete="new-lastName"
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
                                Add Customer
                            </Button>
                        </form>
                    </Box>
                </div>
    );
}
