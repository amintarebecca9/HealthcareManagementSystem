// Base API client for making requests to the backend
import { getCookie } from '../cookies';

// Allow configuring the API base URL from environment variable or fallback to localhost
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Helper function for making authenticated requests
export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  // Get token from either cookies or localStorage
  const token = getCookie('token') || localStorage.getItem('token');
  
  // Set up headers with authentication if token exists
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  // For debugging - log the request URL
  console.log(`Making API request to: ${API_BASE_URL}${endpoint}`);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      // Don't include credentials for registration/login endpoints
      // This avoids CORS issues with credentials mode
      credentials: endpoint.includes('/auth/') ? 'same-origin' : 'include',
    });

    // For debugging - log the response status
    console.log(`API response status: ${response.status}`);

    // Handle 401 Unauthorized - redirect to login
    if (response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.clear();
      window.location.href = '/login';
      return null;
    }

    // For non-JSON responses (like file downloads)
    if (options.responseType === 'blob') {
      return response;
    }

    // Parse JSON response
    let data;
    try {
      data = await response.json();
    } catch (e) {
      console.error('Error parsing JSON response:', e);
      data = {};
    }
    
    // If response is not ok, throw an error with the message
    if (!response.ok) {
      throw new Error(data.message || `API request failed with status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API request error:', error);
    // Add more context to the error
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('Connection to API server failed. Please check if the backend server is running at:', API_BASE_URL);
      throw new Error(`Cannot connect to the server at ${API_BASE_URL}. Please make sure the backend server is running.`);
    }
    throw error;
  }
}

// Export common API request methods
export const apiClient = {
  get: (endpoint: string) => fetchWithAuth(endpoint),
  
  post: (endpoint: string, data: any) => fetchWithAuth(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  put: (endpoint: string, data: any) => fetchWithAuth(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (endpoint: string) => fetchWithAuth(endpoint, {
    method: 'DELETE',
  }),
  
  // Special method for file uploads (multipart/form-data)
  upload: (endpoint: string, formData: FormData) => {
    const token = getCookie('token') || localStorage.getItem('token');
    
    return fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
        // Don't set Content-Type here - browser will set it with boundary for FormData
      },
      body: formData,
      credentials: endpoint.includes('/auth/') ? 'same-origin' : 'include',
    });
  },
};