<template>
    <header class="border-gray-200 border shadow-md">
        <nav class="bg-white px-4 lg:px-6 py-4">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <div class="flex items-center">
                    <img src="@/assets/e-logo.png" class="mr-1 h-6 sm:h-9" alt="Not Jarir Logo" />
                    <router-link to="/" class="self-center text-xl font-semibold whitespace-nowrap">NOT JARIR
                        BOOKSTORE</router-link>
                </div>
                <div class="flex items-center">
                    <template v-if="authStore.isAuthenticated">
                        <button @click="logout"
                            class="text-white bg-primary-700 hover:bg-primary-900 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                            Log Out
                        </button>
                    </template>
                    <template v-else>
                        <router-link to="/login"
                            class="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-non">
                            Log In
                        </router-link>
                        <router-link to="/register"
                            class="text-white bg-primary-700 hover:bg-primary-900 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                            Sign Up
                        </router-link>
                    </template>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { useAuthStore } from '@/store/index.js'
import axios from 'axios'

const authStore = useAuthStore()


const logout = () => {

    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('token')
    authStore.clearToken()
};



</script>

<style lang="scss" scoped></style>