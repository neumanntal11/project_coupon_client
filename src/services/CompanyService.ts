import { Coupon } from "../Models/Coupon";
import axios from "axios";
import { Company } from "../Models/Company";
import { Category } from "../Models/Category";

//Service class to manage company-related API calls.


class CompanyService{

    async getAllCoupons(){
        return (await axios.get<Coupon[]>("/customer/allcoup")).data
    }

    async getCompanyCoupons(){
        return (await axios.get<Coupon[]>("/company/allcompanycoup")).data
    }

    async getCompanyDetails(companyId:number){
        return (await axios.get<Company>(`/company/compdetails/${companyId}`)).data
    }

    async addCoupon(coupon:Coupon){
        return (await axios.post<Coupon>("/company/addcoup", coupon)).data
    }

    async updateCoupon(coupon:Coupon){
        return (await axios.put<string>("/company/updatecoup", coupon)).data
    }

    async deleteCoupon(id:number){
        return (await axios.delete<string>(`/company/dcoup/${id}`)).data
    }

    async getCouponsByCategory(category:Category){
        return (await axios.get<Coupon[]>("/company/couponbycategory")).data
    }

    async getCouponsByMaxPrice(maxPrice:number){
        return (await axios.get<Coupon[]>(`/company/couponabove/${maxPrice}`)).data
    }

    async getOneCoupon(id:number){
        return (await axios.get<Coupon>(`/company/coup/${id}`)).data
    }
}

const companyService = new CompanyService();
export default companyService;