import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const { currentUser, loadCurrentUser } = useAuth()

  // Si no tenemos info del usuario, la cargamos
  if (currentUser.value === null && !to.meta.requiresGuest) {
    await loadCurrentUser()
  }

  const isAuthenticated = !!currentUser.value

  // Proteger rutas que requieren autenticación
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }

  // Proteger rutas que requieren ser invitado (guest)
  if (to.meta.requiresGuest && isAuthenticated) {
    next('/home')
    return
  }

  next()
})

export default router
