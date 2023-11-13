// ThemeService.js
import axios from 'axios';

// Set up the base URL from an environment variable or hardcoded, if you prefer
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';

// Axios instance can be customized for the needs of your app, e.g., setting headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Any other headers you need to set
  },
});

const listThemes = async () => {
  console.log(apiClient.get('/api/themes'))
  return await apiClient.get('/api/themes/');
};

const createTheme = (themeData) => {
  return apiClient.post('/api/themes/', themeData);
};

const getThemeById = (id) => {
  return apiClient.get(`/api/themes/${id}`);
};

const updateTheme = (id, themeData) => {
  return apiClient.put(`/api/themes/${id}`, themeData);
};

const deleteTheme = (id) => {
  return apiClient.delete(`/api/themes/${id}`);
};

export default {
  listThemes,
  createTheme,
  getThemeById,
  updateTheme,
  deleteTheme,
};
