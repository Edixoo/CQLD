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

const listConnections = () => {
  return apiClient.get('/api/connections/');
};

const createConnection = (connectionData) => {
  return apiClient.post('/api/connections/', connectionData);
};

const getConnectionById = (id) => {
  return apiClient.get(`/api/connections/${id}`);
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
  getConnectionById,
  updateConnection,
  deleteConnection,
};
