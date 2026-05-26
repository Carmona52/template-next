import { StateCreator } from 'zustand'
import { AppState, CounterState } from "@/store/types";

export const createCounterSlice: StateCreator<AppState, [], [], CounterState> = (set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
})