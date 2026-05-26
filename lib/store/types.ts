import {Product} from "@/lib/types/products";

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

export interface AppState extends CounterState, AuthState, ProductsListState {
}