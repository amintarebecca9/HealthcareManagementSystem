// Appointment service for handling scheduling and management of appointments
import { apiClient } from './apiClient';

export const appointmentService = {
  // Get appointments for the current user
  getUserAppointments: async () => {
    return apiClient.get('/appointments/user');
  },

  // Get appointments by doctor ID
  getDoctorAppointments: async (doctorId: string) => {
    return apiClient.get(`/appointments/doctor/${doctorId}`);
  },

  // Get appointments by date range
  getAppointmentsByDateRange: async (startDate: string, endDate: string) => {
    return apiClient.get(`/appointments/range?startDate=${startDate}&endDate=${endDate}`);
  },

  // Create a new appointment
  createAppointment: async (appointmentData: any) => {
    return apiClient.post('/appointments', appointmentData);
  },

  // Update an existing appointment
  updateAppointment: async (appointmentId: string, appointmentData: any) => {
    return apiClient.put(`/appointments/${appointmentId}`, appointmentData);
  },

  // Delete an appointment
  deleteAppointment: async (appointmentId: string) => {
    return apiClient.delete(`/appointments/${appointmentId}`);
  },
  
  // Get available time slots for a doctor on a specific date
  getAvailableTimeSlots: async (doctorId: string, date: string) => {
    return apiClient.get(`/appointments/available-slots?doctorId=${doctorId}&date=${date}`);
  },
};