import axios from 'axios';

// Pull base URL from Vite environment variables, fallback to local FastAPI server
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds request timeout limit
});

/**
 * Request Intercept:
 * Automatically attaches the JWT access token to the Authorization header if available.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Intercept:
 * Globally handles common errors, such as clearing local storage and forcing re-login on 401 Unauthorized.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with an error status code (4xx, 5xx)
      const { status } = error.response;

      if (status === 401) {
        // Token expired or invalid
        localStorage.removeItem('access_token');
        
        // Optional: Redirect to login if not already there
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    } else if (error.request) {
      // Request was made but no response received (Network Error / Backend down)
      console.error('Network Error: Unable to connect to the backend server.', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;