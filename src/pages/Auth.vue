<template>
    <div class="flex items-center justify-center py-20">
      <div class="bg-white p-8 rounded-xl shadow-lg shadow-grey-200 w-full max-w-sm">
        <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input
              v-model="username"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Email"
              required
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input
              v-model="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '@/store/auth.js';

  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async handleLogin() {
        // Логика для обработки авторизации
        const authStore = useAuthStore();
        const res = await authStore.login(this.username,this.password);
        console.log("resp ", res)
        if (res.data.token) {this.$router.push('/');}
        else {alert("error ", res.message)}

      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  