import { StateCreator } from "zustand";
import {AppState, OrdersListState} from "@/store/types";
import ordersData from '@/lib/db/dataTest/orders.json';
import {Order} from "@/lib/types/order";

export const createOrdersSlice: StateCreator<AppState,[],[],OrdersListState> = (set) =>({
    orders: ordersData as Order[],
    appendOrders:()=> set({orders: ordersData as Order[]}),
    deleteOrders:()=> set({orders: ordersData as Order[]}),
    resetOrders: ()=> set({orders: ordersData as Order[]})
})