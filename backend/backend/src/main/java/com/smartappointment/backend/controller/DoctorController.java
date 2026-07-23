package com.smartappointment.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartappointment.backend.entity.Appointment;
import com.smartappointment.backend.entity.Doctor;
import com.smartappointment.backend.service.DoctorService;

@RestController
@RequestMapping("/api/doctor")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://ai-smart-appointment-booking-system.vercel.app"
})
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // ==========================
    // Doctor Dashboard
    // ==========================

    @PutMapping("/appointments/{appointmentId}/approve")
    public Appointment approveAppointment(@PathVariable Long appointmentId) {
        return doctorService.confirmAppointment(appointmentId);
    }

    @PutMapping("/appointments/{appointmentId}/reject")
    public Appointment rejectAppointment(@PathVariable Long appointmentId) {
        return doctorService.cancelAppointment(appointmentId);
    }
    @PutMapping("/complete/{appointmentId}")
public Appointment completeAppointment(@PathVariable Long appointmentId) {
    return doctorService.completeAppointment(appointmentId);
}

    // ==========================
    // Admin - Doctor Management
    // ==========================

    @GetMapping
    public List<Doctor> getDoctors() {
        return doctorService.getDoctors();
    }

    @PostMapping
    public Doctor addDoctor(@RequestBody Doctor doctor) {
        return doctorService.addDoctor(doctor);
    }

    @PutMapping("/{id}")
    public Doctor updateDoctor(
            @PathVariable Long id,
            @RequestBody Doctor doctor) {

        return doctorService.updateDoctor(id, doctor);

    }

    @DeleteMapping("/{id}")
    public String deleteDoctor(@PathVariable Long id) {

        doctorService.deleteDoctor(id);

        return "Doctor deleted successfully";

    }

    @PutMapping("/{id}/availability")
    public Doctor toggleAvailability(@PathVariable Long id) {

        return doctorService.toggleAvailability(id);

    }
    @GetMapping("/appointments/{doctorId}")
public List<Appointment> getAppointments(@PathVariable Long doctorId) {
    return doctorService.getAppointments(doctorId);
}

}