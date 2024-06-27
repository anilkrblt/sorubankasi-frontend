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
  console.log(groupData);
  try {
    const response = await axios.post(`${API_URL}/groups`, groupData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};
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
  console.log(examData);
  try {
    const response = await axios.post(`${API_URL}/exams`, examData);
    return response.data;
  } catch (error) {
    console.error("Error creating exam:", error);
    throw error;
  }
};


export const updateUserProfile = async (userData) => {
  try {
    const response = await axios.put(
      `${API_URL}/auth/update-profile`,
      userData,
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

export const submitExam = async (examId, answers) => {
  const userId = localStorage.getItem("userId");
  console.log("Exam ID:", examId);
  console.log("Answers:", answers);
  console.log("User ID:", userId);

  const formattedAnswers = Object.entries(answers).map(
    ([answerId, answer]) => ({
      answerId,
      answer,
    })
  );

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
          Authorization:
            "Basic " +
            btoa(
              localStorage.getItem("email") +
                ":" +
                localStorage.getItem("password")
            ),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting exam:", error);
    throw error;
  }
};


export const deleteUser = async (user_id) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/delete-account`,
      { user_id },
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

export const updateStudentExamScore = async (studentNo, examId, score) => {
  try {
    const response = await axios.put(`${API_URL}/students/update-exam-score`, {
      studentNo,
      examId,
      score,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Puan güncellemede hata:",
      error.response ? error.response.data : error
    );
    throw error;
  }
};

export const fetchUserExams = async (examIds) => {
  console.log(examIds);
  try {
    const queryString = examIds.join(",");
    const response = await axios.get(`${API_URL}/exams/get-exams`, {
      params: {
        examIds: queryString,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error(
      "Sınav çekmede hata",
      error.response ? error.response.data : "Ağ hatası"
    );
    throw error;
  }
};

export const updateExam = async (exam) => {
  const examId = exam._id;
  const newQuestions = exam.sorular;
  const sinav_suresi = exam.sinav_suresi;

  try {
    const response = await axios.put(`${API_URL}/exams/update-exam`, {
      examId,
      newQuestions,
      sinav_suresi
    });
    return response.data;
  } catch (error) {
    console.error("Sınav güncellenirken bir hata oluştu:", error);
    throw error;
  }
};

