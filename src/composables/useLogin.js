// src/composables/useLogin.js
import { useAuthStore } from '@/store/index.js'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { notify } from "notiwind"

export default function useLogin() {
  const authStore = useAuthStore()
  const router = useRouter()

  const login = async (username, password) => {
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('token')

    try {
      const response = await axios.post('/dj-rest-auth/login/', {
        username: username,
        password: password,
      })
      const token = response.data.key
      authStore.setToken(token)
      axios.defaults.headers.common["Authorization"] = "Token " + token

      router.push({ name: 'Table' }) // Redirect after successful login
    } catch (error) {
      if (typeof error.response.data === 'string') {
        // Handle the case where error.response.data is a string
        notify({
          group: "error",
          title: "Error",
          text: error.response.data
        });
      } else {
        for (let errorKey in error.response.data) {
          for (let item of error.response.data[errorKey]) {
            notify({
              group: "error",
              title: "Error",
              text: item
            })
          }
        }
      }
    }
  }

  return { login }
}
