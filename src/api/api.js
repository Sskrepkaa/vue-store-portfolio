// api.js

import axios from 'axios';


const apiUrl = import.meta.env.VITE_APP_MYAPI_URL;

/**
 * Функция для получения данных о сумке (bag) из API.
 * @returns {Promise<Array>} - Массив данных о сумке.
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
 * Функция для добавления данных о сумке (bag) через API.
 * @param {Object} bagItem - Объект с данными о сумке для добавления.
 * @returns {Promise<Object>} - Объект с данными, добавленными в API.
 */
export const addItem = async (router, options) => {
  try {
    const response = await axios.post(`https://801314a8e6fab379.mokky.dev/${router}`, options);
    return response.data;
  } catch (error) {
    console.error('Ошибка при добавлении данных о сумке:', error);
    throw error;
  }
};

/**
 * Функция для удаления данных о сумке (bag) из API по идентификатору.
 * @param {number} id - Идентификатор сумки для удаления.
 * @returns {Promise<void>} - Результат выполнения операции удаления.
 */
export const deleteItemById = async (router, id) => {
  try {
    const response = await axios.delete(`https://801314a8e6fab379.mokky.dev/${router}/${id}`);
    return response; // В зависимости от вашего API, можете вернуть или не возвращать данные после успешного удаления
  } catch (error) {
    console.error(`Ошибка при удалении данных о сумке с ID ${id}:`, error);
    throw error;
  }
};
