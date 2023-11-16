// ConnectionService.js
import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers like authorization tokens if required
  },
});

const listConnections = async() => {
  return await apiClient.get('/api/connections/').then((response) => {return response.data})
};

const createConnection = (connectionData) => {
  return apiClient.post('/api/connections/', connectionData);
};

const getConnectionByTheme= async (idTheme) => {
  return await apiClient.get(`/api/connections/theme/${idTheme}`).then((response) => {return response.data})
};

const getConnectionById = async (id) => {
  return await apiClient.get(`/api/connections/${id}`).then((response) => {return response.data});
};

const getConnectionByIdInt = async (id) => {
  return await apiClient.get(`/api/connections/int/${id}`).then((response) => {return response.data});
};

const updateConnection = (id, connectionData) => {
  return apiClient.put(`/api/connections/${id}`, connectionData);
};

const deleteConnection = (id) => {
  return apiClient.delete(`/api/connections/${id}`);
};

export default {
  listConnections,
  createConnection,
  getConnectionByTheme,
  getConnectionById,
  updateConnection,
  deleteConnection,
};
