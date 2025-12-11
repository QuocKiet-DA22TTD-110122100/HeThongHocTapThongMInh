import axios from 'axios';
import {
  mockAuthAPI,
  mockAssessmentAPI,
  mockLessonAPI,
  mockProgressAPI,
  mockExerciseAPI,
  mockAnalyticsAPI,
  mockPredictionAPI,
  mockChatbotAPI,
  mockSubjectAPI
} from './mockApi';
import { geminiAPI } from './geminiApi';

const API_BASE_URL = 'http://localhost:5000/api';

// Chế độ DEMO: Sử dụng mock data khi backend chưa chạy
const USE_MOCK = true; // Đổi thành false khi backend đã sẵn sàng

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để thêm token vào mọi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = USE_MOCK ? mockAuthAPI : {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Assessment API
export const assessmentAPI = USE_MOCK ? mockAssessmentAPI : {
  getExamTypes: () => api.get('/assessment/exam-types'),
  start: (subjectId, examType) => api.post('/assessment/start', { subject_id: subjectId, exam_type: examType }),
  submit: (data) => api.post('/assessment/submit', data),
};

// Lesson API
export const lessonAPI = USE_MOCK ? mockLessonAPI : {
  getRecommended: (subjectId) => api.get('/lessons/recommended', { params: { subject_id: subjectId } }),
  getLesson: (lessonId) => api.get(`/lessons/${lessonId}`),
};

// Progress API
export const progressAPI = USE_MOCK ? mockProgressAPI : {
  get: (subjectId) => api.get('/progress', { params: { subject_id: subjectId } }),
  update: (data) => api.post('/progress/update', data),
};

// Exercise API
export const exerciseAPI = USE_MOCK ? mockExerciseAPI : {
  submit: (data) => api.post('/exercises/submit', data),
  submitAll: (data) => api.post('/exercises/submit-all', data),
};

// Analytics API
export const analyticsAPI = USE_MOCK ? mockAnalyticsAPI : {
  getStrengthsWeaknesses: () => api.get('/analytics/strengths'),
};

// Prediction API
export const predictionAPI = USE_MOCK ? mockPredictionAPI : {
  getResults: (subjectId) => api.get('/prediction/results', { params: { subject_id: subjectId } }),
};

// Chatbot API - Sử dụng Gemini AI
// Ưu tiên: Gemini API > Mock API > Backend API
export const chatbotAPI = geminiAPI.isConfigured() 
  ? geminiAPI 
  : USE_MOCK 
    ? mockChatbotAPI 
    : {
        ask: (message) => api.post('/chatbot/ask', { message }),
        getHistory: (limit = 50) => api.get('/chatbot/history', { params: { limit } }),
      };

// Subject API
export const subjectAPI = USE_MOCK ? mockSubjectAPI : {
  getAll: () => api.get('/subjects'),
};

export default api;
