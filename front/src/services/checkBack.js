// ConnectionService.js
import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';

// In your API service file
const checkApiHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export default {
  checkApiHealth,
};
