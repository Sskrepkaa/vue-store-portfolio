import { defineStore } from 'pinia';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_MYAPI_URL;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
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
        console.log("resp1 ", response);
        return response;
      } catch (error) {
        return error;
      }
      // take token
      const response = await axios.post(`${apiUrl}/auth`, {
          email: o,
          password: a,
        });
      this.setToken(response.data.token);
      this.user = response.data.data;
      console.log("resp1 ", response)
      return response;
    },

    logout() {
        console.log("remove1");
      this.removeToken();
      this.user = null;
    },

    async fetchUser() {
      if (this.token) {
        try {
          const response = await axios.get('/api/user', {
            headers: { Authorization: `Bearer ${this.token}` },
          });
          this.user = response.data;
        } catch (error) {
          console.error('Failed to fetch user:', error);
          this.logout();
        }
      }
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
  },
});
