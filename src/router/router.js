// main router for src/main.js

import { createWebHistory, createRouter } from 'vue-router'
import Auth from '@/pages/Auth.vue'
import Main from "@/pages/Main.vue"
import Favorites from '@/pages/Favorites.vue'

const routes = [
  { path: '/', component: Main, props: route => ({ fetchData: route.params.fetchData }) },
  { path: '/favorites', component: Favorites },
  { path: '/auth', component: Auth },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
