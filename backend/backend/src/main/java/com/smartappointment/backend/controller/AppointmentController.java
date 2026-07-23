package com.smartappointment.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartappointment.backend.dto.AppointmentRequest;
import com.smartappointment.backend.entity.Appointment;
import com.smartappointment.backend.service.AppointmentService;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Book Appointment
    @PostMapping("/book")
    public Appointment bookAppointment(
            @RequestBody AppointmentRequest request) {

        return appointmentService.bookAppointment(request);

    }

    // Patient Appointment History
    @GetMapping("/history/{patientId}")
    public List<Appointment> getAppointments(
            @PathVariable Long patientId) {

        return appointmentService.getAppointments(patientId);

    }

    // ============================
    // ADMIN - GET ALL APPOINTMENTS
    // ============================
    @GetMapping
    public List<Appointment> getAllAppointments() {

        return appointmentService.getAllAppointments();

    }
    // Doctor Dashboard - Get doctor appointments

@GetMapping("/doctor/{doctorId}")
public List<Appointment> getDoctorAppointments(
        @PathVariable Long doctorId) {

    return appointmentService.getDoctorAppointments(doctorId);

}

}