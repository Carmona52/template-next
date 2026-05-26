import { StateCreator } from 'zustand'
import { AppState, AuthState } from "@/store/types";

export const createAuthSlice: StateCreator<AppState, [], [], AuthState> = (set) => ({
    user: null,
    isAuthenticated: false,
    login: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
})