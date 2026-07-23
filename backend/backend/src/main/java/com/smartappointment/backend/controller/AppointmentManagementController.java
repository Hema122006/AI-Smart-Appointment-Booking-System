package com.smartappointment.backend.controller;

import com.smartappointment.backend.entity.Appointment;
import com.smartappointment.backend.service.AppointmentManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointment-management")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://ai-smart-appointment-booking-system.vercel.app"
})
public class AppointmentManagementController {

    @Autowired
    private AppointmentManagementService service;

    @GetMapping
    public List<Appointment> getAll() {
        return service.getAllAppointments();
    }

    @GetMapping("/{id}")
    public Appointment get(@PathVariable Long id) {
        return service.getAppointment(id);
    }

    @PutMapping("/{id}")
    public Appointment update(
            @PathVariable Long id,
            @RequestBody Appointment appointment) {

        appointment.setId(id);

        return service.save(appointment);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {

        service.delete(id);

    }

}