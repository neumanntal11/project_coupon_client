import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import "./AboutUs.css";

/**
 * AboutUs Component
 *
 * - A React component that provides information about the company and its services.
 * - Displays a description of the company's mission and offers, as well as an image representing the brand.
 * - The component adapts to screen sizes, with different styling for mobile devices.
 *
 * Key Features:
 * - Displays company information, including a name, description, and mission statement.
 * - Uses Material-UI's for layout and responsive design.
 * - The background color and text color are dynamically adjusted based on the theme.
 */


export function AboutUs(): JSX.Element {
    const isMobile = useMediaQuery("(max-width: 480px)");
    const theme = useTheme(); // Access the theme

    return (
        <div className="about-us">
            <Box 
                className="about-us-container" 
                sx={{
                    padding: "5% 3%", // Adjust padding for spacing
                    marginTop: isMobile ? "6%" : "1%", // Add margin to push it down
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                }}
            >
                <Typography
                    variant="h3"
                    className="company-name"
                    sx={{
                        color: theme.palette.text.primary,
                        textDecoration: "underline",
                        marginBottom: "20px",
                    }}
                >
                    JOHN_Coupon's
                </Typography>
                <Typography
                    variant="h5"
                    className="about-description"
                    sx={{
                        color: theme.palette.text.primary,
                        lineHeight: 1.6,
                        marginBottom: "15px",
                    }}
                >
                    Welcome to JOHN Coupon's! We are a trusted provider of high-quality
                    coupons for all your shopping needs. Our company specializes in offering a wide range
                    of discount coupons, allowing you to save big while shopping at your favorite stores.
                    Whether you’re looking for coupons for electronics, fashion, or daily essentials,
                    we’ve got you covered.
                </Typography>
                <Typography
                    variant="h5"
                    className="about-description"
                    sx={{
                        color: theme.palette.text.primary,
                        lineHeight: 1.6,
                        marginBottom: "15px",
                    }}
                >
                    Our mission is to make shopping more affordable for everyone, providing our customers
                    with easy access to the best deals on the market. With JOHN_Coupon's, you can always find
                    the latest discounts and offers for a variety of products, ensuring that you get the most
                    value for your money.
                </Typography>
                <Typography
                    variant="h5"
                    className="about-description"
                    sx={{
                        color: theme.palette.text.primary,
                        lineHeight: 1.6,
                        marginBottom: "15px",
                    }}
                >
                    We are committed to making your shopping experience better, easier, and more affordable.
                    Explore our coupons today and start saving on your next purchase!
                </Typography>
                <img
                    src="/images/about_us.jpeg"
                    className="about-us-image"
                    alt="About Us"
                    width={isMobile ? "90%" : "80%"}
                    style={{
                        border: "2px solid #ddd",
                        borderRadius: "8px",
                        marginTop: "20px",
                    }}
                />
            </Box>
        </div>
    );
}
