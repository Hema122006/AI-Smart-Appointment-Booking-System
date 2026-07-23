package com.smartappointment.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartappointment.backend.entity.Appointment;
import com.smartappointment.backend.entity.User;
import com.smartappointment.backend.service.AdminService;
import com.smartappointment.backend.service.AppointmentService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://ai-smart-appointment-booking-system.vercel.app"
})
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private AppointmentService appointmentService;

    // Dashboard Statistics
    @GetMapping("/dashboard")
    public Map<String, Object> getDashboard() {
        return adminService.getDashboardStatistics();
    }

    // All Appointments
    @GetMapping("/appointments")
    public List<Appointment> getAppointments() {
        return appointmentService.getAllAppointments();
    }

    // Search Appointment
    @GetMapping("/appointments/search")
    public List<Appointment> searchAppointments(
            @RequestParam String keyword) {

        return appointmentService.searchAppointments(keyword);
    }

    // Complete Appointment
    @PutMapping("/appointments/{id}/complete")
    public Appointment completeAppointment(@PathVariable Long id) {
        return appointmentService.completeAppointment(id);
    }

    // Cancel Appointment
    @PutMapping("/appointments/{id}/cancel")
    public Appointment cancelAppointment(@PathVariable Long id) {
        return appointmentService.cancelAppointment(id);
    }

    // Delete Appointment
    @DeleteMapping("/appointments/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
    }

    // All Patients
    @GetMapping("/patients")
    public List<User> getPatients() {
        return adminService.getAllPatients();
    }
    
    @PutMapping("/patients/{id}")
    public User updatePatient(@PathVariable Long id,
                          @RequestBody User user) {
        return adminService.updatePatient(id, user);
    }
    
    // Delete Patient
    @DeleteMapping("/patients/{id}")
    public void deletePatient(@PathVariable Long id) {
        adminService.deletePatient(id);
    }

}