// Document service for handling document management operations
import { apiClient } from './apiClient';

export const documentService = {
  // Get documents uploaded by the current user
  getUserDocuments: async () => {
    return apiClient.get('/documents/my-documents');
  },

  // Get documents related to the current user (shared with them)
  getRelatedDocuments: async () => {
    return apiClient.get('/documents/related-documents');
  },

  // Get documents by type
  getDocumentsByType: async (documentType: string) => {
    return apiClient.get(`/documents/by-type/${documentType}`);
  },

  // Upload a new document
  uploadDocument: async (formData: FormData) => {
    try {
      const response = await apiClient.upload('/documents/upload', formData);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Upload failed with status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  },

  // Download a document
  downloadDocument: async (documentId: string, filename: string = 'document') => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/documents/${documentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Download failed with status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error('Error downloading document:', error);
      throw error;
    }
  },

  // Delete a document
  deleteDocument: async (documentId: string) => {
    return apiClient.delete(`/documents/${documentId}`);
  },
};