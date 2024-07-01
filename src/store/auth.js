//Pinia store for managing user authentication state, token management and user data.

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
    /**
     * Sets the authentication token and stores it in local storage.
     * @param {string} token - The authentication token.
     */
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },

    /**
     * Removes the authentication token from the state and local storage.
     */
    removeToken() {
      this.token = null;
      localStorage.removeItem('token');
      console.log("remove2");
    },

    /**
     * Authenticates the user with the provided email and password.
     * @param {string} email - The user's email.
     * @param {number} password - The user's password.
     * @returns {Object} - The response from the API or an error.
     */
    async login(email, password) {
      try {
        const response = await axios.post(`${apiUrl}/auth`, {
            email: email,
            password: password,
          });
        this.setToken(response.data.token);
        this.user = response.data.data;
        document.dispatchEvent(new Event("login"));
        return response;
      } catch (error) {
        return error;
      }
    },

    /**
     * Registers a new user with the provided email and password.
     * @param {string} email - The user's email.
     * @param {number} password - The user's password.
     * @returns {Object} - The response from the API or an error.
     */
    async register(email, password) {
        try {
          const response = await axios.post(`${apiUrl}/register`, {
              email: email,
              password: password,
            });
          this.setToken(response.data.token);
          this.user = response.data.data;
          document.dispatchEvent(new Event("login"));
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
    /**
     * Fetches the current user data from the API if a token is present.
     * @returns {Object|null} - The user data or null if fetch fails.
     */
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
    /**
     * Checks if a token exists in local storage and fetches user data if valid.
     * @returns {boolean} - True if a valid token is found, otherwise false.
     */
    async checkToken() {
      const token = localStorage.getItem('token');
      if (token) {
        this.setToken(token);
        await this.fetchUser();
        return true;
      } else {
        return false;
      }
    },
  }
});
