package com.smartappointment.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartappointment.backend.entity.Doctor;
import com.smartappointment.backend.service.DoctorService;

@RestController
@RequestMapping("/api/doctor/profile")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://ai-smart-appointment-booking-system.vercel.app"
})
public class DoctorProfileController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/{id}")
    public Doctor getProfile(@PathVariable Long id) {
        return doctorService.getDoctorById(id);
    }

    @PutMapping("/{id}")
    public Doctor updateProfile(
            @PathVariable Long id,
            @RequestBody Doctor doctor) {

        return doctorService.updateDoctor(id, doctor);
    }
}