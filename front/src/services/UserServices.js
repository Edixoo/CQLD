// UserService.js
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

const register = (userData) => {
  return apiClient.post('/api/users/register', userData);
};

const login = (credentials) => {
  return apiClient.post('/api/users/login', credentials)
    .then(response => {
      const token  = response.data.token;
      const role = response.data.role;
      console.log(response.data.token + " : ", response.data.username);
      localStorage.setItem('userToken', token);
      localStorage.setItem('userRole', role);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log(axios.defaults.headers);
    })
    .catch(error => {
      console.error('Login error', error);
    })
};


const logout = () => {
  // Remove the token from local storage
  localStorage.removeItem('userToken');

  // Remove the default Authorization header
  delete axios.defaults.headers.common['Authorization'];

  // Redirect to login page or update the state as logged out
  // ...
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


export default {
  register,
  login,
  getProfile,
  updateProfile,
  deleteUser,
  listUsers,
  sendMail, 
  logout
};

