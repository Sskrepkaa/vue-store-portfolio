// api.js - here there are all main functions to API

import axios from 'axios';
import { useAuthStore } from "@/store/auth.js";

const apiUrl = import.meta.env.VITE_APP_MYAPI_URL;

const axiosInstance = axios.create({});

// Interceptors for axios
axiosInstance.interceptors.request.use(
  config => {
    const authStore = useAuthStore();
    const token = authStore.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
export default axiosInstance;

/**
 * Function to authorisation from API.
 * @returns {Promise<Array>} - Array of data.
 */
export const login = async (options) => {
  try {
    const response = await axios.post(`${apiUrl}/auth`, options);
    const token = response.token;
    localStorage.setItem('token', token);
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

/**
 * Function to fetch user data from API.
 * @returns {Promise<Array>} - Array of data.
 */
export const getUser = async () => {
  try {
    const { data: user } = await axiosInstance.get(`${apiUrl}/auth_me`);
    return user;
  } catch (error) {
    console.error('Auth with token failed:', error);
    throw error;
  }
};

/**
 * Function to fetch non-auth data from API.
 * @returns {Promise<Array>} - Array of data.
 */
export const fetchData = async (router) => {
  try {
    const response = await axios.get(`${apiUrl}/${router}`);
    return response;
  } catch (error) {
    console.error('Error fetching non-auth data:', error);
    throw error;
  }
};

/**
 * Function to fetch auth data from API.
 * @returns {Promise<Array>} - Array of data.
 */
export const fetchAuthData = async (router) => {
  try {
    const authStore = useAuthStore();
    const response = await axiosInstance.get(`${apiUrl}/${router}/?user_id=${authStore.user.id}`);
    return response;
  } catch (error) {
    console.error('Error fetching auth data:', error);
    throw error;
  }
};

/**
 * Function to add data via API.
 * @param {Object} options - Object with data to add.
 * @returns {Promise<Object>} - Object with data added to the API.
 */
export const addItem = async (router, options) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}/${router}`, options);
    return response.data;
  } catch (error) {
    console.error('Error adding bag data:', error);
    throw error;
  }
};

/**
 * Function to delete data from API by ID.
 * @param {number} id - ID for deletion.
 * @returns {Promise<void>} - Result of the deletion operation.
 */
export const deleteItemById = async (router, id) => {
  try {
    const response = await axiosInstance.delete(`${apiUrl}/${router}/${id}`);
    return response;
  } catch (error) {
    console.error(`Error deleting bag data with ID ${id}:`, error);
    throw error;
  }
};
