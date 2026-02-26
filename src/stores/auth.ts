import { defineStore } from 'pinia'
import type {AuthState, User} from "@/types/auth";
import type { PersistenceOptions } from 'pinia-plugin-persistedstate'

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: null,
        user: null,
    }),

    getters: {
        isAuthenticated: (state) : boolean => !!state.token,
    },

    actions: {
        setAuth(payload: { token: string; user: User }) {
            this.token = payload.token
            this.user = payload.user
        },

        logout() {
            this.token = null
            this.user = null
        },
    },


    persist: {
        storage: sessionStorage,
        paths: ['token', 'user'],
    } as PersistenceOptions<AuthState>,
})