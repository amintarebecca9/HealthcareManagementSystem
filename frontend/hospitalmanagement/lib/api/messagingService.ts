// Messaging service for handling secure messaging between users
import { apiClient } from './apiClient';

export const messagingService = {
  // Get all conversations for the current user
  getConversations: async () => {
    return apiClient.get('/secure-messages/conversations');
  },

  // Get messages between current user and a specific partner
  getMessages: async (partnerId: string) => {
    return apiClient.get(`/secure-messages/${partnerId}/messages`);
  },

  // Send a new message to a specific user
  sendMessage: async (partnerId: string, content: string, type: string = 'TEXT') => {
    return apiClient.post(`/secure-messages/${partnerId}/send`, {
      toUserId: partnerId,
      content,
      type
    });
  },
};