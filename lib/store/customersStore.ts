import { StateCreator } from "zustand";
import { AppState, CustomersListState } from "@/store/types";
import customersData from '@/lib/db/dataTest/customers.json';
import { Customer } from "@/lib/types/customer";

export const createCustomerSlice: StateCreator<AppState, [],[], CustomersListState> = (set)=>({
    customers: customersData as Customer[],
    appendCustomers:()=> set({customers: customersData as Customer[]}),
    deleteCustomers:()=> set({customers: customersData as Customer[]}),
    resetCustomers: ()=> set({customers: customersData as Customer[]})
})