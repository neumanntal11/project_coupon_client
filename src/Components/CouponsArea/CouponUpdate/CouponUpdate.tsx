import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import companyService from "../../../services/CompanyService";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import { Coupon } from "../../../Models/Coupon";
import authFunctions from "../../AuthArea/AuthFunctions";
import { jwtDecode } from "jwt-decode";
import { jwtUser } from "../../AuthArea/Login/Login";
import { useEffect } from "react";
import "./CouponUpdate.css"; // Custom styling
import { Company } from "../../../Models/Company";
import authService from "../../../services/AuthService";

/**
 * CouponUpdate Component
 *
 * - Allows a company user to update an existing coupon's details.
 * - Prefills the form fields with the current coupon data fetched from the server.
 * - Includes field validations and error handling for invalid inputs.
 * - Ensures only authenticated and authorized company users can access this functionality.
 *
 * Key Features:
 * - Fetches the coupon's current details using its ID from the route parameters.
 * - Validates input fields for title, description, amount, price, and end date.
 * - Sends updated coupon data to the backend service for processing.
 * - Redirects users on successful updates or unauthorized access.
 *
 * Validation Rules:
 * - `title`: Required.
 * - `description`: Optional, max length of 120 characters.
 * - `amount`: Minimum value of 0.
 * - `price`: Minimum value of 0, must be a valid number.
 * - `category`: Read-only field.
 * - `endDate`: Optional, but must be a valid date if provided.
 *
 * Error Handling:
 * - Displays toast notifications for successful updates and API errors.
 * - Logs the user out and redirects to the login page if the session is invalid.
 */


export function CouponUpdate(): JSX.Element {
    const params = useParams();
    const couponId = +params.couponId!;
    const navigate = useNavigate();
    const { register, handleSubmit, formState, setValue } = useForm<Coupon>({ mode: "onSubmit" });
    const id: number = jwtDecode<jwtUser>(localStorage.token).id;

    useEffect(() => {
        companyService.getOneCoupon(couponId)
            .then(coup => {
                setValue("title", coup.title);
                setValue("description", coup.description);
                setValue("amount", coup.amount);
                setValue("endDate", coup.endDate);
                setValue("price", coup.price);
                setValue("image", coup.image);
                setValue("category", coup.category);
            })
            .catch(err => {
                toast.error(err.response.data);
                authService.logout();
                navigate("/");
            });
    }, [couponId, setValue]);

    async function sendCoupon(formCoupon: Coupon) {
        formCoupon.id = couponId;
        const company: Promise<Company> = companyService.getCompanyDetails(id);
        const couponSend = new Coupon(
            formCoupon.id,
            await company,
            formCoupon.category, // Pass the full category object
            formCoupon.title,
            formCoupon.description,
            formCoupon.startDate,
            formCoupon.endDate,
            formCoupon.amount,
            formCoupon.price,
            formCoupon.image
        );
        companyService
            .updateCoupon(couponSend)
            .then(res => {
                toast.success(res);
                navigate("/coupons/");
                localStorage.lUpd = Date.now()

            })
            .catch(err => {
                toast.error(err.response.data)
                authService.logout();
                navigate("/");
            });
    }

    useEffect(() => {
        if(sessionStorage.getItem("loggedIn") === "true"){
            if (!authFunctions.isCompany())
                navigate(authFunctions.unauthorizedMapper());
        }else
        navigate("/login");
    }, [navigate]);

    return (
        <Box className="CouponUpdate">
        <div className="update-form-container">
            <Typography variant="h4" className="form-title">Update Coupon</Typography>
            <form onSubmit={handleSubmit(sendCoupon)} className="form-container">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            variant="outlined"
                            slotProps={{
                                inputLabel: {
                                  shrink: true,
                                },
                            }}
                            {...register("title", {
                                required: { value: true, message: "You must enter a title!" },
                            })}
                        />
                        {formState.errors.title && <span className="error">{formState.errors.title.message}</span>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            slotProps={{
                                inputLabel: {
                                  shrink: true,
                                },
                            }}
                            multiline
                            rows={4}
                            {...register("description", {
                                maxLength: { value: 120, message: "Description max length is 120 characters!" },
                            })}
                        />
                        {formState.errors.description && <span className="error">{formState.errors.description.message}</span>}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Amount"
                            variant="outlined"
                            type="number"
                            slotProps={{
                                inputLabel: {
                                  shrink: true,
                                },
                            }}
                            {...register("amount", {
                                min: { value: 0, message: "Amount can't be below 0!" },
                            })}
                        />
                        {formState.errors.amount && <span className="error">{formState.errors.amount.message}</span>}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="End Date"
                            variant="outlined"
                            type="date"
                            slotProps={{
                                inputLabel: {
                                  shrink: true,
                                },
                            }}
                            {...register("endDate")}
                        />
                        {formState.errors.endDate && <span className="error">{formState.errors.endDate.message}</span>}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Price"
                            variant="outlined"
                            type="text"
                            inputMode="decimal"
                            slotProps={{
                                inputLabel: {
                                  shrink: true,
                                },
                            }}
                            {...register("price", {
                                min: { value: 0, message: "Price can't be below 0!" },
                                pattern: {
                                    value: /^[0-9]+(\.[0-9]+)?$/, // Regex to allow decimals and digits only
                                    message: "Please enter a valid price",
                                },
                             
                            })}
                        />
                        {formState.errors.price && <span className="error">{formState.errors.price.message}</span>}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Image(URL)"
                            variant="outlined"
                            slotProps={{
                                inputLabel: {
                                  shrink: true,
                                },
                            }}
                            {...register("image")}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Category"
                            variant="outlined"
                            slotProps={{
                                input: {
                                  readOnly: true,
                                },
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            {...register("category.name")}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>
                            Update Coupon
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
        </Box>
    );
}