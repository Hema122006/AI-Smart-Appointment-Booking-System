package com.smartappointment.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartappointment.backend.entity.Doctor;
import com.smartappointment.backend.repository.DoctorRepository;

@Service
public class DoctorManagementService {

    @Autowired
    private DoctorRepository doctorRepository;

    // Add Doctor
    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // Get All Doctors
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // Get Doctor By ID
    public Doctor getDoctor(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    // Update Doctor
    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        doctor.setName(updatedDoctor.getName());
        doctor.setEmail(updatedDoctor.getEmail());
        doctor.setPassword(updatedDoctor.getPassword());
        doctor.setMobileNumber(updatedDoctor.getMobileNumber());
        doctor.setSpecialization(updatedDoctor.getSpecialization());
        doctor.setQualification(updatedDoctor.getQualification());
        doctor.setExperience(updatedDoctor.getExperience());
        doctor.setConsultationFee(updatedDoctor.getConsultationFee());
        doctor.setAvailableDays(updatedDoctor.getAvailableDays());
        doctor.setAvailableTime(updatedDoctor.getAvailableTime());
        doctor.setAvailable(updatedDoctor.isAvailable());

        return doctorRepository.save(doctor);
    }

    // Delete Doctor
    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }

    // Search Doctor
    public List<Doctor> searchDoctor(String name) {
        return doctorRepository.findByNameContainingIgnoreCase(name);
    }
}