<template>
  <Navbar />
  <div class="bg-gray-50 h-[91vh] overflow-hidden">
    <div class="flex flex-col items-center px-6 py-8 mx-auto lg:py-0">
      <router-view />
    </div>
  </div>
  <NotificationGroup group="error">
    <div class="fixed inset-0 flex items-start justify-end p-6 px-12 py-20 pointer-events-none">
      <div class="w-full max-w-sm">
        <Notification v-slot="{ notifications }" enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0" leave="transition ease-in duration-500"
          leave-from="opacity-100" leave-to="opacity-0" move="transition duration-500" move-delay="delay-300">
          <div class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md"
            v-for="notification in notifications" :key="notification.id">
            <div class="flex items-center justify-center w-12 bg-primary-500">
              <svg class="w-6 h-6 text-white fill-current min-w-[10rem]" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
              </svg>
            </div>

            <div class="px-4 py-2 -mx-3">
              <div class="mx-3">
                <span class="font-semibold text-black">{{ notification.title }}</span>
                <p class="text-sm text-gray-600">{{ notification.text }}</p>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
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
