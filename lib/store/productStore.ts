import {StateCreator} from "zustand";
import {AppState, ProductsListState} from "@/store/types";
import productsData from '@/lib/db/dataTest/materiales.json'
import {Product} from "@/lib/types/products";

export const createProductsSlice: StateCreator<AppState, [], [], ProductsListState> = (set) => ({
    products: productsData as Product[],
    appendProducts:()=> set({products: productsData as Product[]}),
    deleteProducts:()=> set({products: productsData as Product[]}),
    resetProducts: ()=> set({products: productsData as Product[]})

})