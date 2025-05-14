package com.hms.dto;

public class DashboardResponse {
    private final int todaysAppointments;
    private final int totalPatients;
    private final int pendingReports;
    private final int newMessages;

    public DashboardResponse(int todaysAppointments,
                             int totalPatients,
                             int pendingReports,
                             int newMessages) {
        this.todaysAppointments = todaysAppointments;
        this.totalPatients = totalPatients;
        this.pendingReports = pendingReports;
        this.newMessages = newMessages;
    }

    public int getTodaysAppointments() {
        return todaysAppointments;
    }

    public int getTotalPatients() {
        return totalPatients;
    }

    public int getPendingReports() {
        return pendingReports;
    }

    public int getNewMessages() {
        return newMessages;
    }
}
