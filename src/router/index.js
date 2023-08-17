import { createRouter, createWebHashHistory } from 'vue-router'
import Table from '../components/Table.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'


const routes = [
  {
    path: '/',
    name: 'Table',
    component: Table,
    meta: { title: 'Home' }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { title: 'Register' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Login' }
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach((to) => {
  const title = to.meta.title + ' | NOT JARIR'
  document.title = title
})


export default router
