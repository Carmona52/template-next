import { Product } from "@/lib/types/products";
import { Customer } from "@/lib/types/customer";
import { Order } from "@/lib/types/order";

export interface CounterState {
    count: number
    increment: () => void
    decrement: () => void
    reset: () => void
}

export interface AuthState {
    user: { id: string; name: string; email: string } | null
    isAuthenticated: boolean
    login: (user: AuthState['user']) => void
    logout: () => void
}

export interface ProductsListState {
    products: Product[]
    appendProducts: () => void
    deleteProducts: () => void
    resetProducts: () => void
}

export interface CustomersListState {
    customers: Customer[]
    appendCustomers: () => void
    deleteCustomers: () => void
    resetCustomers: () => void
}

export interface OrdersListState {
    orders: Order[]
    appendOrders: () => void
    deleteOrders: () => void
    resetOrders: () => void
}

export interface AppState extends CounterState, AuthState, ProductsListState, CustomersListState, OrdersListState { }