// Export all API services
import { apiClient } from './apiClient';
import { authService } from './authService';
import { documentService } from './documentService';
import { messagingService } from './messagingService';
import { appointmentService } from './appointmentService';

export {
  apiClient,
  authService,
  documentService,
  messagingService,
  appointmentService,
};

// Export default object with all services
export default {
  api: apiClient,
  auth: authService,
  documents: documentService,
  messaging: messagingService,
  appointments: appointmentService,
};