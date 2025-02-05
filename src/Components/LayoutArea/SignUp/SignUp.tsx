import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Customer } from "../../../Models/Customer";
import adminService from "../../../services/AdminService";
import authService from "../../../services/AuthService";
import authFunctions from "../../AuthArea/AuthFunctions";

/**
 * A React functional component for the Sign-Up page.
 * 
 * Provides a form for new customers to register by submitting their details.
 * Utilizes `react-hook-form` for form management, `react-router-dom` for navigation, 
 * and `toastify` for user feedback notifications.
 * 
 * Features:
 * - Form fields for first name, last name, email, and password.
 * - Validation for all input fields with error messages.
 * - On successful registration, navigates to the log in page and displays a success message.
 * - Displays an error message if registration fails.
 */

export function SignUp(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<Customer>({ mode: "onSubmit" });

    function sendCustomer(customer: Customer) {
        authService.signUp(customer)
            .then(res => {
                toast.success("You have successfully registered!");
                navigate("/");
            })
            .catch(err => {
                toast.error("Email already exist!")
            });
    }

    return (
                <div className="CustomerAdd">
                    <Box className="add-form-container">
                        <Typography variant="h4" className="form-title">
                            SignUp
                        </Typography>
                        <form onSubmit={handleSubmit(sendCustomer)} className="form-content">
                            <TextField
                                fullWidth
                                label="First Name"
                                variant="outlined"
                                autoComplete="new-firstName"
                                required
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
                                required
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
                                required
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
                                required
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
                                Sign Up
                            </Button>
                        </form>
                    </Box>
                </div>
    );
}
