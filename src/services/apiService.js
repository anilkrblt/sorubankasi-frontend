// apiService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchPublicData = async () => {
  try {
    const response = await axios.get(`${API_URL}/public-data`);
    return response.data;
  } catch (error) {
    console.error("Error fetching public data:", error);
    throw error;
  }
};
export const createGroup = async (groupData) => {
  try {
    const response = await axios.post(`${API_URL}/groups`, groupData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
}
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : "Network error"
    );
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Logout error:",
      error.response ? error.response.data : "Network error"
    );
    throw error;
  }
};


export const createExam = async (examData) => {
  try {
    const response = await axios.post(`${API_URL}/exams`, examData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating exam:", error);
    throw error;
  }
};

export const addExam = async (examData, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/exams`, examData, {
      headers: {
        email,
        password,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateExam = async (examId, updatedData, email, password) => {
  try {
    const response = await axios.put(
      `${API_URL}/exams/${examId}`,
      updatedData,
      {
        headers: {
          email,
          password,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteExam = async (examId, email, password) => {
  try {
    const response = await axios.delete(`${API_URL}/exams/${examId}`, {
      headers: {
        email,
        password,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const addGroup = async (groupData, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/groups`, groupData, {
      headers: {
        email,
        password,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const addStudentToGroup = async (
  groupId,
  studentId,
  email,
  password
) => {
  try {
    const response = await axios.post(
      `${API_URL}/groups/${groupId}/add-student`,
      { studentId },
      {
        headers: {
          email,
          password,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const removeStudentFromGroup = async (
  groupId,
  studentId,
  email,
  password
) => {
  try {
    const response = await axios.post(
      `${API_URL}/groups/${groupId}/remove-student`,
      { studentId },
      {
        headers: {
          email,
          password,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteGroup = async (groupId, email, password) => {
  try {
    const response = await axios.delete(`${API_URL}/groups/${groupId}`, {
      headers: {
        email,
        password,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateGroup = async (groupId, updatedData, email, password) => {
  try {
    const response = await axios.put(
      `${API_URL}/groups/${groupId}`,
      updatedData,
      {
        headers: {
          email,
          password,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateUserProfile = async (userData) => {
    try {
      const response = await axios.put(`${API_URL}/auth/update-profile`, userData, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Profile update error:", error.response ? error.response.data : 'Network error');
      throw error;
    }
  };

  export const submitExam = async (examId, answers) => {
    const userId = localStorage.getItem('userId');
    console.log('Exam ID:', examId);
    console.log('Answers:', answers);
    console.log('User ID:', userId);
  
    // Cevapları array formatına çevir
    const formattedAnswers = Object.entries(answers).map(([answerId, answer]) => ({
      answerId,
      answer
    }));
  
    try {
      const response = await axios.post(
        `${API_URL}/exams/submit`,
        {
          examId,
          answers: formattedAnswers,
          userId,
        },
        {
          withCredentials: true,
          headers: {
            'Authorization': 'Basic ' + btoa(localStorage.getItem('email') + ':' + localStorage.getItem('password'))
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting exam:", error);
      throw error;
    }
  };
  
  
export const fetchUserGroups = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/user-groups`, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user groups:", error);
    throw error;
  }
};

export const deleteUser = async (user_id) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/delete-account`,
      {user_id},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Delete account error:",
      error.response ? error.response.data : "Network error"
    );
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/update-profile`,
      profileData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Profile update error:",
      error.response ? error.response.data : "Network error"
    );
    throw error;
  }
};

export const updatePassword = async (oldPassword, newPassword) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/update-password`,
      { oldPassword, newPassword },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Password update error:",
      error.response ? error.response.data : "Network error"
    );
    throw error;
  }
};
