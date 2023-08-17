<template>
  <Navbar />
  <div class="bg-gray-50 h-[91vh] overflow-hidden">
    <div class="flex flex-col items-center px-6 py-8 mx-auto lg:py-0">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import { useAuthStore } from '@/store/index.js'
import axios from 'axios'


const authStore = useAuthStore()

authStore.initializeStore()

const token = authStore.token

if (token) {
  axios.defaults.headers.common['Authorization'] = "Token " + token
} else {
  axios.defaults.headers.common['Authorization'] = ""
}

</script>

<style scoped></style>
