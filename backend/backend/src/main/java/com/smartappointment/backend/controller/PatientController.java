package com.smartappointment.backend.controller;

import com.smartappointment.backend.entity.User;
import com.smartappointment.backend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping
    public List<User> getPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/search")
    public List<User> searchPatients(@RequestParam String keyword) {
        return patientService.searchPatients(keyword);
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
    }
    @GetMapping("/{id}")
    public User getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    @PutMapping("/{id}")
    public User updatePatient(
            @PathVariable Long id,
            @RequestBody User user) {

        return patientService.updatePatient(id, user);
    }
}