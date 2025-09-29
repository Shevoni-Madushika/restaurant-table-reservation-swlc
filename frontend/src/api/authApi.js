import apiClient from './config';

// Authentication API endpoints
export const authApi = {
  // User login
  login: (credentials) => apiClient.post('/api/auth/login', credentials),
  
  // User registration
  register: (userData) => apiClient.post('/api/auth/register', userData),
  
  // Logout (clear local storage)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Get current user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },
};
