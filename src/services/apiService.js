import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Your API base URL

export const fetchExams = async () => {
  try {
    const response = await axios.get(`${API_URL}/exams`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : 'Network error');
      throw error;
    }
  };

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add more functions here to handle other API requests
