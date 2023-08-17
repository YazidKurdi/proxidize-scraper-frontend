// authStore.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        setToken(token) {
            this.token = token
            localStorage.setItem('token', token)
        },
        clearToken() {
            this.token = null
            localStorage.removeItem('token')
        },
        initializeStore() {
            if (this.isAuthenticated) {
                this.token = localStorage.getItem('token')
            } else {
                this.token = ''
            }
        }
    },
})
