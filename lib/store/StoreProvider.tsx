'use client'

import { createContext, useContext, useState } from 'react'
import { create, StoreApi, UseBoundStore } from 'zustand'
import { AppState } from './types'
import { createCounterSlice } from '@/store/useCounterStore'
import { createAuthSlice } from '@/store/userStore'
import { createProductsSlice } from "@/store/productStore";
import { createCustomerSlice } from '@/store/customersStore'
import { createOrdersSlice } from '@/store/ordersStore'

type AppStore = UseBoundStore<StoreApi<AppState>>

const createAppStore = () =>
    create<AppState>((...args) => ({
        ...createCounterSlice(...args),
        ...createAuthSlice(...args),
        ...createProductsSlice(...args),
        ...createCustomerSlice(...args),
        ...createOrdersSlice(...args),
    }))

const StoreContext = createContext<AppStore | null>(null)

export const useAppStore = <T,>(selector: (state: AppState) => T): T => {
    const store = useContext(StoreContext)
    if (!store) throw new Error('Falta StoreProvider en el árbol')
    return store(selector)
}

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const [store] = useState(createAppStore)

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}