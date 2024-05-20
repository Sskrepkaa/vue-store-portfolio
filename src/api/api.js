// api.js

import axios from 'axios';
import {useAuthStore} from "@/store/auth.js";

const apiUrl = import.meta.env.VITE_APP_MYAPI_URL;


const axiosInstance = axios.create({})
axiosInstance.interceptors.request.use (config => {
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
)
export default axiosInstance;
export const login = async (optoins) => {
  try {
    const response = await axios.post(`${apiUrl}/auth`, optoins);
    const token = response.token;
    localStorage.setItem('token', token);
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

/**
 * Функция для non auth получения данных из API.
 * @returns {Promise<Array>} - Массив данных.
 */
export const fetchData = async (router) => {
  try {
    const response = await axios.get(`${apiUrl}/${router}`);
    return response;
  } catch (error) {
    console.error('Ошибка при получении данных о сумке:', error);
    throw error;
  }
};

/**
 * Функция для получения auth данных из API.
 * @returns {Promise<Array>} - Массив данных
 */
export const fetchAuthData = async (router) => {
  try {
    const authStore = useAuthStore();
    const id = authStore.user.id;
    console.log("id ", id);
    const response = await axiosInstance.get(`${apiUrl}/${router}/?user_id=${id}`);
    return response;
  } catch (error) {
    console.error('Ошибка при получении данных о сумке:', error);
    throw error;
  }
};

/**
 * Функция для добавления данных через API.
 * @param {Object} bagItem - Объект с данными для добавления.
 * @returns {Promise<Object>} - Объект с данными, добавленными в API.
 */
export const addItem = async (router, options) => {
  try {
    const response = await axiosInstance.post(`https://801314a8e6fab379.mokky.dev/${router}`, options);
    return response.data;
  } catch (error) {
    console.error('Ошибка при добавлении данных о сумке:', error);
    throw error;
  }
};

/**
 * Функция для удаления данных из API по идентификатору.
 * @param {number} id - Идентификатор для удаления.
 * @returns {Promise<void>} - Результат выполнения операции удаления.
 */
export const deleteItemById = async (router, id) => {
  try {
    const response = await axiosInstance.delete(`https://801314a8e6fab379.mokky.dev/${router}/${id}`);
    return response; // В зависимости от вашего API, можете вернуть или не возвращать данные после успешного удаления
  } catch (error) {
    console.error(`Ошибка при удалении данных о сумке с ID ${id}:`, error);
    throw error;
  }
};
