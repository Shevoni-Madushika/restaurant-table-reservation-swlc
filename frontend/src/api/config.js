import axios from 'axios';
import config from '../config/environment';

// API Configuration
const API_BASE_URL = config.API_BASE_URL;

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Enhanced Request interceptor
apiClient.interceptors.request.use(
  (requestConfig) => {
    // Ensure all requests go to backend
    if (!requestConfig.url?.startsWith('http')) {
      requestConfig.url = API_BASE_URL + requestConfig.url;
    }
    
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request details
    console.log(`🚀 API Request: ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`);
    console.log(`📡 Base URL: ${API_BASE_URL}`);
    console.log(`🎯 Full URL: ${requestConfig.url}`);
    
    return requestConfig;
  },
  (error) => {
    console.error('❌ Request Setup Error:', error);
    return Promise.reject(error);
  }
);

// Enhanced Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    console.log(`📊 Response Data:`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error Details:');
    console.error(`   Status: ${error.response?.status}`);
    console.error(`   URL: ${error.config?.url}`);
    console.error(`   Base URL: ${API_BASE_URL}`);
    console.error(`   Error:`, error.response?.data || error.message);
    
    // Handle different error scenarios
    if (error.response?.status === 401) {
      console.log('🔒 Unauthorized access - redirecting to login');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      console.error('🌐 Network Error - Check if backend is running on', API_BASE_URL);
    } else if (error.response?.status === 404) {
      console.error('🔍 Endpoint not found - Check API endpoint');
    } else if (error.response?.status >= 500) {
      console.error('🔥 Server Error - Check backend logs');
    }
    
    return Promise.reject(error);
  }
);

// Global axios configuration to prevent direct axios usage
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.timeout = 10000;

// Add global interceptors to catch any direct axios usage
axios.interceptors.request.use(
  (requestConfig) => {
    console.warn('⚠️ Direct axios usage detected. Use apiClient instead.');
    if (!requestConfig.url?.startsWith('http')) {
      requestConfig.url = API_BASE_URL + requestConfig.url;
    }
    return requestConfig;
  }
);

export default apiClient;

// Export configured axios instance for any legacy usage
export { apiClient as axios };
