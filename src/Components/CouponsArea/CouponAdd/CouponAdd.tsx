import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Coupon } from "../../../Models/Coupon";
import companyService from "../../../services/CompanyService";
import { TextField, Button, Box, Grid, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, Typography } from "@mui/material";
import { jwtUser } from "../../AuthArea/Login/Login";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Company } from "../../../Models/Company";
import { Category } from "../../../Models/Category";
import "./CouponAdd.css"; // Custom styling
import authFunctions from "../../AuthArea/AuthFunctions";
import authService from "../../../services/AuthService";

/**
 * CouponAdd Component
 *
 * - A React component for adding a new coupon to the system.
 * - Displays a form to enter coupon details.
 * - Submits the form data to the backend and redirects to the list of coupons upon success.
 * - Includes validation for the form fields using `react-hook-form`.
 *
 * Key Features:
 * - Displays input fields for coupon details: title, description, amount, dates, price, image, and category.
 * - Allows users to select a category from a predefined list of categories (Food, Fashion, Cinema, Spa, Tech, Sport).
 * - The form is validated to ensure that required fields are filled and values like amount and price are positive.
 * - On successful form submission, the coupon is sent to the backend, and the user is redirected to the coupon list.
 * - Redirects to login page or an unauthorized page if the user is not a company or not logged in.
 */


export function CouponAdd(): JSX.Element {
    const navigate = useNavigate();
    const [category, setCategory] = useState<string>(""); // For category filter
    const { register, handleSubmit, formState, setValue } = useForm<Coupon>({ mode: "onSubmit" });
    const id: number = jwtDecode<jwtUser>(localStorage.token).id;

    // Fixed categories
    const categories: Category[] = [
        new Category(1, "Food", []),
        new Category(2, "Fashion", []),
        new Category(3, "Cinema", []),
        new Category(4, "Spa", []),
        new Category(5, "Tech", []),
        new Category(6, "Sport", []),
    ];

    // Send coupon data to backend
    async function sendCoupon(formCoupon: Coupon) {
        const selectedCategory = categories.find(categor => categor.name === category);
        if (!selectedCategory) {
            toast.error("Invalid category selected!");
            return;
        }
        const company: Promise<Company> = companyService.getCompanyDetails(id);
        const coupon = new Coupon(
            0,
            await company,
            selectedCategory, // Pass the full category object
            formCoupon.title,
            formCoupon.description,
            formCoupon.startDate,
            formCoupon.endDate,
            formCoupon.amount,
            formCoupon.price,
            formCoupon.image
        );

        companyService.addCoupon(coupon)
            .then(res => {
                toast.success(`Coupon: ${coupon.title} added`);
                navigate("/our_coupons/");
                localStorage.lUpd = Date.now()
            })
            .catch(err => {
                toast.error(err.response.data)
                authService.logout();
                navigate("/");
            });
    }

    // Handle category selection
    const handleSelect = (event: SelectChangeEvent<string>) => {
        setCategory(event.target.value);
    };

    // Redirect if not a company
    useEffect(() => {
        if(sessionStorage.getItem("loggedIn") === "true"){
            if (!authFunctions.isCompany())
                navigate(authFunctions.unauthorizedMapper());
        }else
        navigate("/login");
    }, [navigate]);

    return (
        <Box className="CouponAdd">
            <div className="add-form-container">
                <Typography variant="h4" className="form-title">
                    Add Coupon
                </Typography>
                <form onSubmit={handleSubmit(sendCoupon)} className="form-content">
                    <Grid container spacing={3}>
                        {/* Title */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Title"
                                variant="outlined"
                                autoComplete="new-title"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                {...register("title", {
                                    required: { value: true, message: "You must enter a title!" }
                                })}
                            />
                            {formState.errors.title && <span className="error">{formState.errors.title.message}</span>}
                        </Grid>

                        {/* Description */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                variant="outlined"
                                autoComplete="new-description"
                                multiline
                                rows={4}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                {...register("description", {
                                    maxLength: { value: 120, message: "Description max length is: 120 characters!" }
                                })}
                            />
                            {formState.errors.description && <span className="error">{formState.errors.description.message}</span>}
                        </Grid>

                        {/* Amount */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Amount"
                                variant="outlined"
                                type="number"
                                autoComplete="new-amount"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                {...register("amount", {
                                    min: { value: 0, message: "Amount can't be below 0!" }
                                })}
                            />
                            {formState.errors.amount && <span className="error">{formState.errors.amount.message}</span>}
                        </Grid>

                        {/* Start Date */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Start Date"
                                variant="outlined"
                                type="date"
                                autoComplete="new-startDate"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                {...register("startDate")}
                            />
                        </Grid>

                        {/* End Date */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="End Date"
                                variant="outlined"
                                type="date"
                                autoComplete="new-endtDate"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                {...register("endDate")}
                            />
                        </Grid>

                        {/* Price */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Price"
                                variant="outlined"
                                type="text"
                                inputMode="decimal"
                                autoComplete="new-price"
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

                        {/* Image */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Image(URL)"
                                variant="outlined"
                                autoComplete="new-image"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                {...register("image")}
                            />
                        </Grid>

                        {/* Category Select */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" required>
                                <InputLabel id="category-select-label" shrink>Category</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    autoComplete="current-category"
                                    value={category}
                                    onChange={handleSelect} // Use onChange instead of onSelect
                                    label="Category"
                                >
                                    {categories.map(category => (
                                        <MenuItem key={category.id} value={category.name}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" className="submit-button">
                                Add Coupon
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Box>
    );
}
