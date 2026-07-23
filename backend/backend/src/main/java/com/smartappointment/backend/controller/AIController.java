package com.smartappointment.backend.controller;

import com.smartappointment.backend.entity.Doctor;
import com.smartappointment.backend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AIController {

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/recommend")
    public Doctor recommendDoctor(
            @RequestParam String specialization) {

        List<Doctor> doctors =
                doctorRepository.findBySpecializationContainingIgnoreCase(specialization);

        if(doctors.isEmpty())
            return null;

        doctors.sort(Comparator.comparing(Doctor::getExperience).reversed());

        return doctors.get(0);
    }

}