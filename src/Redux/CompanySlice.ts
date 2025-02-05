import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company } from "../Models/Company";
import { configure } from "@testing-library/react";

interface CompanyState{
    companies:Company[];
}
const initialState: Company[] = [];

//Slice for managing company-related state in the Redux store.

const companySlice = createSlice({
    name: 'companies',
    initialState:{
        companies: initialState
    },
    reducers:{
        fetchCompanies(state: CompanyState, action: PayloadAction<Company[]>){
            state.companies = action.payload;
        },
        deleteCompany(state: CompanyState, action: PayloadAction<number>){
            const indexToDelete = state.companies.findIndex(company=>company.id===action.payload);
            if(indexToDelete>=0)
            state.companies.splice(indexToDelete, 1);
        },
        addCompany(state: CompanyState, action: PayloadAction<Company>){
            state.companies.push(action.payload);
        },
        updateCompany(state: CompanyState, action: PayloadAction<Company>){
            const indexToUpdate = state.companies.findIndex(company=>company.id===action.payload.id);
            if (indexToUpdate >= 0) state.companies[indexToUpdate] = action.payload;
        }
    }
}) 
export const {fetchCompanies , deleteCompany, addCompany, updateCompany} = companySlice.actions;
export default companySlice.reducer;
