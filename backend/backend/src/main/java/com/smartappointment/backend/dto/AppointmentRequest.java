package com.smartappointment.backend.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class AppointmentRequest {

    private Long patientId;
    private Long doctorId;

    private LocalDate appointmentDate;

    private LocalTime appointmentTime;

    private boolean emergency;

    private boolean firstTimePatient;

    public AppointmentRequest() {
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public LocalTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public boolean isEmergency() {
        return emergency;
    }

    public void setEmergency(boolean emergency) {
        this.emergency = emergency;
    }

    public boolean isFirstTimePatient() {
        return firstTimePatient;
    }

    public void setFirstTimePatient(boolean firstTimePatient) {
        this.firstTimePatient = firstTimePatient;
    }
}