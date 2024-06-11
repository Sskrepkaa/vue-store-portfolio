import { defineStore } from 'pinia';
import axios from 'axios';
import {getUser} from "@/api/api.js";
const apiUrl = import.meta.env.VITE_APP_MYAPI_URL;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  getters: {
    isLoggedIn: state => !!state.token,
    getUser: state => state.user,
  },
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },

    removeToken() {
      this.token = null;
      localStorage.removeItem('token');
      console.log("remove2");
    },

    async login(o, a) {
      try {
        const response = await axios.post(`${apiUrl}/auth`, {
            email: o,
            password: a,
          });
        this.setToken(response.data.token);
        this.user = response.data.data;
        document.dispatchEvent(new Event("login"));
        console.log("resp1 ", response);
        return response;
      } catch (error) {
        return error;
      }
    },

    logout() {
        console.log("remove1");
      this.removeToken();
      this.user = null;
      document.dispatchEvent(new CustomEvent("logout"))
    },

    async fetchUser() {
      if (this.token) {
        try {
          const userData = await getUser();
          this.user = userData;
          console.log("user data ?? ", userData, this.user);
          return this.user;
        } catch (error) {
          console.error('Failed to fetch user:', error);
          this.logout();
          return null;
        }
      }
    },
    async checkToken() {
      const token = localStorage.getItem('token');
      if (token) {
        this.setToken(token);
        await this.fetchUser();
      } else {
        //this.removeToken();
      }
    },
  }
});
