// UserService.js
import axios from 'axios';

// Set up the base URL from an environment variable or hardcoded, if you prefer
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';

// Axios instance can be customized for the needs of your app, e.g., setting headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // This is needed if your API requires cookies
  headers: {
    'Content-Type': 'application/json',
    // Any other headers you need to set
  },
});

const register = (userData) => {
  return apiClient.post('/api/users/register', userData);
};

const login = (credentials) => {
  return apiClient.post('/api/users/login', credentials);
};

const getProfile = () => {
  return apiClient.get('/api/users/profile');
};

const updateProfile = (userData) => {
  return apiClient.put('/api/users/profile', userData);
};

const deleteUser = () => {
  return apiClient.delete('/api/users/profile');
};

const listUsers = () => {
  return apiClient.get('/api/users/all');
};

export default {
  register,
  login,
  getProfile,
  updateProfile,
  deleteUser,
  listUsers,
};
