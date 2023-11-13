// WordService.js
import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add any other necessary headers, such as Authorization if needed
  },
});

const listWords = () => {
  return apiClient.get('/api/words/');
};

const createWord = (wordData) => {
  return apiClient.post('/api/words/', wordData);
};

const getWordById = (id) => {
  return apiClient.get(`/api/words/${id}`);
};

const updateWord = (id, wordData) => {
  return apiClient.put(`/api/words/${id}`, wordData);
};

const deleteWord = (id) => {
  return apiClient.delete(`/api/words/${id}`);
};

export default {
  listWords,
  createWord,
  getWordById,
  updateWord,
  deleteWord,
};
