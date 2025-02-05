import axios from "../axiosConfig"
import { Company } from "../Models/Company"
import { Customer } from "../Models/Customer"
import { fetchCompanies, addCompany, updateCompany, deleteCompany } from "../Redux/CompanySlice";
import { fetchCustomers, addCustomer, updateCustomer, deleteCustomer } from "../Redux/CustomerSlice";
import store from "../Redux/Store";

//Service class to manage admin-related API calls.
//Use redux to improve performance
//If the cache is empty and request go to server update the lUpd(last update) value;

class AdminService{
    
    async getAllCompanies(){
        if(store.getState().companies.companies.length === 0){
        const data = (await axios.get<Company[]>("/admin/allcomp")).data
        localStorage.lUpd = Date.now();
        store.dispatch(fetchCompanies(data)); 
        }
        return store.getState().companies.companies;
    }

    async getOneCompany(id:number){
        if(store.getState().companies.companies.length === 0){
            const res = (await axios.get<Company>(`/admin/comp/${id}`)).data
            localStorage.lUpd = Date.now();
            return res;
        }
        const companyIndex = store.getState().companies.companies.findIndex(company=>company.id===id);
        return store.getState().companies.companies[companyIndex]
    }

    async addCompany(company:Company){
        const res = (await axios.post<Company>("/admin/addcomp", company)).data
        store.dispatch(addCompany(res));
        return `Company ${res.name} added successfully`;
    }

    async updateCompany(company:Company){
        const res = (await axios.put<string>("/admin/updatecomp", company)).data
        store.dispatch(updateCompany(company));
        return res;
    }

    async deleteCompany(id:number){
       const res = (await axios.delete(`/admin/dcomp/${id}`))
        store.dispatch(deleteCompany(id));
        return res;
    }

    async getAllCustomers(){
        if(store.getState().customers.customers.length === 0){
        const data = (await axios.get<Customer[]>("/admin/allcust")).data
        localStorage.lUpd = Date.now();
        store.dispatch(fetchCustomers(data));
        }
        return store.getState().customers.customers;
    }

    async getOneCustomer(id:number){
        if(store.getState().customers.customers.length === 0){
            const res = (await axios.get<Customer>(`/admin/cust/${id}`)).data
            localStorage.lUpd = Date.now();
            return res;
        }
        const customerIndex = store.getState().customers.customers.findIndex(customer=>customer.id===id);
        return store.getState().customers.customers[customerIndex]
    }

    async addCutomer(customer:Customer){
        const res = (await axios.post<Customer>("/admin/addcust", customer)).data
        store.dispatch(addCustomer(res));
        return `Customer ${res.firstName} ${res.lastName} added successfully`;
    }

    async updateCustomer(customer:Customer){
        const res = (await axios.put<string>("/admin/updatecust", customer)).data
        store.dispatch(updateCustomer(customer));
        return res;
    }

    async deleteCustomer(id:number){
        const res = (await axios.delete(`/admin/dcust/${id}`))
        store.dispatch(deleteCustomer(id));
        return res;
    }
    
/**
 * Initialize help to init the DB in first startup.
 * @params check box for which table to initialize
 */

    async initialize(categories: boolean, companies: boolean, customers: boolean, coupons: boolean) {
        const response = await axios.get<string>("/admin/init", { params: {categories, companies, customers, coupons },});
        return response.data;
    }
}

const adminService = new AdminService();
export default adminService;