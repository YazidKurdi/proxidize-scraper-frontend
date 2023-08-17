<template>
  <div class="w-full bg-white rounded-lg shadow md:mt-12 sm:max-w-md xl:p-0">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Login to your account
      </h1>
      <form class="space-y-4 md:space-y-6" @submit.prevent="performLogin">
        <div>
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Your
            username</label>
          <input v-model="username" type="username" name="username" id="username"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="John Doe" required="">
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required="">
        </div>
        <button type="submit"
          class="w-full text-white bg-primary-700 hover:bg-primary-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
        <p class="text-sm font-light text-gray-500">
          Dont have an account? <router-link class="font-medium text-primary-600 hover:underline" to="/register">Sign up
            Here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useLogin from '@/composables/useLogin.js'

const username = ref('')
const password = ref('')

const { login } = useLogin()

const performLogin = () => {
  login(username.value, password.value)
}

</script>

<style scoped></style>
