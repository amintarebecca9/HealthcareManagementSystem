// Authentication service for handling login, registration, and user management
import { apiClient } from './apiClient';
import { setCookie, removeCookie } from '../cookies';

export const authService = {
  // Login with username and password
  login: async (username: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/signin', { username, password });
      
      if (response && response.token) {
        // Store auth data in both cookies and localStorage for better persistence
        setCookie('token', response.token);
        setCookie('userId', response.userId || response.id);
        setCookie('username', response.username || username);
        setCookie('userRole', response.role.toLowerCase());
        
        // Store user object in localStorage for easy access
        localStorage.setItem('user', JSON.stringify({
          id: response.userId || response.id,
          name: response.name || response.username || username,
          username: username,
          role: response.role.toLowerCase(),
        }));
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Register a new user
  register: async (userData: any) => {
    return apiClient.post('/auth/signup', userData);
  },
  
  // Logout the current user
  logout: () => {
    // Clear cookies
    removeCookie('token');
    removeCookie('userId');
    removeCookie('username');
    removeCookie('userRole');
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
  },
  
  // Get the current authenticated user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  // Check if the user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token') || !!document.cookie.includes('token=');
  },
  
  // Get user role
  getUserRole: () => {
    return localStorage.getItem('userRole') || '';
  },
};