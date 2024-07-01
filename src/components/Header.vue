<script>
import { useAuthStore } from '@/store/auth.js';

  export default {
    data() {
      return {
        menuVisible: false,
        user: this.userEmail
      }
    },
    props: {
      totalPrice: Number,
    },
    computed: {
      isLoggedIn() {
        const authStore = useAuthStore();
        return authStore.isLoggedIn;
      },
      userEmail() {
        const authStore = useAuthStore();
        return authStore.getUser ? authStore.getUser.email : null;
      }
    },
    methods: {
      clkLogout() {
        this.menuVisible = !this.menuVisible
      },
      async logout() {
        const authStore = useAuthStore();
        this.menuVisible = false;
        await authStore.logout();
      },
    },
  }
</script>
<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">

    <RouterLink to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-11" />
        <div>
          <h2 class="font-bold text-xl uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">Shop of the best sneakers</p>
        </div>
      </div>
    </RouterLink>

    <ul v-if="isLoggedIn" class="flex items-center gap-10">
      <li class="flex items-center gap-3 cursor-pointer min-w-fit" @click="this.$emit('viewBag')">
        <img src="/cart.svg" alt="Cart" />
        <b class="hidden md:block">{{totalPrice}} euro</b>
      </li>
      <li class="flex items-center gap-3 cursor-pointer min-w-fit">
        <img src="/heart.svg" alt="Favorite"/>
        <RouterLink to="/favorites"><span class="hidden md:block">Favorite</span></RouterLink>
      </li>
      <li @click="clkLogout" class="flex items-center gap-3 cursor-pointer min-w-fit">
        <img src="/profile.svg" alt="Profile"/>
        <p>{{ userEmail }}</p>
        
      </li>
    </ul>
    <ul v-else class="flex items-center gap-10">
      <RouterLink to="/auth">
        <li class="flex items-center gap-3 cursor-pointer min-w-fit">
          <img src="/profile.svg" alt="Profile"/>
          <span class="hidden md:block">Profile</span>
        </li>
      </RouterLink>
    </ul>

    <!-- TODO -->
    <div v-show="menuVisible" @click="clkLogout" class="fixed top-0 left-0 h-full w-full">
      <div class="absolute right-20 mt-44 w-32 bg-white rounded-md shadow-lg z-10">
        <ul class="py-1">
          <li class="cursor-pointer px-4 py-2 hover:bg-gray-100" @click="logout">Logout</li>
        </ul>
      </div>
    </div>
    
    <!-- //TODO -->
  </header>
</template>