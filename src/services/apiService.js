import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 


export const fetchPublicData = async () => {
    try {
      const response = await axios.get(`${API_URL}/public-data`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching public data:', error);
      throw error;
    }
  };
  


// Fetch all exams
export const fetchExams = async () => {
  try {
    const response = await axios.get(`${API_URL}/exams`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// User login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : 'Network error');
    throw error;
  }
};

// User registration
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update user password
export const updatePassword = async (newPassword, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/update-password`, { newPassword }, {
      headers: {
        email,
        password
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new exam
export const addExam = async (examData, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/exams`, examData, {
      headers: {
        email,
        password
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an exam
export const updateExam = async (examId, updatedData, email, password) => {
  try {
    const response = await axios.put(`${API_URL}/exams/${examId}`, updatedData, {
      headers: {
        email,
        password
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete an exam
export const deleteExam = async (examId, email, password) => {
  try {
    const response = await axios.delete(`${API_URL}/exams/${examId}`, {
      headers: {
        email,
        password
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new group
export const addGroup = async (groupData, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/groups`, groupData, {
      headers: {
        email,
        password
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add student to a group
export const addStudentToGroup = async (groupId, studentId, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/groups/${groupId}/add-student`, { studentId }, {
      headers: {
        email,
        password
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Remove student from a group
export const removeStudentFromGroup = async (groupId, studentId, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/groups/${groupId}/remove-student`, { studentId }, {
      headers: {
        email,
        password
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a group
export const deleteGroup = async (groupId, email, password) => {
  try {
    const response = await axios.delete(`${API_URL}/groups/${groupId}`, {
      headers: {
        email,
        password
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update a group
export const updateGroup = async (groupId, updatedData, email, password) => {
  try {
    const response = await axios.put(`${API_URL}/groups/${groupId}`, updatedData, {
      headers: {
        email,
        password
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
