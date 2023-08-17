<template>
  <div class="w-full bg-white rounded-lg shadow md:mt-12 sm:max-w-md xl:p-0">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Create an account
      </h1>
      <form class="space-y-4 md:space-y-6" @submit.prevent="register">
        <div>
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Your
            username</label>
          <input v-model="username" type="username" name="username" id="username"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="John Doe" required="">
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input v-model="password1" type="password" name="password" id="password" placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required="">
        </div>
        <div>
          <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900">Confirm
            password</label>
          <input v-model="password2" type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required="">
        </div>
        <button type="submit"
          class="w-full text-white bg-primary-700 hover:bg-primary-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create
          an account</button>
        <p class="text-sm font-light text-gray-500">
          Already have an account? <router-link class="font-medium text-primary-600 hover:underline" to="/login">Login
            Here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useLogin from '@/composables/useLogin.js'
import axios from 'axios'

const { login } = useLogin()

const performLogin = () => {
  login(username.value, password.value)
}

const username = ref('')
const password1 = ref('')
const password2 = ref('')

const register = async () => {

  const formData = {
    username: username.value,
    password1: password1.value,
    password2: password2.value
  }

  try {
    await axios.post('/dj-rest-auth/registration/', formData);
    performLogin(username.value, password1.value);
  } catch (error) {
    console.error('Registeration error:', error);
  }
}
</script>

<style scoped></style>
