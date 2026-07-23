package com.smartappointment.backend.service;

import com.smartappointment.backend.entity.User;
import com.smartappointment.backend.entity.UserRole;
import com.smartappointment.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllPatients() {
        return userRepository.findByRole(UserRole.PATIENT);
    }

    public List<User> searchPatients(String keyword) {
        return userRepository.findByNameContainingIgnoreCase(keyword);
    }

    public User addPatient(User user) {

        user.setRole(UserRole.PATIENT);

        return userRepository.save(user);

    }

    public User updatePatient(Long id, User user) {

        User existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        existing.setName(user.getName());
        existing.setEmail(user.getEmail());
        existing.setMobileNumber(user.getMobileNumber());

        existing.setFirstTimePatient(user.isFirstTimePatient());

        return userRepository.save(existing);

    }

    public void deletePatient(Long id) {
        userRepository.deleteById(id);
    }
    public User getPatientById(Long id) {

    return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Patient not found"));

}

}