<template>
    <header class="border-gray-200 border shadow-md">
        <nav class="bg-white px-4 lg:px-6 py-4">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <a href="#" class="flex items-center">
                    <img src="@/assets/e-logo.png" class="mr-1 h-6 sm:h-9" alt="Not Jarir Logo" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap">NOT JARIR BOOKSTORE</span>
                </a>
                <div v-if="authStore.isAuthenticated" class="hidden justify-between items-center lg:flex min-w-[450px]">
                    <form class="w-full">
                        <label class="relative block">
                            <input
                                class="w-full bg-white placeholder:font-italitc border border-slate-400 drop-shadow-md rounded-md py-2 pl-3 pr-10 focus:outline-none"
                                placeholder="Enter your keyword to scrape" type="text" />
                            <span class="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg class="h-5 w-5 fill-black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    width="30" height="30" viewBox="0 0 30 30">
                                    <path
                                        d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                                    </path>
                                </svg>
                            </span>
                        </label>
                    </form>
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