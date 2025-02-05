import axios from "axios";
import { Coupon } from "../Models/Coupon";
import { Customer } from "../Models/Customer";


//Service class to manage customer-related API calls.


class CustomerService{
    async PurchaseCoupon(coupon:Coupon){
        return (await axios.post<string>("/customer/purchcoup", coupon)).data
    }

    async getCustomerDetails(){
        return (await axios.get<Customer>(`/customer/custdetails`)).data
    }

    async getCustomerCoupons(){
        return (await axios.get<Coupon[]>(`/customer/custcoupons`)).data
    }

    async getOneCoupon(id:number){
        return (await axios.get<Coupon>(`/customer/coup/${id}`)).data
    }
}

const customerService = new CustomerService();
export default customerService;