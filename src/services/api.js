import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response.data,
  (error) => {

    if (error.response) {

      throw error.response.data;
    } else if (error.request) {

      throw { message: 'Network error. Please check your connection.' };
    } else {

      throw { message: 'An unexpected error occurred.' };
    }
  }
);

export default api;