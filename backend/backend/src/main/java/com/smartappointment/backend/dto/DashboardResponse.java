package com.smartappointment.backend.dto;

public class DashboardResponse {

    private long totalPatients;
    private long totalDoctors;
    private long totalAppointments;
    private double totalRevenue;

    public DashboardResponse() {
    }

    public DashboardResponse(long totalPatients,
                             long totalDoctors,
                             long totalAppointments,
                             double totalRevenue) {
        this.totalPatients = totalPatients;
        this.totalDoctors = totalDoctors;
        this.totalAppointments = totalAppointments;
        this.totalRevenue = totalRevenue;
    }

    public long getTotalPatients() {
        return totalPatients;
    }

    public long getTotalDoctors() {
        return totalDoctors;
    }

    public long getTotalAppointments() {
        return totalAppointments;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }
}