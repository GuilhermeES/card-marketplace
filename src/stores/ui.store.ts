import { defineStore } from 'pinia'
import type { AuthModal } from '@/types/authModal'

export const useUiStore = defineStore('ui', {
    state: () => ({
        activeAuthModal: null as AuthModal,
    }),

    getters: {
        loginOpen: (s) : boolean => s.activeAuthModal === 'login',
        registerOpen: (s): boolean => s.activeAuthModal === 'register',
    },

    actions: {
        openLogin() {
            this.activeAuthModal = 'login'
        },
        openRegister() {
            this.activeAuthModal = 'register'
        },
        closeAuthModal() {
            this.activeAuthModal = null
        },
        switchToLogin() {
            this.activeAuthModal = 'login'
        },
        switchToRegister() {
            this.activeAuthModal = 'register'
        },
    },
})