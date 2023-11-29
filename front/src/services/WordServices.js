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

const listWords = async () => {
  return await apiClient.get('/api/words/').then((response) => {return response.data});
};

const createWord = async (wordData) => {
  const res = await apiClient.post('/api/words/', wordData);
  return res.data;
};

const getWordById = async (id) => {
  return await apiClient.get(`/api/words/${id}`).then((response) => { return response.data});
};

// IDEM VOIR ICI
const getWordByName = async (name) => {
  return await apiClient.get(`/api/words/name/${name}`).then((response) => { return response.data }).catch((error) => { return error.response.data });
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
  getWordByName
};
