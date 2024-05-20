import { createApp } from 'vue';
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue';
import './style.css';

import { createWebHistory, createRouter } from 'vue-router'

import Auth from '@/pages/Auth.vue'
import Main from "@/pages/Main.vue"
import Favorites from '@/pages/Favorites.vue'

const routes = [
  { path: '/', component: Main,  props: route => ({ fetchData: route.params.fetchData })},
  { path: '/favorites', component: Favorites },
  { path: '/auth', component: Auth },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const pinia = createPinia()
const app = createApp(App);

app.use(autoAnimatePlugin);
app.use(router);
app.use(pinia)

app.mount('#app');
