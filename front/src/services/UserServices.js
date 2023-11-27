// UserService.js
import axios from 'axios';
import { useUserStore } from 'src/stores/userStore';
// Set up the base URL from an environment variable or hardcoded, if you prefer
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';
const userStore = useUserStore();
// Axios instance can be customized for the needs of your app, e.g., setting headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const register = (userData) => {
  return apiClient.post('/api/users/register', userData);
};

const login = async (credentials) => {
  return await apiClient.post('/api/users/login', credentials)
    .then(response => {
      const token  = response.data.token;
      localStorage.setItem('userToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log(axios.defaults.headers);
      userStore.setUser(response.data.user);
    })
    .catch(error => {
      console.error('Login error', error);
    })
};


const logout = () => {
  localStorage.removeItem('userToken');
  delete axios.defaults.headers.common['Authorization'];

}

const getProfile = async () => {
  return await apiClient.get('/api/users/profile').then((response) => { return response.data});
};

const updateProfile = async (userData) => {
  return apiClient.put('/api/users/profile', userData);
};

const deleteUser = () => {
  return apiClient.delete('/api/users/profile');
};

const listUsers = async () => {
  return await apiClient.get('/api/users/all').then((response) => {return response.data});
};

const sendMail = (userData) => {
  return apiClient.post('/api/users/sendMail', userData);
};

const sendMailWithOTP = (userData) => {
  return apiClient.post('/api/users/sendMailWithOTP', userData);
};

const updatePassword = (userData) => {
  return apiClient.post('/api/users/updatePassword', userData);
};

const getOTP = async (userData) => {
  return await apiClient.post('/api/users/getOTP', userData).then((response) => { return response.data});
};




export default {
  register,
  login,
  getProfile,
  updateProfile,
  deleteUser,
  listUsers,
  sendMail, 
  logout, 
  sendMailWithOTP, 

  updatePassword, 
  getOTP
  
};

