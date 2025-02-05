import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import { Companies } from "../../CompanyArea/Companies/Companies";
import { CompanyDetails } from "../../CompanyArea/CompanyDetails/CompanyDetails";
import { Customers } from "../../CustomerArea/Customers/Customers";
import { CustomerDetails } from "../../CustomerArea/CustomerDetails/CustomerDetails";
import { CustomerUpdate } from "../../CustomerArea/CustomerUpdate/CustomerUpdate";
import { CompanyUpdate } from "../../CompanyArea/CompanyUpdate/CompanyUpdate";
import { CompanyAdd } from "../../CompanyArea/CompanyAdd/CompanyAdd";
import { CustomerAdd } from "../../CustomerArea/CustomerAdd/CustomerAdd";
import { Coupons } from "../../CouponsArea/Coupons/Coupons";
import { CouponDetails } from "../../CouponsArea/CouponDetails/CouponDetails";
import { CouponUpdate } from "../../CouponsArea/CouponUpdate/CouponUpdate";
import { CouponAdd } from "../../CouponsArea/CouponAdd/CouponAdd";
import { Login } from "../../AuthArea/Login/Login";
import { CompanyCoupons } from "../../CouponsArea/CompanyCoupons/CompanyCoupons";
import { Profile } from "../Profile/Profile";
import { Dashboard } from "../Dashboard/Dashboard";
import { AboutUs } from "../AboutUs/AboutUs";
import { NotFound } from "../../Errors/NotFound/NotFound";
import { AdminInit } from "../../AuthArea/AdminInit/AdminInit";
import { SignUp } from "../SignUp/SignUp";

/**
 * Routing Component
 * 
 * - Manages application routes using `react-router-dom`.
 * - Defines routes for different areas of the application, such as companies, customers, coupons, authentication, and more.
 * - Includes a fallback route for handling 404 errors with a `NotFound` component.
 */

export function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/companies" element={<Companies />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/coupons" element={<Coupons />} />
                <Route path="/our_coupons" element={<CompanyCoupons />} />
                <Route path="/company/:companyId" element={<CompanyDetails />} />
                <Route path="/customer/:customerId" element={<CustomerDetails />} />
                <Route path="/coupon/:couponId" element={<CouponDetails />} />
                <Route path="/company/add" element={<CompanyAdd />} />
                <Route path="/customer/add" element={<CustomerAdd />} />
                <Route path="/coupon/add" element={<CouponAdd />} />
                <Route path="/customer/edit/:customerId" element={<CustomerUpdate />} />
                <Route path="/company/edit/:companyId" element={<CompanyUpdate />} />
                <Route path="/coupon/edit/:couponId" element={<CouponUpdate />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about_us" element={<AboutUs />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Login />} />
                <Route path="/init" element={<AdminInit/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}
