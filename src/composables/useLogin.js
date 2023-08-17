// src/composables/useLogin.js
import { useAuthStore } from '@/store/index.js'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default function useLogin() {
  const authStore = useAuthStore()
  const router = useRouter()

  const login = async (username, password) => 
  {
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('token')

    try {
      const response = await axios.post('/dj-rest-auth/login/', {
        username: username,
        password: password,
      });
      const token = response.data.key;
      authStore.setToken(token)
      axios.defaults.headers.common["Authorization"] = "Token " + token

      router.push({ name: 'Table' }); // Redirect after successful login
    } catch (error) {
      console.error('Login error:', error)
    }
  };

  return { login }
}
