package com.smartappointment.backend.dto;

public class DashboardDTO {

    private long doctors;
    private long patients;
    private long appointments;

    private long confirmed;
    private long pending;
    private long completed;
    private long cancelled;

    private double revenue;

    public DashboardDTO() {}

    public DashboardDTO(
            long doctors,
            long patients,
            long appointments,
            long confirmed,
            long pending,
            long completed,
            long cancelled,
            double revenue
    ) {
        this.doctors = doctors;
        this.patients = patients;
        this.appointments = appointments;
        this.confirmed = confirmed;
        this.pending = pending;
        this.completed = completed;
        this.cancelled = cancelled;
        this.revenue = revenue;
    }

    public long getDoctors() { return doctors; }
    public long getPatients() { return patients; }
    public long getAppointments() { return appointments; }
    public long getConfirmed() { return confirmed; }
    public long getPending() { return pending; }
    public long getCompleted() { return completed; }
    public long getCancelled() { return cancelled; }
    public double getRevenue() { return revenue; }

    public void setDoctors(long doctors) { this.doctors = doctors; }
    public void setPatients(long patients) { this.patients = patients; }
    public void setAppointments(long appointments) { this.appointments = appointments; }
    public void setConfirmed(long confirmed) { this.confirmed = confirmed; }
    public void setPending(long pending) { this.pending = pending; }
    public void setCompleted(long completed) { this.completed = completed; }
    public void setCancelled(long cancelled) { this.cancelled = cancelled; }
    public void setRevenue(double revenue) { this.revenue = revenue; }
}