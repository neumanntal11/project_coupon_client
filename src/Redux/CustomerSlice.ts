import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company } from "../Models/Company";
import { configure } from "@testing-library/react";
import { Customer } from "../Models/Customer";

interface CustomerState{
    customers:Customer[];
}
const initialState: Customer[] = [];

//Slice for managing customer-related state in the Redux store.

const customerSlice = createSlice({
    name: 'customers',
    initialState:{
        customers: initialState
    },
    reducers:{
        fetchCustomers(state: CustomerState, action: PayloadAction<Customer[]>){
            state.customers = action.payload;
        },
        deleteCustomer(state: CustomerState, action: PayloadAction<number>){
            const indexToDelete = state.customers.findIndex(customer=>customer.id===action.payload);
            if(indexToDelete>=0)
            state.customers.splice(indexToDelete, 1);
        },
        addCustomer(state: CustomerState, action: PayloadAction<Customer>){
            state.customers.push(action.payload);
        },
        updateCustomer(state: CustomerState, action: PayloadAction<Customer>){
            const indexToUpdate = state.customers.findIndex(customer=>customer.id===action.payload.id);
            if (indexToUpdate >= 0) state.customers[indexToUpdate] = action.payload;
        }
    }
}) 
export const {fetchCustomers , deleteCustomer, addCustomer, updateCustomer} = customerSlice.actions;
export default customerSlice.reducer;
