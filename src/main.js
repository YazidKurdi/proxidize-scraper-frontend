import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import Notifications from 'notiwind'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_API || 'http://127.0.0.1:8000'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(Notifications)
app.mount('#app')

