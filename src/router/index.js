import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Categorias from '../views/Categorias.vue'
import Cuadros from '../views/Cuadros.vue'
import Cartas from '../views/Cartas.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Categorias',
    name: 'Categorias',
    component: Categorias
  },
  {
    path: '/Cuadros',
    name: 'Cuadros',
    component: Cuadros
  },
  {
    path: '/Cartas',
    name: 'Cartas',
    component: Cartas
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
